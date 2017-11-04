<template>
<div class="projectDetail">
	
		<h3 class="c-title" v-bind:class="{'comStyle':user.userState==0,'teamStyle':user.userState==1,'personStyle':user.userState==2}">
			<span class="proname">{{project.proName}}</span>
			<em class="addToPro" @click="addThisPro">加入项目</em>
			<div id="modal-overlay" class="addNotice">
				<div class="modal-wrap">
					<h5></h5>
					<span class="modalChaBtn" @click="closeModal"></span>
					<p>对不起，请您先至"基础信息"菜单下完成姓名信息</p>
					<p>才可添加项目经历</p>
					
				</div>
			</div>
		</h3>
		<ul class="detail-content">
			<li class="proPlace">
				<div>项目地点</div><div class="">{{project.proPlace}}</div>
			</li>
			<li class="proState">
				<div>项目状态</div><div class="">{{project.proState}}</div>
			</li>
			<li class="proTime">
				<div>建成时间</div><div class="">{{project.compalteTime_E}}</div>
			</li>
			<li class="proFunc">
				<div>建筑功能</div><div class="">{{project.proFunc}}</div>
			</li>
			<li class="proDesc">
				
				<div>项目描述</div>
				<div class="">{{project.proDesc}}
				</div>
				
			</li>
			
			<li class="img-wrap">
				
				<div>项目图片</div>
				<div>
					<ul id="imgViewer">
						<li v-for="item in imgInfo">
							<img :src="item.src" @click="ShowImgModal"/>
						</li>
					</ul>
				</div>
				<!--<div id="modal-overlay" class="imgShow">
					<div class="modal-wrap">
						<h5></h5>
						<span class="modalChaBtn" @click="closeModal"></span>
						<div class="main">
							<div>
								<ul class="pics">
									<li v-for="(item,$index) in imgInfo">
										<img :src="item.src" />
									</li>
								</ul>
							</div>
							
						</div>
						
						<div class="imgNav">
							<span class="left-bar"></span>
							<span>{{imgIndex}}/{{imgSize}}</span>
							<span class="right-bar"></span>
						</div>
					</div>
				</div>-->
				
			</li>
			<li class="pro-companies">
				<div>参与公司</div>
				<ul class="list-wrap">
					<li v-for="item in project.companies">
						<div>{{item.name}}</div>
						<div>{{item.takeOffice}}</div>
						<div>{{item.parTakeTime_S}}-{{item.parTakeTime_E}}</div>
					</li>
				</ul>
			</li>
			<li class="pro-companies">
				<div>参与团队</div>
				<ul class="list-wrap">
					<li v-for="item in project.teams">
						<div>{{item.name}}</div>
						<div>{{item.takeOffice}}</div>
						<div>{{item.parTakeTime_S}}-{{item.parTakeTime_E}}</div>
					</li>
				</ul>
			</li>
			<li class="pro-companies">
				<div>参与个人</div>
				<ul class="list-wrap">
					<li v-for="item in project.person">
						<div>{{item.name}}</div>
						<div>{{item.takeOffice}}</div>
						<div>{{item.parTakeTime_S}}-{{item.parTakeTime_E}}</div>
					</li>
				</ul>
			</li>
		</ul>

</div>
</template>

<script>
	import {mapState} from "vuex"
	import 	Modal from "../../assets/js/modal.js"
	import Datepicker from "./units/Datepicker.vue"
	import router from "../../router"
	export default{
		name:"ProjectDetail",
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
	        //图片展示的图片data
	        imgInfo:[
	        	{
	        		src:require("../../assets/img/images/captainmiao1.jpg")
	        	},{
	        		src:require("../../assets/img/images/captainmiao2.jpg")
	        	},{
	        		src:require("../../assets/img/images/captainmiao3.jpg")
	        	},{
	        		src:require("../../assets/img/images/captainmiao4.jpg")
	        	},{
	        		src:require("../../assets/img/images/captainmiao5.jpg")
	        	},{
	        		src:require("../../assets/img/images/captainmiao6.jpg")
	        	},{
	        		src:require("../../assets/img/images/captainmiao7.jpg")
	        	},{
	        		src:require("../../assets/img/images/captainmiao8.jpg")
	        	},{
	        		src:require("../../assets/img/images/captainmiao9.jpg")
	        	}
	        ],
	        imgIndex:"1",
	        imgSize:"4",
	      }
	    },
	    
	    computed:mapState({
		    companyProInfo:state=>state.company.companyMessage.companyProInfo,/*获取vuex数据*/
		 	user:state=>state.userState.user,
		}),
		create(){
			
		},
		mounted(){
			$('html').scrollTop(0);
			this.user.userState = sessionStorage.getItem("state");//登录用户身份
			console.log(this.user.userState+"aa");
			
			$(document.body).css("overflow","scroll");
			var str = JSON.stringify(this.companyProInfo);
    		var data = JSON.parse(str);
    		this.proInfos = data;/*获取vuex里面所有项目信息*/
    		
			
	    	this.id = this.$route.query.id;
//	    	console.log(this.id)
	    	for(var i=0;i<this.proInfos.length;i++){
	    		if(this.proInfos[i].id == this.id){
	    			
	    			this.project = this.proInfos[i];
	    		}
	    	}
	    	

			
	    },
	    methods:{
	    	addThisPro(){
	    		//需先判断有没有完善基础信息；
	    		Modal.makeText($(".addNotice"))
	    	},
	    	ShowImgModal(){
//	    		Modal.makeText($(".imgShow"))
				$("#imgViewer").viewer()

	    	},
	    	closeModal(){
				Modal.closeModal($(".imgShow"))
				Modal.closeModal($(".addNotice"))
			},
	    }
	}
