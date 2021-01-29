import React, { Component } from 'react'
import './LekhakList.css'
import ListSection from "../../components/list-section/ListSection";
import Alphabets from './Alphabets';
import Akshar from './Akshar';
import { db } from '../../firebase'
import Loading from '../../components/loading/Loading';



class LekhakList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            authorList: [],
            matching_authors: [],
            activeTab: '1',
            lekhakArray: [],
            lekhakDict: {},
            searched: false,
			tableHeaders: [],
            results: [],
            currentLekhak :"",
            isBtnClicked : null
        };

        this.toggle = this.toggle.bind(this);
    }


    getLekhakNames = value => async () => {
        this.setState({isBtnClicked : value, loading: true, lekhakDict: {}})
        let val = value;
        const doc = await db.collection("newMappingTrial").doc(value).get();
        const lekhakNamesDict = doc.data().names;
        this.setState(
            { lekhakDict: lekhakNamesDict, loading: false }
        );
        console.log(lekhakNamesDict);
        // console.log(this.state.loading);
    }

    getLekhakBooks = value => async () => {
        
        let lekhakName = value;
        this.setState({
            lekhakDict: {},
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
            Object.keys(this.state.lekhakDict).map((key, index) => (
                <div className="renderAuthors">
                    <div className="authorName">{key}</div>
                    <div className="bookNames"><p onClick={this.getLekhakBooks(key)}>View <span>{this.state.lekhakDict[key]}</span> Books</p></div>
                </div>)));
    }

    renderAlphabets = (alpha) => {
        return (
            alpha.map((letter) => (
                <button value={letter.key} className={this.state.isBtnClicked === letter.key? "alphabetsClicked" : "alphabetsUnclicked"} onClick={this.getLekhakNames(letter.key)}>{letter.key}</button>
            ))
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
                                <button 
                                className={this.state.activeTab === "1" ? "clickedBtn" : "unclickedBtn"} 
                                onClick={() => { this.toggle('1'); }}
                                >
                                    Marathi
                                </button>
                                <button 
                                className={this.state.activeTab === "2" ? "clickedBtn" : "unclickedBtn"} 
                                onClick={() => { this.toggle('2'); }}
                                >
                                    English
                                </button>
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
                            {/* Object.keys(this.state.lekhakDict).length == 0 && this.state.isBtnClicked */}
                            {this.state.loading ? <Loading page="lekhakList"/> : null} 
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