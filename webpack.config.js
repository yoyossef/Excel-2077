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
					from: 'lib/aframe-teleport-controls.js',
					to: 'aframe-teleport-controls.js'
				},
				{	
					from:'src/img',
					to:'img'
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
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
				  {
					loader: 'file-loader',
				  },
				],
			},
		]
	}
};