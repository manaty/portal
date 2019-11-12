export default class MeveoAPI {

	constructor(hostKeycloak, host, credentials, providerCode) {
        this.hostKeycloak = hostKeycloak;
		this.host = host;
		this.providerCode = providerCode;
		this.credentials = credentials;

		this.requestOptions = {
			method: 'POST',
			headers: {
		    'Content-Type': 'application/json',
		    'Accept': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
				'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, POST, PUT',
				'Access-Control-Allow-Headers': 'x-requested-with, Content-Type, origin, authorization, accept, client-security-token',
				'Access-Control-Max-Age': '1000',
				'Authorization': 'Bearer ' + credentials
		  },
			mode: 'cors',
			cache: 'no-cache'
		};
	}

	checkStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response
		} else {
			let error = new Error(response.statusText);
			error.response = response;
			throw error
		}
	}

	parseJSON(response) {
		return response.json();
	}

	parseText(response) {
		return response.text();
	}

	invokeRequest(payload, url, method) {
		this.requestOptions.body = JSON.stringify(payload);
		return this.fetch(url, method);
	}

	fetch(page, method) {
		this.requestOptions.method = method;
		let self = this;
		return new Promise((resolve, reject) => {
			fetch(this.host + page, this.requestOptions).then(this.checkStatus).then(function (data) {
				data = self.parseJSON(data);
				//console.log('request succeeded with JSON response', data);
				resolve(data);
			}).catch(function (error) {
				//console.log('request failed', error);
				reject(error);
			})
		});
	}

	createCustomEntity(entity) {
		let self = this;
		this.requestOptions.method = "POST";
		this.requestOptions.body = entity.meveoJson;
		let action = this.host + "/api/rest/customEntityInstance/"
		return new Promise((resolve, reject) => {
			fetch(action
				, this.requestOptions).then(this.checkStatus).then(function (data) {
				data = self.parseJSON(data);
				console.log('request succeeded with JSON response', data);
				resolve(data);
			}).catch(function (error) {
				console.log('request failed', error);
				reject(error);
			})
		});
	}

	createCRMAccountHierarchy(entity) {
		console.log("createCRMAccountHierarchy....");
		this.requestOptions.method = "POST";
		this.requestOptions.body = entity.meveoJson;
		let action = this.host + "/inbound/"+this.providerCode+"/registration";
		console.log("action: " + action);
		return new Promise((resolve, reject) => {
			fetch(action
				, this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
				console.log('request succeeded with JSON response', data)
				resolve(data);
			}).catch(function (error) {
				console.log('request failed', error);
				reject(error);
			})
		});
	}

	updateCRMAccountHierarchy(entity) {
		//console.log(entity);
		this.requestOptions.method = "POST";
		this.requestOptions.body = entity.meveoJson;
		let action = this.host + "/api/rest/account/accountHierarchy/updateCRMAccountHierarchy";
		console.log("action: " + action);
		return new Promise((resolve, reject) => {
			fetch(action
				, this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
				console.log('request succeeded with JSON response', data)
				resolve(data);
			}).catch(function (error) {
				console.log('request failed', error);
				reject(error);
			})
		});
	}

	createOrUpdate(entity) {
		//console.log(entity);
		this.requestOptions.method = "POST";
		this.requestOptions.body = entity.meveoJson;
		let action = this.host + "/api/rest/user/createOrUpdate";
		console.log("action: " + action);
		return new Promise((resolve, reject) => {
			fetch(action
				, this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
				console.log('request succeeded with JSON response', data)
				resolve(data);
			}).catch(function (error) {
				console.log('request failed', error);
				reject(error);
			})
		});
	}

	forgotPassword(email) {
		this.requestOptions.method = "POST";
		this.requestOptions.headers = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true,
			'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, POST, PUT',
			'Access-Control-Allow-Headers': 'x-requested-with, Content-Type, origin, authorization, accept, client-security-token',
			'Access-Control-Max-Age': '1000',
		};
		let action = this.host + "/api/rest/iep/public/resetPassword/"+ email;
		return new Promise((resolve, reject) => {
			fetch(action
				, this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
				//console.log('request succeeded with JSON response', data)
				resolve(data);
			}).catch(function (error) {
				//console.log('request failed', error);
				reject(error);
			})
		});
	}

	find_user(user_email) {
		let user_data = {"customerCode": user_email};
		this.requestOptions.method = "POST";
		this.requestOptions.body = JSON.stringify(user_data);
		let action = this.host + "/api/rest/account/accountHierarchy/find";
		return new Promise((resolve, reject) => {
			fetch(action
				, this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
				// console.log('request succeeded with JSON response', data)
				resolve(data);
			}).catch(function (error) {
				//console.log('request failed', error);
				reject(error);
			})
		});
	}

	contact(contact_data) {
		this.requestOptions.method = "POST";
		this.requestOptions.body = JSON.stringify(contact_data);
		let action = this.host + "/api/rest/account/contact/";
		return new Promise((resolve, reject) => {
			fetch(action
				, this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
				console.log('request succeeded with JSON response', data)
				resolve(data);
			}).catch(function (error) {
				console.log('request failed', error);
				reject(error);
			})
		});
	}

    find_user_details(user_name) {
        this.requestOptions.method = "GET";
        let action = this.host + "/rest/getUser/" + user_name;
        return new Promise((resolve, reject) => {
            fetch(action
                , this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
                // console.log('request succeeded with JSON response', data)
                resolve(data);
            }).catch(function (error) {
                //console.log('request failed', error);
                reject(error);
            })
        });
    }

    edit_profile_user(user_data) {
        //console.log(entity);
        this.requestOptions.method = "POST";
        this.requestOptions.body = JSON.stringify(user_data);
        let action = this.host + "/rest/updateUser";
        return new Promise((resolve, reject) => {
                fetch(action
                    , this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {

            resolve(data);
        }).catch(function (error) {
            //console.log('request failed', error);
            reject(error);
        })
    });
    }

    edit_image_user(user_data) {
        //console.log(entity);
        this.requestOptions.method = "POST";
        this.requestOptions.body = JSON.stringify(user_data);
        let action = this.host + "/rest/updateImage";
        return new Promise((resolve, reject) => {
            fetch(action
                , this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {

                resolve(data);
            }).catch(function (error) {
                //console.log('request failed', error);
                reject(error);
            })
        });
    }

    get_countries(byUser) {
        this.requestOptions.method = "GET";
        let action = this.host + "/api/rest/vppCase/localisations/"+byUser;
        return new Promise((resolve, reject) => {
            fetch(action
                , this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
                // console.log('request succeeded with JSON response', data)
                resolve(data);
            }).catch(function (error) {
                //console.log('request failed', error);
                reject(error);
            })
        });
    }

    edit_skills_user(user_data) {
        //console.log(entity);
        this.requestOptions.method = "POST";
        this.requestOptions.body = JSON.stringify(user_data);
        let action = this.host + "/rest/saveUserSkills";
        return new Promise((resolve, reject) => {
            fetch(action
                , this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {

                resolve(data);
            }).catch(function (error) {
                //console.log('request failed', error);
                reject(error);
            })
        });
    }

    edit_projects_user(user_data) {
        //console.log(entity);
        this.requestOptions.method = "POST";
        this.requestOptions.body = JSON.stringify(user_data);
        let action = this.host + "/rest/saveUserProjects";
        return new Promise((resolve, reject) => {
            fetch(action
                , this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {

                resolve(data);
            }).catch(function (error) {
                //console.log('request failed', error);
                reject(error);
            })
        });
    }

    edit_availability_user(user_data) {
        //console.log(entity);
        this.requestOptions.method = "POST";
        this.requestOptions.body = JSON.stringify(user_data);
        let action = this.host + "/rest/saveUserAvailability";
        return new Promise((resolve, reject) => {
            fetch(action
                , this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {

                resolve(data);
            }).catch(function (error) {
                //console.log('request failed', error);
                reject(error);
            })
        });
    }

    edit_bio_user(user_data) {
        //console.log(entity);
        this.requestOptions.method = "POST";
        this.requestOptions.body = JSON.stringify(user_data);
        let action = this.host + "/rest/saveUserBio";
        return new Promise((resolve, reject) => {
            fetch(action
                , this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {

                resolve(data);
            }).catch(function (error) {
                //console.log('request failed', error);
                reject(error);
            })
        });
    }

    download_image_file(file_name) {
        this.requestOptions.method = "GET";
        let action = this.host + "/api/rest/manaty/user/downloadFile?file=" + file_name;
        return new Promise((resolve, reject) => {
            fetch(action
                , this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
                // console.log('request succeeded with JSON response', data)
                resolve(data);
            }).catch(function (error) {
                //console.log('request failed', error);
                reject(error);
            })
        });
    }


    upload_file(data) {
        for(var pair of data.entries()) {
            console.log(pair[0]+ ', '+ pair[1]);
        }
        var requestOptions={
            method : "POST",
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Authorization': 'Bearer ' + this.credentials
            },
            body:data
        };
        let action = this.host + "/api/rest/admin/files/upload";
        return new Promise((resolve, reject) => {
            fetch(action
                , requestOptions,data).then(this.checkStatus).then(this.parseJSON).then(function (data) {
                // console.log('request succeeded with JSON response', data)
                resolve(data);
                for(var pair of data.entries()) {
                    console.log(pair[0]+ ', '+ pair[1]);
                }
            }).catch(function (error) {
                //console.log('request failed', error);
                reject(error);
            })
        });
    }

    download_CV_file(file_name) {
        var requestOptions={
            method : "GET",
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/msword',
                'Authorization': 'Bearer ' + this.credentials,
                'Content-disposition': 'attachment;filename='+file_name
            }

        };
        let action = this.host + "/api/rest/admin/files/downloadFile?file=" + file_name;
        return new Promise((resolve, reject) => {
            fetch(action
                , this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
                // console.log('request succeeded with JSON response', data)
                resolve(data);
            }).catch(function (error) {
                //console.log('request failed', error);
                reject(error);
            })
        });
    }

    upload_file_CV(data) {
        for(var pair of data.entries()) {
            console.log(pair[0]+ ', '+ pair[1]);
        }
        var requestOptions={
            method : "POST",
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Authorization': 'Bearer ' + this.credentials
            },
            body:data
        };
        let action = this.host + "/api/rest/admin/files/upload";
        return new Promise((resolve, reject) => {
            fetch(action
                , requestOptions,data).then(this.checkStatus).then(this.parseJSON).then(function (data) {
                // console.log('request succeeded with JSON response', data)
                resolve(data);
                for(var pair of data.entries()) {
                    console.log(pair[0]+ ', '+ pair[1]);
                }
            }).catch(function (error) {
                //console.log('request failed', error);
                reject(error);
            })
        });
    }


    find_all_users() {
        this.requestOptions.method = "GET";
        let action = this.host + "/rest/getUsers";
        return new Promise((resolve, reject) => {
            fetch(action
                , this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
                // console.log('request succeeded with JSON response', data)
                resolve(data);
            }).catch(function (error) {
                //console.log('request failed', error);
                reject(error);
            })
        });
    }

    find_all_project() {
        this.requestOptions.method = "GET";
        let action = this.host + "/rest/getProjects";
        return new Promise((resolve, reject) => {
            fetch(action
                , this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
                // console.log('request succeeded with JSON response', data)
                resolve(data);
            }).catch(function (error) {
                //console.log('request failed', error);
                reject(error);
            })
        });
    }

    find_project_details(projectName) {
        this.requestOptions.method = "GET";
        let action = this.host + "/rest/getProject/" + projectName;
        return new Promise((resolve, reject) => {
            fetch(action
                , this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
                // console.log('request succeeded with JSON response', data)
                resolve(data);
            }).catch(function (error) {
                //console.log('request failed', error);
                reject(error);
            })
        });
    }

    edit_client_project(user_data) {
        //console.log(entity);
        this.requestOptions.method = "POST";
        this.requestOptions.body = JSON.stringify(user_data);
        let action = this.host + "/rest/saveProject";
        return new Promise((resolve, reject) => {
            fetch(action
                , this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {

                resolve(data);
            }).catch(function (error) {
                //console.log('request failed', error);
                reject(error);
            })
        });
    }


    upload_image_project(data) {
        for(var pair of data.entries()) {
            console.log(pair[0]+ ', '+ pair[1]);
        }
        var requestOptions={
            method : "POST",
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Authorization': 'Bearer ' + this.credentials
            },
            body:data
        };
        let action = this.host + "/api/rest/admin/files/upload";
        return new Promise((resolve, reject) => {
            fetch(action
                , requestOptions,data).then(this.checkStatus).then(this.parseJSON).then(function (data) {
                // console.log('request succeeded with JSON response', data)
                resolve(data);
                for(var pair of data.entries()) {
                    console.log(pair[0]+ ', '+ pair[1]);
                }
            }).catch(function (error) {
                //console.log('request failed', error);
                reject(error);
            })
        });
    }

    edit_teams_project(user_data) {
        //console.log(entity);
        this.requestOptions.method = "POST";
        this.requestOptions.body = JSON.stringify(user_data);
        let action = this.host + "/rest/saveProjectTeam";
        return new Promise((resolve, reject) => {
            fetch(action
                , this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {

                resolve(data);
            }).catch(function (error) {
                //console.log('request failed', error);
                reject(error);
            })
        });
    }

    add_project_foruser(user_data) {
        //console.log(entity);
        this.requestOptions.method = "PUT";
        this.requestOptions.body = JSON.stringify(user_data);
        let action = this.host + "/api/rest/manaty/user/add/user/";
        return new Promise((resolve, reject) => {
            fetch(action
                , this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {

                resolve(data);
            }).catch(function (error) {
                //console.log('request failed', error);
                reject(error);
            })
        });
    }

    edit_password (user_profile) {
        this.requestOptions.method = "POST";
        this.requestOptions.body = user_profile.meveoJson;
        let action = this.hostKeycloak + "/auth/realms/meveo/account/credentials/password";
        return new Promise((resolve, reject) => {
            fetch(action
                , this.requestOptions).then(this.checkStatus).then(function (data) {
                // console.log('request succeeded with JSON response', data)
                resolve(data);
            }).catch(function (error) {
                console.log('request failed', error);
                reject(error);
            })
        });
    }

    edit_educations_user(user_data) {
        //console.log(entity);
        this.requestOptions.method = "POST";
        this.requestOptions.body = JSON.stringify(user_data);
        let action = this.host + "/rest/saveUserEducations";
        return new Promise((resolve, reject) => {
            fetch(action
                , this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {

                resolve(data);
            }).catch(function (error) {
                //console.log('request failed', error);
                reject(error);
            })
        });
    }

    edit_courses_user(user_data) {
        //console.log(entity);
        this.requestOptions.method = "POST";
        this.requestOptions.body = JSON.stringify(user_data);
        let action = this.host + "/rest/saveUserCourses";
        return new Promise((resolve, reject) => {
            fetch(action
                , this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
                resolve(data);
            }).catch(function (error) {
                //console.log('request failed', error);
                reject(error);
            })
        });
    }

    edit_mission_user(user_data) {
        //console.log(entity);
        this.requestOptions.method = "POST";
        this.requestOptions.body = JSON.stringify(user_data);
        let action = this.host + "/rest/saveUserMission";
        return new Promise((resolve, reject) => {
            fetch(action
                , this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
                resolve(data);
            }).catch(function (error) {
                reject(error);
            })
        });
    }

    remove_Mission(user_data) {
        //console.log(entity);
        this.requestOptions.method = "POST";
        this.requestOptions.body = JSON.stringify(user_data);
        let action = this.host + "/rest/removeUserMission";
        return new Promise((resolve, reject) => {
            fetch(action
                , this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
                resolve(data);
            }).catch(function (error) {
                reject(error);
            })
        });
    }

   generate_CV(user_data) {
        //console.log(entity);
        this.requestOptions.method = "GET";
        let action = this.host + "/rest/generateCV/" + user_data;
        return new Promise((resolve, reject) => {
            fetch(action
                , this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
                resolve(data);
            }).catch(function (error) {
                reject(error);
            })
        });
    }

    generate_CV_Export(user_data) {
        //console.log(entity);
        this.requestOptions.method = "GET";
        let action = this.host + "/rest/generateCVExport/" + user_data;
        return new Promise((resolve, reject) => {
            fetch(action
                , this.requestOptions).then(this.checkStatus).then(this.parseJSON).then(function (data) {
                resolve(data);
            }).catch(function (error) {
                reject(error);
            })
        });
    }
}

