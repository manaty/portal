import MicroEvent from 'microevent';
import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher';
import * as ActionMethods from '../actions/ActionMethods';

class PasswordStore extends BaseStore {

	constructor() {
		super("USER", [
			ActionMethods.EDIT_PASSWORD,

		]);
	}

}

MicroEvent.mixin(PasswordStore);
const passwordStore = new PasswordStore();
Dispatcher.register(passwordStore.handleAction.bind(passwordStore));
export default passwordStore;
