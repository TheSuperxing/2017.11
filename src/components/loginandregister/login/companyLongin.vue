<template>
  <div class="companyLogin">
    <ul class="loginInput">
      <li>
        <input v-model="reveal.username" v-bind:value="reveal.username" type="text" placeholder="请输入您的邮箱">
      </li>
      <li>
        <input v-model="reveal.password" v-bind:value="reveal.password" type="password" placeholder="请输入您的密码">
      </li>
    </ul>
    <ul class="loginSubmit">
      <li>
        <button @click="companyLogin"><router-link to="">登录</router-link></button>
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
    components:{

    },
    data(){
      return{
        reveal:{
          //submit:false,//提交按钮是否可用
          //path:"",//页面跳转的路径
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

      var placeholder = 'placeholder' in document.createElement('input');
      console.log($("input").eq(1))
      if(!placeholder){
        Vue.set(this.reveal,"username","请输入您的邮箱")
        Vue.set(this.reveal,"password","请输入您的密码")
        $("input").eq(1).attr("type","text")
      }else {
        Vue.set(this.reveal,"username","")
        Vue.set(this.reveal,"password","")
      }
    },
    methods:{
      companyLogin(){
       var account = JSON.parse(sessionStorage.getItem("account"));
        if((this.reveal.username==account.username&&this.reveal.password==account.password)||(this.reveal.username=="root"&&this.reveal.password=="root")){
          Vue.set(this.reveal,"path","/index")
          location.hash="/index";
        }else if(this.reveal.username!=account.username&&this.reveal.username!="root"){
          alert("账号不存在")
        }else if(this.reveal.password!=account.password&&this.reveal.password!="root"){
          alert("密码错误")
        }
      }
    },
    destroyed(){
    	Vue.set(this.user,'userState',0)

      sessionStorage.setItem("state",this.user.userState)
//    sessionStorage.setItem("state",0)
    }
  }
</script>
<style scoped lang="scss">
  $companyThemeColor:#2EB3CF;
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
      overflow: hidden;
      button{
        width: 314px;
        height:50px;
        background: url("../../../assets/img/logoin/company.png") left center no-repeat;
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
        color: $companyThemeColor;
        cursor: pointer;
      }
      p:nth-child(1){
        float: left;
      }
      p:nth-child(2){
        float: right;
        a{
          color: $companyThemeColor;
        }
      }
    }
  }
</style>



































