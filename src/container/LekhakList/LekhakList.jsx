import React, { Component } from "react";
import "./LekhakList.css";
import ListSection from "../../components/list-section/ListSection";
import Alphabets from "./Alphabets";
import Akshar from "./Akshar";
import { collection, db } from "../../firebase";
import Loading from "../../components/loading/Loading";

class LekhakList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			activeTab: 1,
			lekhakDict: {},
			searched: false,
			//tableHeaders: [],
			results: [],
			currentLekhak: "",
			isBtnClicked: null,
		};

		this.toggle = this.toggle.bind(this);
	}

	getLekhakNames = (value) => async () => {
		this.setState({
			loading: true,
			searched: false,
			isBtnClicked: value,
			lekhakDict: {},
		});
		//let val = value;
		//console.log(val);
		const doc = await db.collection("newMappingTrial").doc(value).get();
		let lekhakNamesDict = doc.data().names;
		lekhakNamesDict = this.sortKeys(lekhakNamesDict);
		this.setState({ lekhakDict: lekhakNamesDict, loading: false });
		//console.log(lekhakNamesDict);
		//console.log(this.state.loading);
	};

	getLekhakBooks = async (value) => {
		let lekhakName = value;
		this.setState({
			lekhakDict: {},
			searched: false,
			//tableHeaders: [],
			results: [],
			currentLekhak: lekhakName,
		});
		await collection
			.where(
				"lekhakFullName",
				"==",
				"जॉन ग्रिशम"
			) /************************* Change this to compare "lekhakName" variable ***********************/
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					let currentBook = doc.data();
					this.setState({
						results: this.state.results.concat([
							{ ...currentBook, id: doc.id },
						]),
					});
					console.log(currentBook.lekhak, currentBook.pustakName);
				});
			});
		this.setState({
			//tableHeaders: ["Dakhal-ID", "Vibhag-ID", "Book", "Author"],
			searched: true,
		});
		//const bookNamesArray = doc.data().lekhakNameJoint;
	};

	toggle(tab) {
		this.setState({
			searched: false,
			lekhakDict: {},
		});
		if (this.state.activeTab !== tab) {
			this.setState({ activeTab: tab });
		}
	}

	renderAuthors = () => {
		return Object.keys(this.state.lekhakDict).map((key, index) => (
			<div className="renderAuthors">
				<div className="authorName">
					{key} - <span>{this.state.lekhakDict[key]} Books</span>
				</div>
				<div className="bookNames">
					<p onClick={this.getLekhakBooks(key)}>View Books</p>
				</div>
			</div>
		));
	};

	renderAlphabets = (alpha) => {
		return alpha.map((letter) => (
			<button
				value={letter.key}
				className={
					this.state.isBtnClicked === letter.key
						? "alphabetsClicked"
						: "alphabetsUnclicked"
				}
				onClick={this.getLekhakNames(letter.key)}
			>
				{letter.key}
			</button>
		));
	};

	sortKeys(obj_1) {
		var key = Object.keys(obj_1).sort(function order(key1, key2) {
			if (key1 < key2) return -1;
			else if (key1 > key2) return +1;
			else return 0;
		});

		var temp = {};
		for (var i = 0; i < key.length; i++) {
			temp[key[i]] = obj_1[key[i]];
			delete obj_1[key[i]];
		}

		for (i = 0; i < key.length; i++) {
			obj_1[key[i]] = temp[key[i]];
		}

		return obj_1;
	}

	render() {
		//const { character } = this.state;
		var online = navigator.onLine;
		console.log("Online? : ", online);
		if (!online) {
			return "You are offline. Please check your connection.";
		}
		return (
			<div className="lekhakList">
				<div>
					<div>
						<div className="toggleBtn">
							<button
								className={
									this.state.activeTab === 1
										? "clickedBtn"
										: "unclickedBtn"
								}
								onClick={() => {
									this.toggle(1);
								}}
							>
								Marathi
							</button>
							<button
								className={
									this.state.activeTab === 2
										? "clickedBtn"
										: "unclickedBtn"
								}
								onClick={() => {
									this.toggle(2);
								}}
							>
								English
							</button>
						</div>
						<div>
							<div>
								{this.state.activeTab === 1 ? (
									<div className="ButtonContainer">
										{this.renderAlphabets(Akshar)}
									</div>
								) : null}
							</div>
							<div>
								{this.state.activeTab === 2 ? (
									<div className="ButtonContainer">
										{this.renderAlphabets(Alphabets)}
									</div>
								) : null}
							</div>
						</div>
					</div>
				</div>

				{!this.state.searched && (
					<div className="authorsList">
						{this.state.loading ? (
							<Loading page="lekhakList" />
						) : null}
						{this.renderAuthors()}
					</div>
				)}
				{this.state.searched && (
					<div className="lekhakBooklist">
						<h1>लेखक : {this.state.currentLekhak}</h1>
						<ListSection
							setCurrentDetails={this.props.setCurrentDetails}
							//tableHeaders={this.state.tableHeaders}
							tableElements={this.state.results}
							searched={this.state.searched}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default LekhakList;
