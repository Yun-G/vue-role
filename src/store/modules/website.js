const state = {
	pending: []
};
// getters 从 store 中的 state 中派生出一些状态
const getters = {

};
// actions
const actions = {
	setPending({commit}, arr) {
		commit('setPending', arr);
	},
	push({commit}, obj){
		commit('push', obj);
	},
	cancelAll({commit}){
		commit('cancelAll')
	}
};
// mutations store.commit改变state,唯一改变state的地方
const mutations = {
	setPending(state, arr) {
		state.pending = arr;
	},
	push(state, obj) {
		state.pending.push(obj);
	},
	cancelAll(state) {
		state.pending.forEach(item=>{
			item.f();
		})
		state.pending = [];
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
