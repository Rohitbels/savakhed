import React from "react";
import ListCard from "../list-card/ListCard";
import "./listsection.css";
import exploreBooks from "./explore";
import GenreCard from "./genre-card";

const ListSection = ({
	tableElements,
	searched,
	setCurrentDetails,
	setBookType,
	bookType,
}) => {
	return (
		<>
			{tableElements.length && searched ? (
				<div className="table-super">
					{tableElements.map((book, key) => (
						<ListCard
							setCurrentDetails={setCurrentDetails}
							key={key}
							book={book}
						></ListCard>
					))}
				</div>
			) : searched ? (
				<div>{`No such book found ${
					bookType ? `in ${bookType} category` : ""
				}`}</div>
			) : (
				<>
					<span className="explore">~ Explore by genre ~</span>
					<div
						className="genre-container"
						style={{
							width: "100vw",
							display: "flex",
							flexWrap: "wrap",
							justifyContent: "center",
							marginBottom: "100px",
						}}
					>
						{exploreBooks.map(({ prakar, img, key }) => (
							<GenreCard
								key={key}
								img={img}
								prakar={prakar}
								setBookType={setBookType}
							/>
						))}
					</div>
				</>
			)}
		</>
	);
};

export default ListSection;
