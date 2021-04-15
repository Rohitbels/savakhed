import React, { useEffect } from "react";
import "./header.css";
import { ReactComponent as Arrow } from "./left-arrow.svg";

function Header() {
	const setLabel = () => {
		const href = window.location.href;
		if (href.includes("lekhaklist")) return "explore by top authors";
		if (href.includes("lekhakbooks")) return "lekhakbooks";
		if (href.includes("aboutus")) return "about-us";
		if (href.includes("details")) return "details";
		if (href.includes("search")) return "search";
		if (href.includes("recommendation")) return "recommendation";
		return "search";
	};

	const removeActive = () => {
		const nav = document.getElementsByClassName("tabs")[0];
		const children = nav.children;
		if (children) {
			[...children].forEach((element) => {
				element
					? element.children[0].classList.remove("active")
					: console.log();
			});
		}
	};

	const hashChange = () => {
		window.addEventListener(
			"hashchange",
			function () {
				if (document.getElementById(setLabel()) != null) {
					removeActive();
					document.getElementById(setLabel()).classList.add("active");
					
				}
				document.getElementById("current").innerText = setLabel();
			},
			false
		);
	};

	const onClickHandler = (target) => {
		removeActive();
		document.getElementById(target).classList.add("active");
	};

	useEffect(() => {
		if (document.getElementById(setLabel()) != null) {
			document.getElementById(setLabel()).classList.add("active");
			
		}
		hashChange();
	});

	return (
		<nav className="nav-bar">
			{window.location.href.includes("details") ||
			window.location.href.includes("lekhakbooks") ? (
				<a
					href="##"
					onClick={(e) => {e.preventDefault(); window.history.go(-1);}}
					className="back-link"
				>
					<div className="back-button">
						<Arrow />
					</div>
				</a>
			) : null}
			<div className="tabs">
				<a
					href="/savakhed/#/search"
					onClick={() => {
						onClickHandler("search");
					}}
				>
					<div className="link-placeholders" id="search">
						Search
					</div>
				</a>
				{/* <a
					href="/savakhed/#/lekhaklist"
					onClick={() => {
						onClickHandler("lekhak-list");
					}}
				>
					<div className="link-placeholders" id="lekhak-list">
						Authors
					</div>
				</a>
				<a
					href="/savakhed/#/aboutus"
					onClick={() => {
						onClickHandler("about-us");
					}}
				>
					<div className="link-placeholders" id="about-us">
						About Us
					</div>
				</a> */}


			</div>
			<div id="current" className="current">
						details
					</div>
		</nav>
	);
}

export default Header;
