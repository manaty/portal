import Store from 'store';
import FrontendError from '../FrontendError';

class LocalStorageService {
	constructor(){
		if(!Store.enabled){
			throw new FrontendError('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.');
		}
	}

	get(key, defaultValue) {
		return Store.get(key, defaultValue);
	}

	set(key, value) {
		Store.set(key, value);
	}

	remove(key) {
		Store.remove(key);
	}

	clearAll(){
		Store.clearAll();
	}

	getCurrentCustomer() {
		return this.get("vpp_currentCustomer");
	}

	setCurrentCustomer(customer, credentials) {
		this.set("vpp_currentCustomer", customer);
		this.setCredentials(credentials);
	}

	getCredentials() {
		return this.get("vpp_credentials");
	}

	setCredentials(credentials) {
		return this.set("vpp_credentials", btoa(credentials.username + ":" + credentials.password));
	}

	setToken(token) {
		return this.set("token", token);
	}
	getToken() {
		return this.get("token");
	}

    setTokenParsed(tokenParsed) {
        return this.set("tokenParsed", tokenParsed);
    }
    getTokenParsed() {
        return this.get("tokenParsed");
    }

	getSelfCredentials() {
		return btoa("selfcare.default:selfcare.default");
	}

	removeCurrentCustomer() {
		this.remove("vpp_currentCustomer");
		this.remove("vpp_credentials");
	}

	clearUserinfo(){
		this.remove("token");
	}
}

const localStorageService = new LocalStorageService();

export default localStorageService;
