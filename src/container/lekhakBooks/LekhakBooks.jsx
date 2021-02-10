import React, { Component } from 'react'
import ListSection from "../../components/list-section/ListSection";
import { db } from '../../firebase'
import Loading from '../../components/loading/Loading';



class LekhakBooks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lekhakSearched: this.props.lekhakSearched,
            lekhakResults: this.props.lekhakResults,
            currentLekhak: this.props.currentLekhak,
        };
    }


    getLekhakBooks = value => async () => {
        console.log("getLekhakBooks called");
        let lekhakName = value;
        this.props.setParentState({
            lekhakSearched: false,
            lekhakResults: [],
            currentLekhak: lekhakName,
            //lekhakSearched: true
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
        this.props.setParentState({
            lekhakSearched : true
        });
        //const bookNamesArray = doc.data().lekhakNameJoint;
    }

    // goBack() {
    //     this.props.setParentState({ lekhakSearched: false });
    // }

    componentDidMount() {
        this.props.setParentState({ lekhakSearched: this.props.lekhakSearched });
        //console.log(this.props);
    }

    render() {
        //const { character } = this.props;
        var online = navigator.onLine;
        console.log("Online? : ", online);
        if(!online) {
            return("You are offline. Please check your connection.");
        }
        return (
            <div>
                {this.props.lekhakSearched && 
                    <div className="lekhakBooklist">
                        <h1>लेखक : { this.props.currentLekhak }</h1>
                        {/* <button onClick={this.getLekhakNames(this.props.currentLekhak.charAt(0))} className="clickedBtn" key="keyLekhakGoBackButton">Go Back</button> */}
                        <ListSection
                            setCurrentDetails={this.props.setCurrentDetails}
                            tableElements={this.props.lekhakResults}
                            searched={this.props.lekhakSearched}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default LekhakBooks;