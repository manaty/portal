import React, {Component,PureComponent} from 'react';
import originalMoment from "moment";
import {extendMoment} from "moment-range";

import UserStore from '../../stores/UserStore';
import {getImage, removeMission, userDetail, generateCV, generateCVExport} from '../../actions/UserProfileAction';
import UserPopup from "../elements/UserPopup.jsx";
import UserPopupBio from "../elements/UserPopupBio.jsx";
import UserPopupAvailability from "../elements/UserPopupAvailability.jsx";
import UserPopupSkills from "../elements/UserPopupSkills.jsx";
import UserPopupProjects from "../elements/UserPopupProjects.jsx";
import UserPopupEducations from "../elements/UserPopupEducations.jsx";
import UserPopupCourses from "../elements/UserPopupCourses.jsx";
import UserPopupMission from "../elements/UserPopupMission.jsx";
import ProjectPopupImage from "../elements/ProjectPopupImage.jsx";
import renderHTML from 'react-render-html';
import UserPopupMissionRemove from "../elements/UserPopupMissionRemove.jsx";

import LocalStorageService from '../../services/LocalStorageService';
import StarRatingComponent from 'react-star-rating-component';

const moment = extendMoment(originalMoment);

class Vocations extends React.Component {
    render() {
        let vocations = [];
        if (this.props.vocations) {
            vocations = this.props.vocations;
        }
        let vocation = [];
        if (vocations != null) {
            vocation = vocations.filter(el => {
                return (moment(el.substring(0, 10), "DD/MM/YYYY").format("YYYY-MM-DD").toString() > moment().subtract(12, 'months').format("YYYY-MM-DD").toString());
            });
        }
        let vocationDisplay = vocation.map((e, index) => (e)).join(" ; ");
        return (
            <div className="li_vocation">
                {vocationDisplay}
            </div>
        )
    }
}

class Projects extends React.Component {

