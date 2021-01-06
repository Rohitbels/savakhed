import React, { Component } from 'react'
import './LekhakList.css'
import Card from '../card/Card'


const BookDetails = [
	{
		id: "1",
		"vibhag id": "11",
		"bookName": "The Alchemist",
		"author": "Paulo Coelho",
	},
	{
		id: "2",
		"vibhag id": "22",
		"bookName": "Yoga",
		"author": "Swami Vivekananda",
	},
	{
		id: "3",
		"vibhag id": "33",
		"bookName": "Lorem Ipsum is simply dummy text",
		"author": "Lorem Ipsum",
	},
	{
		id: "4",
		"vibhag id": "44",
		"bookName": "The Alchemist",
		"author": "Paulo Coelho",
	},
	{
		id: "5",
		"vibhag id": "55",
		"bookName": "Yoga",
		"author": "Swami Vivekananda",
	},
	{
		id: "6",
		"vibhag id": "66",
		"bookName": "Lorem Ipsum is simply dummy text",
		"author": "Lorem Ipsum",
	},
	{
		id: "7",
		"vibhag id": "77",
		"bookName": "The Alchemist",
		"author": "Paulo Coelho",
	},
	{
		id: "8",
		"vibhag id": "88",
		"bookName": "Yoga",
		"author": "Swami Vivekananda",
	},
	{
		id: "9",
		"vibhag id": "99",
		"bookName": "Lorem Ipsum is simply dummy text",
		"author": "Lorem Ipsum",
	},
	{
		id: "1",
		"vibhag id": "11",
		"bookName": "Wings of Fire",
		"author": "APJ",
	},
	{
		id: "2",
		"vibhag id": "22",
		"bookName": "Yoga",
		"author": "Swami Vivekananda",
	},
	{
		id: "3",
		"vibhag id": "33",
		"bookName": "Lorem Ipsum is simply dummy text",
		"author": "Lorem Ipsum",
	},
	{
		id: "4",
		"vibhag id": "44",
		"bookName": "The Alchemist",
		"author": "Paulo Coelho",
	},
];



class LekhakList extends Component {
    constructor(props){
        super(props);
        this.state={
          character : 'a',
          newItem : BookDetails,
          authorList : BookDetails,
          tableHeaders: ["id", "vibhag id", "bookName", "author"],
          matching_authors : []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(){
        this.setState({
            //authorList : BookDetails
        })
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
        return(
        this.state.authorList.map ((data) =>(         
          <div className="renderAuthors">
            <Card bookName={data.author} /> 
         </div>)))
      }

    render(){    
        const {character} = this.state;
        return (
            <div>
                <div className="ButtonContainer">
                    <button onClick={this.handleChange} value="a">A</button>
                    <button onClick={this.handleChange} value="b">B</button>
                    <button onClick={this.handleChange} value="c">C</button>
                    <button onClick={this.handleChange} value="d">D</button>
                    <button onClick={this.handleChange} value="e">E</button>
                    <button onClick={this.handleChange} value="f">F</button>
                    <button onClick={this.handleChange} value="g">G</button>
                    <button onClick={this.handleChange} value="h">H</button>
                    <button onClick={this.handleChange} value="i">I</button>
                    <button onClick={this.handleChange} value="j">J</button>
                    <button onClick={this.handleChange} value="k">K</button>
                    <button onClick={this.handleChange} value="l">L</button>
                    <button onClick={this.handleChange} value="m">M</button>
                    <button onClick={this.handleChange} value="n">N</button>
                    <button onClick={this.handleChange} value="o">O</button>
                    <button onClick={this.handleChange} value="p">P</button>
                    <button onClick={this.handleChange} value="q">Q</button>
                    <button onClick={this.handleChange} value="r">R</button>
                    <button onClick={this.handleChange} value="s">S</button>
                    <button onClick={this.handleChange} value="t">T</button>
                    <button onClick={this.handleChange} value="u">U</button>
                    <button onClick={this.handleChange} value="v">V</button>
                    <button onClick={this.handleChange} value="w">W</button>
                    <button onClick={this.handleChange} value="x">X</button>
                    <button onClick={this.handleChange} value="y">Y</button>
                    <button onClick={this.handleChange} value="z">Z</button>
                </div>
                <div className="ButtonContainer">
                        <button onClick={this.handleChange} value="0">0</button>
                        <button onClick={this.handleChange} value="1">1</button>
                        <button onClick={this.handleChange} value="2">2</button>
                        <button onClick={this.handleChange} value="3">3</button>
                        <button onClick={this.handleChange} value="4">4</button>
                        <button onClick={this.handleChange} value="5">5</button>
                        <button onClick={this.handleChange} value="6">6</button>
                        <button onClick={this.handleChange} value="7">7</button>
                        <button onClick={this.handleChange} value="8">8</button>
                        <button onClick={this.handleChange} value="9">9</button>
                    </div>

                    {/* {this.state.character==1 &&
                    <div>
                        this is b
                    </div>
                    } */}
                <div >
                {this.renderAuthors()}
                </div>
            </div>
        )
    }

}

export default LekhakList;