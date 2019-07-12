/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/unambiguous */

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: "./src/index.ts",
	devtool: "inline-source-map",
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css",
		}),
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
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
