/*
 * (C) Copyright 2018-2019 Webdrone SAS (https://www.webdrone.fr/) and contributors.
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the
 * GNU Affero General Public License as published by the Free Software Foundation, either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. This program is
 * not suitable for any direct or indirect application in MILITARY industry See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along with this program.
 * If not, see <http://www.gnu.org/licenses/>.
 */

package org.meveo.api.rest.technicalservice;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.meveo.admin.exception.BusinessException;
import org.meveo.api.technicalservice.endpoint.EndpointApi;
import org.meveo.api.utils.JSONata;
import org.meveo.commons.utils.ParamBean;
import org.meveo.commons.utils.StringUtils;
import org.meveo.elresolver.ELException;
import org.meveo.interfaces.EntityOrRelation;
import org.meveo.model.persistence.JacksonUtil;
import org.meveo.model.technicalservice.endpoint.Endpoint;
import org.meveo.model.technicalservice.endpoint.EndpointHttpMethod;
import org.meveo.persistence.CrossStorageService;
import org.meveo.persistence.scheduler.AtomicPersistencePlan;
import org.meveo.persistence.scheduler.CyclicDependencyException;
import org.meveo.persistence.scheduler.ScheduledPersistenceService;
import org.meveo.persistence.scheduler.SchedulingService;
import org.meveo.service.technicalservice.endpoint.EndpointResultsCacheContainer;
import org.meveo.service.technicalservice.endpoint.EndpointService;
import org.slf4j.Logger;

import com.fasterxml.jackson.core.type.TypeReference;

/**
 * Servlet that allows to execute technical services through configured endpoints.<br>
 * The first part of Uri after "/rest/" corresponds either to the code of the endpoint, or an id of a previous asynchronous execution.<br>
 * The last part or the Uri corresponds to the path parameters of the endpoint.<br>
 * If the endpoint is configured as GET, it should be called via GET resquests and parameters should be in query.<br>
 * If the endpoint is configured as POST, it should be called via POST requests and parameters should be in body as a JSON map.<br>
 * Header "Keep-data" indicates we don't want to remove the execution result from cache.<br>
 * Header "Wait-For-Finish" indicates that we want to wait until one exuction finishes and get results after. (Otherwise returns status 102).<br>
 * Header "Persistence-Context-Id" indiciates the id of the persistence context we want to save the result

 * @author clement.bareth
 */
@WebServlet("/rest/*")
public class EndpointServlet extends HttpServlet {

    @Inject
    private Logger log;

    @Inject
    private EndpointApi endpointApi;

    @Inject
    private EndpointService endpointService;

    @Inject
    private SchedulingService schedulingService;

    @Inject
    private ScheduledPersistenceService<CrossStorageService> scheduledPersistenceService;

    @Inject
    private EndpointResultsCacheContainer endpointResultsCacheContainer;
    
    @Inject
    private EndpointExecutionFactory endpointExecutionFactory;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String requestBody = StringUtils.readBuffer(req.getReader());
        final Map<String, Object> parameters = JacksonUtil.fromString(requestBody, new TypeReference<Map<String, Object>>() {});

