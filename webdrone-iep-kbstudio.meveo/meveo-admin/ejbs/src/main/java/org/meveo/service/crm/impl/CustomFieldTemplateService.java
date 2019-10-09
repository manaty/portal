package org.meveo.service.crm.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.NoResultException;

import org.apache.commons.lang3.SerializationUtils;
import org.meveo.admin.exception.BusinessException;
import org.meveo.admin.exception.ValidationException;
import org.meveo.cache.CustomFieldsCacheContainerProvider;
import org.meveo.commons.utils.ParamBean;
import org.meveo.commons.utils.QueryBuilder;
import org.meveo.model.ICustomFieldEntity;
import org.meveo.model.catalog.CalendarDaily;
import org.meveo.model.catalog.CalendarInterval;
import org.meveo.model.catalog.CalendarYearly;
import org.meveo.model.crm.CustomFieldTemplate;
import org.meveo.model.crm.custom.CustomFieldMatrixColumn;
import org.meveo.model.crm.custom.CustomFieldTypeEnum;
import org.meveo.model.customEntities.CustomEntityTemplate;
import org.meveo.model.customEntities.CustomRelationshipTemplate;
import org.meveo.model.persistence.DBStorageType;
import org.meveo.model.persistence.sql.SQLStorageConfiguration;
import org.meveo.service.base.BusinessService;
import org.meveo.service.custom.CustomEntityTemplateService;
import org.meveo.service.custom.CustomRelationshipTemplateService;
import org.meveo.service.custom.CustomTableCreatorService;
import org.meveo.service.index.ElasticClient;
import org.meveo.util.EntityCustomizationUtils;
import org.meveo.util.PersistenceUtils;
import org.olap4j.metadata.XmlaConstants.DBType;

/**
 * @author Wassim Drira
 * @author Clément Bareth
 * @lastModifiedVersion 6.0
 */
@Stateless
public class CustomFieldTemplateService extends BusinessService<CustomFieldTemplate> {

    @Inject
    private CustomFieldsCacheContainerProvider customFieldsCache;

    @Inject
    private ElasticClient elasticClient;

    @Inject
    private CustomTableCreatorService customTableCreatorService;

    @Inject
    private CustomEntityTemplateService customEntityTemplateService;
    
    @Inject
    private CustomRelationshipTemplateService customRelationshipTemplateService;

    static boolean useCFTCache = true;

    @PostConstruct
    private void init() {
        useCFTCache = Boolean.parseBoolean(ParamBean.getInstance().getProperty("cache.cacheCFT", "true"));
    }

    @SuppressWarnings("unchecked")
    public List<CustomFieldTemplate> findCftUniqueFieldsByApplies(String appliesTo) {
        QueryBuilder qb = new QueryBuilder(CustomFieldTemplate.class, "c", null);
        qb.addCriterion("appliesTo", "=", appliesTo, true);
        qb.addBooleanCriterion("unique", true);
        try {
            return (List<CustomFieldTemplate> ) qb.getQuery(getEntityManager()).getResultList();
        } catch (NoResultException e) {
            return null;
        }
    }

    /**
     * Find a list of custom field templates corresponding to a given entity
     * 
     * @param entity Entity that custom field templates apply to
     * @return A list of custom field templates mapped by a template key
     */
    public Map<String, CustomFieldTemplate> findByAppliesTo(ICustomFieldEntity entity) {
        try {
            return findByAppliesTo(CustomFieldTemplateUtils.calculateAppliesToValue(entity));

        } catch (CustomFieldException e) {
            // Its ok, handles cases when value that is part of CFT.AppliesTo calculation is not set yet on entity
            return new HashMap<String, CustomFieldTemplate>();
        }
    }

    /**
     * Find a list of custom field templates corresponding to a given entity. Custom field templates are looked up in cache or retrieved from DB.
     * 
     * @param appliesTo Entity (CFT appliesTo code) that custom field templates apply to
     * @return A list of custom field templates mapped by a template code
     */
    public Map<String, CustomFieldTemplate> findByAppliesTo(String appliesTo) {

        if (useCFTCache) {

            Map<String, CustomFieldTemplate> cfts = customFieldsCache.getCustomFieldTemplates(appliesTo);

            // Populate cache if record is not found in cache
            if (cfts == null) {
                cfts = findByAppliesToNoCache(appliesTo);
                if (cfts.isEmpty()) {
                    customFieldsCache.markNoCustomFieldTemplates(appliesTo);
                } else {
                    cfts.forEach((code, cft) -> customFieldsCache.addUpdateCustomFieldTemplate(cft));
                }
            }

            return cfts;

        } else {
            return findByAppliesToNoCache(appliesTo);
        }
    }

