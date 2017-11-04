<template>
  <div class="companyLogin">
    <ul class="loginInput">
      <li>
        <input v-model="personalLoginInput.tel" type="tel" placeholder="手机号">
      </li>
      <li>
        <input v-model="personalLoginInput.picConfirm" @blur="picConfirm" type="text" placeholder="图形验证码">
        <img src="http://10.1.31.6:8080/captcha.jpg" alt=""/>
        <!--<p v-cloak @click="random">{{makeRandom.num}}</p>-->
        <span v-if="reveal.error">图片验证码错误</span>
      </li>
      <li>
        <input v-model="personalLoginInput.messageConfirm" type="text" :placeholder="messageConfirm.inputPlaceholder"/>
        <button :disabled="reveal.buttonDisabled" @click="getMessageConfirm" v-cloak>{{messageConfirm.confirmText}}</button>
      </li>
    </ul>
    <ul class="loginSubmit">
      <li>
        <button @click="personalLogin"><router-link to="">登录</router-link></button>
      </li>
    </ul>
  </div>
</template>
<script>
  import Vue from "vue"
  import {mapState} from "vuex"
  export default {
    name:"companyLogin",
    data(){
      return{
        makeRandom:{num:"",},
        messageConfirm:{
          confirmText:"获取验证码",
          inputPlaceholder:"短信验证码"
        },
        reveal:{
          error:false,//图片验证码
          buttonDisabled:false
        },
        personalLoginInput:{
          tel:"",
          picConfirm:"",
          messageConfirm:""
        }
      }
    },
    computed:mapState({
      user:state=>state.userState.user
    }),
    mounted(){
      do{
        Vue.set(this.makeRandom,"num",parseInt(Math.random()*10000))
      }while (this.makeRandom.num<1000);

      sessionStorage.setItem("account","15612345678")
    },
    methods:{
      random(){
        do{
          Vue.set(this.makeRandom,"num",parseInt(Math.random()*10000))
        }while (this.makeRandom.num<1000);

        if(this.personalLoginInput.picConfirm!=this.makeRandom.num&&this.personalLoginInput.picConfirm){
          Vue.set(this.reveal,"error",true)
        }else {
          Vue.set(this.reveal,"error",false)
        }
      },
      picConfirm(){
        if(this.personalLoginInput.picConfirm!=this.makeRandom.num){
          do{
            Vue.set(this.makeRandom,"num",parseInt(Math.random()*10000))
          }while (this.makeRandom.num<1000);
          //每次输入错误后重置
          Vue.set(this.reveal,"error",true)
        }else {
          Vue.set(this.reveal,"error",false)
        }
      },
      getMessageConfirm(){
        Vue.set(this.reveal,"buttonDisabled",true)
        Vue.set(this.messageConfirm,"confirmText","60s");
        //Vue.set(this.messageConfirm,"confirmText",);
        var self =this;
        var timer=setInterval(
          function () {
            if(parseInt(self.messageConfirm.confirmText)>1){
              self.messageConfirm.confirmText=parseInt(self.messageConfirm.confirmText)-1+"s";
            }else {
              clearInterval(timer);
              self.reveal.buttonDisabled=true;
              self.messageConfirm.confirmText="重新获取验证码";
            }

          },1000);
      },
      personalLogin(){
        var account = sessionStorage.getItem("account");
        if((this.personalLoginInput.tel==account||this.personalLoginInput.tel=="root")&&!this.reveal.error){
          location.hash="/index";
        }else if(this.personalLoginInput.tel!=account&&this.personalLoginInput.tel!="root"){
          alert("账号不存在")
        }
        location.hash="/index";
      }

    },
    destroyed(){
    	Vue.set(this.user,'userState',2)

      sessionStorage.setItem("state",this.user.userState)

    }
  }
</script>
<style scoped lang="scss">
  $personalThemeColor:rgb(242,117,25);
  .loginInput{
    li{
      padding:11px 0;
      height:48px;
      border-bottom:1px solid #eaeaea;
      padding-left: 41px;
      background: url("../../../assets/img/logoin/icon_code.png") left center no-repeat;
      input{
        font-size:14px;
        width:396px;
        line-height: 25px;
        height: 25px;
      }
    }
    li:nth-child(1){
      background: url("../../../assets/img/logoin/phone.png") 4px center no-repeat;
    }
    li:nth-child(2){
      position: relative;
      background: url("../../../assets/img/logoin/confirm.png") left center no-repeat;
      p,img{
        position: absolute;
        top: 10px;
        right:40px;
        width: 71px;
        height:27px;
        background: #eaeaea;
        cursor: pointer;
      }
      span{
        font-size: 14px;
        line-height: 18px;
        color: $personalThemeColor;
        display: block;
        width:70px;
        text-align: left;
        position: absolute;
        top: 10px;
        right: -38px;
      }
      
    }
    li:nth-child(3){
      position: relative;
      button{
        font-size:14px;
        position: absolute;
        top:0;
        right:12px;
        height: 46px;
        line-height: 46px;
        width:100px;
        cursor: pointer;
        color: $personalThemeColor;
        text-align: left;
        border: 0;
        background: #ffffff;

      }
    }
  }
  .loginSubmit{
    margin-top:40px;
    li{
      width: 314px;
      margin:80px auto;
      margin-bottom: 0;
      button{
        width: 314px;
        height:50px;
        background: url("../../../assets/img/logoin/personal.png") left center no-repeat;
        border:0px;
        color: #ffffff;
        border-radius: 5px;
        cursor: pointer;
        a{
          display: block;
          width: 314px;
          height:50px;
          line-height: 50px;
          border-radius: 5px;
          color: #ffffff;
        }
      }
    }
  }
</style>



































