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
package org.meveo.admin.jsf.converter;

import org.meveo.commons.utils.StringUtils;
import org.meveo.model.BusinessEntity;
import org.meveo.service.crm.impl.CustomFieldInstanceService;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.spi.CDI;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;
import javax.inject.Inject;
import java.io.Serializable;

@FacesConverter("entityReferenceValueConverter")
@ApplicationScoped
public class EntityReferenceValueConverter implements Converter<Object>, Serializable {

    private static final long serialVersionUID = 2297474050618191644L;

    @Inject
    private CustomFieldInstanceService customFieldInstanceService;

    @Override
    public Object getAsObject(FacesContext context, UIComponent component, String value) {
        String classname = (String) component.getAttributes().get("classname");
        if(customFieldInstanceService == null) {
            customFieldInstanceService = CDI.current().select(CustomFieldInstanceService.class).get();
        }
        if (!StringUtils.isBlank(classname)) {
            BusinessEntity convertedEntity = customFieldInstanceService.findBusinessEntityCFVByCode(classname, value);
            if (convertedEntity != null) {
                return convertedEntity;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    @Override
    public String getAsString(FacesContext context, UIComponent component, Object value) {
        String str = "";
        if (value instanceof BusinessEntity) {
            str = "" + ((BusinessEntity) value).getCode();
        }
        return str;
    }
}
