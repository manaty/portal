import React, {Component} from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip'
import originalMoment from "moment";
import { extendMoment } from "moment-range";

import UserStore from '../../stores/UserStore';
import PasswordStore from '../../stores/PasswordStore';
import {editPassword, userDetail} from '../../actions/UserProfileAction';
import LocalStorageService from '../../services/LocalStorageService';

const moment = extendMoment(originalMoment);

class ChangePassword extends Component {

	constructor(props) {
			super(props);
			this.state = {
                status: '',
				isLoading: false,
				error: null,
				editMode: false,
				form:{
                    email:"",
                    username:"",
                    currentPassword:"",
                    newPassword:"",
                    conFirmPassword:"",
                    firstName: "",
                    lastName: "",
				},
				formError: {
					status: false,

				},
			}
	}

    componentWillMount() {
        UserStore.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
        PasswordStore.bindUpdateHandler(this.userChangePassword.bind(this));
	}

	componentDidMount() {
        var userName = LocalStorageService.getTokenParsed().preferred_username;
        userDetail(userName);
    }

	shouldComponentUpdate(nextProps, nextState){
        return true;
	}

    componentWillReceiveProps() {
    }

    editUserLoginInformation(userData) {
        const {parent} = this.props;
        parent.editUserBio(userData);
    }

	validateDateFields(){

		var state = this.state;
		state['formError']["status"] = false;
		this.setState(state);
		return true;
	}

    updateUserDetail(event){
		event.preventDefault();
		if (this.validateDateFields()) {
			var updateType = "form";
		}
	}

    userDetailOnUpdate(response) {
        console.log("userProfile On Update");
        console.log(response);
        const {result, message} = response
        if(message == "user_detail_success" || message == "user_profile_detail_success") {
            this.setState({
                userInfo: result,
                message:message,
            });
        }
        this.state;
        this.setDataFormData();
    }

    userChangePassword(response) {
        console.log(response);
        const { message } = response
        if(message === "edit_password_success") {
            this.setState({
                status: 'Changed password successfully',
            });
        }
        this.state;
        this.setDataFormData();
    }

    setDataFormData() {
        var user = this.state.userInfo;
        if (user != null) {
            var state = this.state;
            state['form']['email'] = user.email;
            state['form']['username'] = user.username;
            state['form']['currentPassword'] = '';
            state['form']['newPassword'] = '';
            state['form']['confirmPassword']= '';
            this.setState(state);
        }
    }

    edit_password(event) {
        this.setState({
            status: 'Not success',
        });
        event.preventDefault();
        const {form} = this.state;
        var userData = {
            "currentPassword": form.currentPassword,
            "newPassword": form.newPassword,
            "confirmation": form.confirmPassword,
        };
        editPassword(userData);
    }

    changeContent(name, e) {
        var state = this.state;
        state['form'][name] = e.target.value;
        this.setState(state);
    }

    renderChangePassword(){
        const userName = LocalStorageService.getTokenParsed().preferred_username;
		return(
            <div className="row">
                <form method="get" onSubmit={this.edit_password.bind(this)} >
                    <div>
                        <div className="form-style-8-0">
                            <h2>LOGIN INFORMATION</h2>
                            <div className="changePasswordEmail"><span className="labelEmail">Your email :&nbsp;{this.state.form.email}&nbsp;</span></div>
                            <div className="changePasswordLogin"><span className="labelLogin">Your login :&nbsp;{userName}&nbsp;</span></div>
                       </div>
                    </div>
                    <div>
                        <div className="form-style-8">
                            <h2>CHANGE YOUR PASSWORD</h2>
                            <div className="form-change-password">
                                <div className="changeCurrentPassword"> Current Password</div>
                                <input
                                    value={this.state.form.currentPassword}
                                    type="password"
                                    className="field1"
                                    placeholder=""
                                    onChange={this.changeContent.bind(this, "currentPassword")}
                                />
                                <div className="changeNewPassword"> New Password</div>
                                <input
                                    value={this.state.form.newPassword}
                                    type="password"
                                    className="field2"
                                    placeholder=""
                                    onChange={this.changeContent.bind(this, "newPassword")}
                                />
                                <div className="changeFirmPassword">Confirm new Password</div>
                                <input
                                    value={this.state.form.confirmPassword}
                                    type="password"
                                    className="field3"
                                    placeholder=""
                                    onChange={this.changeContent.bind(this, "confirmPassword")}
                                />
                                {this.state.status === 'Changed password successfully'? (
                                    <div className="change1">{this.state.status }</div>
                                ) : (
                                    <div className="change2">{this.state.status }</div>
                                )
                                }
                                <button type="submit">CHANGE PASSWORD</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
		);
	}

    render() {
        return (
			<div className="container-fluid profile_manaty">
				{this.renderChangePassword()}
			</div>
        );
    }
}
module.exports = ChangePassword;