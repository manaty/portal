package org.meveo.api.dto.catalog;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * The Class BSMConfigurationDto.
 *
 * @author Edward P. Legaspi
 * @since 2 Oct 2017
 */
@XmlRootElement(name = "BSMConfiguration")
@XmlAccessorType(XmlAccessType.FIELD)
public class BSMConfigurationDto implements Serializable {

    /** The Constant serialVersionUID. */
    private static final long serialVersionUID = 1140305701541170851L;

    /** The code. */
    @XmlAttribute
    private String code;

    /**
     * We used this to configure the custom fields for BSM services.
     */
    @XmlElement(name = "service")
    private ServiceConfigurationDto serviceConfiguration;

    /**
     * Gets the code.
     *
     * @return the code
     */
    public String getCode() {
        return code;
    }

    /**
     * Sets the code.
     *
     * @param code the new code
     */
    public void setCode(String code) {
        this.code = code;
    }

    /**
     * Gets the service configuration.
     *
     * @return the service configuration
     */
    public ServiceConfigurationDto getServiceConfiguration() {
        return serviceConfiguration;
    }

    /**
     * Sets the service configuration.
     *
     * @param serviceConfiguration the new service configuration
     */
    public void setServiceConfiguration(ServiceConfigurationDto serviceConfiguration) {
        this.serviceConfiguration = serviceConfiguration;
    }

}