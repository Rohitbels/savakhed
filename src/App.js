import React, { Component } from "react";
import Listing from "./container/Listing";
import Details from "./components/details/Details";
import LekhakList from "./components/LekhakList/LekhakList"

// import { db } from "./firebase";

class App extends Component {
	constructor() {
		super();

		this.state = {
			show: "listing",
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
				this.setState({ show : "details" });
			} else if (currURL[1].includes("lekhakList")) {
				this.setState({ show : "lekhakList" });
			}
			else {
				this.setState({ show: "listing" });
			}
		}
	};

	render() {
		return (
			<div className="App">
				{this.state.show === "details" &&
						<Details bookName="The Alchemist" author="Paulo Coelho" year="2006"/>
				}
				{this.state.show === "lekhakList" &&
						<LekhakList />			//Change this route----------------------------------------
				}
				{this.state.show === "listing" &&
						<Listing />
				}
			</div>
		);
	}
}

export default App;
