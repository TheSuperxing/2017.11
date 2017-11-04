<template>
  <div class="teamIndex">
    <div class="teamMessage">
      <div class="m-logo"><img src="../../assets/img/team/icon_green_team.png"/></div>
      <div class="m-warp">
        <h1 class="teamName">{{teamMessage.basicInfo.teamName}}</h1>
        
      </div>
    </div>
    <div class="teamProfile">
      <h3 class="t-title"><span>团队简介</span></h3>
      <div v-if="stateOne.haveTeamDesc" class="content-wrap">{{teamMessage.basicInfo.teamDesc}}</div>
      <div v-if="!stateOne.haveTeamDesc" class="stateOne">（此处暂无详细信息）</div>
    </div>
    <div class="teamMail">
      <h3 class="t-title"><span>联系方式</span></h3>
      <div v-if="stateOne.haveTeamMail" class="content-wrap">{{teamMessage.accountInfo.teamMail}}</div>
      <div v-if="!stateOne.haveTeamMail" class="stateOne">（此处暂无详细信息）</div>
    </div>
    <div class="teamCompany">
      <h3 class="t-title"><span>所属公司</span></h3>
      <ul v-if="stateOne.haveCompany" class="content-wrap">
      	<li v-for="item in teamMessage.teamOrgaInfo.company">
      		{{item.companyName}}
      	</li>
      </ul>
      <div v-if="!stateOne.haveCompany" class="stateOne">（此处暂无详细信息）</div>
    </div>
    <div class="teamTeam">
      <h3 class="t-title"><span>管理团队</span></h3>
      <div class="seniorTable" v-if="stateOne.haveSenior" >
      	<dl v-for="(item,index) in teamMessage.teamOrgaInfo.senior" class="seniorList">
      		<dt>
      			<img src="../../assets/img/team/icon_green_person.png" v-if="teamMessage.teamOrgaInfo.senior[index].cerState"/>
      			<img src="../../assets/img/team/icon_gray_person.png" v-if="!teamMessage.teamOrgaInfo.senior[index].cerState"/>
      		</dt>
      		<dd>{{item.dealId}}</dd>
      	</dl>
      </div>
      <div v-if="!stateOne.haveSenior" class="stateOne">（此处暂无详细信息）</div>
    </div>
    <div class="cadreman">
      <h3 class="t-title"><span>重要骨干</span></h3>
      <div class="backBoneTable" v-if="stateOne.haveBackbone" >
      	<dl v-for="(item,index) in teamMessage.teamOrgaInfo.backbone" class="backboneList">
      		<dt>
      			<img src="../../assets/img/team/icon_green_person.png" v-if="teamMessage.teamOrgaInfo.backbone[index].cerState"/>
      			<img src="../../assets/img/team/icon_gray_person.png"  v-if="!teamMessage.teamOrgaInfo.backbone[index].cerState"/>
      		</dt>
      		<dd>{{item.dealId}}</dd>
      	</dl>
      </div>
      <div v-if="!stateOne.haveBackbone" class="stateOne">（此处暂无详细信息）</div>
    </div>
    <div class="teamShow">
      <h3 class="t-title"><span>项目展示</span></h3>
      <!--<div>
      	<h4 class="projectName">北京08年奥运会——水立方</h4>
      	<h5 class="pr-wrap-a">
      		<span class="completeTime">Time : 2006.7-2008.8</span>
      		<span class="takeOfficeBar">项目责任：<em class="takeOffice">建筑设计</em></span>
      	</h5>

      	<p class="pr-wrap-b">等会我佛教法兰斯热人体褪法国红酒看了下橙我的过去我热热天气挖到了收付款啦等会我佛教法兰斯热人体褪法国红酒看了下橙我的过去我热热天气挖到了收付款啦
      	等会我佛教法兰斯热人体褪法国红酒看了下橙我的过去我热热天气挖到了收付款啦
      	等会我佛教法兰斯热人体褪法国红酒看了下橙我的过去我热热天气挖到了收付款啦
      	等会我佛教法兰斯热人体褪法国红酒看了下橙我的过去我热热天气挖到了收付款啦</p>

      </div>-->
      <div v-for="item in teamMessage.teamProInfo" class="projectTable"  v-if="stateOne.haveProject">
      	<h4 class="projectName">{{item.proName}}</h4>
      		<h5 class="pr-wrap-a">
			  		<span class="completeTime">Time : {{item.parTakeTime_S}}——{{item.parTakeTime_E}}</span>
			  		<span class="takeOfficeBar">项目责任：<em class="takeOffice">建筑设计</em></span>
			  	</h5>
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
    name:"teamIndex",
    data:function(){
      return {
        msg:"团队主页",
        teamLicense:require("../../assets/img/team/certificate01.png"),
        teamApitute:require("../../assets/img/team/certificate02.png"),
        cerState:{
       		senior:[],
       		backbone:[],
       		staff:[]
       	},
       	stateOne:{ /**/
       		haveAddress:true,/*判断有无公司地址*/
       		haveTeamDesc:true,/*有无团队介绍*/
       		haveTeamMail:true,/*团队联系方式*/
       		haveCompany:true,/*有无所属公司*/
       		haveSenior:true,/*有无管理人员*/
       		haveBackbone:true,/*有无骨干*/
       		haveProject:true,/*有无项目展示*/
       		
       	},
      }
    },
    computed:mapState({
    	teamMessage:state=>state.team.teamMessage
    }),
    mounted(){
    	if(this.teamMessage.basicInfo.teamAddress.replace(/(^\s*)|(\s*$)/g, "").length===0){
    		this.stateOne.haveAddress = false;
    	}
    	if(this.teamMessage.basicInfo.teamDesc.replace(/(^\s*)|(\s*$)/g, "").length===0){
    		this.stateOne.haveTeamDesc=false;
//  		console.log(1)
    	}
    	if(this.teamMessage.accountInfo.teamMail.replace(/(^\s*)|(\s*$)/g, "").length===0){
    		this.stateOne.haveTeamMail=false;
//  		console.log(2)
    	}
    	if(this.teamMessage.teamOrgaInfo.company.length===0){
    		this.stateOne.haveCompany=false;
//  		console.log(3)
    	}
    	if(this.teamMessage.teamOrgaInfo.senior.length===0){
    		this.stateOne.haveSenior = false;
//  		console.log(4)
    	}
    	if(this.teamMessage.teamOrgaInfo.backbone.length===0){
    		this.stateOne.haveBackbone = false;
//  		console.log(5)
    	}
    	if(this.teamMessage.teamProInfo.length === 0){
    		this.stateOne.haveProject = false;
    	}
//  	console.log(this.stateOne);
//  	console.log(this.teamMessage)
    },
    updated(){
    	if(this.teamMessage.basicInfo.teamDesc.replace(/(^\s*)|(\s*$)/g, "").length===0){
    		this.stateOne.haveTeamDesc=false;
    	}else if(this.teamMessage.accountInfo.teamMail.replace(/(^\s*)|(\s*$)/g, "").length===0){
    		this.stateOne.haveTeamMail=false;
    	}else if(this.teamMessage.teamOrgaInfo.company.length===0){
    		this.stateOne.haveCompany=false;
    	}else if(this.teamMessage.teamOrgaInfo.senior.length===0){
    		this.stateOne.haveSenior = false;
    	}else if(this.teamMessage.teamOrgaInfo.backbone.length===0){
    		this.stateOne.haveBackbone = false;
    	}else if(this.teamMessage.teamProInfo.length === 0){
    		this.stateOne.haveProject = false;
    	}
    }
  }
