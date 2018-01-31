<template>
	<div class="register__content">
		<vue-form :state="formstate" v-model="formstate" >
    <div class="register__title">SIGN UP</div>
    <div class="flex__display">
        <div class="left__part">
             <div class="register__content_input">
                <validate auto-label class="required-field required__tip" :class="fieldClassName(formstate.email, 'Email')">
                    <input type="text" class="require__input" name='email'  placeholder="Email" required maxlength="38" pattern='^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$' minlength="6" v-model="model.email"/>            
                </validate>
                <field-messages name="email" v-show="isSubmit" >
                    <div class="success__msg" v-if='!errorMsg["Email"]'></div>
                    <div class="error__msg" slot="required">Email is a required field</div>
                    <div class="error__msg" slot="minlength">should be 6-18 characters long</div>  
                    <div class="error__msg" slot="pattern">Email format is incorrect</div>
                </field-messages>
                <div class="error__msg" v-if='errorMsg["Email"]' >{{errorMsg["Email"]}}</div>
            </div>
            <div class="register__content_input">
                <validate auto-label class="required-field required__tip" :class="fieldClassName(formstate.password)">
                    <input type="password" class="require__input" name='password'  placeholder="Password" required  maxlength="18" minlength="6" v-model="model.password"/>            
                </validate>
                <field-messages name="password" v-show="isSubmit" >
                <div class="success__msg"></div>
                <div class="error__msg" slot="required">Password is a required field</div>
                <div class="error__msg" slot="minlength">should be 6-18 characters long</div>
                </field-messages>
            </div>
            <div class="register__content_input">
                <validate auto-label class="required-field required__tip" :class="fieldClassName(formstate.repassword)"   :custom="{confirm : confirm}">
                    <input type="password" class="require__input" name='repassword'  placeholder="Re-enter Password"  required   :confirm='model.password' v-model="model.repassword"/>            
                </validate>
                <field-messages name="repassword" v-show="isSubmit" >
                    <div class="success__msg"></div>
                    <div class="error__msg" slot="required">Password is a required field</div>  
                    <div class="error__msg" slot="confirm">Password don't match</div>
                </field-messages>                         
            </div>               
            <div class="register__content_input">
                <validate auto-label class="required-field required__tip" :class="fieldClassName(formstate.username)">
                    <input type="text" class="require__input" name='username'  placeholder="Display Name" required maxlength="30" minlength="8" v-model="model.username"/>      
                </validate>
                <field-messages name="username" v-show="isSubmit" >
                    <div class="success__msg"></div>
                    <div class="error__msg" slot="required">Username is a required field</div>
                    <div class="error__msg" slot="minlength">should be 8-30 characters  long</div>                     
                </field-messages>
            </div>
            <div class="register__content_input">
                <validate auto-label class="" :class="fieldClassName(formstate.phone)">
                    <input type="text"  name='phone'  placeholder="Phone number" pattern="^[0-9]{11}$" v-model="model.phone"/>            
                </validate>
                <field-messages name="phone" v-show="isSubmit" >
                    <div class="success__msg"></div>
                    <div class="error__msg" slot="pattern">Please enter the correct phone number</div>
                </field-messages>
            </div>
            <div class="choose__male" >
                <input type="radio" name="male" value=1  v-model="model.gender" /><label>Male</label>
                <input type="radio" name="male" value=2  v-model="model.gender" /><label>Female</label>
            </div>
            <div class="agree__agreement">
                By signing up i agree to the Terms of Use and Privacy Policy.
            </div>
            <div class="register__in">
                <button  @click.prevent='signup'>SIGN UP</button>
            </div>
            <div class="sign__login">Already have an account?  <a href="#" @click="changeShow">Sign In</a> </div>
        </div>
        <div class="flex__1">
            <div class="register__content_input invitation" :class="{'has-danger':errorMsg['invitation']}" >     
                <input type="text" placeholder="Invitation Code" maxlength="6" v-model="model.invitation"/>  <button  @click.prevent.stop='confirmInvitation'>CONFIRM</button>             
            </div>
            <div class="error__msg"  v-if="errorMsg['invitation']">{{errorMsg["invitation"]}}</div>
            <div class="register__content_input">
                <input type="text" placeholder="Company" disabled v-model='model.company'/>
            </div>
            <div class="register__content_input">
                <textarea  placeholder="if you don't have an invitation code or invitation code invalid,please write down your company name." v-model='model.remark'></textarea>
            </div>
        </div>
    </div>
    </vue-form>
 </div> 
