import React, { Component } from 'react'
import './details.css'
import Card from '../card/Card'
import { db } from '../../firebase'

class Details extends Component {
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
            dakhalId: 0,
            lekhak: "",
            pustakName: "",
            pustakPrakar: "",
            vibhagId: 0
        };
    }

    componentDidMount() {
        this.getFirebaseData();
        this.getGoogleData();
    }

    

    getGoogleData() {
        var xhr = new XMLHttpRequest()
        var query = this.props.bookDetail.pustakNameEnglish

        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            //console.log(xhr.responseText)

            let jsonData = JSON.parse(xhr.responseText);
            this.setState({
                gotGoogleData: true,
                resultScore: jsonData.itemListElement[0].resultScore,
                url: jsonData.itemListElement[0].result.detailedDescription.url,
                license: jsonData.itemListElement[0].result.detailedDescription.license,
                articleBody: jsonData.itemListElement[0].result.detailedDescription.articleBody,
                name: jsonData.itemListElement[0].result.name,
                description: jsonData.itemListElement[0].result.description
            });

        })
        xhr.open('GET', 'https://kgsearch.googleapis.com/v1/entities:search?query=' + query + '&key=AIzaSyAY9Boy7kdeOmi7JYAfI2zR8Ij3iF_zgxM&limit=1&indent=True')
        xhr.send()
    }


    getFirebaseData() {
            var tempPustakName = this.props.bookDetail.pustakName;
            db.collection("bookList")
            .where("dakhalId", "==", this.props.bookDetail.dakhalId).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    const obj = doc.data();
                    console.log(obj);
                    this.setState({
                        gotFirebaseData: true,
                        dakhalId: obj.dakhalId,
                        lekhak: this.nameArrayToString(obj.lekhak),
                        pustakName: this.nameArrayToString(obj.pustakName),
                        pustakPrakar: obj.pustakPrakar,
                        vibhagId: obj.vibhagId
                    });
                    console.log(this.state);
                });
            })
            .catch((error) => console.error(error)
        );
    }

    //Return one string for array of name
    nameArrayToString(nameArray) {
        let strName = "";
        for(let i = 0; i < nameArray.length; i++) {
            if(i !== 0)
                strName += " ";
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
        return (
            <div>
                <div className="details_back">
                    <a href="#/search">
                        <button className="back_btn">
                            Go Back
                        </button>
                    </a>
                    <hr className="hr" />
                </div>

                {/* conditional rendering, if details are found */}
                {this.state.gotFirebaseData  && 
                <div className="flex-container">
                    <div className="cardDetails">
                        <div className="details_image">
                            <img src="https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg" alt="Book Cover" className="book_image" />
                        </div>
                        <div className="book_details">
                            <hr className="hr-inLabel" />
                            <div className="rows">
                                <span className="label">dakhalId</span>
                                <span className="book_name">{this.state.dakhalId} </span>
                            </div>
                            <hr className="hr-inLabel" />
                            <div className="rows">
                                <span className="label">vibhagId</span>
                                <span className="book_name">{this.state.vibhagId}</span>
                            </div>
                            <hr className="hr-inLabel" />
                            <div className="rows">
                                <span className="label">pustakName</span>
                               <a href={this.state.url} target="_blank" > <span className="book_name">{this.state.pustakName}</span></a> 
                            </div>
                            <hr className="hr-inLabel" />
                            <div className="rows">
                                <span className="label">lekhak</span>
                                <span className="book_name">{this.state.lekhak}</span>
                            </div>
                            <hr className="hr-inLabel" />
                            <div className="rows">
                                <span className="label">pustakPrakar</span>
                                <span className="book_name">{this.state.pustakPrakar}</span>
                            </div>
                            <hr className="hr-inLabel" />
                            <br />
                        </div>
                    </div>
                </div>
            }

            {/* conditional rendering, if details not found!, will have to put a wait time of 2 secs*/}
            {/* {this.state.gotFirebaseData === false &&
                <div>
                    <h3>Book details not found</h3>
                </div>
            } */}


                {this.state.resultScore > 0 && 
                    <Card bookName={this.state.name}>
                    <div className="googleDetails">
                        <div className="eachgoogleDetails">Result Score : <div className="googleResult">{this.state.resultScore}</div></div>
                        {/* <div className="eachgoogleDetails"> : <h6>{this.state.url}</h6> </div>
                        <div className="eachgoogleDetails">License : <h6>{this.state.license}</h6></div> */}
                        <div className="eachgoogleDetails">Article Body : <div className="googleResult">{this.state.articleBody}</div></div>
                        {/* <div className="eachgoogleDetails">Name : <h6>{this.state.name} </h6></div> */}
                        <div className="eachgoogleDetails">Description : <div className="googleResult">{this.state.description}</div></div>
                        <div className="source">source : Google </div>
                    </div>
                </Card>
                }
                
            </div>
        )
    }
}

export default Details;