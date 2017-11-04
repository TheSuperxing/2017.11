<template>
  <div class="teamProjectIndex">
  	<span class="addPro" @click="overlay">添加</span>
  	<!--搜索项目模态框-->
  	<div id="modal-overlay" class="search-modal">
  		<div class="searchPro">
				<h5>搜索项目</h5>
				<span class="modalChaBtn" @click="closeModal"></span>
				<div class="content-wrap">
					<div class="search-wrap">
						<span class="wrap-left">项目名称</span>
						<p class="wrap-right">
							<input type="text" placeholder="请输入项目名称" v-model="searchText" class="searchInput"/>
							<span class="sBtn" @click="getData"><img src="../../../assets/img/team/icon.search.png" />搜索</span>
						</p>
					</div>
					<div class="result-wrap">
						<span class="wrap-left">搜索结果</span>
						<ul class="resultList">
							<li class="noResult">抱歉，未找到该项目，请重新搜索</li>
							<li v-for="" @click="choseThis">
								<router-link :to="{name:'ProjectDetail',query:{id:'1'}}">王大麻子</router-link>
								<span class="choseBtn">
								</span>
							</li>
							<li v-for="" @click="choseThis">
								<router-link :to="{name:'ProjectDetail',query:{id:'1'}}">王大麻子</router-link>
								<span class="choseBtn">
								</span>
							</li>
							<li v-for="" @click="choseThis">
								<router-link :to="{name:'ProjectDetail',query:{id:'1'}}">王大麻子</router-link>
								<span class="choseBtn">
								</span>
							</li>
							
						</ul>
						<router-link to="/yhzx/team/info/teamProject/definedProject" @click="closeModal">
							<div class="goToDefinedPro">自定义添加项目</div>
						</router-link>
						
						<span class="confirmBtn">确认</span>
					</div>
				</div>
  		</div>
  	</div>
  	<!--搜索项目模态框-->
    <h3 class="t-title"><span>{{title}}</span></h3>
    <div class="projectTable" v-for="(item,$index) in teamProInfo">
    	<h5 class="tableTitle">{{item.proName}}</h5>
    	<div class="toolsBox">
    		<!--点击跳转到编辑该项目的页面  路由传值index-->
    		<span class="editBtn" @click="goToEditPro(item.id)">编辑</span>
    		<span class="deleBtn" @click="deletePro($index)">删除</span>
    		<!--确认删除该项目模态框-->
    			<div id="modal-overlay" v-bind:class="deleteModal[$index]">
						<div class="deletePro">
							<h5>搜索项目</h5>
							<span class="modalChaBtn" @click="closeModal($index)"></span>
							<div class="content-wrap">
							<p class="deleteOrNo">确定删除该项目吗？</p>
							<div class="btnBox">
								<span class="cancelBtn" @click="cancleDele($index)">取消</span>
								<span class="confirmBtn" @click="saveDele($index)">确认</span>
							</div>
							</div>
						</div>
					</div>
    		<!--确认删除该项目模态框-->
    	</div>
    	<div class="pr-wrap-a">
    		<span class="completeTime">Time : {{item.parTakeTime_S}} 至 {{item.parTakeTime_E}}</span>
  			<span class="takeOfficeBar">项目责任：<em class="takeOffice">{{item.takeOffice}}</em></span>
    	</div>
    	<div class="pr-wrap-b">{{item.detailDes}}
    	</div>
    	
    	<div class="morePics" v-if="!show.tag[$index]">
    		<img src="../../../assets/img/company/img.png" />
    		<img src="../../../assets/img/company/img.png" />
    		<img src="../../../assets/img/company/img.png" />
    		<img src="../../../assets/img/company/img.png" />
    		<img src="../../../assets/img/company/img.png" />
    		<img src="../../../assets/img/company/img.png" />
    		
    	</div>
    	<div class="viewMore">
    		<p v-bind:class="{viewDown:show.tag[$index],viewUp:!show.tag[$index]}" @click="upDown($index)">
    			<!--<img src="../../../assets/img/company/double-bottom-down.png" />
					<img src="../../../assets/img/company/double-bottom-up.png" />-->
					<span>{{updowntxt[$index]}}</span>
    		</p>
    	</div>
    </div>
  </div>
</template>

