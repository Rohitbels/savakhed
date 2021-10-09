import React, { Component } from "react";
import { Spinner } from "reactstrap";
import "./listing.css";
import InputSection from "../../components/input-section/InputSection";
import ListSection from "../../components/list-section/ListSection";
import { collection } from "../../firebase";
import Loading from "../../components/loading/Loading";
import "../../components/list-section/listsection.css";
import { debug } from "request";


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
			fetchMore: false,
			searchedValue:''
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

	search = async (label, inputArray) => {
		this.setState({
			loading: true,
			error: false,
			label,
			input: inputArray.splice(0,inputArray.length /2).join(" ")
		});

		let query = null;
		let array = [];
		if (label === "pustakPrakar") {
			this.props.setParentState({
				searched: true,
			});
			inputArray = [this.props.prakar]	
			query = collection.where(label, "==", inputArray.join(" "));

			let filteredResults = await query.limit(10).get();

			this.setState({
				input: inputArray.join(" "),
				query: query,
				lastDoc: filteredResults.docs[filteredResults.docs.length - 1],
			});

			filteredResults.forEach((doc) => {
				let book = doc.data();
				array.push({ ...book, id: doc.id });
			});

			this.props.setParentState({
				results: array,
			});

			this.setState({
				loading: false,
			});

			return;
		}

		if (inputArray[0].length < 2) {
			this.setState({ error: true });
			return;
		}

		let inputArrayMulakshare = this.getMulakshara(inputArray);
		let bookParameterMulakshare = "";	
		let secondaryLabel =
			label === "pustakName" ? "pustakFullName" : "lekhakFullName";

		query =
			this.props.prakar === ""
				? collection.where(secondaryLabel, "==", inputArray.join(" "))
				: collection
						.where("pustakPrakar", "==", this.props.prakar)
						.where(secondaryLabel, "==", inputArray.join(" "));

		const first = await query.limit(10).get();

		this.setState({
			query: query,
			lastDoc: first.docs[first.docs.length - 1],
		});

		first.forEach((doc) => {
			let book = doc.data();
			array.push({ ...book, id: doc.id });
		});

		if (array.length === 0) {
			query =
				this.props.prakar === ""
					? collection.where(label, "array-contains-any", inputArray)
					: collection
							.where("pustakPrakar", "==", this.props.prakar)
							.where(label, "array-contains-any", inputArray);

			const second = await query.limit(10).get();

			let primary = [];
			let secondary = [];

			this.setState({
				query: query,
				lastDoc: second.docs[second.docs.length - 1],
			});

			second.forEach((doc) => {
				let book = doc.data();
				bookParameterMulakshare = this.getMulakshara(book[label]);

				if (inputArrayMulakshare === bookParameterMulakshare) {
					primary.push({ ...book, id: doc.id });
				} else {
					secondary.push({ ...book, id: doc.id });
				}
			});

			array = [...primary, ...secondary];
		}

		if (array.length === 0) {
			secondaryLabel =
				label === "pustakName"
					? "pustakMulakshare"
					: "lekhakMulakshare";

			query =
				this.props.prakar === ""
					? collection.where(
							secondaryLabel,
							"array-contains-any",
							inputArrayMulakshare.split(" ")
					  )
					: collection
							.where("pustakPrakar", "==", this.props.prakar)
							.where(
								secondaryLabel,
								"array-contains-any",
								inputArrayMulakshare.split(" ")
							);

			const third = await query.limit(10).get();

			let primary = [];
			let secondary = [];

			this.setState({
				query: query,
				lastDoc: third.docs[third.docs.length - 1],
			});

			third.forEach((doc) => {
				let book = doc.data();
				bookParameterMulakshare = this.getMulakshara(book[label]);

				if (inputArrayMulakshare === bookParameterMulakshare) {
					primary.push({
						...book,
						id: doc.id,
					});
				} else {
					secondary.push({
						...book,
						id: doc.id,
					});
				}
			});
			array = [...primary, ...secondary];
		}

		this.setState({
			results: array,
			loading: false,
		});

		this.props.setParentState({
			results: array,
		});

		return;
	};

	fetchMoreResults = async () => {
		if (this.state.query && this.state.lastDoc) {
			this.setState({ fetchMore : true });
			let myQuery = this.state.query;
			let myLastDoc = this.state.lastDoc;

			let moreResults = await myQuery
				.startAfter(myLastDoc)
				.limit(10)
				.get();

			let array = [];

			moreResults.docs.forEach((doc) => {
				if (
					moreResults.docs[moreResults.docs.length - 1]["id"] !==
					this.state.lastDoc["id"]
				) {
					let book = doc.data();
					array.push({
						...book,
						id: doc.id,
					});
				}
			});

			if (array.length) {
				this.props.setParentState({
					results: [...this.props.results, ...array],
				});

				this.setState({
					lastDoc: moreResults.docs[moreResults.docs.length - 1],
					fetchMore : false 
				});
			} else {
				this.setState({
					fetchMore : false 
				});
			}
		}
	};

	fetchResults = async (event) => {
		event.preventDefault();
		const { input } = this.props;
		if (input.length) {

			const marathiVersion = await fetch(
				`https://inputtools.google.com/request?text=${input}&itc=mr-t-i0-und&num=13&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`
			)
				.then((resp) => resp.json())
				.then((suggestions) => {
						try {
							return suggestions[1][0][1];
						} catch {

						}
				});
			this.props.setParentState({ results: [], searched: true });
				
			let inputString = input
				.replace(
					/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g,
					""
				)
				.toLowerCase()
				.trim();
			if(marathiVersion && marathiVersion.length) {
				inputString = inputString.concat(" ", marathiVersion[0])
			}
	
			let inputArray = inputString.split(" ");

			// reducing the array to max length 10
			if (inputArray.length > 10) {
				inputArray.splice(9, inputArray.length - 10);
			}

			await this.search(this.props.searchAgainst, inputArray);
		} else {
			if(this.props.prakar)
				await this.search('pustakPrakar');
			else 
				this.props.setParentState({ results: [], searched: false });
		}
	};

	getMulakshara = (inputArray) => {
		let superArray = [];

		inputArray.forEach((word) => {
			chinha.forEach((chinh) => {
				word = word.replace(new RegExp(chinh, "g"), "");
			});
			superArray.push(word);
		});

		return superArray.join(" ");
	};

	render() {
		const { search, props } = this;
		const { setParentState } = props;
		const { label, input } = this.state;
		return (
			<div className="listing-container">
				<div className="top-section-listing"> 
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
					inputValue={this.props.input}
					onSearch={(event) => this.fetchResults(event)}
					bookType={this.props.prakar}
					setBookType={(prakar) => {
						setParentState({
							prakar: prakar,
							searched: false,
						},()=>{
							if( prakar)
							search('pustakPrakar') 
							else {
								setParentState({results:[]})
							}
						});
					}}
					searchAgainst={this.props.searchAgainst}
					onChange={(event) => {
						setParentState({
							searchAgainst: event.target.value,
						});
					}}
					setError={this.state.error}
				/>
				</div>
				{this.state.error ? null : this.state.loading ? (
					<div className="table-super">
						<Loading page="listing" />
					</div>
				) : null}
				<ListSection
					setCurrentDetails={this.props.setCurrentDetails}
					tableElements={this.props.results}
					searched={
						this.props.searched ||
						(this.props.input && this.state.results.length)
					}
					setBookType={(prakar, searchFilter) => {
						this.props.setParentState({
							prakar: prakar
						},()=>{
							searchFilter()
						});
					}}
					bookType={this.props.prakar}
					searchFilter={this.search}
					typeOfSearch={label === "pustakName"? "पुस्तक": "लेखक"}
					input={input}

				/>
				{this.state.fetchMore ? <Spinner color="primary"> </Spinner> : null}

			</div>
		);
	}
}

export default Listing;
