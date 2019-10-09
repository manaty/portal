import React, {Component} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import {userDetail} from '../../actions/UserProfileAction';
import SeeProfile from './SeeProfile.jsx';
import UserStore from '../../stores/UserStore';

class Projects extends React.Component {

    render() {

        var teamProject = [];
        if (this.props.projects && this.props.projects.length !== 0) {
            this.props.projects.map((el) => {
                teamProject.push(el.name);
            });
        }
        var displayProject = this.props.listProject.filter(function (val) {
            return teamProject.indexOf(val.project) != -1;
        });
        return (
            <div className="projects_on_team">
                <div>
                    {displayProject.slice(0, 3).map((el, index) => (
                        <span key={index} className="pro_team">
                        <span>{el.project}</span>
                    </span>
                    ))}
                </div>
            </div>
        )
    }
}

class Skills extends React.Component {

    render() {
        return (
            <div>
                <div className="skills_te_on">
                    {this.props.skills.slice(0, 3).map((el, index) => (
                        <span key={index} className="skill_team_on">
                            {el.name}
                        </span>
                    ))}
                </div>

                <div className="skills_te">
                    {this.props.skills.slice(3, 5).map((el, index) => (
                        <span key={index} className="skill_team">
                            {el.name}
                        </span>
                    ))}
                </div>
            </div>
        )
    }
}

class SkillDetail extends React.Component {
    render() {
        // var fullName=this.props.firstName + this.props.lastName;
        var countryDisplay = this.props.country;
        if (countryDisplay != null) {
            var CountryName = this.props.getCountryByCode(countryDisplay);
        }

        var photo64 = this.props.photoBase64;
        if (photo64 != null) {
            var photoDisplay = photo64;
        } else {
            var photoDisplay = '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';
        }

        return (
            <div className="order-detail">
                <div className="div1_team">

                    <div className="image_team"><img src={"data:image/jpeg;base64," + photoDisplay}/></div>
                    <div className="out_team">
                        <div className="all_info">
                            <div className="name_te">
                                <span className="squa">[</span>
                                {this.props.name}&nbsp;
                                <span className="squa">]</span>
                            </div>
                            <div className="job_te">{this.props.job}&nbsp;</div>
                            <div className="country_te">{CountryName}&nbsp;</div>
                        </div>
                    </div>

                </div>

                <div className="since_team">
                    <div className="since_in">Manaty member since:{this.props.sinceDate}&nbsp;</div>
                </div>

                <div className="div2_team">
                    <div className="email_in">
                        <div className="name_mail">{this.props.email || ""}&nbsp;
                            <div className="mail_team"></div>
                        </div>
                        <div className="name_skype">{this.props.skypeId || ""}&nbsp;
                            <div className="skype_team"></div>
                        </div>
                    </div>

                </div>

                <div className="div3_team">
                    <div className="skill_in">
                        <div>
                            <span className="star_one"><i className="fa fa-star"></i></span>
                            <span className="top_skills">TOP 5 SKILLS</span>
                            <span className="star_two"><i className="fa fa-star"></i></span>
                        </div>
                        <Skills skills={this.props.skills}/>

                        <div className="sub_te">LAST MANATY PROJECTS:</div>

                        <Projects projects={this.props.projects} listProject={this.props.listProject}/>

                    </div>
                </div>

                <div className="div4_team">
                    <div className="btn_team" onClick={() => this.props.viewProfile(this.props.username)}>See profile
                    </div>
                </div>

            </div>
        );
    }
}

class UserTeamInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showFrozen: false,
            amount: 0,
            users: [],
            email: "",
            map: null,
            countryDisplay: "",
            toLowerCase: "",
            render: false,
            allUsers: [],
            fieldSearch: '',
            class1: 'list',
            class2: 'vig1',
            tabDisplay: true,
            country: {},
            countryChange: "",
            jobChange: "",
            skillsChange: "",
        };

        this.getCountryByCode = this.getCountryByCode.bind(this);
        this.viewProfile = this.viewProfile.bind(this);
        // this.backAllProfiles = this.backAllProfiles.bind(this);
    }

    componentWillMount() {
        UserStore.bindUpdateHandler(this.userDetailOnUpdate.bind(this));

        /********Search********/
        var allUser = this.props.users;
        this.setState({
            allUser,
            userSearch: allUser
        })

    }

    componentWillUnMount() {
        UserStore.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
    }

    componentDidMount() {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    componentWillReceiveProps() {
    }

    userDetailOnUpdate(response) {
        console.log("user On Update");
        console.log(response);
        const {result, message} = response
        if (message == "user_detail_success" || message == "user_profile_detail_success") {
            this.setState({
                userInfo: result
            });
        }
        this.state;
    }

    viewProfile(username) {
        userDetail(username);
    }

    getCountryByCode(code) {
        if (code && this.props.countryAll) {
            const all_countries = this.props.countryAll;
            var _country = all_countries.filter(function (c) {
                return c.value.toLowerCase() == code.toLowerCase();
            });
            return _country[0].label;
        }
        return '';
    }

    renderSkills(object) {
        if (object) {
            var skill = object.slice(0, 5).map(function (val) {
                return (<div>{val.name}</div>);
            });
            return skill;
        }
    }

    renderProject(projectUser) {
        var allProject = this.props.projectInfo;
        var listProject = [];
        allProject.map((el) => {
            var singleObj = {};
            singleObj["project"] = el.code;
            singleObj["dateEnd"] = el.dateEnd;
            listProject.push(singleObj);
        });
        listProject.sort(function (a, b) {
            var x = a.dateEnd;
            var y = b.dateEnd;
            if (x < y) {
                return 1;
            }
            if (x > y) {
                return -1;
            }
            return 0;
        });

        var teamProject = [];
        (projectUser || []).map((el) => {
            teamProject.push(el.name);
        });

        var listProjectUser = listProject.filter(function (val) {
            return teamProject.indexOf(val.project) != -1;
        });

        if (listProjectUser) {
            var displayProject = listProjectUser.slice(0, 5).map(function (val) {
                return (<div>{val.project}</div>);
            });
            return displayProject;
        }
    }

    renderViewProfile() {
        return (
            <div>
                <SeeProfile parent={this} backAllProfiles={this.props.backAllProfiles}
                                                userInfo={this.state.userInfo} {...this.state}
                                                baseData={this.props.baseData} {...this.props} countryAll={this.props.countryAll}/>
            </div>
        );
    }

    searchSkills(event) {
        const allUsers = this.props.users;
        if (allUsers != null) {
            let searchInput = event.target.value,
                displayedContacts = allUsers.filter(el => {
                    return el.skills.some(e => {
                        let searchValue = e.name != null ? e.name.toLowerCase() : "";
                        let searchValueCountry =
                            el.country != null ? this.getCountryByCode(el.country).toLowerCase() : '';
                        let searchValueJob = el.job != null ? el.job.toLowerCase() : "";

                        return (
                            searchValue.indexOf(searchInput.toLowerCase()) !== -1 &&
                            searchValueCountry.indexOf(this.state.countryChange.toLowerCase()) !== -1 &&
                            searchValueJob.indexOf(this.state.jobChange.toLowerCase()) !== -1
                        );
                    });
                });
            this.setState({
                skillsChange: searchInput
            });
            this.setState({
                userSearch: displayedContacts
            })
        }
    }

    searchJob(event) {
        const allUsers = this.props.users;
        if (allUsers != null) {
            let searchInput = event.target.value,
                displayedContacts = allUsers.filter(el => {
                    let searchValue = el.job != null ? el.job.toLowerCase() : "";
                    let searchValueCountry =
                        el.country != null ? this.getCountryByCode(el.country).toLowerCase() : '';

                    return (
                        searchValue.indexOf(searchInput.toLowerCase()) !== -1 &&
                        searchValueCountry.indexOf(this.state.countryChange.toLowerCase()) !== -1 &&
                        el.skills.some(e => {
                            let searchValue = e.name != null ? e.name.toLowerCase() : "";
                            return (
                                searchValue.indexOf(this.state.skillsChange.toLowerCase()) !==
                                -1
                            );
                        })
                    );
                });
            this.setState({
                jobChange: searchInput
            });
            this.setState({
                userSearch: displayedContacts
            })
        }
    }

    searchCountry(event) {
        const allUsers = this.props.users;
        if (allUsers != null) {
            let searchInput = event.target.value,
                displayedContacts = allUsers.filter(el => {
                    let searchValueJob = el.job != null ? el.job.toLowerCase() : "";

                    let searchValue = el.country != null ? this.getCountryByCode(el.country).toLowerCase() : '';

                    return (

                        searchValue.indexOf(searchInput.toLowerCase()) !== -1 &&
                        searchValueJob.indexOf(this.state.jobChange.toLowerCase()) !== -1 &&
                        el.skills.some(e => {
                            let searchValue = e.name != null ? e.name.toLowerCase() : "";
                            return (
                                searchValue.indexOf(this.state.skillsChange.toLowerCase()) !==
                                -1
                            );
                        })
                    );
                });
            this.setState({
                countryChange: searchInput
            });
            this.setState({
                userSearch: displayedContacts
            });
        }
    }

    searchAll(event) {
        const allUsers = this.props.users;
        if (allUsers != null) {
            let searchInput = event.target.value,
                displayedContacts = allUsers.filter(el => {
                    let searchValueName = el.name != null ? el.name.toLowerCase() : "";

                    let searchValueEmail = el.email != null ? el.email.toLowerCase() : "";

                    let searchValueSkype = el.skypeId != null ? el.skypeId.toLowerCase() : "";

                    let searchValueSinceDate = el.sinceDate != null ? el.sinceDate.toLowerCase() : "";

                    let searchValueJob = el.job != null ? el.job.toLowerCase() : "";

                    let searchValueCountry = el.country != null ? this.getCountryByCode(el.country).toLowerCase() : '';

                    return (
                        searchValueName.indexOf(searchInput.toLowerCase()) !== -1 ||

                        searchValueEmail.indexOf(searchInput.toLowerCase()) !== -1 ||

                        searchValueSkype.indexOf(searchInput.toLowerCase()) !== -1 ||

                        searchValueSinceDate.indexOf(searchInput.toLowerCase()) !== -1 ||

                        searchValueJob.indexOf(searchInput.toLowerCase()) !== -1 ||

                        searchValueCountry.indexOf(searchInput.toLowerCase()) !== -1 ||
                        el.skills.some(e => {
                            let searchValueSkills = e.name != null ? e.name.toLowerCase() : "";
                            return (
                                searchValueSkills.indexOf(searchInput.toLowerCase()) !==
                                -1
                            );
                        }) ||

                        (el.projects || []).some(e => {
                            let searchValueProjects = e.name != null ? e.name.toLowerCase() : "";
                            return (
                                searchValueProjects.indexOf(searchInput.toLowerCase()) !==
                                -1
                            );
                        })
                    );
                });
            this.setState({
                userSearch: displayedContacts
            });
        }
    }

    onChange(event) {
        this.setState({fieldSearch: event.target.value});
    }

    changeCountry(name, e) {
        var state = this.state;
        state ['country'][name] = e.target.value;
        this.setState(state);
    }

    renderTeamVig() {
        var allUser = this.props.users;
        var allProject = this.props.projectInfo ? this.props.projectInfo : [];
        var listProject = [];
        if (allProject != null) {
            allProject.map((el) => {
                var singleObj = {};
                singleObj["project"] = el.code;
                singleObj["dateEnd"] = el.dateEnd;
                listProject.push(singleObj);
            });
        }

        listProject.sort(function (a, b) {
            var x = a.dateEnd;
            var y = b.dateEnd;
            if (x < y) {
                return 1;
            }
            if (x > y) {
                return -1;
            }
            return 0;
        });
        if (this.props.users) {
            var allUserSearch = this.state.userSearch ? this.state.userSearch : this.props.users;
            var detailTags = allUserSearch.map((e, index) => (

                < SkillDetail key={index}
                    listProject={listProject}
                    photoBase64={e.photoBase64}
                    firstName={e.firstName}
                    lastName={e.lastName}
                    name={e.name}
                    username={e.username}
                    country={e.country}
                    job={e.job}
                    viewProfile={this.viewProfile}
                    view_log={this.view_log}
                    getCountryByCode={this.getCountryByCode}
                    sinceDate={e.sinceDate}
                    email={e.email || ""}
                    skypeId={e.skypeId || ""}
                    skills={e.skills}
                    projects={e.projects}/>
            ));
        }

        return (
            <div className="order" id="hidingScrollBar">
                <div class="hideScrollBar">
                    {detailTags}
                </div>
                <div className="clear"/>
            </div>
        );
    }

    renderTeamList() {
        if (this.props.users) {
            var allUserSearch = this.state.userSearch ? this.state.userSearch : this.props.users;
        }
        const columns = [{
            Header: <span>Name <i className='wd-sort-icon'/></span>,
            accessor: 'name'
        }, {
            Header: <span>Job <i className='wd-sort-icon'/></span>,
            accessor: 'job'
        }, {
            Header: <span>Country <i className='wd-sort-icon'/></span>,
            accessor: 'country',
            Cell: props => (
                this.getCountryByCode(props.row.country)
            )
        }, {
            Header: <span>Member since <i className='wd-sort-icon'/></span>,
            accessor: 'sinceDate'
        }, {
            Header: <span>Mail <i className='wd-sort-icon'/></span>,
            accessor: 'email'
        }, {
            Header: <span>Skype <i className='wd-sort-icon'/></span>,
            accessor: 'skypeId'

        }, {
            Header: <span>Top 5 Skills <i className='wd-sort-icon'/></span>,
            accessor: 'skills',
            Cell: props => (
                this.renderSkills(props.row.skills)
            )
        }, {
            Header: <span>Last Manaty projects<i className='wd-sort-icon'/></span>,
            accessor: 'projects',
            Cell: props => (
                this.renderProject(props.row.projects)
            )
        }, {
            Header: <span>See full profile</span>,
            accessor: 'username',
            Cell: props => (
                <button
                    style={{
                        backgroundColor: '#1d9c9c',
                        color: 'white',
                    }}
                    onClick={() => this.viewProfile(props.row.username)}
                >See profile</button>
            )
        }];

        return (
            <div className="order">
                <div class="hideScrollBar">
                    <div className="team-react-table">
                        <ReactTable
                            className='react-table -striped -highlight'
                            data={allUserSearch}
                            columns={columns}
                            key={1}
                            showPagination={false}
                            showPageSizeOptions={true}
                            pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                            defaultPageSize={20}
                            showPageJump={true}
                            sortable={true}
                            resizable={true}
                            minRows={3}
                            defaultSorted={[{
                                id: 'username',
                                desc: true
                            }]}
                            defaultFilterMethod={
                                (filter, row) => (
                                    row[filter.id] !== null ? String(row[filter.id].toString().toLowerCase()).indexOf(filter.value.toString().toLowerCase()) != -1 : false
                                )
                            }
                            style={{
                                height: "100%" // This will force the table body to overflow and scroll, since there is not enough room
                            }}
                        />
                    </div>
                </div>
                <div className="clear"/>
            </div>
        );
    }

    tabChanged(event) {
        event.preventDefault();
        var state = this.state;
        state['showFrozen'] = false
        this.setState(state);
    }

    handleClick1() {
        if (this.state.class1 === 'list' && this.state.class2 === 'vig1' && this.state.tabDisplay === true) {
            this.setState({
                class1: 'list1',
                class2: 'vig',
                tabDisplay: false
            });
        }
    }

    handleClick2() {
        if (this.state.class1 === 'list1' && this.state.class2 === 'vig' && this.state.tabDisplay === false) {
            this.setState({
                class1: 'list',
                class2: 'vig1',
                tabDisplay: true
            });
        }
    }

    //Reset button filter
    resetFilter() {
        this.setState({
            userSearch: this.props.users,
            countryChange: '',
            jobChange: '',
            skillsChange: ''
        });
    }

    renderTeam() {
        var {all_countries} = this.props.baseData;
        var allUser = this.props.users;
        var uniqueCountry;
        var uniqueCountrySelect = [];

        if (allUser) {
            uniqueCountry = [...new Set(allUser.map(item => item.country))];
        }

        if (uniqueCountry != null) {
            uniqueCountrySelect = uniqueCountry.filter(el => {
                return el != "" && el != null && el != "UK";
            });
        }

        uniqueCountrySelect.sort();

        var uniqueJob = allUser ? [...new Set(allUser.map(item => item.job))] : [];
        var uniqueJobSelect = uniqueJob.filter(el => {
            return el != "" && el != null;
        });

        uniqueJobSelect.sort();

        var uniqueSkills = [];
        if (allUser) {
            var allSkills = allUser.map(item => item.skills.map(item => uniqueSkills.push(item.name)));
        }
        var uniqueSkillsAll = [...new Set(uniqueSkills)];
        var uniqueSkillsSelect = uniqueSkillsAll.filter(el => {
            return el != "" && el != null;
        });
        uniqueSkillsSelect.sort();

        return (
            <div className="row">
                <div className="col-xs-12 boder_header" style={{marginLeft: "17px"}}>
                    <div className="name_header"><span><label>TEAM</label></span> > All members</div>
                </div>
                <div className="col-xs-12 filter_team">
                    <span className={this.state.class1} onClick={this.handleClick1.bind(this)}></span>
                    <span className={this.state.class2} onClick={this.handleClick2.bind(this)}></span>
                    <form>
                        <span className="filter_by">Filter by :</span>
                        <select className="select_country" onChange={this.searchCountry.bind(this)}>
                            <option value="" className="op_country">Country</option>
                            <option  value="">All</option>
                            {
                                uniqueCountrySelect != null ?
                                    uniqueCountrySelect.map((el) => {
                                        return <option key= {el}
                                            value={this.getCountryByCode(el)}>{this.getCountryByCode(el)}</option>;
                                    })
                                    : null
                            }
                        </select>
                        <select className="select_skill" onChange={this.searchSkills.bind(this)}>
                            <option value="" className="op_country">Skills</option>
                            <option  value="">All</option>
                            {
                                uniqueSkillsSelect != null ?
                                    uniqueSkillsSelect.map((el) => {
                                        return <option key={el} value={el}>{el}</option>;
                                    })
                                    : null
                            }
                        </select>

                        <select className="select_job" onChange={this.searchJob.bind(this)}>
                            <option value="" className="op_country">Job</option>
                            <option  value="">All</option>
                            {
                                uniqueJobSelect != null ?
                                    uniqueJobSelect.map((el) => {
                                        return <option key={el} value={el}>{el}</option>;
                                    })
                                    : null
                            }
                        </select>
                        <button className="cancel_filter" onClick={this.resetFilter.bind(this)} type="reset">Cancel all
                            filters
                        </button>
                        <span className="relative_te"><input type='string' className="input_team" placeholder="Search"
                                                             onChange={this.searchAll.bind(this)}/><span
                            className="search_icon"></span></span>
                    </form>
                </div>
                <div className="col-xs-12 team_page">
                    {
                        this.state.tabDisplay == true ? this.renderTeamVig() : this.renderTeamList()
                    }
                </div>

            </div>
        )
    }

    render() {
        return (
            <div className="container-fluid team_manaty">
                {
                    this.props.userInfo == null ? this.renderTeam() : this.renderViewProfile()
                }
            </div>
        );
    }
}

export default UserTeamInfo;