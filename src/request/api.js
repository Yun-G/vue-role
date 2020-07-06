import base from './baseUrl'; // 导入接口域名列表
import axios from './index' // 导入http中创建的axios实例
//测试
import Cookies from 'js-cookie'
//用户模块
const user = {
	//注册
	register(data) {
		return axios.post(`${base.sq}/member/register`, data)
	},
	//登录
	login(data) {
		 Cookies.set("role", data)
		// return axios.post(`${base.sq}/member/login`, data)
	},
	//获取用户信息
	getInfo() {
		return new Promise(resolve => {
			let arr = []
			const role =Cookies.get("role")
			if (role == 1) {
				arr.push("buyer")
			} else if (role == 2) {
				arr.push("seller")
			} else {
				arr.push("admin")
			}
			resolve(arr)
		})
		// return axios.post(`${base.sq}/getInfo`)
	},
	//登出
	logout(){
		return new Promise(resolve => {
			resolve()
		})
	}
}
//数据字典
const dictionary = {
	//获取数据
	getData() {
		// return axios.get(`${base.dic}/get`)
		return axios.get("https://mock.yonyoucloud.com/mock/10610/MGT/System/DataDictionary/GetDataDictionaryList.ashx")
	},
	addFather(data) {
		return axios.post(`${base.dic}/MGT/System/DataDictionary/AddDataDictionary.ashx`,data)
	}
}


export default {
	user,
	dictionary
}