        final EndpointExecution endpointExecution = endpointExecutionFactory.getExecutionBuilder(req, resp)
                .setParameters(parameters)
                .setMethod(EndpointHttpMethod.POST)
                .createEndpointExecution();
        doRequest(endpointExecution);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setCharacterEncoding("UTF-8");
        final EndpointExecution endpointExecution = endpointExecutionFactory.getExecutionBuilder(req, resp)
                .setParameters(new HashMap<>(req.getParameterMap()))
                .setMethod(EndpointHttpMethod.GET)
                .createEndpointExecution();
        doRequest(endpointExecution);
    }

    private void doRequest(EndpointExecution endpointExecution) {

        // Retrieve endpoint
        final Endpoint endpoint = endpointExecution.getEndpoint();

        // If endpoint security is enabled, check if user has right to access that particular endpoint
        boolean endpointSecurityEnabled = Boolean.parseBoolean(ParamBean.getInstance().getProperty("endpointSecurityEnabled", "true"));
        if(endpointSecurityEnabled && endpoint != null && !endpointService.isUserAuthorized(endpoint)){
            endpointExecution.getResp().setStatus(403);
            endpointExecution.getWriter().print("You are not authorized to access this endpoint");
            return;
        }

        try {
            final Future<String> execResult = endpointResultsCacheContainer.getPendingExecution(endpointExecution.getFirstUriPart());
            if (execResult != null && endpointExecution.getMethod() == EndpointHttpMethod.GET) {
                if (execResult.isDone() || endpointExecution.isWait()) {
                    endpointExecution.getResp().setStatus(200);
                    endpointExecution.getResp().setContentType(endpoint.getContentType());
                    endpointExecution.getWriter().print(execResult.get());
                    if (!endpointExecution.isKeep()) {
                        log.info("Removing execution results with id {}", endpointExecution.getFirstUriPart());
                        endpointResultsCacheContainer.remove(endpointExecution.getFirstUriPart());
                    }
                } else {
                    endpointExecution.getResp().setStatus(102);    // In progress
                }
            } else {
                launchEndpoint(endpointExecution, endpoint);
            }
        } catch (Exception e) {
            log.error("Error while executing request", e);
            endpointExecution.getResp().setStatus(500);
            endpointExecution.getWriter().print(e.toString());
        } finally {
            endpointExecution.getWriter().flush();
            endpointExecution.getWriter().close();
        }
    }

    /**
     * Extract variable pointed by returned variable name and apply JSONata query if defined
     * If endpoint is not configured to serialize the result and that returned variable name is set, do not serialize result. Otherwise serialize it.
     *
     * @param endpoint Endpoint endpoxecuted
     * @param result Result of the endpoint execution
     * @return the transformed JSON result if JSONata query was defined or the serialized result if query was not defined.
     */
    private String transformData(Endpoint endpoint, Map<String, Object> result){
        final boolean returnedVarNameDefined = !StringUtils.isBlank(endpoint.getReturnedVariableName());
        boolean shouldSerialize = !returnedVarNameDefined || endpoint.isSerializeResult();

    	Object returnValue = result;
    	if(returnedVarNameDefined) {
    		Object extractedValue = result.get(endpoint.getReturnedVariableName());
    		if(extractedValue != null){
    			returnValue = extractedValue;
    		}else {
    			log.warn("[Endpoint {}] Variable {} cannot be extracted from context", endpoint.getCode(), endpoint.getReturnedVariableName());
    		}
    	}

        if (!shouldSerialize) {
            return returnValue.toString();
        }

        final String serializedResult = JacksonUtil.toStringPrettyPrinted(returnValue);
        if (StringUtils.isBlank(endpoint.getJsonataTransformer())) {
            return serializedResult;
        }

        return JSONata.transform(endpoint.getJsonataTransformer(), serializedResult);

    }

    private void launchEndpoint(EndpointExecution endpointExecution, Endpoint endpoint) throws BusinessException, ExecutionException, InterruptedException {
        if (endpoint != null) {
            if (endpoint.getMethod() == endpointExecution.getMethod()) {
                // Execute service
                if (endpoint.isSynchronous()) {

                    final Map<String, Object> result = endpointApi.execute(endpoint, endpointExecution);
                    endpointExecution.getResp().setContentType(endpoint.getContentType());
                    endpointExecution.getWriter().print(transformData(endpoint, result));
                    endpointExecution.getResp().setStatus(200);    // OK
                    if(endpointExecution.getPersistenceContextId() != null){
                        saveResult(endpointExecution, result);
                    }
                } else {
                    final UUID id = UUID.randomUUID();
                    log.info("Added pending execution number {} for endpoint {}", id, endpointExecution.getFirstUriPart());
                    final CompletableFuture<String> execution = CompletableFuture.supplyAsync(() -> {
                        try {
                            final Map<String, Object> result = endpointApi.execute(endpoint, endpointExecution);
                            return transformData(endpoint, result);
                        } catch (BusinessException | ExecutionException | InterruptedException e) {
                            throw new RuntimeException(e);
                        }
                    });
                    endpointResultsCacheContainer.put(id.toString(), execution);

//                    if(endpointExecution.getPersistenceContextId() != null){
//                        execution.thenAccept(map -> saveResult(endpointExecution, map));
//                    }

                    /*
                        If header wait was true, wait for execution of the service.
                        If header keep was true, return the id of the execution and the result,
                        if it was false, return only the results and remove the execution from the cache
                    */
                    if(endpointExecution.isWait()){
                        endpointExecution.getResp().setStatus(200);    // Accepted
                        final String execResult = execution.get();
                        if(endpointExecution.isKeep()){
                            Map<String, Object> returnedValue = new HashMap<>();
                            returnedValue.put("id", id.toString());
                            returnedValue.put("data", execResult);
                            endpointExecution.getWriter().println(JacksonUtil.toString(returnedValue));
                        }else{
                            endpointExecution.getWriter().println(JacksonUtil.toString(execResult));
                            endpointResultsCacheContainer.remove(id.toString());
                        }

                    }else{
                        endpointExecution.getWriter().println(id.toString().trim());
                        endpointExecution.getResp().setStatus(202);    // Accepted
                    }
                }
            } else {
                endpointExecution.getResp().setStatus(400);
                endpointExecution.getWriter().print("Endpoint is not available for " + endpointExecution.getMethod() + " requests");
            }
        } else {
            endpointExecution.getResp().setStatus(404);    // Not found
            try {
                UUID uuid = UUID.fromString(endpointExecution.getFirstUriPart());
                endpointExecution.getWriter().print("No results for execution id " + uuid.toString());
            } catch (IllegalArgumentException e) {
                endpointExecution.getWriter().print("No endpoint for " + endpointExecution.getFirstUriPart() + " has been found");
            }
        }
    }

    private void saveResult(EndpointExecution endpointExecution, Map<String, Object> results){
        final List<EntityOrRelation> resultsToSave = JacksonUtil.OBJECT_MAPPER .convertValue(results.get("results"), new TypeReference<List<EntityOrRelation>>() {});
        try {
            //TODO: Rethink persistence
            AtomicPersistencePlan atomicPersistencePlan = schedulingService.schedule(resultsToSave);
            scheduledPersistenceService.persist(endpointExecution.getPersistenceContextId(), atomicPersistencePlan);
        } catch (CyclicDependencyException | BusinessException | ELException e) {
            throw new RuntimeException(e);
        }
    }

}