    /**
     * Find a list of custom field templates corresponding to a given entity - always do a lookup in DB
     * 
     * @param appliesTo Entity (CFT appliesTo code) that custom field templates apply to
     * @return A list of custom field templates mapped by a template key
     */
    public Map<String, CustomFieldTemplate> findByAppliesToNoCache(String appliesTo) {

        List<CustomFieldTemplate> values = getEntityManager().createNamedQuery("CustomFieldTemplate.getCFTByAppliesTo", CustomFieldTemplate.class)
            .setParameter("appliesTo", appliesTo).getResultList();

        Map<String, CustomFieldTemplate> cftMap = values.stream().collect(Collectors.toMap(cft -> cft.getCode(), cft -> cft));

        return cftMap;
    }

    /**
     * Find a specific custom field template by a code
     * 
     * @param code Custom field template code
     * @param entity Entity that custom field templates apply to
     * @return Custom field template or NULL if not found
     */
    public CustomFieldTemplate findByCodeAndAppliesTo(String code, ICustomFieldEntity entity) {
        try {
            return findByCodeAndAppliesTo(code, CustomFieldTemplateUtils.calculateAppliesToValue(entity));

        } catch (CustomFieldException e) {
            log.error("Can not determine applicable CFT type for entity of {} class.", entity.getClass().getSimpleName());
        }
        return null;
    }

    /**
     * Find a specific custom field template by a code. Custom field template will be looked up from cache or retrieved from DB.
     * 
     * @param code Custom field template code
     * @param appliesTo Entity (CFT appliesTo code) that custom field templates apply to
     * @return Custom field template or NULL if not found
     */
    public CustomFieldTemplate findByCodeAndAppliesTo(String code, String appliesTo) {

        if (useCFTCache) {

            CustomFieldTemplate cft = customFieldsCache.getCustomFieldTemplate(code, appliesTo);

            // Populate cache if record is not found in cache
            if (cft == null) {
                cft = findByCodeAndAppliesToNoCache(code, appliesTo);
                if (cft != null) {
                    customFieldsCache.addUpdateCustomFieldTemplate(cft);
                }
            }
            return cft;

        } else {
            return findByCodeAndAppliesToNoCache(code, appliesTo);
        }
    }

