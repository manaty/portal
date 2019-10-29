import CustomerAccount from './CustomerAccount'
import FrontendError from '../../FrontendError';

export default class Customer {
    constructor(customer) {
        customer = customer || {};

        if (customer.code == null || customer.code.trim() === '') {
            throw new FrontendError("Customer code is invalid.");
        }

        this.code = customer.code;
        this.description = customer.description || '';
        this.name = customer.name || {title: '', firstName:'', lastName:''};
        this.address = customer.address || {};
        this.customFields = customer.customFields;
        this.customerCategory = customer.customerCategory;
        this.seller = customer.seller;
        this.mandateIdentification = customer.mandateIdentification;
        this.mandateDate = customer.mandateDate;
        this.contactInformation = customer.contactInformation;
        this.customerAccount = new CustomerAccount(customer);

    }

}
