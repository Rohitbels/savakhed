import React from 'react'
import "./listingFragment.css"

function ListingFragment(props) {
	return (
		<div className="book-container">
			<img src="https://www.akshardhara.com/35007/asa-mi-asami-p-l-deshpande-mauj-prakashan-buy-marathi-books-online-at-akshardhara.jpg" alt="img-url"></img>
			<div className="book">
					<div className="name-style">
						<p>{props.bookDetails.bookname}</p>
					</div>
				<div className="book-details">
					<div className="author-style">
						<p className="type-style">Author</p>
						<p alt="abc" className="content-style">{props.bookDetails.author}</p>
					</div>
					<div className="category-style">
						<p className="type-style">Category</p>
						<p className="content-style">Kathakathan</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ListingFragment
