import {React, useState, useEffect} from "react";
import "./listcard.css";
import bookimage from "./coming-soon.jpg";
import  '../loading/shimmer.css'
// import bookimage from "./book.png";
// import bookimage from "./book-image-not-available.png";

import mulakshare from "./../../container/listing/mulakshare";

const ListCard = ({ book, setCurrentDetails }) => {
	var language = "इंग्रजी";

	const [Img, setImg] = useState(bookimage)

	mulakshare.forEach((letter) => {
		if (book["pustakFullName"].includes(letter)) {
			language = "मराठी";
			return;
		}
	});

	const getImgURL = (q) => {

		const xhr = new XMLHttpRequest();
		let url = ""
		console.log(book);
		// get a callback when the server responds
		xhr.addEventListener("load", () => {
			const json = JSON.parse(xhr.responseText)
			const {items = []} = json
			// console.log(items[0].image.thumbnailLink);
			try {

				url = items[0].image.thumbnailLink
				// SetImg(items[0].image.thumbnailLink)
				console.log(url);
				setImg(url)
				// return items[0].image.thumbnailLink

			} catch (error) {
				console.log(error);
			}
			
		});
		xhr.open(
			"GET",
			`https://customsearch.googleapis.com/customsearch/v1/siterestrict?searchType=image&cx=b322c10bd42a76344&q=${encodeURI(q)}&key=AIzaSyB1TtjgdaS-JyFVHFmWz_OMXhg8ft5Tbpw`
		);
		xhr.send();
		// return url
	}

	useEffect(() => {
		getImgURL(book["pustakFullName"] + book["lekhakFullName"])
		return () => {
			
		}
	}, [])

	return (
		<div className="card-container" onClick={() => setCurrentDetails(book)}>
			<img className="book-cover" src={Img} alt="book cover" />
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
