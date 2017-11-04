<template>
<div class="editProject">
	<h3 class="t-title"><span>{{title}}</span></h3>
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
					<img src="../../../assets/img/team/img_1_080.png" />
					<img src="../../../assets/img/team/img_2_080.png" />
					<img src="../../../assets/img/team/img_3_080.png" />
					<img src="../../../assets/img/team/img_4_080.png" />
				</span>
			</p>
			
		</li>
	</ul>
	<div class="modifyTable">
		<p class="notice">带*选项为必填项</p>
		<ul class="modify-table-wrap">
			<li class="time-wrap">
				<span class="table-wrap-left">* 参与时间</span>
				<datepicker class="datePicker" v-model="project.parTakeTime_S"></datepicker>
				<span class="heng"></span>
				<datepicker class="datePicker" v-model="project.parTakeTime_E"></datepicker>
			</li>
			<li class="duty-wrap">
				<span class="table-wrap-left">* 项目职责</span>
				<input type="text" placeholder="请输入公司在项目中所属职位" maxlength="30"  v-model="project.takeOffice"/>
				<p class="limit-words">{{dutycont}}/30</p>
			</li>
			<li class="detail-wrap">
				<span class="table-wrap-left">详细描述</span>
				<textarea  maxlength="500" placeholder="请输入项目详细描述文案..." v-model="project.detailDes"></textarea>
				<p class="limit-words">{{detailcont}}/500</p>
				
			</li>
			<li class="img-wrap">
				<span class="table-wrap-left">图片展示</span>
				<script type="text/template" id="qq-template-manual-trigger">
			        <div class="qq-uploader-selector qq-uploader" qq-drop-area-text="Drop files here">
			            <!--<div class="qq-total-progress-bar-container-selector qq-total-progress-bar-container">
			                <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-total-progress-bar-selector qq-progress-bar qq-total-progress-bar"></div>
			            </div>-->
			            <div class="qq-upload-drop-area-selector qq-upload-drop-area" qq-hide-dropzone>
			                <span class="qq-upload-drop-area-text-selector"></span>
			            </div>
			            <ul class="qq-upload-list-selector qq-upload-list" aria-live="polite" aria-relevant="additions removals">
			                <li>
			                    <div class="qq-progress-bar-container-selector">
			                        <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-progress-bar-selector qq-progress-bar"></div>
			                    </div>
			                    <span class="qq-upload-spinner-selector qq-upload-spinner"></span>
			                    <img class="qq-thumbnail-selector" qq-max-size="180" qq-server-scale>
			                    <span class="qq-upload-file-selector qq-upload-file"></span>
			                    <span class="qq-edit-filename-icon-selector qq-edit-filename-icon" aria-label="Edit filename"></span>
			                    <input class="qq-edit-filename-selector qq-edit-filename" tabindex="0" type="text">
			                    <span class="qq-upload-size-selector qq-upload-size"></span>
			                    <button type="button" class="qq-btn qq-upload-cancel-selector qq-upload-cancel"></button>
			                    <button type="button" class="qq-btn qq-upload-retry-selector qq-upload-retry">重试</button>
			                    <button type="button" class="qq-btn qq-upload-delete-selector qq-upload-delete">删除</button>
			                    <span role="status" class="qq-upload-status-text-selector qq-upload-status-text"></span>
			                </li>
			            </ul>
			            <div class="buttons">
			                <div class="qq-upload-button-selector qq-upload-button">
			                	
			                    <span>请上传图片</span>
			                </div>
			                <button type="button"  class="btn btn-primary" id="trigger-upload">
			                    	 提交
			                </button>
			            </div>
			            <span class="qq-drop-processing-selector qq-drop-processing">
			                <span>Processing dropped files...</span>
			                <span class="qq-drop-processing-spinner-selector qq-drop-processing-spinner"></span>
			            </span>
			            
			
			            <dialog class="qq-alert-dialog-selector">
			                <div class="qq-dialog-message-selector"></div>
			                <div class="qq-dialog-buttons">
			                    <button type="button" class="qq-cancel-button-selector">关闭</button>
			                </div>
			            </dialog>
			
			            <dialog class="qq-confirm-dialog-selector">
			                <div class="qq-dialog-message-selector"></div>
			                <div class="qq-dialog-buttons">
			                    <button type="button" class="qq-cancel-button-selector">No</button>
			                    <button type="button" class="qq-ok-button-selector">Yes</button>
			                </div>
			            </dialog>
			
			            <dialog class="qq-prompt-dialog-selector">
			                <div class="qq-dialog-message-selector"></div>
			                <input type="text">
			                <div class="qq-dialog-buttons">
			                    <button type="button" class="qq-cancel-button-selector">Cancel</button>
			                    <button type="button" class="qq-ok-button-selector">Ok</button>
			                </div>
			            </dialog>
			        </div>
			    </script>
			     <div id="fine-uploader-manual-trigger"></div>
			</li>
		</ul>
		
	</div>
	<div class="btnBox">
		<span class="saveBtn" @click="saveEdit">保存</span>
		<span class="cancelBtn"  @click="cancelEdit">取消</span>
	</div>

</div>

