import React from "react";
import Image from "../intersection-image-search/Image";
import "./listsection.css";
const GenreCard = ({ img, prakar, setBookType, searchFilter }) => {
	return (
		<div
			className="genre-card"
			onClick={() => {
				setBookType([prakar].join(" "));
				searchFilter("pustakPrakar", [prakar]);
			}}
		>
			{/* <img
				src={img}
				alt={`Book cover for ${prakar} pustak prakar`}
				width="126"
				height="180"
				className="genre-image"
			/> */}
			<Image
				src={img}
				alt={`Book cover for ${prakar} pustak prakar`}
				width="126"
				height="180"
				className="genre-image"
			/>
			<h4 className="genre-title">{prakar}</h4>
		</div>
	);
};

export default GenreCard;
