const CleanWebpackPlugin = require('clean-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const isProduction = process.argv.indexOf('-p') !== -1;
const isHotDeploy = process.argv.indexOf('--hot') !== -1;

const presets = ['react', 'es2015', 'stage-0'];
if (isHotDeploy) {
	presets.push('react-hmre');
}

const plugins = ['react-html-attrs', 'transform-runtime', 'transform-decorators-legacy'];

const gitRevisionPlugin = new GitRevisionPlugin({branch: true});

module.exports = {
	devtool: isProduction ? false : "sourcemap",
	entry: {
		babelpolyfill: 'babel-polyfill',
		app: './src/main.js'
	},
	output: {
		path: path.resolve(__dirname, 'lib'),
		filename: '[name].bundle.js',
		publicPath: './lib/'
	},
	module: {
		rules: [
			{
				test: [/\.jsx$/, /\.js$/],
				include: [path.resolve(__dirname, 'src/meveo'), path.resolve(__dirname, 'src/main.js')],
				use: {
					loader: 'babel-loader',
					options: {presets, plugins}
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'source-map-loader',
				enforce: "pre"
			},
			{
				test: /\.css$/, use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: {
					loader: 'file-loader?name=[name].[ext]&publicPath=/opencell/frontend/DEMO/cc/lib/'
				}
			}
		]
	},
	plugins: isProduction ? [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify('production'),
			"VERSION": JSON.stringify(gitRevisionPlugin.version()),
			"COMMITHASH": JSON.stringify(gitRevisionPlugin.commithash()),
			"BRANCH": JSON.stringify(gitRevisionPlugin.branch())
		}),
		new webpack.ProvidePlugin({
			Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
			fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
		}),
		new webpack.optimize.OccurrenceOrderPlugin,
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: false,
			compress: {
				sequences: true,
				dead_code: true,
				conditionals: true,
				booleans: true,
				unused: true,
				if_return: true,
				join_vars: true,
				drop_console: true
			},
			mangle: {
				except: ['$super', '$', 'exports', 'require']
			},
			output: {
				comments: false
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			minChunks: function (module) {
				return module.context && module.context.indexOf('node_modules') !== -1;
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "manifest",
			minChunks: Infinity
		}),
		new CleanWebpackPlugin(['lib'], {
			verbose: true,
			watch: true
		})
	] : [
		new webpack.DefinePlugin({
			"VERSION": JSON.stringify(gitRevisionPlugin.version()),
			"COMMITHASH": JSON.stringify(gitRevisionPlugin.commithash()),
			"BRANCH": JSON.stringify(gitRevisionPlugin.branch())
		}),
		new webpack.ProvidePlugin({
			Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
			fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			minChunks: function (module) {
				return module.context && module.context.indexOf('node_modules') !== -1;
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "manifest",
			minChunks: Infinity
		}),
		new webpack.NamedModulesPlugin()
	]
};
