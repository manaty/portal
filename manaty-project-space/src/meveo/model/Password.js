export default class Password {
  constructor(datum) {
    this.currentPassword = datum.currentPassword;
    this.newPassword = datum.newPassword;
    this.confirmation = datum.confirmation;

    // this.mobile = datum.mobile;
    // this.address1 = datum.address1;
    // this.address2 = datum.address2;
    // this.zipcode = datum.zipcode;
    // this.city = datum.city;
    // this.country = datum.country;
    // this.state = datum.state;

  }

  static convertFromProperties(entity) {
      return new Password(entity);
  }

  get meveoJson(){
    return JSON.stringify(this);
  }

  get entityCode(){
    return "Client";
  }

}
