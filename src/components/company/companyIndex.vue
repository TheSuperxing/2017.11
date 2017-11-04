<template>
  <div class="companyIndex">
    <div class="companyMessage">
      <div class="m-logo">
      	<img src="../../assets/img/company/logo.png" />
      </div>
      <div class="m-warp">
        <h1 class="companyName">{{companyMessage.basicInfo.companyName}}</h1>
        <p class="companyAddress" v-if="stateOne.haveAddress">{{companyMessage.basicInfo.companyAddress}}</p>
        <p v-if="!stateOne.haveAddress" class="">(暂未填写公司地址)</p>
      </div>
    </div>
    <div class="companyProfile">
      <h3 class="c-title"><span>公司简介</span></h3>
      <div class="content-wrap" v-if="stateOne.haveCompanyDesc">{{companyMessage.basicInfo.companyDesc}}</div>
      <div v-if="!stateOne.haveCompanyDesc" class="stateOne">（此处暂无详细信息）</div>
    </div>
    <div class="companyLicense">
      <h3 class="c-title"><span>公司证照</span></h3>
      <ul>
      	<li><img :src="companyLicense"/></li>
      </ul>
      <div v-if="false" class="stateOne">（此处暂无详细信息）</div>
    </div>
    <div class="companyApitute">
      <h3 class="c-title"><span>公司资质</span></h3>
      <ul>
      	<li><img :src="companyApitute"/></li>
      </ul>
      <div v-if="false" class="stateOne">（此处暂无详细信息）</div>
    </div>
    <div class="companyTm">
      <h3 class="c-title"><span>高管团队</span></h3>
      <div class="seniorTable" v-if="stateOne.haveSenior">
      	<dl v-for="item in companyMessage.companyOrgaInfo.senior" class="seniorList">
      		<dt><img src="../../assets/img/company/icon_senior.png" /></dt>
      		<dd>{{item.dealId}}</dd>
      	</dl>
      </div>
      <div v-if="!stateOne.haveSenior" class="stateOne">（此处暂无详细信息）</div>
    </div>
    <div class="cadreman">
      <h3 class="c-title"><span>重要骨干</span></h3>
      <div class="backBoneTable" v-if="stateOne.haveBackbone">
      	<dl v-for="item in companyMessage.companyOrgaInfo.backbone" class="backboneList">
      		<dt><img src="../../assets/img/company/icon_senior.png" /></dt>
      		<dd>{{item.dealId}}</dd>
      	</dl>
      </div>
      <div v-if="!stateOne.haveBackbone" class="stateOne">（此处暂无详细信息）</div>
    </div>
    <div class="companyShow">
      <h3 class="c-title"><span>项目展示</span></h3>
        <div v-for="item in companyMessage.companyProInfo" class="projectTable" v-if="stateOne.haveProject">
      	<h4 class="projectName">{{item.proName}}</h4>
      		<div class="pr-wrap-a">
			  		<span class="completeTime">Time : {{item.parTakeTime_S}}——{{item.parTakeTime_E}}</span>
			  		<span class="takeOfficeBar">项目责任：<em class="takeOffice">建筑设计</em></span>
			  	</div>
			  	<p class="pr-wrap-b">{{item.detailDes}}</p>
			  	<router-link :to="{name:'ProjectDetail',query:{id:item.id}}">
			  		<span class="more">查看详情>></span>
			  	</router-link>
			  	
      </div>
      <div v-if="!stateOne.haveProject" class="stateOne">（此处暂无详细信息）</div>
    </div>
  </div>

</template>
<script>
	import {mapState} from "vuex"
  export default {
    name:"companyIndex",
    data:function(){
      return {
        msg:"公司主页",
        companyLicense:require("../../assets/img/company/certificate01.png"),
        companyApitute:require("../../assets/img/company/certificate02.png"),
        stateOne:{
        	haveAddress:true,/*判断有无公司地址*/
        	haveCompanyDesc:true,/*有无公司介绍*/
        	haveLicense:true,/*有无证照*/
        	haveApitute:true,/*有无资质证件*/
        	haveSenior:true,/*有无高管*/
        	haveBackbone:true,/*有无骨干*/
        	haveProject:true,/*有无项目*/
        	
        }
      }
    },
    computed:mapState({
    	companyMessage:state=>state.company.companyMessage
    }),
    mounted(){
    	if(this.companyMessage.basicInfo.companyAddress.replace(/(^\s*)|(\s*$)/g, "").length===0){
    		this.stateOne.haveAddress = false;
    	}
    	if(this.companyMessage.basicInfo.companyDesc.replace(/(^\s*)|(\s*$)/g, "").length===0){
    		this.stateOne.haveCompanyDesc=false;
    		console.log(1)
    	}

    	if(this.companyMessage.companyOrgaInfo.senior.length===0){
    		this.stateOne.haveSenior = false;
    		console.log(4)
    	}
    	if(this.companyMessage.companyOrgaInfo.backbone.length===0){
    		this.stateOne.haveBackbone = false;
    		console.log(5)
    	}
    	if(this.companyMessage.companyProInfo.length === 0){
    		this.stateOne.haveProject = false;
    	}
    	
    	console.log(this.companyMessage);
    	
    }
  }
</script>
<style lang="scss" scoped="">
$bfColor:#ffffff;
$activeColor: #2eb3cf;
	.companyIndex{
		.stateOne{
			font-size: 18px;
			color: #a7a7a7;
			height: 118px;
			line-height: 118px;
			text-align: center;
		}
		.companyLicense,.companyApitute{
			ul{
				padding: 30px 20px;
			}
		}
		.companyProfile{
		 	text-align: justify;
		 }
	  .companyTm{
	  	
	  	.seniorTable{
	  		overflow: hidden;
	  		padding:30px 20px;
	  		.seniorList,.backboneList{
		  		float: left;
		  		text-align: center;
		  		margin-right: 30px;
		  		dt{
		  			overflow: hidden;
		  		}
		  		dd{
		  			margin-top:15px;
		  		}
		  	}
	  	}
	  	
	 	
	  }
	  .cadreman{
	  	.backBoneTable{
	  		overflow: hidden;
	  		padding:30px 20px;
	  		.backboneList{
		  		float: left;
		  		text-align: center;
		  		margin-right: 30px;
		  		dt{
		  			overflow: hidden;
		  		}
		  		dd{
		  			margin-top:15px;
		  		}
		  	}
	  	}
	  }
	  .companyShow{
	  	.projectTable{
	  		padding: 30px 20px;
	  		.more{
	  			
	  			display: inline-block;
	  			color: $activeColor;
	  			margin-top: 15px;
	  			cursor: pointer;
	  		}
	  	}
	  }
	}
 

















</style>
