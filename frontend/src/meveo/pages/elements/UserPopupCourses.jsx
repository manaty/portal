import React, {Component} from 'react';
import {editCoursesUser, } from '../../actions/UserProfileAction';
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

class Course extends React.Component{

    delete(courses) {
        this.props.delete(courses);
    }

    render(){
        return(
            <ul>
                {this.props.courses.map((el, index) => (
                    <li key={index} className="li_course">
                        <span className="names_course">{el.courseTitle}</span>
                        <span className="names_course">-{el.fromYear}{el.fromYear && el.toYear ? '-':''}{el.toYear}</span>
                        <span onClick={this.delete.bind(this, el)} className="empty_course"></span>
                        <p/>
                    </li>
                ))}
            </ul>
        )
    }
}
class UserPopupCourses extends Component {

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
                courseTitle:"",
            },
            educations: [],
            courses :[],
            deleted: false,
            formError: {
                status: false,
                message: "",
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

    edit_courses_user(event) {
        event ? event.preventDefault() : null;
        const {userInfo} = this.props;
        var userCourses = {
            "username": userInfo.username,
            "courses": this.state.courses,
        };
        editCoursesUser(userCourses);
    }

    setDataFormData() {
        const {userInfo} = this.props;
        if (userInfo != null) {
            var state = this.state;
            state['form']['fromYear'] = userInfo.fromYear || "";
            state['form']['toYear'] = userInfo.toYear || "";
            state['form']['courseTitle'] = userInfo.courseTitle || "";
            state['courses'] = userInfo.courses;

            this.setState(state);
        }
    }

    delete(courses) {
        this.setState(prevState => ({
            courses: prevState.courses.filter(el => el.courseTitle != courses.courseTitle)
        }));
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({
            courseTitle: "",
            toYear: "",
            fromYear: "",
            courses: [
                ...this.state.courses,
                { courseTitle: this.state.courseTitle, toYear: this.state.toYear, fromYear: this.state.fromYear }
            ],
        });
    }

    changeContent(name, e) {
        var state = this.state;
        state[name] = e.target.value;
        this.setState(state);
    }

    closePopupCourses() {
        setTimeout(() => {
            this.props.closePopupCourses();
        }, 100);
    }

    renderPopupCourses() {
        return (
                <div className='popup_courses'>
                    <div className="close_courses" onClick={this.props.closePopupCourses}></div>
                    <form method="get" onSubmit={this.edit_courses_user.bind(this)}>
                        <div className="header_courses"> EDIT TRAINING COURSES </div>
                        <div className="modal-body">
                            <div className="col-xs-6 left_educations">

                                        <h3 className="name_course"> Training courses </h3>
                                            <div class="longText" id="hidingScrollBar">
                                                <div class="hideScrollBar">
                                                    <Course delete={this.delete} courses={this.state.courses}/>
                                                    <span className="course"></span>
                                                </div>
                                            </div>
                            </div>
                        </div>
                            <div className="col-xs-6 right_educations">
                                        <h3 className="name_new_course"> Add new training courses </h3>
                                            <div>
                                                <tbody>
                                                <tr>
                                                    <td><label className="label_course1_profile"><span> Training course title : </span></label></td>
                                                    <td><input
                                                        className="course_profile"
                                                        value={this.state.courseTitle}
                                                        onChange={this.changeContent.bind(this, "courseTitle")}
                                                        type="text"/>
                                                    </td>
                                                </tr>
                                                </tbody>
                                                <tbody>
                                                <tr>
                                                    <td><label className="label_course2_profile"><span> From year : </span></label>
                                                        <input
                                                            className="course_from_profile"
                                                            value={this.state.fromYear}
                                                            onChange={this.changeContent.bind(this, "fromYear")}
                                                            type="number"
                                                        />
                                                    </td>
                                                    <td>
                                                        <label className="label_course3_profile"><span> To year : </span></label>
                                                        <input
                                                            className="course_to_profile"
                                                            value={this.state.toYear}
                                                            onChange={this.changeContent.bind(this, "toYear")}
                                                            type="number"
                                                        />
                                                    </td>
                                                </tr>
                                                </tbody>
                                                    <button disabled={!this.state.courseTitle || !this.state.fromYear} onClick={this.onSubmit.bind(this)} className="add_courses">ADD</button>
                                                {/*todo list*/}
                                            </div>
                            </div>
                        <div className="footer_courses">
                            <button className="btn_course" type="submit" disabled={!this.state.courses} onClick={this.closePopupCourses.bind(this)}>SAVE</button>
                        </div>
                    </form>
                </div>
        );
    }
    render() {
        return (
            <div>
                {this.renderPopupCourses()}
            </div>
        );
    }
}
export default UserPopupCourses;
