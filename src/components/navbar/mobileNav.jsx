import React, { Component } from 'react'
import './mobileNav.css';
import searchSvg from "../../svg/search.svg"
import authorSvg from "../../svg/author.svg"
import authorSvg2 from "../../svg/author2.svg"
import aboutSvg from "../../svg/about.svg"
export default class mobileNav extends Component {
    render() {
        return (
            <div className="mobileNav">
                <div className="mobileNav_search">
                <a href="#/search"><img src={searchSvg} className="searchSvg" alt="Search Books"/></a>
                </div>
                <div className="mobileNav_lekhaklist">
                <a href="#/lekhaklist"><img src={authorSvg2} className="lekhakSvg" alt="Lekhak List"/></a>
                </div>
                <div className="mobileNav_aboutus">
                <a href="#"><img src={aboutSvg} className="lekhakSvg" alt="About US"/></a>
                </div>
            </div>
        )
    }
}
