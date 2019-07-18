import React from "react";
import Button from "./Button";
import {Comment} from "./comments";
import {CLASS_WRAPPER} from "./constants";

type Props = {
	comments: Array<Comment>,
};

const App = ({comments}: Props) => {
	return (

		<nav className={CLASS_WRAPPER}>
			{comments.map(c => (
				<Button key={c.target.dataset.gid} target={c.target} reactions={c.reactions} />
			))}
		</nav>
	);
};

export default App;
