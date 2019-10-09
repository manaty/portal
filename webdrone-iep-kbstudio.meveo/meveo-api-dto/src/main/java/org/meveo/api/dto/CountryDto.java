package org.meveo.api.dto;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.meveo.model.billing.Country;


/**
 * The Class CountryDto.
 *
 * @author Edward P. Legaspi
 * @since Oct 4, 2013
 * @deprecated will be renammed to TradingCountryDto
 */
@XmlRootElement(name = "Country")
@XmlAccessorType(XmlAccessType.FIELD)
public class CountryDto extends BaseDto {

    /** The Constant serialVersionUID. */
    private static final long serialVersionUID = -4175660113940481232L;

    /** The country code. */
    @XmlAttribute(required = true)
    private String countryCode;

    /** The name. */
    @XmlAttribute()
    private String name;

    /** The currency code. */
    @XmlElement(required = true)
    private String currencyCode;

    /** The language code. */
    private String languageCode;

    /**
     * Instantiates a new country dto.
     */
    public CountryDto() {

    }

    /**
     * Instantiates a new country dto.
     *
     * @param country the Country enntity
     */
    public CountryDto(Country country) {
        countryCode = country.getCountryCode();
        name = country.getDescription();
        currencyCode = country.getCurrency().getCurrencyCode();

        if (country.getLanguage() != null) {
            languageCode = country.getLanguage().getLanguageCode();
        }
    }

    /**
     * Gets the country code.
     *
     * @return the country code
     */
    public String getCountryCode() {
        return countryCode;
    }

    /**
     * Sets the country code.
     *
     * @param countryCode the new country code
     */
    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    /**
     * Gets the name.
     *
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name.
     *
     * @param name the new name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets the currency code.
     *
     * @return the currency code
     */
    public String getCurrencyCode() {
        return currencyCode;
    }

    /**
     * Sets the currency code.
     *
     * @param currencyCode the new currency code
     */
    public void setCurrencyCode(String currencyCode) {
        this.currencyCode = currencyCode;
    }

    /**
     * Gets the language code.
     *
     * @return the language code
     */
    public String getLanguageCode() {
        return languageCode;
    }

    /**
     * Sets the language code.
     *
     * @param languageCode the new language code
     */
    public void setLanguageCode(String languageCode) {
        this.languageCode = languageCode;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "CountryDto [countryCode=" + countryCode + ", name=" + name + ", currencyCode=" + currencyCode + ", languageCode=" + languageCode + "]";
    }

}
