import getComments from "./comments";
import scrollTo from "./scrollTo";
import {
	CLASS_BUTTON,
	CLASS_REACTION,
	CLASS_WRAPPER,
	SELECTOR_TARGET,
} from "./constants";

function removeElement(element) {
	element && element.parentNode && element.parentNode.removeChild(element);
}

function purgeAndRecreate() {
	// remove old self before creating a new one
	removeElement(document.getElementById(CLASS_WRAPPER));

	// DOM cache
	const el = document.createElement("nav");

	el.classList.add(CLASS_WRAPPER);
	el.id = CLASS_WRAPPER;

	return el;
}

function buildCommentButton(comments, comment, appendTo) {
	const button = document.createElement("button");

	button.classList.add(CLASS_BUTTON);

	// add every reaction to the button

	comment.reactions.single.forEach(r => {
		const reactionEl = document.createElement("span");

		reactionEl.classList.add(CLASS_REACTION);
		reactionEl.innerText += `${r.emoji}`;
		reactionEl.dataset.grbCount = r.count;

		button.appendChild(reactionEl);
	});

	button.addEventListener("click", () => scrollTo(comment.el, comments));

	appendTo.appendChild(button);
}

function main() {
	const el = purgeAndRecreate();
	// cache DOM els
	const header = document.querySelector(SELECTOR_TARGET);
	// assemble all relevant data
	const comments = getComments();

	// create button for every comment
	comments.forEach(comment => buildCommentButton(comments, comment, el));

	// append everything to DOM
	header.appendChild(el);
}

export default main;
