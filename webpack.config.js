/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/unambiguous */

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css",
		}),
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "../",
							hmr: process.env.NODE_ENV === "development",
						},
					},
					"css-loader",
					"sass-loader",
				],
			},
		],
	},
};
