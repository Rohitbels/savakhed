import React, { useState, useEffect } from "react";
import "./header.css";
// import { ReactComponent as Arrow } from "./caret.svg";

function Header() {
	
	const setLabel = () => {
		const href = window.location.href;
		if (href.includes("lekhak-list")) return "lekhak-list";
		if (href.includes("about-us")) return "about-us";
		if (href.includes("details")) return "details";
		if (href.includes("search")) return "search";
		return "search"
	};
	const [tab, setTab] = useState(setLabel)
	const [prevTab, setPrevTab] = useState()

	const changeCSS = () => {
		document.getElementById(tab).classList.add("active");
	}

	useEffect(() => document.getElementById(tab).classList.add("active"), [])

	return (
		<nav className="nav-bar">
			{window.location.href.includes("details") ? (
				<a href="/search">
					<button>&lt;</button>
				</a>
			) : null}
			{/* <a href="/search">{label(window.location.href)}</a> */}
			<a href="/search" onClick={() => {setPrevTab(tab);setTab("search")}}>
				<div className="link-placeholders" id="search">
					Search
				</div>
			</a>
			<a href="/lekhak-list" onClick={() => {setPrevTab(tab);setTab("lekhak-list")}}>
				<div className="link-placeholders" id="lekhak-list">
						Lekhak List
				</div>
			</a>
			<a href="/about-us" onClick={() => {setPrevTab(tab);setTab("about-us")}}>
				<div className="link-placeholders" id="about-us">
					About Us
				</div>
			</a>
		</nav>
	);
}

export default Header;
