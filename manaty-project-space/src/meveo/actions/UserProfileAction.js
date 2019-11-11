import Action from './Action';
import * as ActionMethods from './ActionMethods';

import UserProfileService from '../services/UserProfileService';
const userProfileService = new UserProfileService();

import LocalStorageService from '../services/LocalStorageService';
import Error from '../model/Error';
import Success from '../model/Success';


export function userDetail(username) {
	const action = new Action(ActionMethods.GET_USER_DETAILS, function(username) {
        userProfileService.get_user_profile(username).then(
			response => {
                getAllUsers();
                const result = new Success(response);
                result.message = "user_profile_detail_success";
                this.success(result);
			},
			error => {
					this.fail(error);
			}
		);
	});
	action.execute(username);
}
export function editProfileUser(userData) {
    const action = new Action(ActionMethods.EDIT_PROFILE_USER, function(userData) {
        userProfileService.edit_user(userData).then(
            response => {
                if(response == null || response.status === "FAIL") {
                    this.fail(response);
                }else {
                    userDetail(userData.username);
                    const result = new Success();
                    result.message = "edit_user_success";
                    this.success(result);
                }
            },
            error => {
                this.fail(error);
            }
            );
        });
        action.execute(userData);
    }

export function editImageUser(userData) {
    const action = new Action(ActionMethods.EDIT_IMAGE_USER, function(userData) {
        userProfileService.edit_image_user(userData).then(
            response => {
                if(response == null || response.status === "FAIL") {
                        this.fail(response);
                }else {
                    userDetail(userData.username);
                    const result = new Success();
                    result.message = "edit_image_success";
                    this.success(result);
                }
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(userData);
}

export function editSkillsUser(userData) {
    const action = new Action(ActionMethods.EDIT_SKILLS_USER, function(userData) {
        userProfileService.edit_skills_user(userData).then(
            response => {
                if(response == null || response.status === "FAIL") {
                    this.fail(response);
                }else {
                    userDetail(userData.username);
                    const result = new Success();
                    result.message = "edit_user_success";
                    this.success(result);
                }

            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(userData);
}

export function editProjectsUser(userData) {
    const action = new Action(ActionMethods.EDIT_PROJECTS_USER, function(userData) {
        userProfileService.edit_projects_user(userData).then(
            response => {
                if(response == null || response.status === "FAIL") {
                    this.fail(response);
                }else {
                    userDetail(userData.username);
                    const result = new Success();
                    result.message = "edit_user_success";
                    this.success(result);
                }
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(userData);
}

export function editAvailabilityUser(userData) {
    const action = new Action(ActionMethods.EDIT_AVAILABILITY_USER, function(userData) {
        userProfileService.edit_availability_user(userData).then(
            response => {
                if(response == null || response.status === "FAIL") {
                    this.fail(response);
                }else {
                    userDetail(userData.username);
                    const result = new Success();
                    result.message = "edit_user_success";
                    this.success(result);
                }
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(userData);
}

export function editBioUser(userData) {
    const action = new Action(ActionMethods.EDIT_BIO_USER, function(userData) {
        userProfileService.edit_bio_user(userData).then(
            response => {
                if(response == null || response.status === "FAIL") {
                    this.fail(response);
                }else {userDetail(userData.username);
                    const result = new Success();
                    result.message = "edit_bio_success";
                    this.success(result);}

            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(userData);
}

export function downloadImage(photo) {
    const action = new Action(ActionMethods.DOWNLOAD_IMAGE_FILE, function(photo) {
        userProfileService.download_image_file(photo).then(
            response => {
                const { actionStatus } = response;
                const { user } = response || {};
                if (actionStatus == null || actionStatus.status === "FAIL") {
                    this.fail(actionStatus);
                }else {
                    const result = new Success(user);
                    result.message = "user_detail_success";
                    this.success(result);
                }
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(photo);
}

export function uploadImage(formData,username) {
    const action = new Action(ActionMethods.UPLOAD_IMAGE_FILE, function(formData) {
        userProfileService.upload_image_file(formData).then(
            response => {
                const { status } = response;
                console.log('Log Manaty',status);
                if (status == null || status === "FAIL") {
                    this.fail(status);
                }else {
                    const result = new Success();
                    result.message = "upload_image_success";
                    this.success(result);
                }
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(formData);
}

export function downloadCV(username) {
    const action = new Action(ActionMethods.DOWNLOAD_CV_FILE, function(username) {
        userProfileService.download_CV_file(username).then(
            response => {
                const { actionStatus } = response;
                const { user } = response || {};
                if (actionStatus == null || actionStatus.status === "FAIL") {
                    this.fail(actionStatus);
                }else {
                    const result = new Success(user);
                    result.message = "user_detail_success";
                    this.success(result);
                }
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(username);
}

export function uploadCV(formData,username) {
    const action = new Action(ActionMethods.UPLOAD_CV_FILE, function(formData) {
        userProfileService.upload_CV_file(formData).then(
            response => {
                const { status } = response;
                console.log('Log Manaty',status);
                if (status == null || status === "FAIL") {
                    this.fail(status);
                }else {
                    const result = new Success();
                    result.message = "upload_cv_success";
                    this.success(result);
                }
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(formData);
}

export function getAllUsers() {
    const action = new Action(ActionMethods.GET_ALL_USERS, function() {
        userProfileService.get_all_users().then(
            response => {
                const result = new Success(response.users);
                result.message = "users_detail_success";
                this.success(result);
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute();
}

export function getAllProject() {
    const action = new Action(ActionMethods.GET_ALL_PROJECT, function() {
        userProfileService.get_all_project().then(
            response => {
                const result = new Success(response.projectUsers);
                result.message = "projects_detail_success";
                this.success(result);
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute();
}

export function projectDetail(projectName) {
    const action = new Action(ActionMethods.GET_PROJECT_DETAILS, function(projectName) {
        userProfileService.get_project_detail(projectName).then(
            response => {
                const result = new Success(response);
                result.message = "project_detail_success";
                this.success(result);
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(projectName);
}

export function editClientProject(userData) {
    const action = new Action(ActionMethods.EDIT_CLIENT_PROJECT, function(userData) {
        userProfileService.edit_client_project(userData).then(
            response => {
                if(response == null || response.status === "FAIL") {
                    this.fail(response);
                }else {
                    projectDetail(userData.code);
                    getAllProject();
                    const result = new Success();
                    result.message = "edit_project_success";
                    this.success(result);
                }
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(userData);
}

export function editAssemblaProject(userData) {
    const action = new Action(ActionMethods.EDIT_ASSEMBLA_PROJECT, function(userData) {
        userProfileService.edit_assembla_project(userData).then(
            response => {
                if(response == null || response.status === "FAIL") {
                    this.fail(response);
                }else {
                    projectDetail(userData.code);
                    const result = new Success();
                    result.message = "edit_project_success";
                    this.success(result);
                }
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(userData);
}

export function uploadImageProject(formData,username) {
    const action = new Action(ActionMethods.UPLOAD_IMAGE_PROJECT_FILE, function(formData) {
        userProfileService.upload_image_project(formData).then(
            response => {
                const { status } = response;
                console.log('Log Manaty',status);
                if (status == null || status === "FAIL") {
                    this.fail(status);
                }else {
                    const result = new Success();
                    result.message = "upload_project_success";
                    this.success(result);
                }
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(formData);
}

export function editTeamsProject(userData) {
    const action = new Action(ActionMethods.EDIT_TEAMS_PROJECT, function(userData) {
        userProfileService.edit_teams_project(userData).then(
            response => {
                if(response == null || response.status === "FAIL") {
                    this.fail(response);
                }else {
                    projectDetail(userData.code);
                    getAllProject();
                    const result = new Success();
                    result.message = "edit_teams_project_success";
                    this.success(result);
                }
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(userData);
}

export function addProjectForUser(userData) {
    const action = new Action(ActionMethods.ADD_PROJECT_FOR_USER, function(userData) {
        userProfileService.add_project_foruser(userData).then(
            response => {
                if(response == null || response.status === "FAIL") {
                    this.fail(response);
                }else {
                    const result = new Success();
                    result.message = "add_project_foruser_success";
                    this.success(result);
                }
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(userData);
}

export function editPassword(userData) {
    const action = new Action(ActionMethods.EDIT_PASSWORD, function(userData) {
        userProfileService.edit_password(userData).then(
            response => {
                if(response == null || response.status === "FAIL") {
                    this.fail(response);
                }else {
                    const result = new Success();
                    result.message = "edit_password_success";
                    this.success(result);
                }
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(userData);
}

export function editEducationsUser(userData) {
    const action = new Action(ActionMethods.EDIT_EDUCATIONS_USER, function(userData) {
        userProfileService.edit_educations_user(userData).then(
            response => {
                if(response == null || response.status === "FAIL") {
                    this.fail(response);
                }else {
                    userDetail(userData.username);
                    const result = new Success();
                    result.message = "edit_user_success";
                    this.success(result);
                }
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(userData);
}

export function editCoursesUser(userData) {
    const action = new Action(ActionMethods.EDIT_COURSES_USER, function(userData) {
        userProfileService.edit_courses_user(userData).then(
            response => {
                if(response == null || response.status === "FAIL") {
                    this.fail(response);
                }else {
                    userDetail(userData.username);
                    const result = new Success();
                    result.message = "edit_user_success";
                    this.success(result);
                }
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(userData);
}

export function editMissionUser(userData) {
    const action = new Action(ActionMethods.EDIT_MISSION_USER, function(userData) {
        userProfileService.edit_mission_user(userData).then(
            response => {
                if(response == null || response.status === "FAIL") {
                    this.fail(response);
                }else {
                    userDetail(userData.username);
                    const result = new Success();
                    result.message = "edit_user_success";
                    this.success(result);
                }
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(userData);
}

export function removeMission(userData) {
    const action = new Action(ActionMethods.REMOVE_MISSION, function(userData) {
        userProfileService.remove_Mission(userData).then(
            response => {
                if(response == null || response.status === "FAIL") {
                    this.fail(response);
                }else {
                    userDetail(userData.username);
                    const result = new Success();
                    result.message = "edit_user_success";
                    this.success(result);
                }
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(userData);
}

export function generateCV(username) {
    const action = new Action(ActionMethods.GENERATE_CV, function(username) {
        userProfileService.generate_CV(username).then(
            response => {
            const result = new Success(response);
            result.message = "generate_CV_success";
            this.success(result);
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(username);
}

export function generateCVExport(username) {
    const action = new Action(ActionMethods.GENERATE_CV_EXPORT, function(username) {
        userProfileService.generate_CV_Export(username).then(
            response => {
                const result = new Success(response);
                result.message = "generate_CV_Export_success";
                this.success(result);
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(username);
}

export function projectSpace(projectCode) {
    const action = new Action(ActionMethods.GET_PROJECT_SPACE, function(projectCode) {
        userProfileService.get_project_space(projectCode).then(
            response => {
                const result = new Success(response);
                result.message = "project_space_success";
                this.success(result);
            },
            error => {
                this.fail(error);
            }
        );
    });
    action.execute(projectCode);
}