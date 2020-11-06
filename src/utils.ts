import { GRB, CLASS_WRAPPER } from "./constants";

// safely remove a DOM node
export const removeElement = (element: HTMLElement) => {
	element.parentNode?.removeChild(element);
};

// remove old self before creating a new one
export const purgeAndRecreate = () => {
	let el = document.getElementById(GRB);

	if (el) {
		removeElement(el);
	}

	el = document.createElement("div");

	el.classList.add(CLASS_WRAPPER);
	el.id = GRB;

	return el;
};
