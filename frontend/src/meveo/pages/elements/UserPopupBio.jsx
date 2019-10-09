import React, {Component} from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import { render } from 'react-dom';
import {userDetail, editProfileUser,editBioUser} from '../../actions/UserProfileAction';

class UserPopupBio extends Component {

    constructor() {
        super();
        this.state = {
            showPopup: false,
            isLoading: false,
            error: null,
            editMode: false,
            form:{
                username: "",
                email: "",
                firstName: "",
                lastName: "",
                bio:"",
                manatyProjects:"",


            },
            formError: {
                status: false,
                message: ""
            }
        };

    }

    componentDidMount(){
    	this.setDataFormData();
        this.edit_bio_user();
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

    edit_bio_user(event) {
        event ? event.preventDefault() : null;
        var updateType = "form";
        const {userInfo} = this.props;
        const {form} = this.state;
        var userData = {
            "username": form.username,
            "bio": form.bio,
        };
        editBioUser(userData,updateType,null);
    }

    setDataFormData() {
        const {userInfo} = this.props;
        if (userInfo != null) {
            var state = this.state;
            state['form']['email'] = userInfo.email || "";
            state['form']['username'] = userInfo.username || "";
            state['form']['lastName'] = userInfo.lastName || "";
            state['form']['firstName'] = userInfo.firstName || "";
            state['form']['bio'] = userInfo.bio || "";
            this.setState(state);
        }
    }

    closePopupBio() {
        setTimeout(() => {
            this.props.closePopupBio();
        }, 100);
    }

    renderPopupBio() {
        return (
                <div className='popup_bio'>
                    <div className="close_bio" onClick={this.props.closePopupBio}></div>
                    <form method="get" onSubmit={this.edit_bio_user.bind(this)}>
                        <div className="header_bio">EDIT BIO</div>
                        <div className="modal-body">
                            <textarea
                                    onChange={this.changeContent.bind(this, "bio")}
                                    className="input_bio col-xs-12 " rows="10"
                                    value={this.state.form.bio}
                                    type="text"
                                />
                        </div>

                        <div className="footer_bio">
                            <button className="btn_bio" type="submit" onClick={this.closePopupBio.bind(this)}>SAVE</button>
                        </div>
                    </form>
                </div>
        );
    }
    render() {
        return (
			<div>
                {this.renderPopupBio()}
			</div>

        );
    }
}
export default UserPopupBio;
