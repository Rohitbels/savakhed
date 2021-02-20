import React, { Component } from 'react'
import ListSection from "../../components/list-section/ListSection";
import { db } from '../../firebase'
import './LekhakBooks.css'

/***********************************************
 * Image URL Functions
 * Function calls in order
 *  getImgURL(query) --> downloadFile(url, filename) --> upload(file, filename) --> update(url)
 * 	Only getImgURL needs to be called with query
 ***********************************************/
import { storage } from "../../firebase";
const storageRef = storage.ref();
const API_KEY = "AIzaSyB1TtjgdaS-JyFVHFmWz_OMXhg8ft5Tbpw";
const AUTHORS_ENGINE = "af35ce6be8762aee9";
const STORAGE_LOCATION = "authors";


class LekhakBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lekhakSearched: this.props.lekhakSearched,
            lekhakResults: this.props.lekhakResults,
            currentLekhak: this.props.currentLekhak,
            imgURL: ""
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
            .where("lekhakFullName", "==", value)       /************************* Change this to compare "lekhakName" variable ***********************/
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

    //Img URL Function
    getImgURL = (query, selfObj) => {
        const xhr = new XMLHttpRequest();
        let url = "";
        xhr.addEventListener("load", () => {
            const json = JSON.parse(xhr.responseText);
            const { items = [] } = json;

            try {
                // If it finds Image URL
                url = items[0].image.thumbnailLink; // Temporary image url from search results
                //console.log("URL result : ", url);
            
                var xhrDownload = new XMLHttpRequest();
                xhrDownload.responseType = "blob";
                xhrDownload.onload = function () {
                    //File Upload to Firebase Storage
                    var metadata = {
                        contentType: "image/jpg",
                    };
                    let uploadTask = storageRef
                        .child(`${STORAGE_LOCATION}/${query.replaceAll(" ", "_")}`)
                        .put(xhrDownload.response, metadata);
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            //var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        },
                        (error) => {
                            console.log(error);
                        },
                        () => {
                            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                                // downloadURL is URL to access image from storage
                                //console.log("File available at", downloadURL);

                                //console.log("update function() : " + downloadURL)
                                //console.log(selfObj);

                                //console.log(selfObj.props.lekhakDict[selfObj.props.currentLekhak]);
                                let currLekhakDict = selfObj.props.lekhakDict;
                                currLekhakDict[selfObj.props.currentLekhak].imgURL = downloadURL;
                                //console.log(currLekhakDict[selfObj.props.currentLekhak])
                                
                                //console.log("Firebase in Temp Function");
                                db.collection("newMappingStructure")
                                    .doc(selfObj.props.isBtnClicked)
                                    .update({
                                        names: currLekhakDict,
                                    })
                                    .then(function () {
                                        selfObj.props.setParentState({ lekhakDict : currLekhakDict });
                                        console.log("Written to new collection in Firebase from trial function." + selfObj.props.currentLekhak);
                                        console.log(selfObj.props);
                                    });

                                // update(downloadURL); // Function Call
                            });
                        }
                    );

                };
                xhrDownload.open("GET", url);
                xhrDownload.send();
            
            } catch (error) {
                // If it doesnt find Image URL
                console.log("image set to default");
                console.log(error);
            }
        });
        xhr.open(
            "GET",
            `https://customsearch.googleapis.com/customsearch/v1/siterestrict?searchType=image&cx=${AUTHORS_ENGINE}&q=${encodeURI(
                query
            )}&key=${API_KEY}`
        );
        xhr.send();
    };

    /*******************************************************
     * End of Image URL Functions
     *******************************************************/

    async componentDidMount() {
        this.props.setParentState({ lekhakSearched: this.props.lekhakSearched });
        //console.log(this);
        //console.log(this.props.lekhakDict[this.props.currentLekhak].imgURL);
        if(this.props.lekhakDict[this.props.currentLekhak].imgURL === undefined) {
            await this.getImgURL(this.props.currentLekhak, this);
        }
    }

    render() {
        var online = navigator.onLine;
        console.log("Online? : ", online);
        if(!online) {
            return("You are offline. Please check your connection.");
        }
        return (
            <div>
                <div className="lekhakBooklist">
                    <h1>लेखक : { this.props.currentLekhak }</h1>
                    <div className="author_img">
                        {this.props.lekhakDict[this.props.currentLekhak].imgURL !== "" || this.props.lekhakDict[this.props.currentLekhak].imgURL !== undefined ?
                            <img src={this.props.lekhakDict[this.props.currentLekhak].imgURL} alt="" className="author_img_class"/>
                        :<div></div>
                        }
                    </div>
                    <ListSection
                        setCurrentDetails={this.props.setCurrentDetails}
                        tableElements={this.props.lekhakResults}
                        searched={true}
                    />
                </div>
                
            </div>
        )
    }
}

export default LekhakBooks;