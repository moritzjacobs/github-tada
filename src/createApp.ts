import createButton from "./createButton";
import { Comment } from "./comments";
import { createElement } from "./DOM";

type Props = {
	comments: Array<Comment>;
};

const createApp = ({ comments }: Props) => {
	if (comments.length < 1) {
		return null;
	}

	const commentEls = comments.map((c) => (c.target ? createButton(c) : null));

	return [
		createElement(
			"div",
			{
				className: "discussion-sidebar-heading text-bold",
			},
			"Browse by reaction"
		),
		...commentEls,
	];
};

export default createApp;