</template>
<script>
	require('../../../assets/js/lib/laydate/laydate.js')
	import {mapState} from "vuex"
	import 	Modal from "../../../assets/js/modal.js"
	import Datepicker from "../units/Datepicker.vue"
	import router from "../../../router"
	import qq from "fine-uploader"
	export default {
	    name:"editProject",
	    components:{
	      Datepicker
	    },
	    data:function(){
	      return {
	        title:"编辑团队参加项目信息",
	        state:"",
	        editSeniorShow:false,
	        dutytext:"",
	        dutycont:'0',
	        detailtext:"",
	        detailcont:'0',
	        proInfos:[],
	        project:{},
	        index:"",
	      }
	    },
	    computed:mapState({
		  teamProInfo:state=>state.team.teamMessage.teamProInfo/*获取vuex数据*/
		}),
		mounted(){
	    	var str = JSON.stringify(this.teamProInfo);
    		var data = JSON.parse(str);
    		this.proInfos = data;
	    	this.index = this.$route.params.id;
	    	for(var i=0;i<this.proInfos.length;i++){
	    		if(this.proInfos[i].id=this.proInfos[this.index].id){
	    			this.project = this.proInfos[i]
	    		}
	    	}
	    	
	    	console.log(this.project)
			//上传图片
			var manualUploader = new qq.FineUploader({
	            element: document.getElementById('fine-uploader-manual-trigger'),
	            template: 'qq-template-manual-trigger',
	            request: {
	                endpoint: '/server/uploads'
	            },
	            thumbnails: {
//	                placeholders: {
//	                    waitingPath: '../../../assets/js/units/fine-uploader/placeholders/waiting-generic.png',
//	                    notAvailablePath: '../../../assets/js/units/fine-uploader/placeholders/not_available-generic.png'
//	                }
	            },
	            validation: {
	                allowedExtensions: ['jpeg', 'jpg', 'gif', 'png'],
	                itemLimit: 5,
	                sizeLimit: 1500000
	            },
	            autoUpload: false,
	            debug: true,
	            callbacks:{
		        	onSubmit:  function(id,  fileName)  {
		        		$('#trigger-upload').show()
		        	},
		        	onComplete: function (id, fileName, responseJSON, maybeXhr) {
		                //alert('This is onComplete function.');
										//alert("complete name:"+responseJSON);//responseJSON就是controller传来的return Json
		                $('#message').append(responseJSON.msg);
	//	                $('#progress').hide();//隐藏进度动画
		                //清除已上传队列
		                $('#fine-uploader-manual-trigger .qq-upload-list .qq-upload-fail').show();
		                //$('#fine-uploader-manual-trigger .qq-upload-list .qq-upload-success').hide();
		                //$('#manual-fine-uploader').fineUploader('reset');//（这个倒是清除了，但是返回的信息$('#message')里只能保留一条。）   
	//	                $('.stateOne').hide();
	//	                $('.stateTwo').show()
		                
		                $('#trigger-upload').hide()
		                console.log(maybeXhr)
		          },
	        	}
	        });
			qq(document.getElementById("trigger-upload")).attach("click", function() {
	            manualUploader.uploadStoredFiles();
	        });
			

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
			saveEdit(){
				var str = JSON.stringify(this.project);
				var data = JSON.parse(str);
				this.teamProInfo[this.index] = data;/*将修改过得数据放在vuex里*/
				console.log(this.companyProInfo)
				router.push("/yhzx/team/info/teamProject/teamProjectIndex")
				
			},
			cancelEdit(){
				router.push("/yhzx/team/info/teamProject/teamProjectIndex")
				
			}
	    },
	    
	    updated(){
	    	var num1 = this.project.takeOffice.length;/*项目职责字数*/
	    	this.dutycont = num1;
	    	var num2 = this.project.detailDes.length;/*详细描述字数*/
	    	this.detailcont = num2;
	    	
	    },
	    
	    
   }
</script>

<style lang="scss" scoped="">
$bfColor:#ffffff;
$activeColor: #02a672;
#fine-uploader-manual-trigger{
	width: 720px;
	float: right;
}
.editProject{
	width:940px; 
	padding: 40px;
	overflow: hidden;
	position: relative;
	.editBtn{
		height: 18px;
		line-height: 18px;
		padding-left: 25px;
		color: $activeColor;
		background: url(../../../assets/img/team/icon_green-edit.png) no-repeat left center;
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
		     background: url(../../../assets/img/team/icon_green_cancel.png) no-repeat center;
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
						background: url(../../../assets/img/team/icon_green_next_nor.png) no-repeat center;
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
			&:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;} 
			
			margin-bottom: 20px;
			/*overflow: hidden;*/
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
			background-image: url("../../../assets/img/team/icon_green_119inform_confirm.png") ;
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
		.notice{
			color: rgb(171,171,171);
		}
		.modify-table-wrap{
			.table-wrap-left{
				color: $activeColor;
				margin-right: 30px;
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
						margin-right: 20px;
						margin-top: 16px;
					}
				}
				&.duty-wrap{
					color: rgb(167,167,167);
					height: 35px;
					line-height: 35px;
					position: relative;
					input{
						width: 480px;
						height: 35px;
						border: 1px solid #EBEBEB;
						border-radius: 5px;
						text-indent: 8px;
						color: #353535;
					}
					.limit-words{
						position: absolute;
						bottom: 0px;
						left:600px ;
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
						margin-left: 7px;
						color: #353535;
						text-align: justify;
						padding: 0 5px;
					}
					.limit-words{
						position: absolute;
						bottom: 0px;
						left:600px ;
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
						margin-left: 10px;
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
								background: url(../../../assets/img/team/icon_green_cancel.png) no-repeat center;
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