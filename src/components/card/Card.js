import React from 'react';
import './Card.css'

function Card(props) {
    //console.log(props)
    return (
        <div className={props.whichCard === "google" ? "cardGoogle" : "card"}>
            <div className="heading">
                {props.bookName}
            </div>
            <hr/>
            <div className="description">
                {props.children}
            </div>
        </div>
    )
}

export default Card;
