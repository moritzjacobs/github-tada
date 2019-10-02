import {GRB, CLASS_WRAPPER} from "./constants";

// safely remove a DOM node
export const removeElement = (element: Node) => {
	element && element.parentNode && element.parentNode.removeChild(element);
};

// remove old self before creating a new one
export const purgeAndRecreate = () => {
	removeElement(document.getElementById(GRB));

	// DOM cache
	const el = document.createElement("div");

	el.classList.add(CLASS_WRAPPER);
	el.id = GRB;

	return el;
};
