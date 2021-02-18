import React, { useEffect, useState } from "react";
import ListSection from "../list-section/ListSection";
import { collection } from "../../firebase";

function Recommendation() {
	// eslint-disable-next-line
	const [results, setResults] = useState([]);
	const [searched, setSearched] = useState(false);

	const getResults = () => {
		let day = new Date().getUTCDate();

		collection
			.orderBy("dakhalId", "asc")
			.get()
			.then((snapshot) => {
				var slotSize = snapshot.size / 365;
				var firstSlot = Math.floor((day - 1) * slotSize);
				var secondSlot = Math.ceil(day * slotSize);

				console.log(firstSlot + " - " + secondSlot);

				for (var i = firstSlot; i <= secondSlot; i++) {
					let book = snapshot.docs[i].data();
					results.push({ ...book, id: snapshot.docs[i].id });
				}

				console.log("results", results);

				setSearched(true);
			});
	};

	useEffect(() => {
		getResults();
	});

	return (
		<div className="container">
			<ListSection
				tableElements={results}
				searched={searched}
				setCurrentDetails={(book) => console.log(book)}
			/>
		</div>
	);
}

export default Recommendation;
