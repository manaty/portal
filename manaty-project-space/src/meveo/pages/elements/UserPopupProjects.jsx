import React, {Component} from 'react';
import {editProjectsUser,addProjectForUser,projectDetail} from '../../actions/UserProfileAction';
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

import Select from 'react-virtualized-select'


class Skill extends React.Component{

    delete(projects) {
        this.props.delete(projects);
    }

    render(){
        return(
            <ul>
                {this.props.projects.map((el, index) => (
                    <li key={index} className="li_project">
                        <span className="names_project">{el.name}</span>
                        <span onClick={this.delete.bind(this, el)} className="empty_project"></span>
                        <div className="role_projects">
                            {el.role}
                        </div>
                        <p/>
                    </li>
                ))}
            </ul>
        )
    }
}
class UserPopupProjects extends Component {

    constructor() {
        super();
        this.state = {
            showPopup: false,
            isLoading: false,
            error: null,
            editMode: false,
            username: "",
            form:{
                username: "",
                email: "",
                firstName: "",
                lastName: "",
                bio:"Free text space where user can give any information he wants about himself",
                availability:" where user can inform on his number of working hours dedicated for Manaty a"+
                "week, gives specific informations, inform on his working timezone and his vacations dates."
            },
            projects: [
                { name: "", role:"" },
            ],
            teams: { name: "", role:"" },
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

    edit_projects_user(event) {
        event ? event.preventDefault() : null;
        const {userInfo} = this.props;
        const {projectSee} = this.props;
        var userData = {
            "username": userInfo.username,
            "projects": this.state.projects,
        };
        editProjectsUser(userData);
    }

    setDataFormData() {
        const {userInfo} = this.props;
        if (userInfo != null) {
            var state = this.state;
            state['form']['email'] = userInfo.email || "";
            state ['username'] = userInfo.username || "";
            state['form']['lastName'] = userInfo.lastName || "";
            state['form']['firstName'] = userInfo.firstName || "";
            state['projects'] = userInfo.projects || "";
            this.setState(state);
        }
    }

    delete(projects) {
        this.setState(prevState => ({
            projects: prevState.projects.filter(el => el.name != projects.name)
        }));
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({
            name: "",
            role: "",
            projects: [
                ...this.state.projects,
                { name: this.state.name, role: this.state.role }
            ],

        });
    }

    changeContent(name, e) {
        var state = this.state;
        state[name] = e.target.value;
        this.setState(state);
    }

    setProject(val) {
        if(val != null){
        var state = this.state;
        state['name'] = val.value;
        this.setState(state);
        }
    }

    closePopupProjects() {
        setTimeout(() => {
            this.props.closePopupProjects();
        }, 100);
    }

    renderPopupProjects() {
        var project = this.props.projectInfo;
        var listProject = [];
        var listProjectDisplay = [];
        project.map( (entry)=> {
            listProject.push(entry.code);
        });
        listProject.sort();
        listProject.map( (entry)=> {
            var singleObj = {};
            singleObj["value"] = entry;
            singleObj["label"] = entry;
            listProjectDisplay.push(singleObj);
        });
        return (
                <div className='popup_projects'>
                    <div className="close_project" onClick={this.props.closePopupProjects}></div>
                    <form method="get" onSubmit={this.edit_projects_user.bind(this)}>
                        <div className="header_projects">EDIT PROJECTS</div>
                        <div className="modal-body">
                            <div className="col-xs-6 left_project">

                                        <h3 className="name_project">Projects</h3>
                                            <div class="longText" id="hidingScrollBar">
                                                <div class="hideScrollBar">
                                                    <Skill delete={this.delete} projects={this.state.projects}/>
                                                </div>
                                            </div>
                                    </div>
                            </div>
                            <div className="col-xs-6 right_project">
                                        <h3 className="name_new_project">Add new project</h3>
                                            <div>
                                                    <span className="project_select"><Select
                                                        className="select_pro_profile"
                                                        value={this.state.name}
                                                        placeholder="Select a project"
                                                        options={listProjectDisplay}
                                                        onChange={this.setProject.bind(this)}
                                                    /></span><br/>

                                                    <input className="input_projects"
                                                           value={this.state.role}
                                                           onChange={this.changeContent.bind(this, "role")}
                                                           placeholder="Role in the project"/><br/>
                                                    <button disabled={!this.props.projectInfo || !this.state.role} onClick={this.onSubmit.bind(this)} className="add_project">ADD</button>
                                                {/*todo list*/}
                                            </div>
                            </div>
                        <div className="footer_projects">
                            <button className="btn_project" type="submit" disabled={!this.state.projects} onClick={this.closePopupProjects.bind(this)}>SAVE</button>
                        </div>
                    </form>
                </div>
        );
    }
    render() {
        return (
            <div>
                {this.renderPopupProjects()}
            </div>

        );
    }
}
export default UserPopupProjects;
