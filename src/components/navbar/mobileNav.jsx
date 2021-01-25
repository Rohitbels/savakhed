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
            isClicked : 1
        }
        this.setButton = this.setButton.bind(this);
    }

    setButton(id){

    }

    render() {
        return (
            <div className="mobileNav">
                {/* search */}
                <div className={this.state.isClicked === 1 ? "mobileNav_clicked" : "mobileNav_unclicked"}>
                    <a href="#/search" onClick={() => this.setState({ isClicked: 1 })}>
                        <img src={searchSvg} className="searchSvg" alt="Search Books" />
                    </a>
                </div>
                {/* lekhak list */}
                <div className={this.state.isClicked === 2 ? "mobileNav_clicked" : "mobileNav_unclicked"}>
                    <a href="#/lekhaklist" onClick={() => this.setState({ isClicked: 2})}>
                        <img src={authorSvg2} className="lekhakSvg" alt="Lekhak List" />
                    </a>
                </div>
                {/* about */}
                <div className={this.state.isClicked === 3 ? "mobileNav_clicked" : "mobileNav_unclicked"}>
                    <a href="#" onClick={() => this.setState({ isClicked: 3})}>
                        <img src={aboutSvg} className="lekhakSvg" alt="About US" />
                    </a>
                </div>
            </div>
        )
    }
}
