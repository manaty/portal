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
package org.meveo.model.billing;

import org.apache.commons.lang.StringUtils;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.meveo.model.BusinessCFEntity;
import org.meveo.model.CustomFieldEntity;
import org.meveo.model.ICustomFieldEntity;
import org.meveo.model.ObservableEntity;
import org.meveo.model.catalog.Calendar;
import org.meveo.model.catalog.ServiceTemplate;
import org.meveo.model.order.OrderItemActionEnum;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Date;

/**
 * @author Edward P. Legaspi
 * @author akadid abdelmounaim
 * @lastModifiedVersion 5.0.1
 */
@Entity
@ObservableEntity
@CustomFieldEntity(cftCodePrefix = "SERVICE_INSTANCE")
@Table(name = "billing_service_instance")
@AttributeOverrides({ @AttributeOverride(name = "code", column = @Column(name = "code", unique = false)) })
@GenericGenerator(name = "ID_GENERATOR", strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator", parameters = {
        @Parameter(name = "sequence_name", value = "billing_service_instance_seq"), })
public class ServiceInstance extends BusinessCFEntity {

    private static final long serialVersionUID = 1L;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_template_id")
    private ServiceTemplate serviceTemplate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoicing_calendar_id")
    private Calendar invoicingCalendar;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private InstanceStatusEnum status;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "status_date")
    private Date statusDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "subscription_date")
    private Date subscriptionDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "termination_date")
    private Date terminationDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "end_agrement_date")
    private Date endAgreementDate;

    @Column(name = "quantity", precision = NB_PRECISION, scale = NB_DECIMALS)
    private BigDecimal quantity = BigDecimal.ONE;

    /**
     * Used to track if "quantity" field value has changed. Value is populated on postLoad, postPersist and postUpdate JPA events
     */
    @Transient
    private BigDecimal previousQuantity;

    @Column(name = "order_number", length = 100)
    @Size(max = 100)
    private String orderNumber;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "rate_until_date")
    private Date rateUntilDate;

    @Column(name = "minimum_amount_el", length = 2000)
    @Size(max = 2000)
    private String minimumAmountEl;

    @Column(name = "minimum_label_el", length = 2000)
    @Size(max = 2000)
    private String minimumLabelEl;

    /**
     * PK of OrderItem.id.
     */
    @Transient
    private Long orderItemId;

    @Transient
    private OrderItemActionEnum orderItemAction;

    public Date getEndAgreementDate() {
        return endAgreementDate;
    }

    public void setEndAgreementDate(Date endAgreementDate) {
        this.endAgreementDate = endAgreementDate;
    }

    public InstanceStatusEnum getStatus() {
        return status;
    }

    public void setStatus(InstanceStatusEnum status) {
        this.status = status;
        this.statusDate = new Date();
    }

    public Date getStatusDate() {
        return statusDate;
    }

    public void setStatusDate(Date statusDate) {
        this.statusDate = statusDate;
    }

    public Date getSubscriptionDate() {
        return subscriptionDate;
    }

    public void setSubscriptionDate(Date subscriptionDate) {
        this.subscriptionDate = subscriptionDate;
    }

    public Date getTerminationDate() {
        return terminationDate;
    }

    public void setTerminationDate(Date terminationDate) {
        this.terminationDate = terminationDate;
    }

    public ServiceTemplate getServiceTemplate() {
        return serviceTemplate;
    }

    public void setServiceTemplate(ServiceTemplate serviceTemplate) {
        this.serviceTemplate = serviceTemplate;
    }

    public Calendar getInvoicingCalendar() {
        return invoicingCalendar;
    }

    public void setInvoicingCalendar(Calendar invoicingCalendar) {
        this.invoicingCalendar = invoicingCalendar;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public String getDescriptionAndStatus() {
        if (!StringUtils.isBlank(description))
            return description + ", " + status;
        else
            return status.name();
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public Date getRateUntilDate() {
        return rateUntilDate;
    }

    public void setRateUntilDate(Date rateUntilDate) {
        this.rateUntilDate = rateUntilDate;
    }

    @Override
    public boolean equals(Object obj) {

        if (this == obj) {
            return true;
        } else if (obj == null) {
            return false;
        } else if (!(obj instanceof ServiceInstance)) {
            return false;
        }

        ServiceInstance other = (ServiceInstance) obj;

        if (getId() != null && other.getId() != null && getId().equals(other.getId())) {
            return true;
        }
        return false;
    }

    @Override
    public ICustomFieldEntity[] getParentCFEntities() {
        return new ICustomFieldEntity[] { serviceTemplate };
    }

    @PostLoad
    @PostPersist
    @PostUpdate
    private void trackPreviousValues() {
        previousQuantity = quantity;
    }

    /**
     * Check if current and previous "quantity" field values match. Note: previous value is set to current value at postLoad, postPersist, postUpdate JPA events
     * 
     * @return True if current and previous "quantity" field values DO NOT match
     */
    public boolean isQuantityChanged() {
        return quantity == null ? previousQuantity != null : previousQuantity == null ? true : quantity.compareTo(previousQuantity) != 0;
    }

    public BigDecimal getPreviousQuantity() {
        return previousQuantity;
    }

    public Long getOrderItemId() {
        return orderItemId;
    }

    public void setOrderItemId(Long orderItemId) {
        this.orderItemId = orderItemId;
    }

    public OrderItemActionEnum getOrderItemAction() {
        return orderItemAction;
    }

    public void setOrderItemAction(OrderItemActionEnum orderItemAction) {
        this.orderItemAction = orderItemAction;
    }

    public String getMinimumAmountEl() {
        return minimumAmountEl;
    }

    public void setMinimumAmountEl(String minimumAmountEl) {
        this.minimumAmountEl = minimumAmountEl;
    }

    public String getMinimumLabelEl() {
        return minimumLabelEl;
    }

    public void setMinimumLabelEl(String minimumLabelEl) {
        this.minimumLabelEl = minimumLabelEl;
    }
}