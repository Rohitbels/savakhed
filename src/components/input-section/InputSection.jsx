import React, { useState } from "react";
import Switch from "./../switch/Switch";
import InputBox from "./InputBox";
import "./inputsection.css";

const InputSection = ({
	onInput,
	onSearch,
	inputValue,
	bookType,
	setBookType,
	searchAgainst,
	onChange,
	setError,
}) => {
	const [toggle, setToggle] = useState(false);
	const [label, setLabel] = useState("एकटा जीव सदाशिव");

	const onToggleHandler = () => {
		setToggle(!toggle);
		setTimeout(() => {
			toggle
				? setLabel("एकटा जीव सदाशिव")
				: setLabel("अडला हरी ऑटोसजेष्टचे पाय धरी");
		}, 200);
	};

	var inputBox = document.getElementsByClassName("react-autosuggest__input");
	inputBox.type = "search";

	return (
		<form className="form">
			<form className="search-filter-section">
				<label>
					<input
						type="radio"
						name="pustakName"
						value="pustakName"
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
						checked={searchAgainst === "lekhak"}
						onChange={onChange}
					/>
					लेखक
				</label>
			</form>
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
					placeholder={`Search by ${
						searchAgainst === "lekhak" ? "Author" : "Book"
					}'s name ${bookType === "" ? "" : `across ${bookType}`}`}
					value={inputValue}
					onInput={onInput}
					shouldSuggest={toggle}
				/>
				<button
					className="search-button"
					tabIndex={1}
					type="search"
					onClick={(event) => {
						event.preventDefault();
						onSearch(event);
					}}
				>
					Search
				</button>
			</section>
			{setError ? (
				<span className="error-filter">
					*Please search for more than one word/letter
				</span>
			) : null}
			<Switch
				className="toggle-button"
				isToggled={toggle}
				onToggle={onToggleHandler}
				label={label}
			/>
		</form>
	);
};

export default InputSection;
