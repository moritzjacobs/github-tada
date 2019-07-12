import getComments from "./comments";
import {purgeAndRecreate, buildCommentButton} from "./main";
import {SELECTOR_TARGET} from "./constants";
import "./content.scss";

// main routine
(() => {
	const el = purgeAndRecreate();
	// cache DOM els
	const header = document.querySelector(SELECTOR_TARGET);
	// assemble all relevant data
	const comments = getComments();

	// create button for every comment
	comments.forEach(comment => buildCommentButton(comments, comment, el));

	// append everything to DOM
	header.appendChild(el);
})();

