import React from "react";
import renderer from "react-test-renderer";
import App from "./App";

const reactions = [
	{
		emoji: "💯",
		type: "100",
		count: 23,
	},
];

const target = document.createElement("div");

target.dataset.gid = "1234";

describe("<App/>", () => {
	it("renders correctly when there are no items", () => {
		const tree = renderer.create(<App comments={[]} />).toJSON();

		expect(tree).toMatchSnapshot();
	});
	it("renders correctly when there are items", () => {
		const tree = renderer.create(<App comments={[{target, reactions}]} />).toJSON();

		expect(tree).toMatchSnapshot();
	});
});
