const state={
	now_loading:false
}
const mutations={
	changeLoadingState(state,o){
		state.now_loading=o;
	}
}

export default{
	state,
	mutations
}