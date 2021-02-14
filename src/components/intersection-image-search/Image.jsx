import React, { useRef, useState } from "react";
import useVisibility from "./useVisibility";

function Image({ ...props }) {
	const [inView, setInView] = useState(false);
	const imgRef = useRef(null);

	useVisibility(
		imgRef,
		() => {
			setInView(true);
		},
		props.alt
	);

	return <div ref={imgRef}>{inView ? <img {...props} /> : null}</div>;
}

export default Image;
