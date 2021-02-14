import React, { Component } from "react";
import "./details.css";
import Card from "../../components/card/Card";
import { db } from "../../firebase";
import {WhatsappShareButton, WhatsappIcon} from 'react-share';
import HelmetMetaData from './helmet';

class Details extends Component {
    constructor(props) {
        super(props);
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
        var query = this.props.bookDetail.pustakNameEnglish; 

        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            //console.log(xhr.responseText)

            // destructuring
            const { itemListElement = [] } = JSON.parse(xhr.responseText);
            const { result = {}, resultScore = {} } = (itemListElement.length && itemListElement[0]) || {};
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
        xhr.open('GET', 'https://kgsearch.googleapis.com/v1/entities:search?query=' + query +'&key=AIzaSyAY9Boy7kdeOmi7JYAfI2zR8Ij3iF_zgxM&limit=1&indent=True')
        xhr.send()
    }


    async getFirebaseData() {
        const doc = await db.collection("bookList")
            .doc(this.getIdFromUrl()).get()
        const firebaseBookDetail = doc.data();
        console.log(firebaseBookDetail)
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
                <HelmetMetaData bookName={currentBook.pustakName.join(" ")} description={currentBook.pustakName.join(" ")} image={currentBook.imageURL}></HelmetMetaData>
                {/* conditional rendering, if details are found */}
                <div className="flex-container">
                {currentBook.pustakName &&    
                        <Card bookName="Book Details">
                        <div className="cardDetails">
                        <div className="book_img">
                                    {currentBook.imageUrl != "" ?
                                        <img src={currentBook.imageURL} alt="book image" className="book_img_class"/>
                                    :<div></div>
                                    }
                                </div>
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
                                <div className="source">Book details provided by : {currentBook.usermail} </div>
                            </div>
                        </div>
                        </Card>

                }
            
                <div className="whatsappShare">
                <WhatsappShareButton title={"Check this book : "+ currentBook.pustakName.join(" ") +" "}  separator="  " url={window.location.href} size={36}   >
                    <WhatsappIcon size={46} round={true}/>
                </WhatsappShareButton>
                </div>
                {this.state.GresultScore > 140 && this.state.GarticleBody !== "" &&
                    <Card bookName={this.state.Gname} whichCard="google">
                        <div className="googleDetails">
                            {/* <div className="eachgoogleDetails">Result Score : <div className="googleResult">{this.state.GresultScore}</div></div> */}
                            {this.state.GarticleBody !== "" &&
                            <div className="eachgoogleDetails">Article Body : <div className="googleResult">{this.state.GarticleBody}</div></div>
                            } 
                            {this.state.Gdescription !== "" &&
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
}

export default Details;
