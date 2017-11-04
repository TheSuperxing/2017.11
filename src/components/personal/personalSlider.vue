<template>
  <div class="personalSlider">
    <ul class="sliderNavList">

      <li v-for="(item,$index) in pics">
        <router-link :to="item.route">
          <div class="personalSliderBorder">
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
//import "../../assets/js/units/sliderUpdatedColor"
  export default{
    data:function(){
      return{
        transitionName: 'slide-left',
        pics:[
          {text:"个人主页",pic2:require("../../assets/img/personal/siderbar/individual.png"),pic1:require("../../assets/img/personal/siderbar/individual.gray.png"),route:"/yhzx/personal/info/personalIndex"},
          {text:"基础信息",pic1:require("../../assets/img/personal/siderbar/massage.gray.png"),pic2:require("../../assets/img/personal/siderbar/massage.png"),route:"/yhzx/personal/info/basicInfo"},
          {text:"教育背景",pic1:require("../../assets/img/personal/siderbar/education.gray.png"),pic2:require("../../assets/img/personal/siderbar/education.png"),route:"/yhzx/personal/info/educationIndex"},
          {text:"工作经历",pic1:require("../../assets/img/personal/siderbar/we.gray.png"),pic2:require("../../assets/img/personal/siderbar/we.png"),route:"/yhzx/personal/info/workExperienceIndex"},
          {text:"项目经历",pic1:require("../../assets/img/personal/siderbar/project.gray.png"),pic2:require("../../assets/img/personal/siderbar/project.png"),route:"/yhzx/personal/info/projectExperienceIndex"},
          {text:"团队经历",pic1:require("../../assets/img/personal/siderbar/team.gray.png"),pic2:require("../../assets/img/personal/siderbar/team.png"),route:"/yhzx/personal/info/teamExperienceIndex"},
          {text:"执业资格",pic1:require("../../assets/img/personal/siderbar/qualification.gray.png"),pic2:require("../../assets/img/personal/siderbar/qualification.png"),route:"/yhzx/personal/info/certificateIndex"},
          {text:"职称信息",pic1:require("../../assets/img/personal/siderbar/professional.gray.png"),pic2:require("../../assets/img/personal/siderbar/professional.png"),route:"/yhzx/personal/info/jobInfoIndex"},
          {text:"所获奖励",pic1:require("../../assets/img/personal/siderbar/reward.gray.png"),pic2:require("../../assets/img/personal/siderbar/reward.png"),route:"/yhzx/personal/info/awardIndex"},
          {text:"论文专利",pic1:require("../../assets/img/personal/siderbar/thesis.gray.png"),pic2:require("../../assets/img/personal/siderbar/thesis.png"),route:"/yhzx/personal/info/paperAndPatentIndex"},
          {text:"语言软件",pic1:require("../../assets/img/personal/siderbar/language.gray.png"),pic2:require("../../assets/img/personal/siderbar/language.png"),route:"/yhzx/personal/info/languageAndSoftwareIndex"},
        ]
      }
    },
    mounted(){
      $(".sliderNavList .router-link-active").parent("li").addClass("selected");
    }
  }
</script>
<style scoped="" lang="scss">
  $activeColor: rgb(242,117,25);
  $bfColor:#ffffff;
  .personalSlider{
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
          .personalSliderBorder{
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
          color:$activeColor;
          .personalSliderBorder{
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
