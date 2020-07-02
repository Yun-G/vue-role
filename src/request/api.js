import base from './baseUrl'; // 导入接口域名列表
import axios from './index' // 导入http中创建的axios实例
let role = null;
//用户模块
const user = {
	//注册
	register(data) {
		return axios.post(`${base.sq}/member/register`, data)
	},
	//登录
	login(data) {
		role = data
		// return axios.post(`${base.sq}/member/login`, data)
	},
	getInfo() {
		return new Promise(resolve => {
			let arr = []
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
	}
}


export default {
	user,
}
