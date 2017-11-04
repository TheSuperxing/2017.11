<template>
	<div class="applicationDetail">
		<div class="title-wrap">
			<h3 class="D-title">{{detailInfo.name}}
				<span class="cancelBtn">
					<img src="../../../assets/img/demand/icon59.png" />
					<img src="../../../assets/img/demand/icon59.png" />
					取消收藏
				</span>
				
				<div class="auditStatus" v-if="auditStatusShow">{{auditStatusTxt}}</div>
				
			</h3>
			<p class="time-wrap">发布时间：{{detailInfo.complateTime}}</p>
			
		</div>
		<div class="info-wrap">
			<h5 class="info-title">
				<span>我的需求</span>
				<em v-bind:class="{up:updownFlag,down:!updownFlag}" @click="upDwon">{{updownText}}</em>
				
			</h5>
			<div class="detail-wrap">
				<ul>
					<li>
						<div class="wrap-left">需求描述</div>
						<p>{{detailInfo.describe}}</p>
						<p v-if="!haveValue.describe">暂无信息</p>
					</li>
					<li>
						<div class="wrap-left">完成时间</div>
						<p>{{detailInfo.complateTime}}</p>
						<p v-if="!haveValue.complateTime">暂无信息</p>
					</li>
					<li>
						<div class="wrap-left">需求对象</div>
						<p>
							<em v-for="item in detailInfo.demandObj">{{item}}</em>
						</p>
						<p v-if="!haveValue.demandObj">暂无信息</p>
					</li>
					<li> 
						<div class="wrap-left">对象要求</div>
						<p>{{detailInfo.objRequire}}</p>
						<p v-if="!haveValue.objRequire">暂无信息</p>
					</li>
					<li>
						<div class="wrap-left">需求酬劳</div>
						<p>{{detailInfo.reword}}</p>
						<p v-if="!haveValue.reword">暂无信息</p>
					</li>
					<li>
						<div class="wrap-left">备注信息</div>
						<p>{{detailInfo.remark}}</p>
						<p v-if="!haveValue.remark">暂无信息</p>
					</li>
					
				</ul>
				<div class="meng" v-if="mengShow"></div>
			</div>
			<div class="applicant-wrap">
				<h5 class="A-title">申请方</h5>
				<div class="content-applicant">
					<p class="stateNone" v-if="!haveCooper">( 暂无申请方 )</p>
					<dl v-for="(item,index) in detailInfo.applicant">
						<dd><img src="../../../assets/img/demand/icon003.png"/></dd>
						<dt>
							<p>{{item.name}}</p>
							<span v-if="item.coIntention" class="alreadySent">
								{{intentionTxt}}
							</span>
							<span v-if="operate[index]" @click="returnIntention()" class="notyetSent">{{myOperate}}</span>
						</dt>
					</dl>
				</div>
				<div id="modal-overlay" class="confirmWithdraw">
					<div class="detail-wrap">
						<h5></h5>
						<span class="modalChaBtn" @click="closeModal()"></span>
						<p>确认撤回对该需求的申请吗？</p>
						
						<div class="confirmBtn" @click="cfmWithdraw()">
							确认撤回
						</div>
					</div>
				</div>
				<div id="modal-overlay" class="confirmReturn">
					<div class="detail-wrap">
						<h5></h5>
						<span class="modalChaBtn" @click="closeModal()"></span>
						<p>是否退回对发布方的合作意向</p>
						<div class="confirmBtn" @click="cfmReturn()">
							确认退回
						</div>
					</div>
				</div>
			</div>
			
			<div class="relatedDeal-wrap">
				<h5 class="A-title">关联协议</h5>
				<ul class="content-relatedDeal">
					<li class="noDeal" v-if="!haveDeal">暂无关联协议</p>
					<li v-for="(item,index) in detailInfo.relatedDeal">
						与{{item.name}}签订的协议
						<span class="cancleDeal" @click="cancelDeal(index)">取消协议</span>
						<span class="dealState" v-bind:class="{valid:item.valid,unvalid:!item.valid}">{{dealValid[index]}}</span>
					</li>
					<p class="stateNone" v-if="!false" @click="addDeal">添加关联协议</p>
					<div id="modal-overlay" class="addDealModal">
						<div class="modal-wrap">
							<h5>添加关联协议</h5>
							<span class="modalChaBtn" @click="closeModal"></span>
							<div class="selectBox">
								<p>请选择关联协议</p>
								<select></select>
							</div>
							
							<div class="confirmBtn" @click="closeModal">
								确定
							</div>
						</div>
					</div>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from "vue"
	import {mapState} from "vuex"
	import Modal from "../../../assets/js/modal.js"
	import router from '../../../router'
	export default{
		name:"applicationDetail",
		data:function(){
			return{
				detailId:{id:""},//所查看的需求id
				detailInfo:"",//对应的所查看的需求详情信息
				updownText:"收起",
				updownFlag:true,
				mengShow:false,
				haveCooper:true,//有无申请方
				intentionTxt:"已达成合作意向",//有无合作意向之后的文字信息
				myOperate:"",
				operate:[],//我的申请 对方也达成合作意向后“第二个span”的显隐；
				haveDeal:true,//有无关联协议
				auditStatusShow:false,//需求审核状态的提示显隐 为auditStatus='0'表示在审核中，'1'表示审核完成可以编辑
				auditStatusTxt:[],//需求审核状态的文字
				dealValid:[],//关联协议的状态内容
				haveValue:{describe:false,complateTime:false,demandObj:false,objRequire:false,reword:false,remark:false},//判断各行有没有信息显示
				
			}
		},
		computed:mapState({
		  demandInfo:state=>state.demand.demandInfo,/*获取vuex数据  需求数组*/
		  unvalidInfo:state=>state.demand.unvalidInfo,
		  applicationInfo:state=>state.demand.applicationInfo,
		}),
		beforeCreate(){
//			Vue.set(this.detailId,"id",this.$route.query.id)
////			this.id = this.$route.query.id;
//			console.log(this.detailId.id)
//			console.log(this.demandInfo[detailId.id])
		},
		mounted(){
			
			Vue.set(this.detailId,"id",this.$route.query.id)
			for(let i=0;i<this.demandInfo.length;i++){
				if(this.detailId.id==this.demandInfo[i].id){
					let index = i;
					this.detailInfo = this.demandInfo[index];
				}
			}//获取详情的内容信息
			for(let i=0;i<this.applicationInfo.length;i++){
				if(this.detailId.id==this.applicationInfo[i].id){
					let index = i;
					this.detailInfo = this.applicationInfo[index];
				}
			}//获取详情的内容信息
			
			// 判断各项有无数据
			if(this.detailInfo.describe!=""){
				this.haveValue.describe=true;
			}
			if(this.detailInfo.complateTime!=""){
				this.haveValue.complateTime=true;
			}
			if(this.detailInfo.objRequire!=""){
				this.haveValue.objRequire=true;
			}
			if(this.detailInfo.reword!=""){
				this.haveValue.reword=true;
			}
			if(this.detailInfo.remark!=""){
				this.haveValue.remark=true;
			}
			for(let i=0;i<this.detailInfo.demandObj.length;i++){
				if(this.detailInfo.demandObj[i]!=""){
					this.haveValue.demandObj = true;
					break;
				}
			}
			
			if(this.detailInfo.applicant.length!=0){
				Vue.set(this,'haveCooper',true)
			}else{
				Vue.set(this,'haveCooper',false)
			}//有无合作方
			
			if(this.detailInfo.relatedDeal.length!=0){
				Vue.set(this,'haveDeal',true)
			}else{
				Vue.set(this,'haveDeal',false)
			}//有无协议
			
			for(var i=0;i<this.detailInfo.applicant.length;i++){
				if(this.detailInfo.applicant[i].id=="666"){
					this.operate.push(true)
					
					if(this.detailInfo.applicant[i].coIntention!=false){
						Vue.set(this,'myOperate',"退回合作意向")
					}else{
						Vue.set(this,'myOperate',"撤回申请")
					}
				}else{
					this.operate.push(false)
				}
			}//我的操作撤回退回
			
			console.log(this.operate)
			//需求审核状态的显隐，有无编辑下线操作按钮
			if(this.detailInfo.auditStatus!=1){
				Vue.set(this,'auditStatusShow',true);
				Vue.set(this,'auditStatusTxt',"需求审核中");
				
			}else{
				Vue.set(this,'auditStatusShow',false);
			}
			
			//协议的状态
			for(var j=0;j < this.detailInfo.relatedDeal.length;j++){
				if(this.detailInfo.relatedDeal[j].valid != false){
					console.log(this.detailInfo.relatedDeal)
					this.dealValid.push("已生效");
				}else{
					this.dealValid.push("待生效");
				}
			}
			console.log(this.dealValid)
		},
		methods:{
			
			returnIntention(){
			
				if(this.myOperate=="撤回申请"){
					console.log(33)
					Modal.makeText($(".confirmWithdraw"));
				}else if(this.myOperate=="退回合作意向"){
					console.log(33)
					Modal.makeText($(".confirmReturn"));
				}
			},
			cfmWithdraw(){
				for(var i=0;i<this.detailInfo.applicant.length;i++){
					if(this.detailInfo.applicant[i].id=="666"){
						this.detailInfo.applicant[i].Cointention="false";
						this.detailInfo.applicant.splice(i,1);
						this.operate.splice(i,1)
					}
				}
				this.closeModal();
			},
			cfmReturn(){
				for(var i=0;i<this.detailInfo.applicant.length;i++){
					if(this.detailInfo.applicant[i].id=="666"){
						this.detailInfo.applicant[i].Cointention="false";
						this.detailInfo.applicant.splice(i,1);
						this.operate.splice(i,1)
					}
				}
				this.closeModal();
			},
			closeModal(){
				Modal.closeModal($(".confirmWithdraw"))
				Modal.closeModal($(".confirmReturn"))
				Modal.closeModal($(".addDealModal"))
			},
			upDwon(){
				if(this.updownFlag!=false){
					Vue.set(this,'updownFlag',false)
					this.updownText="展开查看详情"
					$('.detail-wrap').animate({height:"100px"},300,)
					$('.detail-wrap ul').animate({height:"70px"},300,)
					$('.meng').animate({height:"100px"},300,)
						Vue.set(this,'mengShow',true)
				}else{
					Vue.set(this,'updownFlag',true)
					this.updownText="收起";
					$('.detail-wrap').animate({height:"372px"},300)
					$('.detail-wrap ul').animate({height:"342px"},300,)
					$('.meng').animate({height:"372px"},300,)
					Vue.set(this,'mengShow',false)
				}
				
			},
			cancelDeal(index){
				this.detailInfo.relatedDeal.splice(index,1)
				if(this.detailInfo.relatedDeal.length!=0){
					Vue.set(this,'haveDeal',true)
				}else{
					Vue.set(this,'haveDeal',false)
				}
			},
			addDeal(){
				Modal.makeText($(".addDealModal"))
			},
			
			
		}
	}
