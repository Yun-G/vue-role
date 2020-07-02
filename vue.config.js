const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')

const cdn = {
	js: [
		'//cdn.bootcss.com/vue/2.6.10/vue.min.js',
		'//cdn.bootcss.com/element-ui/2.12.0/index.js',
		'//cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
		'//cdn.bootcss.com/axios/0.19.0/axios.min.js',
		'//cdn.bootcdn.net/ajax/libs/vue-lazyload/1.3.3/vue-lazyload.js',
		'//cdn.bootcdn.net/ajax/libs/core-js/2.6.5/core.min.js',
		// '//cdn.bootcdn.net/ajax/libs/vue-router/3.0.3/vue-router.min.js',
	],
};
module.exports = {
	// webpack配置
	chainWebpack: (config) => {
		if (process.env.NODE_ENV === 'production') {
			config.plugin('html').tap(args => {
				args[0].cdn = cdn;
				return args;
			});
		}
	},
	configureWebpack: (config) => {
		//排除第三方库 减少打包体积
		if (process.env.NODE_ENV === 'production') {
			config.externals = {
				'element-ui': 'ELEMENT',
				'vue': 'Vue',
				'axios': 'axios',
				'vuex': 'Vuex',
				'vue-lazyload': 'VueLazyload',
				'core-js': 'core',
				// 'vue-router': 'VueRouter',
			};
			// config['plugins'].push(new BundleAnalyzerPlugin());
			config['plugins'].push(new CompressionPlugin({
				test: /\.js$|\.html$|.\css/,
				threshold: 1024 * 100,
				deleteOriginalAssets: false
			}));
		}
	},
	// 生产环境是否生成 sourceMap 文件
	productionSourceMap: false,
	// webpack-dev-server 相关配置
	// devServer: {
	// 	open: true, //是否打开游览器
	// 	host: 'localhost',
	// 	port: 88, // 端口号
	// 	https: false,
	// 	hotOnly: false, // https:{type:Boolean} 
	// 	proxy: { // 配置跨域
	// 		'/api': {
	// 			target: '', //源地址
	// 			changeOrigin: true, //改变源
	// 			ws: true, //是否代理websockets
	// 			pathRewrite: {
	// 				'^/api': ''
	// 			}
	// 		}
	// 	}, // 配置跨域处理,只有一个代理
	// 	before: app => {}
	// },
	// 第三方插件配置
	pluginOptions: {}
}
