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

package org.meveo.service.script.test;

import org.keycloak.admin.client.Keycloak;
import org.meveo.commons.utils.ParamBean;
import org.meveo.model.scripts.Function;
import org.meveo.service.script.ConcreteFunctionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Stateless
public class JMeterService {


    private static final Logger LOG = LoggerFactory.getLogger(JMeterService.class);
    private static final String JMETER_BIN_FOLDER = ParamBean.getInstance().getProperty("jmeter", null);

    private String realm = System.getProperty("meveo.keycloak.realm");
    private String clientId = System.getProperty("meveo.keycloak.client");
    private String serverUrl = System.getProperty("meveo.keycloak.url");
    private String clientSecret = System.getProperty("meveo.keycloak.secret");

    private String userName = ParamBean.getInstance().getProperty("jmeter.credentials.username", null);
    private String password = ParamBean.getInstance().getProperty("jmeter.credentials.password", null);

    private String hostName = ParamBean.getInstance().getProperty("jmeter.server.hostname", null);
    private String protocol = ParamBean.getInstance().getProperty("jmeter.server.protocol", null);
    private String portNumber = ParamBean.getInstance().getProperty("jmeter.server.portnumber", null);

    @Inject
    private ConcreteFunctionService concreteFunctionService;

    private Keycloak keycloak;

    @PostConstruct
    private void init() {
        if (JMETER_BIN_FOLDER == null) {
            LOG.warn("JMeter binary path is not set, function test functionnality will therefore not be available.");
        } else if (userName == null || password == null) {
            LOG.warn("Jmeter user is not set, function test functionnality will therefore not be available.");
        } else if (hostName == null || protocol == null || portNumber == null) {
            LOG.warn("Jmeter test server is not set, function test functionnality will therefore not be available.");
        }
        keycloak = Keycloak.getInstance(serverUrl, realm, userName, password, clientId, clientSecret);

    }

    public List<SampleResult> executeTest(String functionCode) throws IOException {
        if (JMETER_BIN_FOLDER == null) {
            throw new IllegalArgumentException("JMeter binary path is not set.");
        }

        if (userName == null || password == null) {
            throw new IllegalArgumentException("Jmeter user is not set.");
        }

        if (hostName == null || protocol == null || portNumber == null) {
            throw new IllegalArgumentException("Jmeter test server is not set.");
        }

        // Temp log file
        File logFile = File.createTempFile(functionCode, ".log");

        // Retrieve and create test file
        final Function function = concreteFunctionService.findByCode(functionCode);
        concreteFunctionService.detach(function);

        File jmxFile = File.createTempFile(functionCode, ".jmx");

        String testSuiteString = function.getTestSuite();

        // Activate functional test mode to get full data to be saved
        testSuiteString = testSuiteString.replace(
                "<boolProp name=\"TestPlan.functional_mode\">false</boolProp>",
                "<boolProp name=\"TestPlan.functional_mode\">true</boolProp>"
        );

        FileWriter writer = new FileWriter(jmxFile);
        writer.write(testSuiteString);
        writer.close();

        final String accessTokenString = keycloak.tokenManager().getAccessTokenString();

        // Execute test
        File jtlFile = File.createTempFile(functionCode, ".xml");

        String commandLine = String.format("%s -n -t %s -l %s -j %s -Dtoken=%s -DhostName=%s -Dprotocol=%s -DportNumber=%s " +
                        "-Jjmeter.save.saveservice.output_format=xml",
                JMETER_BIN_FOLDER,
                jmxFile.getAbsolutePath(),
                jtlFile.getAbsolutePath(),
                logFile.getAbsolutePath(),
                accessTokenString,
                hostName,
                protocol,
                portNumber);

        final Process exec = Runtime.getRuntime().exec(commandLine);

        try {
            exec.waitFor();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        final List<SampleResult> sampleResults = new ArrayList<>();

        DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();

        try {
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(jtlFile);

            // Retrieve assertions
            final NodeList assertionResults = doc.getElementsByTagName("assertionResult");
            for(int i = 0; i < assertionResults.getLength(); i++){
                Element n = (Element) assertionResults.item(i);
                boolean success = !Boolean.parseBoolean(n.getElementsByTagName("failure").item(0).getTextContent());
                String name = n.getElementsByTagName("name").item(0).getTextContent();
                String failureMessage = "";
                final NodeList failureMessages = n.getElementsByTagName("failureMessage");
                if (failureMessages != null && failureMessages.getLength() > 0) {
                    failureMessage = failureMessages.item(0).getTextContent();
                }
                sampleResults.add(new SampleResult(success, name, failureMessage));
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        logFile.delete();
        jtlFile.delete();
        jmxFile.delete();

        return sampleResults;

    }

}
