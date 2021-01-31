import React, { useState } from "react";
import Switch from "./../switch/Switch";
import "./inputsection.css";

const InputSection = ({ onInput, onSearch, inputValue }) => {
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
				<input
					className="search-bar"
					type="text"
					placeholder="Search by Book name / Author name"
					value={inputValue}
					onInput={onInput}
				/>
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
