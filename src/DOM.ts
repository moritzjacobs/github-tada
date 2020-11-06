type Props = {
	className?: string;
	type?: string;
	onClick?: VoidFunction;
};

type Child = HTMLElement | string | null;

export const createElement = (
	tagType: string,
	props: Props,
	children: Child | Array<Child> = null
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

	if (children === null) {
		return el;
	}

	if (typeof children === "string") {
		el.innerHTML = children;
	} else {
		children = Array.isArray(children) ? children : [children];
		children.forEach((child) => child && el.append(child));
	}

	return el;
};
