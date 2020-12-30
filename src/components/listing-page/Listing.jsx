import React, { Component, useState } from "react";
import "./listing.css";
import ReactDOM from "react-dom";
import book_details from "./book_detail";
import ListingFragment from "./ListingFragment";

class Listing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			input: "",
		};
	}

	filterTable = () => {
		let tableElements = "";
		document.querySelector(".container").style.justifyContent = "center";
		
		if (this.state.input.length > 0) {
			document.querySelector(".container").style.justifyContent =
				"flex-start";
			tableElements = (
				<div className="book-not-found">
					<h3>No such book available</h3>
					<h5>
						Tip: Try searching for keywords matching the book name
						or author name
					</h5>
				</div>
			);
			const tableHeaders = Object.keys(book_details[0]);

			let matching_books = book_details.filter((book) => {
				return (
					book.author
						.toLowerCase()
						.includes(this.state.input.toLowerCase()) ||
					book["bookname"]
						.toLowerCase()
						.includes(this.state.input.toLowerCase())
				);
			});

			if (matching_books.length > 0) {
			tableElements = matching_books.map((book, index) => (
									<ListingFragment bookDetails={book}/>
			))}
		}

		ReactDOM.render(<>{tableElements}</>, document.querySelector(".table"));
	};

	render() {
		return (
			<div className="container">
				<form className="form">
					<input
						className="search-bar"
						type="text"
						placeholder="Search by Book name / Author name"
						onInput={(event) => {
							this.setState({ input: event.target.value });
						}}
					/>
					<button
						className="search-button"
						type="submit"
						onClick={(event) => {
							event.preventDefault();
							this.filterTable();
						}}
					>
						Search
					</button>
				</form>
				<div className="table"></div>
			</div>
		);
	}
}

export default Listing;
