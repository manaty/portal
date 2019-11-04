
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const dataDiagram = [
  {
    id: "1",
    text: "Chairman & CEO",
    title: "sebastien",
    img: "../common/img/avatar-1.png"
  },
  {
    id: "2",
    text: "Manager",
    title: " Jeremy ",
    img: "../common/img/avatar-2.png"
  },
  {
    id: "3",
    text: "Technical Director",
    title: "phu bach",
    img: "../common/img/avatar-3.png"
  },
  {
    id: "2.1",
    text: "Marketer",
    title: "nhat nam ",
    img: "../common/img/avatar-1.png"
  },
  {
    id: "3.1",
    text: "Team Lead ",
    title: "hien bach",
    img: "../common/img/avatar-1.png"
  },
  {id: "1-2", from: "1", to: "2", type: "line", points: [{x: 100, y: 100}]},
  {id: "1-3", from: "1", to: "3", type: "line"},
  {id: "2-2.1", from: "2", to: "2.1", type: "line"},
  {id: "3-3.1", from: "3", to: "3.1", type: "line"},
];

class DiagramEditor extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    var editor = new window.dhx.DiagramEditor("diagram_container", { type: "org", shapeType: "img-card" });
    editor.parse(dataDiagram);
    console.log(editor._diagram.data._order);
    this.setState({
      data: editor._diagram.data._order,
    });
    console.log(this.state.data);
  }

  shouldComponentUpdate(nextState) {
    if (this.state == null) {
      return true;
    }

    if (this.state.data == nextState.data) {
      return false;
    }
    return true;
  }

  handleForm=() => {
    const value = this.state.data.map((item,index) => (item.text || item.title ? `${index +1}. ${item.text} -- ${item.title}\n` : null));
  alert(value);
};

  render() {
    const { data } = this.state;
    const listItems = data ? data.map((item, index) =>
        <li key={index}>Text: {item.text} Title: {item.title}</li>
    ) : '';

    return (
        <div>
          <Link to={'/diagram'}>
            <button className="squares_btn">Back</button>
          </Link>
          <div>
            <button className="square_btn" onClick={this.handleForm}>Save</button>
          </div>
          <div id="diagram_container" className="diagram_editor_container" style={{ marginTop: '38px',flexDirection: 'initial' }}/>
        </div>
    );
  }
}

module.exports = DiagramEditor;