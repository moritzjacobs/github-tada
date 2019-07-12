import {CLASS_HIGHLIGHT} from "./constants";
import {Comment} from "./comments";

// Click handler: scroll into view
const scrollTo = (targetCommentEl: HTMLElement, comments: Array<Comment>): void => {
	targetCommentEl.scrollIntoView({behavior: "smooth", block: "center"});

	// remove highlight from any other comment ...
	comments.forEach(c => {
		c.el.classList.remove(CLASS_HIGHLIGHT);
	});

	// and add highlight to this comment
	targetCommentEl.classList.add(CLASS_HIGHLIGHT);
};

export default scrollTo;
