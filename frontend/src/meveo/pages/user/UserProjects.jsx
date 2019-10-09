import React, {Component} from 'react';

import 'react-responsive-tabs/styles.css';
import UserProjectInfo from './UserProjectInfo.jsx';

import DataStore from '../../stores/DataStore';
import UserStore from '../../stores/UserStore';
import AllStore from '../../stores/AllStore';
import AllProjectStore from '../../stores/AllProjectStore';
import ProjectStore from '../../stores/ProjectStore';
import countryList from 'react-select-country-list'
import {getAllUsers,getAllProject} from '../../actions/UserProfileAction';

class UserProjects extends Component {

	constructor() {
			super();
        	this.options = countryList().getData();
			this.state = {
                options: this.options,
				isLoading : false,
				dataLoading : false,
				baseData:{
					user_countries: null,
					all_countries: null,
				},
				error : null,
                statusUser:'',
                userInfo: null,
			}
        this.backAllProfiles = this.backAllProfiles.bind(this);
        this.backAllProjects = this.backAllProjects.bind(this);
	}

	componentWillMount() {
		DataStore.bindLoadHandler(this.renderDataLoader.bind(this));
		DataStore.bindUpdateHandler(this.dataOnUpdate.bind(this));
		DataStore.bindErrorHandler(this.renderError.bind(this));
        AllStore.bindUpdateHandler(this.allUserDetails.bind(this));
        UserStore.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
        AllProjectStore.bindUpdateHandler(this.projectDetailOnUpdate.bind(this));
        ProjectStore.bindUpdateHandler(this.projectSeeDetailOnUpdate.bind(this));
	}

	componentWillUnmount() {
		DataStore.unbindLoadHandler(this.renderDataLoader.bind(this));
		DataStore.unbindUpdateHandler(this.dataOnUpdate.bind(this));
		DataStore.unbindErrorHandler(this.renderError.bind(this));
        AllStore.bindUpdateHandler(this.allUserDetails.bind(this));
        UserStore.bindUpdateHandler(this.userDetailOnUpdate.bind(this));
        AllProjectStore.bindUpdateHandler(this.projectDetailOnUpdate.bind(this));
        ProjectStore.unbindUpdateHandler(this.projectSeeDetailOnUpdate.bind(this));
	}

	componentDidMount(){
        //getCountries(false);
        getAllUsers();
        getAllProject();
	}

    shouldComponentUpdate() {
        this.state.message == 'upload_image_success';
        return true;
    }

    allUserDetails(response) {
        console.log("user On Update");
        console.log(response);
        const {result, message} = response
        if( message == "users_detail_success") {
            this.setState({
                users: result
            });
        }
        this.state;
    }

    userDetailOnUpdate(response) {
        console.log("userProfile On Update");
        console.log(response);
        const {result, message} = response
        if(message == "user_detail_success" || message == "user_profile_detail_success") {
            this.setState({
                userInfo: result,
				message:message,
            });
        }
        this.state;
    }

    projectDetailOnUpdate(response) {
        console.log("Project On Update");
        console.log(response);
        var {result, message} = response
        if( message == "projects_detail_success") {
            this.setState({
                projectInfo: result
            });
        }
        this.state;
    }

    projectSeeDetailOnUpdate(response) {
        console.log("See Project On Update");
        console.log(response);
        const {result, message} = response
        if( message == "project_detail_success") {
            this.setState({
                projectSee: result
            });
        }
        this.state;
    }

	// LOADERS
	renderLoader() {
		this.setState({
				isLoading: true,
				error: null
		});
	}

	renderDataLoader() {
		this.setState({
            dataLoading: true,
            error: null
		});
	}

	// ERROR
	renderError(error) {
		this.setState({
            isLoading: false,
            dataLoading: false,
            error: error
		});
	}

    // ON UPDATE
	dataOnUpdate(response) {
		var {result} = response

		if( response.message == "user_countries_list_success") {
			var countries_list = [];
			if (response.result != null) {
				response.result.map(function (val) {
						countries_list.push ({ value: val.countryCode, label: val.countryName });
				});
			}
			var state = this.state;
			state['baseData']['user_countries'] = countries_list;
			state['dataLoading'] = false;
			this.setState(state);
		}

		if( response.message == "all_countries_list_success") {
			var countries_list = [];
			if (response.result != null) {
				response.result.map(function (val) {
						countries_list.push ({ value: val.countryCode, label: val.countryName });
				});
			}

			// Sort countries list
				countries_list.sort(function(a, b) {
					if (a.label == null) {
						return -1;
					}
					if (b.label == null) {
						return 1;
					}
					var descA = a.label.toUpperCase();
					var descB = b.label.toUpperCase();
					if (descA < descB) {
						return -1;
					}
					if (descA > descB) {
						return 1;
					}
					return 0;
				});

			var state = this.state;
			state['baseData']['all_countries'] = countries_list;
			state['dataLoading'] = false;
			this.setState(state);
		}
	}

	backAllProfiles() {
		this.setState((props) => {
			return {
				userInfo: null
			};
		});
	}

    backAllProjects() {
        this.setState((props) => {
            return {
                projectSee: null
            };
        });
    }

    renderProjectsMain(){
        return(
			<UserProjectInfo parent={this} users={this.state.users} userInfo={this.state.userInfo} {...this.state} baseData={this.state.baseData} backAllProjects={this.backAllProjects} projectInfo={this.state.projectInfo} countryAll={this.state.options}/>
        )
    }

	render() {
		return (
            <div>
                {this.renderProjectsMain()}
            </div>
		);
	}
}

module.exports = UserProjects;
