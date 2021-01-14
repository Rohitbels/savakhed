import React, { useState } from "react";
import Switch from "./../switch/Switch";
import "./inputsection.css";

const InputSection = ({ onInput, onSearch, searchAgainst, onChange }) => {
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
			<section className="input-section">
				<div className="search-bar">
					<input
						type="text"
						placeholder={`Search by ${
							searchAgainst === "lekhak" ? "Author" : "Book"
						} name`}
						onInput={onInput}
					/>
					<select onChange={onChange}>
						<option value="lekhak">लेखक</option>
						<option value="pustakName">पुस्तक</option>
					</select>
				</div>
				<button
					className="search-button"
					type="submit"
					onClick={onSearch}
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
