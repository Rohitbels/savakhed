import React, { useState, useEffect } from "react";
import "./listsection.css";

const ListSection = ({
	tableHeaders,
	tableElements,
	searched,
	setCurrentDetails,
}) => {
	return (
		<div className="table-super">
			{tableElements.length && searched ? (
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
