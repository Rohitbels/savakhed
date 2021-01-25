import React, { Component } from "react";
import "./details.css";
import Card from "../../components/card/Card";
import { db } from "../../firebase";


class Details extends Component {
<<<<<<< HEAD
    constructor() {
        super();
        this.state = {
            gotGoogleData: false,
            GresultScore: 0,
            GarticleBody: "",
            Gname: "",
            Gdescription: "",
            gotFirebaseData: false,
            jsonData:[],
            bookDetail: {},
            
        };

    }


    componentDidMount() {
        const { bookDetail = {} } = this.props;
         if(!bookDetail.pustakName) {
             this.getFirebaseData();
         }
         this.getGoogleData();

    }


    getIdFromUrl() {
        const currURL = window.location.href.split("/");
        const urlID  = currURL[currURL.length-1];
        //console.log("url id", urlID);
        return urlID;
    }


    getGoogleData() {
        var xhr = new XMLHttpRequest()
        var query = this.props.bookDetail.pustakNameEnglish

        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            //console.log(xhr.responseText)

            // destructuring
            const { itemListElement = [] } = JSON.parse(xhr.responseText);
            const { result = {}, resultScore = {} } = itemListElement.length && itemListElement[0] || {};
            const { detailedDescription = '', name = '', description = '' } = result;
            const { articleBody = '' } = detailedDescription;
            this.setState({
                gotGoogleData: true,
                GresultScore: resultScore,
                GarticleBody: articleBody,
                Gname: name,
                Gdescription: description
            });

        })
        xhr.open('GET', 'https://kgsearch.googleapis.com/v1/entities:search?query=' + query + '&key=AIzaSyAY9Boy7kdeOmi7JYAfI2zR8Ij3iF_zgxM&limit=1&indent=True')
        xhr.send()
    }


    async getFirebaseData() {
        const doc = await db.collection("bookList")
            .doc(this.getIdFromUrl()).get()

        const firebaseBookDetail = doc.data();
        this.setState({
            bookDetail : firebaseBookDetail
        });
    }


    //Return one string for array of name
    nameArrayToString(nameArray) {
        let strName = "";
        for (let i = 0; i < nameArray.length; i++) {
            if (i !== 0)
                strName += " ";
        }
        return strName;
    }


    render() {
        const { bookDetail: stateBookDetails } = this.state;
        const { bookDetail: propsBookDetails } = this.props;
        //console.log(propsBookDetails)
        const currentBook = propsBookDetails.pustakName ? propsBookDetails: stateBookDetails;
        return (
            <div className="fullDetails">
                <div className="details_back">
                    <a href="#/search">
                        <button className="back_btn">
                            Go Back
                        </button>
                    </a>
                </div>

                {/* conditional rendering, if details are found */}
                <div className="flex-container">
                {currentBook.pustakName &&    
                        <Card bookName="Book Details">
                        <div className="cardDetails">
                            <div className="book_details">     
                                <div className="rows">
                                    <div className="col1">
                                    <span className="label">Pustak Name</span>
                                    <div className="book_name">{currentBook.pustakName.join(" ")}</div>
                                    </div>
                                    <div className="col2">
                                    <span className="label">Lekhak</span>
                                    <div className="book_name">{currentBook.lekhak.join(" ")}</div>
                                    </div>
                                </div>
                                <div className="rows">
                                    <div className="col1">
                                    <span className="label">Dakhal Id</span>
                                    <div className="book_name">{currentBook.dakhalId} </div>
                                    </div>
                                    <div className="col2">
                                    <span className="label">Vibhag Id</span>
                                    <div className="book_name">{currentBook.vibhagId}</div>
                                    </div>
                                </div>
                                <div className="rows">
                                    <div>
                                    <span className="label">Pustak Prakar</span>
                                    <div className="book_name">{currentBook.pustakPrakar}</div>
                                    </div>
                                </div>
                                {/* <hr className="hr-inLabel" /> */}
                                <br />
                            </div>
                        </div>
                        </Card>

                }
                {this.state.GresultScore > 140 && this.state.GarticleBody !== "" &&
                    <Card bookName={this.state.Gname} whichCard="google">
                        <div className="googleDetails">
                            <div className="eachgoogleDetails">Result Score : <div className="googleResult">{this.state.GresultScore}</div></div>
                            {this.state.GarticleBody != "" &&
                            <div className="eachgoogleDetails">Article Body : <div className="googleResult">{this.state.GarticleBody}</div></div>
                            } 
                            {this.state.Gdescription != "" &&
                            <div className="eachgoogleDetails">Description : <div className="googleResult">{this.state.Gdescription}</div></div>
                            }    

                            <div className="source">source : Google </div>
                        </div>
                    </Card>
                }

                </div>
                

            </div>
        )
    }
