import React, {Component} from 'react';
import { render } from 'react-dom';
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";

import UserStore from '../../stores/UserStore';
import {
    getImage,
    userDetail,
    projectDetail,
    generateCV,
    removeMission,
    generateCVExport
} from '../../actions/UserProfileAction';
import SeeProjects from './SeeProjects.jsx';
import StarRatingComponent from 'react-star-rating-component';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import renderHTML from "react-render-html";

// 1 creat moment and stateDefinitions for DateRangePicker
const moment = extendMoment(originalMoment);
const stateDefinitions = {
    available: {
        color: null,
        label: "Available"
    },
    enquire: {
        color: "white",
        label: "Enquire"
    },
    unavailable: {
        selectable: false,
        color: "#78818b",
        label: "Unavailable"
    }
};

class Projects extends React.Component{

    render(){
        return(
            <span >
                {this.props.projects.slice(0,this.props.itemsToShow).map((el, index) => (
                    <span key={index} className="project_profile">
                        <span className="full_project"><div className="manaty_see_project" onClick={() =>this.props.viewProject(el.name)}>{el.name}</div> - <span className="star_project">{el.role}</span></span>

                    </span>
                ))}
            </span>
        )
    }
}
class Skills extends React.Component{

    render(){
        return(
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-12">
                        <div className="list-group d-flex flex-row flex-wrap">
                            {this.props.skills.slice(0,this.props.itemsToShowSkill).map((el, indeskill_profilex) => (
                                <li className="list-group-item w-50">
                                    <div className="container-fluid ">
                                        <div className="row">
                                            <div className="col-sm-7">
                                                <span className="center_skill">{el.name}</span>
                                            </div>
                                            <div className="col-sm-5">
                                                <span className="star_skill">
                                                    <StarRatingComponent
                                                        name="rate1"
                                                        starCount={5}
                                                        value={el.ratio}
                                                        starColor={"#ffff00"}
                                                        emptyStarColor={"#c0c0c0"}
                                                    /></span>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                            ))}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

class Educations extends React.Component {

    render() {
        return (
            <ul>
                {this.props.educations.map((el, index) => (
                    <li key={index}>
                        <div className="degreeTitle">{el.degreeTitle}<br/></div>
                        <div><span
                            className="name_degree_title">{el.university}{el.fromYear ? ` - ${el.fromYear}` : ''}{el.toYear ? `-${el.toYear}` : ''}</span><br/><br/>
                        </div>
                    </li>
                ))}
            </ul>
        )
    }
}

class Courses extends React.Component {

    render() {
        return (
            <ul>
                {this.props.courses.map((el, index) => (
                    <li key={index}>
                        <span className="course_title">{el.courseTitle}</span>
                        <span
                            className="name_course_title"> -{el.fromYear}{el.fromYear && el.toYear ? '-' : ''}{el.toYear}</span>
                        <br/>
                    </li>
                ))}
            </ul>
        )
    }
}

class Missions extends React.Component {

    removeMission(mission) {
        const userMission = {
            "username": this.props.username,
            "mission": mission
        };
        removeMission(userMission);
    }

    render() {
        return (
            <div>
                {this.props.missions.slice(0, this.props.itemsToShow).map((el, index) => (
                    <div key={index}>
                        <div className="col-2">
                        </div>
                        <div className="col-10">
                            <span className="mission_title">{el.missionTitle}</span>
                            <span className="name_mission_title">&nbsp;
                                {moment(el.fromDate, "DD/MM/YYYY").format("MM/YYYY").toString()}&nbsp;
                                {' - '}&nbsp;
                                {moment(el.toDate, "DD/MM/YYYY").format("MM/YYYY").toString() === 'Invalid date' ? 'Ongoing' : moment(el.toDate, "DD/MM/YYYY").format("MM/YYYY").toString()}
                            </span><br/>

                            <div className="mission_description">{renderHTML(el.missionDescription)}</div>
                            <br/>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

class UserProfileInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            error: null,
            editMode: false,
            form:{
                username: "",
                email: "",
                firstName: "",
                lastName: "",
                sinceDate: null,
                photo:"",
                job:"",
                skypeId:"",
                country:"",
                countryDisplay:"",
                linkedin:"",
                cv:"",
                bio:"",
                skills: [{name:"",ratio:null}],
                projects: [{ name: "", role: "" }],
                availability:{hoursWork:null, infos:'', timeZone:'', vocations:[]},
                photoBase64:"",
                cvBase64:"",
                educations:[{ degreeTitle: "", university: "", toYear: "", fromYear: "",}],
                courses:[{ toYear:"", fromYear:"", courseTitle:"",}],
                missions:[{ missionDescription: "", fromDate: "", toDate: "", missionTitle: "",}],
            },
            userInfo:null,
            all_countries:{value:null,label:null},
            photo:'',
            filename:"",
            file:{name:'',},
            filenameCV:"",
            fileCV:{name:'',},
            imagePreviewUrl: '',
            formError: {
                status: false,

            },
            message: "",
            vocations:[],
            itemsToShow: 9,
            itemsToShowSkill:10,
            expanded: false,
            expandedSkill: false,
        }
        this.getCountryByCode = this.getCountryByCode.bind(this);
        this.showMore = this.showMore.bind(this);
        this.showMoreSkill = this.showMoreSkill.bind(this);
        this.viewProject = this.viewProject.bind(this);
    }

    componentWillMount() {
        UserStore.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
    }
    componentWillUnmount() {
        UserStore.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
    }

    componentDidMount() {
        this.setDataFormData();
    }

    shouldComponentUpdate(nextProps, nextState){
        return true;
    }

    userDetailOnUpdate(response) {
        console.log("user On Update");
        console.log(response);
        const {result, message} = response
        if (message == "upload_image_success") {
            this.setState({
                userInfo: result,
                message: message
            });
        }

        if (message == "generate_CV_success") {
            this.download_file(result.fileName, result.document);
        }

        this.state;
        this.setDataFormData();
    }

    download_file(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-16le;base64,' + text);
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }



    setDataFormData() {
        var user = this.props.userInfo;
        if (user != null) {
            var state = this.state;
            state['form']['email'] = user.email;
            state['form']['name'] = user.name;
            state['form']['username'] = user.username;
            state['form']['lastName'] = user.lastName;
            state['form']['firstName'] =user.firstName;
            state['form']['sinceDate'] = user.sinceDate;
            state['form']['job'] = user.job;
            state['form']['skypeId'] = user.skypeId;
            state['form']['country'] = user.country;
            state['form']['countryDisplay'] = this.getCountryByCode(user.country);
            state['form']['linkedin'] = user.linkedin;
            state['form']['bio'] = user.bio;
            state['form']['skills'] =user.skills;
            state['form']['projects'] = user.projects;
            state['form']['availability'] = user.availability;
            state['cv'] = user.cv;
            state['photo'] = user.photo;
            state['photoBase64'] = user.photoBase64;
            state['cvBase64'] = user.cvBase64;
            state['form']['courses'] = user.courses;
            state['form']['educations'] = user.educations;
            state['form']['missions'] = user.missions;
            this.setState(state);
        }
    }


    getCountryByCode(code){
        if(code != null){
            const all_countries = this.props.countryAll;
            var _country = all_countries.filter(function (c) {
                return c.value.toLowerCase() == code.toLowerCase();
            });
            return _country[0].label;
        }}

    showMore() {
        this.state.itemsToShow === 9 ? (
            this.setState({ itemsToShow: this.state.form.projects.length, expanded: true })
        ) : (
            this.setState({ itemsToShow: 9, expanded: false })
        )
    }

    showMoreSkill() {
        this.state.itemsToShowSkill === 10 ? (
            this.setState({ itemsToShowSkill: this.state.form.skills.length, expandedSkill: true })
        ) : (
            this.setState({ itemsToShowSkill: 10, expandedSkill: false })
        )
    }

    viewProject(name){
        projectDetail(name);
    }

    generate_CV() {
        generateCV(this.props.userInfo.username)
    }

    generate_CV_Export() {
        if (this.props.userInfo) {
            generateCVExport(this.props.userInfo.username)
        }
    }

    renderViewProject(){
        return(
            <div>
                <SeeProjects parent={this} users={this.props.users} backAllProjects={this.props.backAllProjects} resetFilter={this.resetFilter} projectSee={this.state.projectSee} {...this.state} baseData={this.props.baseData} {...this.props}/>
            </div>
        );
    }

    renderUserProfileInfo(){
        //Calendar range
        var listOfObjects = [];
        var vocations = this.state.form.availability.vocations;
        var vocaDisplay =[];
        if (vocations != null) {
            vocaDisplay = vocations.filter(el => {
                return (moment(el.substring(0,10), "DD/MM/YYYY").format("YYYY-MM-DD").toString() > moment().subtract(12, 'months').format("YYYY-MM-DD").toString());
            });
        }

        var listOfObjectsEX = [];
        if(this.state.form.availability.vocations != null){
            vocaDisplay.map((entry)=> {
                var singleObjEX = {};
                singleObjEX["a"] = moment(moment(entry.substring(0, 10), 'DD/MM/YYYY')).format("YYYY-MM-DD");
                if (entry.substring(13) != "") {
                    singleObjEX["b"] = moment(moment(entry.substring(13), 'DD/MM/YYYY')).format("YYYY-MM-DD");
                } else {
                    singleObjEX["b"] =moment(moment(entry.substring(0, 10), 'DD/MM/YYYY')).format("YYYY-MM-DD");
                }
                listOfObjectsEX.push(singleObjEX);
            });}

        listOfObjectsEX.forEach(function(entry) {
            var singleObj = {};
            singleObj["state"] = "enquire";
            singleObj["range"] = moment.range(Object.values(entry));
            listOfObjects.push(singleObj);
        });
        return(

            <div className="row">
                <div class="profile_scoll" id="hidingScrollBar" style={{marginLeft: "-12px"}}>
                    <div class="hideScrollBar">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 boder_header" style={{marginLeft: "18px"}}>
                    <span className="name_header"><span onClick={this.props.backAllProfiles}><label>TEAM</label></span> > {this.state.form.name}</span>
                    <div onClick={this.props.backAllProfiles}><label className="back_profile" ><span className="name_back">Back to all profiles</span>
                        <span className="arrow_back"></span>
                    </label></div>
                </div>
                {/*<hr className="line_header"></hr>*/}

                <div className="col-xs-4">
                    {/*left_profile*/}
                    <section className="profile_infomation">

                        <div className="image_pro">
                            <div ><img className="image" src={"data:image/jpeg;base64," + this.state.photoBase64} /></div>
                            <span className="name_profile">
                                         <div className="user_name">
                                             <span className="squa">[</span>
                                             {this.state.form.firstName + " " + this.state.form.lastName}&nbsp;
                                             <span className="squa">]</span>
                                        </div>
                                        <div>{this.state.form.job}&nbsp;</div>
                                        <div>{this.state.form.countryDisplay}&nbsp;</div>
                                </span>
                            <div className="white_profile"></div>
                        </div>

                        <div className="since_date">Manaty member since: {this.state.form.sinceDate}&nbsp;</div>

                        <div className="infomation">
                            <span className="mail"></span><span className="text_profile">{this.state.form.email}&nbsp;</span>
                            <span className="skype"></span><span className="text_profile1">{this.state.form.skypeId}&nbsp;</span>
                            <span className="linkedin"></span>
                            {this.state.form.linkedin ? (<a target="_blank" href={this.state.form.linkedin} className="text_profile2">{this.state.form.linkedin}&nbsp;</a>): ''}

                            <span className="cv"></span>
                            <span className="btn_cv" onClick={this.generate_CV.bind(this)}>Export CV in PDF</span>
                            <span className="btn_cv_export" onClick={this.generate_CV_Export.bind(this)}>Export CV in word</span>
                            <div className="white_infomation"></div>
                        </div>

                    </section>
                </div>

                {/*<div className="col-md-8">*/}
                <div className="col-xs-8">
                    {/*right_profile article*/}
                            <table className="table_profile">
                                <tr>
                                    <td className="bio" >

                                        <div>
                                            <div><span className="text_bio">BIO</span></div>
                                            <span className="corner1"></span>
                                            <div className="value_bio">{this.state.form.bio}</div>
                                            <span className="corner2"></span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="space">
                                    </td>
                                </tr>
                                <tr>
                                    <td className="skill">

                                        <div >
                                    <span><div><span className="text_skill">SKILLS</span></div>
                                    <div className="display_skill"><Skills skills={this.state.form.skills} itemsToShowSkill = {this.state.itemsToShowSkill}/></div>
                                         <div className="see_more" onClick={this.showMoreSkill}>
                                        {this.state.expandedSkill ? (
                                            <div>See less</div>
                                        ) : (
                                            <div>See more</div>
                                        )
                                        }
                                    </div>

                                        <span className="line1"></span>
                                        <span className="line2"></span>
                                    </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="space">
                                    </td>
                                </tr>
                                <tr>
                                    <td className="project">
                                        <div >
                                            <div><span className="text_project">MANATY PROJECTS</span></div>
                                            <span className="display_project"><Projects projects={this.state.form.projects} itemsToShow = {this.state.itemsToShow} viewProject={this.viewProject}/></span><br/>

                                            <div className="see_more" onClick={this.showMore}>
                                                {this.state.expanded ? (
                                                    <div>See less</div>
                                                ) : (
                                                    <div>See more</div>
                                                )
                                                }
                                            </div>

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="space">
                                    </td>
                                </tr>
                                <tr>
                                    <td className="availability">

                                        <div className="availability_inin"></div>

                                        <span className="text_availability">AVAILABILITY</span>

                                        <div className="availability_in">  </div>
                                        <div className="hour"><span className="hours_title">Number of working hours a week</span><br/>
                                            <span className="hours_value">{this.state.form.availability.hoursWork} hrs</span>
                                        </div>

                                        <div className="infos"><span className="infos_title">Infos</span><br/>
                                            <span className="infos_value">{this.state.form.availability.infos}</span>
                                        </div>

                                        <div className="time"><span className="time_title">Time zone (UTC)</span><br/>
                                            <span className="time_value">{this.state.form.availability.timeZone}</span>
                                        </div>

                                        <div className="calendar">
                                            <div className="vacation"><span className="vacation_title_pro">Calendar :</span><br/>
                                                <span className="calendar_profile">
                                                        <DateRangePicker
                                                            firstOfWeek={1}
                                                            numberOfCalendars={1}
                                                            selectionType="range"
                                                            stateDefinitions={stateDefinitions}
                                                            dateStates={listOfObjects}
                                                            defaultState="available"
                                                        /></span>

                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="space">
                                    </td>
                                </tr>
                                <tr>
                                    <td className="educations">
                                        <div>
                                            <div className="text_educations">EDUCATION</div>
                                            <div className="display_educations"><Educations educations={this.state.form.educations}/></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="space">
                                    </td>
                                </tr>
                                <tr>
                                    <td className="courses">
                                        <div><span className="text_courses"> TRAININGS COURSES </span></div>
                                        <div className="display_courses"><Courses courses={this.state.form.courses}/></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="space">
                                    </td>
                                </tr>
                                <tr>
                                    <td className="missions">
                                        <div>
                                            <span className="text_missions"> MISSIONS / WORK EXPERIENCES </span>
                                            <div className="display_mission">
                                                <Missions
                                                    missions={this.state.form.missions}
                                                    username={this.state.form.username}/>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="container-fluid profile_manaty">
                {this.props.projectSee == null ?
                    this.renderUserProfileInfo() : this.renderViewProject()
                }
            </div>
        );
    }
}
export default UserProfileInfo;
