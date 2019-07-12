/* eslint-disable import/unambiguous */
module.exports = {
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
};
