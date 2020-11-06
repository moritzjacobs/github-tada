import {
	SELECTOR_COMMENT,
	SELECTOR_COMMENT_CONTAINER,
	SELECTOR_EMOJI,
	SELECTOR_REACTION,
} from "./constants";

export type Reaction = {
	emoji: string;
	type: string;
	count: number;
};

export type Comment = {
	target: HTMLElement | null;
	reactions: Array<Reaction>;
};

// Extract relevant information from single reaction
const reactionParser = (el: HTMLButtonElement): Reaction => {
	const type = el.value || "";
	const emoji = el.querySelector(SELECTOR_EMOJI);
	const textContent = el.textContent ?? "";

	const emojiTextContent = emoji?.textContent ?? "";

	const count = parseInt(textContent.replace(emojiTextContent, "")) || 0;

	return {
		emoji: emojiTextContent,
		type,
		count,
	};
};

// Extract relevant information from comment
const commentParser = (el: HTMLElement): Comment => {
	const target = el.querySelector<HTMLElement>(SELECTOR_COMMENT);

	const reactionNodeList = el.querySelectorAll<HTMLButtonElement>(
		SELECTOR_REACTION
	);

	const reactionEls = Array.from(reactionNodeList);

	if (reactionEls.length > 0) {
		const reactions: Array<Reaction> = reactionEls
			.map(reactionParser)
			.filter((r: Reaction) => r.emoji && r.count && r.type);

		reactions.sort((a, b) => b.count - a.count);

		return {
			target,
			reactions,
		};
	}

	return {
		target,
		reactions: [],
	};
};

// parse comments from DOM and return data structure
const getComments = (): Array<Comment> => {
	const commentsEls = document.querySelectorAll<HTMLElement>(
		SELECTOR_COMMENT_CONTAINER
	);

	const arr = Array.from(commentsEls, commentParser);

	return arr.filter((comment: Comment) => comment.reactions.length > 0);
};

export default getComments;
