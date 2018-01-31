<template>
	<div class="header_container">
		<div class="header__logo"><i class="icons__home-source icons__home-logo"></i></div>
		<div class="header__select"  @mouseenter="openProducts" @mouseleave="closeProducts">
			<span>All Products</span>
			<span class="icons__home-source  icons__homeicons-big-arrow-size"
            :class="{
							'icons__home-header-down-arrow':!showAllProducts,
							'icons__home-header-up-arrow': showAllProducts
            }"
           >
      </span>
      <products-view :showAllProducts="showAllProducts" @openProducts="openProducts"></products-view>
		</div>
	</div>
</template>
<script>
import productsView from '@/components/main/header_menu/products_box/index'
export default{
	components:{
		productsView
	},
	data(){
		return{
			showAllProducts:false
		}
	},
	methods:{
		openProducts(){
			this.showAllProducts=true;
		},
		closeProducts(){
			this.showAllProducts=false;
		}
	}
}
</script>
<style lang="scss" scoped>

.header_container {
    width:100%;
    height:100%;
    position: relative;
    z-index: 110;
    display:flex;
}
.header__logo{
    width: 60px;
    background-color: #3A3A3A;
    color: white;
    line-height: 60px;
    text-align: center;
}
.header__select{
    width: 200px;
    padding: 18px 0 0 15px;
    border-right: solid 1px #ccc;
    font-size: 13px;
    position:relative;
    z-index:110;
    background-color: white;
    cursor: pointer;
    box-shadow: 3px 0px 10px rgba(0, 0, 0, 0.3);
    span{
        margin-left: 25px;
    }
}

</style>