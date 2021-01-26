import React, { useState, useEffect } from "react";
import "./header.css";
import { ReactComponent as Arrow } from "./left-arrow.svg";

function Header() {
	
	const setLabel = () => {
		const href = window.location.href;
		if (href.includes("lekhakList")) return "lekhak-list";
		if (href.includes("aboutUs")) return "about-us";
		if (href.includes("details")) return "details";
		if (href.includes("search")) return "search";
		return "search"
	};

	const removeActive = () => {
		const nav = document.getElementsByClassName("nav-bar")[0];
		const children = nav.children;
		[...children].forEach(element => {
			element.children[0].classList.remove("active");
		});
	}

	const onClickHandler = (target) => {
		removeActive();
		document.getElementById(target).classList.add("active")
	}

	const hashChange = () => {
		window.addEventListener(
			"hashchange",
			function () {
				console.log("The hash has changed!");
				if (document.getElementById(setLabel()) != null) {
					removeActive();
					document.getElementById(setLabel()).classList.add("active");
				}
				
			},
			false
		);
	}

	useEffect(() => {
		if (document.getElementById(setLabel()) != null) {
			document.getElementById(setLabel()).classList.add("active");
		}		
		hashChange()
	}, [])

	return (
		<nav className="nav-bar">
			{window.location.href.includes("details") ? (
				<a href="/#/search">
					<div className="back-button">
						<Arrow/>
					</div>
				</a>
			) : null}
			{/* <a href="/search">{label(window.location.href)}</a> */}
			<a href="/#/search" onClick={() => {onClickHandler("search")}}>
				<div className="link-placeholders" id="search">
					Search
				</div>
			</a>
			<a href="/#/lekhakList" onClick={() => {onClickHandler("lekhak-list")}}>
				<div className="link-placeholders" id="lekhak-list">
					Lekhak List
				</div>
			</a>
			<a href="/#/aboutUs" onClick={() => {onClickHandler("about-us")}}>
				<div className="link-placeholders" id="about-us">
					About Us
				</div>
			</a>
			<a href="/#/search" onClick={() => {onClickHandler("about-us")}}>
				<div className="title" id="title">
					{setLabel().replace('-', ' ')}
				</div>
			</a>
			
		</nav>
	);
}

export default Header;
