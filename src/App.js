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
			} else {
				this.setState({ show: "listing" });
			}
		}
	};

	render() {

		// return (
		// 	<div className="App">
		// 		<Header/>
		// 		<AboutUs/>
		// 	</div>
		// )
		
		return (
			<div className="App">
				<Header />
				{this.state.show === "details" && (
					<Details bookDetail={this.state.currentDetails} />
				)}
				{
					this.state.show === "lekhakList" && <LekhakList /> //Change this route----------------------------------------
				}
				{this.state.show === "listing" && (
					<Listing
						setCurrentDetails={(book) =>
							this.setState({ currentDetails: book })
						}
					/>
				)}
			</div>
		);
	}
}

export default App;
