import React, { Component } from 'react'
import './LekhakList.css'
import Alphabets from './Alphabets';
import Akshar from './Akshar';
import { db } from '../../firebase'



class LekhakList extends Component {
    constructor(props){
        super(props);
        this.state={
          character : 'a',
          newItem : BookDetails,
          authorList : BookDetails,
          tableHeaders: ["id", "vibhag id", "bookName", "author"],
          matching_authors : [],
          activeTab : '1',
          lekhakArray : []
        };
        this.handleChange = this.handleChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        
    }

    getLekhakNames = value => async () => {
        let val = value;
        console.log(val);
        console.log("Firebase Query.");
        const doc = await db.collection("lekhakMapping").doc(value).get();
        const lekhakNamesArray = doc.data().names;
        this.setState(
            { lekhakArray : lekhakNamesArray }
        );
        console.log(lekhakNamesArray);
    }


    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        }
    }


    handleChange(e) {
        let temp = e.target.value;
        this.setState({
            character : e.target.value
        })
        const tempAuthor = this.state.newItem.filter((item) => {
            if(item.author.toLowerCase().includes(temp.toLowerCase())){
                return item
            }
            else{
                return null
            }
        })
        this.setState({
            authorList: tempAuthor,
          })
    }

    

    renderAuthors = () => {
        return (
            this.state.lekhakArray.map((data) => (
                <div className="renderAuthors">
                    <div className="authorName">{data}</div>
                    <div className="bookNames"><a href="#" >View Books</a></div>
                </div>)))
    }

    renderAlphabets = () => {
        return (
            Alphabets.map((letter) => (
                <button value={letter.value} onClick={this.getLekhakNames(letter.value)}>{letter.key}</button>
            )
            )
        )
    }
    renderAkshars = () => {
        return (
            Akshar.map((letter) => (
                <button value={letter.key} onClick={this.getLekhakNames(letter.key)}>{letter.key}</button>
            )
            )
        )
    }

    render(){    
        const {character} = this.state;
        return (
            <div className="lekhakList">
                <div>
                    <div className="toggleBtn">
                        
                            
                            
                            <button className="marBtn" onClick={() => { this.toggle('1'); }}>Marathi</button>
                            
                            <button className="engBtn" onClick={() => { this.toggle('2'); }}>English</button>
                        
                    </div>
                    <div >
                        <div>
                            {this.state.activeTab == 1 ? 
                            <div className="ButtonContainer">
                            {this.renderAkshars()}
                            </div> 
                            : null}
                        </div>
                        <div>
                            {this.state.activeTab == 2 ? 
                            <div className="ButtonContainer">
                                {this.renderAlphabets()}
                        </div>
                            : null}
                        </div>
                    </div>
                </div>                
                <div className="authorsList">
                    {this.renderAuthors()}
                </div>
                <div id="pranavTest"></div>
            </div>
            
        )
    }

}

export default LekhakList;