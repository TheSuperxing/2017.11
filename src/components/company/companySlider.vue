<template>
  <div class="companySlider">
      <ul class="sliderNavList">

        <li v-for="(item,$index) in pics" @click="changeColor(item,$index)">
        	<router-link :to="item.route">
        		<div class="companySliderBorder">
              <div>
                <img :src="item.pic1"/>
                <img :src="item.pic2"/>
              </div>
              <p>{{item.text}}</p>
            </div>
        	</router-link></li>
      </ul>
    <p style="clear: both"></p>
  </div>

</template>
<script>
	import Vue from 'vue'
	export default{
		data:function(){
			return{
        transitionName: 'slide-left',
				pics:[
					{text:"公司主页",pic2:require("../../assets/img/sidebar/home-bule.png"),pic1:require("../../assets/img/sidebar/home-gray.png"),route:"/yhzx/company/info/companyIndex"},
					{text:"公司账号信息",pic1:require("../../assets/img/sidebar/man-gray.png"),pic2:require("../../assets/img/sidebar/man-blue.png"),route:"/yhzx/company/info/companyAccount"},
					{text:"公司基本信息",pic1:require("../../assets/img/sidebar/text-gray.png"),pic2:require("../../assets/img/sidebar/text-blue.png"),route:"/yhzx/company/info/companyInfo"},
					{text:"公司认证信息",pic1:require("../../assets/img/sidebar/authentication-gray.png"),pic2:require("../../assets/img/sidebar/authentication-blue.png"),route:"/yhzx/company/info/companyConfirm"},
					{text:"公司组织信息",pic1:require("../../assets/img/sidebar/organization-grey.png"),pic2:require("../../assets/img/sidebar/organization-blue.png"),route:"/yhzx/company/info/companyOrganiz"},
					{text:"公司项目信息",pic1:require("../../assets/img/sidebar/project-gray.png"),pic2:require("../../assets/img/sidebar/project-blue.png"),route:"/yhzx/company/info/companyProject"},
          {text:"公司团队信息",pic1:require("../../assets/img/sidebar/team-gray.png"),pic2:require("../../assets/img/sidebar/team-blue.png"),route:"/yhzx/company/info/companyTeam"},
				]
			}

		},
		methods:{
			changeColor(item,index){
//				var sideBarTogImg=sessionStorage.getItem("sideBarTogImg").split(",");
				//获取sessionStorage
//      for(var i = 0 ; i< sideBarTogImg.length;i++){
//        sideBarTogImg[i]=0;
//      }
//      sideBarTogImg[index]=1;
//      sessionStorage.setItem("sideBarTogImg",sideBarTogImg);
        //更新sessionStorag
//      $(".sliderNavList li a").removeClass("router-link-active");
        //添加类名前的初始化
//      $(".sliderNavList li a").eq(index).addClass("router-link-active");
        //对当前点击元素添加类名


			}
		},
	}
</script>
<style scoped="" lang="scss">
  $activeColor: #2eb3cf;
  $bfColor:#ffffff;
  .companySlider{
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
          .companySliderBorder{
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
      /*.selected{*/
        a.router-link-active{
          .companySliderBorder{
            border-left:2px solid #2eb3cf;
            img:nth-child(1){
              display: none;
            }
            img:nth-child(2){
              display: block;
            }
          }
        }
      /*}*/
    }
  }
</style>
