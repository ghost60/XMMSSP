var path=require('path');
var webpack = require('webpack');
var node_modules=path.resolve(__dirname,'node_modules');
var ExtractTextPlugin = require('extract-text-webpack-plugin');//将你的行内样式提取到单独的css文件里，
var HtmlWebpackPlugin = require('html-webpack-plugin'); //html模板生成器
var CleanPlugin = require('clean-webpack-plugin'); // 文件夹清除工具
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

// var isProduction = function () {
//   return process.env.NODE_ENV === 'production';
// };

module.exports = {
	cache: true,
	//入口
	entry:{
		//配置入口文件，有几个写几个
		index: './src/js/index.js',
		admin: './src/js/admin.js',
	},
	//出口
	output:{
		path: path.join(__dirname, 'dist'), //打包后生成的目录
		publicPath: '/',	//模板、样式、脚本、图片等资源对应的server上的路径
		filename: 'js/[name].js',	//根据对应入口名称，生成对应js名称
		chunkFilename: 'js/[id].chunk.js'   //chunk生成的配置
	},
	//解决方案
	resolve:{
		root: [],
		extensions:['','.js','.jsx']
	},
	module:{
		//加载器
		loaders:[
			{
				test: /\.jsx?$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {cacheDirectory: true,presets: ['react', 'es2015']}
			},
      		{
      			test: /\.css$/,
      			loader: ExtractTextPlugin.extract('style','css')
      		},
      		{
      			test: /\.less$/,
      			loader: 'style!css!less'
      		},
      		{
      			test: /\.scss$/,
      			loader: ExtractTextPlugin.extract('style','css!sass')
      		},
      		{
		        test: /\.json$/,
		        loader: 'json',
		    },
        	{
		        test: /\.(jpe?g|png|gif|svg)$/,
		        loader: 'url?limit=8024&name=images/[name].[ext]'
		    },
		    {
		        test: /\.(woff2?|otf|eot|svg|ttf)$/i,
		        loader: 'url?name=fonts/[name].[ext]'
		    },
		    {
		        test: /\.html$/,
		        loader: 'url?name=[name].[ext]'
		    },
		],
		noParse:[pathToReact]//不再重新打包reactjs
	},
	babel:{
		presets:[["es2015", { "loose" : true} ], "react", "stage-0"],
		plugins:["transform-runtime","transform-class-properties"]
	},
	plugins:[
	 	// new CleanPlugin(['dist']),// 清空dist文件夹
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common', // 将公共模块提取，生成名为`vendors`的chunk
			minChunks: 2 // 提取至少2个模块共有的部分
		}),
		new ExtractTextPlugin( "css/[name].css"), //提取CSS行内样式，转化为link引入
		// new webpack.optimize.UglifyJsPlugin({
	 //      test: /(\.jsx|\.js)$/,
	 //      compress: {
	 //        warnings: false
	 //      },
	 //    }),
	],
	// devtool: isProduction()?null:'source-map',
	devServer: {
		contentBase: './dist',
		host: 'localhost',
		port: 8188, //端口
		inline: true,
		hot: false,
	}
};
