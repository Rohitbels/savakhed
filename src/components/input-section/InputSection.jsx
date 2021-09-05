import React, { useState } from "react";
import Switch from "./../switch/Switch";
import InputBox from "./InputBox";
import "./inputsection.css";

const InputSection = ({
	onInput,
	onSearch,
	inputValue,
	bookType = "",
	setBookType,
	searchAgainst,
	onChange,
	setError,
}) => {
	const [toggle, setToggle] = useState(false);
	const [label, setLabel] = useState("Marathi suggestions off.");

	const onToggleHandler = () => {
		setToggle(!toggle);
		setTimeout(() => {
			toggle
				? setLabel("Marathi suggestions off.")
				: setLabel("Marathi suggestions on.");
		}, 200);
	};

	var inputBox = document.getElementsByClassName("react-autosuggest__input");
	inputBox.type = "search";

	return (
		<form className="form" onSubmit={(event) => {
			event.preventDefault();
			document.getElementsByName('thesearchbox')[0].blur();
			onSearch(event);
		}}> 
			<div className="search-filter-section">
				<label className="m-2">
					<input
						type="radio"
						name="pustakName"
						value="pustakName"
						className="m-1"
						checked={searchAgainst === "pustakName"}
						onChange={onChange}
					/>
					पुस्तक
				</label>
				<label>
					<input
						type="radio"
						name="lekhak"
						value="lekhak"
						className="m-1"
						checked={searchAgainst === "lekhak"}
						onChange={onChange}
					/>
					लेखक
				</label>
			</div>
			<div className={`filter-section ${bookType === "" ? "none" : ""}`}>
				<span className="filter">
					{bookType}
					<button
						type="button"
						onClick={(event) => {
							event.preventDefault();
							setBookType("");
						}}
					>
						X
					</button>
				</span>
			</div>
			<section className="input-section">
				<InputBox
					placeholder={`Search ${
						searchAgainst === "lekhak" ? "Authors" : "Books"
					}${bookType === "" ? "" : ` under ${bookType}`}`}
					value={inputValue}
					onInput={onInput}
					shouldSuggest={toggle}
				/>
			</section>
			{setError ? (
				<span className="error-filter">
					*Please search for more than one word/letter
				</span>
			) : null}
		</form>
	);
};

export default InputSection;
