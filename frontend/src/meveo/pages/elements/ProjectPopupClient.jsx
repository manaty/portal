import React, {Component} from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import { render } from 'react-dom';
import {Modal, Panel, PanelGroup} from 'react-bootstrap';
import {editClientProject,uploadImageProject} from '../../actions/UserProfileAction';
import ProjectStore from '../../stores/ProjectStore';


class ProjectPopupClient extends Component {

    constructor(props) {
        super(props);

        //  this.state.products = [];
        this.state = {
            file:{name:'',type:''},
            logo:'',
            link:'',
            contacts:[
                {id:'',nam:'',position:'',mail:'',skype:'',tel:''}
            ],
            description:'',
            showPopup: false,
            statusImage:null,
            error: {
                status: false,
                message: ""
            },
        };
        this.state.filterText = "";
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        ProjectStore.bindUpdateHandler(this.projectDetailOnUpdate.bind(this));
    }
    componentWillUnmount() {
        ProjectStore.unbindUpdateHandler(this.projectDetailOnUpdate.bind(this));
    }

    componentDidMount(){
        this.setDataFormData();
    }

    shouldComponentUpdate() {
        this.state.statusImage == 'upload_project_success'
        return true;
    }

    projectDetailOnUpdate(response) {
        console.log("project On Update");
        console.log(response);
        const {result, message} = response
        if( message == "upload_project_success") {
            this.setState({
                statusImage: message
            });
        }
        this.state;
    }

    setDataFormData() {
        const {projectSee} = this.props;
        if (projectSee != null) {
            var state = this.state;
            state['code'] = projectSee.code;
            state['logo'] = projectSee.logo;
            state['link'] = projectSee.link;
            state['contacts'] = projectSee.contacts;
            state['longDescription'] = projectSee.longDescription;
            this.setState(state);
        }
    }

    edit_client_project(event) {
        event ? event.preventDefault() : null;
        if(this.validateUploadImage()) {
            if (this.state.statusImage == 'upload_project_success') {
                var filename = this.state.file.name;
            }
            this.onFormSubmit();
            var projectData = {
                "code": this.state.code,
                "link": this.state.link,
                "contacts": this.state.contacts,
                "logo": filename,
                "longDescription": this.state.longDescription,
            };
            editClientProject(projectData);
        }
    }

    // UPLOAD PROJECT IMAGE
    onFormSubmit() {
            this.fileUpload(this.state.file);
    }

    onChange(e) {
            this.setState({file: e.target.files[0]});
    }

    handleChangeFile(e) {
        const file = e.target.files[0];
        if(file!= null){
            var filename=file.name;
        }

        var formData = new FormData();
        var code=this.state.code;
        formData.append('uploadedFile',file);
        formData.append('filename',filename);
        if(this.validateUploadImage()) {
            uploadImageProject(formData, code);
        }
        this.setState({file: e.target.files[0]});
    }

    fileUpload(file) {
        var filename=this.state.file.name;
        var formData = new FormData();
        var code=this.state.code;
        formData.append('uploadedFile',file);
        formData.append('filename',filename);
        uploadImageProject(formData,code);

    }

    //table
    handleChange = idx => e => {
        const { name, value } = e.target;
        const contacts = [...this.state.contacts];
        contacts[idx] = {
            [name]: value
        };
        this.setState({
            contacts
        });
    };
    handleAddRow = () => {
        const item = {
            name: this.state.name,
            position: this.state.position,
            mail: this.state.mail,
            skype: this.state.skype,
            tel: this.state.tel
        };
        this.setState({
            contacts: [...this.state.contacts, item]
        });
        setTimeout(() => {
            this.setState({
                showPopup: !this.state.showPopup
            })
        }, 200);
    };
    handleRemoveRow = () => {
        this.setState({
            contacts: this.state.contacts.slice(0, -1)
        });
    };
    handleRemoveSpecificRow = idx => () => {
        const contacts = [...this.state.contacts];
        contacts.splice(idx, 1);
        this.setState({ contacts });
    };

