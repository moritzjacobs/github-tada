import React from "react";
import { Comment } from "./comments";
import scrollTo from "./scrollTo";
import { CLASS_BUTTON, CLASS_REACTION } from "./constants";

const Button = ({ target, reactions }: Comment) => {
	return (
		target && (
			<button
				type="button"
				className={CLASS_BUTTON}
				onClick={() => scrollTo(target)}
			>
				{reactions.map((r) => (
					<span key={r.type} className={CLASS_REACTION}>
						{r.emoji}
						&nbsp;
						{r.count}
					</span>
				))}
			</button>
		)
	);
};

export default Button;
