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
			<section className="search-filter-section">
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
			</section>
			<section className="input-section">
				<input
					className="search-bar"
					type="text"
					placeholder={`Search by ${
						searchAgainst === "lekhak" ? "Author" : "Book"
					} name`}
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
