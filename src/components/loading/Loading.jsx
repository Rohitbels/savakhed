import React from 'react'
import '../../container/LekhakList/LekhakList.css'
import './shimmer.css'

function Loading() {
	return (
		<>
			<div className="renderAuthorsShimmer">
				<div className="authorName shine"></div>
				<div className="bookNames shine"></div>
				<div className="authorName shine"></div>
				<div className="bookNames shine"></div>
			</div>
			<div className="renderAuthorsShimmer">
				<div className="authorName shine"></div>
				<div className="bookNames shine"></div>
				<div className="authorName shine"></div>
				<div className="bookNames shine"></div>
			</div>
			<div className="renderAuthorsShimmer">
				<div className="authorName shine"></div>
				<div className="bookNames shine"></div>
				<div className="authorName shine"></div>
				<div className="bookNames shine"></div>
			</div>
			<div className="renderAuthorsShimmer">
				<div className="authorName shine"></div>
				<div className="bookNames shine"></div>
				<div className="authorName shine"></div>
				<div className="bookNames shine"></div>
			</div>
		</>
	)
}

export default Loading