</template>
<script>
import config from '../../utils/config.js'
export default{
	data(){
      return {
          errorMsg:{},
          formstate: {},
          isSubmit:false,
          isInvitationSubmit: false,
          model: {
              username: '',
              password: '',
              repassword: '',
              email: '',
              phone: '',
              gender: '',
              invitation: '',
              company: '',
              cmpcode: '',
              remark: ''
          },
          isSubmit: false,
          successMsg:false
      }
  },
  methods: {
        confirm: function(value, attr){
            return value == attr;
        },
        changeShow: function () {
            this.$emit('changeShow', 'in')
        },
        fieldClassName: function (field, name) {
            if (!field) {
                return '';
            }
            if (this.isSubmit && field.$valid && !this.errorMsg[name]) {
                return 'has-success';
            }
            if (this.isSubmit && field.$invalid || this.errorMsg[name]) {
                return 'has-danger';
            }
        },
        boxClose:function(){
            this.successMsg = false;
            this.$emit('changeShow', 'in');
        },
        confirmInvitation: function() {
            let invitation = this.model.invitation;
            this.isInvitationSubmit = true;
            if(!invitation) return;
           this.$http.get(`${config.apiPreUrl}/invitationcode/GetInvitationCode?invitationcode=${invitation}&pageno=1&pagecount=1&registered=0&enable=1`)
                .then(res=>{
                	console.log(res);
                    this.errorMsg = {};
                    if(res.body && res.body.httpCode != 200) {
                        this.errorMsg["fail"] = res.body.msg;
                        return false;
                    }
                    if(!res.body.content.content.length ) {
                        this.errorMsg["invitation"] = "Invitation code does not exist or is unavailable";
                        return false;
                    }

                    if( !res.body.content.content.length) {
                        return false;
                    }
                    let _invitation =  res.body.content.content[0];
                    //验证码禁用状态
                    if(!_invitation.enable) {
                        return false
                    }
                    let company = _invitation.cmpname;
                    let cmpcode = _invitation.cmpcode;
                    this.model.cmpcode = cmpcode;
                    this.model.company = company;
                })
        },
        signup: function() {
            this.isSubmit = true;
            if(this.formstate.$invalid) {
                return;
            }
            this.$http.post(`${config.apiPreUrl}/register`, this.model, {emulateJSON: true})
                .then((res)=>{
                    console.log(res.body);
                    this.errorMsg = {};
                    if(res.body.msg) {
                        res.body.msg.forEach(o=>{
                            this.errorMsg[o.field] = o.message;
                        })
                        return;
                    } else {
                        this.successMsg = true;

                    }
                })
        }

    }
}
</script>
<style lang="scss" scoped>
.register__content{
  width: 858px;
  height: 720px;
  background: white;
  position: relative;
  box-shadow: 0px 0px 14px #423D40;
  padding: 0 44px 0 43px;
}
.register__title{
  padding: 56px 0 27px 0px;
  font-size: 18px;
  color: #3A3A3A;
  font-weight: bolder;
}
.left__part{
  padding: 0 40px 0 0;
}
.register__content_input{
    width: 365px;
    margin-bottom: 15px;
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
      &:after{
        content:'*';
        color:red;
        }
    }


  &.invitation {
    display:flex;
    position:relative;
    button {
      color: #000;
      border: 0;
      background: #E25043;
      color: #ffffff;
      font-size: 12px;
      padding: 0 10px;
    }
    & ~ .error__msg {
      padding-top: 0px;
      margin-bottom: 5px;
      margin-top: -5px;
    }
  }

  textarea{
      width: 365px;
      height: 105px;
      padding: 15px;
      font-size: 15px;
      border: solid 1px #C4C4C4;
      resize: none;
      &:hover{
        border: solid #C4C4C4 1px;
        box-shadow:0 0 3px rgba(136,136,136,0.7);
      }
      &:focus{
        border: solid #4990E2 1px !important;
        border-style: inset;
      }
  }
}
.choose__male{
  padding:15px 20px 35px 5px;
  label{
      padding-right: 75px;
      padding-left: 10px;
      color: #707D95;
  }
}
.register__in{
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
.sign__login{
  padding: 29px 0 0 6px;
  color: #4A4A4A;
  font-size: 12px;
  a{
    color: #E25043;
    text-decoration: none;
  }
}
.agree__agreement{
  color: #969696;
  font-size: 13px;
  padding:0 0 10px 3px;
}
.required__tip{
  position: relative;
  &:after{
    position: absolute;
    top: 20px;
    right: -15px;
    content: '*';
    color: red;
  }
}
.successMsg_container{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.6);
  z-index: 80;
}
.successMsg_content{
  width: 380px;
  height: 250px;
  background-color: white;
  display: flex;
  align-items: center;
  z-index: 88;
}
.text__part{
  width: 380px;
  height: 100px;
  padding: 20px 40px;
  background-color: #F4F5F4;
  img{
    width: 20px;
    vertical-align: middle;
  }
  .title{
    font-weight: bold;
    padding-left: 10px;
    font-size: 16px;
  }
  .text{
    padding-top: 15px;
  }
}
.box__close{
  position: absolute;
  top: -18px;
  right: -12px;
  border: solid 2px white;
  border-radius: 50%;
  background-color: rgba(0,0,0,1);
}
</style>