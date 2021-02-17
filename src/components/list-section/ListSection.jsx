import React from "react";
import "./listsection.css";
import exploreBooks from "./explore";
import GenreCard from "./genre-card";
import Card from "../card/Card";
import Image from "../intersection-image-search/Image";
import mulakshare from "../../container/listing/mulakshare";

const ListSection = ({
	tableElements,
	searched,
	setCurrentDetails,
	setBookType,
	bookType,
	searchFilter,
}) => {
	const getLanguage = (name) => {
		let language = "इंग्रजी";

		mulakshare.forEach((letter) => {
			if (name.includes(letter)) {
				language = "मराठी";
				return language;
			}
		});

		return language;
	};

	return (
		<>
			{tableElements.length && searched ? (
				<div className="table-super">
					{tableElements.map((book, key) => (
						<Card
							key={key}
							bookName=""
							whichCard=" "
							onClick={() => setCurrentDetails(book)}
						>
							<div className="card-container">
								<Image
									className="book-cover"
									alt="book cover"
									book={book}
								/>
								<a
									href={`#/details/${book["id"]}`}
									style={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "flex-end",
									}}
								>
									<div style={{ marginBottom: "auto" }}>
										<span className="book-title">
											{book["pustakFullName"]}
										</span>
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
										<span className="book-language">
											{getLanguage(
												book["pustakFullName"]
											)}
										</span>
									</div>
								</a>
							</div>
						</Card>
					))}
				</div>
			) : searched ? (
				<div className="no-book-error">{`No such book found ${
					bookType ? `in ${bookType} category` : ""
				}`}</div>
			) : (
				<>
					<span className="explore">~ Explore by genre ~</span>
					<div className="genre-container">
						{exploreBooks.map(({ id, prakar, img }) => (
							<GenreCard
								key={id}
								img={img}
								prakar={prakar}
								setBookType={setBookType}
								searchFilter={searchFilter}
							/>
						))}
					</div>
				</>
			)}
		</>
	);
};

export default ListSection;
