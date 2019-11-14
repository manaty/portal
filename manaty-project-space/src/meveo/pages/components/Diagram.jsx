
import React, { Component } from 'react'

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

class Diagram extends Component {

  componentDidMount() {
    var diagram = new window.dhx.Diagram("diagram_container", { type: "org",defaultShapeType: "img-card" });
    diagram.data.parse([
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
    ]);

  }

  render() {
    return (
        <div>
          <div id="diagram_container" className="diagram_container"/>
        </div>
    );
  }
}

module.exports = Diagram;