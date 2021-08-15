import React from "react";
import {
	Card, CardImg, CardText, CardBody,
	CardTitle, CardSubtitle, Button
  } from 'reactstrap';

function Card_Test(props) {
	return (
		// <div className={props.whichCard === "google" ? "cardGoogle" : "card"}>
		// 	<div className="heading">{props.bookName}</div>
		// 	{props.bookName !== "" && <hr />}
		// 	<div className="description">{props.children}</div>
		// </div>

<Card className="m-2">
<CardBody>
  <CardTitle tag="h5">{props.bookName}</CardTitle>
 
  {props.bookName !== "" && <hr />}
			<div className="description">{props.children}</div>
</CardBody>
</Card>

	);
}

export default Card_Test;
