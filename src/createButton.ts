import { Comment } from "./comments";
import scrollTo from "./scrollTo";
import { CLASS_BUTTON, CLASS_REACTION } from "./constants";
import { createElement } from "./DOM";

const createButton = ({ target, reactions }: Comment) =>
	target
		? createElement(
				"button",
				{
					type: "button",
					className: CLASS_BUTTON,
					onClick: () => scrollTo(target),
				},
				reactions.map((r) =>
					createElement(
						"span",
						{
							className: CLASS_REACTION,
						},
						`${r.emoji}&nbsp;${r.count}`
					)
				)
		  )
		: null;

export default createButton;
