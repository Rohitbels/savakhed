import React from 'react'
import './details.css'
function details() {
    return (
        <div className="details_container">
          
          <div className="details_back">
            <a href="#">
                <button className="back_btn">
                    Go Back
                </button>
            </a>
          </div>
          <hr />
            <div className="details_image">
            <img src="https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg" alt="Book Image" className="book_image" />
            </div>
            <div className="book_details">
                <div className="rows">
                    <div className="label">Book Name</div>
                    <span className="book_name">The Alchemist</span>
                </div>
                <hr />
                <div className="rows">
                    <span className="label">Author</span>
                    <span className="book_name">Paulo Coelho</span>
                </div>
                <hr />
                <div className="rows">
                    <span className="label">Year Of Release</span>
                    <span className="book_name">2006</span>
                </div>
                <hr />
                <div className="rows">
                    <span className="label">Publication</span>
                    <span className="book_name">The Alchemist</span>
                </div>
                <hr />
                <div className="rows">
                    <span className="label">Genre</span>
                    <span className="book_name">The Alchemist</span>
                </div>
                <br/>
                <hr />
            </div>
        </div>
    )
}

export default details

