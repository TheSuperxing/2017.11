<template>

	<div class="editCompanyInfo">
		<h3 class="c-title"><span>{{title}}</span></h3>
		<ul class="ci-list">
	      <li class="clear">
	        <h4>公司标志</h4>
	        <div class="logoBox">
	        	<img src="../../../assets/img/logo/logo02.png" alt="">
	        	<div class="modifyLogo" @click="overlay">点击更换标示</div>
	        	<!--<el-button type="text" @click="modifyLogo" class="modifyLogo">点击更换标志 </el-button>-->
	        </div>
	        
	        
	        
	      </li>
	      
	      <li>
	      	<h4>公司名称</h4>
	      	<input placeholder="请在此输入公司名称" v-model="info.companyName"/>
	      </li>
	      <li>
	      	<h4>公司地址</h4>
	      	<input  placeholder="请在此输入公司地址" v-model="info.companyAddress"/>
	      	<p>进入认证流程后，公司名称将不可自行修改，需联系管理员</p>
	      </li>
	      <li>
	      	<h4>公司简介</h4>
	      	<textarea placeholder="请在此输入公司简介" v-model="info.companyDesc"></textarea>
	      	<p class="limit-words">{{detailcont}}/500</p>
	      </li>
	      <li>
	      	<h4>公司电话</h4>
	      	<input placeholder="请在此输入公司电话" v-model="info.companyPhone"/>
	      </li>
	    </ul>
	    <div class="btnBox">
			<span class="cancelBtn" @click="cancleEdit">取消</span>
			<span class="confirmBtn" @click="saveEdit">确认</span>
		</div>
		<!--模态框-->
		<div id="modal-overlay" class="modal"> 
		    <div class="previewZz">
				<h5>预览公司标志</h5>
				<div class="picBox">
					<img src="../../../assets/img/company/logo.png"/>
				</div>
				<div class="modalBtn">
					<span class="submitBtn">提交</span>
					<span class="resubmitBtn">重新选择</span>
				</div>
				<span class="modalChaBtn" @click="closeModal"></span>
			</div>
		</div>
		
	</div>
	
</template>

<script>
//	import Vue from 'vue'
//	import {MessageBox,Button} from "element-ui"
//	Vue.use(MessageBox)
//	Vue.use(Button)
    import Modal from "../../../assets/js/modal.js"
    import Vue from "vue"
	import {mapState} from "vuex"
	import router from "../../../router" 
    export default {
    name:"companyInfoIndex",
    data:function(){
      return {
        title:"公司基本信息",
        detailcont:"0",
        info:{
        	companyName:'',
        	companyAddress:'',
        	companyDesc:"",
			companyPhone:"",
        },
      }
    },
    computed:mapState({
      basicInfo:state=>state.company.companyMessage.basicInfo
    }),
    mounted(){
    	console.log(this.basicInfo)
    	//将vuex数据取到本组件
    	for(var item in this.basicInfo){
// 			this.contactsss.info.push(this.accountInfo.contacts[i])
				this.info.companyName=this.basicInfo.companyName;
				this.info.companyAddress=this.basicInfo.companyAddress;
				this.info.companyDesc=this.basicInfo.companyDesc;
				this.info.companyPhone=this.basicInfo.companyPhone;
   		}
    	console.log(this.info)
    	
    },
    methods:{
    	cancleEdit(){
			for(var item in this.basicInfo){
	// 			this.contactsss.info.push(this.accountInfo.contacts[i])
				this.info.companyName=this.basicInfo.companyName;
				this.info.companyAddress=this.basicInfo.companyAddress;
				this.info.companyDesc=this.basicInfo.companyDesc;
				this.info.companyPhone=this.basicInfo.companyPhone;
			}
			router.push({path:"/yhzx/company/info/companyInfo/index"})
    	},
    	saveEdit(){
    		for(var item in this.info){
    			this.basicInfo.companyName=this.info.companyName;
    			this.basicInfo.companyAddress=this.info.companyAddress;
    			this.basicInfo.companyDesc=this.info.companyDesc;
    			this.basicInfo.companyPhone=this.info.companyPhone;
    		}
    		router.push({path:"/yhzx/company/info/companyInfo/index"})
    	},
		overlay(){
			var modal = $('.modal')
			Modal.makeText(modal)
		},
		closeModal(){
			var modal = $('.modal')
			Modal.closeModal(modal)
		}
    },
    updated(){
    	var num = this.info.companyDesc.length;
    	this.detailcont = num;
	    	
    }
  }
</script>

