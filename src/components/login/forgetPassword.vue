<template>
	<div class="forgot-password__content">
		<vue-form :state="formstate" v-model="formstate" >
        <div class="forgot-password__title">Please set me up with a new password</div>
        <div class="forgot-password__tip">To reset your password for your account,enter your email address and we'll send you an  email with instructions.</div>
        <div class="email__address">
            <validate auto-label  class="required-field" :class="fieldClassName(formstate.email, 'Email')">
                <input type="text"  name='email'  placeholder="Email address" pattern='^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$' required v-model="model.email"/>  
            </validate>
            <field-messages name="email" v-show="isSubmit" >
                  <div class="success__msg"></div>
                  <div class="error__msg" slot="required">Email is a required field</div>
                  <div class="error__msg" slot="pattern">Email format is incorrect</div>
            </field-messages>
        </div>
        <div class="flex__display address__bottom">
            <div class="cancel__btn_box"><a class="cancel__btn" @click="changeShow">CANCEL</a></div>
            <div class="submit__btn_box flex__1"><button class="submit__btn" @click.prevent="changeShowCheckSuccess">SUBMIT</button></div>
        </div>
        <div>
            <span>Back to</span>
            <span class="sign__in" @click="changeShow">Sign In</span>
        </div>
    </vue-form>   
	</div>
</template>
<script>
export default{
	data(){
		return{
			formstate: {},
			errorMsg:{},
			isSubmit:false,
			isRemember:true,
			model:{
				email:''
			}
		}
	},
	methods:{
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
    changeShow: function () {
        this.$emit('changeShow', 'in');
    },
    changeShowCheckSuccess(){
    	this.isSubmit=true;
    	if(this.formstate.$valid===false){
    		return
    	}
    	this.$emit('changeShow','in');
    }
	}
}
</script>
<style lang="scss" scoped>

.forgot-password__content{
  width: 500px;
  height: 510px;
  background: white;
  position: relative;
  box-shadow: 0px 0px 14px #423D40;
  padding: 80px 44px 40px 43px;
}
.forgot-password__title{
  font-weight: bold;
  font-size: 16px;
  padding: 0 0 60px 0;
}
.forgot-password__tip{
  color: #E25043;
}
.email__address{
  padding: 20px 0 65px 0;
  input{
      width: 100%;
      height: 50px;
      padding: 0 15px;
      line-height: 50px;
  }
}
.address__bottom{
    padding-bottom: 30px;
    button{
        width: 195px;
        height: 50px;
        color: white;
        border: none;
    }
}
.cancel__btn{
  display: inline-block;
  margin-right: 23px;
  background-color: #C4C4C4;
  width: 195px;
  height: 50px;
  color: white;
  border: none;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}
.submit__btn{
  background-color: #F28C69;
}
.sign__in{
  color:#E25043 ;
  font-weight: bold;
  font-size: 16px;
  padding-left: 8px;
}
.success__remind{
  padding-bottom: 40px;
}
.send__email_remind{
  padding-bottom: 10px;
}
.success_icon{
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-right: 10px;
}
.time_out{
  margin: 60px 0;
  span{
     color: #E25043;
     font-size: 24px;
  }
}
</style>