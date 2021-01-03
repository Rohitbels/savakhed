import React from "react";
import "./listsection.css";

const ListSection = ({ tableHeaders, tableElements }) => {
	return (
		<div className="table-super">
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
							<td>{book["id"]}</td>
							<td>{book["vibhag id"]}</td>
							<td>
								<a href="#/details">{book["book name"]}</a>
							</td>
							<td>{book["author"]}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ListSection;
