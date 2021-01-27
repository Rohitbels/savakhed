import React, { Component } from "react";
import Listing from "./container/listing/Listing";
import Details from "./container/details/Details";
import LekhakList from "./container/LekhakList/LekhakList"
import MobileNav from "./components/navbar/mobileNav"

import { db } from "./firebase";
import Header from "./components/header/Header";
import AboutUs from "./components/about-us/AboutUs";

const detailsURLPattern = /\/?details\/[a-z0-9A-Z]{20}/;
class App extends Component {
	constructor() {
		super();

		this.state = {
			show: "listing",
			currentDetails: {},
		};
	}

	componentDidMount() {
		const self = this;
		window.addEventListener(
			"hashchange",
			function () {
				//console.log("The hash has changed!");
				self.setPath();
			},
			false
		);
		this.setPath();
	}

	setPath = () => {
		const currURL = window.location.href.split("#");
		if (currURL.length > 1) {
			let endPart = currURL[1].toLowerCase();
			if (endPart.includes("details")) {
				var patt = detailsURLPattern;
  				if(patt.test(endPart))
					this.setState({ show: "details" });
			}
			else if (endPart.includes("lekhaklist")) {
				this.setState({ show: "lekhaklist" });
			}
			else if (currURL[1].includes("aboutUs")) {
				this.setState({ show: "aboutUs" });
			} else {
				this.setState({ show: "listing" });
			}
		}
	};

	render() {
		return (
			<div className="App">
				<Header url={this.state.show} />
				{this.state.show === "details" &&
					<Details bookDetail = {this.state.currentDetails} />
				}
				{this.state.show === "lekhaklist" && (
					<LekhakList
						setCurrentDetails={(book) =>
							this.setState({ currentDetails: book })
						}
					/>
				)}
				
				{this.state.show === "listing" && (
					<Listing
						setCurrentDetails={(book) =>
							this.setState({ currentDetails: book })
						}
					/>
				)}
				{this.state.show === "aboutUs" && <AboutUs />}
				<MobileNav url={this.state.show}/>
			</div>
		);
	}
}

export default App;
