<template>
	<div class="demandDetail">
		<div class="title-wrap">
			<h3 class="D-title">{{detailInfo.name}}
				<div class="toolsBox">
					<div v-if="isMine">
						<span @click="toDelete(detailId.id)" class="deleteBtn" v-if="!haveOffLine">
							<img src="../../assets/img/demand/delete-black.png" />
							<img src="../../assets/img/demand/icon49.png" />
							删除
						</span>
						<span @click="toOffLine(detailId.id)" class="offlineBtn" v-if="haveOffLine">
							<img src="../../assets/img/demand/icon50.png" />
							<img src="../../assets/img/demand/icon51.png" />
							下线
						</span>
						<span @click="toModify(detailId.id)" class="editBtn">
							<img src="../../assets/img/demand/icon3.png" />
							<img src="../../assets/img/demand/icon1.png" />
							编辑
						</span>
						<span class="auditStatus" v-if="!haveOffLine">{{auditStatusTxt}}</span>
					</div>
					<div v-if="!isMine">
						<span class="cancelBtn" @click="cancelCollect(detailId.id)" v-if="haveCollect">
							<img src="../../assets/img/demand/icon59.png"/>
							<img src="../../assets/img/demand/icon59.png"/>
							取消收藏
						</span>
						<span v-if="!haveCollect" class="collectBtn" @click="collectThis(detailId.id)">
							<img src="../../assets/img/demand/icon002.png"/>
							收藏
						</span>
					</div>
					
					<!--编辑此需求的模态框 start-->
					<div id="modal-overlay" class="confirmModify">
						<div class="modal-wrap">
							<h5></h5>
							<span class="modalChaBtn" @click="closeModal"></span>
							<p>进入编辑状态后，该需求将在需求中心下线。</p>
							<p>且编辑后需等待管理员审核通过后才可再次进入需求中心。</p>
							<p>是否确认进入编辑？</p>
							<div class="confirmBtn" @click="cfmModify(detailId.id)">
								进入编辑
							</div>
						</div>
					</div>
					<!--确认下线的模态框 start-->
					<div id="modal-overlay" class="confirmOffline">
						<div class="modal-wrap">
							<h5></h5>
							<span class="modalChaBtn" @click="closeModal"></span>
							<p>如您确认进行下线操作，该需求将在需求中心下线。</p>
							<p>您可在  "我的发布"——"无效需求"  中进行查看。</p>
							<div class="confirmBtn" @click="cfmOffLine">
								确认下线
							</div>
						</div>
					</div>
					<div id="modal-overlay" class="confirmDelete">
						<div class="modal-wrap">
							<h5></h5>
							<span class="modalChaBtn" @click="closeModal(detailId.id)"></span>
							<p>是否确认删除该需求？</p>
							<div class="confirmBtn" @click="cfmDelete(detailId.id)">
								确认删除
							</div>
						</div>
					</div>
				</div>
				
			</h3>
			<p class="time-wrap">发布时间：{{detailInfo.complateTime}}</p>
		</div>
		<div class="info-wrap">
			<div class="pub-wrap">
				<h5 class="info-title">
					<span>发布方</span>
				</h5>
				<p>{{detailInfo.pubID}}</p>
			</div>
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
			<p class="border_bottom"></p>
			<div class="applicant-wrap">
				<h5 class="A-title">
					<span>申请方</span>
					<span class="submitApp" v-if="!isMine" v-show="!myIntention" @click="sendApply">提交申请</span>
				</h5>
				<div class="content-applicant">
					<p class="stateNone" v-if="!haveCooper">( 暂无申请方 )</p>
					<dl v-for="(item,index) in detailInfo.applicant" v-if="!isMine">
						<dd><img src="../../assets/img/demand/icon003.png"/></dd>
						<dt>
							<p class="comName">{{item.name}}</p>
							<span v-if="item.coIntention=='1'" class="alreadySent">
								已达成合作意向
							</span>
							<span v-if="item.id==userID" v-show="myIntention"  @click="callReturnModal()" class="notyetSent">{{myIntentionTxt}}</span>
							<div id="modal-overlay" class="confirmWithdraw" v-if="item.id==userID">
								<div class="modal-wrap">
									<h5></h5>
									<span class="modalChaBtn" @click="closeModal()"></span>
									<p>确认撤回对该需求的申请吗？</p>
									
									<div class="confirmBtn" @click="returnIntention(item.id)">
										确认撤回
									</div>
								</div>
							</div>
							<div id="modal-overlay" class="confirmReturn" v-if="item.id==userID">
								<div class="modal-wrap">
									<h5></h5>
									<span class="modalChaBtn" @click="closeModal()"></span>
									<p>是否退回对发布方的合作意向</p>
									<div class="confirmBtn" @click="returnIntention(item.id)">
										确认退回
									</div>
								</div>
							</div>
						</dt>
					</dl>
					<dl v-for="(item,index) in detailInfo.applicant" v-if="isMine">
						<dd><img src="../../assets/img/demand/icon003.png"/></dd>
						<dt>
							<p class="comName">{{item.name}}</p>
							<span v-if="item.coIntention=='1'" class="alreadySent">
								已达成合作意向
							</span>
							<span v-if="item.coIntention=='0'" v-bind:class="['notyetSent',{disabled:!haveOffLine}]" @click="sentIntention(index)">同意合作申请</span>
						</dt>
					</dl>
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
					<p class="stateNone" v-bind:class="{disabled:!haveOffLine}"  @click="addDeal">添加关联协议</p>
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
	import Modal from "../../assets/js/modal.js"
	import router from '../../router'
	import MyAjax from "../../assets/js/MyAjax.js"
	export default{
		name:"demandDetail",
		data:function(){
			return{
				isMine:false,//是否是我发布的需求
				myIntention:false,//如果不是我的需求，判断我的合作意向是否达成
				myIntentionTxt:"",
				detailId:{id:""},//所查看的需求id
//				detailInfo:"",//对应的所查看的需求详情信息
				updownText:"展开查看详情",
				updownFlag:false,//false收起状态
				mengShow:true,//true收起状态
				haveCooper:true,//有无申请方
				haveDeal:true,//有无关联协议
				havePublished:false,//有没有被发布过
				haveOffLine:false,//有没有在线
				haveCollect:false,
				intentionTxt:[],//我发布的需求，针对申请者 有无合作意向之后的文字信息
				auditStatusShow:false,//需求审核状态的提示显隐 为auditStatus='0'表示在审核中，'1'表示审核完成可以编辑,"2"表示需求下线
				auditStatusTxt:"",//需求审核状态的文字
				dealValid:[],//关联协议的状态内容
				haveValue:{describe:false,complateTime:false,demandObj:false,objRequire:false,reword:false,remark:false},//判断各行有没有信息显示
				operate:[],//我的申请 对方也达成合作意向后“第二个span”的显隐；
				myOperate:"",
			}
		},
		computed:mapState({
			detailInfo:state=>state.demand.detailInfo,/*获取vuex数据  需求数组*/
		    demandInfo:state=>state.demand.demandInfo,/*获取vuex数据  需求数组*/
		    unvalidInfo:state=>state.demand.unvalidInfo,
		    applicationInfo:state=>state.demand.applicationInfo,
		    draftInfo:state=>state.demand.draftInfo,/*获取vuex数据  需求数组*/
		    colletionInfo:state=>state.demand.colletionInfo,
		    userID:state=>state.userState.user.userID,/*我的ID*/
		   	
		}),
		create(){
			
		},
		mounted(){
						
			Vue.set(this.detailId,"id",this.$route.query.id)
			console.log(this.detailInfo.pubID)
			//判断是否是我发布的需求；
			if(this.detailInfo.pubID == this.userID){
				this.isMine = true;//是我发布的需求
				//继而判断已经达成合作意向，来控制退回意向按钮的显隐
				for(var i=0;i<this.detailInfo.applicant.length;i++){
					if(this.detailInfo.applicant[i].coIntention=="1"){
						this.myIntention = true;
						this.intentionTxt.push("退回合作意向")
					}else if(this.detailInfo.applicant[i].coIntention=="0"){
						this.myIntention = true;
						this.intentionTxt.push( "同意合作申请");
					}else{
						this.myIntention = false;
					}
				}
				
			}else if(this.detailInfo.pubID != this.userID){
				this.isMine = false;//不是我发布的需求
				//继而判断我有没有达成合作意向，来控制提交申请的显隐
				for(var i=0;i<this.detailInfo.applicant.length;i++){
					if(this.detailInfo.applicant[i].id==this.userID){
						if(this.detailInfo.applicant[i].coIntention=="1"){
							this.myIntention = true;
							this.myIntentionTxt = "退回合作意向"
							break;
						}else if(this.detailInfo.applicant[i].coIntention=="0"){
							this.myIntention = true;
							this.myIntentionTxt = "撤回申请"
						}else{
							this.myIntention = false;
						}
						console.log(this.myIntention)
							
					}else{
							this.myIntention = false;
					}
				}
				
			}
			console.log(this.isMine)
//			console.log(this.detailInfo)

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
			
			//判断有没有合作方
			if(this.detailInfo.applicant.length!=0){
				Vue.set(this,'haveCooper',true)
			}else{
				Vue.set(this,'haveCooper',false)
			}
			//判断有没有关联协议
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
			
			
			for(var i=0;i<this.detailInfo.applicant.length;i++){
				
				
				if(this.detailInfo.applicant[i].coIntention!="1"){
					this.intentionTxt.push("发送合作意向") ;
//					Vue.set(this,'intentionTxt',"发送合作意向")
//					console.log(this.intentionTxt)
				}else{
					this.intentionTxt.push("已达成合作意向") ;
//					Vue.set(this,'intentionTxt',"已达成合作意向")
				}
				
			}
//			console.log(this.detailInfo.auditStatus)
			//需求审核状态的显隐，有无编辑下线操作按钮
			if(this.detailInfo.auditStatus==="0"){
				Vue.set(this,'auditStatusShow',true);
				Vue.set(this,'auditStatusTxt',"需求审核中");	
				
			}else if(this.detailInfo.auditStatus==="1"){
				Vue.set(this,'auditStatusShow',false);//需求审核通过的情况
				Vue.set(this,'auditStatusTxt',"");
				Vue.set(this,"haveOffLine",true)
			}else if(this.detailInfo.auditStatus==="2"){
				Vue.set(this,'auditStatusShow',false);
				Vue.set(this,'auditStatusTxt',"需求已下线");//需求下线的情况
				Vue.set(this,"haveOffLine",false)
			}else{
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
			
			cancelCollect(id){//取消收藏
				for(let i=0;i<this.colletionInfo.length;i++){
					if(id==this.colletionInfo[i].id){
						this.colletionInfo.splice(i,1)
					}
				}
				console.log(this.colletionInfo)
				this.haveCollect = false;

			},
			collectThis(id){
				for(let i=0;i<this.colletionInfo.length;i++){
					if(id==this.colletionInfo[i].id){
						this.colletionInfo.splice(i,1,this.detailInfo)
					}else{
						this.colletionInfo.push(this.detailInfo)
					}
				}
				console.log(this.colletionInfo)
				this.haveCollect = true;
			},
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
				console.log(this.unvalidInfo)
				this.closeModal();
				router.push({name:"modifyDraft",query:{id:id}});
			},
			toDelete(){
				Modal.makeText($(".confirmDelete"));
			},
			cfmDelete(id){
				for(var i=0;i<this.demandInfo.length;i++){
					if(this.detailId.id==this.demandInfo[i].id){
						this.demandInfo.splice(i,1);
					}
				}
				router.push("/trading/index");
				this.closeModal();
			},
			toOffLine(id){
				Modal.makeText($(".confirmOffline"));
			},
			cfmOffLine(){//下线此需求
				$('.auditStatus').show()
				this.detailInfo.auditStatus = "2";//需求下线。
				Vue.set(this,"haveOffLine",false)
//				Vue.set(this,'auditStatusShow',true);
				Vue.set(this,'auditStatusTxt',"需求已下线");
				this.closeModal();
			},
			closeModal(){
				Modal.closeModal($(".confirmModify"))
				Modal.closeModal($(".confirmOffline"))
				Modal.closeModal($(".addDealModal"))
				Modal.closeModal($(".confirmReturn"))
				Modal.closeModal($(".confirmWithdraw"))
			},
			upDwon(){
				var tempheight = $('.detail-wrap').css("height");
				var ultempheight = $('.detail-wrap ul').css("height");
				var arrHeight = [tempheight,ultempheight];
				console.log(tempheight)
				sessionStorage.setItem("height",JSON.stringify(arrHeight))
				console.log(JSON.parse(sessionStorage.getItem("height")))
				if(this.updownFlag!=false){
					Vue.set(this,'updownFlag',false)
					this.updownText="展开查看详情"
					$('.detail-wrap').animate({height:"100px"},50,
//						
					)
					setTimeout(
						Vue.set(this,'mengShow',true),2000
					)
						
				}else{
					Vue.set(this,'updownFlag',true)
					this.updownText="收起";
					Vue.set(this,'mengShow',false)
					$('.detail-wrap').animate({height:ultempheight},500,
//						
					)
					setTimeout(
						Vue.set(this,'mengShow',false),2000
					)
				}
				
			},
			sendApply(){
				//提交申请后我的意向为true
				this.myIntention = true;
				this.myIntentionTxt = "撤回申请";
				
				$('.submitApp').css("display","none");
				$('.notyetSent').show();
				var myApplyInfo = {
					id:this.userID,
					name:"CCDI",
					coIntention:"0",
				}
				console.log(myApplyInfo);
				this.detailInfo.applicant.push(myApplyInfo)
				console.log(this.detailInfo.applicant);
			},
			callReturnModal(){//不是我发布的需求的情况下，我申请或者达成合作后撤回意向的模态框
				if(this.myIntentionTxt == "撤回申请"){
					Modal.makeText($(".confirmWithdraw"));//确认撤回申请的模态框
				}else{
					Modal.makeText($(".confirmReturn"));//确认退回合作意向的模态框
				}
				
				
			},
			returnIntention(id){
				if(this.myIntentionTxt == "撤回申请"){
					for(var i=0;i<this.detailInfo.applicant.length;i++){
						if(this.detailInfo.applicant[i].id == id){
							this.detailInfo.applicant.splice(i,1)
						}
					}
					$('.submitApp').css("display","block");
//					$('.notyetSent').hide()
				}else if(this.myIntentionTxt == "退回合作意向"){
					
					for(var i=0;i<this.detailInfo.applicant.length;i++){
						if(this.detailInfo.applicant[i].id == id){
							this.detailInfo.applicant.splice(i,1)
						}
					}
					$('.submitApp').css("display","block");
				}
				this.closeModal()
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
							this.detailInfo.applicant[index].coIntention = '1';
//						Vue.set(this,"detailInfo.applicant[index].coIntention",true)
							this.intentionTxt[index] = "已达成合作意向"
						}
					}
				}
				
				
			},
			destroyed(){
				console.log("detory")
				sessionStorage.setItem("height",[]); 
				
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
$bfColor:#ffffff;
$activeColor:#546686;
	.demandDetail{
		width: 1200px;
		padding: 26px 20px;
		background: #FFFFFF;
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
					color: #f76c0f !important;
					font-size: 14px;
					margin-right: 30px;
				}
				.toolsBox{
					float: right;
					margin-top: 10px;
				    &:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
					
					span{
						/*position: absolute;*/
						width: 80px;
						float: right;
						height: 30px;
						line-height: 30px;
						color: #535353;
						cursor: pointer;
						font-size: 14px;
						
						
						/*img{
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
						}*/
					}
					.offlineBtn,.editBtn,.deleteBtn{
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
					
					.cancelBtn{
						img{
							margin-right: 10px;
							margin-top: 8px;
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
					.collectBtn{
						width: 80px;
						height: 30px;
						line-height: 30px;
						color: #FFFFFF;
						text-align: center;
						display: inline-block;
						background: url(../../assets/img/demand/icon008.png) no-repeat;
						img{
							margin-bottom: 3px;
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
						     background: url(../../assets/img/demand/icon004.png) no-repeat center;
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
							background: url(../../assets/img/demand/bg21.png) no-repeat;
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
			.pub-wrap{
				margin-bottom: 20px;
				p{
					height: 50px;
					line-height: 50px;
					text-align: left;
				}
			}
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
					background: url(../../assets/img/demand/icon10.png) no-repeat left center;
				}
				.down{
					float: right;
					padding-left: 25px;
					color: $activeColor;
					cursor: pointer;
					background: url(../../assets/img/demand/icon11.png) no-repeat left center;
				}
			}
			.detail-wrap{
				position: relative;
				
				background: #FFFFFF;
				
				height: 100px;
				overflow: hidden;
				ul{
					width:1160px;
					overflow: hidden;
					li{
						margin-top: 15px;
						&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
						.wrap-left{
							float: left;
							/*margin-right: 14px;*/
							
						}
						p{
							width: 1080px;
							color: #8c8c8c;
							float: right;
							text-align: justify;
							em{
								float: left;
								margin-right: 10px;
							}
						}
					}
				}
				.meng{
					width: 100%;
					height: 100px;
					position: absolute;
					top: 0; left: 0;
					z-index: 1;
					 background-image: linear-gradient(rgba(255,255,255,0),rgba(255,255,255,1));
					 background-image: -webkit-linear-gradient(rgba(255,255,255,0),rgba(255,255,255,1));
					background-image: -o-linear-gradient(rgba(255,255,255,0),rgba(255,255,255,1));
					background-image: -moz-linear-gradient(rgba(255,255,255,0),rgba(255,255,255,1));
				}
				
			}
			.border_bottom{
				padding-bottom: 30px;
				border-bottom: 1px solid #E0E0E0;
			}
			.applicant-wrap{
				padding-top: 40px;
				&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
				.A-title{
					height: 42px;
					line-height: 42px;
					font-size: 18px;
					span{
						float: left;
					}
					.submitApp{
						margin-left: 15px;
						width: 120px;
						height: 42px;
						line-height: 42px;
						text-align: center;
						color: #FFFFFF;
						display: inline-block;
						cursor: pointer;
						background: url(../../assets/img/demand/icon011.png) no-repeat;
						&:hover{
							
						}
					}
				}
				.content-applicant{
					padding-left: 40px;
					border: none;
					margin-top: 10px;
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
							>p{
								float: left;
								min-width: 112px;
								/*height: 30px;*/
								color: $activeColor;
							}
							span{
								float: left;
								/*width: 100%;*/
								min-width: 112px;
								height: 30px;
								line-height: 30px;
								
								
								
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
						     background: url(../../assets/img/demand/icon004.png) no-repeat center;
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
							background: url(../../assets/img/demand/bg21.png) no-repeat;
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
							background: url(../../assets/img/demand/icon005.png) no-repeat left center;
						}
						
					}
					.stateNone{
						border: none;
						color: $activeColor;
						padding-left: 28px;
						background: url(../../assets/img/demand/icon53.png) no-repeat left center;
						cursor: pointer;
						margin-top: 20px;
						display: inline-block;
					}
					.disabled{
						padding-left: 28px;
						margin-top: 20px;
						background: url(../../assets/img/demand/icon53.png) no-repeat left center;
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
							     background: url(../../assets/img/demand/icon004.png) no-repeat center;
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
								background: url(../../assets/img/demand/bg21.png) no-repeat;
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