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

    find_project_space(projectCode) {
        this.requestOptions.method = "GET";
        let action = this.host + "/rest/getProject/" + projectCode;
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
}

