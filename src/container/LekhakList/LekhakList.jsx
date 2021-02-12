import React, { Component } from 'react'
import './LekhakList.css'
import Alphabets from './Alphabets';
import Akshar from './Akshar';
import { db } from '../../firebase'
import Loading from '../../components/loading/Loading';



class LekhakList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lekhakLoading: this.props.lekhakLoading,
            activeTab: this.props.activeTab,
            lekhakDict: this.props.lekhakDict,
            lekhakSearched: this.props.lekhakSearched,                      //Boolean, False by Default
            lekhakResults: this.props.lekhakResults,
            currentLekhak: this.props.currentLekhak,
            isBtnClicked: this.props.isBtnClicked
        };

        this.toggle = this.toggle.bind(this);
    }


    getLekhakNames = value => async () => {
        this.props.setParentState({
            lekhakLoading: true,
            lekhakSearched: false,
            isBtnClicked : value,
            lekhakDict: {}
        })
        //console.log(value);
        const doc = await db.collection("newMappingTrial").doc(value).get();
        let lekhakNamesDict = doc.data().names;
        lekhakNamesDict = this.sortKeys(lekhakNamesDict);
        this.props.setParentState(
            { lekhakDict: lekhakNamesDict, lekhakLoading: false }
        );
        //console.log(lekhakNamesDict);
        //console.log(this.props.lekhakLoading);
    }

    getLekhakBooks = value => async () => {
        //console.log("getLekhakBooks called");
        let lekhakName = value;
        this.props.setParentState({
            lekhakSearched: false,
            lekhakResults: [],
            currentLekhak: lekhakName,
        });
        await db.collection("bookList")
            .where("lekhakFullName", "==", 'जॉन ग्रिशम')       /************************* Change this to compare "lekhakName" variable ***********************/
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    let currentBook = doc.data();
                    this.props.setParentState({
                        lekhakResults : this.props.lekhakResults.concat([{...currentBook, id: doc.id }])
                    });
                    //console.log(this.props.lekhakResults);
                });
            });
        window.location.href = "#/lekhakbooks/"
        //const bookNamesArray = doc.data().lekhakNameJoint;
    }

    toggle(tab) {
        if (this.props.activeTab === tab)
            return;
        this.props.setParentState({
            activeTab: tab,
            lekhakSearched: false,
            lekhakDict: tab === 1 ? { "करुणा गोखले": 7, "कृ मु उजळंबकर": 9, "के सागर": 75 } :{},
            isBtnClicked: tab === 1 ? 'क' : 'a'
        });
        
    }

    renderAuthors = () => {
        if(Object.keys(this.props.lekhakDict).length === 0 && !this.props.lekhakLoading) {
            return(<div><p>No mentionable authors found.</p></div>);
        }
        //else
        return (
            Object.keys(this.props.lekhakDict).map((key, index) => (
                <div className="renderAuthors">
                    <div className="authorName">{key} - <span>{this.props.lekhakDict[key]} Books</span></div>
                    <div className="bookNames"><p onClick={this.getLekhakBooks(key)}>View Books</p></div>
                </div>
            ))
        );
    }

    renderAlphabets = (alpha) => {
        return (
            alpha.map((letter) => (
                <button value={letter.key} className={this.props.isBtnClicked === letter.key? "alphabetsClicked" : "alphabetsUnclicked"} onClick={this.getLekhakNames(letter.key)}>{letter.key}</button>
            ))
        )
    }

    sortKeys(obj_1) { 
        var key = Object.keys(obj_1) 
            .sort(function order(key1, key2) { 
                if (key1 < key2) return -1; 
                else if (key1 > key2) return +1; 
                else return 0; 
            });  
          
        var temp = {};   
        for (var i = 0; i < key.length; i++) { 
            temp[key[i]] = obj_1[key[i]]; 
            delete obj_1[key[i]]; 
        }

        for (i = 0; i < key.length; i++) { 
            obj_1[key[i]] = temp[key[i]]; 
        }
          
        return obj_1; 
    }

    goBack() {
        this.props.setParentState({ lekhakSearched: false });
    }

    componentDidMount() {
        this.props.setParentState({ lekhakSearched: this.props.lekhakSearched });
    }

    render() {
        var online = navigator.onLine;
        console.log("Online? : ", online);
        if(!online) {
            return("You are offline. Please check your connection.");
        }
        return (
            <div className="lekhakList">
                <div>
                    <div>
                        <div className="toggleBtn">
                            <button 
                            className={this.props.activeTab === 1 ? "clickedBtn" : "unclickedBtn"} 
                            onClick={() => { this.toggle(1); }}
                            >
                                Marathi
                            </button>
                            <button 
                            className={this.props.activeTab === 2 ? "clickedBtn" : "unclickedBtn"} 
                            onClick={() => { this.toggle(2); }}
                            >
                                English
                            </button>
                        </div>
                        <div>
                            <div>
                                {this.props.activeTab === 1 ?
                                    <div className="ButtonContainer">
                                        {this.renderAlphabets(Akshar)}
                                    </div>
                                    : null}
                            </div>
                            <div>
                                {this.props.activeTab === 2 ?
                                    <div className="ButtonContainer">
                                        {this.renderAlphabets(Alphabets)}
                                    </div>
                                    : null}
                            </div>
                        </div>
                    </div>    
                </div>
                {!this.props.lekhakSearched && 
                    <div className="authorsList">
                        {this.props.lekhakLoading ? <Loading page="lekhakList"/> : null} 
                        {this.renderAuthors()}
                    </div>
                }
            </div>
        )
    }

}

export default LekhakList;