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
	target: HTMLElement;
	reactions: Array<Reaction>;
};

// Extract relevant information from single reaction
const reactionParser = (el: HTMLButtonElement): Reaction => {
	const type = el.value;
	const emoji = el.querySelector(SELECTOR_EMOJI);
	const textContent = el && el.textContent ? el.textContent : "";

	const emojiTextContent =
		emoji && emoji.textContent ? emoji.textContent : "";

	const count = parseInt(textContent.replace(emojiTextContent, ""));

	return {
		emoji: emojiTextContent,
		type,
		count,
	};
};

// Extract relevant information from comment
const commentParser = (el: HTMLElement): Comment => {
	const reactionNodeList = el.querySelectorAll<HTMLButtonElement>(
		SELECTOR_REACTION
	);

	const reactionEls = Array.from(reactionNodeList);

	const reactions: Array<Reaction> = reactionEls
		.map(reactionParser)
		.filter((r: Reaction) => Boolean(r));

	reactions.sort((a, b) => b.count - a.count);

	const target = el.querySelector<HTMLElement>(SELECTOR_COMMENT);

	if (!target) {
		throw new Error("no parseable target div found");
	}

	return {
		target,
		reactions,
	};
};

// parse comments from DOM and return data structure
const getComments = (): Array<Comment> => {
	try {
		const commentsEls = document.querySelectorAll<HTMLElement>(
			SELECTOR_COMMENT_CONTAINER
		);

		const arr = Array.from(commentsEls, commentParser);

		return arr.filter(
			(comment: Comment) => comment.reactions && comment.reactions.length > 0
		);
	} catch (error) {
		console.error(error);

		return [];
	}
};

export default getComments;
