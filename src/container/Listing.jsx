import React, { Component } from "react";
import "./listing.css";
import InputSection from "../components/input-section/InputSection";
import ListSection from "../components/list-section/ListSection";
import { db } from "./../firebase";

class Listing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searched: false,
			isSearching: false,
			containerClass: "",
			input: "",
			tableHeaders: [],
			results: [],
		};
	}

	fetchResults = (event) => {
		event.preventDefault();
		document.querySelector(".container").style.placeItems = "center";

		if (this.state.input.length > 0) {
			document.querySelector(".container").style.placeItems =
				"flex-start center";

			this.setState({ tableHeaders: [], results: [], searched: true });

			let commonWords = ["for", "the", "of", "a"];
			let inputArray = this.state.input.toLowerCase().split(" ");

			commonWords.forEach((word) => {
				inputArray = inputArray.filter((item) => item !== word);
			});

			// sorting input-array in descending order
			inputArray.sort(
				(firstString, secondString) =>
					-(firstString.length > secondString.length) ||
					+(firstString.length < secondString.length)
			);

			// reducing the array to max length 10
			if (inputArray.length > 10) {
				let length = inputArray.length;
				inputArray.splice(9, length - 10);
			}

			// query for book name
			db.collection("bookList")
				.where("pustakNameEnglish", "array-contains-any", inputArray)
				.get()
				.then((snapshot) => {
					snapshot.forEach((doc) => {
						this.setState({
							results: this.state.results.concat([doc.data()]),
						});
					});

					this.setState({
						tableHeaders: [
							"Dakhal-ID",
							"Vibhag-ID",
							"Book",
							"Author",
						],
					});
				})
				.catch((error) => console.error(error));

			// query for author name
			db.collection("bookList")
				.where("lekhakNameEnglish", "array-contains-any", inputArray)
				.get()
				.then((snapshot) => {
					snapshot.forEach((doc) => {
						this.setState({
							results: this.state.results.concat([doc.data()]),
						});
					});

					this.setState({
						tableHeaders: [
							"Dakhal-ID",
							"Vibhag-ID",
							"Book",
							"Author",
						],
					});
				})
				.catch((error) => console.error(error));
		} else {
			this.setState({ tableHeaders: [], results: [] });
		}
	};

	logger = (array) => {
		console.log(array);
	};

	render() {
		const { searched } = this.state;
		return (
			<>
				<div className={`container ${searched ? "searching" : ""}`}>
					<div
						className={`input-box m-auto ${
							searched ? "searching" : ""
						}`}
					>
						<div className="logo">
							सार्वजनिक वाचनालय <br /> राजगुरूनगर
						</div>
						<InputSection
							onInput={(event) =>
								this.setState({
									seachString: event.target.value.toLowerCase(),
								})
							}
							onSearch={(event) => this.fetchResults(event)}
						/>
					</div>
					{searched ? (
						<div
							className={`search-table m-auto ${
								searched ? "searching" : ""
							}`}
						>
							<ListSection
								tableHeaders={this.state.tableHeaders}
								tableElements={this.state.results}
							/>
						</div>
					) : null}
				</div>
			</>
		);
	}
}

export default Listing;
