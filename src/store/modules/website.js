const state = {
	pending: []
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
	actions,
	mutations
};
