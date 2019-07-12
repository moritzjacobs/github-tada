import commentParser from "./commentParser";
import scrollTo from "./scrollTo";
import "./content.scss";
import {
	CLASS_BUTTON,
	CLASS_REACTION,
	CLASS_WRAPPER,
	SELECTOR_COMMENT_CONTAINER,
	SELECTOR_TARGET,
} from "./constants";

function removeElement(element) {
	element && element.parentNode && element.parentNode.removeChild(element);
}

function main() {
	// DOM cache
	const buttons = document.createElement("nav");

	// remove old els and make a new one
	removeElement(document.getElementById(CLASS_WRAPPER));
	buttons.classList.add(CLASS_WRAPPER);
	buttons.id = CLASS_WRAPPER;

	// grab all relevant DOM elements
	const commentsEls = document.querySelectorAll(SELECTOR_COMMENT_CONTAINER);
	const header = document.querySelector(SELECTOR_TARGET);
	// assemble all relevant data
	const comments = [...commentsEls].map(commentParser);

	// create button for every comment
	comments.forEach(comment => {
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

		buttons.appendChild(button);
	});

	// append everything to DOM
	header.appendChild(buttons);
}

export default main;
