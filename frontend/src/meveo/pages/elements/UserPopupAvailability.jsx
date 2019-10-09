import React, {Component} from 'react';
import { render } from 'react-dom';
import {Modal, Panel, PanelGroup} from 'react-bootstrap';
import {editAvailabilityUser} from '../../actions/UserProfileAction';
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import PropTypes from 'prop-types'
import timezones from 'timezones.json';

import originalMoment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(originalMoment);


class Vocations extends React.Component{

    delete(vocation) {
        this.props.delete(vocation);
    }

    render(){
        var vocas = [];
        if(this.props.vocations){
            vocas = this.props.vocations;
        }
        return(
            <ul className="li_availability">
                {vocas.map((vocation, index) => (
                    <li className="vocation_list_availability" key={index}>
                        {vocation}
                        <span onClick={this.delete.bind(this, vocation)} className="empty_availability"></span>
                    </li>
                ))}
            </ul>
        )
    }
}
class UserPopupAvailability extends Component {

    constructor() {
        super();
        const today = moment();
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
                skills:"",
                manatyProjects:"",

            },
            formError: {
                status: false,
                message: ""
            },
            availability:{hoursWork:null, infos:'', timeZone:'', vocations:[]},
            startDate: moment(),
            endDate: moment(),
            isOpen: true,
            value: null,


        };
        this.mandatoryFieldsList = [];

    }

    componentDidMount(){
    	this.setDataFormData();
    	this.edit_availability_user();
    }

    changeContent(name, e) {
        var state = this.state;
        state ['availability'][name] = e.target.value;
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

    edit_availability_user(event) {
        event ? event.preventDefault() : null;
        var updateType = "form";
        const {form} = this.state;
        var userData = {
            "username": form.username,
            "availability": this.state.availability
        };
        editAvailabilityUser(userData);
    }


    setDataFormData() {
        const {userInfo} = this.props;
        if (userInfo != null) {
            var state = this.state;
            state['form']['email'] = userInfo.email || "";
            state['form']['username'] = userInfo.username || "";
            state['form']['lastName'] = userInfo.lastName || "";
            state['form']['firstName'] = userInfo.firstName || "";
            state['availability'] = userInfo.availability;

            this.setState(state);
        }
    }
    // state['form']['availability']['vocations'] =userInfo.availability.vocations!=null? this.convertDate(userInfo.availability.vocations):null;

    changeDate(name, value) {
        if (value != null && name != null ) {
            var dateValue = value.substr(0, 10);
        } else {
            var dateValue = null;
        }
        var state = this.state;
        state ['availability'][name] = dateValue;
        this.setState(state);
    }

    // convertDate(date){
    //     if (date != null && date != 0) {
    //         var date_ = date.substr(0, 10).replace(/\//g , "-");
    //         var dateArray = date_.split("-");
    //         date = dateArray[2]+"-"+dateArray[1]+"-"+dateArray[0]+' '+date.substr(11);
    //         return date;
    //     }
    // }

    delete(vocation) {
        this.setState(prevState => ({
            availability: {
                ...prevState.availability,
                vocations: prevState.availability.vocations.filter(el => el!= vocation)
            }
        }));
    }

    dateChanged(d) {
        this.setState({ date: d});
    }

    combineTwoStrings(event){
        event.preventDefault();
        if(this.state.value !=null) {
            if (this.state.value.start != null && this.state.value.end != null) {
                var String_1 = this.state.value.start.format("DD/MM/YYYY");
                var String_2 = this.state.value.end.format("DD/MM/YYYY")
                var String_3 = String_1.concat(" - ", String_2);
            }
            if (this.state.value.start.format("DD/MM/YYYY") == this.state.value.end.format("DD/MM/YYYY")) {
                var String_1 = this.state.value.start.format("DD/MM/YYYY");
                var String_3 = String_1;
            }
        }
        this.setState({
            availability: {
                ...this.state.availability,
                vocations:[
                    ...this.state.availability.vocations,String_3
                ]
            }
        });
    }

    changeVocation(name, e) {
        var state = this.state;
        state [name] = e.target.value;
        this.setState(state);
    }

    //Datapicker
    handleStartChange(startDate){
        this.setState({ startDate });
    }

    handleEndChange (endDate){
        return this.setState({ endDate });
    }

    closePopupAvailability() {
        setTimeout(() => {
            this.props.closePopupAvailability();
        }, 100);
    }

    onSelect = (value, states) => {

        this.setState({ value, states,

        });
        if (this.state.value.end != null) {
            this.setState({

                showPopup: !this.state.showPopup
            });
        }
        event.preventDefault();
        if(this.state.value !=null) {
            if (this.state.value.start != null && this.state.value.end != null) {
                var String_1 = this.state.value.start.format("DD/MM/YYYY");
                var String_2 = this.state.value.end.format("DD/MM/YYYY")
                var String_3 = String_1.concat(" - ", String_2);
            }
            if (this.state.value.start.format("DD/MM/YYYY") == this.state.value.end.format("DD/MM/YYYY")) {
                var String_1 = this.state.value.start.format("DD/MM/YYYY");
                var String_3 = String_1;
            }
        }
        this.setState({
            availability: {
                ...this.state.availability,
                vocations:[
                    ...this.state.availability.vocations,String_3
                ]
            }
        });
    };

    onToggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    renderCalendarPopup() {
        return (
                <div className="date_picker">
                    {this.state.showPopup ? (
                        <div>
                            {" "}
                            {this.state.isOpen && (
                                <DateRangePicker
                                    value={this.state.value}
                                    onSelect={this.onSelect}
                                    singleDateRange={true}
                                />
                            )}{" "}
                        </div>
                    ) : null}
                </div>
        );

    }

    renderPopupAvailability() {
        const { startDate, endDate } = this.state;
        if(this.state.value !=null){
        if (this.state.value.start != null && this.state.value.end != null) {
            var String_1 = this.state.value.start.format("DD/MM/YYYY");
            var String_2 = this.state.value.end.format("DD/MM/YYYY");
            var String_3 = String_1.concat(" - ", String_2);
        }
        if (this.state.value.start.format("DD/MM/YYYY") == this.state.value.end.format("DD/MM/YYYY")) {
            var String_1 = this.state.value.start.format("DD/MM/YYYY");
            var String_3 = String_1;
        }
        }
        return (
                <div className='popup_availability'>
                    <div className="close_availability" onClick={this.props.closePopupAvailability}></div>
                    <form  method="get" onSubmit={this.edit_availability_user.bind(this)} >
                        <div className="header_availability">EDIT AVAILABILITY</div>
                        <div/>
                        <span><label className="label_popup">Number of working hours a week:</label><input className="avai_input"
                                                                                                                                     type='number'
                                                                                                           onChange={this.changeContent.bind(this, "hoursWork")}
                                                                                                            value={this.state.availability.hoursWork}
                                                                                                                        /> hrs</span><br/>
                        <div/>
                        <span><label className="label_popup">Infos (preferred working days,preferred hours slots,constraints):</label></span>
                        <div/>
                        <label><textarea
                            onChange={this.changeContent.bind(this, "infos")}
                            className="avai_popup" cols="80" rows="5"
                            value={this.state.availability.infos}/></label><br/>
                        <div/>
                        <span><label className="label_popup">Time zone (UTC):</label>

                            <select value={this.state.availability.timeZone} className="avai_select" onChange={this.changeContent.bind(this, "timeZone")}>
                                 {
                                     timezones != null ?
                                         timezones.map((el) => {
                                             return <option value={el.text}>{el.text}</option>;
                                         })
                                         : null
                                 }
                             </select>

                        </span><br/>

                        <div/>
                        <label className="label_popup">Vacations:</label>
                        <input className="input_vacation" value={String_3} onClick={this.togglePopup.bind(this)}/>
                        <div className="calendar_icon">
                              <i onClick={this.togglePopup.bind(this)} className="fa fa-calendar" style={{fontSize: 36}} ></i>
                        </div>

                        <div class="longText_voca" id="hidingScrollBar">
                            <div class="hideScrollBar">
                                <Vocations delete={this.delete.bind(this)} vocations={this.state.availability.vocations}/>
                            </div>
                        </div>


                        <div className="footer_availability">
                            <button className="btn_availability" type="submit" onClick={this.closePopupAvailability.bind(this)} onSubmit={this.edit_availability_user.bind(this)}>Save</button>
                        </div>
                    </form>
                </div>
        );
    }
    render() {
        return (
			<div>
                {this.renderPopupAvailability()}
                {this.renderCalendarPopup()}
			</div>

        );
    }
}

export default UserPopupAvailability;


