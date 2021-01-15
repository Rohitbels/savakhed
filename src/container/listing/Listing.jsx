import React, { Component } from "react";
import "./listing.css";
import InputSection from "../../components/input-section/InputSection";
import ListSection from "../../components/list-section/ListSection";
import { db } from "../../firebase";

import levenshteinDistance from "./levenshtein";

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

let mainString = "";

class Listing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searched: false,
			input: "",
			searchAgainst: "lekhak",
			tableHeaders: ["Dakhal-ID", "Vibhag-ID", "Book", "Author"],
			results: [],
		};
	}

	search = (label, inputArray) => {
		this.setState({
			loading: true,
		});

		db.collection("bookList")
			.where(label, "array-contains-any", inputArray)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					let book = doc.data();

					this.getMulakshara(book[this.state.searchAgainst]);

					const distance = levenshteinDistance(
						mainString,
						book[this.state.searchAgainst]
					);

					this.setState({
						results: this.state.results.concat([
							{ ...book, id: doc.id, distance },
						]),
					});
				});

				this.setState({
					loading: false,
				});
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

		mainString = superArray.join(" ");
		// console.log(superArray);
	};

	fetchResults = (event) => {
		event.preventDefault();

		if (this.state.input.length) {
			this.setState({ results: [], searched: true });
			let inputArray = this.state.input.split(" ");

			// reducing the array to max length 10
			if (inputArray.length > 10) {
				inputArray.splice(9, inputArray.length - 10);
			}

			this.search(this.state.searchAgainst, inputArray);
		} else {
			this.setState({ results: [], searched: false });
		}
	};

	render() {
		return (
			<div className="container">
				<div>
					{console.log(
						this.state.results.sort((first, second) => {
							if (first.distance < second.distance) return -1;
							if (first.distance > second.distance) return 1;
							return 0;
						})
					)}
					<InputSection
						onInput={(event) =>
							this.setState({
								input: event.target.value.toLowerCase().trim(),
							})
						}
						searchAgainst={this.state.searchAgainst}
						onChange={(event) =>
							this.setState({
								searchAgainst: event.target.value,
							})
						}
						onSearch={(event) => this.fetchResults(event)}
					/>
					<ListSection
						setCurrentDetails={this.props.setCurrentDetails}
						tableHeaders={this.state.tableHeaders}
						tableElements={this.state.results}
						searched={this.state.searched}
					/>
				</div>
			</div>
		);
	}
}

export default Listing;
