import Vue from 'vue'
import config from '../utils/config.js'
export default{
	fetchAllServicesMenu(data){
		console.log(config.apiPreUrl+'/admin/GetAllMenuInfo');
		return Vue.http.get(config.apiPreUrl+'/admin/GetAllMenuInfo');
		/*let _fetchAllServicesMenu=Vue.resource(config.apiPreUrl+"/admin/GetAllMenuInfo");
		return _fetchAllServicesMenu.get();*/
	}
}