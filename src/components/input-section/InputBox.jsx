import Autosuggest from "react-autosuggest";
import React from "react";
import ReactDOM from "react-dom";
import "./inputbox.css";

// Teach Autosuggest how to calculate suggestions for any given input value.

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion) => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion) => <span>{suggestion.name}</span>;

export default class InputBox extends React.Component {
	constructor(props) {
		super(props);

		// Autosuggest is a controlled component.
		// This means that you need to provide an input value
		// and an onChange handler that updates this value (see below).
		// Suggestions also need to be provided to the Autosuggest,
		// and they are initially empty because the Autosuggest is closed.
		this.state = {
			value: this.props.value ? this.props.value : "",
			suggestions: [],
		};
	}

	getSuggestions = (value) => {
		const inputValue = value.toLowerCase();

		if (this.props.shouldSuggest && inputValue.length) {
			fetch(
				`https://inputtools.google.com/request?text=${inputValue}&itc=mr-t-i0-und&num=13&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`
			)
				//fetch(`https://api.github.com/search/users?q=${query}`)
				.then((resp) => resp.json())
				.then((suggestions) => {
					var res = suggestions[1][0][1];

					var s = res.map((i) => {
						return { name: i, year: i };
					});

					if (inputValue[inputValue.length - 1] === " ")
						this.setState({ value: s[0]["name"], suggestions: s });
					else this.setState({ suggestions: s });
				});
		}
	};

	onChange = (event, { newValue }) => {
		this.setState({
			value: newValue,
		});

		this.props.onInput(newValue.toLowerCase());
	};

	// Autosuggest will call this function every time you need to update suggestions.
	// You already implemented this logic above, so just use it.
	onSuggestionsFetchRequested = ({ value }) => {
		this.getSuggestions(value);
	};

	// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: [],
		});
	};
	getValue = () => {
		return { task: this.state.value };
	};
	getInputNode = () => {
		return ReactDOM.findDOMNode(this).getElementsByTagName("input")[0];
	};

	render() {
		const { value, suggestions } = this.state;

		// Autosuggest will pass through all these props to the input.
		const inputProps = {
			placeholder: this.props.placeholder,
			value,
			type: "search",
			onChange: this.onChange,
		};

		// Finally, render it!
		return (
			<div
				className={`input-container ${
					suggestions.length && this.props.shouldSuggest
						? ""
						: "no-suggestion"
				}`}
				height={this.props.height}
				onKeyDown={this.props.onKeyDown}
			>
				<Autosuggest
					suggestions={suggestions}
					onSuggestionsFetchRequested={
						this.onSuggestionsFetchRequested
					}
					onSuggestionsClearRequested={
						this.onSuggestionsClearRequested
					}
					getSuggestionValue={getSuggestionValue}
					renderSuggestion={renderSuggestion}
					inputProps={inputProps}
				/>
			</div>
		);
	}
}
