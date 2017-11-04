<template>
  <div class="teamExperienceIndex">
    <div  class="title">
      <h2 v-cloak>{{title}}</h2>
    </div>
    <div class="teamExperienceContainer">
      <div class="personal-empty" v-if="reveal.empty">（您尚未有团队认证信息）</div>
      <ul>
        <li v-for="(item,index) in this.teamExperience" v-bind:class="{confirm:introduce[index]}">
          <p  v-cloak>{{item.teamName}}</p>
          <p  v-cloak v-on:click="togConfirm(index)">{{reveal.confirmText[index]}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Vue from "vue"
  import {mapState} from "vuex"
  export default {
    name:"teamExperienceIndex",
    data(){
      return {
        title:"团队经历",
        reveal:{
          "empty":true,
          confirmText:[]
        },
        introduce:[],//团队是否认证的状态
      }
    },
    computed:mapState({
      teamExperience:state=>state.personal.personalMessage.teamExperience
    }),
    updated(){
        //console.log(this.introduce)
    },
    mounted(){
      if(this.teamExperience.length!=0){
        Vue.set(this.reveal,"empty",false);//是否为空提示
        for(let i=0;i<this.teamExperience.length;i++){
          this.introduce[i]=this.teamExperience[i].info.introduce//同步数据到本地
          if(this.teamExperience[i].info.introduce){
            this.reveal.confirmText.push("取消认证");
          }else {
            this.reveal.confirmText.push("认证经历");
          }
        }
      }else{
        Vue.set(this.reveal,"empty",true);//是否为空提示
      }
    },
    methods:{
      togConfirm(index){
        Vue.set(this.introduce,[index],!this.introduce[index]);
        if(this.reveal.confirmText[index]=="认证经历"){
          Vue.set(this.reveal.confirmText,[index],"取消认证");
        }else{
          Vue.set(this.reveal.confirmText,[index],"认证经历");
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  $bfColor:#ffffff;
  $activeColor: #f27519;
  $borderColor:#ebebeb;
  $emptyColor:#9c9c9c;
  $themeColor:rgb(242,117,25);
  .teamExperienceIndex {
    width: 940px;
    float: left;
    padding: 0 40px;
    background: $bfColor;
    min-height: 671px;
    .title{
      padding:35px 0 0 0;
      font-size: 18px;
      color: $activeColor;
      border-bottom: 1px solid $borderColor;
      h2{
        float: left;
        padding-bottom: 8px;
        border-bottom: 2px solid $themeColor;
        margin-bottom: -1px;
      }
    }
    /*头部*/
    .personal-empty{
      width: 820px;
      padding: 35px 0 10px 0;
      font-size:16px;
      color: $emptyColor;
      text-align: center;
    }
    /*信息为空提示*/
    .teamExperienceContainer{
      ul{
        li{
          float: left;
          width:817px;
          margin-left:22px;
          border-bottom:1px solid $borderColor;
          font-size: 18px;
          p{
            float: left;
            padding-top:26px;
            padding-bottom:14px;
          }
          p:nth-child(2){
            cursor: pointer;
            float: right;
            padding-left:37px;
            background: url("../../../assets/img/personal/teamexperience/icon_ok.png") left 32px no-repeat;
          }
        }
        .confirm{
          color: $themeColor;
          p:first-child{
            padding-right: 25px;
            background: url("../../../assets/img/personal/teamexperience/icon_selected.png") right 32px no-repeat;
          }
          p:nth-child(2){
            background: url("../../../assets/img/personal/teamexperience/icon_cannel_large.png") left 30px no-repeat;
          }
        }
      }
    }
  }
</style>
