import xDictionary from "./xDictionary";
import axios from "axios";
//localStorage的封装
const xStorage = {
	/**
	 * 设置localStorage
	 * @param {*} key 键
	 * @param {*} val 值
	 * @param {Date} expired 如果为空则视为永久有效
	 */
	setItem(key, val, expired) {
		let time = null;
		if (expired != null) {
			if (typeof(expired) == "number") {
				let newDate = new Date();
				let overdueDate = new Date();
				overdueDate.setTime(newDate.getTime() + expired)
				expired = overdueDate.timeFormat("yyyy-MM-dd HH:mm:ss")
			}
			expired = expired.replace(/-/g, ":").replace(" ", ":");
			expired = expired.split(":");
			time = new Date(
				expired[0],
				expired[1] - 1,
				expired[2],
				expired[3],
				expired[4],
				expired[5]
			);
		}
		const item = {
			data: val,
			expired: time
		};
		localStorage.setItem(key, JSON.stringify(item));
	},

	/**
	 * 获取localStorage某个值
	 * @param {*} key 键
	 */
	getItem(key) {
		try {
			const item = JSON.parse(localStorage.getItem(key));
			if (item) {
				if (key == "token") {
					if (item.expired == null) {
						return item.data;
					}
					if (new Date(item.expired) > new Date()) {
						return item.data;
					} else {
						return 403
					}
				} else {
					return item
				}
			}
			return null;
		} catch {
			console.log("localStorage获取Key出错")
		}
	},

	/**
	 * 删除localStorage某个值
	 * @param {*} key 键
	 */
	removeItem(key) {
		return localStorage.removeItem(key);
	}
}

export default {
	install: Vue => {
		//加载数据字典
		axios.get("https://mock.yonyoucloud.com/mock/10610/MGT/System/DataDictionary/GetDataDictionaryList.ashx").then(res => {
			if (res.res == 0) {
				Vue.prototype.$D = new xDictionary(res.data);
			}
		})
		//挂载xStorage
		Vue.prototype.$xStorage = xStorage
		//$emit提交 $on 处理 事件总线
		Vue.prototype.$E = new Vue(); 
		//---------全局方法 ---------------//
		String.prototype.timeFormat = Date.prototype.timeFormat = function(format) {
			let time = this;
			let o = {
				"M+": time.getMonth() + 1,
				"d+": time.getDate(),
				"H+": time.getHours(),
				"m+": time.getMinutes(),
				"s+": time.getSeconds(),
				"q+": Math.floor((time.getMonth() + 3) / 3), //季度
				"f+": time.getMilliseconds() //毫秒
			};
			if (/(y+)/.test(format))
				format = format
				.replace(RegExp.$1, time.getFullYear() + "")
				.substr(4 - RegExp.$1.length);
			for (let k in o) {
				if (new RegExp("(" + k + ")").test(format))
					format = format.replace(
						RegExp.$1,
						RegExp.$1.length == 1 ?
						o[k] :
						("00" + o[k]).substr(("" + o[k]).length)
					);
			}
			return format;
		};
	}
}