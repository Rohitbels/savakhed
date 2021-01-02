import React from "react";
import "./switch.css";

const Switch = ({ isToggled, onToggle, label }) => {
	return (
		<div className="switch-container">
			<label className="switch">
				<input
					type="checkbox"
					checked={isToggled}
					onChange={onToggle}
				/>
				<span className="slider" />
			</label>
			<span className="label">{label}</span>
		</div>
	);
};

export default Switch;
