import User from '../model/User';
import MeveoCustomer from '../model/MeveoCustomer';
import MeveoUser from '../model/MeveoUser';
import CrudService from './CrudService';

export default class CustomerService extends CrudService {

	constructor() {
		super(User);
		this.useMockup = false;
		if (this.useMockup) {
			this.dataList = [
				new User({
					id: 1,
					email: "smichea@gmail.com",
					first_name: "Sébastien",
					last_name: "Michéa",
					company: "webdrone",
					tel: "+3487654432",
					skype: "s.skype",
					website: "",
					acccount_status: 'active',
					newsletter: false,
					password: ""
				}),
			];
		}
		// console.log("created CustomerService");
	}


	persist(datum, callback) {
		let entity = new User(datum);
		let MeveoEntity = new MeveoCustomer(entity);
		super.persist(MeveoEntity, callback);
	}

	Create(datum) {
		var self = this;
		return new Promise((resolve, reject) => {

			this.persist(datum, (code, response) => {
				(code == 'success') ? resolve(response) : reject(response);
			});
		});
	}

  update(datum, callback){
       //let entity = new User(datum);
       let MeveoEntity = new MeveoCustomer(datum);
       super.update(MeveoEntity, callback);
  }

  UpdateUser(datum){
    return new Promise((resolve, reject) => {
      this.update(datum, (code, response) => {
          (code == 'success')? resolve(response) : reject(response);
      });
    });
  }

	update_user(datum, callback){
       let MeveoEntity = new MeveoUser(datum);
       super.updateUser(MeveoEntity, callback);
  }

  UpdateUser(datum){
    return new Promise((resolve, reject) => {
      this.update_user(datum, (code, response) => {
          (code == 'success')? resolve(response) : reject(response);
      });
    });
  }

}
