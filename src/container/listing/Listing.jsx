import React, { Component } from "react";
import "./listing.css";
import InputSection from "../../components/input-section/InputSection";
import ListSection from "../../components/list-section/ListSection";
import { db } from "../../firebase";
import Loading from "../../components/loading/Loading"
import "../../components/list-section/listsection.css"

const chinha = [
	"्",
	"ा",
	"ि",
	"ी",
	"ु",
	"ू",
	"े",
	"ै",
	"ो",
	"ौ",
	"ं",
	"ॅ",
	"ॉ",
	"ः",
	"ृ",
];

class Listing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			searched: false,
			input: "",
			searchAgainst: "pustakName",
			results: [],
		};
	}

	search = (label, inputArray) => {
		this.setState({
			loading: true,
		});

		let secondaryLabel =
			label === "pustakName" ? "pustakFullName" : "lekhakFullName";

		db.collection("bookList")
			.where(secondaryLabel, "==", inputArray.join(" "))
			.get()
			.then((snapshot) => {
				let array = [];

				snapshot.forEach((doc) => {
					let book = doc.data();
					array.push({ ...book, id: doc.id });
				});

				this.setState({
					results: array,
					loading: false,
				});
				this.props.setParentState({ results: array });
				if (this.state.results.length === 0) {
					db.collection("bookList")
						.where(label, "array-contains-any", inputArray)
						.get()
						.then((snapshot) => {
							let primary = [];
							let secondary = [];

							snapshot.forEach((doc) => {
								let book = doc.data();

								if (
									this.getMulakshara(inputArray) ===
									this.getMulakshara(book[label])
								) {
									primary.push({ ...book, id: doc.id });
								} else {
									secondary.push({ ...book, id: doc.id });
								}
							});
							const _tempResult = [...primary, ...secondary];
							this.setState({
								loading: false,
							});
							this.props.setParentState({ results: _tempResult });

							if (_tempResult.length === 0) {
								if (label === "pustakName") {
									secondaryLabel = "pustakMulakshare";
								} else {
									secondaryLabel = "lekhakMulakshare";
								}

								db.collection("bookList")
									.where(
										secondaryLabel,
										"array-contains-any",
										this.getMulakshara(inputArray).split(
											" "
										)
									)
									.get()
									.then((snapshot) => {
										let primary = [];
										let secondary = [];

										snapshot.forEach((doc) => {
											let book = doc.data();

											if (
												this.getMulakshara(
													inputArray
												) ===
												this.getMulakshara(book[label])
											) {
												primary.push({
													...book,
													id: doc.id,
												});
											} else {
												secondary.push({
													...book,
													id: doc.id,
												});
											}
										});

										const _tempResult = [...primary, ...secondary];
										this.setState({
											loading: false,
										});
										this.props.setParentState({ results: _tempResult });

									})
									.catch((error) => console.error(error));
							}
						})
						.catch((error) => console.error(error));
				}
			})
			.catch((error) => console.error(error));
	};

	getMulakshara = (inputArray) => {
		let superArray = [];

		inputArray.forEach((word) => {
			chinha.forEach((chinh) => {
				word = word.replace(new RegExp(chinh, "g"), "");
			});
			superArray.push(word);
		});

		return superArray.join(" ");
	};

	fetchResults = (event) => {
		event.preventDefault();
		const { input } = this.props;
		if (input.length) {
			this.setState({ searched: true });
			this.props.setParentState({ results: [], searched: true });
			let inputArray = input.split(" ");

			// reducing the array to max length 10
			if (inputArray.length > 10) {
				inputArray.splice(9, inputArray.length - 10);
			}

			this.search(this.state.searchAgainst, inputArray);
		} else {
			this.setState({ searched: false });
			this.props.setParentState({ results: [], searched: false });
		}
	};

	render() {
		return (
			<div className="container">
				<div className="logo">
					सार्वजनिक वाचनालय <br /> राजगुरूनगर
				</div>
				<InputSection
					onInput={(event) =>
						this.props.setParentState({
							input: event.target.value.toLowerCase(),
						})
					}
					inputValue={this.props.input}
					searchAgainst={this.state.searchAgainst}
					onChange={(event) =>
						this.setState({
							searchAgainst: event.target.value,
						})
					}
					onSearch={(event) => this.fetchResults(event)}
				/>
				{this.state.loading ? <div className="table-super"><Loading page="listing"/></div>: null}
				<ListSection
					setCurrentDetails={this.props.setCurrentDetails}
					tableElements={this.props.results}
					searched={this.state.searched || (this.props.input && this.props.results.length)}
				/>
			</div>
		);
	}
}

export default Listing;
