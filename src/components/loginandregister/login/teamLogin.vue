<template>
  <div class="companyLogin">
    <ul class="loginInput">
      <li>
        <input v-model="reveal.username" type="text" placeholder="请输入您的邮箱">
      </li>
      <li>
        <input v-model="reveal.password" type="text" placeholder="请输入您的密码">
      </li>
    </ul>
    <ul class="loginSubmit">
      <li>
        <button @click="teamLogin"><router-link to="">登录</router-link></button>
      </li>
      <li>
        <p>忘记密码？</p>
        <p><router-link to="/register">立即注册>></router-link></p>
      </li>
    </ul>
  </div>
</template>
<script>
	import Vue from "vue";
  	import {mapState} from "vuex"
  export default {
    name:"companyLogin",
    data(){
      return{
        reveal:{
          username:"",//用户名
          password:""//密码
        }
      }
    },
    computed:mapState({
      user:state=>state.userState.user
    }),
    mounted(){
      sessionStorage.setItem("account","{\"username\":\"123@qq.com\",\"password\":\"123\"}")
    },
    methods:{
      teamLogin(){
        var account = JSON.parse(sessionStorage.getItem("account"));
        if((this.reveal.username==account.username&&this.reveal.password==account.password)||(this.reveal.username=="root"&&this.reveal.password=="root")){
          location.hash="/index";
        }else if(this.reveal.username!=account.username&&this.reveal.username!="root"){
          alert("账号不存在")
        }else if(this.reveal.password!=account.password&&this.reveal.password!="root"){
          alert("密码错误")
        }
      }
    },
    destroyed(){
    	Vue.set(this.user,'userState',1)

      sessionStorage.setItem("state",this.user.userState)
//    sessionStorage.setItem("state",1)
    }
  }
</script>
<style scoped lang="scss">
  $teamThemeColor:#02a672;
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
  }
  .loginSubmit{
    margin-top:40px;
    li{
      width: 314px;
      margin:20px auto;
      button{
        width: 314px;
        height:50px;
        background: url("../../../assets/img/logoin/icon_green_sendagain.png") left center no-repeat;
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
      p{
        color: $teamThemeColor;
        cursor: pointer;
      }
      p:nth-child(1){
        float: left;
      }
      p:nth-child(2){
        float: right;
        a{
          color: $teamThemeColor;
        }
      }
    }
  }
</style>



































