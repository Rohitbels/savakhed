import React, { Component } from "react";
import Listing from "./container/Listing";
import Details from "./components/details/Details";

class App extends Component {
	constructor() {
		super();

		this.state = {
			showListing: true,
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
				this.setState({ showListing: false });
			} else {
				this.setState({ showListing: true });
			}
		}
	};

	render() {
		return (
			<div className="App">
				{this.state.showListing ? <Listing /> : <Details />}
			</div>
		);
	}
}

export default App;