</script>

<style lang="scss" scoped="scoped">
$activeColor:#546686;
$bfColor:#ffffff;
.applicationDetail{
	width: 940px;
	padding: 26px 20px;
	background: $bfColor;
	.title-wrap{
		height:100px;
		border-bottom:1px solid #E0E0E0;
		.D-title{
			height: 50px;
			line-height: 50px;
			font-size: 28px;
			color: $activeColor;
			.auditStatus{
				float: right;
				color: #F9600d;
				font-size: 14px;
			}
			.cancelBtn{
				float: right;
				height: 50px;
				line-height: 50px;
				color: #535353;
				cursor: pointer;
				font-size: 14px;
				margin-left: 15px;
				&:last-of-type{
					margin-right: 20px;
				}
				
				img{
					margin-right: 10px;
					margin-top: 18px;
					float: left;
					&:first-child{
						display: block;
					}
					&:last-child{
						display: none;
					}
				}
				&:hover{
					color:$activeColor ;
					img{
						&:first-child{
							display: none;
						}
						&:last-child{
							display: block;
						}
					}
				}
			}
			.toolsBox{
				float: right;
			    &:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
				
				span{
					/*position: absolute;*/
					float: right;
					height: 34px;
					line-height: 34px;
					color: #535353;
					cursor: pointer;
					font-size: 14px;
					&:last-of-type{
						margin-right: 20px;
					}
					
					img{
						margin-right: 10px;
						margin-top: 10px;
						float: left;
						&:first-child{
							display: block;
						}
						&:last-child{
							display: none;
						}
					}
					&:hover{
						color:$activeColor ;
						img{
							&:first-child{
								display: none;
							}
							&:last-child{
								display: block;
							}
						}
					}
				}
			}
			#modal-overlay{
				.modal-wrap{
					min-width: 480px;
					padding: 80px 50px;
					background: #FFFFFF;
					border-radius: 10px;
					position:absolute;top:50%;left:50%; 
					transform:translate(-50%,-50%);
					-webkit-transform:translate(-50%,-50%);
					-moz-transform:translate(-50%,-50%);
					-ms-transform:translate(-50%,-50%);
					-o-transform:translate(-50%,-50%);
					p{
						font-size: 18px;
						height: 30px;
						line-height: 30px;
						text-align: center;
					}
					.modalChaBtn{
						width: 20px;
					     height: 20px;
					     background: url(../../../assets/img/demand/icon004.png) no-repeat center;
					     position: absolute;
					     top: 20px;
					     right: 30px;
					     cursor: pointer;
					}
					.confirmBtn{
						
						width: 160px;
						height: 42px;
						line-height: 42px;
						text-align: center;
						background: url(../../../assets/img/demand/bg21.png) no-repeat;
						margin: 30px auto 10px;
						color: $bfColor;
						cursor:pointer;
						font-size: 14px;
					}
				}
			}
		}
		.time-wrap{
			color: #858585;
		}
		
		
	}
	.info-wrap{
		padding-top: 25px;
		&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
		.info-title{
			height: 46px;
			line-height: 46px;
			border-bottom: 1px solid #E0E0E0;
			span{
				height: 46px;
				line-height: 46px;
				display:inline-block;
				text-align: center;
				font-size: 18px;
				color: $activeColor;
				border-bottom: 2px solid $activeColor;
			}
			.up{
				float: right;
				padding-left: 25px;
				color: $activeColor;
				cursor: pointer;
				background: url(../../../assets/img/demand/icon10.png) no-repeat left center;
			}
			.down{
				float: right;
				padding-left: 25px;
				color: $activeColor;
				cursor: pointer;
				background: url(../../../assets/img/demand/icon11.png) no-repeat left center;
			}
		}
		.detail-wrap{
			position: relative;
			padding-bottom: 30px;
			background: #FFFFFF;
			border-bottom: 1px solid #E0E0E0;
			ul{
				width:900px;
				overflow: hidden;
				li{
					margin-top: 15px;
					&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
					.wrap-left{
						float: left;
						/*margin-right: 14px;*/
						
					}
					p{
						width: 830px;
						color: #8c8c8c;
						float: right;
						text-align: justify;
					}
				}
			}
			.meng{
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0; left: 0;
				z-index: 999;
				background: linear-gradient(top,rgba(255,255,255,0) ,rgba(255,255,255,0.6));
				background: -webkit-linear-gradient(top,rgba(255,255,255,0) ,rgba(255,255,255,0.6));
				background: -o-linear-gradient(top,rgba(255,255,255,0) ,rgba(255,255,255,0.6));
				background: -moz-linear-gradient(top,rgba(255,255,255,0) ,rgba(255,255,255,.5));
				
				
			}
		}
		.applicant-wrap{
			padding-top: 40px;
			&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
			.A-title{
				height: 42px;
				line-height: 42px;
				font-size: 18px;
			}
			.content-applicant{
				padding-left: 40px;
				border: none;
				&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
				.stateNone{
					height: 40px;
					line-height: 40px;
					color: #8C8C8C;
				}
				dl{
					height: 220px;
					float: left;
					margin-right: 30px;
					margin-top: 10px;
					dd{
						margin-bottom: 10px;
						text-align: center;
					}
					dt{
						/*height: 40px;*/
						/*line-height: 40px;*/
						text-align: center;
						margin-top: 5px;
						
						width: 112px;
						/*overflow: hidden;*/
						&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
						position: relative;
						p{
							float: left;
							min-width: 112px;
							/*height: 30px;*/
							
						}
						span{
							float: left;
							/*width: 100%;*/
							min-width: 112px;
							height: 30px;
							line-height: 30px;
							
							
							
						}
						.alreadySent{
							background: none;
							color: #f76c0f;
						}
						.notyetSent{
							margin-top: 15px;
							background: #353535;
							color: #FFFFFF;
							border-radius: 3px;
							cursor: pointer;
							&:hover{
								background: $activeColor;
							}
						}
					}
				}
			}
			#modal-overlay{
				.detail-wrap{
					min-width: 480px;
					padding: 80px 50px;
					background: #FFFFFF;
					border-radius: 10px;
					position:absolute;top:50%;left:50%; 
					transform:translate(-50%,-50%);
					-webkit-transform:translate(-50%,-50%);
					-moz-transform:translate(-50%,-50%);
					-ms-transform:translate(-50%,-50%);
					-o-transform:translate(-50%,-50%);
					p{
						font-size: 18px;
						height: 30px;
						line-height: 30px;
						text-align: center;
					}
					.modalChaBtn{
						width: 20px;
					     height: 20px;
					     background: url(../../../assets/img/demand/icon004.png) no-repeat center;
					     position: absolute;
					     top: 20px;
					     right: 30px;
					     cursor: pointer;
					}
					.confirmBtn{
						
						width: 160px;
						height: 42px;
						line-height: 42px;
						text-align: center;
						background: url(../../../assets/img/demand/bg21.png) no-repeat;
						margin: 30px auto 10px;
						color: $bfColor;
						cursor:pointer;
					}
				}
			}
		}
		
		.relatedDeal-wrap{
			
			margin-top: 40px;
			.A-title{
				height: 42px;
				line-height: 42px;
				font-size: 18px;
			}
			.content-relatedDeal{
				.noDeal{
					height: 40px;
					line-height: 40px;
					color: #8C8C8C;
					border: none;
				}
				li{
					margin:0 40px;
					height: 35px;
					line-height: 35px;
					border-bottom: 1px dotted #E0E0E0;
					.dealState{
						float:right;
						margin-right:300px;
						&.valid{
							color: #f76c0f;
						}
						&.unvalid{
							color: #858585;
						}
					}
					.cancleDeal{
						float: right;
						margin-right: 0;
						padding-left: 24px;
						cursor: pointer;
						background: url(../../../assets/img/demand/icon005.png) no-repeat left center;
					}
					
				}
				.stateNone{
					border: none;
					color: $activeColor;
					padding-left: 28px;
					background: url(../../../assets/img/demand/icon53.png) no-repeat left center;
					cursor: pointer;
					margin-top: 20px;
					display: inline-block;
				}
				.addDealModal{
					position: relative;
					.modal-wrap{
						min-width: 480px;
						padding: 0px 20px 80px;
						background: #FFFFFF;
						border-radius: 10px;
						position:absolute;top:50%;left:50%; 
						transform:translate(-50%,-50%);
						-webkit-transform:translate(-50%,-50%);
						-moz-transform:translate(-50%,-50%);
						-ms-transform:translate(-50%,-50%);
						-o-transform:translate(-50%,-50%);
						h5{
							height: 50px;
							line-height: 50px;
							text-align: left;
							font-size: 18px;
							/*padding-left: 20px;*/
							color: $activeColor;
						}
						.selectBox{
							margin-top: 30px;
							&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
							p{
								font-size: 16px;
								height: 30px;
								line-height: 30px;
								text-align: center;
								float: left;
								margin-left: 50px;
							}
							select{
								height: 30px;
								line-height: 30px;
								border-radius: 3px;
								float: left;
								margin-left: 20px;
								width: 180px;
							}
						}
						
						.modalChaBtn{
							width: 20px;
						    height: 20px;
						     background: url(../../../assets/img/demand/icon004.png) no-repeat center;
						     position: absolute;
						     top: 20px;
						     right: 30px;
						     cursor: pointer;
						}
						.confirmBtn{
							
							width: 160px;
							height: 42px;
							line-height: 42px;
							text-align: center;
							background: url(../../../assets/img/demand/bg21.png) no-repeat;
							margin: 30px auto 10px;
							color: $bfColor;
							cursor:pointer;
						}
					}
				}
			}
			
		}
	}
}
</style>