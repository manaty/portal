import React, {Component} from 'react';
import {editEducationsUser} from '../../actions/UserProfileAction';
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

class Education extends React.Component{

    delete(educations) {
        this.props.delete(educations);
    }

    render(){
        return(
            <ul>
                {this.props.educations.map((el, index) => (
                    <li key={index} className="li_degree">
                        <span className="names_degree">{el.degreeTitle}</span><br/>
                        <span className="names_university">{el.university} - {el.fromYear}{el.fromYear && el.toYear ? '-':''}{el.toYear}</span>
                        <span onClick={this.delete.bind(this, el)} className="empty_degree"></span>
                        <p/>
                    </li>
                ))}
            </ul>
        )
    }
}

class UserPopupEducations extends Component {

    constructor() {
        super();
        this.state = {
            showPopup: false,
            isLoading: false,
            error: null,
            editMode: false,
            username: "",
            form:{
                toYear:"",
                fromYear:"",
                university:"",
                degreeTitle:"",
            },
            educations: [],
            deleted: false,
            formError: {
                status: false,
                message: ""
            }
        }
        this.delete = this.delete.bind(this);
        this.mandatoryFieldsList = [];
    }

    componentDidMount(){
        this.setDataFormData();
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

    edit_educations_user(event) {
        event.preventDefault();
        const {userInfo} = this.props;
        var userEducations = {
            "username": userInfo.username,
            "educations": this.state.educations,
        };
        editEducationsUser(userEducations);
    }

    setDataFormData() {
        const {userInfo} = this.props;
        if (userInfo != null) {
            var state = this.state;
            state['form']['fromYear'] = userInfo.fromYear || "";
            state['form']['toYear'] = userInfo.toYear || "";
            state['form']['university'] = userInfo.university || "";
            state['form']['degreeTitle'] = userInfo.degreeTitle || "";
            state['educations'] = userInfo.educations;

            this.setState(state);
        }
    }

    delete(educations) {
        this.setState(prevState => ({
            educations: prevState.educations.filter(el => el.degreeTitle != educations.degreeTitle)
        }));
    }

    onSubmit(event) {
        event ? event.preventDefault() : null;
        this.setState({
            degreeTitle: "",
            university: "",
            toYear: "",
            fromYear: "",
            educations: [
                ...this.state.educations,
                { degreeTitle: this.state.degreeTitle, university: this.state.university , toYear: this.state.toYear, fromYear: this.state.fromYear }
            ],
        });
    }

    changeContent(name, e) {
        var state = this.state;
        state[name] = e.target.value;
        this.setState(state);
    }

    closePopupEducations() {
        setTimeout(() => {
            this.props.closePopupEducations();
        }, 100);
    }

    renderPopupEducations() {
        return (
            <div className='popup_educations'>
                <div className="close_educations" onClick={this.props.closePopupEducations}></div>
                <form method="get" onSubmit={this.edit_educations_user.bind(this)}>
                    <div className="header_educations">EDIT EDUCATION</div>
                    <div className="modal-body">
                        <div className="col-xs-6 left_educations">
                            <h3 className="name_degree">Degree</h3>
                            <div class="longText" id="hidingScrollBar">
                                <div class="hideScrollBar">
                                    <Education delete={this.delete} educations={this.state.educations}/>
                                    <span className="degree"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 right_educations">
                        <h3 className="name_new_degree">Add new degree</h3>
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><label className="label_degree1_profile"><span> Degree title/Diploma : </span></label></td>
                                        <td><input
                                            className="degree_profile"
                                            value={this.state.degreeTitle}
                                            onChange={this.changeContent.bind(this, "degreeTitle")}
                                            type="text"/>
                                        </td>
                                    </tr>
                                    <tr>

                                        <td><label className="label_degree2_profile"><span> School/University: </span></label></td>
                                        <td><input
                                            className="degree_profile"
                                            value={this.state.university}
                                            onChange={this.changeContent.bind(this, "university")}
                                            type="text"
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td><label className="label_degree3_profile"><span> From year :&nbsp;&nbsp;&nbsp;&nbsp; </span></label>
                                            <input
                                                className="degree_from_profile"
                                                value={this.state.fromYear}
                                                onChange={this.changeContent.bind(this, "fromYear")}
                                                type="number"
                                            />
                                        </td>
                                        <td>
                                            <label className="label_degree4_profile"><span> To year : &nbsp;&nbsp;&nbsp;&nbsp; </span></label>
                                            <input
                                                className="degree_to_profile"
                                                value={this.state.toYear}
                                                onChange={this.changeContent.bind(this, "toYear")}
                                                type="number"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                                <button disabled={!this.state.degreeTitle || !this.state.fromYear } onClick={this.onSubmit.bind(this)} className="add_educations">ADD</button>
                            {/*todo list*/}
                        </div>
                    </div>
                    <div className="footer_educations">
                        <button className="btn_education" type="submit" disabled={!this.state.educations} onClick={this.closePopupEducations.bind(this)}>SAVE</button>
                    </div>
                </form>
            </div>
        );
    }
    render() {
        return (
            <div>
                {this.renderPopupEducations()}
            </div>
        );
    }
}
export default UserPopupEducations;
