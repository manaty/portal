import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, HashRouter} from 'react-router-dom';
import Keycloak from 'keycloak-js';

import * as properties from  './properties';
import LocalStorageService from './meveo/services/LocalStorageService';

var keycloak = Keycloak(properties.keycloakConfigURL);

var MainComponent = require('./meveo/pages/MainComponent.jsx');

var ChangePassword = require('./meveo/pages/user/ChangePassword.jsx');

var ProjectSpace = require('./meveo/pages/components/ProjectSpace.jsx');



function SheduleTokenRefresh() {
	setInterval(() => {
		keycloak.updateToken(properties.tokenRefreshRate)
			.success(refreshed => {
				console.log("refreshed ==>");
				console.log(refreshed);
				if (refreshed) {
					console.log("TOKEN REFRESH::::::::::::");
					console.log(keycloak);
					LocalStorageService.setToken(keycloak.token);
				}
			})
			.error(() => {
				console.log('Keycloak failed to refresh');
			});
	}, (properties.tokenRefreshRate * 1000));
}

keycloak.init({
	onLoad: 'login-required'

}).success((authenticated) => {
		if (authenticated) {
			SheduleTokenRefresh();
			LocalStorageService.setToken(keycloak.token);
            LocalStorageService.setTokenParsed(keycloak.tokenParsed);
			render((
				<HashRouter>
					<MainComponent kc={keycloak}>
						<Route exact path={properties.index_url} component={ProjectSpace}/>
						<Route exact path={properties.project_url} component={ProjectSpace}/>
					</MainComponent>
				</HashRouter>

			), document.getElementById('vpp_module'));
		} else {
			keycloak.login();
		}

}).error(function() {
		console.log('Keycloak failed to initialize');
});
