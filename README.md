# 介绍
- 项目使用了[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)的layout布局文件
- axios 进行了api模块化，增加多个请求接口
- 路由动态化进行权限验证，目前有三种角色，可在mete中定义访问权限， 详见router文件夹
- store也分了模块化，利于管理和按需引入
- 新加数据字典
 ```javascript
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
```
## Getting started
```bash
# clone the project
git clone https://github.com/Yun-G/vue-role.git

# enter the project directory
cd vue-role

# install dependency
yarn install or yarn

# develop
yarn serve
```
This will automatically open http://localhost:8080
# 关于作者
- email admin@cqchunxiu.com
