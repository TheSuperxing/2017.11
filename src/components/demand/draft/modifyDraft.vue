<template>
	<div class="modifyDraft">
		<p class="notice">带*为必填项</p>
		<ul class="edit_table">
			<li>
				<p class="wrap-left">*需求名称</p>
				<input type="text" placeholder="请输入需求名称..." v-model="DemandInfo.name"/>
				<alertTip v-if="showAlert.name" :showHide="showAlert.name" @closeTip="closeTip" :alertText="alertText.name"></alertTip>
				
			</li>
			<li>
				<p class="wrap-left">*需求描述</p>
				<textarea maxlength="500" placeholder="请输入 需求详细描述文案..." v-model="DemandInfo.describe"></textarea>
				<span>{{describeCont}}/500</span>
				<alertTip v-if="showAlert.describe" :showHide="showAlert.describe" @closeTip="closeTip" :alertText="alertText.describe"></alertTip>
				
			</li>
			<li>
				<p class="wrap-left">*完成时间</p>
				<!--<input type="text" placeholder="请输入完成时间..." />-->
				<datepicker class="datePicker" v-model="DemandInfo.complateTime"></datepicker>
				<alertTip v-if="showAlert.complateTime" :showHide="showAlert.complateTime" @closeTip="closeTip" :alertText="alertText.complateTime"></alertTip>
				
			</li>
			<li>
				<p class="wrap-left">*需求对象</p>
				<label v-for="(item,index) in demandObj" @click="selectObj(index)" v-bind:class="{selected:selectedStyle[index]}">
					<em></em>
					<p>{{item}}</p>
				</label>
				<alertTip v-if="showAlert.demandObj" :showHide="showAlert.demandObj" @closeTip="closeTip" :alertText="alertText.demandObj"></alertTip>
				
			
			</li>
			<li>
				<p class="wrap-left">*对象要求</p>
				<textarea  maxlength="500" placeholder="请输入对象要求..." v-model="DemandInfo.objRequire"></textarea>
				<span>{{requireCont}}/500</span>
				<alertTip v-if="showAlert.objRequire" :showHide="showAlert.objRequire" @closeTip="closeTip" :alertText="alertText.objRequire"></alertTip>
				
			</li>
			<li>
				<p class="wrap-left">*需求酬劳</p>
				<input type="text" placeholder="请输入需求酬劳..." v-model="DemandInfo.reword"/>
				<alertTip v-if="showAlert.reword" :showHide="showAlert.reword" @closeTip="closeTip" :alertText="alertText.reword"></alertTip>
				
			</li>
			<li>
				<p class="wrap-left">*备注信息</p>
				<textarea  maxlength="500" placeholder="请输入备注信息..." v-model="DemandInfo.remark"></textarea>
				<span>{{remarkCont}}/500</span>
			</li>
			<div class="btnBox">
				<span @click="commitDemand">提交审核</span>
				<span @click="saveToDraft">保存至草稿箱</span>
			</div>
		</ul>
		<!--模态框-->
		<div id="modal-overlay" class="confirmCommit">
			<div class="detail-wrap">
				<h5></h5>
				<span class="modalChaBtn" @click="closeModal"></span>
				<p>提交后，该任务将由交易管理员进行审核。</p>
				<p>审核期间该任务不可修改。</p>
				<p>如未通过审核，该任务将退回至您的草稿箱。</p>
				<p>您可在“我的交易”中查看审核过程。</p>
				<div class="confirmBtn" @click="cfmCommit">
					确认提交
				</div>
			</div>
		</div>
		<div class="applicant-wrap" v-if="havePublished">
			<h5 class="A-title">申请方</h5>
			<div class="content-applicant">
				<p class="stateNone" v-if="!haveCooper">( 暂无申请方 )</p>
				<dl v-for="(item,index) in DemandInfo.applicant">
					<dd><img src="../../../assets/img/demand/icon003.png"/></dd>
					<dt>
						<span>{{item.name}}</span>
						<span v-if="item.coIntention=='1'" class="alreadySent">
								已达成合作意向
						</span>
						<span v-if="item.coIntention=='0'" v-bind:class="['notyetSent',{disabled:!haveOffLine}]" @click="sentIntention(index)">同意合作申请</span>
					</dt>
				</dl>
			</div>
			
		</div>
		
		<div class="relatedDeal-wrap" v-if="havePublished">
			<h5 class="A-title">关联协议</h5>
			<ul class="content-relatedDeal">
				<li class="noDeal" v-if="!haveDeal">暂无关联协议</p>
				<li v-for="(item,index) in DemandInfo.relatedDeal" v-if="haveDeal">
					与{{item.name}}签订的协议
					<span class="cancleDeal" @click="cancelDeal(index)">取消协议</span>
					<span class="dealState" v-bind:class="{valid:item.valid,unvalid:!item.valid}">{{dealValid[index]}}</span>
				</li>
				<p class="stateNone" v-bind:class="{disabled:!haveOffLine}" @click="addDeal">添加关联协议</p>
			</ul>
		</div>
	</div>
	
