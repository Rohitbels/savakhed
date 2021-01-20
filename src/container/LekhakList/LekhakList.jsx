import React, { Component } from 'react'
import './LekhakList.css'
import ListSection from "../../components/list-section/ListSection";
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
            lekhakArray: [],
            searched: false,
			tableHeaders: [],
            results: [],
            currentLekhak :""
        };

        this.toggle = this.toggle.bind(this);
    }


    getLekhakNames = value => async () => {
        let val = value;
        //console.log(val);
        const doc = await db.collection("lekhakMapping").doc(value).get();
        const lekhakNamesArray = doc.data().names;
        this.setState(
            { lekhakArray: lekhakNamesArray }
        );
        //console.log(lekhakNamesArray);
    }

    getLekhakBooks = value => async () => {
        
        let lekhakName = value;
        this.setState({
            lekhakArray: [],
            searched: false,
			tableHeaders: [],
            results: [],
            currentLekhak: lekhakName
        });
        await db.collection("bookList")
            .where("lekhakNameJoint", "==", lekhakName)
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    let currentBook = doc.data();
                    this.setState({
                        results : this.state.results.concat([{...currentBook, id: doc.id }])
                    });
                    //console.log(currentBook.lekhak, currentBook.pustakName);
                });
            });
        this.setState({
            tableHeaders: ["Dakhal-ID", "Vibhag-ID", "Book", "Author"],
            searched : true
        });
        //const bookNamesArray = doc.data().lekhakNameJoint;
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
                    <div className="bookNames"><p onClick={this.getLekhakBooks(data)}>View Books</p></div>
                </div>)));
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
                {!this.state.searched &&
                    <div>
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
                }
                {this.state.searched && 
                    <div className="lekhakBooklist">
                        <h1>लेखक : { this.state.currentLekhak }</h1>
                        <ListSection
                            setCurrentDetails={this.props.setCurrentDetails}
                            tableHeaders={this.state.tableHeaders}
                            tableElements={this.state.results}
                            searched={this.state.searched}
                        />
                    </div>
                }
            </div>

        )
    }

}

export default LekhakList;