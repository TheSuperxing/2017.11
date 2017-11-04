<template>
	<div class="overview">
		<div class="header-wrap">
			<img src="../../assets/img/company/icon_staff.png" />
			<span class="userName">{{personalMessage.baseInfo.petName}}</span>
		</div>
		<div class="info-content">
			<div class="workExpInfo">
				<h3 class="info-title">
					<span>工作经历</span>
				</h3>
				<ul class="info-wrap">
					<li class="stateNone" v-if="stateNone.workExperience">暂无信息</li>
					<li v-for="item in personalMessage.workExperience">
						<h5 class="">{{item.companyName}}</h5>
						<div class="t-p-wrap">
							<span>{{item.info.timeStart}}——{{item.info.timeEnd}}</span>
							<span>{{item.info.profession}}</span>
						</div>
						<div class="introduce">{{item.info.introduce}}</div>
					</li>
				</ul>
			</div>
			<div class="proInfo">
				<h3 class="info-title">
					<span>项目经历</span>
				</h3>
				<ul class="info-wrap">
					<li class="stateNone" v-if="stateNone.projectExperience">暂无信息</li>
					<li v-for="item in personalMessage.projectExperience">
						<h5 class="">{{item.projectName}}</h5>
						<div class="t-p-wrap">
							<span>{{item.info.timeStart}}——{{item.info.timeEnd}}</span>
							<span>{{item.info.profession}}</span>
						</div>
						<div class="introduce">{{
							item.info.introduce
						}}</div>
						<router-link :to="{name:'ProjectDetail',query:{id:'1'}}">查看更多>></router-link>
					</li>
				</ul>
			</div>
			<div class="teamInfo">
				<h3 class="info-title">
					<span>团队经历</span>
				</h3>
				<ul class="info-wrap">
					<li class="stateNone" v-if="stateNone.teamExperience">暂无信息</li>
					<li v-for="item in personalMessage.teamExperience">
						<h5 class="">{{item.teamName}}</h5>
						
					</li>
				</ul>
			</div>
			<div class="certificateInfo">
				<h3 class="info-title">
					<span>执业资格</span>
				</h3>
				<ul class="info-wrap">
					<li class="stateNone" v-if="stateNone.certificate">暂无信息</li>
					<li v-for="item in personalMessage.certificate">
						<h5 class="">{{item.certificateName}}</h5>
						<div class="introduce">{{item.info.profession}}</div>
						<div class="t-p-wrap">{{item.info.introduce}}</div>
					</li>
				</ul>
			</div>
			<div class="demandInfo">
				<h3 class="info-title">
					<span>我的需求</span>
				</h3>
				<ul class="info-wrap">
					<li class="stateNone" v-if="stateNone.demandInfo">暂无信息</li>
					
				</ul>
			</div>
			<div class="dealInfo">
				<h3 class="info-title">
					<span>我的协议</span>
				</h3>
				<ul class="info-wrap">
					<li class="stateNone" v-if="stateNone.dealInfo">暂无信息</li>
					
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from "vue"
	import {mapState} from "vuex"
	export default{
		name:"overview",
		data:function(){
			return{
				overviewInfo:"",
				stateNone:{workExperience:false,projectExperience:false,teamExperience:false,certificate:false,demandInfo:true,dealInfo:true},
//				personalMessage:"",
			}
		},
		computed:mapState({
		  personalMessage:state=>state.personal.personalMessage,
		  /*获取数据*/
		}),
		mounted(){
			if(this.personalMessage.workExperience.length==0){
				this.stateNone.workExperience=true;
			}
			if(this.personalMessage.projectExperience.length==0){
				this.stateNone.projectExperience=true;
			}
			if(this.personalMessage.teamExperience.length==0){
				this.stateNone.projectExperience=true;
			}
			if(this.personalMessage.certificate.length==0){
				this.stateNone.projectExperience=true;
			}
//			if(this.personalMessage.teamExperience.length==0){
//				this.stateNone.projectExperience=true;
//			}
//			if(this.personalMessage.teamExperience.length==0){
//				this.stateNone.projectExperience=true;
//			}
			console.log(this.stateNone)
		}
		
	}
</script>

<style lang="scss" scoped="scoped">
 $themeColor:rgb(242,117,25);

.overview{
	padding: 40px;
	background: #FFFFFF;
	.header-wrap{
		padding-bottom:30px;
		border-bottom:1px solid #E0E0E0;
		
		img{
			margin-right: 20px;
		}
		.userName{
			font-size: 24px;
			color: $themeColor;
		}
	}
	.info-content{
		margin-top: 20px;
		.info-title{
			height: 50px;
			line-height: 50px;
			text-align: left;
			border-bottom: 1px solid #E0E0E0;
			span{
				display: inline-block;
				height: 50px;
				line-height: 50px;
				font-size: 18px;
				color: $themeColor;
				border-bottom: 2px solid $themeColor;
			}
		}
		.stateNone{
			height: 50px; line-height: 50px;
			text-align: center;
			color: #999999;
			margin: 0; padding: 0;
		}
		.workExpInfo,.proInfo,.certificateInfo{
			.info-wrap{
				padding: 20px;
				
				li{
					padding-bottom:20px;
					border-bottom: 1px solid #E0E0E0;
					margin-bottom: 20px;
					&:last-child{
						border: none;
					margin-bottom: 0;
					}
					h5{
						height: 40px;
						line-height: 40px;
						color: $themeColor;
						font-size: 18px;
					}
					.t-p-wrap{
						height: 40px;
						line-height: 40px;
						span{
							display: inline-block;
							float: left;
							&:first-child{
								margin-right: 300px;
							}
						}
					}
					.introduce{
						text-align: justify;
						line-height: 24px;
						color: #666666;
					}
					a{
						display: block;
						color: $themeColor;
						margin-top: 20px;
					}
				}
			}
		}
		.teamInfo{
			
			.info-wrap{
				padding: 20px;
				li{
					height: 50px;
					line-height: 50px;
					text-align: left;
					border-bottom:1px solid #E0E0E0 ;
					font-size: 18px;
					&:last-child{
						border: none;
					}
				}
			}
		}
	}
}
</style>