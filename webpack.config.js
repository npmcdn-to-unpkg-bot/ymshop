//node的路径模块
var path = require('path');
//我们是webpack当然要引入这个
var webpack = require('webpack');
//这个是构建页面资源的插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//因为我们是vue.js的应用，把各个组件当做一个页面.vue后缀，所以引入这个可以编译這些文件
var vue = require("vue-loader");


//__dirname是node里面的一个变量，指向的是当前文件夹目录
var ROOT_PATH = path.resolve(__dirname);
//这个我们的文件入口，等下我们就会从main.js这个文件作为入口
var APP_PATH = path.resolve(ROOT_PATH, 'src/main.js');
//这个是文件打包出来的输出路径
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');


var plugins = [
  //提公用js到common.js文件中
  new webpack.optimize.CommonsChunkPlugin('common.js'),
  //将样式统一发布到style.css中
  new ExtractTextPlugin("../style.css", {
    allChunks: true
  }),
 // 使用 ProvidePlugin 加载使用率高的依赖库
  new webpack.ProvidePlugin({
    $: 'webpack-zepto'
  })
];







module.exports = {
     //文件的入口，还可以写成多数组的形式，具体自己扩展
     entry:[APP_PATH],
     //输出
     output:{
         //输出路径
         path: BUILD_PATH,
         //打包的js命名
         filename: 'build.js',
         // 指向异步加载的路径
         publicPath:'./build/'
         // 非主文件的命名规则，加缓存用到md5
         // chunkFilename: 'vueComponents.js?[chunkhash]'
     },
     resolve: {
     	 root: [
     	 	__dirname,
     	 	path.resolve('./src/components'),
     	 	path.resolve('./src/vue'),
        path.resolve('./src/vuex')
     	 ],	
     	 alias: {
     	 	// 'zepto':'lib/zepto/zepto.main.js',
     	 	'iSlider':'lib/iSlider/build/iSlider.min.js',
        'iSlider-dot':'lib/iSlider/build/iSlider.plugin.dot.js',
     	 	'vue':'lib/vue/dist/vue.js',
     	 	'vue-router':'lib/vue-router/dist/vue-router.min.js',
     	 	'vue-resource':'lib/vue-resource/dist/vue-resource.common.js',
     	 	'vue-touch':'lib/vue-touch/vue-touch.min.js',
        'vuex':'lib/vuex/dist/vuex.min.js',
        'hammerjs':'lib/hammerjs/hammer.min.js'
     	 }

     },
     cache:false,
     module: {
         loaders: [
              {
                test: /\.vue$/,
                loader: 'vue'
              },
              // {
              //   test: /\.html$/,
              //   loader: 'vue-html'
              // },
              {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", 'css-loader')
              },
              {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
              },
               {
		        test: /\.(png|jpg|jpeg|gif)$/,
        		loader: 'url-loader?limit=10&name=images/[name].[ext]'
		      }
         ]
    },
  //vue提倡把一个组件当做一个页面，所以可能在一个页面写html，style，javascript，也可以引入和写scss文件
  vue: {
   		loaders: {
      	sass: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!sass-loader')
   	}
    // html:{
    //   attrs:false
    // }
  },
  plugins: plugins,


  // 开启source-map，webpack有多种source-map
  // devtool: 'eval-source-map'
}


if (process.env.NODE_ENV === 'production') {
  // module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}