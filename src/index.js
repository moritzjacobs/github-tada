import commentParser from "./commentParser";
import {
	CLASS_BUTTON,
	CLASS_REACTION,
	CLASS_WRAPPER,
	COMMENT_THRESHOLD,
	SELECTOR_COMMENT_CONTAINER,
	SELECTOR_TARGET,
} from "./constants";
import scrollTo from "./scrollTo";
import "./content.scss";

// DOM cache

const buttons = document.createElement("div");

buttons.classList.add(CLASS_WRAPPER);

// grab all relevant DOM elements
const commentsEls = document.querySelectorAll(SELECTOR_COMMENT_CONTAINER);
const header = document.querySelector(SELECTOR_TARGET);

// assemble all relevant data and remove empty results
const comments = [...commentsEls].map(commentParser).filter(comment => {
	return comment.reactions.total > 0;
});

const superTotal = comments.reduce((sum, c) => {
	sum += c.reactions.total;

	return sum;
}, 0);

// create button for every comment with reactions
comments.forEach(comment => {
	const button = document.createElement("button");

	button.classList.add(CLASS_BUTTON);
	const commentImportance = comment.reactions.total / superTotal;

	if (commentImportance < COMMENT_THRESHOLD) {
		return;
	}

	// add every reaction to the button
	comment.reactions.single.forEach(r => {
		if (!r) {
			return;
		}
		const reactionEl = document.createElement("span");
		const em = commentImportance * r.fraction * 10;

		console.log(em);
		reactionEl.classList.add(CLASS_REACTION);
		reactionEl.innerText += `${r.emoji}`;
		reactionEl.dataset.grbCount = r.count;
		reactionEl.style.fontSize = `${em}em`;
		button.appendChild(reactionEl);
	});

	button.addEventListener("click", () => scrollTo(comment.el, comments));

	buttons.appendChild(button);
});

// append everything to DOM
header.appendChild(buttons);
