import MicroEvent from 'microevent';
import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher';
import * as ActionMethods from '../actions/ActionMethods';

class DataStore extends BaseStore {

	constructor() {
		super("DATA", [
			ActionMethods.GET_COUNTRIES,
			ActionMethods.GET_STATUSES
		]);
	}

}

MicroEvent.mixin(DataStore);
const dataStore = new DataStore();
Dispatcher.register(dataStore.handleAction.bind(dataStore));
export default dataStore;
