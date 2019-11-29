const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: path.join(__dirname, "src", "index.tsx"),
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"],
	},
	devtool: "source-map",

	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "awesome-typescript-loader",
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader",
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: { hmr: module.mode === "development" },
					},
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
			{
				test: /\.svg$/,
				loader: "svg-inline-loader",
			},
		],
	},
	output: {
		path: path.join(__dirname, "build"),
		filename: "bundle.js",
	},
};
