<template>
	<div class="comProDetail">
		<h3 class="c-title"><span>{{title}}</span></h3>
		<span class="editBtn" @click="overlayA">编辑项目信息</span>
		<!--模态框 修改自己添加的项目-->
		<div id="modal-overlay" class="modal-a"> 
			<div class="editCfr">
				<h5></h5>
				<span class="modalChaBtn" @click="closeModalA"></span>
				<div class="content-wrap">
					<p>您正在尝试编辑您已经添加过的项目信息</p>
					<p>如您修改其中内容，已添加过的该项目信息也会随之变化</p>
					<div class="btnBox">
						<span class="cancelBtn" @click="closeModalA">取消</span>
						<span class="confirmBtn" @click="closeModalA">确认</span>
					</div>
				</div>
			</div>
		</div>
		<!--模态框 修改自己添加的项目-->
		<ul class="proInfo">
			<li class="proName">
				<p><span>项目名称</span><span class="">{{project.proName}}</span></p>
			</li>
			<li class="proPlace">
				<p><span>项目地点</span><span class="">{{project.proPlace}}</span></p>
			</li>
			<li class="proState">
				<p><span>项目状态</span><span class="">{{project.proState}}</span></p>
			</li>
			<li class="proTime">
				<p><span>建成时间</span><span class="">{{project.compalteTime_E}}</span></p>
			</li>
			<li class="proFunc">
				<p><span>建筑功能</span><span class="">{{project.proFunc}}</span></p>
			</li>
			<li class="proDesc">
				<p>
					<span>项目描述</span>
					<span class="">{{project.proDesc}}
					</span>
				</p>
			</li>
			<li>
				<p>
					<span>项目图片</span>
					<span>
						<img src="../../../assets/img/company/img.png" />
						<img src="../../../assets/img/company/img.png" />
						<img src="../../../assets/img/company/img.png" />
						<img src="../../../assets/img/company/img.png" />
					</span>
				</p>
				
			</li>
		</ul>
		<div class="modifyTable">
			<p class="notice-wrap">
				<span class="modifyBtn" @click="modifyPro" v-if="!editShow">编辑</span>
			</p>
			<ul class="modify-table-wrap" v-if="editShow">
				<li class="time-wrap">
					<span class="table-wrap-left">* 参与时间</span>
					<datepicker class="datePicker" v-model="project.parTakeTime_S"></datepicker>
					<span class="heng"></span>
					<datepicker class="datePicker" v-model="project.parTakeTime_E"></datepicker>
				</li>
				<li class="duty-wrap">
					<span class="table-wrap-left">* 公司职责</span>
					<input type="text" placeholder="请输入公司在项目中所属职位" maxlength="30"  v-model="project.takeOffice"/>
					<p class="limit-words"><span >{{dutycont}}</span><span>/30</span></p>
				</li>
				<li class="detail-wrap">
					<span class="table-wrap-left">详细描述</span>
					<textarea  maxlength="500" placeholder="请输入项目详细描述文案..." v-model="project.detailDes"></textarea>
					<p class="limit-words"><span >{{detailcont}}</span><span>/500</span></p>
					
				</li>
				<li class="img-wrap">
					<span class="table-wrap-left">图片展示</span>
					<ul class="img-show">
						<li v-for="" class="imgBox"><img src=""/><span class="closeImg"></span>
						</li>
						<div class="uploadBtn">
							<input type="file" class=""/>
							<img src="../../../assets/img/company/top.png" />
							<span>请上传图片</span>
						</div>
					</ul>
					
				</li>
			</ul>
			<ul class="no-modify-table-wrap" v-if="!editShow">
				<li class="time-wrap">
					<span class="table-wrap-left">* 参与时间</span>
					<span>{{project.parTakeTime_S}}</span>
					<span class="heng"></span>
					<span>{{project.parTakeTime_E}}</span>
				</li>
				<li class="duty-wrap">
					<span class="table-wrap-left">* 公司职责</span>
					<p>{{project.takeOffice}}</p>
					
				</li>
				<li class="detail-wrap">
					<span class="table-wrap-left">详细描述</span>
					<p>{{project.detailDes}}</p>
					
					
				</li>
				<li class="img-wrap">
					<span class="table-wrap-left">图片展示</span>
					<ul class="img-show">
						<li v-for="" class="imgBox"><img src="../../../assets/img/company/img.png"/><span class="closeImg"></span>
						</li>
						<li  class="imgBox"><img src="../../../assets/img/company/img.png"/><span class="closeImg"></span>
						</li>
						<li  class="imgBox"><img src="../../../assets/img/company/img.png"/><span class="closeImg"></span>
						</li>
					</ul>
					
				</li>
			</ul>
		</div>
		<div class="btnBox">
			<!--<router-link to="/company/companyProject/index">-->
			<span class="saveBtn" @click="saveModify">保存</span>
			<!--</router-link>-->
			<span class="cancelBtn" @click="cancelModify">取消</span>
		</div>
	</div>
