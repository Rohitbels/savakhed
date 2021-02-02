import React, { Component } from "react";
import "./listing.css";
import InputSection from "../../components/input-section/InputSection";
import ListSection from "../../components/list-section/ListSection";
import { db } from "../../firebase";
import Loading from "../../components/loading/Loading";
import "../../components/list-section/listsection.css";

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
			prakar: "",
		};
	}

	search = (label, inputArray) => {
		this.setState({
			loading: true,
		});

		if (label === "pustakPrakar") {
			this.setState({
				searched: true,
				input: inputArray.join(" "),
			});

			db.collection("bookList")
				.where(label, "==", inputArray.join(" "))
				.get()
				.then((snapshot) => {
					let array = [];

					snapshot.forEach((doc) => {
						let book = doc.data();
						array.push({ ...book, id: doc.id });
					});

					this.props.setParentState({
						results: array,
					});

					this.setState({
						// results: array,
						loading: false,
					});
				});

			return;
		}

		let inputArrayMulakshare = this.getMulakshara(inputArray);
		let bookParameterMulakshare = "";

		let secondaryLabel =
			label === "pustakName" ? "pustakFullName" : "lekhakFullName";

		db.collection("bookList")
			.where(secondaryLabel, "==", inputArray.join(" "))
			.get()
			.then((snapshot) => {
				let firstArray = [];

				snapshot.forEach((doc) => {
					let book = doc.data();
					this.setState({
						results: this.state.results.concat({
							book,
							id: doc.id,
						}),
					});
					firstArray.push({ ...book, id: doc.id });
				});

				this.setState({
					results: firstArray,
					loading: false,
				});
				this.props.setParentState({ results: firstArray });

				if (firstArray.length === 0) {
					db.collection("bookList")
						.where(label, "array-contains-any", inputArray)
						.get()
						.then((snapshot) => {
							let secondArray = [];
							let primary = [];
							let secondary = [];

							snapshot.forEach((doc) => {
								let book = doc.data();
								bookParameterMulakshare = this.getMulakshara(
									book[label]
								);

								if (
									inputArrayMulakshare ===
									bookParameterMulakshare
								) {
									primary.push({ ...book, id: doc.id });
								} else {
									secondary.push({ ...book, id: doc.id });
								}
							});

							secondArray = [...primary, ...secondary];
							this.setState({
								results: secondArray,
								loading: false,
							});
							this.props.setParentState({ results: secondArray });

							if (secondArray.length === 0) {
								secondaryLabel =
									label === "pustakName"
										? "pustakMulakshare"
										: "lekhakMulakshare";

								let thirdArray = [];
								let primary = [];
								let secondary = [];

								db.collection("bookList")
									.where(
										secondaryLabel,
										"array-contains-any",
										inputArrayMulakshare.split(" ")
									)
									.get()
									.then((snapshot) => {
										snapshot.forEach((doc) => {
											let book = doc.data();
											bookParameterMulakshare = this.getMulakshara(
												book[label]
											);

											if (
												inputArrayMulakshare ===
												bookParameterMulakshare
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
										thirdArray = [...primary, ...secondary];

										this.setState({
											results: thirdArray,
											loading: false,
										});
										this.props.setParentState({
											results: thirdArray,
										});
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

			this.search("pustakName", inputArray);
			setTimeout(() => {
				if (this.state.results.length === 0) {
					this.search("lekhak", inputArray);
				}
			}, 1000);
		} else {
			this.setState({ searched: false });
			this.props.setParentState({ results: [], searched: false });
		}
	};

	render() {
		return (
			<div className="container">
				<div className="logo">सार्वजनिक वाचनालय राजगुरूनगर</div>
				<InputSection
					onInput={(event) =>
						this.props.setParentState({
							input: event.target.value.toLowerCase(),
						})
					}
					inputValue={this.props.input}
					onSearch={(event) => this.fetchResults(event)}
				/>
				{this.state.loading ? (
					<div className="table-super">
						<Loading page="listing" />
					</div>
				) : null}
				<h1>{this.state.prakar}</h1>
				{console.log(this.state.loading)}
				{console.log("results: ", this.state.results)}
				<ListSection
					setCurrentDetails={this.props.setCurrentDetails}
					tableElements={this.props.results}
					searched={
						this.state.searched ||
						(this.props.input && this.state.results.length)
					}
					bookType={this.search}
				/>
			</div>
		);
	}
}

export default Listing;
