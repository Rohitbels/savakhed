import React, { Component } from 'react'
import './details.css'
import Card from '../../components/card/Card'
import { db } from '../../firebase'



class Details extends Component {
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
        const currURL = window.location.href.split("/");
        const urlID  = currURL[currURL.length-1];
        console.log("url id", urlID)

        const { bookDetail = {} } = this.props;
         if(!bookDetail.pustakName) {
             this.getFirebaseData();
         }
         this.getGoogleData();

    }



    getGoogleData() {
        var xhr = new XMLHttpRequest()
        var query = this.props.bookDetail.pustakNameEnglish

        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            console.log(xhr.responseText)

            this.setState({ jsonData: JSON.parse(xhr.responseText) })
            // destructuring
            const { jsonData } = this.state;
            const { itemListElement = [0] } = jsonData;
            const { result = {}, resultScore = {} } = itemListElement[0];
            const { detailedDescription = '', name = {}, description = '' } = result;
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


    getFirebaseData() {
        db.collection("bookList")
            .where("id", "==", this.props.bookDetail.dakhalId).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    const bookDetail = doc.data();
                    this.setState({
                        bookDetail
                    });
                });
            })
            .catch((error) => console.error(error)
            );
    }

    //Return one string for array of name
    nameArrayToString(nameArray) {
        let strName = "";
        for (let i = 0; i < nameArray.length; i++) {
            if (i !== 0)
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
        const { bookDetail: stateBookDetails } = this.state;
        const { bookDetail: propsBookDetails } = this.props;
        console.log(propsBookDetails)
        debugger
        const currentBook = propsBookDetails.pustakName ? propsBookDetails: stateBookDetails;
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
                {currentBook.pustakName &&
                    <div className="flex-container">
                        <div className="cardDetails">
                            <div className="details_image">
                                <img src="https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg" alt="Book Cover" className="book_image" />
                            </div>
                            <div className="book_details">
                                <hr className="hr-inLabel" />
                                <div className="rows">
                                    <span className="label">dakhalId</span>
                                    <span className="book_name">{currentBook.dakhalId} </span>
                                </div>
                                <hr className="hr-inLabel" />
                                <div className="rows">
                                    <span className="label">vibhagId</span>
                                    <span className="book_name">{currentBook.vibhagId}</span>
                                </div>
                                <hr className="hr-inLabel" />
                                <div className="rows">
                                    <span className="label">pustakName</span>
                                    <span className="book_name">{currentBook.pustakName.join(" ")}</span>
                                </div>
                                <hr className="hr-inLabel" />
                                <div className="rows">
                                    <span className="label">lekhak</span>
                                    <span className="book_name">{currentBook.lekhak.join(" ")}</span>
                                </div>
                                <hr className="hr-inLabel" />
                                <div className="rows">
                                    <span className="label">pustakPrakar</span>
                                    <span className="book_name">{currentBook.pustakPrakar}</span>
                                </div>
                                <hr className="hr-inLabel" />
                                <br />
                            </div>
                        </div>
                    </div>
                }

                {this.state.GresultScore > 100 &&
                    <Card bookName={this.state.Gname}>
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
        )
    }
}

export default Details;