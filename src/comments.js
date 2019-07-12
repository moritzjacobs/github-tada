import {
	SELECTOR_COMMENT,
	SELECTOR_COMMENT_CONTAINER,
	SELECTOR_EMOJI,
	SELECTOR_REACTION,
} from "./constants";

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
 * Extract relevant information from comment
 *
 * @param {HTMLElement} el
 * @returns {object}
 */
function commentParser(el) {
	const reactionEls = el.querySelectorAll(SELECTOR_REACTION);
	const reactions = {single: [...reactionEls].map(reactionParser)};

	// calculate the total of reactions
	reactions.total = reactions.single.reduce((sum, r) => {
		return sum + r.count;
	}, 0);

	reactions.single.sort((a, b) => b.count - a.count);

	return {
		el: el.querySelector(SELECTOR_COMMENT),
		reactions,
	};
}

/**
 * parse comments from DOM and return data structure
 *
 * @returns {object}
 */
function getComments() {
	const commentsEls = document.querySelectorAll(SELECTOR_COMMENT_CONTAINER);

	return [...commentsEls].map(commentParser).filter(comment => {
		return comment.reactions.total > 0;
	});
}

export default getComments;
