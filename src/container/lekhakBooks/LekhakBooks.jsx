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

// Updating firestore with downloadURL
// Make necessary changes here for uploading -------------------------------------------------------------
const update = async (url) => {
	console.log("update function() : " + url)
    //const docUpdate = await collection.doc(docRef).update({ imageURL: url });
};

// Uploading to storage
const upload = (file, filename) => {
	var metadata = {
		contentType: "image/jpg",
	};

	let uploadTask = storageRef
		.child(`${STORAGE_LOCATION}/${filename.replaceAll(" ", "_")}`)
		.put(file, metadata);

	uploadTask.on(
		"state_changed",
		(snapshot) => {
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		},
		(error) => {
			console.log(error);
		},
		() => {
			uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
				// downloadURL is URL to access image from storage
				console.log("File available at", downloadURL);
				update(downloadURL); // Function Call
			});
		}
	);
};

// Convert the image into blob for uploading
const downloadFile = (url, filename) => {
	var xhr = new XMLHttpRequest();
	xhr.responseType = "blob";
	xhr.onload = function () {
		console.log(xhr.response);
		upload(xhr.response, filename); // Function Call
	};
	xhr.open("GET", url);
	xhr.send();
};

// Fetch Image URL from custom search
const getImgURL = (query) => {
	const xhr = new XMLHttpRequest();
	let url = "";
	xhr.addEventListener("load", () => {
		const json = JSON.parse(xhr.responseText);
		const { items = [] } = json;

		try {
			// If it finds Image URL
			url = items[0].image.thumbnailLink; // Temporary image url from search results
			console.log("URL result : ", url);
			downloadFile(url, query); //Function call
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

class LekhakBooks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lekhakSearched: this.props.lekhakSearched,
            lekhakResults: this.props.lekhakResults,
            currentLekhak: this.props.currentLekhak,
            lekhakDict: this.props.lekhakDict,
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

    componentDidMount() {
        this.props.setParentState({ lekhakSearched: this.props.lekhakSearched });
        console.log("Current LekhakDict" + this.props.lekhakDict);
        // if(this.props.lekhakDict[this.state.currentLekhak].imgURL === undefined) {
        //     //Query the img
        //     getImgURL(this.props.currentLekhak);
        // }
        // console.log(this.props);
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
                    {/* <div className="author_img">
                        {this.props.lekhakDict[this.state.currentLekhak].imgURL !== undefined ?
                            <img src={this.props.lekhakDict.currentLekhak.imgURL} alt="author image" className="author_img_class"/>
                        :<div></div>
                        }
                    </div> */}
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