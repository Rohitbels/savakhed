import React, { Component } from 'react'
import './details.css'
import Card from '../card/Card'

class Details extends Component {
    constructor(){
        super();
        this.state={
          gotData : false,
          resultScore : 0,
          url : "",
          license : "",
          articleBody : "",
          name : "",
          description : "",
          temp : ""
        };
    }

    componentWillMount() {
       
        this.getData();
      //  this.setState({temp : this.props.bookName})
    }

    getData() {
        var xhr = new XMLHttpRequest()
        var query = ["the","alchemist"]
        
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
          //console.log(xhr.responseText)
          
          let jsonData = JSON.parse(xhr.responseText);
          this.setState({
              gotData : true,
              resultScore : jsonData.itemListElement[0].resultScore,
              url : jsonData.itemListElement[0].result.detailedDescription.url,
              license : jsonData.itemListElement[0].result.detailedDescription.license,
              articleBody : jsonData.itemListElement[0].result.detailedDescription.articleBody,
              name : jsonData.itemListElement[0].result.name,
              description : jsonData.itemListElement[0].result.description
          });

          //this.setState({ gotData : true, itemList : jsonData.itemListElement[0].resultScore });
          
        })
        xhr.open('GET', 'https://kgsearch.googleapis.com/v1/entities:search?query='+query+'&key=AIzaSyAY9Boy7kdeOmi7JYAfI2zR8Ij3iF_zgxM&limit=1&indent=True')
        xhr.send()
      }


render(){    
    const {jsonData, resultScore, url, license, name, description} = this.state;
    return (
    <div>
        <div className="details_back">
        <a href="#/search">
            <button className="back_btn">
                Go Back
            </button>
        </a>
        <hr className="hr"/>
      </div>
        <div className="flex-container">
            <div className="cardDetails">
            <div className="details_image">
            <img src="https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg" alt="Book Image" className="book_image" />
            </div>
            <div className="book_details">
                <div className="rows">
                    <div className="label">Book Name</div>
                    <span className="book_name">{this.props.bookName}</span>
                </div>
                <hr className="hr-inLabel"/>
                <div className="rows">
                    <span className="label">Author</span>
                    <span className="book_name">{this.props.author}</span>
                </div>
                <hr className="hr-inLabel" />
                <div className="rows">
                    <span className="label">Year Of Release</span>
                    <span className="book_name">{this.props.year}</span>
                </div>
                <hr className="hr-inLabel" />
                <div className="rows">
                    <span className="label">Publication</span>
                    <span className="book_name">The Alchemist</span>
                </div>
                <hr className="hr-inLabel" />
                <br/>
            </div>
        </div>
       
        </div>
        {/* here, the result of the google api can be passed as props to the Card Component */}
        
        <Card bookName="The Alchemist">
                <div className="googleDetails">
                    <div className="eachgoogleDetails">Result Score : <h6>{this.state.resultScore}</h6></div>
                    <div className="eachgoogleDetails">Url : <h6>{this.state.url}</h6> </div>
                    <div className="eachgoogleDetails">License : <h6>{this.state.license}</h6></div>
                    <div className="eachgoogleDetails">Article Body : <h6>{this.state.articleBody}</h6> </div>
                    <div className="eachgoogleDetails">Name : <h6>{this.state.name} </h6></div>
                    <div className="eachgoogleDetails">Description : <h6>{this.state.description}</h6></div>
                </div>
        </Card>
        
        </div>
    )
}
}

export default Details;