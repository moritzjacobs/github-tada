import {
	SELECTOR_COMMENT,
	SELECTOR_COMMENT_CONTAINER,
	SELECTOR_EMOJI,
	SELECTOR_REACTION,
} from "./constants";

type Reaction = {
	emoji: string,
	type: string,
	count: number,
};

export type Comment = {
	el: HTMLElement,
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
	const reactions: Array<Reaction> = reactionEls.map(reactionParser).filter(r => Boolean(r));

	reactions.sort((a, b) => b.count - a.count);

	return {
		el: el.querySelector(SELECTOR_COMMENT),
		reactions,
	};
};

// parse comments from DOM and return data structure
const getComments = (): Array<Comment> => {
	const commentsEls = document.querySelectorAll(SELECTOR_COMMENT_CONTAINER);

	return Array.from(commentsEls, commentParser).filter(comment => Boolean(comment.reactions));
};

export default getComments;
