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
			query: null,
			lastDoc: null,
		};
	}

	search = async (label, inputArray) => {
		this.setState({
			loading: true,
		});

		let inputArrayMulakshare = this.getMulakshara(inputArray);
		let bookParameterMulakshare = "";

		let secondaryLabel =
			label === "pustakName" ? "pustakFullName" : "lekhakFullName";

		let query =
			this.state.prakar === ""
				? db
						.collection("bookList")
						.where(secondaryLabel, "==", inputArray.join(" "))
				: db
						.collection("bookList")
						.where("pustakPrakar", "==", this.state.prakar)
						.where(secondaryLabel, "==", inputArray.join(" "));

		this.setState({
			query: query,
		});

		const first = await query.get();
		let array = [];

		first.forEach((doc) => {
			let book = doc.data();
			array.push({ ...book, id: doc.id });
		});

		if (array.length === 0) {
			query =
				this.state.prakar === ""
					? db
							.collection("bookList")
							.where(label, "array-contains-any", inputArray)
					: db
							.collection("bookList")
							.where("pustakPrakar", "==", this.state.prakar)
							.where(label, "array-contains-any", inputArray);

			this.setState({
				query: query,
			});

			const second = await query.get();

			let primary = [];
			let secondary = [];

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
				this.state.prakar === ""
					? db
							.collection("bookList")
							.where(
								secondaryLabel,
								"array-contains-any",
								inputArrayMulakshare.split(" ")
							)
					: db
							.collection("bookList")
							.where("pustakPrakar", "==", this.state.prakar)
							.where(
								secondaryLabel,
								"array-contains-any",
								inputArrayMulakshare.split(" ")
							);

			this.setState({
				query: query,
			});

			const third = await query.get();

			let primary = [];
			let secondary = [];

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

	fetchMoreResults = () => {};

	fetchResults = async (event) => {
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

			var searchSuccess = await this.search("pustakName", inputArray);
			if (!searchSuccess) {
				searchSuccess = await this.search("lekhak", inputArray);
			}
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
					bookType={this.state.prakar}
					setBookType={(prakar) => this.setState({ prakar: prakar })}
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
						this.state.searched ||
						(this.props.input && this.state.results.length)
					}
					setBookType={(prakar) => this.setState({ prakar: prakar })}
					bookType={this.state.prakar}
				/>
			</div>
		);
	}
}

export default Listing;
