import React, {Component} from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import { render } from 'react-dom';
import {Modal, Panel, PanelGroup} from 'react-bootstrap';
import {userDetail,editTeamsProject,editProjectsUser} from '../../actions/UserProfileAction';
import SeeProfile from '../user/SeeProfile.jsx';
import UserStore from '../../stores/UserStore';
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

import Select from 'react-virtualized-select'

class ProjectPopupClient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: [],

        };
    }
    componentWillMount() {

    }
    componentWillUnmount() {

    }

    componentDidMount(){
        this.setDataFormData();
    }

    setDataFormData() {
        const {projectSee} = this.props;
        let teamGet = [];
        projectSee.teams.map((entry) =>{

            var singleObj = {};
            if(entry.name != null) {
                singleObj["name"] = this.getUsernameToName(entry.name);
                singleObj["role"] = entry.role;
                teamGet.push(singleObj);
            }
        });
        if (projectSee != null) {
            var state = this.state;
            state['code'] = projectSee.code;
            state['teams'] = teamGet;
            this.setState(state);
        }
    }

    edit_teams_project(event) {
        var teamSave = [];
        this.state.teams.map((entry) =>{
            var singleObj = {};
            if(entry.name != null) {
                singleObj["name"] = this.getTeamByCode(entry.name);
                singleObj["role"] = entry.role;
                teamSave.push(singleObj);
            }
        });
        event ? event.preventDefault() : null;
        var projectData = {
            "code": this.state.code,
            "teams": teamSave,
        };
        editTeamsProject(projectData);
    }

    handleAddRow = () => {
        const item = {
            name: this.state.name,
            role: this.state.role
        };
        this.setState({
            teams: [...this.state.teams, item]
        });

    };

    handleRemoveSpecificRow = idx => () => {
        const teams = [...this.state.teams];
        teams.splice(idx, 1);
        this.setState({ teams });
    };

    changeContent = (name, e) => {
        var state = this.state;
        state[name] = e.target.value;
        this.setState(state);
    };
    renderViewProfile(){
        return(
            <div>
                <SeeProfile parent={this} backAllProfiles={this.backAllProfiles} userInfo={this.state.userInfo} {...this.state} baseData={this.props.baseData} {...this.props}/>
            </div>
        );
    }

    getTeamByCode(code){
        var users = this.props.users;
        var all_team = [];
        users.map((entry) =>{

            var singleObj = {};
            if(entry.name != null) {
                singleObj["value"] = entry.name;
                singleObj["label"] = entry.username;
                all_team.push(singleObj);
            }
        });
        if(code != null){

            let _country = all_team.filter(function (c) {
                return c.value.toLowerCase() == code.toLowerCase();
            });
            return _country[0].label;
        }
    }

    getUsernameToName(code){
        let users = this.props.users;
        let all_team = [];
        users.map((entry) =>{

            var singleObj = {};
            if(entry.username != null) {
                singleObj["value"] = entry.name;
                singleObj["label"] = entry.username;
                all_team.push(singleObj);
            }
        });
        if(code != null){
            let _team = all_team.filter(function (c) {
                return c.label.toLowerCase() == code.toLowerCase();
            });
            return _team[0].value;
        }
    }
    setProject(val) {
        if(val != null){
            var state = this.state;
            state['name'] = val.value;
            this.setState(state);
        }
    }
    render() {
        var users = this.props.users;
        var all_team = [];
        var listName = [];
        users.map((entry) =>{
            var singleObj = {};
            if(entry.name != null) {
                listName.push(entry.name);
            }
        });
        listName.sort();
        listName.map((entry) =>{
            var singleObj = {};
            if(entry != null) {
                singleObj["value"] = entry;
                singleObj["label"] = entry;
                all_team.push(singleObj);
            }
        });


        return (
                <div className='popup_skill'>
                    <div className="close_skill" onClick={this.props.closePopupTeam}></div>
                    <form method="get" onSubmit={this.edit_teams_project.bind(this)}>
                        <div className="header_skill">EDIT MANATY TEAM</div>
                        <div className="table_team">
                                    <table
                                        className="croll_team"
                                    >
                                        <thead>
                                        <tr>
                                            <th className="text-center"> Name </th>
                                            <th className="text-center"> Role </th>
                                            <th className="text-center"> Delete </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.teams.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>
                                                        {this.state.teams[idx].name}
                                                </td>
                                                <td>
                                                        {this.state.teams[idx].role}
                                                </td>
                                                <td>
                                                    <img onClick={this.handleRemoveSpecificRow(idx)} src="images/icon/empty_skill.png" className="del-btn"/>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                        </div>

                        <div className="add_member">Add member : </div>
                                    <div className="select_team">

                                        <span className=""><Select
                                            className="select_team_user"
                                            value={this.state.name}
                                            placeholder="Name"
                                            options={all_team}
                                            onChange={this.setProject.bind(this)}
                                        /></span><br/>
                                    </div>

                                    <div >
                                        <input className="select_team_role"
                                               value={this.state.role}
                                               onChange={this.changeContent.bind(this, "role")}
                                               placeholder="Role in the project"/><br/>
                                    </div>

                        <div className="footer_skill">
                            <button className="btn_skill" type="submit" onClick={this.props.closePopupTeamDelay}>SAVE</button>
                        </div>
                    </form>
                    <button className="btn_add" disabled={!this.state.teams || !this.state.role} onClick={this.handleAddRow} >Add</button>

                </div>

        );
    }
}
export default ProjectPopupClient;
