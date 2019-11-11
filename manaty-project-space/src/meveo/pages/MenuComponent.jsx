import React, { Fragment } from "react";
import {Link, withRouter} from "react-router-dom";
import GoogleSearch from "google-search";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class MenuComponent extends React.Component {
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
		const { location: { pathname } }  = this.props;
		const isSchedulerId = pathname === '/scheduler';

		return (
			<Tabs defaultIndex={0}>
				<div className="main_sidebar">
					<TabList className="ul_tab">
						<Tab className="li_tab"><i className="tabsli"><Link to="/scheduler">SCHEDULER</Link></i></Tab><br/>
						{isSchedulerId && <Tab className="li_tab"><i className="tabsli"><Link to="/diagram">DIAGRAM</Link></i></Tab>}
						{isSchedulerId && <Tab className="li_tab"><i className="tabsli"><Link to="/gantt">GANTT</Link></i></Tab>}
						{isSchedulerId && <Tab className="li_tab"><i className="tabsli"><Link to="/spreadsheet">SPREADSHEET</Link></i></Tab>}
						<Tab className="li_tab"><i className="tabsli"><Link to="/vault">VAULT</Link></i></Tab><br/>
						<Tab className="li_tab"><i className="tabsli"><Link to="/pivot">PIVOT</Link></i></Tab><br/>
						<Tab className="li_tab"><i className="tabsli"><Link to="/richtext">RICHTEXT</Link></i></Tab><br/>
					</TabList>
					<TabPanel/>
					{isSchedulerId && <TabPanel/>}
					{isSchedulerId && <TabPanel/>}
					{isSchedulerId && <TabPanel/>}
					<TabPanel/>
					<TabPanel/>
					<TabPanel/>
				</div>
			</Tabs>
		);
	}
}

export default withRouter(MenuComponent);