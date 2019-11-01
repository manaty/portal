import React, { Component } from 'react';
import { Spreadsheet as SpreadsheetBase } from "dhx-spreadsheet/codebase/spreadsheet.js";
import PropTypes from 'prop-types';
import "dhx-spreadsheet/codebase/spreadsheet.min.css";

var dataset = [
    { cell: "a1", value: "Country" },
    { cell: "b1", value: "Product" },
    { cell: "c1", value: "Price" },
    { cell: "d1", value: "Amount" },
    { cell: "e1", value: "Total Price" },

    { cell: "a2", value: "Ecuador" },
    { cell: "b2", value: "Banana" },
    { cell: "c2", value: 6.68, css: "someclass" },
    { cell: "d2", value: 430 },
    { cell: "e2", value: 2872.4 },

    { cell: "a3", value: "Belarus" },
    { cell: "b3", value: "Apple" },
    { cell: "c3", value: 3.75, css: "someclass" },
    { cell: "d3", value: 600 },
    { cell: "e3", value: 2250 },

    { cell: "a4", value: "Peru" },
    { cell: "b4", value: "Grapes" },
    { cell: "c4", value: 7.69 },
    { cell: "d4", value: 740 },
    { cell: "e4", value: 5690.6 },

    { cell: "a5", value: "Egypt" },
    { cell: "b5", value: "Orange" },
    { cell: "c5", value: 5.86 },
    { cell: "d5", value: 560 },
    { cell: "e5", value: 3281.6 },

    { cell: "a6", value: "South Africa" },
    { cell: "b6", value: "Grapefruit" },
    { cell: "c6", value: 8.58 },
    { cell: "d6", value: 800 },
    { cell: "e6", value: 6864 },

    { cell: "a7", value: "Spain" },
    { cell: "b7", value: "Lemon" },
    { cell: "c7", value: 9.12 },
    { cell: "d7", value: 650 },
    { cell: "e7", value: 5928 },

    { cell: "a8", value: "Iran" },
    { cell: "b8", value: "Pomegranate" },
    { cell: "c8", value: 9.67 },
    { cell: "d8", value: 300 },
    { cell: "e8", value: 2901 }
];

var styledDataset = {
    data: dataset,
    styles: {
        someclass: {
            background: "#F2F2F2",
            color: "#F57C00"
        }
    }
}
class Spreadsheet extends Component {
    componentDidMount() {
        this.spreadsheet = new SpreadsheetBase("cont",this.el, {
            menu: this.props.menu,
            editLine: this.props.editLine,
            toolbar: this.props.toolbar,
            rowsCount: this.props.rowsCount,
            colsCount: this.props.colsCount,
        });

        this.spreadsheet.parse(styledDataset);
    }

    componentWillUnmount() {
        this.spreadsheet.destructor();
    }
    render() {
        return (
            <div ref={el => this.el = el} className="widget-box">
                <div className="dhx_spreadsheet-container" style={{width: '85%', marginLeft: '235px',marginTop: '37px'}}>
                    <div className="dhx_spreadsheet-container_widget"  id="cont">
                    </div>
                </div>
            </div>

        );
    }
}
Spreadsheet.propTypes = {
    menu: PropTypes.bool,
    editLine: PropTypes.bool,
    toolbar: PropTypes.array,
    rowsCount: PropTypes.number,
    colsCount: PropTypes.number
};

module.exports = Spreadsheet;