</template>

<script>
	import {mapState} from "vuex"
	import 	Modal from "../../../assets/js/modal.js"
	import Datepicker from "../units/Datepicker.vue"
	import router from "../../../router"
	export default {
	    name:"comProDetail",
	    components:{
	      Datepicker
	    },
	    data:function(){
	      return {
	        title:"公司项目信息",
	        state:"",
	        editShow:false,
	        dutytext:"",
	        dutycont:'0',
	        detailtext:"",
	        detailcont:'0',
	        proInfos:[],
	        project:{},/*由项目主页点击进去的相应项目*/
	        id:"",
	        compalteTime:[],
	        parTakeTime:[],
	        
	      }
	    },
	    
	    computed:mapState({
		  companyProInfo:state=>state.company.companyMessage.companyProInfo/*获取vuex数据*/
		}),
		create(){
			
		},
		mounted(){
			$(document.body).css("overflow","scroll");
			var str = JSON.stringify(this.companyProInfo);
    		var data = JSON.parse(str);
    		this.proInfos = data;/*获取vuex里面所有项目信息*/
    		
			
	    	this.id = this.$route.query.id;
	    	console.log(this.id)
	    	for(var i=0;i<this.proInfos.length;i++){
	    		if(this.proInfos[i].id == this.id){
	    			
	    			this.project = this.proInfos[i];
	    		}
	    	}
	    	

			
	    },
	    methods:{
	    	textcount(){
	    		
	    	},
	    	overlayA(){
	    		var modal = $('.modal-a')
				Modal.makeText(modal)
			},
			closeModalA(){
				var modal = $('.modal-a')
				Modal.closeModal(modal)
			},
			modifyPro(){
				this.editShow = true;
			},
			saveModify(){
				var str = JSON.stringify(this.project);
				var data = JSON.parse(str);
				this.companyProInfo[this.index-1] = data;/*将修改过得数据放在vuex里*/
				this.editShow = false;
				router.push("/yhzx/company/info/companyProject/index")
				
			},
			cancelModify(){
				console.log(55)
				router.push("/yhzx/company/info/companyProject/index")
			}
	    },
	    
	    updated(){
	    	var num1 = this.project.takeOffice.length;
	    	this.dutycont = num1;
	    	var num2 = this.project.detailDes.length;
	    	this.detailcont = num2;
	    	
//	    	console.log(this.companyProInfo[0])
	    	
	    },
	    
   }
</script>

