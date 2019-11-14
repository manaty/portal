import React from "react";
import {withRouter} from "react-router-dom";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import Diagram from '../components/ProjectDiagram.jsx';
import Scheduler from '../components/Scheduler.jsx';
import SpreadSheet from '../components/SpreadSheet.jsx';
import Pivot from '../components/Pivot.jsx';
import LoadGantt from './LoadGantt.jsx';
import { projectSpace } from '../../actions/UserProfileAction';
// import Gantt from '../components/Gantt.jsx';
import Vault from '../components/Vault.jsx';
import RichText from '../components/RichText.jsx';


class ProjectSpace extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        const { match: { params: { projectId } } } = this.props;
        projectSpace(projectId);
    }

    render() {
        const { match: { params: { projectId } } } = this.props;
        return (
            <Tabs defaultIndex={0}>
                <div className="main_sidebar">
                    <TabList className="ul_tab">
                        <Tab className="li_tab"><i className="tabsli">SCHEDULER</i></Tab>
                        <Tab className="li_tab"><i className="tabsli">DIAGRAM</i></Tab>
                        <Tab className="li_tab"><i className="tabsli">GANTT</i></Tab>
                        <Tab className="li_tab"><i className="tabsli">SPREADSHEET</i></Tab>
                        <Tab className="li_tab"><i className="tabsli">VAULT</i></Tab>
                        <Tab className="li_tab"><i className="tabsli">PIVOT</i></Tab>
                        <Tab className="li_tab"><i className="tabsli">RICHTEXT</i></Tab>
                    </TabList>
                         <TabPanel><Scheduler/></TabPanel>
                         <TabPanel><Diagram/></TabPanel>
                         <TabPanel><LoadGantt/></TabPanel>
                         <TabPanel><SpreadSheet/></TabPanel>
                         <TabPanel><Vault/></TabPanel>
                         <TabPanel><Pivot/></TabPanel>
                         <TabPanel><RichText/></TabPanel>

                </div>
            </Tabs>
        );
    }
}

module.exports = withRouter(ProjectSpace);