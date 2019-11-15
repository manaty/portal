export default class Project {
  constructor(datum) {
    this.code = datum.code;

    this.projectSpaceLink = datum.projectSpaceLink;
    this.externalProjectSpace = datum.externalProjectSpace;
    this.projectSpaceModule = datum.projectSpaceModule;

  }

  static convertFromProperties(entity) {
      return new Project(entity);
  }

  get meveoJson(){
    return JSON.stringify(this);
  }



}
