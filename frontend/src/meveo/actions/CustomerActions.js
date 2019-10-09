import Action from './Action';
import * as ActionMethods from './ActionMethods';

import CommonService from '../services/CommonService';
const commonService = new CommonService();

import CustomerService from '../services/CustomerService';
const customerService = new CustomerService();

import LocalStorageService from '../services/LocalStorageService';
import Customer from '../model/account/Customer';
import Error from '../model/Error';
import Success from '../model/Success';

export function loginUser(login) {
	const action = new Action(ActionMethods.LOGIN_USER, function(login) {
		commonService.login(login).then(
			response => {
				const { actionStatus, customers } = response;
				const { customer } = customers || {};
				//const [ firstCustomer ] = customer || [];
				if(actionStatus == null || actionStatus.status === "FAIL") {
					this.fail(actionStatus);
				/*} else if (firstCustomer == null) {
					this.fail({
						message: "No customer found."
					});*/
				} else {
					var firstCustomer=[];
					firstCustomer.code = login.username;
					firstCustomer.name = {title: '', firstName:'', lastName:login.username}
					const customer = new Customer(firstCustomer);
					LocalStorageService.setCurrentCustomer(customer, login);
					this.success(customer);
				}
			},
			error => {
				const { response = {} } = error;
				if(response.status === 401){
					this.fail({
						errorCode: response.status,
						message: "Invalid username or password."
					});
				} else {
					this.fail(error);
				}
			}
		);
	});

	action.execute(login);

}

export function signupCustomer(data) {
	const action = new Action(ActionMethods.SIGNUP_CUSTOMER, function(data) {
		customerService.Create(data);
		this.success();
	});

	action.execute(data);

}

export function updateCustomer(data) {
	const action = new Action(ActionMethods.UPDATE_CUSTOMER, function(data) {
		customerService.UpdateCustomer(data).then(
		(response) => {
			console.log(response);
			if(response.status === "FAIL") {
				this.fail(response);
			} else {
				commonService.findUser(data.username).then(oResponse => {
						console.log(oResponse);
						const { actionStatus, customers } = oResponse;
						const { customer } = customers || {};
						const [ firstCustomer ] = customer || [];
						if(actionStatus == null || actionStatus.status === "FAIL") {
							this.fail(actionStatus);
						} else if (firstCustomer == null) {
							this.fail({
								message: "No customer found."
							});
						}else {
							const customer = new Customer(firstCustomer);
							LocalStorageService.set("vpp_currentCustomer", customer);
							customer.success = "success";
							this.success(customer);
						}
					},
					error => {
						this.fail(error);
					}
				);
			}
		},
		(err) => {
			this.fail(err);
			}
		);
	});

action.execute(data);
}

export function updateUser(data) {
	const action = new Action(ActionMethods.UPDATE_USER, function(data) {
		customerService.UpdateUser(data).then(
			(response) => {
				if(response == null || response.status === "FAIL") {
					this.fail(response);
				}  else {
					const currentCustomer = LocalStorageService.getCurrentCustomer();
					const customer = Object.assign({}, currentCustomer);
					customer.success = "success";
					this.success(customer);
				}
			},
			(err) => {
				this.fail(err);
			}
		);
	});
action.execute(data);
}

export function forgotPassword(email) {
	const action = new Action(ActionMethods.FORGOT_PASSWORD, function(email) {
		commonService.forgotPassword(email).then(
			response => {
				if(response == null || response.status === "FAIL") {
					this.fail(response);
				}  else {
					const result = new Success(response);
					result.message = "forgot_password_success";
					this.success(result);
				}
			},
			err => {
				this.fail(err);
			}
		);
	});

	action.execute(email);

}

export function getCurrentCustomer() {
	const action = new Action(ActionMethods.GET_CURRENT_CUSTOMER, function() {
		const currentCustomer = LocalStorageService.get("vpp_currentCustomer");
		//console.log(currentCustomer);
		//console.log("CURRENT CUST: "+JSON.stringify(currentCustomer));
		if (currentCustomer == null){
			return this.success(null);
		}
		return this.success(currentCustomer);
	});

	action.execute();
}

export function logoutCurrentCustomer() {
	const action = new Action(ActionMethods.LOGOUT_CURRENT_CUSTOMER, function() {
		const currentCustomer = LocalStorageService.get("vpp_currentCustomer");
		if (currentCustomer == null){
			this.fail(new Error({
				message: "No customer found."
			}));
		}
		LocalStorageService.removeCurrentCustomer();
		return this.success();
	});

	action.execute();

}
