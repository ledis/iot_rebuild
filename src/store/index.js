import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import progress_bar from './progress_bar.js'
import menus_info from './menus_info.js'
export default new Vuex.Store({
	modules:{
		progress_bar,
		menus_info
	}
})