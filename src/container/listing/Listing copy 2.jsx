import React, { Component } from "react";
import "./listing.css";
import InputSection from "../../components/input-section/InputSection";
import ListSection from "../../components/list-section/ListSection";
import { collection } from "../../firebase";
import Loading from "../../components/loading/Loading";
import "../../components/list-section/listsection.css";

const chinha = [
	"्",
	"ा",
	"ि",
	"ी",
	"ु",
	"ू",
	"े",
	"ै",
	"ो",
	"ौ",
	"ं",
	"ॅ",
	"ॉ",
	"ः",
	"ृ",
];

class Listing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			input: "",
			searchAgainst: "pustakName",
			results: [],
			query: null,
			lastDoc: null,
			error: false,
		};

		// eslint-disable-next-line
		const oldScrollTop = 0;
	}

	componentDidMount() {
		window.onscroll = async () => {
			if (window.scrollY > this.oldScrollTop) {
				let windowHeight = window.innerHeight + window.scrollY;
				let documentOffset = (document.body.offsetHeight * 9) / 10;

				if (windowHeight > documentOffset) {
					this.fetchMoreResults();
				}
			}
			this.oldScrollTop = window.scrollY;
		};
	}

	render(){
		const { setParentState, input, prakar, searchAgainst } = this.props;
		return <div className="container">
			<div className="top-section">  
				<div className="logo">
					<span id="name">सार्वजनिक वाचनालय</span>
					<br />
					<span id="place">राजगुरूनगर</span>
				</div>
				<InputSection
					onInput={(value) =>
						setParentState({
							input: value,
						})
					}
					inputValue={input}
					onSearch={(event) => this.fetchResults(event)}
					bookType={prakar}
					setBookType={(prakar) => {
						setParentState({
							prakar: prakar,
							searched: false,
						});
					}}
					searchAgainst={searchAgainst}
					onChange={(event) => {
						setParentState({
							searchAgainst: event.target.value,
						});
					}}
					setError={this.state.error}
				/>
			</div>
		</div>
	}
}

export default Listing;
