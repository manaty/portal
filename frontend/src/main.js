import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, HashRouter} from 'react-router-dom';
import Keycloak from 'keycloak-js';

import * as properties from  './properties';
import LocalStorageService from './meveo/services/LocalStorageService';

var keycloak = Keycloak(properties.keycloakConfigURL);

var MainComponent = require('./meveo/pages/MainComponent.jsx');

var IndexComponent = require('./meveo/pages/public/IndexComponent.jsx');
var LoginComponent = require('./meveo/pages/public/LoginComponent.jsx');
var SignupComponent = require('./meveo/pages/public/SignupCustomerComponent.jsx');
var ForgotPasswordComponent = require('./meveo/pages/public/ForgotPasswordComponent.jsx');
var ResetPasswordComponent = require('./meveo/pages/public/ResetPasswordComponent.jsx');
var ContactComponent = require('./meveo/pages/public/ContactComponent.jsx');
var HowitworksComponent = require('./meveo/pages/public/HowitworksComponent.jsx');
var AboutUsComponent = require('./meveo/pages/public/AboutUsComponent.jsx');
var FaqComponent = require('./meveo/pages/public/FaqComponent.jsx');
var VerifyEmailComponent = require('./meveo/pages/public/VerifyEmailComponent.jsx');

var UserProfile = require('./meveo/pages/user/UserProfile.jsx');
var UserTeam = require('./meveo/pages/user/UserTeam.jsx');
var UserProjects = require('./meveo/pages/user/UserProjects.jsx');
var ChangePassword = require('./meveo/pages/user/ChangePassword.jsx');
var Mobile = require('./meveo/pages/user/Mobile.jsx');

var Scheduler = require('./meveo/pages/components/Scheduler.jsx');
var Diagram = require('./meveo/pages/components/Diagram.jsx');
var DiagramEditor = require('./meveo/pages/components/DiagramEditor.jsx');


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
						<Route exact path={properties.index_url} component={UserProfile}/>
			            <Route exact path={properties.team_url} component={UserTeam}/>
				        <Route exact path={properties.projects_url} component={UserProjects}/>
			            <Route exact path={properties.change_password} component={ChangePassword}/>
						<Route exact path={properties.scheduler_url} component={Scheduler}/>
                        <Route exact path={properties.diagram_url} component={Diagram}/>
						<Route exact path={properties.diagram_editor} component={DiagramEditor}/>
						<Route path={properties.faq_url} component={LoginComponent}/>
						<Route path={properties.how_it_works_url} component={HowitworksComponent}/>
						<Route exact path={properties.about_url} component={AboutUsComponent}/>
						<Route path={properties.contact_url} component={ContactComponent}/>
					</MainComponent>
				</HashRouter>

			), document.getElementById('vpp_module'));
		} else {
			keycloak.login();
		}

}).error(function() {
		console.log('Keycloak failed to initialize');
});
