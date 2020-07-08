/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import vue from 'vue';
import router from '../router/index';
import store from "../store/index"
import {
	Notification
} from 'element-ui';

/** 
 * 提示函数 
 */
const tip = (msg,
	type) => {
	Notification({
		message: msg,
		type: type,
		showClose: true,
		duration: 1000 * 7
	});
}

/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = async (text) => {
	tip(text, 'error');
	store.commit('website/cancelAll');
	setTimeout(() => {
		router.replace({
			path: '/login',
			query: {
				redirect: router.currentRoute.fullPath
			}
		});
	}, 1000);
}

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
	// 状态码判断
	switch (status) {
		case 400:
			tip('请求失败', 'error');
			break;
		case 401:
			toLogin('未登录');
			break;
		case 403: //403 token过期 清除token并跳转登录页
			vue.prototype.$xStorage.removeItem('token');
			store.commit('user/logout');
			toLogin('长时间未操作，请重新登录');
			break;
		case 404: // 404请求不存在
			tip('请求的资源不存在', 'error');
			break;
		case 500:
			tip('服务器错误', 'error');
			break;
		default:
			console.log(other);
	}
}

// 创建axios实例
var instance = axios.create({
	// timeout: 1000 * 20
});

/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */
// cancelToken
let cancelToken = axios.CancelToken;
// 两个取消的请求是一组请写在这里
let cancelUrl = [
	['/url1#', '/url2#'],
]
let isGroup = (requset, cancel) => {
	for (let item of cancelUrl) {
		if (item.includes(requset) && item.includes(cancel)) {
			return true
		}
	}
	return false
}
instance.interceptors.request.use(
	config => {
		// 登录流程控制中，根据本地是否存在token判断用户的登录情况        
		// 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token        
		// 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码        
		// 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。 
		const token = store.state.user.token;
		token && (config.headers.Authorization = token);
		if (config.url.charAt(config.url.length - 1) === "#") {
			let temp = store.state.website.pending;
			store.state.website.pending.forEach(function(item, index) {
				if (item.u === config.url || isGroup(config.url, item.u)) {
					item.f();
					temp.splice(index, 1)
				}
			})
			store.commit('website/setPending', temp)
		}
		config.cancelToken = new cancelToken(function(c) {
			store.commit('website/push', {
				u: config.url,
				f: c
			});
		})
		return config;
	},
	error => Promise.error(error))

// 响应拦截器
instance.interceptors.response.use(
	// 请求成功
	res => {
		if (res.status === 200) {
			//根据后台接口返回定义错误的提示
			if (res.data.res != 200) {
				tip(res.data.msg, "error")
			}
		} 
		return Promise.resolve(res.data)
	},
	// 请求失败
	error => {
		const {
			response,
		} = error;
		if (response) {
			// 请求已发出，但是不在2xx的范围 
			errorHandle(response.status, response.data.msg);
		} else {
			tip(error.message, "error")
		}
		return Promise.reject(error)
	});

export default instance;
