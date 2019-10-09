import React from "react";
import * as properties from "../../properties";

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="text-center footer">
                <div className="row">
                    <div className="footer-links col-xs-12">
                        <ul className="list-inline">
                            <li><a href="#" target="_blank">About Manaty</a></li>
                            <li><a href="#" target="_blank">Community</a></li>
                            <li><a href="#" target="_blank">Privacy</a></li>
                            <li><a href="#" target="_blank">Contact us</a></li>
                        </ul>
                    </div>
                </div>
                <div className="row text-center">
                          <div className="footer-copyright">
                              <i className="fa fa-copyright"/> Manaty
                          </div>
                </div>
            </footer>
        );
    }
}
