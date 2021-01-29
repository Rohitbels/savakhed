import React from 'react'
import '../../container/LekhakList/LekhakList.css'
import './shimmer.css'

function Loading({page}) {
	if (page === 'lekhakList') {
		return (
			<>
				<div className="renderAuthorsShimmer">
					<div className="authorName shine"></div>
					<div className="bookNames shine"></div>
				</div>
				<div className="renderAuthorsShimmer">
					<div className="authorName shine"></div>
					<div className="bookNames shine"></div>
				</div>
				<div className="renderAuthorsShimmer">
					<div className="authorName shine"></div>
					<div className="bookNames shine"></div>
				</div>
				<div className="renderAuthorsShimmer">
					<div className="authorName shine"></div>
					<div className="bookNames shine"></div>
				</div>
			</>
		)
	}
	return (
		<>
			<div className="card-container">
				<img className="book-cover shine"/>
				<a>
					<span className="book-title shine" style={{height: "15px", width: "50%"}}></span>
					<span className="book-author shine" style={{height: "15px", width: "50%"}}></span>
					<div style={{ display: "flex" }}>
						<span className="book-category shine" style={{height: "15px", width: "30%"}}>
							
						</span>
						<span className="book-language shine" style={{height: "15px", width: "30%"}}></span>
					</div>
				</a>
			</div>
			<div className="card-container">
				<img className="book-cover shine"/>
				<a>
					<span className="book-title shine" style={{height: "15px", width: "50%"}}></span>
					<span className="book-author shine" style={{height: "15px", width: "50%"}}></span>
					<div style={{ display: "flex" }}>
						<span className="book-category shine" style={{height: "15px", width: "30%"}}>
							
						</span>
						<span className="book-language shine" style={{height: "15px", width: "30%"}}></span>
					</div>
				</a>
			</div>
		</>
	)
}

export default Loading
