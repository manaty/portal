import React, {Component} from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import Select from 'react-select-plus';
import { editProfileUser,} from '../../actions/UserProfileAction';
import UserStore from '../../stores/UserStore';
import 'react-select-plus/dist/react-select-plus.css';

class UserPopup extends Component {

    constructor() {
        super();
        this.state = {
            options: this.options,
            showPopup: false,
            isLoading: false,
            editMode: false,
            form:{
                username: "",
                email: "",
                firstName: "",
                lastName: "",
                sinceDate: null,
                photo:"",
                job:"",
                skypeId:"",
                country:"",
                linkedin:"",
                skills: [{name:"",ratio:null}],
                projects: [{ name: "", role: "" }],
                availability:{hoursWork:"", infos:"", timeZone:"", vocations:""},
            },
            filename:"",
            file:{name:'',},
            filenameCV:"",
            fileCV:{name:'',type:''},
            name:'',
            formError: {
                status: false,
                message: ""
            },
            userMsg:null,
            statusCV:null,
            error: {
                status: false,
                message: ""
            },
            value:'',

        };
        this.mandatoryFieldsList = [];

    }
    componentWillMount() {
        UserStore.bindUpdateHandler(this.userDetailOnUpdate.bind(this));

    }
    componentWillUnmount() {
        UserStore.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
    }

    componentDidMount(){
    	this.setDataFormData();
        this.edit_user();
    }

    userDetailOnUpdate(response) {
        console.log("user On Update");
        console.log(response);
        const {result, message} = response
        this.state;
    }

    changeContent(name, e) {
        var state = this.state;
        state['form'][name] = e.target.value;
        this.setState(state);
    }

    validateMandatoryFields(){
        var mandatories = [];
        var formValues = this.state.form;
        this.mandatoryFieldsList.map(function (field) {
            if (formValues[field] != null) {
                if (formValues[field].trim().length == 0) {
                    mandatories.push(field);
                }
            }else{
                mandatories.push(field);
            }

        });
        var state = this.state;
        state['mandatoryFields'] = mandatories.slice();
        this.setState(state);

        if (mandatories.length > 0) {
            return false;
        } else {
            return true;
        }
    }

    setCountry(name,val) {
        if(val != null){
        var state = this.state;
        state['form']['country'] = val.value;
        this.setState(state);
        }
    }

    changeDate(name, value) {
        if (value != null && name !=null) {
            var dateValue = value.substr(0, 10);
        } else {
            var dateValue = null;
        }

        var state = this.state;
        state['form'][name] = dateValue;
        this.setState(state);
    }

    convertDate(date){
        if (date != null && date != 0) {
            var date_ = date.substr(0, 10).replace(/\//g , "-");
            var dateArray = date_.split("-");
            date = dateArray[2]+"-"+dateArray[1]+"-"+dateArray[0]+' '+date.substr(11);
        return date;
        }
    }

    edit_user(event) {
        event ? event.preventDefault() : null;
        var updateType = "form";
        const {form} = this.state;
        var userData = {
            "email": form.email,
            "username": form.username,
            "lastName": form.lastName,
            "sinceDate": form.sinceDate,
            "firstName": form.firstName,
            "job": form.job,
            "skypeId": form.skypeId,
            "country": form.country,
            "linkedin": form.linkedin,
            "cv": null
        };
        editProfileUser(userData);
    }

    setDataFormData() {
        const {userInfo} = this.props;
        if (userInfo != null) {
            var state = this.state;
            state['form']['email'] = userInfo.email;
            state['form']['username'] = userInfo.username;
            state['form']['lastName'] = userInfo.lastName;
            state['form']['firstName'] = userInfo.firstName;
            state['form']['sinceDate'] = userInfo.sinceDate!=null? this.convertDate(userInfo.sinceDate):null;
            state['form']['job'] = userInfo.job;
            state['form']['skypeId'] = userInfo.skypeId;
            state['form']['country'] = userInfo.country;
            state['form']['linkedin'] = userInfo.linkedin;
            this.setState(state);
        }
    }

    closePopup() {
        setTimeout(() => {
            this.props.closePopup();
        }, 100);
    }


    renderPopup() {
        const {all_countries} = this.props.baseData;
        return (
				<div className='popup_skill'>
					<div className="close_bio" onClick={this.props.closePopup}></div>
					<form method="get" onSubmit={this.edit_user.bind(this)} >
						<div className="header_bio">EDIT PROFILE</div>
						<table className="edit_profile">
                            <tbody>
							<tr>
								<td><label className="label_profile"><span>First name: </span></label></td>
								<td><input
                                            className="ip_profile"
										   value={this.state.form.firstName}
										   onChange={this.changeContent.bind(this, "firstName")}
                                           type="text"
								/></td>
							</tr>
                            </tbody>
                            <tbody>
							<tr>
								<td><label className="label_profile"><span>Last name: </span></label></td>
								<td><input
                                        className="ip_profile"
										   value={this.state.form.lastName}
										   onChange={this.changeContent.bind(this, "lastName")}
                                           type="text"
								/></td>
							</tr>
                            </tbody>
                            <tbody>
                            <tr>
                                <td><label className="label_profile"><span>Manaty member since: </span></label></td>
                                <td><span className="ip_picker">
                                    <DatePicker className="picker"
                                                dateFormat="DD/MM/YYYY"
                                                value={this.state.form.sinceDate}
                                                onChange={this.changeDate.bind(this, "sinceDate")}
                                /></span></td>
                            </tr>
                            </tbody>
                            <tbody>

							<tr>
								<td><label className="label_profile"><span>Job:  </span></label></td>
								<td><input
                                    className="ip_profile"
                                    value={this.state.form.job}
                                    onChange={this.changeContent.bind(this, "job")}
                                    type="text"/></td>
							</tr>
                            </tbody>

                            <tbody>

							<tr>
								<td><label className="label_profile"><span >Country:  </span></label></td>
								<td className='coutry'>
                                    <div><Select
                                        className="select_popup_country"
                                        value={this.state.form.country}
                                        options={this.props.countryAll}
                                        onChange={this.setCountry.bind(this, 'value')}
                                    /></div>
                                </td>
							</tr>
                            </tbody>

                            <tbody>

							<tr>
								<td><label className="label_profile"><span>Manaty email: </span></label></td>
								<td><input
                                            className="ip_profile"
                                            value={this.state.form.email}
                                           onChange={this.changeContent.bind(this, "email")}
                                           type="text"
                                /></td>
							</tr>
                            </tbody>
                            <tbody>

							<tr>
								<td><label className="label_profile"><span>Skype id: </span></label></td>
								<td><input
                                    className="ip_profile"
                                    value={this.state.form.skypeId}
                                    onChange={this.changeContent.bind(this, "skypeId")}
                                    type="text" /></td>
							</tr>
                            </tbody>
                            <tbody>

							<tr>
								<td><label className="label_profile"><span>Linkedin link: </span></label></td>
								<td><input
                                    className="ip_profile"
                                    value={this.state.form.linkedin}
                                    onChange={this.changeContent.bind(this, "linkedin")}
                                    type="text"/></td>
							</tr>
                            </tbody>
						</table>
                        <div className="footer_bio">
                            <button className="btn_bio" type="submit" onClick={this.closePopup.bind(this)}>SAVE</button>
                        </div>

					</form>

				</div>
        );
    }

    render() {
        return (
			<div>
				{this.renderPopup()}
			</div>

        );
    }
}
export default UserPopup;
