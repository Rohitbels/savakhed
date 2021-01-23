import React, { Component } from 'react'
import './mobileNav.css';
import searchSvg from "../../svg/search.svg"
import authorSvg from "../../svg/author.svg"
import authorSvg2 from "../../svg/author2.svg"
import aboutSvg from "../../svg/about.svg"
export default class mobileNav extends Component {
    constructor(){
        super();
        this.state = {
            isSearchClicked : true,
            isLekhakClicked : false,
            isAboutClicked : false
        }
    }


    render() {
        return (
            <div className="mobileNav">
                <div className={this.state.isSearchClicked === true ? "mobileNav_search" : ""}>
                <a href="#/search" onClick={() => this.setState({isSearchClicked:true})} onBlur={() => this.setState({isSearchClicked:false})}>
                    <img src={searchSvg} className="searchSvg" alt="Search Books"/>
                </a>
                </div>
                <div className={this.state.isLekhakClicked === true ? "mobileNav_search" : ""}>
                <a href="#/lekhaklist" onClick={() => this.setState({isLekhakClicked:true, isSearchClicked:false})} onBlur={() => this.setState({isLekhakClicked:false})}>
                    <img src={authorSvg2} className="lekhakSvg" alt="Lekhak List"/>
                </a>
                </div>
                <div className={this.state.isAboutClicked === true ? "mobileNav_search" : ""}>
                <a href="#" onClick={() => this.setState({isAboutClicked:true, isSearchClicked:false})} onBlur={() => this.setState({isAboutClicked:false})}>
                    <img src={aboutSvg} className="lekhakSvg" alt="About US"/>
                </a>
                </div>
            </div>
        )
    }
}
