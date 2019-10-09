/*
 * (C) Copyright 2015-2016 Opencell SAS (http://opencellsoft.com/) and contributors.
 * (C) Copyright 2009-2014 Manaty SARL (http://manaty.net/) and contributors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
 * This program is not suitable for any direct or indirect application in MILITARY industry
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package org.meveo.service.admin.impl;

import org.meveo.admin.exception.BusinessException;
import org.meveo.commons.utils.EjbUtils;
import org.meveo.commons.utils.QueryBuilder;
import org.meveo.commons.utils.ReflectionUtils;
import org.meveo.model.BusinessEntity;
import org.meveo.model.crm.CustomFieldTemplate;
import org.meveo.model.module.MeveoModule;
import org.meveo.model.module.MeveoModuleItem;
import org.meveo.service.api.EntityToDtoConverter;
import org.meveo.service.base.BusinessService;
import org.meveo.service.base.PersistenceService;
import org.meveo.service.crm.impl.CustomFieldTemplateService;
import org.meveo.service.script.module.ModuleScriptInterface;
import org.meveo.service.script.module.ModuleScriptService;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.NoResultException;
import javax.persistence.NonUniqueResultException;
import javax.persistence.TypedQuery;
import java.util.List;

@Stateless
public class GenericModuleService<T extends MeveoModule> extends BusinessService<T> {

    @Inject
    private CustomFieldTemplateService customFieldTemplateService;

    @Inject
    protected EntityToDtoConverter entityToDtoConverter;

    @Inject
    private ModuleScriptService moduleScriptService;

    @SuppressWarnings("rawtypes")
    public void loadModuleItem(MeveoModuleItem item) {

        BusinessEntity entity = null;
        if (CustomFieldTemplate.class.getName().equals(item.getItemClass())) {
            entity = customFieldTemplateService.findByCodeAndAppliesToNoCache(item.getItemCode(), item.getAppliesTo());

        } else {

            String sql = "select mi from " + item.getItemClass() + " mi where mi.code=:code ";

            Class itemClazz;
            try {
                itemClazz = Class.forName(item.getItemClass());
            } catch (ClassNotFoundException e1) {
                log.error("Failed to find a module item {}. Module item class {} unknown", item, item.getItemClass());
                return;
            }
            boolean addFromParam = false;
            boolean addToParam = false;
            if (ReflectionUtils.isClassHasField(itemClazz, "validity")) {
                if (item.getValidity() != null && item.getValidity().getFrom() != null) {
                    sql = sql + " and mi.validity.from = :from";
                    addFromParam = true;
                } else {
                    sql = sql + " and mi.validity.from IS NULL";
                }
                if (item.getValidity() != null && item.getValidity().getTo() != null) {
                    sql = sql + " and mi.validity.to = :to";
                    addToParam = true;
                } else {
                    sql = sql + " and mi.validity.to IS NULL";
                }
            }
            TypedQuery<BusinessEntity> query = getEntityManager().createQuery(sql, BusinessEntity.class);
            query.setParameter("code", item.getItemCode());
            if (addFromParam) {
                query.setParameter("from", item.getValidity().getFrom());
            }
            if (addToParam) {
                query.setParameter("to", item.getValidity().getTo());
            }
            try {
                entity = query.getSingleResult();

            } catch (NoResultException | NonUniqueResultException e) {
                log.error("Failed to find a module item {}. Reason: {}", item, e.getClass().getSimpleName());
                return;
            } catch (Exception e) {
                log.error("Failed to find a module item {}", item, e);
                return;
            }
        }
        item.setItemEntity(entity);

    }

    @Override
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public T disable(T module) throws BusinessException {

        // if module is local module (was not downloaded) just disable as any other entity without iterating module items
        if (!module.isDownloaded()) {
            return super.disable(module);
        }

        if (!module.isInstalled()) {
            // throw new BusinessException("Module is not installed");
            return module;
        }

        ModuleScriptInterface moduleScript = null;
        if (module.getScript() != null) {
            moduleScript = moduleScriptService.preDisableModule(module.getScript().getCode(), module);
        }

        for (MeveoModuleItem item : module.getModuleItems()) {
            loadModuleItem(item);
            BusinessEntity itemEntity = item.getItemEntity();
            if (itemEntity == null) {
                continue;
            }

            try {
                // Find API service class first trying with item's classname and then with its super class (a simplified version instead of trying various class
                // superclasses)
                Class clazz = Class.forName(item.getItemClass());
                PersistenceService persistenceServiceForItem = (PersistenceService) EjbUtils.getServiceInterface(clazz);
                if (persistenceServiceForItem == null) {
                    persistenceServiceForItem = (PersistenceService) EjbUtils.getServiceInterface(clazz.getSuperclass());
                }
                if (persistenceServiceForItem == null) {
                    log.error("Failed to find implementation of persistence service for class {}", item.getItemClass());
                    continue;
                }

                persistenceServiceForItem.disable(itemEntity);

            } catch (Exception e) {
                log.error("Failed to disable module item. Module item {}", item, e);
            }
        }

        if (moduleScript != null) {
            moduleScriptService.postDisableModule(moduleScript, module);
        }

        return super.disable(module);
    }

    @Override
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public T enable(T module) throws BusinessException {

        // if module is local module (was not downloaded) just disable as any other entity without iterating module items
        if (!module.isDownloaded()) {
            return super.enable(module);
        }

        if (!module.isInstalled()) {
            // throw new BusinessException("Module is not installed");
            return module;
        }

        ModuleScriptInterface moduleScript = null;
        if (module.getScript() != null) {
            moduleScript = moduleScriptService.preEnableModule(module.getScript().getCode(), module);
        }

        for (MeveoModuleItem item : module.getModuleItems()) {
            loadModuleItem(item);
            BusinessEntity itemEntity = item.getItemEntity();
            if (itemEntity == null) {
                continue;
            }

            try {
                // Find API service class first trying with item's classname and then with its super class (a simplified version instead of trying various class
                // superclasses)
                Class clazz = Class.forName(item.getItemClass());
                PersistenceService persistenceServiceForItem = (PersistenceService) EjbUtils.getServiceInterface(clazz.getSimpleName() + "Service");
                if (persistenceServiceForItem == null) {
                    persistenceServiceForItem = (PersistenceService) EjbUtils.getServiceInterface(clazz.getSuperclass().getSimpleName() + "Service");
                }
                if (persistenceServiceForItem == null) {
                    log.error("Failed to find implementation of persistence service for class {}", item.getItemClass());
                    continue;
                }

                persistenceServiceForItem.enable(itemEntity);

            } catch (Exception e) {
                log.error("Failed to enable module item. Module item {}", item, e);
            }
        }

        if (moduleScript != null) {
            moduleScriptService.postEnableModule(moduleScript, module);
        }

        return super.enable(module);
    }

    @SuppressWarnings("unchecked")
    @Override
    public void remove(T module) throws BusinessException {

        // If module was downloaded, remove all submodules as well
        if (module.isDownloaded() && module.getModuleItems() != null) {

            for (MeveoModuleItem item : module.getModuleItems()) {
                try {
                    if (MeveoModule.class.isAssignableFrom(Class.forName(item.getItemClass()))) {
                        loadModuleItem(item);
                        T itemModule = (T) item.getItemEntity();
                        remove(itemModule);
                    }
                } catch (Exception e) {
                    log.error("Failed to delete a submodule", e);
                }
            }
        }

        super.remove(module);
    }
    
    @SuppressWarnings("unchecked")
    public List<T> listInstalled() {
        QueryBuilder qb = new QueryBuilder(entityClass, "b", null);
        qb.startOrClause();
        qb.addCriterion("installed", "=", true, true);
        qb.addSql("moduleSource is null");
        qb.endOrClause();

        try {
            return (List<T>) qb.getQuery(getEntityManager()).getResultList();
        } catch (NoResultException e) {
            return null;
        }
    }

}