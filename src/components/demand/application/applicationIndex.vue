<template>
	<div class="applicationIndex">
		<div class="table-bar">
			<p v-for="(item,$index) in tabbarInfo"  @click="switchTab($index)" :class="[{'activeBar':active==$index},{'unactiveBar':active!=$index}]">
				<img :src="item.pic1" />
				<img :src="item.pic2" />
				{{item.txt}}
			</p>
		</div>
		<div class="demandList">
        	<ul v-if="tab.aa[0]">
        		<li class="stateNone" v-if="!have.value[0]">此处暂无数据</li>
        		<li v-for="(item,$index) in applicationInfo" v-if="have.value[0]">
        			<h3>
        				<router-link :to="{name:'ApplicationDetail',query:{id:item.id}}">{{item.name}}</router-link>
        				
						<span @click="toWithdraw(item.id)" v-if="!item.coIntention">
							<img src="../../../assets/img/demand/icon54.png" />
							<img src="../../../assets/img/demand/icon55.png" />
							撤回申请
						</span>
						<span @click="toReturn(item.id)" v-if="item.coIntention">
							<img src="../../../assets/img/demand/icon56.png" />
							<img src="../../../assets/img/demand/icon57.png" />
							退回合作意向
						</span>
					</h3>
					<p>创建时间：{{item.complateTime}}</p>
					<!--编辑此需求的模态框 start-->
					<div id="modal-overlay" v-bind:class="confirmWithdraw.valid[$index]" v-if="!item.coIntention">
						<div class="detail-wrap">
							<h5></h5>
							<span class="modalChaBtn" @click="closeModal(item.id)"></span>
							<p>确认撤回对该需求的申请吗？</p>
							
							<div class="confirmBtn" @click="cfmWithdraw(item.id)">
								确认撤回
							</div>
						</div>
					</div>
					<!--确认下线的模态框 start-->
					<div id="modal-overlay" v-bind:class="confirmReturn.valid[$index]" v-if="item.coIntention">
						<div class="detail-wrap">
							<h5></h5>
							<span class="modalChaBtn" @click="closeModal(item.id)"></span>
							<p>是否退回对发布方的合作意向</p>
							<div class="confirmBtn" @click="cfmReturn(item.id)">
								确认退回
							</div>
						</div>
					</div>
        		</li>
        	</ul>
        	<ul v-if="tab.aa[1]">
        		<li class="stateNone" v-if="!have.value[1]">此处暂无数据</li>
        		<li v-for="(item,$index) in applicationInfo	" v-if="have.value[1]">
        			<h3 class="unvalidName">
        				<router-link :to="{name:'ApplicationDetail',query:{id:item.id}}">{{item.name}}</router-link>
					<span @click="toWithdraw(item.id)" v-if="!item.coIntention">
						<img src="../../../assets/img/demand/icon54.png" />
						<img src="../../../assets/img/demand/icon55.png" />
						撤回申请
					</span>
					<span @click="toReturn(item.id)" v-if="item.coIntention">
						<img src="../../../assets/img/demand/icon56.png" />
						<img src="../../../assets/img/demand/icon57.png" />
						退回合作意向
					</span>
				</h3>
				<p>创建时间：{{item.complateTime}}</p>
				<!--编辑此需求的模态框 start-->
				<div id="modal-overlay" v-bind:class="confirmWithdraw.unvalid[$index]" v-if="!item.coIntention">
					<div class="detail-wrap">
						<h5></h5>
						<span class="modalChaBtn" @click="closeModal(item.id)"></span>
						<p>确认撤回对该需求的申请吗？</p>
						<div class="confirmBtn" @click="cfmWithdraw(item.id)">
							确认撤回
						</div>
					</div>
				</div>
				<!--确认下线的模态框 start-->
				<div id="modal-overlay" v-bind:class="confirmReturn.unvalid[$index]" v-if="item.coIntention">
					<div class="detail-wrap">
						<h5></h5>
						<span class="modalChaBtn" @click="closeModal(item.id)"></span>
						
						<p>是否退回对发布方的合作意向</p>
						<div class="confirmBtn" @click="cfmReturn(item.id)">
							确认退回
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
		name:"applicationIndex",
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
		        
		        confirmWithdraw:{valid:[],unvalid:[]},//模态框类名数组
		        confirmReturn:{valid:[],unvalid:[]},//确认下线的模态框
			}
		},
		computed:mapState({
		  demandInfo:state=>state.demand.demandInfo/*获取vuex数据*/,
		  unvalidInfo:state=>state.demand.unvalidInfo,
		  applicationInfo:state=>state.demand.applicationInfo,
		}),
		mounted(){
			if(this.applicationInfo.length!=0){
				Vue.set(this.have.value,[0],true)
//				console.log(this.have.value)
			}else{
				Vue.set(this.have.value,[0],false)
			};//判断有效需求里面有没有数据
			
			if(this.applicationInfo.length!=0){
				Vue.set(this.have.value,[1],true)
//				console.log(this.have.value)
			}else{
				Vue.set(this.have.value,[1],false)
			};//判断无效需求里面有没有数据；
			
			for(let i=0;i<this.applicationInfo.length;i++){
				console.log(this.applicationInfo[i].id)
				
				this.confirmWithdraw.valid.push("validConfirmWithdraw"+this.applicationInfo[i].id);
				this.confirmReturn.valid.push("validConfirmReturn"+this.applicationInfo[i].id);
			}
			for(let j=0;j<this.applicationInfo.length;j++){
				
				this.confirmWithdraw.unvalid.push("unvalidConfirmWithdraw"+this.applicationInfo[j].id);
				this.confirmReturn.unvalid.push("unvalidConfirmReturn"+this.applicationInfo[j].id);
			}
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
			toWithdraw(id){
				var validWithdraw = "validConfirmWithdraw"+id;
				var unvalidWithdraw = "unvalidConfirmWithdraw"+id;
				Modal.makeText($("."+validWithdraw));
				Modal.makeText($("."+unvalidWithdraw));
			},
			cfmWithdraw(id){
				
				for(var i=0;i<this.applicationInfo.length;i++){//删除撤回申请的
					if(id==this.applicationInfo[i].id){
						this.applicationInfo.splice(i,1);
					}
				}
				//删除后重新push模态框类名的数组
				this.confirmWithdraw.valid=[];
				this.confirmWithdraw.unvalid=[];
				this.confirmReturn.valid = [];
				this.confirmReturn.unvalid = [];
				for(let i=0;i<this.applicationInfo.length;i++){
					console.log(this.applicationInfo[i].id)
					
					this.confirmWithdraw.valid.push("validConfirmWithdraw"+this.applicationInfo[i].id);
					this.confirmReturn.valid.push("validConfirmReturn"+this.applicationInfo[i].id);
				}
				for(let j=0;j<this.applicationInfo.length;j++){
					
					this.confirmWithdraw.unvalid.push("unvalidConfirmWithdraw"+this.applicationInfo[j].id);
					this.confirmReturn.unvalid.push("unvalidConfirmReturn"+this.applicationInfo[j].id);
				}
				this.closeModal(id);
//				router.push({name:"modifyDraft",params:{id:id}});
			},
			toReturn(id){
				var validReturn = "validConfirmReturn"+id;
				var unvalidReturn = "unvalidConfirmReturn"+id;
				Modal.makeText($("."+validReturn));
				Modal.makeText($("."+unvalidReturn));
			},
			cfmReturn(id){
				for(var i=0;i<this.applicationInfo.length;i++){
					if(id==this.applicationInfo[i].id){
						this.applicationInfo.splice(i,1);
					}
				}
				//删除后重新push模态框类名的数组
				this.confirmWithdraw.valid=[];
				this.confirmWithdraw.unvalid=[];
				this.confirmReturn.valid = [];
				this.confirmReturn.unvalid = [];
				for(let i=0;i<this.applicationInfo.length;i++){
					console.log(this.applicationInfo[i].id)
					
					this.confirmWithdraw.valid.push("validConfirmWithdraw"+this.applicationInfo[i].id);
					this.confirmReturn.valid.push("validConfirmReturn"+this.applicationInfo[i].id);
				}
				for(let j=0;j<this.applicationInfo.length;j++){
					
					this.confirmWithdraw.unvalid.push("unvalidConfirmWithdraw"+this.applicationInfo[j].id);
					this.confirmReturn.unvalid.push("unvalidConfirmReturn"+this.applicationInfo[j].id);
				}
				this.closeModal(id);
			},
			closeModal(id){
				var validWithdraw = "validConfirmWithdraw"+id;
				var unvalidWithdraw = "unvalidConfirmWithdraw"+id;
				var validReturn = "validConfirmReturn"+id;
				var unvalidReturn = "unvalidConfirmReturn"+id;
				
				Modal.closeModal($("."+validWithdraw))
				Modal.closeModal($("."+unvalidWithdraw))

				Modal.closeModal($("."+validReturn))
				Modal.closeModal($("."+unvalidReturn))
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
$activeColor:#546686;
$bfColor:#ffffff;
.applicationIndex{
	width: 940px;
	min-height: 410px;
	padding: 25px 20px;
	float: left;
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
					text-align: center;
					color: #535353;
					cursor: pointer;
					font-size: 14px;
					&:last-child{
						margin-right: 20px;
					}
					
					img{
						margin-right: 10px;
						margin-top: 9px;
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