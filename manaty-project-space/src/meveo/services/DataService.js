import BaseService from './BaseService';

export default class DataService extends BaseService {

	get_countries(byUser) {
		return new Promise((resolve, reject) => {
			super.getCountries(byUser, (code, response) => {
				(code == 'success') ? resolve(response) : reject(response);
			});
		});
	}

	get_statuses(byRole) {
		return new Promise((resolve, reject) => {
			super.getStatuses(byRole, (code, response) => {
				(code == 'success') ? resolve(response) : reject(response);
			});
		});
	}


}
