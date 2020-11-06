import createApp from "./createApp";
import getComments from "./comments";
import { purgeAndRecreate } from "./utils";
import { SELECTOR_TARGET } from "./constants";
import "./content.scss";

// assemble all relevant data
const comments = getComments();
// cache DOM els
const header = document.querySelector(SELECTOR_TARGET);

if (header) {
	const rootElement = purgeAndRecreate();

	header.appendChild(rootElement);
	const app = createApp({ comments });

	if (app) {
		app.forEach((el) => el && rootElement.appendChild(el));
	}
}
