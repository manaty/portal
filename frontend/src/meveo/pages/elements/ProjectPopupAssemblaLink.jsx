import React, {Component} from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import { render } from 'react-dom';
import {Modal, Panel, PanelGroup} from 'react-bootstrap';
import {userDetail, editProfileUser,editAssemblaProject} from '../../actions/UserProfileAction';




class ProjectPopupClient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assemblaLink:''
        };
        this.state.filterText = "";
    }

    componentDidMount(){
        this.setDataFormData();

    }

    changeContent(name, e) {
        var state = this.state;
        state[name] = e.target.value;
        this.setState(state);
    }

    setDataFormData() {
        const {projectSee} = this.props;
        if (projectSee != null) {
            var state = this.state;
            state['code'] = projectSee.code;
            state['assemblaLink'] = projectSee.assemblaLink;
            this.setState(state);
        }
    }

    edit_assembla_project(event) {
        event ? event.preventDefault() : null;
        var projectData = {
            "code": this.state.code,
            "assemblaLink": this.state.assemblaLink
        };
        editAssemblaProject(projectData);
    }

    render() {
        return (
                <div className='popup_bio'>
                    <div className="close_bio" onClick={this.props.closePopupAssembla}></div>
                    <form method="get" onSubmit={this.edit_assembla_project.bind(this)}>
                        <div className="header_bio">EDIT PROJECT SPACE LINK </div>

                            <div className="assembla_out">
                                <span className="assembla_pro"> Project space link :</span>
                                <input
                                    className="input_as"
                                    value={this.state.assemblaLink}
                                    onChange={this.changeContent.bind(this, "assemblaLink")}
                                    type="text"/>
                               </div>
                        <div className="footer_bio">
                            <button className="btn_bio" type="submit" onClick={this.props.closePopupAssemblaDelay}>SAVE</button>
                        </div>
                    </form>

                </div>

        );
    }
}
export default ProjectPopupClient;
