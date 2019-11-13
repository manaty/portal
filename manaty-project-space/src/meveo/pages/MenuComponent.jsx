// import React, { Fragment } from "react";
// import {Link, withRouter} from "react-router-dom";
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import Diagram from '../pages/components/Diagram.jsx';
// import Scheduler from '../pages/components/Scheduler.jsx';
// import Gantt from '../pages/components/Gantt.jsx';
// import SpreadSheet from '../pages/components/SpreadSheet.jsx';
// import Pivot from '../pages/components/Pivot.jsx';
// import Vault from '../pages/components/Vault.jsx';
// import RichText from '../pages/components/RichText.jsx';
//
// class MenuComponent extends React.Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 		};
// 	}
//
// 	componentWillMount() {
// 	}
//
// 	componentWillUnmount() {
// 	}
//
// 	componentDidMount() {
// 	}
//
// 	render() {
// 		const { location: { pathname } }  = this.props;
// 		const isProjectId = pathname === '/project1';
//
// 		return (
// 			<Tabs defaultIndex={0}>
// 				<div className="main_sidebar">
// 					<TabList className="ul_tab">
// 						{isProjectId &&<Tab className="li_tab"><i className="tabsli">SCHEDULER</i></Tab>}
// 						{isProjectId && <Tab className="li_tab"><i className="tabsli">DIAGRAM</i></Tab>}
// 						{isProjectId && <Tab className="li_tab"><i className="tabsli">GANTT</i></Tab>}
// 						{!isProjectId && <Tab className="li_tab"><i className="tabsli">SPREADSHEET</i></Tab>}
// 						{!isProjectId && <Tab className="li_tab"><i className="tabsli">VAULT</i></Tab>}
// 						{!isProjectId && <Tab className="li_tab"><i className="tabsli">PIVOT</i></Tab>}
// 						{!isProjectId && <Tab className="li_tab"><i className="tabsli">RICHTEXT</i></Tab>}
// 					</TabList>
// 					{isProjectId && <TabPanel><Diagram/></TabPanel>}
// 					{isProjectId && <TabPanel><Scheduler/></TabPanel>}
// 					{isProjectId && <TabPanel><SpreadSheet/></TabPanel>}
// 					{!isProjectId && <TabPanel><Gantt/></TabPanel>}
// 					{!isProjectId && <TabPanel><Pivot/></TabPanel>}
// 					{!isProjectId && <TabPanel><Vault/></TabPanel>}
// 					{!isProjectId && <TabPanel><RichText/></TabPanel>}
// 				</div>
// 			</Tabs>
// 		);
// 	}
// }
//
// export default withRouter(MenuComponent);