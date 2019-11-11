import BaseService from './BaseService';
import User from '../model/User';
import Project from '../model/Project';
import Password from '../model/Password';


export default class UserProfileService extends BaseService {

	get_user_profile(username) {
		return new Promise((resolve, reject) => {
			super.getUserDetailsByUserName(username, (code, response) => {
				(code == 'success') ? resolve(response) : reject(response);
			});
		});
	}

    edit_user(userData) {
        userData.mode = "edit";
        let entity = new User(userData);
        return new Promise((resolve, reject) => {
            super.editUser(entity, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }

    edit_image_user(userData) {
        userData.mode = "edit";
        let entity = new User(userData);
        return new Promise((resolve, reject) => {
            super.editImageUser(entity, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }

    edit_skills_user(userData) {
        userData.mode = "edit";
        let entity = new User(userData);
        return new Promise((resolve, reject) => {
            super.editSkillsUser(entity, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }

    edit_projects_user(userData) {
        userData.mode = "edit";
        let entity = new User(userData);
        return new Promise((resolve, reject) => {
            super.editProjectsUser(entity, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }

    edit_availability_user(userData) {
        userData.mode = "edit";
        let entity = new User(userData);
        return new Promise((resolve, reject) => {
            super.editAvailabilityUser(entity, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }


    edit_bio_user(userData) {
        userData.mode = "edit";
        let entity = new User(userData);
        return new Promise((resolve, reject) => {
            super.editBioUser(entity, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }

    download_image_file(username) {
        return new Promise((resolve, reject) => {
            super.downloadImageFile(username, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }

    upload_image_file(username) {
        return new Promise((resolve, reject) => {
            super.uploadImageFile(username, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }

    download_CV_file(username) {
        return new Promise((resolve, reject) => {
            super.downloadCVFile(username, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }



    upload_CV_file(username) {
        return new Promise((resolve, reject) => {
            super.uploadCVFile(username, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }



    get_all_users() {
        return new Promise((resolve, reject) => {
            super.getAllUsers((code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }

    get_all_project() {
        return new Promise((resolve, reject) => {
            super.getAllProject((code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }

    get_project_detail(projectName) {
        return new Promise((resolve, reject) => {
            super.getProjectDetailsByCode(projectName, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }

    edit_client_project(userData) {
        userData.mode = "edit";
        let entity = new Project(userData);
        return new Promise((resolve, reject) => {
            super.editClientProject(entity, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }

    edit_assembla_project(userData) {
        userData.mode = "edit";
        let entity = new Project(userData);
        return new Promise((resolve, reject) => {
            super.editAssemblaProject(entity, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }

    upload_image_project(username) {
        return new Promise((resolve, reject) => {
            super.uploadImageProject(username, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }

    edit_teams_project(userData) {
        userData.mode = "edit";
        let entity = new Project(userData);
        return new Promise((resolve, reject) => {
            super.editTeamProject(entity, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }

    add_project_foruser(userData) {
        userData.mode = "edit";
        let entity = new Project(userData);
        return new Promise((resolve, reject) => {
            super.addProjectForUser(entity, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }

    edit_password(userData) {
        userData.mode = "edit";
        let entity = new Password(userData);
        return new Promise((resolve, reject) => {
            super.editPassword(entity, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }

    edit_educations_user(userData) {
        userData.mode = "edit";
        let entity = new User(userData);
        return new Promise((resolve, reject) => {
            super.editEducationsUser(entity, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }

    edit_courses_user(userData) {
        userData.mode = "edit";
        let entity = new User(userData);
        return new Promise((resolve, reject) => {
            super.editCoursesUser(entity, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }

    edit_mission_user(userData) {
        userData.mode = "edit";
        let entity = new User(userData);
        return new Promise((resolve, reject) => {
            super.editMissionUser(entity, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }


    remove_Mission(userData) {
        userData.mode = "remove";
        let entity = new User(userData);
        return new Promise((resolve, reject) => {
            super.removeMission(entity, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }

    generate_CV(username) {
        return new Promise((resolve, reject) => {
            super.generateCV(username, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }

    generate_CV_Export(username) {
        return new Promise((resolve, reject) => {
            super.generateCVExport(username, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }

    get_project_space(projectCode) {
        return new Promise((resolve, reject) => {
            super.getProjectSpaceByCode(projectCode, (code, response) => {
                (code == 'success') ? resolve(response) : reject(response);
            });
        });
    }
}
