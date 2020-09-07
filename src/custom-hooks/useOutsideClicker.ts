import {useEffect} from "react";

export const useOutsideClicker = (ref: React.MutableRefObject<any>) => {
	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target)) {
				console.log("You clicked outside of me!");
			} else {
				console.log("You clicked INSIDE of me!");
			}
		};
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
};
