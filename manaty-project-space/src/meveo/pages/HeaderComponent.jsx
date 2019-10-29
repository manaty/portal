import React from "react";
import {Link, withRouter} from "react-router-dom";
import GoogleSearch from "google-search";
import DropdownMenu from "./elements/DropdownMenu.jsx";
import LocalStorageService from "../services/LocalStorageService";

@withRouter
export default class HeaderComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			mobileMenu: "none"
		};
		this.closeMenu = this.closeMenu.bind(this);
	}

	componentWillMount() {
		window.addEventListener("click", this.closeMenu);
	}

	componentWillUnmount() {
		window.removeEventListener("click", this.closeMenu);
	}

	componentDidMount() {
	}

	logout(event) {
		event.preventDefault();
		const{kc} = this.props;
		LocalStorageService.clearUserinfo();
		kc.logout();
	}

    changePassword(event) {
        event.preventDefault();
        const{kc} = this.props;
        kc.accountManagement();
    }

	clickedOutsideOf(event, ids = []) {
		const clicked = ids.every(id=> {
			return event.target.id !== id
				&& event.target.parentNode.id !== id
				&& event.target.parentNode.parentNode.id !== id;
		});
		return clicked;
	}

	toggleMenu() {
		const {mobileMenu} = this.state;
		const alert = document.getElementById("alert");
		this.setState({
			mobileMenu: (mobileMenu === "none" ? "block" : "none")
		});
	}

	closeMenu(event) {
		const {mobileMenu} = this.state;
		if (mobileMenu === "block" && this.clickedOutsideOf(event, [
				"mobile-menu",
				"settings-menu",
				"header-settings",
				"header-help",
				"header-search"
			])) {
			this.setState({
				mobileMenu: (mobileMenu === "none" ? "block" : "none")
			});
		}
	}

	reloadPage(event){
		event.preventDefault();
		location.reload();
	}

	render() {
		return (
			<div>
				<nav id="header-navbar" className="navbar navbar-default navbar-fixed-top" role="navigation">
					<div className="navbar-wrapper">
						<span className="logo_manaty"></span>
						<span className="logo-title-manaty"></span>

						<div id="right-menu" className="collapse navbar-collapse" style={{display: this.state.mobileMenu}}>
							<ul className="nav navbar-nav navbar-left">
								<li>
									<div className="navbar-text navbar-text-sm">
										<h4 className="row">{this.props.kc.tokenParsed.preferred_username}</h4>
									</div>
								</li>

								<li className="home-nav">
									<a onClick={this.reloadPage.bind(this)}><i className="wd-home5 fs2"/></a>
								</li>
							</ul>
							<ul className="nav navbar-nav navbar-right">
								<li>
									<div className="navbar-text navbar-text-sm">
										<div><span className="disconnect"></span><span className="name_disconnect"><Link to="#" onClick={this.logout.bind(this)}>Disconnect</Link></span></div>
										{/*<div><span className="lock"></span><span className="name_lock"><Link to="#" onClick={this.changePassword.bind(this)}>Change password</Link></span></div>*/}
										<div><span className="lock"></span><span className="name_lock"><Link to="/change_password">Change password</Link></span></div>
									</div>
								</li>
							</ul>

						</div>
					</div>
					{/*<span className="logo_manaty"></span>*/}
					{/*<span className="logo-title-manaty"></span>*/}
				</nav>
		</div>
		);
	}
}
