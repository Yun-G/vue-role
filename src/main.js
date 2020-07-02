import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from '@/request/api' // 接口对象
import '@/assets/reset.scss' //重置默认样式
import Var from "@/assets/common.js" //全局属性和方法
import VueLazyload from 'vue-lazyload';
Vue.use(Element)
Vue.use(Var)
Vue.use(VueLazyload, {
	error: require('./assets/img/error.png')
})

Vue.prototype.$http = http; // 将api挂载到vue的原型上

Vue.config.productionTip = false;

//创建时有token就赋token
let token = Vue.prototype.$xStorage.getItem('token');
if (token) {
	store.commit('user/setToken', token);
}
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
