import React from "react";
import Loader from "../loader/Loader";
import "./listsection.css";

const ListSection = ({
	tableHeaders = [],
	tableElements = [],
	searched,
	setCurrentDetails,
	loading,
}) => {
	if (loading && searched) {
		return <Loader />;
	}

	return (
		<div className="table-super">
			{tableElements.length ? (
				<table>
					<thead>
						<tr>
							{tableHeaders.map((header, index) => (
								<th key={index}>{header}</th>
							))}
						</tr>
					</thead>

					<tbody>
						{tableElements.map((book, index) => (
							<tr
								onClick={() => setCurrentDetails(book)}
								key={index}
							>
								<td>{book["dakhalId"]}</td>
								<td>{book["vibhagId"]}</td>
								<td>
									<a href={`#/details/${book["id"]}`}>
										{book["pustakName"].join(" ")}
									</a>
								</td>
								<td>{book["lekhak"].join(" ")}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : searched ? (
				<div>No results found</div>
			) : null}
		</div>
	);
};

export default ListSection;
