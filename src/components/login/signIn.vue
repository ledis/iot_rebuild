<template>
	<div class="login__content">
		<vue-form :state="formstate" v-model="formstate">
    <div class="login__title">SIGN IN</div>
    <div class="login__content_input username__margin_bottom">
       	<validate auto-label class="form-group required-field" :class="fieldClassName(formstate.name)">
            <input type="text"  name='name'  placeholder="Username" required v-model="model.name"/>            
        </validate>
     		<field-messages name="name" v-show="isSubmit">
           <!--<div class="success__msg"></div>-->
           <div class="error__msg" slot="required">Username is a required field</div>
     		</field-messages>
    </div>
    <div class="login__content_input">
        <validate auto-label class="required-field" :class="fieldClassName(formstate.password)">
            <input type="password" name="password"  placeholder="Password" required v-model="model.password" />
        </validate>
        <field-messages name="password" v-show="isSubmit" >
             <!--<div class="success__msg"></div>-->
             <div class="error__msg" slot="required">Password is a required field</div>
        </field-messages>
        
    </div>
    <div class="error__msg" v-if='errorMsg["fail"]'>{{errorMsg["fail"]}}</div>
    <div class="login__in_part">
        <div class="forgot__password">
            <a @click="changeShowForgotPassword">Forgot Password</a>
        </div>
        <div class="login__remember">
            <label><input type="checkbox" v-model="isRemember" /> Remember me</label>
        </div>
        <div class="login__in">
            <button  class="signin" @click.prevent="login"  >SIGN IN</button>
        </div>
    </div>
    <div class="sign__register">Don't have an account?  <a href="#" @click="changeShow">Sign Up</a> </div>
    </vue-form>
</div>
</template>
<script>
import config from '../../utils/config.js'
export default{
	data(){
		return{
			formstate: {},
			errorMsg:{},
			isSubmit:false,
			isRemember:true,
			model:{
				name:'',
				password:''
			}
		}
	},
	methods:{
    changeShowForgotPassword(){
      this.$emit('changeShow','forgot')
    },
    changeShow(){
      this.$emit('changeShow','up')
    },
		fieldClassName: function (field) {
      if(!field) {
        return '';
      }
      if((field.$touched || field.$submitted) && field.$valid && !this.errorMsg["fail"]) {
        return 'has-success';
      }
      if((field.$touched || field.$submitted) && field.$invalid && this.errorMsg["fail"]) {
        return 'has-danger';
      }
    },
    login(){
    	this.isSubmit=true;
    	if(this.formstate.$valid===false){
    		return
    	}
    	let o={
    		email:this.model.name,
    		password:this.model.password
    	}
    	this.$http.post(`${config.apiPreUrl}/login/getToken`,o,{emulateJSON: true}).then((res)=>{
        console.log(res);
    		this.errorMsg = {};
        if(res.body && res.body.httpCode != 200) {
            this.errorMsg["fail"] = res.body.msg;
            return false;
        }
        if(res.body.content.sensorList.length == 0 && res.body.content.roles.name != "admin"){
            this.errorMsg["fail"]="该帐号无可查看的传感器，请联系管理员！";
            return false;
        }
        let index = location.pathname.indexOf('login.html');
        let account = res.body.content;
        localStorage.setItem("account",JSON.stringify(account));
        localStorage.setItem("isremember",this.isRemember);
        
        let hasIot = account.menuNodeList && account.menuNodeList.find(o=> o.id == 10)
        if(hasIot && account.menuNodeList.length == 1){
          this.$router.push({path:'/home?iot'})
           /* location.href= location.pathname.substring(0,index) + '#/home?iot';*/
        } else {
          this.$router.push({path:'/home'})
            /*location.href= location.pathname.substring(0,index) + '#/home';*/
        }
    	})
    }
	}
}
</script>
<style lang="scss" >
.login__content{
  width: 452px;
  height: 495px;
  background: white;
  position: relative;
  box-shadow: 0px 0px 14px #423D40;
  padding: 0 44px 0 43px;
}
.login__title{
  padding: 56px 0 27px 0px;
  font-size: 18px;
  color: #3A3A3A;
  font-weight: bolder;
}
.login__content_input{
  width: 365px;
  position: relative;
  input{
    height: 48px;
    padding: 0 8px;
    background-color: #ffffff;
    padding-left: 15px;
    width: 100%;
    outline: none;
    font-size: 15px;
    border: solid 1px #C4C4C4;
    &:hover{
        border: solid #C4C4C4 1px;
        box-shadow:0 0 3px rgba(136,136,136,0.7);
    }
  }
}
.username__margin_bottom{
  margin-bottom: 25px;
}
.forgot__password{
  font-size: 11px;
  padding: 9px 0 0 4px ;
  a{
    color:#E25043;
    cursor: pointer;
  }
}
.login__remember{
   padding: 29px 0;
   font-size: 11px;
   color: #707D95;
   font-weight: lighter;
   input{
        margin-top:0px !important;
        margin-right: 5px;
        vertical-align: middle;
   }
}
.login__in_part{
  padding-left: 4px;
}
.login__in{
  height: 44px;
  button{
    width: 50%;
    height: 44px;
    color: #000;
    border: 0;
    background: #E25043;
    color: #ffffff;
    font-size: 12px;
  }
}
.sign__register{
  padding: 29px 0 0 6px;
  color: #4A4A4A;
  font-size: 12px;
  a{
    color: #E25043;
    text-decoration: none;
  }
}
.error__msg{
  color: #E25043;
  font-size: 13px;
  padding: 7px 0 0 0 ;
}
.has-danger{
  border: solid 1px #EB7057!important;
}
.has-success{
  border: solid 1px #43C7A9 !important;
}
.has-normal{
  border:solid #C4C4C4 1px!important;
}
</style>