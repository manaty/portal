export default class Project {
  constructor(datum) {
    this.code = datum.code;

      this.project = datum.project;
      this.logo = datum.logo;
      this.link = datum.link;
      this.contacts = datum.contacts;
      this.projectSpaceLink = datum.projectSpaceLink;
      this.externalProjectSpace = datum.externalProjectSpace;
      this.teams = datum.teams;
      this.longDescription = datum.longDescription;

  }

  static convertFromProperties(entity) {
      return new Project(entity);
  }

  get meveoJson(){
    return JSON.stringify(this);
  }

  get entityCode(){
    return "Client";
  }

}
