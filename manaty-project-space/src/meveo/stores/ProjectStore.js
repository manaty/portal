import MicroEvent from 'microevent';
import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher';
import * as ActionMethods from '../actions/ActionMethods';

class ProjectStore extends BaseStore {

	constructor() {
		super("PROJECT", [
            ActionMethods.GET_PROJECT_SPACE,
		]);
	}
}

MicroEvent.mixin(ProjectStore);
const projectStore = new ProjectStore();
Dispatcher.register(projectStore.handleAction.bind(projectStore));
export default projectStore;
