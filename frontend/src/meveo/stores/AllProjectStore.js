import MicroEvent from 'microevent';
import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher';
import * as ActionMethods from '../actions/ActionMethods';

class AllProjectStore extends BaseStore {

	constructor() {
		super("USER", [
			ActionMethods.GET_ALL_PROJECT,

		]);
	}
}

MicroEvent.mixin(AllProjectStore);
const allProjectStore = new AllProjectStore();
Dispatcher.register(allProjectStore.handleAction.bind(allProjectStore));
export default allProjectStore;
