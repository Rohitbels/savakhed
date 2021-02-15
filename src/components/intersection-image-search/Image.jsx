import React, { useRef, useState } from "react";
import useVisibility from "./useVisibility";

function Image({ alt, ...props }) {
	const [inView, setInView] = useState(false);
	const imgRef = useRef(null);

	useVisibility(imgRef, () => {
		setInView(true);
	});

	return (
		<div className="image-div" ref={imgRef}>
			{inView ? <img alt={alt} {...props} /> : null}
		</div>
	);
}

export default Image;