    render() {
        let projects = [];
        if (this.props.projects) {
            projects = this.props.projects;
        }
        return (
            <span>
                {this.props.projects.slice(0, this.props.itemsToShow).map((el, index) => (
                    <span key={index} className="project_profile">
                        <span className="full_project"><span className="center_project">{el.name}</span> - <span
                            className="star_project">{el.role}</span></span>

                    </span>
                ))}
            </span>
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

class Missions extends PureComponent {

    removeMission(mission) {
        const userMission = {
            "username": this.props.username,
            "mission": mission
        };
        removeMission(userMission);
        this.props.togglePopupMissionRemove();
    }

    render() {
        let missions = [];
        if (this.props.missions) {
            missions = this.props.missions;
        }
        const { togglePopupMissionRemove, showPopupMissionRemove, showPopupMissionEdit } = this.props;
        return (
            <div>
                {missions.slice(0, this.props.itemsToShow).map((el, index) => (
                    <div key={index}>
                        <div className="col-2">
                            <span
                                className="empty_missions"
                                onClick={togglePopupMissionRemove}
                            />
                            <span
                                onClick={() => this.props.togglePopupMissionEdit(el)}
                                className="edit_missions"
                            />
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
                        <UserPopupMissionRemove
                            closePopupMissionRemove={togglePopupMissionRemove}
                            removeMission={this.removeMission.bind(this, el)}
                            showPopupMissionRemove={showPopupMissionRemove}
                        />
                    </div>
                ))}
                {showPopupMissionRemove == true || showPopupMissionEdit == true ?
                    <div id="page-mask"></div>
                    : null
                }
            </div>
        )
    }
}

class Skills extends React.Component {

    render() {
        return (
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-12">
                        <div className="list-group d-flex flex-row flex-wrap">
                            {this.props.skills.slice(0, this.props.itemsToShowSkill).map((el, index) => (
                                <li className="list-group-item w-50" key={index}>
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

class UserProfileInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            showPopupBio: false,
            showPopupAvailability: false,
            showPopupProjects: false,
            showPopupSkills: false,
            showPopupEducations: false,
            showPopupCourses: false,
            showPopupImage: false,
            showPopupMission: false,
            showPopupMissionEdit: false,
            isLoading: false,
            error: null,
            editMode: false,
            showPopupMissionRemove: false,
            form: {
                username: "",
                email: "",
                firstName: "",
                lastName: "",
                sinceDate: null,
                photo: "",
                job: "",
                skypeId: "",
                country: "",
                countryDisplay: "",
                linkedin: "",
                cv: "",
                cvExport:"",
                bio: "",
                skills: [{name: "", ratio: null}],
                projects: [{name: "", role: ""}],
                educations: [],
                courses: [],
                missions: [],
                availability: {hoursWork: null, infos: '', timeZone: '', vocations: []},
                photoBase64: "",
                cvBase64: "",
            },
            userInfo: null,
            all_countries: {value: null, label: null},
            photo: '',
            filename: "",
            file: {name: '',},
            filenameCV: "",
            fileCV: {name: '',},
            imagePreviewUrl: '',
            formError: {
                status: false,

            },
            message: "",
            vocations: [],
            itemsToShow: 9,
            itemsToShowSkill: 10,
            expanded: false,
            expandedSkill: false,
        };
        this.getCountryByCode = this.getCountryByCode.bind(this);
        this.showMore = this.showMore.bind(this);
        this.showMoreSkill = this.showMoreSkill.bind(this);
    }

    componentWillMount() {
        UserStore.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
    }

    componentWillUnmount() {
        UserStore.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
    }

    componentDidMount() {
        var userName = LocalStorageService.getTokenParsed().preferred_username;;
        userDetail(userName)
        this.setDataFormData();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillReceiveProps() {
    }

    editUserBio(userData) {
        const {parent} = this.props;
        parent.editUserBio(userData);
    }

    validateDateFields() {

        var state = this.state;
        state['formError']["status"] = false;
        this.setState(state);
        return true;
    }

    updateUserDetail(event) {
        event.preventDefault();
        if (this.validateDateFields()) {
            var updateType = "form";
        }
    }

    userDetailOnUpdate(response) {
        console.log("user On Update");
        console.log(response);
        const {result, message} = response;
        if (message === "upload_image_success") {
            this.setState({
                userInfo: result,
                message: message
            });
        }

        if (message === "generate_CV_success") {
            this.download_file(result.fileName, result.document);
        }

        if (message === "generate_CV_Export_success") {
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
            state['form']['username'] = user.username;
            state['form']['lastName'] = user.lastName;
            state['form']['firstName'] = user.firstName;
            state['form']['sinceDate'] = user.sinceDate;
            state['form']['job'] = user.job;
            state['form']['skypeId'] = user.skypeId;
            state['form']['country'] = user.country;
            state['form']['countryDisplay'] = this.getCountryByCode(user.country);
            state['form']['linkedin'] = user.linkedin;
            state['form']['bio'] = user.bio;
            state['form']['skills'] = user.skills;
            state['form']['projects'] = user.projects;
            state['form']['availability'] = user.availability;
            state['form']['courses'] = user.courses;
            state['form']['educations'] = user.educations;
            state['form']['missions'] = user.missions;
            state['cv'] = user.cv;
            state['cvExport'] = user.cvExport;
            state['photo'] = user.photo;
            state['photoBase64'] = user.photoBase64;
            state['cvBase64'] = user.cvBase64;

            this.setState(state);
        }
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    togglePopupBio() {
        this.setState({
            showPopupBio: !this.state.showPopupBio
        });
    }

    togglePopupAvailability() {
        this.setState({
            showPopupAvailability: !this.state.showPopupAvailability
        });
    }

    togglePopupSkills() {
        this.setState({
            showPopupSkills: !this.state.showPopupSkills
        });
    }

    togglePopupProjects() {
        this.setState({
            showPopupProjects: !this.state.showPopupProjects
        });
    }

    togglePopupImage() {
        this.setState({
            showPopupImage: !this.state.showPopupImage
        });
    }

    togglePopupEducations() {
        this.setState({
            showPopupEducations: !this.state.showPopupEducations
        });
    }

    togglePopupCourses() {
        this.setState({
            showPopupCourses: !this.state.showPopupCourses
        });
    }

    togglePopupMission() {
        this.setState({
            showPopupMission: !this.state.showPopupMission,
        });
    }

    togglePopupMissionEdit(mission) {
        this.setState({
            showPopupMissionEdit: !this.state.showPopupMissionEdit,
            mission,
        });
    }

    togglePopupImageDelay() {
        if (this.state.message === 'edit_image_success') {
        }
        setTimeout(() => {
            this.setState({
                showPopupImage: !this.state.showPopupImage
            });
        }, 100);
    }

    generate_CV() {
        generateCV(this.props.userInfo.username)
    }

    generate_CV_Export() {
        if (this.props.userInfo) {
            generateCVExport(this.props.userInfo.username)
        }
    }

    getCountryByCode(code) {
            if (code != null) {
            const all_countries = this.props.countryAll;
            var _country = all_countries.filter(function (c) {
                return c.value.toLowerCase() === code.toLowerCase();
            });
            return _country[0].label;
        }
    }

    showMore() {
        this.state.itemsToShow === 9 ? (
            this.setState({itemsToShow: this.state.form.projects.length, expanded: true})
        ) : (
            this.setState({itemsToShow: 9, expanded: false})
        )
    }

    showMoreSkill() {
        this.state.itemsToShowSkill === 10 ? (
            this.setState({itemsToShowSkill: this.state.form.skills.length, expandedSkill: true})
        ) : (
            this.setState({itemsToShowSkill: 10, expandedSkill: false})
        )
    }

    togglePopupMissionRemove() {
        this.setState({
            showPopupMissionRemove: !this.state.showPopupMissionRemove,
        });
    }

    renderUserProfileInfo() {

        return (
            <div className="my_profile">
                 <div className="row">
                    <div class="profile_scoll" id="hidingScrollBar" style={{marginLeft: "-10px"}}>
                        <div class="hideScrollBar">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 boder_header" style={{marginLeft: "13px"}}>
                                <div className="name_header">MY PROFILE</div>
                            </div>
                            <div className="display_table">
                                <div className="col-xs-4 left_table_cell">
                                    <section className="profile_infomation">
                                        <div className="button_profile" onClick={this.togglePopupImage.bind(this)}></div>

                                        <div className="image_pro">
                                            <div>
                                                <img className="image"
                                                     src={this.state.photoBase64 ? "data:image/jpeg;base64," + this.state.photoBase64 : ''}
                                                     alt="photo"
                                                />
                                            </div>
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
                                        <div className="since_date">Manaty member
                                            since: {this.state.form.sinceDate}&nbsp;</div>

                                        <div className="infomation">
                                            <span className="mail"></span><span
                                            className="text_profile">{this.state.form.email}&nbsp;</span>
                                            <span className="skype"></span><span
                                            className="text_profile1">{this.state.form.skypeId}&nbsp;</span>
                                            <span className="linkedin"></span>
                                            {this.state.form.linkedin ? (<a target="_blank" href={this.state.form.linkedin}
                                                                            className="text_profile2">{this.state.form.linkedin}&nbsp;</a>) : ''}
                                             <span className="cv"></span>
                                             <span className="btn_cv" onClick={this.generate_CV.bind(this)}>Export CV in PDF</span>
                                             <span className="btn_cv_export" onClick={this.generate_CV_Export.bind(this)}>Export CV in word</span>
                                            <div className="white_infomation"></div>
                                        </div>

                                        <div>
                                            <span onClick={this.togglePopup.bind(this)} className="edit_user"></span>
                                        </div>
                                    </section>
                                </div>

                                {/*<div className="col-md-8">*/}
                                <div className="col-xs-8 right_table_cell">
                                    {/*right_profile article*/}
                                    <table className="table_profile">
                                        <tbody>
                                        <tr>
                                            <td className="bio">
                                                <div>
                                                    <div><span className="text_bio">BIO<span
                                                        onClick={this.togglePopupBio.bind(this)}
                                                        className="edit"></span></span>
                                                    </div>
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
                                                <div>
                                                <span><div><span className="text_skill">SKILLS<span
                                                    onClick={this.togglePopupSkills.bind(this)}
                                                    className="edit_skill"></span></span></div>
                                                <div className="display_skill"><Skills skills={this.state.form.skills}
                                                                                       itemsToShowSkill={this.state.itemsToShowSkill}/></div>
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
                                                <div>
                                                    <div><span className="text_project">MANATY PROJECTS<span
                                                        onClick={this.togglePopupProjects.bind(this)}
                                                        className="edit_pro"></span></span></div>
                                                    <span className="display_project"><Projects
                                                        projects={this.state.form.projects}
                                                        itemsToShow={this.state.itemsToShow}/></span><br/>

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

                                                <span className="text_availability">AVAILABILITY<span
                                                    onClick={this.togglePopupAvailability.bind(this)}
                                                    className="edit_avai"></span></span>

                                                <div className="availability_in"></div>
                                                <div className="hour"><span className="hours_title">Number of working hours a week</span><br/>
                                                    <span
                                                        className="hours_value">{this.state.form.availability.hoursWork} hrs</span>
                                                </div>

                                                <div className="infos"><span className="infos_title">Infos</span><br/>
                                                    <span
                                                        className="infos_value">{this.state.form.availability.infos}</span>
                                                </div>

                                                <div className="time"><span
                                                    className="time_title">Time zone (UTC)</span><br/>
                                                    <span
                                                        className="time_value">{this.state.form.availability.timeZone}</span>
                                                </div>

                                                <div className="vacation"><span
                                                    className="vacation_title">Vacations</span><br/>
                                                    <span className="vacation_value"><Vocations
                                                        vocations={this.state.form.availability.vocations}/></span>
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
                                                    <div className="text_educations">EDUCATION
                                                        <span
                                                            onClick={this.togglePopupEducations.bind(this)}
                                                            className="edit_education">
                                                                </span>
                                                    </div>
                                                    <div className="display_educations">
                                                        <Educations educations={this.state.form.educations}/>
                                                    </div>
                                                </div>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="space">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="courses">
                                                <div>
                                                            <span className="text_courses"> TRAININGS COURSES
                                                                <span onClick={this.togglePopupCourses.bind(this)}
                                                                      className="edit_courses"></span>
                                                            </span>
                                                </div>
                                                <div className="display_courses">
                                                    <Courses courses={this.state.form.courses}/>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="space">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="missions">
                                                <div>
                                                            <span className="text_missions">
                                                                MISSIONS / WORK EXPERIENCES
                                                                <span className="add_mission">
                                                                    <img onClick={this.togglePopupMission.bind(this)}
                                                                         src="images/icon/row.png"
                                                                         alt="row"
                                                                    />
                                                                </span>
                                                            </span>
                                                    <div className="display_mission">
                                                        <Missions
                                                            missions={this.state.form.missions}
                                                            username={this.state.form.username}
                                                            togglePopupMissionEdit={this.togglePopupMissionEdit.bind(this)}
                                                            togglePopupMissionRemove={this.togglePopupMissionRemove.bind(this)}
                                                            showPopupMissionRemove={this.state.showPopupMissionRemove}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    {this.state.showPopup == true || this.state.showPopupBio == true || this.state.showPopupAvailability == true || this.state.showPopupProjects == true || this.state.showPopupSkills == true || this.state.showPopupImage == true || this.state.showPopupEducations == true || this.state.showPopupCourses == true || this.state.showPopupMission == true ?
                                        <div id="page-mask"></div>
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderUserPopup() {
        return (
            <div className='userpopup'>
                {this.state.showPopup ?
                    <UserPopup parent={this} userInfo={this.props.userInfo} baseData={this.props.baseData}
                               countryAll={this.props.countryAll}
                               closePopup={this.togglePopup.bind(this)}/>
                    : null
                }
            </div>
        );
    }

    renderUserPopupBio() {
        return (
            <div className='userpopup'>
                {this.state.showPopupBio ?
                    <UserPopupBio parent={this} userInfo={this.props.userInfo}
                                  closePopupBio={this.togglePopupBio.bind(this)}
                    />
                    : null
                }
            </div>
        );
    }

    renderUserPopupAvailability() {

        return (

            <div className='userpopup'>
                {this.state.showPopupAvailability ?
                    <UserPopupAvailability parent={this} userInfo={this.props.userInfo}
                                           closePopupAvailability={this.togglePopupAvailability.bind(this)}
                    />
                    : null
                }
            </div>

        );
    }

    renderUserPopupSkills() {
        return (

            <div className='userpopup'>
                {this.state.showPopupSkills ?
                    <UserPopupSkills parent={this} userInfo={this.props.userInfo}
                                     closePopupSkills={this.togglePopupSkills.bind(this)}
                    />
                    : null
                }
            </div>
        );
    }

    renderUserPopupProjects() {

        return (

            <div className='userpopup'>
                {this.state.showPopupProjects ?
                    <UserPopupProjects parent={this} userInfo={this.props.userInfo}
                                       projectSee={this.props.projectSee}
                                       projectInfo={this.props.projectInfo}
                                       closePopupProjects={this.togglePopupProjects.bind(this)}
                    />
                    : null
                }
            </div>

        );
    }

    renderUserPopupEducations() {

        return (

            <div className='userpopup'>
                {this.state.showPopupEducations ?
                    <UserPopupEducations parent={this} userInfo={this.props.userInfo}
                                         projectSee={this.props.projectSee}
                                         projectInfo={this.props.projectInfo}
                                         closePopupEducations={this.togglePopupEducations.bind(this)}/>
                    : null
                }
            </div>

        );
    }

    renderUserPopupCourses() {

        return (

            <div className='userpopup'>
                {this.state.showPopupCourses ?
                    <UserPopupCourses parent={this} userInfo={this.props.userInfo}
                                      projectSee={this.props.projectSee}
                                      projectInfo={this.props.projectInfo}
                                      closePopupCourses={this.togglePopupCourses.bind(this)}/>
                    : null
                }
            </div>

        );
    }

    renderUserPopupMissionAdd() {

        return (

            <div className='userpopup'>
                {this.state.showPopupMission ?
                    <UserPopupMission parent={this} userInfo={this.props.userInfo}
                                      projectSee={this.props.projectSee}
                                      projectInfo={this.props.projectInfo}
                                      edit={false}
                                      showPopupMissionEdit={this.state.showPopupMissionEdit}
                                      showPopupMission={this.state.showPopupMission}
                                      closePopupMission={this.togglePopupMission.bind(this)}/>
                    : null
                }
            </div>

        );
    }

    renderUserPopupMissionEdit() {

        return (

            <div className='userpopup'>
                {this.state.showPopupMissionEdit ?
                    <UserPopupMission parent={this} userInfo={this.props.userInfo}
                                      projectSee={this.props.projectSee}
                                      projectInfo={this.props.projectInfo}
                                      edit={true}
                                      showPopupMissionEdit={this.state.showPopupMissionEdit}
                                      showPopupMission={this.state.showPopupMission}
                                      closePopupMissionEdit={this.togglePopupMissionEdit.bind(this)}
                                      mission={this.state.mission}/>
                    : null
                }
            </div>

        );
    }

    renderProjectPopupImage() {
        return (
            <div className='userpopup'>
                {this.state.showPopupImage ?
                    <ProjectPopupImage parent={this}
                                       baseData={this.props.baseData}
                                       userInfo={this.props.userInfo}
                                       projectSee={this.props.projectSee}
                                       projectInfo={this.props.projectInfo}
                                       closePopupImage={this.togglePopupImage.bind(this)}
                                       closePopupImageDelay={this.togglePopupImageDelay.bind(this)}
                    />
                    : null
                }
            </div>
        );
    }

    render() {
        return (
            <div className="container-fluid profile_manaty">
                {this.renderUserProfileInfo()}
                {this.renderUserPopup()}
                {this.renderUserPopupBio()}
                {this.renderUserPopupAvailability()}
                {this.renderUserPopupSkills()}
                {this.renderUserPopupProjects()}
                {this.renderUserPopupEducations()}
                {this.renderUserPopupCourses()}
                {this.renderUserPopupMissionAdd()}
                {this.renderUserPopupMissionEdit()}
                {this.renderProjectPopupImage()}

            </div>
        );
    }
}

export default UserProfileInfo;
