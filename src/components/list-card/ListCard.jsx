import { React, useState, useEffect } from "react";
import "./listcard.css";
import bookimage from "./coming-soon.jpg";
import { storage, collection } from "../../firebase";
import "../loading/shimmer.css";
import Image from "../intersection-image-search/Image";

import mulakshare from "./../../container/listing/mulakshare";

const ListCard = ({ book, setCurrentDetails }) => {
	var language = "इंग्रजी";

	const [Img, setImg] = useState(bookimage);

	mulakshare.forEach((letter) => {
		if (book["pustakFullName"].includes(letter)) {
			language = "मराठी";
			return;
		}
	});

	const storageRef = storage.ref();

	const update = async (url) => {
		const docRef = (
			await collection.where("dakhalId", "==", book["dakhalId"]).get()
		).docs[0].id;
		const docUpdate = await collection
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
				var progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
		const xhr = new XMLHttpRequest();
		let url = "";
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
			`https://customsearch.googleapis.com/customsearch/v1/siterestrict?searchType=image&cx=b322c10bd42a76344&q=${encodeURI(
				q
			)}&key=AIzaSyB1TtjgdaS-JyFVHFmWz_OMXhg8ft5Tbpw`
		);
		xhr.send();
	};

	useEffect(() => {
		if (book["imageURL"]) {
			console.log("1");
			setImg(book["imageURL"]);
		} else {
			console.log("2");
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
		return () => {};
	}, []);

	return (
		<div className="card-container" onClick={() => setCurrentDetails(book)}>
			<Image className="book-cover" src={Img} alt="book cover" />
			<a
				href={`#/details/${book["id"]}`}
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-end",
				}}
			>
				<div style={{ marginBottom: "auto" }}>
					<span className="book-title">{book["pustakFullName"]}</span>
					<span className="book-author">
						{book["lekhakFullName"]}
					</span>
				</div>
				<div
					style={{
						display: "flex",
					}}
				>
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
