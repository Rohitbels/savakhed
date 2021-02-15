import { React, useState, useEffect, Component } from "react";
import "./listcard.css";
import bookimage from "./coming-soon.jpg";
import "../loading/shimmer.css";
import { storage, db } from "../../firebase";

// import bookimage from "./book.png";
// import bookimage from "./book-image-not-available.png";

import mulakshare from "./../../container/listing/mulakshare";

const ListCard = ({ book, setCurrentDetails }) => {
	var language = "इंग्रजी";

	const API_KEY = "AIzaSyB1TtjgdaS-JyFVHFmWz_OMXhg8ft5Tbpw";
	const AUTHORS_ENGINE = "af35ce6be8762aee9";
	const BOOKS_ENGINE = "b322c10bd42a76344";

	const [Img, setImg] = useState(bookimage);
	const storageRef = storage.ref();

	mulakshare.forEach((letter) => {
		if (book["pustakFullName"].includes(letter)) {
			language = "मराठी";
			return;
		}
	});

	const update = async (url) => {
		const docRef = (
			await db
				.collection("bookList")
				.where("dakhalId", "==", book["dakhalId"])
				.get()
		).docs[0].id;
		// console.log(docRef);
		const docUpdate = await db
			.collection("bookList")
			.doc(docRef)
			.update({ imageURL: url });
	};

	const upload = (file, filename) => {
		var metadata = {
			contentType: "image/jpg",
		};
		let uploadTask = storageRef
			.child(`book-covers/${filename.replaceAll(" ", "_")}`)
			.put(file, metadata);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				// console.log(progress);
			},
			(error) => {
				console.log(error);
			},
			() => {
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					// update(downloadURL)
					console.log("File available at", downloadURL);
					update(downloadURL);
				});
			}
		);
	};

	const downloadFile = (url, filename) => {
		var xhr = new XMLHttpRequest();
		xhr.responseType = "blob";
		xhr.onload = function () {
			console.log(xhr.response);
			upload(xhr.response, filename);
		};
		xhr.open("GET", url);
		xhr.send();
	};

	const getImgURL = (q) => {
		const xhr = new XMLHttpRequest();
		let url = "";
		// console.log(book);
		xhr.addEventListener("load", () => {
			const json = JSON.parse(xhr.responseText);
			const { items = [] } = json;
			try {
				url = items[0].image.thumbnailLink;
				console.log("URL result : ", url);
				downloadFile(url, q);
				setImg(url);
			} catch (error) {
				console.log("image set to default");
				setImg(bookimage);
				console.log(error);
			}
		});
		xhr.open(
			"GET",
			`https://customsearch.googleapis.com/customsearch/v1/siterestrict?searchType=image&cx=${BOOKS_ENGINE}&q=${encodeURI(
				q
			)}&key=${API_KEY}`
		);
		xhr.send();
		// return url
	};

	useEffect(() => {
		if (book["imageURL"]) {
			console.log("Image URL found in database !!");
			setImg(book["imageURL"]);
		} else {
			console.log("No image URL in database !!");
			console.log(
				"searching for ",
				book["pustakNameEnglish"].join(" ") +
					" " +
					book["lekhakNameEnglish"].join(" ")
			);
			getImgURL(
				book["pustakNameEnglish"].join(" ") +
					" " +
					book["lekhakNameEnglish"].join(" ")
			);
		}
		return () => {
			setImg(null);
		};
	}, []);

	//book["imageURL"] ? book["imageURL"] : Img ? bookimage : Img
	return (
		<div className='card-container' onClick={() => setCurrentDetails(book)}>
			<img className='book-cover' src={Img} alt='book cover' />
			<a href={`#/details/${book["id"]}`}>
				<span className='book-title'>{book["pustakFullName"]}</span>
				<span className='book-author'>{book["lekhakFullName"]}</span>
				<div style={{ display: "flex" }}>
					<span className='book-category'>{book["pustakPrakar"]}</span>
					<span className='book-language'>{language}</span>
				</div>
			</a>
		</div>
	);
};

export default ListCard;
