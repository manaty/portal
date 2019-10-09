package org.meveo.api.dto.catalog;

import java.io.Serializable;

import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.meveo.api.dto.module.MeveoModuleDto;
import org.meveo.model.module.MeveoModule;

/**
 * The Class BusinessProductModelDto.
 * 
 * @author anasseh
 */
@XmlRootElement(name = "BusinessProductModel")
@XmlAccessorType(XmlAccessType.FIELD)
public class BusinessProductModelDto extends MeveoModuleDto implements Serializable {

    /** The Constant serialVersionUID. */
    private static final long serialVersionUID = -4510290371772010482L;

    /**
     * Instantiates a new business product model dto.
     */
    public BusinessProductModelDto() {

    }

    /**
     * Instantiates a new business product model dto.
     *
     * @param module the module
     */
    public BusinessProductModelDto(MeveoModule module) {
        super(module);
    }

}