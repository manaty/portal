import React from "react";
import {Link, withRouter} from "react-router-dom";
import GoogleSearch from "google-search";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

@withRouter
export default class MenuComponent extends React.Component {
	constructor() {
		super();
		this.state = {
		};
	}

	componentWillMount() {
	}

	componentWillUnmount() {
	}

	componentDidMount() {
	}

	render() {
		return (
			<Tabs defaultIndex={0}>
				<div className="main_sidebar">
					<TabList className="ul_tab">
						<Tab className="li_tab"><i className="tabsli"><Link to="/scheduler">SCHEDULER</Link></i></Tab><br/>
						<Tab className="li_tab"><i className="tabsli"><Link to="/diagram">DIAGRAM</Link></i></Tab><br/>
						<Tab className="li_tab"><i className="tabsli"><Link to="/gantt">GANTT</Link></i></Tab><br/>
					</TabList>
					<TabPanel/>
					<TabPanel/>
					<TabPanel/>
				</div>
			</Tabs>
		);
	}
}
