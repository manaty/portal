import BaseService from './BaseService';
import User from '../model/User';
import Project from '../model/Project';
import Password from '../model/Password';


export default class UserProfileService extends BaseService {

    edit_password(userData) {
        userData.mode = "edit";
        let entity = new Password(userData);
        return new Promise((resolve, reject) => {
            super.editPassword(entity, (code, response) => {
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
