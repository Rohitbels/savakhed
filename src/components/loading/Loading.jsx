import React from "react";
import Card from "../card/Card";
import "../../container/LekhakList/LekhakList.css";
import "./shimmer.css";

function Loading({ page }) {
	//40px x 11 = 440px
	const ratio = 440 / 722;
	const elementsNumber = Math.round((ratio * window.innerHeight) / 40);
	let elements = [];
	const listingFragment = (
		<div className="renderAuthorsShimmer">
			<div className="authorName shine"></div>
			<div className="bookNames shine"></div>
		</div>
	);
	for (let i = 0; i < elementsNumber; i++) {
		elements.push(listingFragment);
	}

	if (page === "lekhakList") {
		return <>{elements}</>;
	}
	return (
		<>
			{[1,2,3].map((key)=>(
			<Card
				key={key}
				bookName=""
				whichCard=" "
			>
			<div className="loading-card-container">
			<div className="book-cover shine" style={{ flexGrow: 1}} >
				</div>
				<div style={{ display: 'flex', flexDirection: "column", justifyContent: "stretch", flexGrow: 16}}>
					<div
						className="book-title shine"
						style={{ height: "20px" }}
					></div>
					<div
						className="book-author shine"
						style={{ height: "20px", width: "50%" }}
					></div>
					<div style={{ display: "flex", flexGrow: 3, justifyContent: "space-between" , flexDirection: "column-reverse"  }}>
						<div
							className="book-language shine"
							style={{ height: "20px" }}
						></div>
					</div>
			</div>	
		</div>
		</Card>
			))}

		</>
	);
}

export default Loading;
