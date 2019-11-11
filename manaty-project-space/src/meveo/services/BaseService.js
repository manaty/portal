import MeveoAPI from '../MeveoAPI';
import LocalStorageService from './LocalStorageService';
import * as properties from '../../properties';

export default class BaseService {
	constructor(provider) {
		this.provider = provider || properties.provider;
		this.useMockup = false;
	}

	get meveoAPI() {
		//return new MeveoAPI(properties.meveo_path, LocalStorageService.getCredentials(), this.provider);
		return new MeveoAPI(properties.keycloak_path,properties.meveo_path, LocalStorageService.getToken(), this.provider);
	}

	get meveoAPI_selfWS() {
		return new MeveoAPI(properties.meveo_path, LocalStorageService.getSelfCredentials(), this.provider);
	}

	notifyActionSuccess(action, entity) {
		console.log("successfully " + action + " entity " + entity);
	}

	notifyActionFailure(action, entity) {
		console.log("failed " + action + " entity " + entity);
	}

	forgotPassword(email, callback) {
		this.meveoAPI.forgotPassword(email).then(response => {
				if (callback) {
					callback('success', response);
				}
			},
			error => {
				this.dataList.pop();
				if (callback) {
					callback('error', error);
				}
			}
		);
	}

	login(data, callback) {
		//console.log("data login: "+JSON.stringify(data));
		LocalStorageService.setCredentials(data);
		this.meveoAPI.find_user(data.username).then(response => {
				if (callback) {
					callback('success', response);
				}
			},
			error => {
				this.dataList.pop();
				if (callback) {
					callback('error', error);
				}
			}
		);
	}

	contact(data, callback) {
		console.log("data contact: " + data);
		this.meveoAPI.contact(data).then(response => {
				if (callback) {
					callback('success', response);
				}
			},
			error => {
				this.dataList.pop();
				if (callback) {
					callback('error', error);
				}
			}
		);
	}

	findUser(code, callback) {
		this.meveoAPI.find_user(code).then(response => {
				if (callback) {
					callback('success', response);
				}
			},
			error => {
				if (callback) {
					callback('error', error);
				}
			}
		);
	}

	getUserDetailsByUserName(username, callback) {
		this.meveoAPI.find_user_details(username).then(response => {
				if (callback) {
					callback('success', response);
				}
			},
			error => {
				if (callback) {
					callback('error', error);
				}
			}
		);
	}

    editUser(userData, callback) {
        this.meveoAPI.edit_profile_user(userData).then(response => {
            if (callback) {
                callback('success', response);
            }
        },
            error => {
            if (callback) {
                callback('error', error);
            }
        }
    );
    }

    editImageUser(userData, callback) {
        this.meveoAPI.edit_image_user(userData).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    getCountries(byUser, callback) {
        this.meveoAPI.get_countries(byUser).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    editSkillsUser(userData, callback) {
        this.meveoAPI.edit_skills_user(userData).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    editProjectsUser(userData, callback) {
        this.meveoAPI.edit_projects_user(userData).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    editAvailabilityUser(userData, callback) {
        this.meveoAPI.edit_availability_user(userData).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    editBioUser(userData, callback) {
        this.meveoAPI.edit_bio_user(userData).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    downloadImageFile(username, callback) {
        this.meveoAPI.download_image_file(username).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    uploadImageFile(username, callback) {
        this.meveoAPI.upload_file(username).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    downloadCVFile(username, callback) {
        this.meveoAPI.download_CV_file(username).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }


    uploadCVFile(username, callback) {
        this.meveoAPI.upload_file_CV(username).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }


    getAllUsers( callback) {
        this.meveoAPI.find_all_users().then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    getAllProject( callback) {
        this.meveoAPI.find_all_project().then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    getProjectDetailsByCode(projectName, callback) {
        this.meveoAPI.find_project_details(projectName).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    editClientProject(userData, callback) {
        this.meveoAPI.edit_client_project(userData).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    editAssemblaProject(userData, callback) {
        this.meveoAPI.edit_assembla_project(userData).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    uploadImageProject(username, callback) {
        this.meveoAPI.upload_image_project(username).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    editTeamProject(userData, callback) {
        this.meveoAPI.edit_teams_project(userData).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    addProjectForUser(userData, callback) {
        this.meveoAPI.add_project_foruser(userData).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    editPassword(userData, callback) {
        this.meveoAPI.edit_password(userData).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    editEducationsUser(userData, callback) {
        this.meveoAPI.edit_educations_user(userData).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    editCoursesUser(userData, callback) {
        this.meveoAPI.edit_courses_user(userData).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    editMissionUser(userData, callback) {
    this.meveoAPI.edit_mission_user(userData).then(response => {
            if (callback) {
                callback('success', response);
            }
        },
        error => {
            if (callback) {
                callback('error', error);
            }
        }
    );
}


    removeMission(userData, callback) {
        this.meveoAPI.remove_Mission(userData).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    generateCV(username, callback) {
        this.meveoAPI.generate_CV(username).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    generateCVExport(username, callback) {
        this.meveoAPI.generate_CV_Export(username).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

    getProjectSpaceByCode(projectCode, callback) {
        this.meveoAPI.find_project_space(projectCode).then(response => {
                if (callback) {
                    callback('success', response);
                }
            },
            error => {
                if (callback) {
                    callback('error', error);
                }
            }
        );
    }

}



