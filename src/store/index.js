import Vuex from "vuex";
import Vue from "vue";
import user from "./modules/user.js"
import website from "./modules/website.js"
import admin from "./modules/admin.js"
import permission from "./modules/permission.js"

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		website,
		admin,
		permission
	},
});
