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

	return (
		<form className="form">
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
					placeholder={`Search by Book name / Author name ${
						bookType === "" ? "" : `across ${bookType}`
					}`}
					value={inputValue}
					onInput={onInput}
					shouldSuggest={toggle}
				/>
				{/* <input
					className="search-bar"
					type="text"
					placeholder={`Search by Book name / Author name ${
						bookType === "" ? "" : `across ${bookType}`
					}`}
					value={inputValue}
					onInput={onInput}
				/> */}
				<button
					className="search-button"
					tabIndex={1}
					type="submit"
					onClick={(event) => {
						event.preventDefault();
						onSearch(event);
					}}
				>
					Search
				</button>
			</section>
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
