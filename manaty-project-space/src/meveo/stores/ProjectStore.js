import MicroEvent from 'microevent';
import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher';
import * as ActionMethods from '../actions/ActionMethods';

class ProjectStore extends BaseStore {

	constructor() {
		super("PROJECT", [
			ActionMethods.GET_PROJECT_DETAILS,
            ActionMethods.EDIT_CLIENT_PROJECT,
            ActionMethods.EDIT_ASSEMBLA_PROJECT,
            ActionMethods.UPLOAD_IMAGE_PROJECT_FILE,
            ActionMethods.EDIT_TEAMS_PROJECT,
            ActionMethods.ADD_PROJECT_FOR_USER,
            ActionMethods.GET_PROJECT_SPACE,
		]);
	}
}

MicroEvent.mixin(ProjectStore);
const projectStore = new ProjectStore();
Dispatcher.register(projectStore.handleAction.bind(projectStore));
export default projectStore;
