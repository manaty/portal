import React, {Component} from 'react';
import { render } from 'react-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import ProjectPopupClient from "../elements/ProjectPopupClient.jsx";
import ProjectPopupAssemblaLink from "../elements/ProjectPopupAssemblaLink.jsx";
import ProjectPopupTeam from "../elements/ProjectPopupTeam.jsx";
import SeeProfile from './SeeProfile.jsx';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import UserStore from '../../stores/UserStore';
import {getImage,projectDetail,userDetail} from '../../actions/UserProfileAction';
import StarRatingComponent from 'react-star-rating-component';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import originalMoment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(originalMoment);


class Teams extends React.Component{

    render(){
        let teams = [];
        if (this.props.teams) {
            teams = this.props.teams;
        }
        return(
            <div >
                {this.props.teams.map((el, index) => (
                    <div key={index} className="project_team_list">
                         <span><img className="image_teams" src={"data:image/jpeg;base64," + el.photoBase64} /></span>
                        <div className="in_pro">
                            <div className="full_name">{el.fullName}</div>
                            <div className="role_pro">{el.role}</div>
                            <div className="btn_pro"><button className="btn_see_project" onClick={() =>this.props.viewProfile(el.name)}>See profile</button></div>
                        </div>

                    </div>
                ))}
            </div>
        )
    }
}

