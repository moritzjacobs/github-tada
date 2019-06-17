import "./content.css";

const SELECTOR_COMMENT_CONTAINER = ".js-comment-container";
const SELECTOR_COMMENT = ".js-comment";
const SELECTOR_TARGET = ".discussion-header, #partial-discussion-header";
const SELECTOR_REACTION = ".reaction-summary-item";
const SELECTOR_EMOJI = ".emoji";
const CLASS_WRAPPER = "grb-browser";
const CLASS_BUTTON = "grb-browser-button";
const CLASS_HIGHLIGHT = "grb-highlight";
const CLASS_REACTION = "grb-reaction";

// run!
githubTada();

/**
 * Main function
 */
function githubTada() {
	// DOM cache

	const buttons = document.createElement("div");

	buttons.classList.add(CLASS_WRAPPER);

	// grab all relevant DOM elements
	const commentsEls = document.querySelectorAll(SELECTOR_COMMENT_CONTAINER);
	const header = document.querySelector(SELECTOR_TARGET);

	// assemble all relevant data and remove empty results
	const comments = [...commentsEls].map(commentParser).filter(comment => {
		return comment.reactions.length > 0;
	});

	// create button for every comment with reactions
	comments.forEach(comment => {
		const button = document.createElement("button");

		button.classList.add(CLASS_BUTTON);

		// add every reaction to the button
		comment.reactions.forEach(r => {
			if (!r) {
				return;
			}
			const reactionEl = document.createElement("span");

			reactionEl.classList.add(CLASS_REACTION);
			reactionEl.innerText += `${r.emoji} ${r.count}`;
			button.appendChild(reactionEl);
		});

		button.addEventListener("click", () => handleButtonClick(comment.el, comments));

		buttons.appendChild(button);
	});

	// append everything to DOM
	header.appendChild(buttons);
}

/**
 * Extract relevant information from comment
 *
 * @param {HTMLElement} el
 * @returns {object}
 */
function commentParser(el) {
	const reactionEls = el.querySelectorAll(SELECTOR_REACTION);
	const reactions = [...reactionEls].map(reactionParser);

	return {
		el: el.querySelector(SELECTOR_COMMENT),
		reactions,
	};
}

/**
 * Extract relevant information from single reaction
 *
 * @param {HTMLElement} el
 * @returns {object}
 */
function reactionParser(el) {
	const type = el.value;
	const emoji = el.querySelector(SELECTOR_EMOJI);

	if (!emoji || !emoji.textContent) {
		return false;
	}

	const count = parseInt(el.textContent.replace(emoji.textContent, ""));

	return {
		emoji: emoji.textContent,
		type,
		count,
	};
}

/**
 * Click handler: scroll into view
 *
 * @param {HTMLElement} targetCommentEl
 * @param {Array<object>} comments
 */
function handleButtonClick(targetCommentEl, comments) {
	targetCommentEl.scrollIntoView({behavior: "smooth", block: "center"});

	// remove highlight from any other comment ...
	comments.forEach(c => {
		c.el.classList.remove(CLASS_HIGHLIGHT);
	});

	// and add highlight to this comment
	targetCommentEl.classList.add(CLASS_HIGHLIGHT);
}