<style lang="scss" scoped="scoped">
$bfColor:#f7f9fc;
$activeColor: #2eb3cf;
.comProDetail{
	width:940px; 
	padding: 40px;
	overflow: hidden;
	position: relative;
	.editBtn{
		height: 18px;
		line-height: 18px;
		padding-left: 25px;
		color: $activeColor;
		background: url(../../../assets/img/company/edit2.png) no-repeat left center;
		position: absolute;
		right: 40px; top: 40px;
		cursor: pointer;
	}
	.editCfr{
		width: 549px;
		overflow: hidden;
	    position:absolute;top:50%;left:50%; 
		transform:translate(-50%,-50%);
		-webkit-transform:translate(-50%,-50%);
		-moz-transform:translate(-50%,-50%);
		-ms-transform:translate(-50%,-50%);
		-o-transform:translate(-50%,-50%);
	    background: #FFFFFF;
	    border-radius: 10px;
	    text-align: center;
	    h5{
		     color:$activeColor;
		     font-size: 18px;
		     height: 50px;
		     line-height: 50px;
		     text-align: left;
		     background: $bfColor;
		     padding: 0 40px;
		     
		}
		.modalChaBtn{
		     width: 20px;
		     height: 20px;
		     background: url(../../../assets/img/company/Close3.png) no-repeat center;
		     position: absolute;
		     top: 16px;
		     right: 40px;
		     cursor: pointer;
	     }
	    .content-wrap{
	     	width: 100%;
	     	padding-top: 82px;
	     	padding-bottom: 100px;
	     	overflow: hidden;
	     	p{
	     		height: 30px;
	     		line-height: 30px;
	     		font-size: 18px;
	     		color: $activeColor;
	     		text-align: center;
	     		
	     	}
	     	.btnBox{
				height: 40px;
				width: 330px;
				float: left;
				display: flex;
				justify-content: space-between;
				overflow: hidden;
				margin-top: 60px;
				margin-left: 130px;
				span{
					float: left;
					/*margin-right: 50px;*/
					width: 140px;
					height: 40px;
					line-height: 40px;
					text-align: center;
					vertical-align: middle;
					font-size: 18px;
					border-radius: 5px;
					cursor: pointer;
			
					&.cancelBtn{
						border: 1px solid #bfcbd9;
			
						&:hover{
							border: 1px solid $activeColor;
							color: $activeColor;
						}
					}
					&.confirmBtn{
						display: block;
						background: url(../../../assets/img/company/rectangle06.png) no-repeat center;
						color: #FFFFFF;
						&:hover{
							filter:alpha(opacity=80);       /* IE */
						  -moz-opacity:0.8;              /* 老版Mozilla */
						  -khtml-opacity:0.8;              /* 老版Safari */
						   opacity: 0.8;           /* 支持opacity的浏览器*/
						}
					}
				}
			}
	    }
	}
	.proInfo{
		padding: 30px 20px;
		width:100%;
		border-bottom: 1px solid $activeColor;
		li{
			width: 100%;
			margin-bottom: 20px;
			&:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;} 
			
			&:last-child{
				margin-bottom: 0;
				
			}
			p{
				overflow: hidden;
				
				span{
					float: left;
					display: inline-block;
					&:first-child{
						margin-right: 30px;
						color: rgb(102,102,102);
						
					}
					&:last-child{
						width: 720px;
						color: rgb(53,53,53);
						text-align: justify;
						img{
							width: 160px; height: 100px;
							display: block;
							margin-right: 15px;
							margin-bottom: 15px;
							float:left; 
							&:nth-child(4n){
								margin-right: 0;
							}
						}
					}
					
				}
			}
			
		}
	}
	.btnBox{
		
		height: 33px;
		overflow: hidden;
		float: left;
		margin-top: 30px;
		margin-left: 130px;
		span{
			width: 117px;
			height: 33px;
			line-height: 33px;
			float: left;
			margin-right: 30px;
			text-align: center;
			border-radius: 5px;
			cursor: pointer;
			&.cancelBtn{
			border: 1px solid #bfcbd9;

			&:hover{
				border: 1px solid $activeColor;
				color: $activeColor;
			}
		}
		&.saveBtn{
			background-image: url("../../../assets/img/company/rectangle06.png") ;
			color: #FFFFFF;
			&:hover{
				filter:alpha(opacity=80);       /* IE */
			  -moz-opacity:0.8;              /* 老版Mozilla */
			  -khtml-opacity:0.8;              /* 老版Safari */
			   opacity: 0.8;           /* 支持opacity的浏览器*/
			}
		}
		}
	}
	.modifyTable{
		padding: 20px;
		.notice-wrap{
			min-height: 20px;
			&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
			.notice{
				float: left;
				color: rgb(171,171,171);
			}
			.modifyBtn{
				height: 18px;
				line-height: 18px;
				padding-left: 25px;
				color: $activeColor;
				background: url(../../../assets/img/company/edit2.png) no-repeat left center;
				float: right;
				cursor: pointer;
			}
		}
		
		.modify-table-wrap,.no-modify-table-wrap{
			.table-wrap-left{
				color: $activeColor;
				margin-right: 30px !important;
				float: left;
			}
			li{
				margin-top: 20px;
				&:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;} 
				
				&.time-wrap{
					height: 35px;
					line-height: 35px;
					.datePicker{
						float: left;
						width: 140px;
						margin-right: 20px;
					}
					.heng{
						display: inline-block;
						vertical-align: middle;
						height: 2px;
						width: 20px;
						float: left;
						background: #333333;
						/*margin-right: 20px;*/
						margin-top: 16px;
					}
					span{
						float: left;
						margin-right: 20px;
						
					}
				}
				&.duty-wrap{
					color: rgb(167,167,167);
					position: relative;
					height: 35px;
					line-height: 35px;
					input{
						width: 480px;
						height: 35px;
						border: 1px solid #EBEBEB;
						border-radius: 5px;
						text-indent: 8px;
						color: #353535;
						float: left;
					}
					.limit-words{
						position: absolute;
						bottom: 0px;
						left:600px ;
					}
					p{
						color: #353535;
					}
				}
				&.detail-wrap{
					color: rgb(167,167,167);
					position: relative;
					overflow: hidden;
					padding-left: 10px;
					.table-wrap-left{
						float: left;
					}
					textarea{
						float: left;
						width: 480px;
						height: 200px;
						line-height: 24px;
						border: 1px solid #EBEBEB;
						border-radius: 5px;
						text-indent: 15px;
						border-radius: 5px;
						color: #353535;
						text-align: justify;
						padding: 0 5px;
					}
					.limit-words{
						position: absolute;
						bottom:0px;
						left:600px ;
					}
					p{
						width: 480px;
						float: left;
						line-height: 24px;
						text-align: justify;
						color: #353535;
					}
				}
				&.img-wrap{
					/*height: 100px;
					line-height: 100px;*/
					padding-left: 10px;
					overflow: hidden;
					.table-wrap-left{
						float: left;
						margin-top: 40px;
					}
					.img-show{
						float: left;
						width: 685px;
						.imgBox{
							width: 160px; height: 100px;
							float: left;
							margin-right: 15px;
							margin-bottom: 20px;
							margin-top: 0;
							background: rgb(230,230,230);
							position: relative;
							cursor:pointer; 
							&:nth-of-child(4n){
								margin-right: 0;
							}
							.closeImg{
								width: 21px; height: 21px;
								position: absolute;
								top: 10px; right: 10px;
								background: url(../../../assets/img/company/Close2.png) no-repeat center;
								display: none;
							}
							&:hover{
								.closeImg{
									display: block;
								}
							}
						}
					}
					.uploadBtn{
						width: 100px;
						height: 100px;
						line-height: 100px;
						color: #a3a3a3;
						text-align: center;
						background: rgb(230,230,230);
						float: left;
						display: flex;
						flex-direction: column;
						justify-content:center;
						align-items: center;
						padding-top: 23px;
						padding-bottom: 22px;
						margin-left: 10px;
						cursor: pointer;
						position: relative;
						input{
							position: absolute;
							width: 100%;
							height: 100%;
							opacity: 0;
						}
						span{
							height: 14px;
							line-height: 14px;
							margin-top: 15px;
						}
					}
				}
			}
			
		}
	}
}

</style>