<template>
  <div class="loginIndex">
    <div id="modal-overlay">
      <div class="alert">
        <div :class="{loginContainer:!reveal.titleColor[2],personalLoginContainer:reveal.titleColor[2]}">
          <div class="loginLeft">
            <ul class="loginTitle" >
              <li v-for="(item,index) in titleText" @click="loginTog(index)">
                <p :class="{title:reveal.titleColor[index]}">{{item}}</p>
              </li>
            </ul>
            <div class="loginTab">
              <company-login v-if="reveal.titleColor[0]"></company-login>
              <team-login v-if="reveal.titleColor[1]"></team-login>
              <personal-login v-if="reveal.titleColor[2]"></personal-login>
            </div>
          </div>

          <div class="loginRight">
            <div>
              <p>没有账号</p>
              <p><router-link to="/register">立即注册>></router-link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from "vue"
  import ModalOpp from "../../../assets/js/modalOpp"
  import CompanyLogin from "./companyLongin.vue"
  import TeamLogin from "./teamLogin.vue"
  import PersonalLogin from "./personalLogin.vue"
  export default {
    name:"LoginIndex",
    components:{
      CompanyLogin,
      TeamLogin,
      PersonalLogin
    },
    data(){
      return {
        titleText:["公司登录","团队登录","个人登录"],
        reveal:{
          titleColor:[true,false,false]
        }
      }
    },
    mounted(){
      var modeal= new ModalOpp("#modal-overlay");
      modeal.makeText();
    },
    methods:{
      loginTog(index){
        for(var i=0;i<this.reveal.titleColor.length;i++){
          Vue.set(this.reveal.titleColor,[i],false)
        }
        Vue.set(this.reveal.titleColor,[index],true)
      }
    },
    destroyed(){
      var modeal= new ModalOpp("#modal-overlay");
      modeal.closeModal();
    }
  }
</script>
<style scoped lang="scss">
  $companyThemeColor:#2EB3CF;
  $teamThemeColor:#02a672;
  $personalThemeColor:rgb(242,117,25);
  .loginTitle{
    width:396px;
    padding-top:25px;
    font-size: 18px;
    overflow: hidden;
    li{
      float: left;
      p{
        padding:10px 29px;
        border-bottom: 1px solid #eaeaea;
        cursor: pointer;
      }
    }
    li:nth-child(1){
      .title{
        color: $companyThemeColor;
        border-bottom: 2px solid $companyThemeColor;
      }
    }
    li:nth-child(2){
      .title{
        color: $teamThemeColor;
        border-bottom: 2px solid $teamThemeColor;
      }
    }
    li:nth-child(3){
      .title{
        color: $personalThemeColor;
        border-bottom: 2px solid $personalThemeColor;
      }
    }
  }

  #modal-overlay{
    background: url("../../../assets/img/logoin/logoin.png")!important;
    background-size: cover;
    .alert{
      overflow: hidden;
      position:absolute;top:50%;left:50%;
      transform:translate(-50%,-50%);
      -webkit-transform:translate(-50%,-50%);
      -moz-transform:translate(-50%,-50%);
      -ms-transform:translate(-50%,-50%);
      -o-transform:translate(-50%,-50%);
      background: #FFFFFF;
      border-radius: 10px;
      text-align: center;
      font-size: 16px;
      .loginContainer{
        width: 579px;
        height:391px;
        overflow: hidden;
        margin:0 auto;
        .loginLeft{
          margin:0 auto;
          width:396px;
          height:100%;
          .loginTab{
            width:396px;
            padding-top:24px;
          }
        }
      }
      .personalLoginContainer{
        width: 725px;
        height:487px;
        .loginLeft{
          width:504px;
          height:100%;
          padding:0 54px;
          float: left;
          .loginTab{
            width:396px;
            padding-top:24px;
          }
        }
        .loginRight{
          margin-top:38px;
          float: left;
          width: 196px;
          height:400px;
          border-left:1px dashed #9c9c9c;
          position: relative;
          div{
            height:50px;
            position: absolute;
            margin:auto;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            p:nth-child(1){
              font-size: 14px;
              color: #aaaaaa;
            }
            p:nth-child(2){
              font-size: 18px;

              cursor: pointer;
              a{
                color: $personalThemeColor;
              }
            }
          }
        }
      }
    }
  }






















</style>