    changeContent(name, e) {
        if (!e.isTrusted) return;
        var state = this.state;
        state [name] = e.target.value;
        this.setState(state);
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        })
    }

    validateUploadImage(){
        if (this.state.file.type == "image/jpeg" || this.state.file.type =="" || this.state.file.type == "image/png" || this.state.file.type == "image/bmp" ) {
            var state = this.state;
            state['error']["status"] = false;
            state['error']["message"] = "";
            this.setState(state);
            return true;
        }
        else{
            var state = this.state;
            state['error']["status"] = true;
            state['error']["message"] = "Your file format is not good";
            this.setState(state);
            return false;
        }
    }

    closePopup() {
        if(this.validateUploadImage()){
            if(this.state.message == 'upload_project_success'){}
            setTimeout(() => {
                this.props.closePopupClientDelay();
            }, 100);
        }
    }
    openFileWindow(event){
        event.preventDefault();
        document.getElementById('uploadImage').click();
    }

    render() {
        return (
                <div className='popup_skill'>
                    <div className="close_skill" onClick={this.props.closePopupClient}></div>
                    <form method="get" onSubmit={this.edit_client_project.bind(this)} autoComplete="off">
                        <div className="header_skill">EDIT PROJECT INFOS</div>
                            {/*<div className="client_out">*/}
                                {/*<div className="client_pro">Client : {this.props.projectSee.client}&nbsp;</div>*/}
                            {/*</div>*/}
                        <div className="description_out">
                            <div className="description_in">
                            <div className="description">Project detailed description :</div>

                            <div className="value_description"><textarea
                                onChange={this.changeContent.bind(this, "longDescription")}
                                cols="70" rows="4"
                                value={this.state.longDescription}
                                type="text"
                            /></div>
                            </div>
                        </div>

                        <div className="link_out">
                            <div className="lk_pro">
                                <span className="sub_link">Link : </span>
                                <input
                                    value={this.state.link}
                                    onChange={this.changeContent.bind(this, "link")}
                                    type="text"
                                    className="ip_link"/>
                            </div>
                        </div>
                        <div className="logo_out">
                            <div className="logo_in"><span className="sub_logo">Logo :</span>
                                <span className="logo_pro">
                                    {this.state.file.name ?
                                        this.state.file.name
                                        : this.state.logo
                                    }
                                 </span>&nbsp;
                                <button type="file"
                                        onClick={this.openFileWindow.bind(this)}
                                        className="btn_see_pro">Change file</button>
                                <span className="size_pro">500x500px</span>
                                {
                                    this.state.statusImage == "upload_project_success"?
                                        <span className="logo_success">Upload logo success</span>
                                        : null
                                }

                            </div>
                        </div>

                        <div className="name_contact">Contacts : </div>

                        <div className="table_client">
                                        <table
                                            className="fixed_header "
                                            id="tab_logic"
                                        >
                                            <thead>
                                            <tr>
                                                <th className="text-center"> Name </th>
                                                <th className="text-center"> Position </th>
                                                <th className="text-center"> Mail </th>
                                                <th className="text-center"> Skype </th>
                                                <th className="text-center"> Tel </th>
                                                <th className="text-center"> Delete </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.contacts.map((item, idx) => (
                                                <tr id="addr0" key={idx}>
                                                    <td>
                                                        {this.state.contacts[idx].name}
                                                    </td>
                                                    <td>
                                                        {this.state.contacts[idx].position}
                                                    </td>

                                                    <td>
                                                        {this.state.contacts[idx].mail}
                                                    </td>

                                                    <td>
                                                        {this.state.contacts[idx].skype}
                                                    </td>

                                                    <td>
                                                        {this.state.contacts[idx].tel}
                                                    </td>

                                                    <td>
                                                        <img onClick={this.handleRemoveSpecificRow(idx)} src="images/icon/empty_skill.png" className="del-btn"/>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>

                                        </table>
                        </div>

                        <div className="add_row">
                                        <span className="bt4"><img onClick={this.togglePopup.bind(this)} src="images/icon/row.png"/></span>
                                        <span className="new_line">add new line</span>
                        </div>
                        <div className="show_row">

                        {this.state.showPopup ?(
                            <div>
                                <div className=' input_client_line' >
                                    <div className="li_skill">
                                        <span className="name_client_first">Name</span>
                                        <input
                                            type="text"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.changeContent.bind(this, "name")}
                                            className="form-control"
                                            autoComplete="off"
                                        />

                                        <span className="name_client">Position</span>
                                        <input
                                            type="text"
                                            name="name"
                                            value={this.state.position}
                                            onChange={this.changeContent.bind(this, "position")}
                                            className="form-control"
                                            autoComplete="off"
                                        />

                                        <span className="name_client">Mail</span>
                                        <input
                                            type="text"
                                            name="name"
                                            value={this.state.mail}
                                            onChange={this.changeContent.bind(this, "mail")}
                                            className="form-control"
                                            autoComplete="off"
                                        />

                                        <span className="name_client">Skype</span>
                                        <input
                                            type="text"
                                            name="name"
                                            value={this.state.skype}
                                            onChange={this.changeContent.bind(this, "skype")}
                                            className="form-control"
                                            autoComplete="off"
                                        />

                                        <span className="name_client">Tel</span>
                                        <input
                                            type="text"
                                            name="tel"
                                            value={this.state.tel}
                                            onChange={this.changeContent.bind(this, "tel")}
                                            className="form-control"
                                            autoComplete="off"
                                        />
                                        <button onClick={this.handleAddRow} className=" add_line" type="button">Add</button>
                                    </div>
                                </div>
                            </div>
                        ):null}

                        <input onChange={this.handleChangeFile.bind(this)} type="file" className="hidden" id="uploadImage"/>


                        </div>
                        {this.state.error.status ?
                            <div className="row">
                                <div className="text-danger error_message_cli">{this.state.error.message}</div>
                            </div>
                            : null
                        }
                        <div className="footer_skill">
                            {this.state.showPopup == false ?(
                                <button className="btn_skill" type="submit" onClick={this.closePopup.bind(this)}>SAVE</button>
                            ):null}
                        </div>
                    </form>

                </div>
        );
    }
}
export default ProjectPopupClient;
