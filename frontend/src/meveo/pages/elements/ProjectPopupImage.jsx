import React, {Component} from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import { render } from 'react-dom';
import {Modal, Panel, PanelGroup} from 'react-bootstrap';
import {editImageUser,uploadImage} from '../../actions/UserProfileAction';
import UserStore from '../../stores/UserStore';

class ProjectPopupImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file:{name:'',type:''},
            form:{
                username: "",
                photo:"",
            },
            statusImage:null,
            filename:'',
            note:null,
            error: {
                status: false,
                message: ""
            },
            load:false

        };
        this.state.filterText = "";
        this.onChange = this.onChange.bind(this);

    }

    componentWillMount() {
        UserStore.bindUpdateHandler(this.userDetailOnUpdate.bind(this));

    }
    componentWillUnmount() {
        UserStore.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
    }

    componentDidMount(){
        this.setDataFormData();
        this.edit_upload_image();
        uploadImage();
    }

    shouldComponentUpdate() {
        this.state.statusImage == 'upload_image_success'
            return true;
    }

    userDetailOnUpdate(response) {
        console.log("user On Update");
        console.log(response);
        const {result, message} = response

        if( message == "upload_image_success") {
            this.setState({
                statusImage: message
            });
        }
        this.state;
    }

    edit_upload_image(event) {
        event ? event.preventDefault() : null;
        if(this.validateUploadImage()){
        if(this.state.statusImage == 'upload_image_success'){
            var filename=this.state.file.name;
        }
            this.onFormSubmit();

        var updateType = "form";
        const {form} = this.state;
        var userData = {
            "username": form.username,
            "photo": filename
        };
        editImageUser(userData);
        }
    }

    // UPLOAD FILE IMAGE
    onFormSubmit() {
        this.fileUpload(this.state.file);
    }

    onChange(e) {
        this.setState({ file: e.target.files[0]});
    }

    fileUpload(file) {
        if(this.state.file != null){
            var filename=this.state.file.name;
            var formData = new FormData();
            var username=this.state.form.username;
            formData.append('uploadedFile',file);
            formData.append('filename',filename);
            uploadImage(formData,username);
        }
    }

    handleChangeFile(event) {
        const file = event.target.files[0];
        var filename=file.name;
        let formData = new FormData();
        formData.append('uploadedFile',file);
        formData.append('filename',filename);
        if(this.validateUploadImage()){
        uploadImage(formData);
        }
        this.setState({ file: event.target.files[0]});
    }

    setDataFormData() {
        const {userInfo} = this.props;
        if (userInfo != null) {
            var state = this.state;
            state['form']['username'] = userInfo.username;
            state['photo'] = userInfo.photo;
            this.setState(state);
        }
    }

    openFileWindow(event){
        event.preventDefault();
        document.getElementById('uploadImage').click();
    }

    reloadPage() {
        if(this.state.statusImage == 'upload_image_success') {
            location.reload()
        }
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

    popupImageDelay() {
        if(this.validateUploadImage()){
            this.props.closePopupImageDelay();
        }
    }

    render() {
        var file = this.state.file;
        var statusImage = this.state.statusImage;
        return (
                <div className='popup_bio'>
                    <div className="close_bio" onClick={this.props.closePopupImage}></div>
                    <form method="post" onSubmit={this.edit_upload_image.bind(this)}>
                        <div className="header_bio">EDIT PROFILE PICTURE</div>
                        <div className="size_image">Picture must be square, preferred size 500X500 px</div><br/>
                            <span className="name_picture">Upload Picture :</span> <span className="name_photo">
                                {this.state.file.name ?
                                    this.state.file.name
                                    : this.state.photo
                                }
                            </span>
                        <button className="btn_pic" onClick={this.openFileWindow.bind(this)}>Change file</button><br/>
                                <div>
                                    {this.state.error.status ?
                                            <div className="text-danger error_message">{this.state.error.message}</div>
                                        : null
                                    }
                                   </div>
                        <input onChange={this.handleChangeFile.bind(this)} type="file" className="hidden" id="uploadImage"/>
                        <div className="footer_bio">
                            {this.state.statusImage == 'upload_image_success'?
                                <button className="btn_bio" type="submit"
                                        onClick={this.popupImageDelay.bind(this)}
                                >Save</button>
                                :<button className="btn_bio" type="submit"
                                         disabled={true}
                                >Save</button>
                            }
                        </div>
                    </form>
                </div>
        );
    }
}
export default ProjectPopupImage;
