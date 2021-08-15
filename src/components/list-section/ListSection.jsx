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
	const showDetails = (id) => {
		window.location.hash = `details/${id}`;
	}

	return (
		<>
			{tableElements.length && searched ? (
				<div className="table-super">
					{tableElements.map((book, key) => (
						<Card
							key={key}
							bookName=""
							whichCard=" "
							
						>
							<div onClick={() => {
								setCurrentDetails(book)
								showDetails(book['id'])
							}} className="card-container">
								<Image
									className="book-cover"
									alt="book cover"
									book={book}
									type=""
									setCurrentDetails={setCurrentDetails}
								/>
								<div									
									
									style={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "space-between",
										marginLeft: '10px',
										height: '120px',
										width:'100%'
									}}
								>
									<div>
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
											flexDirection: "row",
										justifyContent: "space-between",
										}}
									>
										<div className="book-category">
											{book["pustakPrakar"]}
										</div>
										<div className="book-language">
											{getLanguage(
												book["pustakName"].join(" ")
											)}
										</div>
									</div>
								</div>
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
					<span className="explore">Explore by genre</span>
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
