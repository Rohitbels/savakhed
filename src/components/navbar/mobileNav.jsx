import React, { Component } from 'react'
import './mobileNav.css';
import searchSvg from "../../svg/search.svg"
import authorSvg2 from "../../svg/lekhak.svg"
import aboutSvg from "../../svg/about.svg"
export default class mobileNav extends Component {
    constructor(props){
        super(props);
        this.state = {
            isClicked : 1
        }
    }

    componentDidMount(){
        const href = window.location.href;
        if(href.includes("lekhakList")){
            this.setState({isClicked:2})
        }
        else if(href.includes("aboutUs")){
            this.setState({isClicked:3})
        }
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
                    <a href="#/aboutus" onClick={() => this.setState({ isClicked: 3})}>
                        <img src={aboutSvg} className="lekhakSvg" alt="About US" />
                    </a>
                </div>
            </div>
        )
    }
}
