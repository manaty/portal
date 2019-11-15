import React from "react";
import {withRouter} from "react-router-dom";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import Diagram from '../components/ProjectDiagram.jsx';
import Scheduler from '../components/Scheduler.jsx';
import SpreadSheet from '../components/SpreadSheet.jsx';
import Pivot from '../components/Pivot.jsx';
import LoadGantt from './LoadGantt.jsx';
import { projectSpace } from '../../actions/UserProfileAction';
import Vault from '../components/Vault.jsx';
import RichText from '../components/RichText.jsx';
import ProjectStore from '../../stores/ProjectStore';


class ProjectSpace extends React.Component {
    constructor() {
        super();
        this.state = {
            projectSpaceModule : [],
        };
    }

    componentWillMount() {
        ProjectStore.bindUpdateHandler(this.ProjectSpaceOnUpdate.bind(this));
    }

    componentWillUnmount() {
        ProjectStore.bindUpdateHandler(this.ProjectSpaceOnUpdate.bind(this));
    }

    componentDidMount() {
        const { match: { params: { projectId } } } = this.props;
        projectSpace(projectId);
    }

    ProjectSpaceOnUpdate(response) {
        const {result, message} = response
        if (message === "project_space_success") {
            this.setState({
                projectSpaceModule : result.projectSpaceModule
            });
        }
        this.state;
    }

    setDataFormData() {
        const {projectSpace} = this.props;
        if (projectSpace != null) {
            var state = this.state;

            state['projectSpaceLink'] = projectSpace.projectSpaceLink;
            state['externalProjectSpace'] = projectSpace.externalProjectSpace;
            state['projectSpaceModule'] = projectSpace.projectSpaceModule;

            this.setState(state);
        }
    }

    render() {
        const { match: { params: { projectId } } } = this.props;
        const { projectSpaceModule } = this.state;
        const menus = [
            {
                id: 'Scheduler',
                tabComponent: <Tab className="li_tab"><i className="tabsli">SCHEDULER</i></Tab>,
                panelComponent: <TabPanel><Scheduler/></TabPanel>,
            },
            {
                id: 'Diagram',
                tabComponent: <Tab className="li_tab"><i className="tabsli">DIAGRAM</i></Tab>,
                panelComponent: <TabPanel><Diagram/></TabPanel>,
            },
            {
                id: 'Gantt',
                tabComponent: <Tab className="li_tab"><i className="tabsli">GANTT</i></Tab>,
                panelComponent: <TabPanel><LoadGantt/></TabPanel>,
            },
            {
                id: 'SpreadSheet',
                tabComponent: <Tab className="li_tab"><i className="tabsli">SPREADSHEET</i></Tab>,
                panelComponent: <TabPanel><SpreadSheet/></TabPanel>,
            },
            {
                id: 'Vault',
                tabComponent: <Tab className="li_tab"><i className="tabsli">VAULT</i></Tab>,
                panelComponent: <TabPanel><Vault/></TabPanel>,
            },
            {
                id: 'Pivot',
                tabComponent: <Tab className="li_tab"><i className="tabsli">PIVOT</i></Tab>,
                panelComponent: <TabPanel><Pivot/></TabPanel>,
            },
            {
                id: 'RichText',
                tabComponent: <Tab className="li_tab"><i className="tabsli">RICHTEXT</i></Tab>,
                panelComponent: <TabPanel><RichText/></TabPanel>,
            },

        ];
        let renderMenus = menus;
        if (projectSpaceModule && projectSpaceModule.length >0) {
            renderMenus = menus.filter(menu => projectSpaceModule.includes(menu.id));
        }
        return (
            <Tabs defaultIndex={0}>
                <div className="main_sidebar">
                    {JSON.stringify(projectSpaceModule)}
                    <TabList className="ul_tab">
                        {renderMenus.map(menu => menu.tabComponent)}
                    </TabList>
                    {renderMenus.map(menu => menu.panelComponent)}
                </div>
            </Tabs>
        );
    }
}

module.exports = withRouter(ProjectSpace);