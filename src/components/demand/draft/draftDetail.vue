<template>
	<div class="draftDetail">
		<div class="title-wrap">
			<h3 class="D-title">{{detailInfo.name}}
				<div class="toolsBox" v-if="!auditStatusShow">
					<span @click="toDelete(detailId.id)"  v-if="!haveOffLine">
						<img src="../../../assets/img/demand/delete-black.png" />
						<img src="../../../assets/img/demand/icon49.png" />
						删除
					</span>
					<span @click="toOffLine(detailId.id)" v-if="haveOffLine">
						<img src="../../../assets/img/demand/icon50.png" />
						<img src="../../../assets/img/demand/icon51.png" />
						下线
					</span>
					<span @click="toModify(detailId.id)">
						<img src="../../../assets/img/demand/icon3.png" />
						<img src="../../../assets/img/demand/icon1.png" />
						编辑
					</span>
					
					<!--编辑此需求的模态框 start-->
					<div id="modal-overlay" class="confirmModify">
						<div class="modal-wrap">
							<h5></h5>
							<span class="modalChaBtn" @click="closeModal"></span>
							<p>进入编辑状态后，该需求将在需求重心下线。</p>
							<p>且编辑后需等待管理员审核通过后才可再次进入需求中心。</p>
							<p>是否确认进入编辑？</p>
							<div class="confirmBtn" @click="cfmModify(detailId.id)">
								进入编辑
							</div>
						</div>
					</div>
					<!--确认下线的模态框 start-->
					<div id="modal-overlay" class="confirmDelete">
						<div class="modal-wrap">
							<h5></h5>
							<span class="modalChaBtn" @click="closeModal"></span>
							<p>如您确认进行下线操作，该需求将在需求中心下线。</p>
							<p>您可在  "我的发布"——"无效需求"  中进行查看。</p>
							<div class="confirmBtn" @click="cfmDeleteValid">
								确认下线
							</div>
						</div>
					</div>
				</div>
				<div class="auditStatus" >{{auditStatusTxt}}</div>
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
					</li>
					<li>
						<div class="wrap-left">完成时间</div>
						<p>{{detailInfo.complateTime}}</p>
					</li>
					<li>
						<div class="wrap-left">需求对象</div>
						<p v-for="item in detailInfo.demandObj">{{item}}</p>
					</li>
					<li>
						<div class="wrap-left">对象要求</div>
						<p>{{detailInfo.objRequire}}</p>
					</li>
					<li>
						<div class="wrap-left">需求酬劳</div>
						<p>{{detailInfo.reword}}</p>
					</li>
					<li>
						<div class="wrap-left">备注信息</div>
						<p>{{detailInfo.remark}}</p>
					</li>
					
				</ul>
				<div class="meng" v-if="mengShow"></div>
			</div>
			<div class="applicant-wrap" v-if="havePublished">
				<h5 class="A-title">申请方</h5>
				<div class="content-applicant">
					<p class="stateNone" v-if="!haveCooper">( 暂无申请方 )</p>
					<dl v-for="(item,index) in detailInfo.applicant">
						<dd><img src="../../../assets/img/demand/icon003.png"/></dd>
						<dt>
							<p>{{item.name}}</p>
							<span v-if="item.coIntention" class="alreadySent">
								{{intentionTxt[index]}}
							</span>
							<button v-if="!item.coIntention" @click="sentIntention(index)" v-bind:class="{alreadySent:detailInfo.applicant[index].coIntention,notyetSent:!detailInfo.applicant[index].coIntention,disabled:!haveOffLine}">
								{{intentionTxt[index]}}
							</button>
						</dt>
					</dl>
				</div>
				
			</div>
			
			<div class="relatedDeal-wrap" v-if="havePublished">
				<h5 class="A-title">关联协议</h5>
				<ul class="content-relatedDeal">
					<li class="noDeal" v-if="!haveDeal">暂无关联协议</p>
					<li v-for="(item,index) in detailInfo.relatedDeal" v-if="haveDeal">
						与{{item.name}}签订的协议
						<span class="cancleDeal" @click="cancelDeal(index)">取消协议</span>
						<span class="dealState" v-bind:class="{valid:item.valid,unvalid:!item.valid}">{{dealValid[index]}}</span>
						
					</li>
					<span class="addmoreD" v-bind:class="{disabled:!haveOffLine}" @click="addDeal">添加关联协议</span>
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
		name:"draftDetail",
		data:function(){
			return{
				detailId:{id:""},//所查看的需求id
				detailInfo:"",//对应的所查看的需求详情信息
				updownText:"收起",
				updownFlag:true,
				mengShow:false,
				haveCooper:true,//有无申请方
				haveDeal:true,//有无关联协议
				havePublished:false,//有没有被发布过
				haveOffLine:false,//有没有在线
				intentionTxt:[],//有无合作意向之后的文字信息
				auditStatusShow:false,//需求审核状态的提示显隐 为auditStatus='0'表示在审核中，'1'表示审核完成可以编辑,"2"表示需求下线
				auditStatusTxt:"",//需求审核状态的文字
				dealValid:[],//关联协议的状态内容
				
			}
		},
		computed:mapState({
		  demandInfo:state=>state.demand.demandInfo,/*获取vuex数据  需求数组*/
		  unvalidInfo:state=>state.demand.unvalidInfo,
		  applicationInfo:state=>state.demand.applicationInfo,
		  draftInfo:state=>state.demand.draftInfo,/*获取vuex数据  需求数组*/
		}),
		create(){
			
		},
		mounted(){
			
			Vue.set(this.detailId,"id",this.$route.query.id)
			for(let i=0;i<this.demandInfo.length;i++){
				if(this.detailId.id==this.demandInfo[i].id){
					let index = i;
					this.detailInfo = this.demandInfo[index];
				}
			}
			for(let i=0;i<this.applicationInfo.length;i++){
				if(this.detailId.id==this.applicationInfo[i].id){
					let index = i;
					this.detailInfo = this.applicationInfo[index];
				}
			}
			for(let i=0;i<this.draftInfo.length;i++){
				if(this.detailId.id==this.draftInfo[i].id){
					let index = i;
					this.detailInfo = this.draftInfo[index];
				}
			}
			
			for(let i=0;i<this.unvalidInfo.length;i++){
				if(this.detailId.id==this.unvalidInfo[i].id){
					let index = i;
					this.detailInfo = this.unvalidInfo[index];
				}
			}
			
			if(this.detailInfo.applicant.length!=0){
				Vue.set(this,'haveCooper',true)
			}else{
				Vue.set(this,'haveCooper',false)
			}
			
			if(this.detailInfo.relatedDeal.length!=0){
				Vue.set(this,'haveDeal',true)
			}else{
				Vue.set(this,'haveDeal',false)
			}
			//判断该需求草稿的来源，即判断有没有被发布过，来判定申请者及以后模块的有无。
			if(this.detailInfo.havePublished==false){
				Vue.set(this,"havePublished",false)//有没有被发布过
				
			}else{
				Vue.set(this,"havePublished",true)
			}
			//判断有没有在线（在需求中心）
			if(this.detailInfo.haveOffLine==false){
				Vue.set(this,"haveOffLine",false)//已经从需求中心下线的需求
				
			}else{
				Vue.set(this,"haveOffLine",true)
			}
			
			for(var i=0;i<this.detailInfo.applicant.length;i++){
				
				if(this.detailInfo.applicant[i].coIntention!=true){
					this.intentionTxt.push("发送合作意向") ;
//					Vue.set(this,'intentionTxt',"发送合作意向")
//					console.log(this.intentionTxt)
				}else{
					this.intentionTxt.push("已达成合作意向") ;
//					Vue.set(this,'intentionTxt',"已达成合作意向")
				}
			}
			console.log(this.detailInfo.auditStatus)
			//需求审核状态的显隐，有无编辑下线操作按钮
			if(this.detailInfo.auditStatus==="0"){
				console.log(90)
				Vue.set(this,'auditStatusShow',true);
				Vue.set(this,'auditStatusTxt',"需求审核中");	
				
			}else if(this.detailInfo.auditStatus==="1"){
				console.log(868)
				Vue.set(this,'auditStatusShow',false);//需求审核通过的情况
				Vue.set(this,'auditStatusTxt',"");
			}else if(this.detailInfo.auditStatus==="2"){
				console.log(878)
				Vue.set(this,'auditStatusShow',false);
				Vue.set(this,'auditStatusTxt',"需求已下线");//需求下线的情况
				
			}else{
				console.log(888)
				Vue.set(this,'auditStatusShow',false);
				Vue.set(this,'auditStatusTxt',"");//需求还未上线的情况
			}
			
			//协议的状态
			for(var j=0;j < this.detailInfo.relatedDeal.length;j++){
				if(this.detailInfo.relatedDeal[j].valid != false){
//					console.log(this.detailInfo.relatedDeal)
					this.dealValid.push("已生效");
				}else{
					this.dealValid.push("待生效");
				}
			}
//			console.log(this.dealValid)
		},
		methods:{
			
			toModify(){
				Modal.makeText($(".confirmModify"));
			},
			cfmModify(id){
				for(var i=0;i<this.demandInfo.length;i++){
					if(id==this.demandInfo[i].id){
						this.demandInfo[i].auditStatus = "2";//需求下线。
						this.unvalidInfo.push(this.demandInfo[i])//转入无效需求中
						this.demandInfo.splice(i,1);
					}
				}
				this.closeModal();
				router.push({name:"modifyDraft",params:{id:this.detailId.id}});
			},
			toDelete(){
				Modal.makeText($(".confirmDelete"));
			},
			toOffLine(id){
				
			},
			cfmDeleteValid(){//下线此需求
				
				this.unvalidInfo.push(this.detailInfo);
				for(var i=0;i<this.demandInfo.length;i++){
					if(this.detailId.id==this.demandInfo[i].id){
						this.demandInfo.splice(i,1);
					}
				}
				
				router.push("/yhzx/demand/publishment/index");
//				Vue.set(this,'auditStatusShow',true);
//				Vue.set(this,'auditStatusTxt',"需求已下线");
				this.closeModal();
			},
			closeModal(){
				Modal.closeModal($(".confirmModify"))
				Modal.closeModal($(".confirmDelete"))
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
				if(this.haveOffLine!=false){
					Modal.makeText($(".addDealModal"))
				}
			},
			
			sentIntention(index){
				if(this.haveOffLine!=false){
					for(var i=0;i<this.detailInfo.applicant.length;i++){
						if(i==index){
							this.detailInfo.applicant[index].coIntention = true;
	//						Vue.set(this,"detailInfo.applicant[index].coIntention",true)
							this.intentionTxt[index] = "已达成合作意向"
						}
					}
				}
				
				
			},
			
		}
	}