<script>
	import Modal from "../../../assets/js/modal.js"
	import router from "../../../router"
	import Vue from "vue"
	import {mapState} from "vuex"
  export default {
    name:"teamProjectIndex",
    data:function(){
      return {
        title:"团队项目信息",
//      updown:"view-down",
        updowntxt:[],
        show:{
        	tag:[],
        	
        },
        proInfo:[],
        searchText:"", /*搜索框input值*/
        list:[], /*搜索结果*/
       	deleteModal:[]//删除确认的模态框
      }
    },
    computed:mapState({
      teamProInfo:state=>state.team.teamMessage.teamProInfo/*获取vuex数据*/
    }),
    mounted(){
    	/*将vuex里面的数据获取到本组件*/
    	this.proInfo= this.teamProInfo.reduce(function(coll,item){
    		coll.push(item);
    		return coll;
    	},this.proInfo)
//  	console.log(this.proInfo);
//  	console.log(this.teamProInfo)
    	
    	this.show.tag.length = this.teamProInfo.length;
//  	console.log(this.show.tag.length)
    	for(var i=0;i<this.teamProInfo.length;i++){
    		this.show.tag[i]=true;
    		this.updowntxt.push("展开查看更多");
    		this.deleteModal.push("deleteModal"+i);//遍历所有项目数组 获取个数来确认模态框个数
    		
    	}
    	
    },
    methods:{
    	goToEditPro(id){
    		console.log(id)
    		router.push({name:'editTeamProject',params:{id:id}})
    	},
    	viewMore(){
    		/*$('.morePics').css("display",$('.morePics').css('display')==
    		'block'?'none':'block'
    		)*/
//  		$('.morePics').innerHTML('收起图片')
//  		$(".viewMore img").attr('src',$(".viewMore img").attr('src')==
//  		'../../../assets/img/company/double-bottom-down.png '?
//  		'../../../assets/img/company/double-bottom-up.png': 
//  		'../../../assets/img/company/double-bottom-down.png');
//  		this.updown == "view-down"?"view-up":"view-down";
//  		this.updowntxt ='展开查看更多'?'收起图片':'展开查看更多';
//  		console.log(this.updowntxt)
    		
    	},
    	upDown(index){
//  		Vue.set(this.show,"tag[index]",false)
				console.log(this.show.tag[index])
				if(this.show.tag[index]==true){
					Vue.set(this.show.tag,[index],false)
					this.updowntxt[index] = "收起图片"
				}else{
					Vue.set(this.show.tag,[index],true)
					this.updowntxt[index] = "展开查看更多" 
				}
    		this.show.tag[index] == true? false:true;
    		this.updowntxt[index]=="展开查看更多"?"收起图片":"展开查看更多";
    	},
    	deletePro(index){
    		//删除模态框的弹出按钮事件
    		var aa = "deleteModal"+index;
    		Modal.makeText($('.'+aa))
    	},
    	cancleDele(index){
    		//取消删除该项目
    		this.closeModal(index);
    	},
    	saveDele(index){
    		//确认删除该项目
    		this.teamProInfo.splice(index,1);
    		this.closeModal(index);
    	},
    	//模态框
			overlay(){
				Modal.makeText($('.search-modal'))
			},
			closeModal(index){
				Modal.closeModal($('.search-modal'))
				
				var aa = "deleteModal"+index;
    		Modal.closeModal($('.'+aa))
    		
				$('.search-wrap').css({marginTop:"120px",marginBottom:"170px"})
				$('.result-wrap').css({display:"none"})
			},
			getData(){
//				console.log($('.search-wrap').offsetTop())
					$('.search-wrap').animate({marginTop:"30px",marginBottom:"40px"},100);
					$('.result-wrap').fadeIn(200);
			},
			choseThis(e){
				$(".resultList li span").removeClass('selected');
				$(e.target).addClass("selected");
				console.log($(".resultList li span"))
				
			},
	
    
    }
  }
</script>