</template>

<script>
	import Vue from "vue"
	import {mapState} from "vuex"
	import router from "../../../router"
	import Modal from "../../../assets/js/modal"
	import Datepicker from "../units/Datepicker.vue"
	import AlertTip from "../units/alertTip.vue"
	export default{
		name:"modifyDraft",
		data:function(){
			return{
				demandObj:[
				"个人","公司","团队"
				],
				id:"",
				DemandInfo:{
//					name:"",//需求名称
//					describe:"",//需求描述
//					complateTime:"",//完成时间
//					demandObj:"",//对象
//					objRequire:"",//对象的要求
//					reword:"",//酬劳
//					remark:"",//备注
				},
				describeCont:"0",//描述文字字数
				requireCont:"0",//要求文字字数
				remarkCont:"0",
				selectedStyle:[],//需求对象的选中样式
				havePublished:false,//有没有被发布过
				haveCooper:true,//有无申请方
				haveDeal:true,//有无关联协议
				haveOffLine:false,//有没有在线
				intentionTxt:[],//有无合作意向之后的文字信息
				auditStatusShow:false,//需求审核状态的提示显隐 为auditStatus='0'表示在审核中，'1'表示审核完成可以编辑
				auditStatusTxt:"",//需求审核状态的文字
				showAlert:{name:false,describe:false,complateTime:false,demandObj:false,objRequire:false,reword:false},//提示框显隐
	        	alertText:{name:null,describe:null,complateTime:null,demandObj:null,objRequire:null,reword:false},
				dealValid:[],//关联协议的状态内容
			}
		},
		components:{
		 	Datepicker,
		 	AlertTip,
		},
	    computed:mapState({
  			demandInfo:state=>state.demand.demandInfo,/*获取vuex数据*/
  			unvalidInfo:state=>state.demand.unvalidInfo,
  			draftInfo:state=>state.demand.draftInfo,/*获取vuex数据   需求草稿的数据*/
		}),
		mounted(){
			
			this.id = this.$route.query.id;
			console.log(this.id);
			for(var i=0;i<this.demandInfo.length;i++){
				if(this.demandInfo[i].id==this.id){
					this.DemandInfo = JSON.parse(JSON.stringify(this.demandInfo[i]));
				}
			}
			for(var i=0;i<this.unvalidInfo.length;i++){
				if(this.unvalidInfo[i].id==this.id){
					this.DemandInfo = JSON.parse(JSON.stringify(this.unvalidInfo[i]));
				}
			}
			for(var i=0;i<this.draftInfo.length;i++){
				if(this.draftInfo[i].id==this.id){
					this.DemandInfo = JSON.parse(JSON.stringify(this.draftInfo[i]));
				}
			}
			
			
			for(var i=0;i<this.DemandInfo.demandObj.length;i++){//需求对象的单选按钮
				console.log(this.DemandInfo.demandObj[i])
				if(this.DemandInfo.demandObj[i]!=""){
					
					this.selectedStyle.push(true);
				}else{
					this.selectedStyle.push(false);
				}
				
			}
			console.log(this.selectedStyle)
			if(this.DemandInfo.applicant.length!=0){
				Vue.set(this,'haveCooper',true)
			}else{
				Vue.set(this,'haveCooper',false)
			}
			
			if(this.DemandInfo.relatedDeal.length!=0){
				Vue.set(this,'haveDeal',true)
			}else{
				Vue.set(this,'haveDeal',false)
			}
			//判断该需求草稿的来源，即判断有没有被发布过，来判定申请者及以后模块的有无。
			if(this.DemandInfo.havePublished==false){
				Vue.set(this,"havePublished",false)
			}else{
				Vue.set(this,"havePublished",true)
			}
			
			
			//申请者合作意向的判定
			for(var i=0;i<this.DemandInfo.applicant.length;i++){
				
				if(this.DemandInfo.applicant[i].coIntention!=true){
					this.intentionTxt.push("发送合作意向") ;
//					Vue.set(this,'intentionTxt',"发送合作意向")
//					console.log(this.intentionTxt)
				}else{
					this.intentionTxt.push("已达成合作意向") ;
//					Vue.set(this,'intentionTxt',"已达成合作意向")
				}
			}
			
		},
		methods:{
			selectObj(index){
				console.log(this.DemandInfo.demandObj)
				for(var i=0;i<this.demandObj.length;i++){
					if(i==index){
						if(this.selectedStyle[index]==false){
				      		Vue.set(this.selectedStyle,[index],true);
				      		this.DemandInfo.demandObj[index]=this.demandObj[index];//更改项目功能名
		
				      	}else{
				      		console.log(333)
				      		Vue.set(this.selectedStyle,[index],false);
				      		this.DemandInfo.demandObj[index]="";
				      		
				      	}
						//赋值到本地信息里
						
						
					}else{
//						Vue.set(this.selectedStyle,[i],false)
//						this.selectedStyle[i] = false;
					}
				}
				console.log(this.DemandInfo.demandObj)
			},
			commitDemand(){
				if(this.DemandInfo.name.trim().length==0){
					this.showAlert.name = true;
					this.alertText.name = "需求名称为必填项"
				}else{
					this.showAlert.name = false;
				};//判断项目名称不能为空
				
				if(this.DemandInfo.describe.trim().length==0){
					this.showAlert.describe = true;
					this.alertText.describe = "需求描述为必填项"
				}else{
					this.showAlert.describe = false;
//					
				};//判断项目名称不能为空
				if(this.DemandInfo.complateTime.trim().length==0){
					this.showAlert.complateTime = true;
					this.alertText.complateTime = "需求时间为必填项"
				}else{
					this.showAlert.complateTime = false;
//					
				};//判断项目名称不能为空
				for(var i=0;i<this.DemandInfo.demandObj.length;i++){
					if(this.DemandInfo.demandObj[i]!=""){
						this.showAlert.demandObj = true;
						this.alertText.demandObj = "需求对象为必填项"
					}else{
						this.showAlert.demandObj = false;
	//					
					};//判断需求对象不能为空
				}
				if(this.DemandInfo.objRequire.trim().length==0){
					this.showAlert.objRequire = true;
					this.alertText.objRequire = "对象需求为必填项"
				}else{
					this.showAlert.objRequire = false;
//					
				};//判断对象需求不能为空
				if(this.DemandInfo.reword.trim().length==0){
					this.showAlert.reword = true;
					this.alertText.reword = "需求酬劳为必填项"
				}else{
					this.showAlert.reword = false;
//					
				};//判断酬金不能为空
				if(this.DemandInfo.name.trim().length!=0&&this.DemandInfo.describe.trim().length!=0&&this.DemandInfo.complateTime.trim().length!=0
				&&this.DemandInfo.objRequire.trim().length!=0&&this.DemandInfo.reword.trim().length!=0){
					for(var i=0;i<this.DemandInfo.demandObj.length;i++){
						if(this.DemandInfo.demandObj[i]!=""){
							Modal.makeText($('.confirmCommit'));
							break;
						}else{
							this.showAlert.demandObj = false;
		//					
						};//判断项目名称不能为空
					}
				}
				
//				
			},
			cfmCommit(){
				
				for(var item in this.showAlert){
					if(this.showAlert[item]!=false){
						return false;
					}
				}
				this.DemandInfo.auditStatus = "0";//需求进入审核状态。
				for(let i=0;i<this.demandInfo.length;i++){
					if(this.id==this.demandInfo[i].id){
						this.demandInfo.splice(i,1,this.DemandInfo)
						break;
					}else{
						this.demandInfo.push(this.DemandInfo);
						break;
					}
				}
				console.log(this.demandInfo)
				for(let i=0;i<this.draftInfo.length;i++){
					if(this.id==this.draftInfo[i].id){
						this.draftInfo.splice(i,1)
						break;
					}
				}//从需求草稿里删除；
				console.log(this.demandInfo)
				router.push("/yhzx/demand/draft/index");
				this.closeModal();
			},
			saveToDraft(){
				if(this.DemandInfo.name.trim().length==0){
					this.showAlert.name = true;
					this.alertText.name = "需求名称为必填项"
				}else{
					this.showAlert.name = false;
				};//判断项目名称不能为空
				
				if(this.DemandInfo.describe.trim().length==0){
					this.showAlert.describe = true;
					this.alertText.describe = "需求描述为必填项"
				}else{
					this.showAlert.describe = false;
//					
				};//判断项目名称不能为空
				if(this.DemandInfo.complateTime.trim().length==0){
					this.showAlert.complateTime = true;
					this.alertText.complateTime = "需求时间为必填项"
				}else{
					this.showAlert.complateTime = false;
//					
				};//判断项目名称不能为空
				for(var i=0;i<this.DemandInfo.demandObj.length;i++){
					if(this.DemandInfo.demandObj[i]!=""){
						this.showAlert.demandObj = true;
						this.alertText.demandObj = "需求对象为必填项"
					}else{
						this.showAlert.demandObj = false;
	//					
					};//判断需求对象不能为空
				}
				
				if(this.DemandInfo.objRequire.trim().length==0){
					this.showAlert.objRequire = true;
					this.alertText.objRequire = "对象需求为必填项"
				}else{
					this.showAlert.objRequire = false;
//					
				};//判断项目名称不能为空
				if(this.DemandInfo.reword.trim().length==0){
					this.showAlert.reword = true;
					this.alertText.reword = "需求酬劳为必填项"
				}else{
					this.showAlert.reword = false;
//					
				};//判断项目名称不能为空
				console.log(this.DemandInfo)	
				if(this.DemandInfo.name.trim().length!=0&&this.DemandInfo.describe.trim().length!=0&&this.DemandInfo.complateTime.trim().length!=0
				&&this.DemandInfo.objRequire.trim().length!=0&&this.DemandInfo.reword.trim().length!=0){
					for(var i=0;i<this.DemandInfo.demandObj.length;i++){
						if(this.DemandInfo.demandObj[i]!=""){
							for(let i=0;i<this.draftInfo.length;i++){
								if(this.id==this.draftInfo[i].id){
									this.draftInfo.splice(i,1,this.DemandInfo)
									break;
								}else{
									this.draftInfo.push(this.DemandInfo)
								}
							}
							console.log(this.draftInfo)
							router.push("/yhzx/demand/draft/index");
							this.closeModal();
							break;
						}else{
							this.showAlert.demandObj = false;
		//					
						};//判断项目名称不能为空
					}
					
				}
				
			},
			closeModal(){
				Modal.closeModal($('.confirmCommit'))
			},
			cancelDeal(index){
				this.DemandInfo.relatedDeal.splice(index,1)
				if(this.DemandInfo.relatedDeal.length!=0){
					Vue.set(this,'haveDeal',true)
				}else{
					Vue.set(this,'haveDeal',false)
				}
			},
			addDeal(){
				
			},																							
			sentIntention(index){
				for(var i=0;i<this.DemandInfo.applicant.length;i++){
					if(i==index){
						this.DemandInfo.applicant[index].coIntention = true;
//						Vue.set(this,"detailInfo.applicant[index].coIntention",true)
						this.intentionTxt[index] = "已达成合作意向"
					}
				}
				
			},
		},
		updated(){
			this.describeCont = this.DemandInfo.describe.length;
			this.requireCont = this.DemandInfo.objRequire.length;
			this.remarkCont = this.DemandInfo.remark.length;
		}
	}