<style lang="scss">
$activeColor: #2eb3cf;
$bfColor:#ffffff;
	.editCompanyInfo{
		width:940px;
	    padding:40px;
	    background-color:$bfColor;
	    float:left;
	    border-radius:5px;
	    position: relative;
	    .ci-list{
			padding-left: 30px;
			overflow:hidden;
			li{
			  width:100%;
			  margin-bottom: 30px;
			  line-height: 34px;
			  text-align: left;
			  position: relative;
			  overflow: hidden;
			  h4{
			    float: left;
			    font-size: 18px;
			    color: #353535;
			  }
			  img{
			    float: left;
			  }
			  input{
			    float: left;
			    margin-left:90px;
			    font-size: 14px;
			    width: 270px;
			    height: 34px;
			    line-height: 34px;			    
			    border: 1px solid #B6B6B6;
			    border-radius: 3px;
			    text-indent: 8px;
			  }
			  
			  textarea{
			  	width: 660px;
			  	height: 160px;
			  	line-height: 24px;
			  	float: left;
			    margin-left:90px;
			    font-size: 14px;
			    margin-bottom: 30px;
			    border-radius: 3px;
			    text-indent: 8px;
			    text-align: justify;
			  }
			  .limit-words{
			  	position: absolute;
			  	bottom: 0px;
			  	right: 0;
			  	color: #b0b0b0;
			  }
			  
			}
				li:nth-child(3){
					margin-bottom: 30px;
					position: relative;
					height: 60px;
					p{
						position: absolute;
						left: 165px;
						bottom: -10px;
						color: $activeColor;
					}
				}
				li:nth-child(4){
					margin-bottom: 0;
				}
			    li:nth-child(1){
			      height:130px;
			      line-height: 100px;
			      padding-top: 30px;
			      margin-bottom: 20px;
			      .logoBox{
			      	float:left;
			      	width:100px; height: 100px;
			      	margin-left:90px;
			      	position:relative;
				    img{
				    	width: 100px; height: 100px;
				    }
				    .el-button{
				    	border-radius:0 !important;
				    	padding: 0 !important;
				    }
				    .modifyLogo{
				    	width: 100px;
				    	height: 20px;
				    	line-height: 20px;
				    	text-align: center;
				    	display: inline-block;
				    	background: rgba(155,155,155,.9);
				    	position: absolute;
				    	left: 0;
				    	bottom: 0;
				    	font-size: 12px;
				    	color: #FFFFFF;
				    	z-index: 11;
				    	cursor: pointer;
				    }
			      }
			      
			    }
		}
		/*模态框模态框模态框模态框模态框模态框模态框模态框模态框模态框模态框*/
		.previewZz{
             padding: 20px 30px;
             width: 454px;
            /* height: 272px;*/
             overflow: hidden;
             position:absolute;top:50%;left:50%; 
	 		 transform:translate(-50%,-50%);
			 -webkit-transform:translate(-50%,-50%);
			-moz-transform:translate(-50%,-50%);
			-ms-transform:translate(-50%,-50%);
			-o-transform:translate(-50%,-50%); 
             background: #FFFFFF;
    		 border-radius: 10px;
             
             h5{
                 color:$activeColor;
                 font-size: 18px;
                 height: 18px;
                 line-height: 18px;
                 text-align: left;
             }
             .picBox{
                 width: 160px;
                 height: 160px;
                 margin: 30px 60px 44px 30px;
                 float: left;
                 img{
                     width: 100%;
                     height: 100%;
                 }
             }
             .modalBtn{
                 width: 117px;
                 margin-top: 58px;
                 float: left;
                 span{
                     width: 117px;
                     height: 33px;
                     line-height: 33px;
                     display: block;
                     float: left;
                     border-radius: 5px;
                     text-align: center;
                     cursor: pointer;
                     &.submitBtn{
                         background: url(../../../assets/img/company/rectangle05.png) no-repeat center;
                         margin-bottom: 30px;
                         color: #FFFFFF;
                         &:hover{
                            filter:alpha(opacity=80);       /* IE */
                            -moz-opacity:0.8;              /* 老版Mozilla */
                            -khtml-opacity:0.8;              /* 老版Safari */
                            opacity: 0.8;           /* 支持opacity的浏览器*/
                        }
                     }
                     &.resubmitBtn{
                         border: 1px solid #bfcbd9;

                        &:hover{
                            border: 1px solid $activeColor;
                            color: $activeColor;
                        }
                     }
                 }
             }
             .modalChaBtn{
                 width: 20px;
                 height: 20px;
                 background: url(../../../assets/img/company/Close3.png) no-repeat center;
                 position: absolute;
                 top: 20px;
                 right: 30px;
                 cursor: pointer;
             }
        }
		/*模态框模态框模态框模态框模态框模态框模态框模态框模态框模态框模态框*/
        

	    .btnBox{
	    	height: 40px;
	    	width: 330px;
	    	margin:40px auto;
	    	display: flex;
	    	justify-content: space-between;
	    	overflow: hidden;
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

	    .succseed{
	    	width: 940px;
	    	height: 400px;
	    	padding-top: 129px;
	    	background: $bfColor;
	    	z-index: 9999;
	    	position: absolute;
	    	left: 0; top: 0;
	    	padding-left: 341px;
	    	border-radius: 5px;
	    	.s-wrap{
	    		height: 28px;
	    		background: url(../../../assets/img/company/Smile.png) no-repeat left center;

	    		font-size: 24px;
	    		line-height: 28px;
	    		color: $activeColor;
	    		margin-bottom: 60px;
	    		padding-left: 51px;


	    	}
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
	    		margin-left: 59px;
	    		&.confirmBtn{
	    			background-image: url(../../../assets/img/company/rectangle06.png) ;
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

</style>
