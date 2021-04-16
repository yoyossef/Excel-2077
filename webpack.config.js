const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'src/index.html',
					to: 'index.html'
				},
				{
					from: 'lib/aframe.min.js',
					to: 'aframe.min.js'
				},
				{
					from: 'lib/aframe-teleport-controls.min.js',
					to: 'aframe-teleport-controls.min.js'
				}
			]
		})
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: [/node_modules/, /lib/],
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	}
};