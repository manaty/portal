import MeveoAPI from '../MeveoAPI';
import LocalStorageService from './LocalStorageService';
import * as properties from '../../properties';

export default class BaseService {
	constructor(provider) {
		this.provider = provider || properties.provider;
		this.useMockup = false;
	}

	get meveoAPI() {
		return new MeveoAPI(properties.keycloak_path,properties.meveo_path, LocalStorageService.getToken(), this.provider);
	}

	get meveoAPI_selfWS() {
		return new MeveoAPI(properties.meveo_path, LocalStorageService.getSelfCredentials(), this.provider);
	}

	notifyActionSuccess(action, entity) {
		console.log("successfully " + action + " entity " + entity);
	}

	notifyActionFailure(action, entity) {
		console.log("failed " + action + " entity " + entity);
	}

    editPassword(userData, callback) {
        this.meveoAPI.edit_password(userData).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    getProjectSpaceByCode(projectCode, callback) {
        this.meveoAPI.find_project_space(projectCode).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

}



