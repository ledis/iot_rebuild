<template>
	<div class="main__view">
		<loading></loading>
		<div class="header__view">
        <header-section></header-section>
    </div>
    <div class="body__view">
    	<div class='left__view'>
          <left-menu></left-menu>
      </div>
      <div class='content__view'>
          <router-view></router-view>
      </div>
    </div>
	</div>
</template>
<script>
import loading from '@/components/control/aqi_setting/load.vue'
import headerSection from '@/components/main/header_menu/header'
import leftMenu from '@/components/main/left_menu/index'
export default{
	components:{
		headerSection,
		leftMenu,
		loading
	}
}
</script>
<style lang="scss" scoped>
.main__view {
	width:100%;
	height:100%;
	position:relative;
}
.header__view{
	position:absolute;
	top:0;
	left:0;
	width:100%;
	height:50px;
}
.body__view{
	width:100%;
	height:100%;
	padding-top:50px;
	box-sizing:border-box;
	position:relative;
	display:flex;
	overflow:hidden;
}
.left__view{
	flex:0 0 60px;
	width:60px;
	height:100%;
}
.content__view{
	flex:1;
}

</style>