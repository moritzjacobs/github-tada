import Xeact from "./Xeact";
import createApp from "./createApp";
import getComments from "./comments";
import { purgeAndRecreate } from "./utils";
import { SELECTOR_TARGET } from "./constants";
import "./content.scss";

const header = document.querySelector(SELECTOR_TARGET);

const comments = getComments();

if (header && comments.length > 0) {
	const rootElement = purgeAndRecreate();

	header.appendChild(rootElement);
	const app = createApp({ comments });

	Xeact.render(app, rootElement);
}
