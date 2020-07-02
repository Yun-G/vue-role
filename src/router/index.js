import Vue from 'vue'
import VueRouter from 'vue-router'
import {
	constantRouterMap
} from './config';
import store from "../store/index"


Vue.use(VueRouter)

//解决在路由中添加了相同的路由
var originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err);
};
VueRouter.prototype.replace = function replace(location) {
	return originalPush.call(this, location).catch(err => err);
};


const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes:constantRouterMap
})
//登陆后不能访问的页面
const exclude = ['/login', '/register', '/resetPassword']
//在免登录白名单
const whiteList = ['/login','/register']
// 全局路由守卫，可在这里判断权限和状态  放行必须调用next方法
router.beforeEach((to, from, next) => {
	store.commit('website/cancelAll');
	//访问除登录页面所有页面验证token存在否
	let token = store.state.user.token;
	if (token != 403 && token != null) {
		if (store.state.user.role.length === 0) { // 判断当前用户是否已拉取完user_info信息
			store.dispatch('user/GetInfo').then(roles => { // 拉取info
				store.dispatch('permission/GenerateRoutes', {
					roles
				}).then(() => { // 生成可访问的路由表
					router.addRoutes(store.state.permission.addRouters) // 动态添加可访问路由表
					router.options.routes = [...store.state.permission.addRouters]//不加这句不会显示菜单
					next({ ...to,
						replace: true
					}) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
				})
			}).catch(err => {
				console.log(err);
			});
		} else {
			//当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
			if (exclude.includes(to.path)) {
				next('/');
			} else {
				next()
			}
		}

	} else {
		if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
			next();
		} else {
			router.replace({
				path: '/login',
				query: {
					redirect: to.path,
					// code: token
				}
			});
		}
	}
})

export default router
