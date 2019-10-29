
import * as ActionMethods from './ActionMethods';
import Dispatcher from '../dispatcher';
import FrontendError from '../FrontendError';
import Error from '../model/Error';
import fetch from 'isomorphic-fetch';

export default class Action {

	constructor(actionMethod, actionFunction) {
		if(actionMethod == null || actionMethod.trim() == ''){
			throw new FrontendError("actionMethod cannot be null or empty.");
		}
		if(typeof actionFunction !== 'function'){
			throw new FrontendError("actionFunction must be a function.");
		}

		this.actionMethod = actionMethod;
		this.actionFunction = actionFunction;
	}

	execute(...args){
		this.start();
		try {
			this.actionFunction(...args);
		} catch(e) {
			this.fail(new Error(e));
		}
	}

	start() {
		Dispatcher.dispatch({
			actionMethod: ActionMethods.startMethod(this.actionMethod)
		});
	}

	success(response) {
		Dispatcher.dispatch({
			actionMethod: ActionMethods.successMethod(this.actionMethod),
			result: response
		});
	}

	fail(error) {
		Dispatcher.dispatch({
			actionMethod: ActionMethods.errorMethod(this.actionMethod),
			result: new Error(error)
		});
	}
}
