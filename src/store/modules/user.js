import api from '@/request/api' // 导入http中创建的axios实例
import {resetRouter} from '@/router'
const state = {
	userInfo: {}, //用户信息
	token: null,
	isLogin: false,
	role: [], //用户权限信息
};
// actions
const actions = {
	setUserDate({
		commit
	}, obj) {
		commit('setUserDate', obj);
	},
	setToken({
		commit
	}, token) {
		commit('setToken', token);
	},
	//退出
	logout({
		commit
	}) {
		return new Promise((resolve, reject) => {
			api.user.logout().then(res => {
				commit('logout');
				resetRouter()
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	GetInfo({
		commit
	}) {
		return new Promise(function(resolve, reject) {
			api.user.getInfo().then(res => {
				commit('SET_ROLE', res);
				resolve(res);
			}).catch(err => {
				reject(err)
			})
		})
	}

};
// mutations store.commit改变state,唯一改变state的地方
const mutations = {
	setUserDate(state, obj) {
		state.userInfo = obj;
		state.isLogin = true;
	},
	setToken(state, token) {
		state.token = token;
	},
	logout(state) {
		state.token = null;
		state.userInfo = {}
		state.isLogin = false;
		state.role = []
	},
	SET_ROLE(role) {
		state.role = role
	}

};

export default {
	namespaced: true,
	state,
	actions,
	mutations
};
