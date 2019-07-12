import {CLASS_HIGHLIGHT} from "./constants";

/**
 * Click handler: scroll into view
 *
 * @param {HTMLElement} targetCommentEl
 * @param {Array<object>} comments
 */
function scrollTo(targetCommentEl, comments) {
	targetCommentEl.scrollIntoView({behavior: "smooth", block: "center"});

	// remove highlight from any other comment ...
	comments.forEach(c => {
		c.el.classList.remove(CLASS_HIGHLIGHT);
	});

	// and add highlight to this comment
	targetCommentEl.classList.add(CLASS_HIGHLIGHT);
}

export default scrollTo;
