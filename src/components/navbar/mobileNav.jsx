import React, { Component } from 'react'
import './mobileNav.css';
import searchSvg from "../../svg/search.svg"
import authorSvg from "../../svg/author.svg"
import aboutSvg from "../../svg/about.svg"
export default class mobileNav extends Component {
    render() {
        return (
            <div className="mobileNav">
                <div className="mobileNav_search">
                <img src={searchSvg} className="searchSvg" alt="Search Books"/>
                </div>
                <div className="mobileNav_lekhaklist">
                <img src={authorSvg} className="searchSvg" alt="Lekhak List"/>
                </div>
                <div className="mobileNav_aboutus">
                <img src={aboutSvg} className="searchSvg" alt="About US"/>
                </div>
            </div>
        )
    }
}
