import MicroEvent from 'microevent';
import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher';
import * as ActionMethods from '../actions/ActionMethods';

class AllStore extends BaseStore {

	constructor() {
		super("USER", [
			ActionMethods.GET_ALL_USERS,

		]);
	}
}

MicroEvent.mixin(AllStore);
const allStore = new AllStore();
Dispatcher.register(allStore.handleAction.bind(allStore));
export default allStore;
