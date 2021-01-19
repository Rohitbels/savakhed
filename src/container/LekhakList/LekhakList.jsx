import React, { Component } from 'react'
import './LekhakList.css'
import Alphabets from './Alphabets';
import Akshar from './Akshar';
import { db } from '../../firebase'



class LekhakList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authorList: [],
            matching_authors: [],
            activeTab: '1',
            lekhakArray: []
        };

        this.toggle = this.toggle.bind(this);
    }


    getLekhakNames = value => async () => {
        let val = value;
        console.log(val);
        console.log("Firebase Query.");
        const doc = await db.collection("lekhakMapping").doc(value).get();
        const lekhakNamesArray = doc.data().names;
        this.setState(
            { lekhakArray: lekhakNamesArray }
        );
        console.log(lekhakNamesArray);
    }


    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        }
    }

    renderAuthors = () => {
        return (
            this.state.lekhakArray.map((data) => (
                <div className="renderAuthors">
                    <div className="authorName">{data}</div>
                    <div className="bookNames"><a href="#" >View Books</a></div>
                </div>)))
    }

    renderAlphabets = (alpha) => {
        return (
            alpha.map((letter) => (
                <button value={letter.key} onClick={this.getLekhakNames(letter.key)}>{letter.key}</button>
            )
            )
        )
    }

    render() {
        const { character } = this.state;
        return (
            <div className="lekhakList">
                <div>
                    <div className="toggleBtn">
                        <button className="marBtn" onClick={() => { this.toggle('1'); }}>Marathi</button>
                        <button className="engBtn" onClick={() => { this.toggle('2'); }}>English</button>
                    </div>
                    <div>
                        <div>
                            {this.state.activeTab == 1 ?
                                <div className="ButtonContainer">
                                    {this.renderAlphabets(Akshar)}
                                </div>
                                : null}
                        </div>
                        <div>
                            {this.state.activeTab == 2 ?
                                <div className="ButtonContainer">
                                    {this.renderAlphabets(Alphabets)}
                                </div>
                                : null}
                        </div>
                    </div>
                </div>
                <div className="authorsList">
                    {this.renderAuthors()}
                </div>
            </div>

        )
    }

}

export default LekhakList;