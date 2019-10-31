import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import getComments from "./comments";
import {purgeAndRecreate} from "./utils";
import {SELECTOR_TARGET} from "./constants";
import "./content.scss";

// assemble all relevant data
const comments = getComments();
// cache DOM els
const header = document.querySelector(SELECTOR_TARGET);

if (header) {
	const rootElement = purgeAndRecreate();

	header.appendChild(rootElement);
	ReactDOM.render(comments && <App comments={comments} />, rootElement);
}
