import React, { Component } from "react";
import Listing from "./container/Listing";
import Details from "./components/details/Details";
// import { db } from "./firebase";

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

		// db.collection("bookList")
		// 	.get()
		// 	.then((snapshot) => {
		// 		let bookList = [];
		// 		snapshot.forEach((doc) => {
		// 			const data = doc.data();
		// 			bookList.push(data);
		// 		});
		// 		console.log(
		// 			bookList.map((book) => {
		// 				console.log(book["pustakName"]);
		// 			})
		// 		);
		// 	})
		// 	.catch((error) => console.error(error));
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
