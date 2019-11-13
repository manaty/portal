import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import HeaderComponent from './HeaderComponent.jsx';

import LocalStorageService from '../services/LocalStorageService'

import * as properties from  '../../properties';

@withRouter
class MainComponent extends Component{

	constructor(props) {
		super(props);
		// The MainComponent is the only component that talks directly to
		// the LocalStorageService.  It allows it to load the currentCustomer
		// directly so that it can redirect when necessary.
		// Other components should bind to the CustomerStore's update handler
		// event instead.
		this.state = {
			currentCustomer: LocalStorageService.get("vpp_currentCustomer")
		};
	}

	componentWillMount() {
		//CustomerStore.bindUpdateHandler(this.updateCurrentCustomer.bind(this));
	}

	componentWillUnmount() {
		//CustomerStore.unbindUpdateHandler(this.updateCurrentCustomer.bind(this));
	}

	componentDidMount() {
		//this.redirectIfNeeded();
		//getCurrentCustomer();
	}

	componentWillUpdate(nextProps, nextState) {
		//this.redirectIfNeeded(nextProps, nextState);
	}

	updateCurrentCustomer(currentCustomer) {
		this.setState({
			currentCustomer
		});
	}

	redirectIfNeeded() {
			window.location = "index.html#" + properties.index_url;
	}

	render() {
		return (
			<div>
				<header className="header" >
					<HeaderComponent location = {this.props.location.pathname} {...this.props} />
				</header>
				<div className="content" id="content">
					{this.props.children}
					<span className="footer-div user-footer"></span>
				</div>
			</div>
		);
	}
}

module.exports = MainComponent;