<style lang="scss" scoped="scoped">
$bfColor:#ffffff;
$activeColor: #02a672;
	.teamProjectIndex{
		
		width: 940px; padding: 40px;
		position: relative;
		min-height: 427px;
		.addPro{
			width: 80px;
			height: 15px;
			line-height: 15px;
			padding-left: 25px;
			background: url(../../../assets/img/team/add.png) no-repeat left center;
			position: absolute;
			top: 40px; right:40px;
			display: block;
			color: $activeColor;
			cursor: pointer;
		}
		.searchPro,.deletePro{
			
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
		    background: #F7F9FC;
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
	    	overflow: hidden;
	    		.deleteOrNo{
	    			margin: 30px auto;
	    			color: $activeColor;
	    			font-size: 20px;
	    		}
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
							padding-left: 0 !important;
			    		&.cancelBtn{
			    			border: 1px solid #bfcbd9;
		
			    			&:hover{
			    				border: 1px solid $activeColor;
			    				color: $activeColor;
			    			}
			    		}
			    		&.confirmBtn{
			    			background-image: url("../../../assets/img/team/icon_green_next_nor.png") ;
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
	    		.result-wrap{
	    			display: none;
	    			margin-bottom: 80px;
	    		}
	    		.search-wrap{
	    			margin-top:120px;
						margin-bottom:170px;
	    		}
	    		.search-wrap,.result-wrap{
	    			
						text-align: center;
						padding-left:67px;
						
						overflow: hidden;
						
						.wrap-left{
							margin-right: 20px;
							font-size: 18px;
							float: left;
							height: 40px;
						  line-height: 40px;
						}
						.wrap-right{
							width: 325px;
							height: 40px;
							line-height: 40px;
							float: left;
							border: 1px solid #ebebeb;
							border-radius: 5px;
							overflow: hidden;
							input{
								width: 222px;
								float: left;
								text-indent: 8px;
							}
							.sBtn{
								display: inline-block;
								float: right;
								height: 40px;
								line-height: 40px;
								text-align: center;
								vertical-align: middle;
								width: 100px;
								color: #FFFFFF;
								cursor: pointer;
								background: url(../../../assets/img/team/icon_green_next_nor.png) no-repeat center;
								img{
									display: inline;
									vertical-align: middle;
									margin-right: 10px;
									margin-bottom: 5px;
									width: 21px; height: 20px;
								}
							}
						}
						.resultList{
							width: 325px;
							overflow: hidden;
							.noResult{
								color:rgb(140,140,140);
								margin-bottom: 9px;
								height: 40px;
								line-height: 40px;
								background: none;
							}
							li{
								width: 325px;
								height: 36px;
								line-height: 36px;
								padding: 0 13px;
								text-align: left;
								float: left;
								background: #f8f8f8;
								overflow: hidden;
								cursor: pointer;
								a{
									color: $activeColor;
								}
								&:nth-child(2n){
									background: #f2f2f2;
								}
									.choseBtn{
										width: 15px;
										height: 15px;
										display: inline-block;
										float: right;
										margin-top: 10px;
										background: url(../../../assets/img/team/icon_selected.png) no-repeat center;
									
										&:hover,&.selected{
											background: url(../../../assets/img/team/icon_selected_green.png) no-repeat center;
											
										}
									}
									
							}
						}
						.confirmBtn{
							width: 117px;
							height: 33px;
							line-height: 33px;
							text-align: center;
							color: #FFFFFF;
							/*margin: 30px auto;*/
							margin-left: 149px;
							margin-top: 30px;
							display: block;
							background: url(../../../assets/img/team/icon_green_119inform_confirm.png) no-repeat center;
							&:hover{
	                filter:alpha(opacity=80);       /* IE */
	                -moz-opacity:0.8;              /* 老版Mozilla */
	                -khtml-opacity:0.8;              /* 老版Safari */
	                opacity: 0.8;           /* 支持opacity的浏览器*/
	            }
						}
	    		}
	    }
	    .goToDefinedPro{
	    	height: 15px;
	    	line-height: 15px;
	    	text-align: left;
	    	color: $activeColor;
	    	padding-left: 25px;
	    	margin-top: 30px;
	    	margin-left: 97px;
	    	background: url(../../../assets/img/team/plus.png) no-repeat left center;
	    	
	    }
		}
		.projectTable{
			padding: 30px 20px;
			position: relative;
			border-bottom: 1px solid #ebebeb;
			margin-bottom: 30px;
			.tableTitle{
				height: 18px;
				line-height: 18px;
				text-align: left;
				color: $activeColor;
				font-size: 18px;
			}
			.toolsBox{
				width: 145px;
				position: absolute;
				top: 30px; right:10px;
				cursor: pointer;
				span{
					display: inline-block;
					height: 18px;
					line-height: 18px;
					padding-left: 25px;
					color: $activeColor;
					&.editBtn{
						background: url(../../../assets/img/team/icon_green-edit.png) no-repeat left center;
						margin-right: 17px;
					}
					&.deleBtn{
						
						background: url(../../../assets/img/team/delete.png) no-repeat left center;
					}
				}
			}
			.pr-wrap-a{
			    height: 18px;
			    line-height: 18px;
			    font-size: 18px;
			    color: rgb(61,61,61);
			    font-family: "microsoft yahei";
			    line-height: 18px;
			    margin: 20px 0;
   				 &:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
			    
			    .completeTime{
			    	float: left;
			        font-size: 18px;
			        font-family: "microsoft yahei";
			    }
			    .takeOfficeBar{
			        font-size: 18px;
			        font-family: "microsoft yahei";
			        float: right;
			        color: rgb(61,61,61);
			    }
				}
				.pr-wrap-b{
					text-align: justify;
				}
				.morePics{
					overflow: hidden;
					margin-top: 15px;
					img{
						float: left;
						width: 160px;
						height: 100px;
						margin-right: 15px;
						margin-bottom: 15px;
						/*&:nth-child(5n){
							margin: 0;
						}*/
					}
				}
				.viewMore{
					width: 100%;
					height: 14px;
					line-height: 14px;
					color: $activeColor;
					margin-top: 15px;
					cursor: pointer;
					.viewDown{
						width: 120px;
						height: 100%;
						padding-left: 20px;
						margin: 0 auto;
						background: url(../../../assets/img/team/down.png) no-repeat left center;
					}
					.viewUp{
						width: 120px;
						height: 100%;
						padding-left: 20px;
						margin: 0 auto;
						background: url(../../../assets/img/team/up.png) no-repeat left center;
					}
					img{
						vertical-align: middle;
						margin-bottom: 3px;
						margin-right: 5px;
					}
				}
		}
	}

</style>