</script>

<style lang="scss" scoped="scoped">
$activeColor:#546686;
$bfColor:#ffffff;
.draftDetail{
	width: 940px;
	padding: 26px 20px;
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
				margin-right: 30px;
			}
			.toolsBox{
				float: right;
			    &:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
				
				span{
					/*position: absolute;*/
					float: right;
					height: 50px;
					line-height: 50px;
					color: #535353;
					cursor: pointer;
					font-size: 14px;
					&:last-of-type{
						margin-right: 20px;
					}
					
					img{
						margin-right: 10px;
						margin-top: 20px;
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
				z-index: 9;
				background: linear-gradient(top,rgba(255,255,255,0) ,rgba(255,255,255,0.7));
				background: -webkit-linear-gradient(top,rgba(255,255,255,0) ,rgba(255,255,255,0.7));
				background: -o-linear-gradient(top,rgba(255,255,255,0) ,rgba(255,255,255,0.7));
				background: -moz-linear-gradient(top,rgba(255,255,255,0) ,rgba(255,255,255,.5));
				
				
			}
		}
		.applicant-wrap{
			padding-top: 40px;
			border-top: 1px solid #E0E0E0;
			
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
					height: 160px;
					float: left;
					margin-right: 30px;
					margin-top: 10px;
					dd{
						
						text-align: center;
					}
					dt{
						/*height: 40px;*/
						/*line-height: 40px;*/
						text-align: center;
						margin-top: 5px;
						/*overflow: hidden;*/
						&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
						position: relative;
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
						span,button{
							float: left;
							/*width: 100%;*/
							min-width: 112px;
							height: 30px;
							line-height: 30px;
							margin-top: 15px;
							border: none;
							text-align: center;
						}
						.disabled{
							color: #FFFFFF !important;
							background: #828282 !important;
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
				.addmoreD{
					border: none;
					color: $activeColor;
					padding-left: 28px;
					margin-top: 20px;
					display: inline-block;
					background: url(../../../assets/img/demand/icon53.png) no-repeat left center;
					cursor: pointer;
				}
				.disabled{
					padding-left: 28px;
					margin-top: 20px;
					background: url(../../../assets/img/demand/icon53.png) no-repeat left center;
					cursor: pointer;
					border: none;
					color: #828282;
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