import Action from './Action';
import * as ActionMethods from './ActionMethods';

import UserProfileService from '../services/UserProfileService';
const userProfileService = new UserProfileService();

import LocalStorageService from '../services/LocalStorageService';
import Error from '../model/Error';
import Success from '../model/Success';


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

