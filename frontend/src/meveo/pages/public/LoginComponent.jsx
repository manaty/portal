import React, {Component} from 'react';
import {Link, browserHistory } from 'react-router';

import CustomerStore from '../../stores/CustomerStore';
import FormLoaderIndicator  from '../elements/FormLoaderIndicatorComponent.jsx';
import { loginUser } from '../../actions/CustomerActions';
import LocalStorageService from '../../services/LocalStorageService';

import * as properties from  '../../../properties';

class LoginComponent extends Component{

	constructor() {
		super();
		this.state = {
			isLoading : false,
			username: '',
			password: '',
			error: null,
		}
	}

	componentWillMount() {
	    CustomerStore.bindLoadHandler(this.renderLoader.bind(this));
		CustomerStore.bindUpdateHandler(this.redirectOnUpdate.bind(this));
		CustomerStore.bindErrorHandler(this.renderError.bind(this));
	}

	componentWillUnmount() {
	    CustomerStore.unbindLoadHandler(this.renderLoader.bind(this));
		CustomerStore.unbindUpdateHandler(this.redirectOnUpdate.bind(this));
		CustomerStore.unbindErrorHandler(this.renderError.bind(this));
	}

	changeUsername(e) {
		this.setState({
			username: e.target.value
		});
	}

	changePassword(e) {
		this.setState({
			password: e.target.value
		});
	}

	renderSignupMsg(){
		let signup_email = LocalStorageService.get("vpp_signupEmail");
		if(signup_email != null){
			LocalStorageService.remove("vpp_signupEmail");
			window.scrollTo(0,0);
			return(
				<div className="alert alert-success">
					We have sent you an email at {signup_email}, please check it before trying to login.
				</div>
			);
		}
	}

	renderLoader() {
		this.setState({
			isLoading: true,
			error: null
		});
	}

	renderError(error) {
		this.setState({
			isLoading: false,
			error: error
		});
	}

	redirectOnUpdate(customer) {
		this.setState({
			isLoading: false,
			error: null
		});
		if(customer != null) {
			window.location = "index.html#";
		}
	}

	displayError() {
		const { error } = this.state;
		if (error == null){
			return;
		}else{
			window.scrollTo(0,0);
			return (
				<div className="alert alert-danger">
					<strong>Error!</strong> {error.message}.
				</div>
			);
		}

	}

	login(event) {
		event.preventDefault();
		loginUser({
			username: this.state.username,
			password: this.state.password,
		});
	}

	render() {
		return (
			<div className="container-fluid login-container">
				<div className="row">
					<div id="alert_msg" className ="container-form-alert" >
						{this.displayError()}
						{this.renderSignupMsg()}
					</div>
				</div>
				<div className="row">
					<div className="col-md-12 container-form login-form">
						<div className="form_header text-center">
					 		<h2>MODULE VPP</h2>
					 		<p>Please enter your username and password to access your account.</p>
						</div>
						<form method="post" onSubmit={this.login.bind(this)}>
					 		<div className="form-group ">
								<label className="control-label requiredField" htmlFor="login_username">
									Username<span className="asteriskField">*</span>
								</label>
								<div className="input-group">
					 				<div className="input-group-addon">
										<i className="fa fa-user"></i>
					 				</div>
					 				<input className="form-control" onChange={this.changeUsername.bind(this)} id="login_" name="login_username" type="text" required />
								</div>
					 		</div>
							<div className="form-group ">
								<label className="control-label requiredField" htmlFor="login_password">
					 				Password<span className="asteriskField">*</span>
								</label>
								<div className="input-group">
						 			<div className="input-group-addon">
										<i className="fa fa-lock"></i>
						 			</div>
						 			<input className="form-control" onChange={this.changePassword.bind(this)} id="login_password" name="login_password" type="password" required />
								</div>
					 		</div>
					 		<div className="form-group">
								<div>
									<button className="login-btn btn-block" name="submit" type="submit">
										Let&#39;s go <FormLoaderIndicator loading={this.state.isLoading} />
									</button>
								</div>
							</div>
						</form>
						<div className="form-group">
							<Link to="/forgot-password">You forgot your password ?</Link>
						</div>
				 	</div>
				</div>
			</div>
		)
	}
}

module.exports = LoginComponent;