</script>
<style lang="scss" scoped="">
$bfColor:#f7f9fc;
$activeColor:#02a672;
	.teamIndex{
		.stateOne{
			font-size: 18px;
			color: #a7a7a7;
			height: 118px;
			line-height: 118px;
			text-align: center;
		}
		
		.teamProfile{
			 margin-top:70px;
			  .content-wrap{
			  	padding: 20px 20px;
			    font-size: 14px;
			    color:#353535;
			    font-family: 'Microsoft Yahei';
					text-align: justify;
			  }
		 	
		}
		.teamMail{
			.content-wrap{
		  	padding: 20px 20px;
		    font-size: 14px;
		    color:#353535;
		    font-family: 'Microsoft Yahei';
				text-align: justify;
		  }
		}
		.teamCompany{
			.content-wrap{
		  	padding: 20px 20px;
		    font-size: 14px;
		    color:#353535;
		    font-family: 'Microsoft Yahei';
				text-align: justify;
		  }
		}
	  .teamTeam{
	  	
	  	.seniorTable{
	  		overflow: hidden;
	  		padding: 30px;
	  		.seniorList{
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
		  	.seniorList{
		  		margin-bottom: 30px;
		  		dt{
		  			width: 100px;
		  			height: 100px;
		  			border-radius: 50%;
		  			background: #e6e6e6;
		  			position: relative;
		  			img{
		  				position:absolute;top:50%;left:50%; 
						 transform:translate(-50%,-50%);
						 -webkit-transform:translate(-50%,-50%);
						-moz-transform:translate(-50%,-50%);
						-ms-transform:translate(-50%,-50%);
						-o-transform:translate(-50%,-50%);
		  			}
		  		}
		  	}
		  	
	  	}
	  	
	 	
	  }
	  .cadreman{
	  	.backBoneTable{
	  		overflow: hidden;
	  		padding: 30px;
	  		.backboneList{
		  		float: left;
		  		text-align: center;
		  		margin-right: 30px;
		  		margin-bottom: 30px;
		  		dt{
		  			width: 80px;
		  			height: 80px;
		  			border-radius: 50%;
		  			background: #e6e6e6;
		  			position: relative;
		  			overflow: hidden;
		  			img{
		  				position:absolute;top:50%;left:50%; 
						 transform:translate(-50%,-50%);
						 -webkit-transform:translate(-50%,-50%);
						-moz-transform:translate(-50%,-50%);
						-ms-transform:translate(-50%,-50%);
						-o-transform:translate(-50%,-50%);
		  			}
		  		}
		  		dd{
		  			margin-top:15px;
		  		}
		  	}
		  	
	  	}
	  }
	  .teamShow{
      .projectTable{
        padding: 30px 20px;
        .projectName{
            font-size: 18px;
            font-family: "microsoft yahei";
            color: $activeColor;
            font-weight: bold;
            line-height: 18px;

        }
        .pr-wrap-a{
            height: 18px;
            line-height: 18px;
            font-size: 18px;
            font-family: "microsoft yahei";
            line-height: 18px;
            margin: 20px 0;
            
            .completeTime{
                font-size: 18px;
                font-family: "microsoft yahei";
                float: left;
            }
            .takeOfficeBar{
                font-size: 18px;
                font-family: "microsoft yahei";
                float: right;
            }
        }
				.more{
					display: inline-block;
					color: $activeColor;
					margin: 20px 0;
					cursor: pointer;
				}

      }

    }
	}
 

















</style>
