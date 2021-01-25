import React, { Component } from "react";
import Listing from "./container/listing/Listing";
import Details from "./container/details/Details";
import LekhakList from "./components/LekhakList/LekhakList";
import Header from "./components/header/Header";
import AboutUs from "./components/about-us/AboutUs";

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
				console.log("The hash has changed!");
				self.setPath();
			},
			false
		);
		this.setPath();
	}

	setPath = () => {
		const currURL = window.location.href.split("#");
		if (currURL.length > 1) {
			if (currURL[1].includes("details")) {
				this.setState({ show: "details" });
			} else if (currURL[1].includes("lekhakList")) {
				this.setState({ show: "lekhakList" });
			} else if (currURL[1].includes("aboutUs")) {
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
				{this.state.show === "details" && (
					<Details bookDetail={this.state.currentDetails} />
				)}
				{this.state.show === "lekhakList" && <LekhakList />}
				{this.state.show === "listing" && (
					<Listing
						setCurrentDetails={(book) =>
							this.setState({ currentDetails: book })
						}
					/>
				)}
				{this.state.show === "aboutUs" && <AboutUs />}
			</div>
		);
	}
}

export default App;
