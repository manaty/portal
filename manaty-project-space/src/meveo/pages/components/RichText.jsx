import React, { Component } from 'react';
import { Richtext } from "dhx-richtext/codebase/richtext";

class RichText extends Component {
    componentDidMount() {
        this.richtext = new Richtext("richtext",this.el, {
            toolbarBlocks: ["default", "clear", "fullscreen"]
        });
    }


    render() {
        return (
            <div ref={el => this.el = el} className="widget-box">
                <div className="dhx_richtext-container">
                    <div className="dhx_richtext-container_widget" id="richtext">
                    </div>
                </div>
            </div>

        );
    }
}

module.exports = RichText;