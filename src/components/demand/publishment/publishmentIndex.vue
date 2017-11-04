<template>
	<div class="publishmentIndex">
		<div class="table-bar">
			<p v-for="(item,$index) in tabbarInfo"  @click="switchTab($index)" :class="[{'activeBar':active==$index},{'unactiveBar':active!=$index}]">
				<img :src="item.pic1" />
				<img :src="item.pic2" />
				{{item.txt}}
			</p>
		</div>
		<!--<div v-if="!have.value" class="demandList">
        	<p class="stateNone">(此处暂无需求)</p>
        </div>-->
        <div class="demandList">
        	<ul v-if="tab.aa[0]">
        		<li class="stateNone" v-if="!have.value[0]">此处暂无数据</li>
        		<li v-for="(item,$index) in demandInfo" v-if="have.value[0]">
        			<h3>
        				<router-link :to="{name:'publishmentDetail',query:{id:item.id}}">{{item.name}}</router-link>
        				
						<span @click="toDelete(item.id)" v-if="!haveAuditStatus[$index]">
							<img src="../../../assets/img/demand/icon50.png" />
							<img src="../../../assets/img/demand/icon51.png" />
							下线
						</span>
						<span @click="toModify(item.id)" v-if="!haveAuditStatus[$index]">
							<img src="../../../assets/img/demand/icon3.png" />
							<img src="../../../assets/img/demand/icon1.png" />
							编辑
						</span>
						<em class="auditStatus" v-if="haveAuditStatus[$index]">{{auditStatusTxt[$index]}}</em>
					</h3>
					<p>创建时间：{{item.complateTime}}</p>
				<!--编辑此需求的模态框 start-->
					<div id="modal-overlay" v-bind:class="confirmModify.valid[$index]">
						<div class="detail-wrap">
							<h5></h5>
							<span class="modalChaBtn" @click="closeModal(item.id)"></span>
							<p>进入编辑状态后，该需求将在需求中心下线。</p>
							<p>且编辑后需等待管理员审核通过后才可再次进入需求重心。</p>
							<p>是否确认进入编辑？</p>
							<div class="confirmBtn" @click="cfmModify(item.id)">
								进入编辑
							</div>
						</div>
					</div>
				<!--确认下线的模态框 start-->
					<div id="modal-overlay" v-bind:class="confirmDelete.valid[$index]">
						<div class="detail-wrap">
							<h5></h5>
							<span class="modalChaBtn" @click="closeModal(item.id)"></span>
							<p>如您确认进行下线操作，该需求将在需求中心下线。</p>
							<p>您可在  "我的发布"——"无效需求"  中进行查看。</p>
							<div class="confirmBtn" @click="cfmDeleteValid(item.id)">
								确认下线
							</div>
						</div>
					</div>
        		</li>
        	</ul>
        	<ul v-if="tab.aa[1]">
        		<li class="stateNone" v-if="!have.value[1]">此处暂无数据</li>
        		<li v-for="(item,$index) in unvalidInfo" v-if="have.value[1]">
        			<h3 class="unvalidName">
        				<router-link :to="{name:'publishmentDetail',query:{id:item.id}}">{{item.name}}</router-link>
					<span @click="toDelete(item.id)">
						<img src="../../../assets/img/demand/delete-black.png" />
						<img src="../../../assets/img/demand/icon49.png" />
						删除
					</span>
					<span @click="toModify(item.id)">
						<img src="../../../assets/img/demand/icon3.png" />
						<img src="../../../assets/img/demand/icon1.png" />
						编辑
					</span>
				</h3>
				<p>创建时间：{{item.complateTime}}</p>
				<!--编辑此需求的模态框 start-->
				<div id="modal-overlay" v-bind:class="confirmModify.unvalid[$index]">
					<div class="detail-wrap">
						<h5></h5>
						<span class="modalChaBtn" @click="closeModal(item.id)"></span>
						<p>您可对该无效需求进行重新编辑，并重新提交审核。</p>
						<div class="confirmBtn" @click="cfmModify(item.id)">
							进入编辑
						</div>
					</div>
				</div>
				<!--确认下线的模态框 start-->
				<div id="modal-overlay" v-bind:class="confirmDelete.unvalid[$index]">
					<div class="detail-wrap">
						<h5></h5>
						<span class="modalChaBtn" @click="closeModal(item.id)"></span>
						<p>是否确认删除该需求？</p>
						<div class="confirmBtn" @click="cfmDeleteUnvalid(item.id)">
							确认删除
						</div>
					</div>
				</div>
        		</li>
        	</ul>
        </div>
	</div>
</template>

