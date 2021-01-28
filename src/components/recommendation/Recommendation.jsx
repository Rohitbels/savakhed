import React, { useEffect, useState } from "react";
import ListSection from "../list-section/ListSection";
import { db } from "../../firebase";

function Recommendation() {
	const tableHeaders = ["Dakhal-ID", "Vibhag-ID", "Book", "Author"];
	const [results, setResults] = useState([]);
	const [searched, setSearched] = useState(false);

	const getResults = () => {
		let day = new Date().getUTCDate();

		db.collection("bookList")
			.orderBy("dakhalId", "asc")
			.get()
			.then((snapshot) => {
				var slotSize = snapshot.size / 365;
				var firstSlot = Math.floor((day - 1) * slotSize);
				var secondSlot = Math.ceil(day * slotSize);

				for (var i = firstSlot; i <= secondSlot; i++) {
					let book = snapshot.docs[i].data();
					results.push({ ...book, id: snapshot.docs[i].id });
				}

				console.log(results);
				setSearched(true);
			});
	};

	useEffect(() => {
		getResults();
	});

	return (
		<div className="container">
			<ListSection
				tableHeaders={tableHeaders}
				tableElements={results}
				searched={searched}
				setCurrentDetails={(book) => console.log(book)}
			/>
		</div>
	);
}

export default Recommendation;
