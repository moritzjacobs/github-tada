import createApp from "./createApp";

const reactions = [
	{
		emoji: "💯",
		type: "100",
		count: 23,
	},
];

const target = document.createElement("div");

target.dataset.gid = "1234";

describe("createApp()", () => {
	it("renders correctly when there are no items", () => {
		const tree = createApp({ comments: [] });

		expect(tree).toMatchSnapshot();
	});

	it("renders correctly when there are items", () => {
		const tree = createApp({ comments: [{ target, reactions }] });

		expect(tree).toMatchSnapshot();
	});
});
