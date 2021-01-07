import React from "react";
import "./listsection.css";

const ListSection = ({ tableHeaders = [], tableElements = [] }) => {
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
							<tr key={index}>
								<td>{book["dakhalId"]}</td>
								<td>{book["vibhagId"]}</td>
								<td>
									<a href="#/details">
										{book["pustakName"].join(" ")}
									</a>
								</td>
								<td>{book["lekhak"].join(" ")}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div>No results found</div>
			)}
		</div>
	);
};

export default ListSection;
