import React from "react";
import Button from "./Button";
import {Comment} from "./comments";

type Props = {
	comments: Array<Comment>;
};

const App = ({comments}: Props) => {
	if (comments.length < 1) {
		return null;
	}

	return (
		<>
			<div className="discussion-sidebar-heading text-bold">
				Browse by reaction
			</div>
			{comments.map(c => (
				<Button key={c.target.dataset.gid} target={c.target} reactions={c.reactions} />
			))}
		</>
	);
};

export default App;