</script>

<style lang="scss" scoped="scoped">
$activeColor:#546686;
$bfColor:#ffffff;
.modifyDraft{
	width: 940px;
		padding: 30px 40px;
		float: left;
		.notice{
			color: #BEBEBE;
		}
		
		.edit_table{
			margin-top:30px ;
			
			li{
				margin-bottom: 30px;
				position: relative;
					
				>span{
					color: #BEBEBE;
					position: absolute;
					left:580px;
					bottom: 0;
				}
				input{
					float: left;
					width: 480px;
					height: 35px;
					line-height: 35px;
					text-indent: 15px;
					border: 1px solid #BEBEBE;
					border-radius: 5px;
					
				}
				.datePicker{
					float: left;
					width: 480px;
					height: 35px;
					line-height: 35px;
					border: 1px solid #BEBEBE;
					border-radius: 5px;
					
				}
				textarea{
					float: left;
					width: 480px;
					height: 200px;
					line-height: 24px;
					text-indent: 15px;
					border: 1px solid #BEBEBE;
					border-radius: 5px;
					text-align: justify;
					padding: 0 5px;
				}
				label{
					height: 20px;
					line-height: 20px;
					margin-right: 30px;
					margin-top: 8px;
					cursor: pointer;
					color: rgb(191,191,191);
					overflow: hidden;
					float: left;
					em{
						float: left;
			              width: 15px;
			              height: 15px;
			              margin-top:3px;
			              background: rgb(191,191,191);
			              border-radius: 50%;
					}
					p{
			          float: left;
			          padding-left: 15px;
			        }
					&.selected{
						em{
							background: #546686 !important;
						}
					}
				}
				
				&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
				.wrap-left{
					height: 35px;
					line-height: 35px;
					text-align: right;
					float: left;
					margin-right: 30px;
					
				}
			}
			.btnBox{
				margin-top: 10px;
				margin-left: 115px;
				margin-bottom: 40px;
				overflow: hidden;
				span{
					width: 160px;
					height: 42px;
					line-height: 42px;
					text-align: center;
					border-radius: 5px;
					float: left;
					cursor: pointer;
					&:first-child{
						background: url(../../../assets/img/demand/bg21.png) no-repeat;
						color: #FFFFFF;
						margin-right: 30px;
						&:hover{
							opacity: 0.9;
						}
					}
					&:last-child{
						border: 1px solid #BEBEBE;
						&:hover{
							border: 1px solid $activeColor;
							color: $activeColor;
						}
					}
				}
			}
		}
		.confirmCommit{
			.detail-wrap{
				width: 480px;
				padding: 50px 0px;
				background: #FFFFFF;
				border-radius: 10px;
				position:absolute;top:50%;left:50%; 
				transform:translate(-50%,-50%);
				-webkit-transform:translate(-50%,-50%);
				-moz-transform:translate(-50%,-50%);
				-ms-transform:translate(-50%,-50%);
				-o-transform:translate(-50%,-50%);
				p{
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
						span{
							float: left;
							/*width: 100%;*/
							min-width: 112px;
							height: 30px;
							line-height: 30px;
							&:last-child{
								margin-top: 15px;
								cursor: pointer;
								position:absolute;left:50%; bottom: -50px;
								transform:translate(-50%,-50%);
								-webkit-transform:translate(-50%,-50%);
								-moz-transform:translate(-50%,-50%);
								-ms-transform:translate(-50%,-50%);
								-o-transform:translate(-50%,-50%);
							}
							
						}
						.alreadySent{
							background: none;
							color: #f76c0f;
						}
						.notyetSent{
							background: #353535;
							color: #FFFFFF;
							border-radius: 3px;
							&:hover{
								background: $activeColor;
							}
						}
						.disabled{
							color: #FFFFFF !important;
							background: #828282 !important;
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
			}
			
			.stateNone{
				border: none;
				color: $activeColor;
				padding-left: 28px;
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
		}
	
}
</style>