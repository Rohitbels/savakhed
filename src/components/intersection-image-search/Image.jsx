import React, { useRef, useState, useEffect } from "react";
import { storage, collection } from "../../firebase";
import useVisibility from "./useVisibility";
import bookimage from "./coming-soon.jpg";

function Image({ type, alt, book, setCurrentDetails, ...props }) {
	const [inView, setInView] = useState(false);
	const imgRef = useRef(null);
	const [Img, setImg] = useState(bookimage);

	const API_KEY = "AIzaSyB1TtjgdaS-JyFVHFmWz_OMXhg8ft5Tbpw";
	const AUTHORS_ENGINE = "af35ce6be8762aee9";
	const BOOKS_ENGINE = "b322c10bd42a76344";

	const SEARCH_ENGINE = type === "author" ? AUTHORS_ENGINE : BOOKS_ENGINE;
	const STORAGE_LOCATION = type === "author" ? "author" : "book-covers";
	const storageRef = storage.ref();




	const update = async (url) => {
		const docRef = (
			await collection.where("dakhalId", "==", book["dakhalId"]).get()
		).docs[0].id;
		await collection
			.doc(docRef)
			.update({ imageURL: url });
	};

	const upload = (file, filename) => {
		var metadata = {
			contentType: "image/jpg",
		};
		let uploadTask = storageRef
			.child(`${STORAGE_LOCATION}/${filename.replaceAll(" ", "_")}`)
			.put(file, metadata);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				var progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log(progress)
			},
			(error) => {
				console.log(error);
			},
			() => {
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
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

		let url = "";
		fetch(`https://www.googleapis.com/customsearch/v1/siterestrict?cx=${SEARCH_ENGINE}&q=${encodeURI(
			q
		)}&key=${API_KEY}`, {mode: 'cors'}).then((resp)=>(resp.json())).then((json)=>{

			const { items = [] } = json;
			if(!items.length) {
				return;
			}
			try {
				// url = items[0].image.thumbnailLink;
				url = items[0].pagemap.cse_thumbnail[0].src
				console.log("URL result : ", url);
				downloadFile(url, q);
				setCurrentDetails({...book, imageURL: url})
				setImg(url);
			} catch (error) {
				console.log("image set to default");
				setImg(bookimage);
				console.log(error);
			}
		}).catch((error)=>{
			console.log("image set to default");
				setImg(bookimage);
				console.log(error);
		})
		// const xhr = new XMLHttpRequest();
		// let url = "";
		// xhr.addEventListener("load", () => {
		// 	const json = JSON.parse(xhr.responseText);
		// 	const { items = [] } = json;
		// 	try {
		// 		// url = items[0].image.thumbnailLink;
		// 		url = items[0].pagemap.cse_thumbnail[0].src
		// 		console.log("URL result : ", url);
		// 		downloadFile(url, q);
		// 		setImg(url);
		// 	} catch (error) {
		// 		console.log("image set to default");
		// 		setImg(bookimage);
		// 		console.log(error);
		// 	}
		// });
		// xhr.open(
		// 	"GET",
		// 	`https://www.googleapis.com/customsearch/v1?cx=${SEARCH_ENGINE}&q=${encodeURI(
		// 		q
		// 	)}&key=${API_KEY}`
		// );
		// xhr.send();
	};


	useVisibility(imgRef, () => {
		setInView(true);
		if (book !== undefined) {
			if (book["imageURL"]) {
				console.log("1");
				setImg(book["imageURL"]);
			} else {
				console.log("2");
				console.log(
					"searching for ",
					book["pustakName"].join(" ") +
						" " +
						book["lekhak"].join(" ")
				);
				// getImgURL(
				// 	book["pustakName"].join(" ") +
				// 		" " +
				// 		book["lekhak"].join(" ")
				// );
			}
			return () => {};
		}
	});

	return (
		<div className="image-div" ref={imgRef}>
			{inView && Img ? <img alt={alt} src={Img} {...props} /> : <div className="book-cover shine"  > </div>}
		</div>
	);
}

export default Image;
