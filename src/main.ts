import {Comment} from "./comments";
import scrollTo from "./scrollTo";
import {
	CLASS_BUTTON,
	CLASS_REACTION,
	CLASS_WRAPPER,
} from "./constants";

// safely remove a DOM node
export const removeElement = (element: Node) => {
	element && element.parentNode && element.parentNode.removeChild(element);
};

// remove old self before creating a new one
export const purgeAndRecreate = () => {
	removeElement(document.getElementById(CLASS_WRAPPER));

	// DOM cache
	const el = document.createElement("nav");

	el.classList.add(CLASS_WRAPPER);
	el.id = CLASS_WRAPPER;

	return el;
};

// append button for comment
export const buildCommentButton = (comments: Array<Comment>, comment: Comment, appendTo: Node) => {
	const button = document.createElement("button");

	button.classList.add(CLASS_BUTTON);

	// add every reaction to the button

	comment.reactions.forEach(r => {
		const reactionEl = document.createElement("span");

		reactionEl.classList.add(CLASS_REACTION);
		reactionEl.innerText += `${r.emoji}`;
		reactionEl.dataset.grbCount = r.count.toString();

		button.appendChild(reactionEl);
	});

	button.addEventListener("click", () => scrollTo(comment.el, comments));

	appendTo.appendChild(button);
};