    /**
     * Find a specific custom field template by a code bypassing cache - always do a lookup in DB
     * 
     * @param code Custom field template code
     * @param appliesTo Entity (CFT appliesTo code) that custom field templates apply to
     * @return Custom field template or NULL if not found
     */
    public CustomFieldTemplate findByCodeAndAppliesToNoCache(String code, String appliesTo) {

        try {
            return getEntityManager().createNamedQuery("CustomFieldTemplate.getCFTByCodeAndAppliesTo", CustomFieldTemplate.class).setParameter("code", code)
                .setParameter("appliesTo", appliesTo).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
	public void create(CustomFieldTemplate cft) throws BusinessException {

		checkIdentifierTypeAndUniqueness(cft);

		super.create(cft);

		String entityCode = EntityCustomizationUtils.getEntityCode(cft.getAppliesTo());
		
		// CF applies to a CET
		if(cft.getAppliesTo().startsWith(CustomEntityTemplate.CFT_PREFIX)) {
			CustomEntityTemplate cet = customEntityTemplateService.findByCode(entityCode);
			if(cet == null) {
				log.warn("Custom entity template {} was not found", entityCode);
			}else if (cet.getSqlStorageConfiguration() != null && cet.getSqlStorageConfiguration().isStoreAsTable()) {
				customTableCreatorService.addField(SQLStorageConfiguration.getDbTablename(cet), cft);
			}
			
		// CF Applies to a CRT
		} else if(cft.getAppliesTo().startsWith(CustomRelationshipTemplate.CRT_PREFIX)) {
			CustomRelationshipTemplate crt = customRelationshipTemplateService.findByCode(entityCode);
			if(crt == null) {
				log.warn("Custom relationship template {} was not found", entityCode);
			}else if (crt.getAvailableStorages().contains(DBStorageType.SQL)) {
				customTableCreatorService.addField(SQLStorageConfiguration.getDbTablename(crt), cft);
			}
		}

		customFieldsCache.addUpdateCustomFieldTemplate(cft);
		elasticClient.updateCFMapping(cft);
	}

    @Override
    public CustomFieldTemplate update(CustomFieldTemplate cft) throws BusinessException {

        checkIdentifierTypeAndUniqueness(cft);

        CustomFieldTemplate cftUpdated = super.update(cft);

        customFieldsCache.addUpdateCustomFieldTemplate(cftUpdated);
        elasticClient.updateCFMapping(cftUpdated);
        
		String entityCode = EntityCustomizationUtils.getEntityCode(cft.getAppliesTo());

		// CF applies to a CET
		if(cft.getAppliesTo().startsWith(CustomEntityTemplate.CFT_PREFIX)) {
			CustomEntityTemplate cet = customEntityTemplateService.findByCode(entityCode);
			if(cet == null) {
				log.warn("Custom entity template {} was not found", entityCode);
			}else if (cet.getSqlStorageConfiguration() != null && cet.getSqlStorageConfiguration().isStoreAsTable()) {
	            customTableCreatorService.updateField(SQLStorageConfiguration.getDbTablename(cet), cft);
			}
			
		// CF Applies to a CRT
		} else if(cft.getAppliesTo().startsWith(CustomRelationshipTemplate.CRT_PREFIX)) {
			CustomRelationshipTemplate crt = customRelationshipTemplateService.findByCode(entityCode);
			if(crt == null) {
				log.warn("Custom relationship template {} was not found", entityCode);
			}else if (crt.getAvailableStorages().contains(DBStorageType.SQL)) {
	            customTableCreatorService.updateField(SQLStorageConfiguration.getDbTablename(crt), cft);
			}
		}

        return cftUpdated;
    }

    @Override
    public void remove(CustomFieldTemplate cft) throws BusinessException {
        customFieldsCache.removeCustomFieldTemplate(cft);
        super.remove(cft);
        
    	String entityCode = EntityCustomizationUtils.getEntityCode(cft.getAppliesTo());

		// CF applies to a CET
		if(cft.getAppliesTo().startsWith(CustomEntityTemplate.CFT_PREFIX)) {
			CustomEntityTemplate cet = customEntityTemplateService.findByCode(entityCode);
			if(cet == null) {
				log.warn("Custom entity template {} was not found", entityCode);
			}else if (cet.getSqlStorageConfiguration() != null && cet.getSqlStorageConfiguration().isStoreAsTable()) {
	            customTableCreatorService.removeField(SQLStorageConfiguration.getDbTablename(cet), cft);
			}
			
		// CF Applies to a CRT
		} else if(cft.getAppliesTo().startsWith(CustomRelationshipTemplate.CRT_PREFIX)) {
			CustomRelationshipTemplate crt = customRelationshipTemplateService.findByCode(entityCode);
			if(crt == null) {
				log.warn("Custom relationship template {} was not found", entityCode);
			}else if (crt.getAvailableStorages().contains(DBStorageType.SQL)) {
	            customTableCreatorService.removeField(SQLStorageConfiguration.getDbTablename(crt), cft);
			}
		}

    }

    @Override
    public CustomFieldTemplate enable(CustomFieldTemplate cft) throws BusinessException {
        cft = super.enable(cft);
        customFieldsCache.addUpdateCustomFieldTemplate(cft);
        return cft;
    }

    @Override
    public CustomFieldTemplate disable(CustomFieldTemplate cft) throws BusinessException {
        cft = super.disable(cft);
        customFieldsCache.removeCustomFieldTemplate(cft);
        return cft;
    }

    /**
     * Get a list of custom field templates for cache
     * 
     * @return A list of custom field templates
     */
    public List<CustomFieldTemplate> getCFTForCache() {
        List<CustomFieldTemplate> cfts = getEntityManager().createNamedQuery("CustomFieldTemplate.getCFTForCache", CustomFieldTemplate.class).getResultList();
        return cfts;
    }

    /**
     * Get a list of custom field templates for index
     * 
     * @return A list of custom field templates
     */
    public List<CustomFieldTemplate> getCFTForIndex() {
        List<CustomFieldTemplate> cfts = getEntityManager().createNamedQuery("CustomFieldTemplate.getCFTForIndex", CustomFieldTemplate.class).getResultList();
        return cfts;
    }

    /**
     * Check and create missing templates given a list of templates.
     * 
     * @param entity Entity that custom field templates apply to
     * @param templates A list of templates to check
     * @return A complete list of templates for a given entity. Mapped by a custom field template key.
     * @throws BusinessException business exception.
     */
    public Map<String, CustomFieldTemplate> createMissingTemplates(ICustomFieldEntity entity, Collection<CustomFieldTemplate> templates) throws BusinessException {
        try {
            return createMissingTemplates(CustomFieldTemplateUtils.calculateAppliesToValue(entity), templates, false, false);

        } catch (CustomFieldException e) {
            // Its OK, handles cases when value that is part of CFT.AppliesTo calculation is not set yet on entity
            return new HashMap<String, CustomFieldTemplate>();
        }
    }

    /**
     * Check and create missing templates given a list of templates.
     * 
     * @param appliesTo Entity (CFT appliesTo code) that custom field templates apply to
     * @param templates A list of templates to check
     * @return A complete list of templates for a given entity. Mapped by a custom field template key.
     * @throws BusinessException business exception.
     */
    public Map<String, CustomFieldTemplate> createMissingTemplates(String appliesTo, Collection<CustomFieldTemplate> templates) throws BusinessException {
        return createMissingTemplates(appliesTo, templates, false, false);
    }

    /**
     * Check and create missing templates given a list of templates.
     * 
     * @param entity Entity that custom field templates apply to
     * @param templates A list of templates to check
     * @param removeOrphans When set to true, this will remove custom field templates that are not included in the templates collection.
     * @param updateExisting true if updating existing templates
     * @return A complete list of templates for a given entity. Mapped by a custom field template key.
     * @throws BusinessException business exception.
     */
    public Map<String, CustomFieldTemplate> createMissingTemplates(ICustomFieldEntity entity, Collection<CustomFieldTemplate> templates, boolean updateExisting,
            boolean removeOrphans) throws BusinessException {
        try {
            return createMissingTemplates(CustomFieldTemplateUtils.calculateAppliesToValue(entity), templates, updateExisting, removeOrphans);
        } catch (CustomFieldException e) {
            // Its OK, handles cases when value that is part of CFT.AppliesTo calculation is not set yet on entity
            return new HashMap<String, CustomFieldTemplate>();
        }
    }

    /**
     * Check and create missing templates given a list of templates.
     * 
     * @param appliesTo Entity (CFT appliesTo code) that custom field templates apply to
     * @param templates A list of templates to check
     * @param removeOrphans When set to true, this will remove custom field templates that are not included in the templates collection.
     * @param updateExisting true when updating missing template.
     * @return A complete list of templates for a given entity. Mapped by a custom field template key.
     * @throws BusinessException business exception.
     */
    public Map<String, CustomFieldTemplate> createMissingTemplates(String appliesTo, Collection<CustomFieldTemplate> templates, boolean updateExisting, boolean removeOrphans)
            throws BusinessException {

        // Get templates corresponding to an entity type
        Map<String, CustomFieldTemplate> allTemplates = findByAppliesToNoCache(appliesTo);

        if (templates != null) {
            CustomFieldTemplate existingCustomField = null;
            for (CustomFieldTemplate cft : templates) {
                if (!allTemplates.containsKey(cft.getCode())) {
                    log.debug("Create a missing CFT {} for {} entity", cft.getCode(), appliesTo);
                    create(cft);
                    allTemplates.put(cft.getCode(), cft);
                } else if (updateExisting) {
                    existingCustomField = allTemplates.get(cft.getCode());
                    existingCustomField.setDescription(cft.getDescription());
                    existingCustomField.setStorageType(cft.getStorageType());
                    existingCustomField.setAllowEdit(cft.isAllowEdit());
                    existingCustomField.setDefaultValue(cft.getDefaultValue());
                    existingCustomField.setFieldType(cft.getFieldType());
                    existingCustomField.setEntityClazz(cft.getEntityClazz());
                    existingCustomField.setListValues(cft.getListValues());
                    existingCustomField.setGuiPosition(cft.getGuiPosition());
                    log.debug("Update existing CFT {} for {} entity", cft.getCode(), appliesTo);
                    update(existingCustomField);
                }
            }
            if (removeOrphans) {
                CustomFieldTemplate customFieldTemplate = null;
                List<CustomFieldTemplate> forRemoval = new ArrayList<>();
                for (Map.Entry<String, CustomFieldTemplate> customFieldTemplateEntry : allTemplates.entrySet()) {
                    customFieldTemplate = customFieldTemplateEntry.getValue();
                    if (!templates.contains(customFieldTemplate)) {
                        // add to separate list to avoid ConcurrentModificationException
                        forRemoval.add(customFieldTemplate);
                    }
                }
                for (CustomFieldTemplate fieldTemplate : forRemoval) {
                    remove(fieldTemplate);
                }
            }
        }
        return allTemplates;
    }

    /**
     * Copy and associate a given custom field template to a given target entity type.
     * 
     * @param cft Custom field template to copy
     * @param targetAppliesTo Target CFT.appliesTo value associate custom field template with
     * @return custom field template
     * @throws BusinessException business exception.
     */
    public CustomFieldTemplate copyCustomFieldTemplate(CustomFieldTemplate cft, String targetAppliesTo) throws BusinessException {

        if (findByCodeAndAppliesTo(cft.getCode(), targetAppliesTo) != null) {
            throw new ValidationException("Custom field template " + cft.getCode() + " already exists in targe entity " + targetAppliesTo,
                "customFieldTemplate.copyCFT.alreadyExists");
        }

        // Load calendar for lazy loading
        if (cft.getCalendar() != null) {
            cft.setCalendar(PersistenceUtils.initializeAndUnproxy(cft.getCalendar()));
            if (cft.getCalendar() instanceof CalendarDaily) {
                ((CalendarDaily) cft.getCalendar()).setHours(PersistenceUtils.initializeAndUnproxy(((CalendarDaily) cft.getCalendar()).getHours()));
                cft.getCalendar().nextCalendarDate(new Date());
            } else if (cft.getCalendar() instanceof CalendarYearly) {
                ((CalendarYearly) cft.getCalendar()).setDays(PersistenceUtils.initializeAndUnproxy(((CalendarYearly) cft.getCalendar()).getDays()));
                cft.getCalendar().nextCalendarDate(new Date());
            } else if (cft.getCalendar() instanceof CalendarInterval) {
                ((CalendarInterval) cft.getCalendar()).setIntervals(PersistenceUtils.initializeAndUnproxy(((CalendarInterval) cft.getCalendar()).getIntervals()));
                cft.getCalendar().nextCalendarDate(new Date());
            }
        }
        if (cft.getListValues() != null) {
            cft.getListValues().values().toArray(new String[] {});
        }

        if (cft.getMatrixColumns() != null) {
            cft.getMatrixColumns().toArray(new CustomFieldMatrixColumn[] {});
        }

        detach(cft);

        CustomFieldTemplate cftCopy = SerializationUtils.clone(cft);
        cftCopy.setId(null);
        cftCopy.setVersion(null);
        cftCopy.setAppliesTo(targetAppliesTo);

        if (cft.getListValues() != null) {
            cftCopy.setListValues(new HashMap<>());
            cftCopy.getListValues().putAll(cft.getListValues());
        }

        if (cft.getMatrixColumns() != null) {
            cftCopy.setMatrixColumns(new ArrayList<>());
            cftCopy.getMatrixColumns().addAll(cft.getMatrixColumns());
        }

        create(cftCopy);

        return cftCopy;
    }

    /**
     * There can only be one identifier field for a CET / CFT, and it must be a String or a Long
     *
     * @param cft Field to validate
     * @throws ValidationException if field is not valid
     */
    private void checkIdentifierTypeAndUniqueness(CustomFieldTemplate cft) throws ValidationException {
        if(cft.isIdentifier()){
            if(cft.getFieldType() != CustomFieldTypeEnum.STRING && cft.getFieldType() != CustomFieldTypeEnum.LONG){
                throw new ValidationException("Identifier field can only be String or Long !");
            }

            final Map<String, CustomFieldTemplate> fields = findByAppliesTo(cft.getAppliesTo());
            final boolean identifierAlreadyExist = fields.values()
                    .stream()
                    .anyMatch(customFieldTemplate -> customFieldTemplate.isIdentifier() && !customFieldTemplate.getCode().equals(cft.getCode()));
            if(identifierAlreadyExist){
                throw new ValidationException("An other field has already been defined as identifier !");
            }
        }
    }
}