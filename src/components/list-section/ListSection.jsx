import React from "react";
import ListCard from "../list-card/ListCard";
import "./listsection.css";

const ListSection = ({ tableElements, searched, setCurrentDetails }) => {
	return (
		<div className="table-super">
			{tableElements.length && searched ? (
				<>
					{tableElements.map((book, index) => (
						<ListCard
							setCurrentDetails={setCurrentDetails}
							key={index}
							book={book}
						></ListCard>
					))}
				</>
			) : searched ? (
				<div>No results found</div>
			) : null}
		</div>
	);
};

export default ListSection;

// <table>
// 	<thead>
// 		<tr>
// 			{tableHeaders.map((header, index) => (
// 				<th key={index}>{header}</th>
// 			))}
// 		</tr>
// 	</thead>

// 	<tbody>
// 		{tableElements.map((book, index) => (
// 			<tr
// 				onClick={() => setCurrentDetails(book)}
// 				key={index}
// 			>
// 				<td>{book["dakhalId"]}</td>
// 				<td>{book["vibhagId"]}</td>
// 				<td>
// 					<a href={`#/details/${book["id"]}`}>
// 						{book["pustakName"].join(" ")}
// 					</a>
// 				</td>
// 				<td>
// 					{book["lekhak"].join(" ")}
// 					{/* {book["lekhakNameMulakshare"]} */}
// 				</td>
// 			</tr>
// 		))}
// 	</tbody>
// </table>
