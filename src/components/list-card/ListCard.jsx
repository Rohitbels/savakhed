import React from "react";
import "./listcard.css";
import bookimage from "./coming-soon.jpg";
import  '../loading/shimmer.css'
// import bookimage from "./book.png";
// import bookimage from "./book-image-not-available.png";

import mulakshare from "./../../container/listing/mulakshare";

const ListCard = ({ book, setCurrentDetails }) => {
	var language = "इंग्रजी";

	mulakshare.forEach((letter) => {
		if (book["pustakFullName"].includes(letter)) {
			language = "मराठी";
			return;
		}
	});

	return (
		<div className="card-container" onClick={() => setCurrentDetails(book)}>
			<img className="book-cover" src={bookimage} alt="book cover" />
			<a href={`#/details/${book["id"]}`}>
				<span className="book-title">{book["pustakFullName"]}</span>
				<span className="book-author">{book["lekhakFullName"]}</span>
				<div style={{ display: "flex" }}>
					<span className="book-category">
						{book["pustakPrakar"]}
					</span>
					<span className="book-language">{language}</span>
				</div>
			</a>
		</div>
	);
};

export default ListCard;
