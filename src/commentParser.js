import {SELECTOR_COMMENT, SELECTOR_EMOJI, SELECTOR_REACTION, REACTION_THRESHOLD} from "./constants";

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

	// calculate fraction of each reaction of total of reactions
	reactions.single = reactions.single.map(r => {
		const fraction = r.count / reactions.total;

		return {...r, fraction};
	});

	reactions.single = reactions.single.filter(r => r.fraction > REACTION_THRESHOLD);

	reactions.single.sort((a, b) => b.count - a.count);

	return {
		el: el.querySelector(SELECTOR_COMMENT),
		reactions,
	};
}

export default commentParser;
