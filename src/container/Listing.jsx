import React, { Component } from "react";
import "./listing.css";
import book_details from "./BookDetails";
import InputSection from "../components/input-section/InputSection";
import ListSection from "../components/list-section/ListSection";

class Listing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			input: "",
			tableHeaders: [],
			matching_books: [],
		};

		this.filterTable = this.filterTable.bind(this);
	}

	filterTable = (event) => {
		event.preventDefault();
		document.querySelector(".container").style.placeItems = "center";

		if (this.state.input.length > 0) {
			document.querySelector(".container").style.placeItems =
				"flex-start center";
			this.setState({ tableHeaders: Object.keys(book_details[0]) });
			this.setState({
				matching_books: book_details.filter((book) => {
					return (
						book.author
							.toLowerCase()
							.includes(this.state.input.toLowerCase()) ||
						book["book name"]
							.toLowerCase()
							.includes(this.state.input.toLowerCase())
					);
				}),
			});
		} else {
			this.setState({ tableHeaders: [] });
			this.setState({ matching_books: [] });
		}
	};

	render() {
		return (
			<div className="container">
				<div>
					<InputSection
						onInput={(event) =>
							this.setState({ input: event.target.value })
						}
						onSearch={(event) => this.filterTable(event)}
					/>
					<ListSection
						tableHeaders={this.state.tableHeaders}
						tableElements={this.state.matching_books}
					/>
				</div>
			</div>
		);
	}
}

export default Listing;
