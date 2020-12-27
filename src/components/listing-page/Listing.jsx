import React, { useState } from "react";
import "./listing.css";

function Listing() {
	const book_details = [
		{
			id: "1",
			"vibhag id": "11",
			"book name": "The Alchemist",
			author: "Paulo Coelho",
		},
		{
			id: "2",
			"vibhag id": "22",
			"book name": "Yoga",
			author: "Swami Vivekananda",
		},
		{
			id: "3",
			"vibhag id": "33",
			"book name": "Lorem Ipsum is simply dummy text",
			author: "Lorem Ipsum",
		},
		{
			id: "4",
			"vibhag id": "44",
			"book name": "The Alchemist",
			author: "Paulo Coelho",
		},
		{
			id: "5",
			"vibhag id": "55",
			"book name": "Yoga",
			author: "Swami Vivekananda",
		},
		{
			id: "6",
			"vibhag id": "66",
			"book name": "Lorem Ipsum is simply dummy text",
			author: "Lorem Ipsum",
		},
		{
			id: "7",
			"vibhag id": "77",
			"book name": "The Alchemist",
			author: "Paulo Coelho",
		},
		{
			id: "8",
			"vibhag id": "88",
			"book name": "Yoga",
			author: "Swami Vivekananda",
		},
		{
			id: "9",
			"vibhag id": "99",
			"book name": "Lorem Ipsum is simply dummy text",
			author: "Lorem Ipsum",
		},
		{
			id: "1",
			"vibhag id": "11",
			"book name": "The Alchemist",
			author: "Paulo Coelho",
		},
		{
			id: "2",
			"vibhag id": "22",
			"book name": "Yoga",
			author: "Swami Vivekananda",
		},
		{
			id: "3",
			"vibhag id": "33",
			"book name": "Lorem Ipsum is simply dummy text",
			author: "Lorem Ipsum",
		},
		{
			id: "4",
			"vibhag id": "44",
			"book name": "The Alchemist",
			author: "Paulo Coelho",
		},
		{
			id: "5",
			"vibhag id": "55",
			"book name": "Yoga",
			author: "Swami Vivekananda",
		},
		{
			id: "6",
			"vibhag id": "66",
			"book name": "Lorem Ipsum is simply dummy text",
			author: "Lorem Ipsum",
		},
		{
			id: "7",
			"vibhag id": "77",
			"book name": "The Alchemist",
			author: "Paulo Coelho",
		},
		{
			id: "8",
			"vibhag id": "88",
			"book name": "Yoga",
			author: "Swami Vivekananda",
		},
		{
			id: "9",
			"vibhag id": "99",
			"book name": "Lorem Ipsum is simply dummy text",
			author: "Lorem Ipsum",
		},
	];

	const [input, setInput] = useState("");
	const [table, setTable] = useState(null);

	const filterTable = () => {
		if (input.length > 0) {
			let tableElements;
			const tableHeaders = Object.keys(book_details[0]);

			let matching_books = book_details.filter((book) => {
				return (
					book.author.toLowerCase().includes(input.toLowerCase()) ||
					book["book name"]
						.toLowerCase()
						.includes(input.toLowerCase())
				);
			});

			if (matching_books.length > 0) {
				tableElements = (
					<div className="table-super">
					<table>
						<thead>
							<tr>
								{tableHeaders.map((header, index) => (
									<th key={index}>{header}</th>
								))}
							</tr>
						</thead>

						<tbody>
							{matching_books.map((book, index) => (
								<tr key={index}>
									<td>{book["id"]}</td>
									<td>{book["vibhag id"]}</td>
									<td>{book["book name"]}</td>
									<td>{book["author"]}</td>
								</tr>
							))}
						</tbody>
					</table>
					</div>
				);
			} else {
				tableElements = (
					<div className="book-not-found">
						<h3>No such book available</h3>
						<h5>
							Tip: Try searching for keywords matching the book
							name or author name
						</h5>
					</div>
				);
			}

			return tableElements;
		}
	};

	return (
		<div className="container">
			<form className="form">
				<input
					className="search-bar"
					type="text"
					placeholder="Search by Book name / Author name"
					onInput={(event) => {
						setInput(event.target.value);
					}}
				/>
				<button
					className="search-button"
					type="submit"
					onClick={(event) => {
						event.preventDefault();
						setTable(filterTable());
					}}
				>
					Search
				</button>
			</form>

			<div className="table">{table}</div>
		</div>
	);
}

export default Listing;