</script>

<style lang="scss" scoped="scoped">
$bfColor:#ffffff;
$activeColor: #2eb3cf;
.projectDetail{
	width: 1200px;
	min-height: 500px;
	background: $bfColor;
	border-radius: 5px;
	padding: 40px;
	.c-title{
      height:34px;
      border-bottom:1px solid #ebebeb;
      text-align: left;
		&:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;} 
      .proname{
        font-family:'Microsoft Yahei';
        color:#2eb3cf;
        padding-bottom:14px;
        font-size:18px;
        line-height:18px;
        border-bottom:2px solid $activeColor;
        display:inline-block;
        float: left;
      }
      .addToPro{
      	float: right;
      	padding-left: 24px;
      	color: $activeColor;
      	background: url(../../assets/img/proDetail/add01.png) no-repeat left center;
     	cursor: pointer;
      }
      &.comStyle{
      	.proname{
      		border-bottom:2px solid  #2eb3cf;
      		color: #2eb3cf;
      	}
      	.addToPro{
      		color: #2eb3cf;
      	}
      }
      &.teamStyle{
      	.proname{
      		border-bottom: 2px  solid   #02a672;
      		color:  #02a672;
      	}
      	.addToPro{
      		color:  #02a672;
      		background: url(../../assets/img/proDetail/add02.png) no-repeat left center;
      	}
      	
      }
      &.personStyle{
      	.proname{
      		border-bottom: 2px  solid   rgb(242,117,25);
      		color:  rgb(242,117,25);
      	}
      	.addToPro{
      		color:  rgb(242,117,25);
      		background: url(../../assets/img/proDetail/add03.png) no-repeat left center;
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
			     background: url(../../assets/img/proDetail/guanbi-2.png) no-repeat center;
			     position: absolute;
			     top: 20px;
			     right: 30px;
			     cursor: pointer;
			}
			/*.confirmBtn{
				
				width: 160px;
				height: 42px;
				line-height: 42px;
				text-align: center;
				background: url(../../../assets/img/demand/bg21.png) no-repeat;
				margin: 30px auto 10px;
				color: $bfColor;
				cursor:pointer;
				font-size: 14px;
			}*/
		}
		&.addNotice{/*加入项目的模态框*/
			.modal-wrap{
				width: 549px;
				padding-top: 150px;
				padding-bottom: 180px;
			}
		}
		&.imgShow{/*图片展示的模态框*/
			.modal-wrap{
				width: 900px;
				height: 2000px;
				
				.main{
					background: #898989;
					.pics{
						width: 900px;
						overflow: hidden;
						ul{
							
							li{
								width: 900px;
								float: left;
								position: relative;
								img{
									max-width: 900px;
									position:absolute;top:50%;left:50%; 
									transform:translate(-50%,-50%);
									-webkit-transform:translate(-50%,-50%);
									-moz-transform:translate(-50%,-50%);
									-ms-transform:translate(-50%,-50%);
									-o-transform:translate(-50%,-50%);
									
								}
							}
						}
					}
				}
			}
		}
	}
   	.detail-content{
   		width: 100%;
   		padding: 20px 20px;
		>li{
			width: 100%;
			margin-bottom: 20px;
			&:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;} 
			
			>div{
				&:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;} 
				float: left;
				display: inline-block;
				&:first-child{
					margin-right: 30px;
					color: rgb(102,102,102);
					
				}
				&:last-child{
					width: 980px;
					float: left;
					color: rgb(53,53,53);
					text-align: justify;
					
					
				}
				
			}
		}
		.img-wrap{
			
			ul{
				width: 980px;
				&:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;} 
				
				li{
					float: left;
					img{
						width: 160px; height: 100px;/*图片的尺寸*/
						display: block;
						margin-right: 15px;
						margin-bottom: 15px;
						float:left; 
						cursor: pointer;
						
						
					}
				}
			}
		}
		.pro-companies{
			.list-wrap{
				width: 680px;
				float:left;
				li{
					width: 680px;
					margin-top: 14px;
					&:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;} 
					border-bottom:1px dotted #e0e0e0;
					&:first-child{
						margin-top: 0;
					}
					div{
						
						float: left;
						width: 260px;
						margin-bottom: 14px;
						text-align: left;
						
						&:last-child{
							width: 150px;
							text-align: right;
							float: right;
							margin-right: 0;
						}
					}
				}
			}
		}
	}
	
}
</style>