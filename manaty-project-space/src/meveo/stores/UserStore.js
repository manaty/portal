import MicroEvent from 'microevent';
import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher';
import * as ActionMethods from '../actions/ActionMethods';

class UserStore extends BaseStore {

	constructor() {
		super("USER", [
			ActionMethods.GET_USER_DETAILS,
            ActionMethods.EDIT_PROFILE_USER,
            ActionMethods.UPLOAD_IMAGE_FILE,
            ActionMethods.UPLOAD_CV_FILE,
            ActionMethods.EDIT_IMAGE_USER,
			ActionMethods.GENERATE_CV,
			ActionMethods.GENERATE_CV_EXPORT,
		]);
	}

}

MicroEvent.mixin(UserStore);
const userStore = new UserStore();
Dispatcher.register(userStore.handleAction.bind(userStore));
export default userStore;
