import "./content.css";

function commentParser(el) {
	const reactionEls = el.querySelectorAll(".reaction-summary-item");
	const reactions = [...reactionEls].map(reactionParser);

	return {
		el: el.querySelector(".js-comment"),
		reactions,
	};
}

function reactionParser(rel) {
	const type = rel.value;
	const emoji = rel.querySelector(".emoji");

	if (!emoji || !emoji.textContent) {
		return false;
	}

	const count = parseInt(rel.textContent.replace(emoji.textContent, ""));

	return {
		emoji: emoji.textContent,
		type,
		count,
	};
}

function handleButtonClick(el) {
	el.scrollIntoView({behavior: "smooth"});
	data.forEach(d => {
		d.el.classList.remove("grb-highlight");
	});
	el.classList.add("grb-highlight");
}

const comments = document.querySelectorAll(".js-comment-container");

const header = document.querySelector(
	".discussion-header, #partial-discussion-header"
);

const data = [...comments].map(commentParser).filter(comment => {
	return comment.reactions.length > 0;
});

const browser = document.createElement("div");

browser.classList.add("grb-browser");

data.forEach(comment => {
	const button = document.createElement("button");

	button.classList.add("grb-browser-button");

	comment.reactions.forEach(r => {
		if (!r) {
			return;
		}
		button.innerText += `${r.emoji} ${r.count}`;
	});

	button.addEventListener("click", () => handleButtonClick(comment.el));

	browser.appendChild(button);
});

header.appendChild(browser);
