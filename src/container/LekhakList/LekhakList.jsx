import React, { Component } from 'react'
import './LekhakList.css'
import Card from '../../components/card/Card'
import { TabContent, TabPane, NavLink} from 'reactstrap';
import classnames from 'classnames';
import Alphabets from './Alphabets';
import Akshar from './Akshar';
import { db } from '../../firebase'

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
                    <Card bookName={data} />
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
                <button value={letter.key} onClick={this.getLekhakNames(letter.value)}>{letter.key}</button>
            )
            )
        )
    }

    render(){    
        const {character} = this.state;
        return (
            <div>
                <div>
                    <div className="toggleBtn">
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}>
                            <button className="marBtn">Marathi</button>
                        </NavLink>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}>
                            <button className="engBtn">English</button>
                        </NavLink>
                    </div>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            {this.state.activeTab == 1 ? 
                            <div className="ButtonContainer">
                            {this.renderAkshars()}
                            </div> 
                            : null}
                        </TabPane>
                        <TabPane tabId="2">
                            {this.state.activeTab == 2 ? 
                            <div className="ButtonContainer">
                                {this.renderAlphabets()}
                        </div>
                            : null}
                        </TabPane>
                    </TabContent>
                </div>

                <div >
                    {this.renderAuthors()}
                </div>
                <div id="pranavTest"></div>
            </div>
            
        )
    }

}

export default LekhakList;