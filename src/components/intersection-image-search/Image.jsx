import React, { createRef, useRef, useState } from "react";
import useVisibility from "./useVisibility";

function Image({ ...props }) {
	const [inView, setInView] = useState(false);
	const imgRef = createRef();

	useVisibility(imgRef, () => {
		setInView(true);
	});

	return <div ref={imgRef}>{inView ? <img {...props} /> : null}</div>;
}

export default Image;