<script>
	import Vue from "vue"
	import {mapState} from "vuex"
	import Modal from "../../../assets/js/modal.js"
	import router from '../../../router'
	
	export default{
		name:"publishmentIndex",
		data:function(){
			return{
				tabbarInfo:[
		        	{txt:"有效需求",pic1:require("../../../assets/img/demand/valid-gray.png"),
		        	pic2:require("../../../assets/img/demand/valid-blackblue.png"),
		        	},
		        	{txt:"无效需求",pic1:require("../../../assets/img/demand/unvalid-gray.png"),
		        	    pic2:require("../../../assets/img/demand/unvalid-blackblue.png"),
		        	}
		        ],
		        have:{value:[true,false]},//有无需求数据的状态控制
		        active:0,//默认的活动bar
		        tab:{aa:[true,false]},//默认现实的列表
		        confirmModify:{valid:[],unvalid:[]},//模态框类名数组
		        confirmDelete:{valid:[],unvalid:[]},//确认下线的模态框
		        auditStatusTxt:[],//审核状态的文字
		        haveAuditStatus:[],//正在审核与否 有无编辑按钮
			}
		},
		computed:mapState({
		  demandInfo:state=>state.demand.demandInfo/*获取vuex数据*/,
		  unvalidInfo:state=>state.demand.unvalidInfo,
		  draftInfo:state=>state.demand.draftInfo,/*获取vuex数据   需求草稿的数据*/
		}),
		mounted(){
			
			if(this.demandInfo.length!=0){
				Vue.set(this.have.value,[0],true)
//				console.log(this.have.value)
			}else{
				Vue.set(this.have.value,[0],false)
			};//判断有效需求里面有没有数据
			
			if(this.unvalidInfo.length!=0){
				Vue.set(this.have.value,[1],true)
//				console.log(this.have.value)
			}else{
				Vue.set(this.have.value,[1],false)
			};//判断无效需求里面有没有数据；
//			this.confirmModify.valid = [];
//			this.confirmDelete.valid = [];
//			this.confirmModify.unvalid = [];
//			this.confirmDelete.unvalid = [];
			for(let i=0;i<this.demandInfo.length;i++){
//				console.log(this.demandInfo[i].id)
				
				this.confirmModify.valid.push("validConfirmModify"+this.demandInfo[i].id);
				this.confirmDelete.valid.push("validConfirmDelete"+this.demandInfo[i].id);
				//判断审核状态
				if(this.demandInfo[i].auditStatus=="0"){
					this.auditStatusTxt.push("需求正在审核中");
					this.haveAuditStatus.push(true);
				}else if(this.demandInfo[i].auditStatus=="1"){
					this.auditStatusTxt.push("");
					this.haveAuditStatus.push(false);
				}
			}
//			console.log(this.auditStatusTxt)
			for(let j=0;j<this.unvalidInfo.length;j++){
				
				this.confirmModify.unvalid.push("unvalidConfirmModify"+this.unvalidInfo[j].id);
				this.confirmDelete.unvalid.push("unvalidConfirmDelete"+this.unvalidInfo[j].id);
			}
//			console.log(this.confirmModify.unvalid)
			
			
			
		},
		
		methods:{
			switchTab(index){
				this.active = index;


	    		for(var i = 0 ; i < this.tabbarInfo.length;i++){
	    			if(i!=index){
	    				Vue.set(this.tab.aa,[i],false)
	    			}else{
		    			Vue.set(this.tab.aa,[index],true)
		    		}
	    		}
			},
			toModify(id){
				var validModify = "validConfirmModify"+id;
				var unvalidModify = "unvalidConfirmModify"+id;
				Modal.makeText($("."+validModify));
				Modal.makeText($("."+unvalidModify));
			},
			cfmModify(id){
				for(var i=0;i<this.demandInfo.length;i++){
					if(id==this.demandInfo[i].id){
						this.demandInfo[i].auditStatus = "2";//有效需求下线进入需求草稿。
						console.log(this.draftInfo)
						this.draftInfo.push(this.demandInfo[i])
						this.demandInfo.splice(i,1);
						break;
					}
				}
				console.log(this.demandInfo)
				for(var i=0;i<this.unvalidInfo.length;i++){
					if(id==this.unvalidInfo[i].id){
						this.unvalidInfo[i].auditStatus = "2";//无效需求进入需求草稿。
						this.draftInfo.push(this.unvalidInfo[i])
						this.unvalidInfo.splice(i,1);
						break;
					}
				}
				this.closeModal();
				router.push({name:"modifyDraft",query:{id:id}});
			},
			toDelete(id){
				var validDelete = "validConfirmDelete"+id;
				var unvalidDelete = "unvalidConfirmDelete"+id;
				Modal.makeText($("."+validDelete));
				Modal.makeText($("."+unvalidDelete));
				
			},
			cfmDeleteValid(id){//下线有效需求到无效需求列表里
				
				for(var i=0;i<this.demandInfo.length;i++){
					if(id==this.demandInfo[i].id){
						let index = i;
						this.demandInfo[index].auditStatus = "2";
						this.demandInfo[index].haveOffLine = false;
						this.unvalidInfo.push(this.demandInfo[index])
						this.demandInfo.splice(i,1);
					}
				}
				
				console.log(this.unvalidInfo)
				//重新更新classname组
				this.confirmModify.valid = [];
				this.confirmDelete.valid = [];
				this.auditStatusTxt=[];
				this.haveAuditStatus=[];
				for(var i=0;i<this.demandInfo.length;i++){
					
					this.confirmModify.valid.push("validConfirmModify"+this.demandInfo[i].id);
					this.confirmDelete.valid.push("validConfirmDelete"+this.demandInfo[i].id);
					//重新判断审核状态
					if(this.demandInfo[i].auditStatus=="0"){
						this.auditStatusTxt.push("需求正在审核中");
						this.haveAuditStatus.push(true);
					}else if(this.demandInfo[i].auditStatus=="1"){
						this.auditStatusTxt.push("");
						this.haveAuditStatus.push(false);
					}
				}
				//重新更新classname组
				this.confirmModify.unvalid = [];
				this.confirmDelete.unvalid = [];
				for(let j=0;j<this.unvalidInfo.length;j++){
				
					this.confirmModify.unvalid.push("unvalidConfirmModify"+this.unvalidInfo[j].id);
					this.confirmDelete.unvalid.push("unvalidConfirmDelete"+this.unvalidInfo[j].id);
					
				}
				console.log(this.confirmModify.unvalid)
				
				if(this.unvalidInfo.length!=0){
					Vue.set(this.have.value,[1],true)
				}else{
					Vue.set(this.have.value,[1],false)
				};//再次判断无效需求里面有没有数据
				if(this.demandInfo.length!=0){
					Vue.set(this.have.value,[0],true)
	//				console.log(this.have.value)
				}else{
					Vue.set(this.have.value,[0],false)
				};//再次判断有效需求里面有没有数据
//				console.log(this.have.value)
				this.closeModal(id);
			},
			cfmDeleteUnvalid(id){//删除无效需求
				for(var i=0;i<this.unvalidInfo.length;i++){
					if(id==this.unvalidInfo[i].id){
						let index = i;
						this.unvalidInfo.splice(index,1)
					}
				}
				
				this.confirmModify.unvalid = [];
				this.confirmDelete.unvalid = [];
				for(var i=0;i<this.unvalidInfo.length;i++){
					this.confirmModify.unvalid.push("unvalidConfirmModify"+this.unvalidInfo[i].id);
					this.confirmDelete.unvalid.push("unvalidConfirmDelete"+this.unvalidInfo[i].id);
				}
				if(this.unvalidInfo.length!=0){
					Vue.set(this.have.value,[1],true)
	//				console.log(this.have.value)
				}else{
					Vue.set(this.have.value,[1],false)
				};//再次判断wu效需求里面有没有数据
				this.closeModal(id);
			},
			closeModal(id){
				var validModify = "validConfirmModify"+id;
				var unvalidModify = "unvalidConfirmModify"+id;
				var validDelete = "validConfirmDelete"+id;
				var unvalidDelete = "unvalidConfirmDelete"+id;
				
				Modal.closeModal($("."+validModify))
				Modal.closeModal($("."+unvalidModify))

				Modal.closeModal($("."+validDelete))
				Modal.closeModal($("."+unvalidDelete))
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
$activeColor:#546686;
$bfColor:#ffffff;
.publishmentIndex{
	width: 940px;
	padding: 25px 20px;
	background: $bfColor;
	border-radius: 5px;
	.table-bar{
		width: 316px;
		overflow: hidden;
		border-bottom: 1px solid #E0E0E0;
		
		p{
			float: left;
			width: 158px;
			height: 44px;
			line-height: 44px;
			text-align: left;
			border-bottom: 2px solid $bfColor;
			cursor: pointer;
			img{
				margin: 15px 13px 15px 35px;
				width: 17px; height: 17px;
				float: left;
				
				&:first-child{
					display: none;
				}
				&:last-child{
					display: block;
				}
			}

			&.activeBar{
				color: $activeColor;
				border-bottom: 2px solid $activeColor;
				img:first-child{
						display: none;
					}
				img:last-child{
					display: block;
				}
			}
			&.unactiveBar{
				color: #b3b3b3;
				
				img:first-child{
						display: block;
					}
				img:last-child{
					display: none;
				}
			}
		}
	}
	.demandList{
		margin-top: 10px;
		margin-bottom: 30px;
		
		li{
			padding:20px 0;
			border-bottom: 1px solid #E0E0E0;
			.unvalidName{
					color: #787878 !important;
				}
			h3{
				height: 34px;
				line-height: 34px;
				text-align: left;
				font-size: 18px;
				color: $activeColor;
				position: relative;
				
				a{
					float:left;
					color: $activeColor;
				}
				span{
					/*position: absolute;*/
					float: right;
					height: 34px;
					line-height: 34px;
					color: #535353;
					cursor: pointer;
					font-size: 14px;
					&:last-child{
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
				.auditStatus{
					float: right;
					color: #f77718;
					height: 34px;
					line-height: 34px;
					font-size: 14px;
				}
			}
			p{
				color: #858585;
			}
		}
		.stateNone{
			border-bottom: none;
			padding-left: 50px;
			color: #858585;
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
</style>