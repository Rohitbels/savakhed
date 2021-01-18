import React from "react";
import "./header.css";
// import { ReactComponent as Arrow } from "./caret.svg";

function Header() {
	const label = (href) => {
		if(href.includes("details")) return "Details"
		if(href.includes("search")) return "Search"
		return "Search"
	}
	return (
		<nav className="nav-bar">
			{window.location.href.includes("details") ? <a href="/search"><button>&lt;</button></a> : null}
			<a href="/search">{label(window.location.href)}</a>
		</nav>
	);
}

export default Header;
