import React from "react";
import {withRouter} from "react-router-dom";
import Diagram from '../components/Diagram.jsx';
import DiagramEditor from '../components/DiagramEditor.jsx';



class ProjectDiagram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDiagram: true,
        };
        this.changePage = this.changePage.bind(this);
    }

    changePage() {
        this.setState({
            isDiagram: !this.state.isDiagram
        });
    }
    render() {
        return (
            <div>
                <button className={this.state.isDiagram ? `square_diagram_btn` : `squares_btn`}  onClick={this.changePage} >
                    {this.state.isDiagram ?
                    <span>Edit</span> : <span>Back</span>}
                </button>
                {this.state.isDiagram ? <Diagram/> : <DiagramEditor/> }
            </div>
        );
    }
}

module.exports = withRouter(ProjectDiagram);