<template>
  <div class="teamSlider">
    <ul class="sliderNavList">

      <li v-for="(item,$index) in pics" @click="changeColor(item,$index)">
        <router-link :to="item.route">
          <div class="teamSliderBorder">
            <div>
              <img :src="item.pic1"/>
              <img :src="item.pic2"/>
            </div>
            <p>{{item.text}}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default{
    data:function(){
      return{
        transitionName: 'slide-left',
        pics:[
          {text:"团队主页",pic2:require("../../assets/img/team/sidebar/home-green.png"),pic1:require("../../assets/img/team/sidebar/home-gray.png"),route:"/yhzx/team/info/teamIndex"},
          {text:"团队账号信息",pic1:require("../../assets/img/team/sidebar/account-gray.png"),pic2:require("../../assets/img/team/sidebar/account-green.png"),route:"/yhzx/team/info/teamAccount"},
          {text:"团队基本信息",pic1:require("../../assets/img/team/sidebar/info-gray.png"),pic2:require("../../assets/img/team/sidebar/info-green.png"),route:"/yhzx/team/info/teamInfo"},
          {text:"团队组织信息",pic1:require("../../assets/img/team/sidebar/organiz-gray.png"),pic2:require("../../assets/img/team/sidebar/organiz-green.png"),route:"/yhzx/team/info/teamOrganiz"},
          {text:"团队项目信息",pic1:require("../../assets/img/team/sidebar/pro-gray.png"),pic2:require("../../assets/img/team/sidebar/pro-green.png"),route:"/yhzx/team/info/teamProject"},
        ]
      }

    },
    methods:{
      changeColor(item,index){
//      var sideBarTogImg=sessionStorage.getItem("sideBarTogImg").split(",");
        //获取sessionStorage
//      for(var i = 0 ; i< sideBarTogImg.length;i++){
//        sideBarTogImg[i]=0;
//      }
//      sideBarTogImg[index]=1;
//      sessionStorage.setItem("sideBarTogImg",sideBarTogImg);
        //更新sessionStorag
//      $(".sliderNavList li").removeClass("selected");
        //添加类名前的初始化
//      $(".sliderNavList li").eq(index).addClass("selected");
        //对当前点击元素添加类名


      }
    },
  }
</script>
<style scoped="" lang="scss">
  $bfColor:#ffffff;
  $activeColor:#02a672;
  .teamSlider{
    width:240px;
    background:$bfColor;
    float:left;
    margin-left:20px;
    border-radius:5px;

    overflow:hidden;

    .sliderNavList{
      width:240px;
      //    height:370px;
      li{
        width:240px;
        height: 61px;
        a{
          width: 240px;
  //      height: 52px;
          color: #353535;

          display: inline-block;

          &.router-link-active{
              color:$activeColor;
          }
          .teamSliderBorder{
              width: 240px;
              height: 61px;
              padding-top: 20px;
              padding-bottom: 20px;
              padding-left: 42px;
              font-size: 14px;
              border-left:2px solid $bfColor;

              div{
                float: left;
                position: relative;
  //            top:18px;
                width:21px;
                height:21px;
                z-index: 0;
                img{
                  position: absolute;
                  top: 0;
                  left:0;
                  z-index: 0;
                }
                  img:nth-child(1){
                    display: block;
                  }
                  img:nth-child(2){
                    display: none;
                  }
              }
              p{
                float: left;
  //            line-height: 52px;
                padding-left: 18px;
              }
          }
        }
      }
      a.router-link-active{
          .teamSliderBorder{
            border-left:2px solid $activeColor;
            img:nth-child(1){
              display: none;
            }
            img:nth-child(2){
              display: block;
            }
          }
        }
    }
  }
</style>
