import React from "react";
import Image from "../intersection-image-search/Image";
import "./listsection.css";
const GenreCard = ({ img, prakar, setBookType, searchFilter }) => {
	return (
		<div
			className="genre-card"
			onClick={() => {
				setBookType([prakar].join(" "),searchFilter.bind(null,"pustakPrakar", [prakar]));
				
				window.scrollTo(0, 0)
			}}
		>
			<Image
				type=""
				src={img}
				alt={`Book cover for ${prakar} pustak prakar`}
				className="genre-image"
			/>
			<div className="genre-title">
			{prakar}
			</div>
		</div>
	);
};

export default GenreCard;