=======
	constructor() {
		super();
		this.state = {
			gotGoogleData: false,
			resultScore: 0,
			url: "",
			license: "",
			articleBody: "",
			name: "",
			description: "",
			gotFirebaseData: false,
			bookDetail: {},
		};
	}

	componentDidMount() {
		const { bookDetail = {} } = this.props;
		if (!bookDetail.pustakName) {
			//this.getFirebaseData();
			this.getGoogleData();
		}
	}

	getGoogleData() {
		var xhr = new XMLHttpRequest();
		var query = this.props.bookDetail.pustakNameEnglish;

		// get a callback when the server responds
		xhr.addEventListener("load", () => {
			//console.log(xhr.responseText)

			let jsonData = JSON.parse(xhr.responseText);
			this.setState({
				gotGoogleData: true,
				resultScore: jsonData.itemListElement[0].resultScore,
				url: jsonData.itemListElement[0].result.detailedDescription.url,
				license:
					jsonData.itemListElement[0].result.detailedDescription
						.license,
				articleBody:
					jsonData.itemListElement[0].result.detailedDescription
						.articleBody,
				name: jsonData.itemListElement[0].result.name,
				description: jsonData.itemListElement[0].result.description,
			});
		});
		xhr.open(
			"GET",
			"https://kgsearch.googleapis.com/v1/entities:search?query=" +
				query +
				"&key=AIzaSyAY9Boy7kdeOmi7JYAfI2zR8Ij3iF_zgxM&limit=1&indent=True"
		);
		xhr.send();
	}

	getFirebaseData() {
		db.collection("bookList")
			.where("dakhalId", "==", this.props.bookDetail.dakhalId)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					const bookDetail = doc.data();
					this.setState({
						bookDetail,
					});
				});
			})
			.catch((error) => console.error(error));
	}

	//Return one string for array of name
	nameArrayToString(nameArray) {
		let strName = "";
		for (let i = 0; i < nameArray.length; i++) {
			if (i !== 0) strName += " ";
			strName += this.capitalizeString(nameArray[i]);
		}
		return strName;
	}

	//Return a String with words having capital letters
	capitalizeString(lowerString) {
		let capitalized = "";
		capitalized += lowerString.charAt(0).toUpperCase();
		capitalized += lowerString.slice(1);
		return capitalized;
	}

	render() {
		const { bookDetail: stateBookDetails } = this.state;
		const { bookDetail: propsBookDetails } = this.props;

		const currentBook = propsBookDetails.pustakName
			? propsBookDetails
			: stateBookDetails;
		return (
			<div>
				{/* conditional rendering, if details are found */}
				{currentBook.pustakName && (
					<div className="flex-container">
						<div className="cardDetails">
							<div className="details_image">
								<img
									src="https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg"
									alt="Book Cover"
									className="book_image"
								/>
							</div>
							<div className="book_details">
								<hr className="hr-inLabel" />
								<div className="rows">
									<span className="label">dakhalId</span>
									<span className="book_name">
										{currentBook.dakhalId}{" "}
									</span>
								</div>
								<hr className="hr-inLabel" />
								<div className="rows">
									<span className="label">vibhagId</span>
									<span className="book_name">
										{currentBook.vibhagId}
									</span>
								</div>
								<hr className="hr-inLabel" />
								<div className="rows">
									<span className="label">pustakName</span>
									<a href={currentBook.url} target="_blank">
										{" "}
										<span className="book_name">
											{currentBook.pustakName.join(" ")}
										</span>
									</a>
								</div>
								<hr className="hr-inLabel" />
								<div className="rows">
									<span className="label">lekhak</span>
									<span className="book_name">
										{currentBook.lekhak.join(" ")}
									</span>
								</div>
								<hr className="hr-inLabel" />
								<div className="rows">
									<span className="label">pustakPrakar</span>
									<span className="book_name">
										{currentBook.pustakPrakar}
									</span>
								</div>
								<hr className="hr-inLabel" />
								<br />
							</div>
						</div>
					</div>
				)}

				{/* conditional rendering, if details not found!, will have to put a wait time of 2 secs*/}
				{/* {this.state.gotFirebaseData === false &&
                <div>
                    <h3>Book details not found</h3>
                </div>
            } */}

				{this.state.resultScore > 0 && (
					<Card bookName={this.state.name}>
						<div className="googleDetails">
							<div className="eachgoogleDetails">
								Result Score :{" "}
								<div className="googleResult">
									{this.state.resultScore}
								</div>
							</div>
							{/* <div className="eachgoogleDetails"> : <h6>{this.state.url}</h6> </div>
                        <div className="eachgoogleDetails">License : <h6>{this.state.license}</h6></div> */}
							<div className="eachgoogleDetails">
								Article Body :{" "}
								<div className="googleResult">
									{this.state.articleBody}
								</div>
							</div>
							{/* <div className="eachgoogleDetails">Name : <h6>{this.state.name} </h6></div> */}
							<div className="eachgoogleDetails">
								Description :{" "}
								<div className="googleResult">
									{this.state.description}
								</div>
							</div>
							<div className="source">source : Google </div>
						</div>
					</Card>
				)}
			</div>
		);
	}
>>>>>>> upstream/master
}

export default Details;
