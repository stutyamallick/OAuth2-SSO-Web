const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: [ './src/index.js' ],
	output: {
		filename: "build.js",
		path: path.join(__dirname, "/dist")
	},
	devServer: {
	    hot: true,
	    port: 3000,
	    historyApiFallback: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.html$/,
				use: {
					loader: "html-loader",
					options: { minimize: true }
				}
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
					},
					{
						loader: "less-loader"
					}
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ["file-loader"]
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		})
	]
};