class Contact extends Component {
    render() {
        const data=this.props.projectSee.contacts;
        return (
            <div>
                <BootstrapTable data={data}>
                    <TableHeaderColumn isKey dataField='name'>
                        Name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='position'>
                        Position
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='mail'>
                        Mail
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='skype'>
                        Skype
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='tel'>
                        Tel
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

class SeeProjects extends Component {

	constructor(props) {
			super(props);
			this.state = {
                showPopupClient: false,
                showPopupAssembla: false,
                showPopupTeam: false,
                userInfo: null,
                file:{name:'',},
                imagePreviewUrl: '',
                uploadImage:false,
                teams:[{name:'',role:'',fullName:'',photoBase64:''},]
			};
        this.viewProfile = this.viewProfile.bind(this);
	}

    componentWillMount() {
        UserStore.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
	}

	componentWillUnmount() {
        UserStore.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
	}

	componentDidMount(){
        this.setDataFormData();
	}

	shouldComponentUpdate(nextProps, nextState){
        return true
	}

    componentWillReceiveProps() {
	}

    togglePopupClient() {
        this.setState({
            showPopupClient: !this.state.showPopupClient
        });
    }

    togglePopupClientDelay() {
       setTimeout(() => {
          this.setState({
            showPopupClient: !this.state.showPopupClient,
            uploadImage: !this.state.uploadImage
          })
       }, 500);
    }

    togglePopupAssembla() {
        this.setState({
            showPopupAssembla: !this.state.showPopupAssembla
        });
    }

    togglePopupAssemblaDelay() {
        setTimeout(() => {
            this.setState({
                showPopupAssembla: !this.state.showPopupAssembla
            })
        }, 500);
    }

    togglePopupTeam() {
        this.setState({
            showPopupTeam: !this.state.showPopupTeam
        });
    }

    togglePopupTeamDelay() {
        setTimeout(() => {
            this.setState({
                showPopupTeam: !this.state.showPopupTeam
            })
        }, 500);
	}

    renderProfilePopupClient(){
        return(
            <div className='userpopup'>
                {this.state.showPopupClient ?
                    <ProjectPopupClient parent={this} projectSee={this.props.projectSee}
                                        closePopupClient={this.togglePopupClient.bind(this)}
                                        closePopupClientDelay={this.togglePopupClientDelay.bind(this)}
                    />
                    : null
                }
            </div>

        );
    }

    renderProfilePopupAssemblaLink(){
        return(
            <div className='userpopup'>
                {this.state.showPopupAssembla ?
                    <ProjectPopupAssemblaLink parent={this} projectSee={this.props.projectSee}
                                              closePopupAssembla={this.togglePopupAssembla.bind(this)}
                                              closePopupAssemblaDelay={this.togglePopupAssemblaDelay.bind(this)}
                    />
                    : null
                }
            </div>
        );
    }

    renderProfilePopupTeam(){
        return(
            <div className='userpopup'>
                {this.state.showPopupTeam ?
                    <ProjectPopupTeam parent={this} projectSee={this.props.projectSee} users={this.props.users}
                                                    closePopupTeam={this.togglePopupTeam.bind(this)}
                                                    closePopupTeamDelay={this.togglePopupTeamDelay.bind(this)}
                    />
                    : null
                }
            </div>
        );
    }

    viewProfile(username){
        userDetail(username);
    }

    userDetailOnUpdate(response) {
        console.log("user On Update");
        console.log(response);
        const {result, message} = response
        if( message == "user_profile_detail_success") {
            this.setState({
                userInfo: result
            });
        }
        this.state;
    }

    renderViewProfile(){
        return(
            <div>
                <SeeProfile parent={this} backAllProfiles={this.backAllProfiles} userInfo={this.state.userInfo} {...this.state} baseData={this.props.baseData} {...this.props}/>
            </div>
        );
    }

    setDataFormData() {
        const {projectSee} = this.props;
        if (projectSee != null) {
            var state = this.state;
            state['code'] = projectSee.code;
            state['logo'] = projectSee.logo;
            state['link'] = projectSee.link;
            state['contacts'] = projectSee.contacts;
            state['assemblaLink'] = projectSee.assemblaLink;
            state['teams'] = projectSee.teams;
            this.setState(state);
        }
    }

    //binding data from popupClient to SeeProject Page
    handleData(data) {
        this.setState({
            link: data
        });
    }

    renderSeeProject(){
        var dateEnd= moment(this.props.projectSee.dateEnd, "YYYY/MM/DD").format("MMMM-YYYY").toString();
        var dateStart= moment(this.props.projectSee.dateStart, "YYYY/MM/DD").format("MMMM-YYYY").toString();
        if (dateStart === 'Invalid date') {
            dateStart = 'Ongoing';
        }
        if (dateEnd === 'Invalid date') {
            dateEnd = 'Ongoing';
        }
        var photo64=this.props.projectSee.logoBase64;
        if (photo64 != null){
           var photoDisplay=photo64;
        } else{
            var photoDisplay='/9j/4QDCRXhpZgAASUkqAAgAAAAHABIBAwABAAAAAQAAABoBBQABAAAAYgAAABsBBQABAAAAagAAACgBAwABAAAAAgAAADEBAgAOAAAAcgAAADIBAgAUAAAAgAAAAGmHBAABAAAAlAAAAAAAAAAsAQAAAQAAACwBAAABAAAAUGhvdG9GaWx0cmUgNwAyMDE5OjAzOjEyIDE3OjM3OjI5AAMAAJAHAAQAAAAwMjEwAqADAAEAAAD0AQAAA6ADAAEAAAD0AQAA/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgB9AH0AwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8AxKKKK+4P5UCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooq5pOj3+vahFYaZZXOo30ufLtrSJpZXwCxwqgk4AJ+gNGxSTk0krtlOivoTwZ+xT4212VX12ey8M2odkdXkF1cYC5DKkZ2EFjjmRSME46Z9b8O/sOeD7CKzfV9X1XVrqJ98yxMlvbzgNkLsCs6grgHEmepBXjHDPG0Ifav6H1GG4ZzTEq6pcq/vafhv+B8QUV+iX/DJ/wAK/wDoVv8AyoXX/wAdo/4ZP+Ff/Qrf+VC6/wDjtYf2lS7P8P8AM9b/AFJzH+eH3y/+RPztor7w8U/sV+Ata8yTSn1Hw9N5BjjS3uPOhEnOJHWUM7ckZUOoIXjBya8e8Z/sQeK9Giabw9qll4jjVFJgcfZLhnLYIVWLJgDDZMg7jGQM7QxtCfW3qeZiuFs0wyb9nzpfyu/4aP8AA+cKK1/FPhHWfBOrSaZrumXOl3yZPlXCFd6hiu5D0dSVYBlJU44JrIruTTV0fKzhKnJxmrNdGFFFFMgKKKKACiiigAooooAKKKKACiiigAoo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mOTwxpRcEXUUxF9KFZiPnUgRhhsJVcnKkbypIPz3RRXVTpQpLlgrHgY3H4nMKntcTNyf4L0WyCiiitTzwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/9k=';
        }
		return(
                <div className="row">
                    <div class="project_scoll" id="hidingScrollBar">
                        <div class="hideScrollBar">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 boder_header_pro">
                                <span className="name_header"><span onClick={this.props.backAllProjects}><label>PROJECTS</label></span> > {this.props.projectSee.code}</span>
                                <div onClick={this.props.backAllProjects}><label className="back_profile" ><span className="name_back">Back to all projects</span>
                                    <span className="arrow_back"></span>
                                </label></div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 pro_page">
                                <div className="header_project">
                                    <div className="name_pro">
                                        <div>{this.props.projectSee.name}&nbsp;</div>
                                    </div>

                                    <div className="des_pro">
                                        {this.props.projectSee.shortDescription}
                                    </div>
                                        <img src="images/icon/calendar.png" className="date_pro"/>
                                        <span className="start_pro">{dateStart}&nbsp;</span><br/>
                                        <span className="end_pro">to {dateEnd}&nbsp;</span>

                                </div>
                            {/*Body*/}
                                    <div className="body_project" >

                                        <div className="body_left ">
                                            <div className="pro_detail">PROJECT DETAILS</div>
                                            <div>
                                                <img onClick={this.togglePopupClient.bind(this)} src="images/icon/edit.png" className="abso1" />
                                            </div>
                                            <div className="in_see">
                                                <div className="left_pro">
                                                    <div><img className="image_project" src={"data:image/jpeg;base64," + photoDisplay} /></div>
                                                </div>
                                                <div className="client_see">Client : {this.props.projectSee.client}&nbsp;</div>
                                                <div className="short_pro">{this.props.projectSee.longDescription}&nbsp;</div>
                                                <div className="link_see_out">Link : {this.props.projectSee.link ? <a target="_blank" href={this.props.projectSee.link} className="link_see">{this.props.projectSee.link}&nbsp;</a> : ''}</div>
                                            </div>
                                            <div className="contact">CONTACT</div>
                                            <div className="contact_pro"><Contact projectSee={this.props.projectSee}/></div>
                                        </div>

                                        <div className="body_center"></div>
                                        <div className="body_right">
                                            <div className="team_see">MANATY TEAM</div>
                                            {this.props.projectSee.teams && this.props.projectSee.teams.length !== 0 ?
                                                <Teams teams={this.props.projectSee.teams} viewProfile={this.viewProfile}/>
                                                : null}
                                            <img onClick={this.togglePopupTeam.bind(this)} src="images/icon/edit.png" className="abso1" />
                                        </div>
                                    </div>

                                {/*Footer*/}

                                    <div className="footer_project">
                                        <div className="header_see">
                                            <span className="as_pro"> Project space link :</span>
                                            <span className="link_pro">{this.props.projectSee.assemblaLink?<a target="_blank" href={this.props.projectSee.assemblaLink}>{this.props.projectSee.assemblaLink}&nbsp;</a>:''}</span>
                                        </div>

                                        <img onClick={this.togglePopupAssembla.bind(this)} src="images/icon/edit.png" className="abso1" />
                                    </div>
                            </div>
                            {this.state.showPopupClient == true || this.state.showPopupAssembla == true ||this.state.showPopupTeam == true ?
                                <div id="page-mask"></div>
                                : null
                            }
                        </div>
                    </div>
                </div>

		);
	}

    render() {

        return (
			<div className="container-fluid see_project">
				{
                    this.state.userInfo == null ?
				    this.renderSeeProject()
                        : this.renderViewProfile()
				}
                {this.renderProfilePopupClient()}
                {this.renderProfilePopupAssemblaLink()}
                {this.renderProfilePopupTeam()}
			</div>
        );
    }
}
export default SeeProjects;


