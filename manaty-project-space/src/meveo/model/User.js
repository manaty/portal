export default class User {
  constructor(datum) {
    this.username = datum.username;
    this.email = datum.email;
    this.firstName = datum.firstName;
    this.lastName = datum.lastName;
    this.sinceDate = datum.sinceDate;
    this.photo = datum.photo;
    this.job = datum.job;
    this.skypeId = datum.skypeId;
    this.country = datum.country;
    this.linkedin = datum.linkedin;
    this.cv = datum.cv;
    this.bio = datum.bio;
    this.skills = datum.skills;
    this.projects = datum.projects;
    this.availability = datum.availability;
    this.user = datum.user;
    this.educations = datum.educations;
    this.courses = datum.courses;
    this.mission = datum.mission;
  }

  static convertFromProperties(entity) {
      return new User(entity);
  }

  get meveoJson(){
    return JSON.stringify(this);
  }

  get entityCode(){
    return "Client";
  }

}
