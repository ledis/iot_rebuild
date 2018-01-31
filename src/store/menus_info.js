import Vue from 'vue'
import {MenuApi} from '../api/index.js'
import config from '../utils/config.js'
import Router from 'vue-router'
const state={
	allServicesMenu:[]
}

const mutations={
	fetchAllServicesMenu:function(state,o){
		let _menus = o.data;
    console.log(_menus)
    _menus=_menus.map(c=>{
    	let iconFullPath = `${config.apiPreUrl}/static/icons/${c.icon}?444`;
      let iconHoverFullPath = `${config.apiPreUrl}/static/icons/${ c.icon.split('.')[0]}_hover.${c.icon.split('.')[1]}?444`;
      return Object.assign({},c,{
          iconFullPath,
          iconHoverFullPath
      })
    })
    /*if(_type=='iot') {
        _menus = _menus.filter(o=>o.type=='iot');
    } else if(_type == 'customer') {
        _menus = _menus.filter(o=>!o.type);
    }*/
    //console.log(_menus);
   
    state.allServicesMenu = _menus;
	}
}

const actions={

	fetchAllServicesMenu({commit, state}) {
      var promise = new Promise(function(resolve, reject) {
          MenuApi.fetchAllServicesMenu().then((data)=>{
          	resolve()
          	commit('fetchAllServicesMenu',{
							data:data.body.content
						})
          })
      });
      return promise;
  }
}

export default{
	state,
	mutations,
	actions
}