<template>
	<div id="login__container" class="login__container flex__center flex__column text__left login__font">
	    <div class="login__logo">
	        <span class="icons__home-source icons__home-login-logo"></span>
	        <div class="login__logo_text">
	            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IOT Platform
	        </div>
	    </div>
	    <div class="login">
	    	<sign-in v-show="showSection=='in'"  @changeShow="changeShow"></sign-in>
        <sign-up v-show="showSection=='up'"  @changeShow="changeShow"></sign-up>
        <forget-password v-show="showSection=='forgot'" @changeShow="changeShow"></forget-password>
       <!--  <check-email v-if="showSection=='email'" ></check-email> -->
	    </div>
	</div>
</template>

<script>
import signIn from '@/components/login/signIn'
import signUp from '@/components/login/signUp'
import forgetPassword from '@/components/login/forgetPassword'
import checkEmail from '@/components/login/checkEmail'
export default{
	components:{signIn,signUp,forgetPassword,checkEmail},
	data(){
		return{
			showSection:'in'
		}
	},
	methods:{
		changeShow(o){
			this.showSection=o;
		}
	},
	mounted(){
		particlesJS.load('login__container', '../../../../static/particlesjs-config.json', function() {
        console.log('callback - particles.js config loaded');
    });
	}
}
</script>
<style lang="scss" scoped>
html,body{
	width:100%;
	height:100%;
}
.login__container{
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/login/login-background.jpg") ;
  background-size: cover;
  background-repeat: no-repeat;
}
.text__left {
  text-align: left !important;
}
.login__logo {
  position: absolute;
  top: 38px;
  left: 58px;
  font-size: 18px;
  color: #fff; }
  .login__logo span {
    display: block;
    margin-bottom: 19px;
    width: 108px;
    height: 32px; }
.login__logo_text {
  color: #DDD;
  font-size:14px;
}
.login{
	position: absolute; 
	z-index: 100;
}

</style>