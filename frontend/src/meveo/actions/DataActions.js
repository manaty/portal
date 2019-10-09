import Action from './Action';
import * as ActionMethods from './ActionMethods';

import DataService from '../services/DataService';
const dataService = new DataService();

import LocalStorageService from '../services/LocalStorageService';
import Error from '../model/Error';
import Success from '../model/Success';

export function getCountries(byUser) {
	const action = new Action(ActionMethods.GET_COUNTRIES, function() {
		dataService.get_countries(byUser).then(
			response => {
				const { actionStatus } = response;
				const { localisations } = response || {};
				if(actionStatus == null || actionStatus.status === "FAIL") {
					this.fail(actionStatus);
				}else {
					const result = new Success(localisations);
					result.message = byUser ? "user_countries_list_success" : "all_countries_list_success";
					this.success(result);
				}
			},
			error => {
					this.fail(error);
			}
		);
	});
	action.execute(byUser);
}

export function getStatuses(byRole) {
	const action = new Action(ActionMethods.GET_STATUSES, function() {
		dataService.get_statuses(byRole).then(
			response => {
				const { actionStatus } = response;
				const { statuses } = response || {};
				if(actionStatus == null || actionStatus.status === "FAIL") {
					this.fail(actionStatus);
				}else {
					const result = new Success(statuses);
					if (byRole) {
						result.message = "user_statuses_list_success";
					} else {
						result.message = "all_statuses_list_success";
					}

					this.success(result);
				}
			},
			error => {
					this.fail(error);
			}
		);
	});
	action.execute(byRole);

}
