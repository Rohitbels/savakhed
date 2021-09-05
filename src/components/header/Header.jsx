import React, { useEffect } from "react";
import "./header.css";
import { ReactComponent as Arrow } from "./left-arrow.svg";
import {
	Nav,
	NavItem,
	NavLink  } from 'reactstrap';
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
				//document.getElementById("current").innerText = setLabel();
			},
			false
		);
	};



	useEffect(() => {
		if (document.getElementById(setLabel()) != null) {
			document.getElementById(setLabel()).classList.add("active");
			
		}
		if(setLabel() !== 'search')
		document.getElementById("current").innerText = setLabel();
		hashChange();
	});

	return (
		<>

      <Nav className="onlyDesktop nav-bar">
        <NavItem>
          <NavLink href="#">

		  {window.location.href.includes("details") ||
			window.location.href.includes("lekhakbooks") ? (
				<span
					onClick={(e) => {e.preventDefault(); window.history.go(-1);}}
					className="back-link"
				>
					<div className="back-button">
						<Arrow />
					</div>
				</span>
			) : null}
		  </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#/listing">Search</NavLink>
        </NavItem>
        <NavItem active>
          <NavLink active href="#/lekhaklist">Lekhak List</NavLink>
        </NavItem>
      </Nav>
	  {setLabel() !== 'search' ? 
	  <nav className="onlyMobile nav-bar">
			{window.location.href.includes("details") ||
			window.location.href.includes("lekhakbooks") ? (
				<span
					onClick={(e) => {e.preventDefault(); window.history.go(-1);}}
					className="back-link"
				>
					<div className="back-button arrowColor">
						<Arrow />
					</div>
				</span>
			) : null}
			
			<div id="current" className="current">
						
			</div>
		</nav>
		: null }
		</>
	);
}

export default Header;
