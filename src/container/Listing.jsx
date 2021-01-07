import React, { Component } from "react";
import "./listing.css";
import book_details from "./BookDetails";
import InputSection from "../components/input-section/InputSection";
import ListSection from "../components/list-section/ListSection";

class Listing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			seachString: "",
			searched: false,
			tableHeaders: ["id", "vibhag id", "bookName", "author"],
			matching_books: [],
			isSearching: false,
			containerClass: "",
		};

		this.filterTable = this.filterTable.bind(this);
	}

	filterTable = (event) => {
		event.preventDefault();
		const { seachString } = this.state;
		if (seachString.length) {
			this.setState({
				searched: true,
				matching_books: book_details.filter(
					({ author, bookName }) =>
						author.toLowerCase().includes(seachString) ||
						bookName.toLowerCase().includes(seachString)
				),
			});
		} else {
			this.setState({ matching_books: [] });
		}
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
							onSearch={(event) => this.filterTable(event)}
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
								tableElements={this.state.matching_books}
							/>
						</div>
					) : null}
				</div>
			</>
		);
	}
}

export default Listing;
