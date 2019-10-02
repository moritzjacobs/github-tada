import {
	SELECTOR_COMMENT,
	SELECTOR_COMMENT_CONTAINER,
	SELECTOR_EMOJI,
	SELECTOR_REACTION,
} from "./constants";

export type Reaction = {
	emoji: string,
	type: string,
	count: number,
};

export type Comment = {
	target: HTMLElement,
	reactions: Array<Reaction>,
};

// Extract relevant information from single reaction
const reactionParser = (el: HTMLButtonElement): Reaction | null => {
	const type = el.value;
	const emoji = el.querySelector(SELECTOR_EMOJI);

	if (!emoji || !emoji.textContent) {
		return null;
	}

	const count = parseInt(el.textContent.replace(emoji.textContent, ""));

	return {
		emoji: emoji.textContent,
		type,
		count,
	};
};

// Extract relevant information from comment
const commentParser = (el: HTMLElement): Comment => {
	const reactionEls = Array.from(el.querySelectorAll(SELECTOR_REACTION));

	const reactions: Array<Reaction> = reactionEls
		.map(reactionParser)
		.filter(r => Boolean(r));

	reactions.sort((a, b) => b.count - a.count);

	return {
		target: el.querySelector(SELECTOR_COMMENT),
		reactions,
	};
};

// parse comments from DOM and return data structure
const getComments = (): Array<Comment> => {
	const commentsEls = document.querySelectorAll(SELECTOR_COMMENT_CONTAINER);

	return Array.from(commentsEls, commentParser).filter(
		comment => comment.reactions && comment.reactions.length > 0
	);
};

export default getComments;
