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
			input: "",
			searchAgainst: "pustakName",
			results: [],
			query: null,
			lastDoc: null,
		};

		const oldScrollTop = 0;
	}

	componentDidMount() {
		window.onscroll = async () => {
			if (window.scrollY > this.oldScrollTop) {
				let windowHeight = window.innerHeight + window.scrollY;
				let documentOffset = (document.body.offsetHeight * 9) / 10;

				if (windowHeight > documentOffset) {
					this.fetchMoreResults();
				}
			}
			this.oldScrollTop = window.scrollY;
		};
	}

	search = async (label, inputArray) => {
		this.setState({
			loading: true,
		});

		let query = null;
		let array = [];

		if (label === "pustakPrakar") {
			this.props.setParentState({
				searched: true,
			});

			query = db
				.collection("bookList")
				.where(label, "==", inputArray.join(" "));

			let filteredResults = await query.limit(2).get();

			this.setState({
				input: inputArray.join(" "),
				query: query,
				lastDoc: filteredResults.docs[filteredResults.docs.length - 1],
			});

			filteredResults.forEach((doc) => {
				let book = doc.data();
				array.push({ ...book, id: doc.id });
			});

			this.props.setParentState({
				results: array,
			});

			this.setState({
				loading: false,
			});

			return;
		}

		let inputArrayMulakshare = this.getMulakshara(inputArray);
		let bookParameterMulakshare = "";

		let secondaryLabel =
			label === "pustakName" ? "pustakFullName" : "lekhakFullName";

		query =
			this.props.prakar === ""
				? db
						.collection("bookList")
						.where(secondaryLabel, "==", inputArray.join(" "))
				: db
						.collection("bookList")
						.where("pustakPrakar", "==", this.props.prakar)
						.where(secondaryLabel, "==", inputArray.join(" "));

		const first = await query.limit(2).get();

		this.setState({
			query: query,
			lastDoc: first.docs[first.docs.length - 1],
		});

		first.forEach((doc) => {
			let book = doc.data();
			array.push({ ...book, id: doc.id });
		});

		if (array.length === 0) {
			query =
				this.props.prakar === ""
					? db
							.collection("bookList")
							.where(label, "array-contains-any", inputArray)
					: db
							.collection("bookList")
							.where("pustakPrakar", "==", this.props.prakar)
							.where(label, "array-contains-any", inputArray);

			const second = await query.limit(2).get();

			let primary = [];
			let secondary = [];

			this.setState({
				query: query,
				lastDoc: second.docs[second.docs.length - 1],
			});

			second.forEach((doc) => {
				let book = doc.data();
				bookParameterMulakshare = this.getMulakshara(book[label]);

				if (inputArrayMulakshare === bookParameterMulakshare) {
					primary.push({ ...book, id: doc.id });
				} else {
					secondary.push({ ...book, id: doc.id });
				}
			});

			array = [...primary, ...secondary];
		}

		if (array.length === 0) {
			secondaryLabel =
				label === "pustakName"
					? "pustakMulakshare"
					: "lekhakMulakshare";

			query =
				this.props.prakar === ""
					? db
							.collection("bookList")
							.where(
								secondaryLabel,
								"array-contains-any",
								inputArrayMulakshare.split(" ")
							)
					: db
							.collection("bookList")
							.where("pustakPrakar", "==", this.props.prakar)
							.where(
								secondaryLabel,
								"array-contains-any",
								inputArrayMulakshare.split(" ")
							);

			const third = await query.limit(2).get();

			let primary = [];
			let secondary = [];

			this.setState({
				query: query,
				lastDoc: third.docs[third.docs.length - 1],
			});

			third.forEach((doc) => {
				let book = doc.data();
				bookParameterMulakshare = this.getMulakshara(book[label]);

				if (inputArrayMulakshare === bookParameterMulakshare) {
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
			array = [...primary, ...secondary];
		}

		this.setState({
			results: array,
			loading: false,
		});

		this.props.setParentState({
			results: array,
		});

		return array.length;
	};

	fetchMoreResults = async () => {
		if (this.state.query && this.state.lastDoc) {
			let myQuery = this.state.query;
			let myLastDoc = this.state.lastDoc;

			let moreResults = await myQuery
				.startAfter(myLastDoc)
				.limit(2)
				.get();

			let array = [];

			moreResults.docs.forEach((doc) => {
				if (
					moreResults.docs[moreResults.docs.length - 1]["id"] !==
					this.state.lastDoc["id"]
				) {
					let book = doc.data();
					array.push({
						...book,
						id: doc.id,
					});
				}
			});

			if (array.length) {
				this.props.setParentState({
					results: [...this.props.results, ...array],
				});

				this.setState({
					lastDoc: moreResults.docs[moreResults.docs.length - 1],
				});
			}
		}
	};

	fetchResults = async (event) => {
		event.preventDefault();
		const { input } = this.props;
		if (input.length) {
			this.props.setParentState({ results: [], searched: true });
			let inputArray = input.split(" ");

			// reducing the array to max length 10
			if (inputArray.length > 10) {
				inputArray.splice(9, inputArray.length - 10);
			}

			var searchSuccess = await this.search("pustakName", inputArray);
			if (!searchSuccess) {
				searchSuccess = await this.search("lekhak", inputArray);
			}
		} else {
			this.props.setParentState({ results: [], searched: false });
		}
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

	render() {
		return (
			<div className="container">
				<div className="logo">
					<span id="name">सार्वजनिक वाचनालय</span>
					<br />
					<span id="place">राजगुरूनगर</span>
				</div>
				<InputSection
					onInput={(event) =>
						this.props.setParentState({
							input: event.target.value.toLowerCase(),
						})
					}
					inputValue={this.props.input}
					onSearch={(event) => this.fetchResults(event)}
					bookType={this.props.prakar}
					setBookType={(prakar) => {
						this.props.setParentState({
							prakar: prakar,
							searched: false,
						});
					}}
				/>
				{this.state.loading ? (
					<div className="table-super">
						<Loading page="listing" />
					</div>
				) : null}
				<ListSection
					setCurrentDetails={this.props.setCurrentDetails}
					tableElements={this.props.results}
					searched={
						this.props.searched ||
						(this.props.input && this.state.results.length)
					}
					setBookType={(prakar) =>
						this.props.setParentState({ prakar: prakar })
					}
					bookType={this.props.prakar}
					searchFilter={this.search}
				/>
			</div>
		);
	}
}

export default Listing;
