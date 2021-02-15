import { useEffect } from "react";

// This customEffect will invoke the callback immediately when the element mention in ref is with viewport i.e. root
// intersectionRatio >= 0.1 implies execute callback as soon as element is in view port
const useVisibility = (ref, callback, options = {}) => {
	const { root = null, rootMargin = "0px" } = options;
	useEffect(() => {
		if (window.IntersectionObserver) {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.intersectionRatio >= 0.1) {
							callback();
							observer.unobserve(entry.target);
							observer.disconnect();
						}
					});
				},
				{
					root,
					rootMargin,
					threshold: [0.1],
				}
			);

			if (ref.current) {
				observer.observe(ref.current);
			}
		} else {
			callback();
		}
	}, []);
};

export default useVisibility;
