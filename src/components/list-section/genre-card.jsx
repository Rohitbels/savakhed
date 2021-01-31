import React from "react";
import "./listsection.css";
const GenreCard = ({ key, img, prakar, bookType }) => {
	return (
		<div
			className="genre-card"
			key={key}
			onClick={() => bookType("pustakPrakar", [prakar])}
		>
			<img
				src={img}
				alt={`Book cover for ${prakar} pustak prakar`}
				width="84"
				height="120"
				className="genre-image"
			/>
			<h4 className="genre-title">{prakar}</h4>
		</div>
	);
};

export default GenreCard;
