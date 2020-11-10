type XeactNode = HTMLElement | string | null;

type XeactNodeProps = {
	className?: string;
	type?: string;
	onClick?: VoidFunction;
};

const render = (elements: XeactNode | Array<XeactNode>, root: HTMLElement) => {
	elements = Array.isArray(elements) ? elements : [elements];
	elements.forEach((el) => {
		if (!el) {
			return;
		}

		if (typeof el === "string") {
			root.innerHTML = el;
		} else {
			root.append(el);
		}
	});
};

export const createElement = (
	tagType: string,
	props: XeactNodeProps,
	children: XeactNode | Array<XeactNode> = null
): HTMLElement => {
	const { type, className, onClick } = props;

	const el = document.createElement(tagType);

	if (className) {
		el.className = className;
	}

	if (type) {
		(el as HTMLButtonElement).type = type;
	}

	if (onClick) {
		(el as HTMLButtonElement).onclick = onClick;
	}

	render(children, el);

	return el;
};

const Xeact = { render, createElement };

export default Xeact;
