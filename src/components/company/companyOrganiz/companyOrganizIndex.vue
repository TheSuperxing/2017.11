<template>
  <div class="companyOrganizIndex">
    <h3 class="c-title"><span>{{title}}</span></h3>
    <div class="orgTable"><!--高管部分 begin-->
    	<p class="t-title"><img src="../../../assets/img/company/senior01.png" />高管团队</p>
    	<ul class="seniorInfo">
    		<li class="stateOne" v-if="haveSenior">(暂无高管团队)</li><!--暂无高管团队-->
    		<li v-for="(item,index) in orgaInfo.senior" class="seniorList" v-if="!haveSenior"><!--有高管团队-->
    			<img src="../../../assets/img/company/icon_senior.png"/>
    			<p class="seniorName">{{item.dealId}}</p>
    			<span class="deleSen"  v-if="editSeniorShow" @click="removeSenior(index)"></span>
    		</li>
    		<span class="addMoreS" @click="overlay" v-if="editSeniorShow"></span>
    		<div class="btnBox" v-if="editSeniorShow">
					<span class="saveBtn" @click="editDoneSenior">保存</span>
					<span class="cancelBtn" @click="cancleEditSenior">取消</span>
				</div>

    	</ul>
    	<!--添加高管模态框-->
				<div id="modal-overlay" class="modal-a">
					<div class="searchSenior">
						<h5>搜索员工</h5>
						<span class="modalChaBtn" @click="closeModal"></span>
						<div class="content-wrap">
								<div class="search-wrap">
									<span class="wrap-left">员工姓名</span>
									<p class="wrap-right">
										<input type="text" v-model="searchText"/>
										<span class="sBtn" @click="getData"><img src="../../../assets/img/company/seacer.png" />搜索</span>
									</p>
								</div>
								<div class="result-wrap">
									<span class="wrap-left">搜索结果</span>
									<ul class="resultList">
										<li class="noResult">抱歉，未找到该项目，请重新搜索</li>
										<li v-for="" >
											<router-link :to="{name:'ProjectDetail',query:{id:'1'}}">王大麻子</router-link>
											<span class="choseBtn" @click="choseThis($event)">
											</span>
										</li>
										<li v-for="">
											<router-link :to="{name:'ProjectDetail',query:{id:'2'}}">王大麻子</router-link>
											<span class="choseBtn" @click="choseThis($event)">
											</span>
										</li>
										<li v-for="">
											<router-link :to="{name:'ProjectDetail',query:{id:'1'}}">王大麻子</router-link>
											<span class="choseBtn" @click="choseThis($event)">
											</span>
										</li>
										
									</ul>
									<span class="confirmBtn">确认</span>
								</div>
						</div>
					</div>
				</div>
				<!--添加高管模态框-->

    	<span class="editPersonBtn" @click="toEditSenior" v-if="!editSeniorShow">编辑</span>
    </div><!--高管部分 begin-->
    <div class="orgTable"><!--骨干部分 begin-->
    	<p class="t-title"><img src="../../../assets/img/company/backbone01.png" />重要骨干</p>
    	<ul class="backboneInfo">
    		<li class="stateOne" v-if="haveBackbone">(暂无骨干团队)</li><!--暂无骨干-->
    		<li v-for="(item,index) in orgaInfo.backbone" class="backboneList" v-if="!haveBackbone"><!--有骨干团队-->
    			<img src="../../../assets/img/company/icon_senior.png"/>
    			<p class="seniorName">{{item.dealId}}</p>
    			<span class="deleSen" @click="removeBackbone(index)" v-if="editBackboneShow"></span>
    		</li>
    		<span class="addMoreS" @click="overlay" v-if="editBackboneShow"></span>
    		<div class="btnBox" v-if="editBackboneShow">
					<span class="saveBtn" @click="editDoneBackbone" >保存</span>
					<span class="cancelBtn" @click="cancleEditBackbone">取消</span>
				</div>
    	</ul>
    	<span class="editPersonBtn" @click="toEditBackbone" v-if="!editBackboneShow">编辑</span>
    	<div id="modal-overlay" class="modal-b">
					<div class="searchBackbone">
						<h5>搜索员工</h5>
						<span class="modalChaBtn" @click="closeModal"></span>
						<div class="content-wrap">
								<div class="search-wrap">
									<span class="wrap-left">员工姓名</span>
									<p class="wrap-right">
										<input type="text" />
										<span class="sBtn"><img src="../../../assets/img/company/seacer.png" />搜索</span>
									</p>
								</div>
								<div class="result-wrap">
									<span class="wrap-left">搜索结果</span>
									<ul class="resultList">
										<li class="noResult">抱歉，未找到该项目，请重新搜索</li>
										<li v-for="" >
											<router-link :to="{name:'ProjectDetail',query:{id:'1'}}">王大麻子</router-link>
											<span class="choseBtn" @click="choseThis($event)">
												
											</span>
										</li>
										<li v-for="">
											<router-link :to="{name:'ProjectDetail',query:{id:'2'}}">王大麻子</router-link>
											<span class="choseBtn" @click="choseThis($event)">
												
											</span>
										</li>
										<li v-for="">
											<router-link :to="{name:'ProjectDetail',query:{id:'1'}}">王大麻子</router-link>
											<span class="choseBtn" @click="choseThis($event)">
												
											</span>
										</li>
										
									</ul>
									<span class="confirmBtn">确认</span>
								</div>
						</div>
					</div>
				</div>


    </div><!--骨干部分 begin-->

    <!--没有员工添加贵公司经历的情况  模态框-->
    <div id="modal-overlay" class="modal-c" v-if="haveStaff">
			<div class="searchHaveNone">
				<h5>搜索员工</h5>
				<span class="modalChaBtn" @click="closeModal"></span>
				<div class="content-wrap">
					<p class="haveNone">对不起，此处暂无员工添加贵公司工作经历</p>
					<p class="haveNone">您还无法添加高管团队及重要骨干成员</p>
				</div>
			</div>
		</div>
    <!--没有员工添加贵公司经历的情况  模态框-->

    <div class="orgTable"><!--下属员工部分-->
    	<p class="t-title"><img src="../../../assets/img/company/staff01.png" />下属员工</p>
    	<p class="notice">
    		个人用户在其“工作经历”中添加与本公司相关的信息后，才会出现下属员工，成为高级认证公司后，可对下属员工的工作经历进行认证。
    	</p>
    	<div class="staff">
    		<div class="tabWrap">
    			<p v-if="have.value" v-for="(item,$index) in tabbarinfo" class="tabBar">
    				<img :src="item.pic1"/>
    				{{item.txt}}
    				<span class="verified">{{item.num}}</span>
    			</p>
    			<p v-if="!have.value" v-for="(item,$index) in tabbarinfo" class="tabBar" :class="[{activeBar:active==$index},{unactiveBar:active!=$index}]" @click="switchTab($index)">
    				<img :src="item.pic1"/>
    				<img :src="item.pic2"/>
    				{{item.txt}}
    				<span class="verified">{{item.num}}</span>

    			</p>

    		</div>
    		<!--
            	底部Tab切换   子路由  staffList
            -->
            <div v-if="have.value" class="staffList">
            	<p class="stateNone">(此处暂无个人用户添加贵公司经历)</p>
            </div>
            <div v-if="!have.value" class="staffList">
            	<ul v-if="tab.aa[0]">
		        		<li v-for="(item,index) in orgaInfo.staff.certified">
		        			<dl class="person">
		        				<dt><img src="../../../assets/img/company/icon_staff.png"></dt>
		        				<dd>{{item.dealId}}</dd>
		        				<p class="cerBtn" v-if="showCer" @click="removeCer(index)">取消认证</p>
		        			</dl>
		        		</li>
		        	</ul>
            	<ul v-if="tab.aa[1]">
            		<li v-for="(item,index) in orgaInfo.staff.uncertified">
            			<dl class="person">
            				<dt><img src="../../../assets/img/company/icon_staff.png"></dt>
            				<dd>{{item.dealId}}</dd>
            				<p class="cerBtn" v-if="showCer" @click="addCer(index)">添加认证</p>
            			</dl>
            		</li>
            	</ul>
        			
       		</div>

    		<span class="editPersonBtn" @click="editPerson" v-if="!showCer">编辑</span>
    		<span class="saveBtn" @click="saveEditPerson" v-if="showCer">保存</span>
    	</div>

    </div>
  </div>
</template>

<script>
	//import axios from "axios";
	import Vue from "vue"
	import {mapState} from "vuex"
	import Modal from "../../../assets/js/modal.js"
  export default {
    name:"companyOrganizIndex",
    data:function(){
      return {
        title:"公司组织信息",
        haveStaff:false,/*有无员工(控制高管及骨干模态框 有无员工可搜索)*/
        haveSenior:false,/*有无高管*/
       	haveBackbone:false,/*有无骨干*/
        state:"",
        editSeniorShow:false,
        editBackboneShow:false,
        showCer:false,/*员工编辑状态的添加取消认证的按钮显隐*/
       	addCerArr:[],/*移除并添加认证的未认证员工*/
       	removeCerArr:[],/*移除并取消认证的已认证员工*/
        Tabflag:0,
        active:0,
        orgaInfo:{
        	senior:[],
        	backbone:[],
        	staff:{}
        },
        tabbarinfo:[
        	{
        		txt:"已认证员工",pic1:require("../../../assets/img/company/Authentication01.png"),
			    	pic2:require("../../../assets/img/company/Authentication03.png"),
			    	num:"8"
			    },
        	{
        		txt:"未认证员工",pic1:require("../../../assets/img/company/Authentication02.png"),
	        	pic2:require("../../../assets/img/company/Authentication04.png"),
	        	num:"10"
	        },
        	
        ],
        tab:{aa:[true,false]},
        have:{value:""},
        childimg:require("../../../assets/img/company/senior02.png"),
       	searchText:"", /*搜索框input值*/
        list:[], /*搜索结果*/


      }
    },
    components:{
    	"staffList":{
    		props:["img"],
    		template:'<div class="staffList">'+
    			'<div class="stateNone"></div>'+
    			'<dl v-for="" class="person"><dt><img :src="img"/></dt><dd>王二麻子</dd></dl>'+
    		'</div>',
    		data:function(){
    			return{

    			}
    		}
    	}
    },
    computed:mapState({
      companyOrgaInfo:state=>state.company.companyMessage.companyOrgaInfo/*获取vuex数据*/
    }),
    mounted(){
//  	console.log(this.companyOrgaInfo);
    	var str = JSON.stringify(this.companyOrgaInfo);
    	var data = JSON.parse(str);
    	console.log(data);
    	for(var item in data){/*遍历  引用赋值*/
    		this.orgaInfo.senior = data.senior;
    		this.orgaInfo.backbone = data.backbone;
    		this.orgaInfo.staff = data.staff;
    	}
//  	console.log(this.orgaInfo)
    	/*判断有无高管团队*/
    	if(this.companyOrgaInfo.senior.length===0){
    		this.haveSenior = true;
    	}else if(this.companyOrgaInfo.backbone===0){
    		this.haveBackbone = true;
    	}

    	/*判断有无下属员工（包含已认证和未认证）*/
    	if(this.orgaInfo.staff.length!=0){
    		Vue.set(this.have,"value",false)
    		console.log(this.active)
    	}else{
    		Vue.set(this.have,"value",true)
    	}
    	console.log(this.have.value)


    },
    updated(){
    	if(this.companyOrgaInfo.senior.length===0){
    		this.haveSenior = true;
    	}
    	if(this.companyOrgaInfo.backbone.length===0){
    		this.haveBackbone = true;
    	}
    	if(this.companyOrgaInfo.staff.length===0){
    		this.haveStaff = true;
    	}
    },
    methods:{

    	switchTab(index){
				this.active = index;

//  		console.log(this.tabbarinfo.length)

    		for(var i = 0 ; i < this.tabbarinfo.length;i++){
    			if(i!=index){
    				Vue.set(this.tab.aa,[i],false)
    			}else{
	    			Vue.set(this.tab.aa,[index],true)
	    		}
    		}

    	},
    	toEditSenior(){
    		this.editSeniorShow = true;

//  		console.log($('.seniorInfo'));
    	},
    	editDoneSenior(){
    		var str = JSON.stringify(this.orgaInfo);
	    	var data = JSON.parse(str);
    		for(var item in data){
    			this.companyOrgaInfo.senior = data.senior;
    		}
    		this.editSeniorShow = false;

    	},
    	cancleEditSenior(){/*取消编辑的高管状态 （再获取一次vuex数据放到页面）*/

    		var str = JSON.stringify(this.companyOrgaInfo);
	    	var data = JSON.parse(str);
	    	console.log(data);
	    	for(var item in data){/*遍历  非引用赋值*/
	    		this.orgaInfo.senior = data.senior;
	    		this.orgaInfo.backbone = data.backbone;
	    		this.orgaInfo.staff = data.staff;
	    	}
    		this.editSeniorShow = false;
    		$('.seniorInfo').css("display","block").siblings('.editPersonBtn').css("display","block");
    	},

    	toEditBackbone(){
    		this.editBackboneShow = true;

//  		console.log($('.seniorInfo'));
    	},
    	editDoneBackbone(){
    		var str = JSON.stringify(this.orgaInfo);
	    	var data = JSON.parse(str);
    		for(var item in data){
    			this.companyOrgaInfo.backbone = data.backbone;
    		}
    		this.editBackboneShow = false;
    	},
    	cancleEditBackbone(){/*取消编辑的高管状态 （再获取一次vuex数据放到页面）*/

    		var str = JSON.stringify(this.companyOrgaInfo);
	    	var data = JSON.parse(str);
	    	console.log(data);
	    	for(var item in data){/*遍历  非引用赋值*/
	    		this.orgaInfo.senior = data.senior;
	    		this.orgaInfo.backbone = data.backbone;
	    		this.orgaInfo.staff = data.staff;
	    	}
    		this.editBackboneShow = false;
    		$('.backboneInfo').css("display","block").siblings('.editPersonBtn').css("display","block");
    	},
    	removeSenior(index){
//  		var that = this;
    		this.orgaInfo.senior.splice(index,1);

    		console.log($(this))

//  		$(this).parent().remove()
    	},
    	removeBackbone(index){
//  		var that = this;

    		this.orgaInfo.backbone.splice(index,1);

//  		console.log($(this))

    		$(this).parent().remove()
    	},
    	editPerson(){
    		this.showCer = true;
//  		console.log(this.showCer)
    	},
    	saveEditPerson(){
    		/*保存取消和添加认证的操作到本地中*/
    		this.orgaInfo.staff.certified = this.addCerArr.reduce(function(coll,item){
    			coll.push(item);
    			return coll;
    		},this.orgaInfo.staff.certified)
    		this.addCerArr = [];
    		this.orgaInfo.staff.uncertified = this.removeCerArr.reduce(function(coll,item){
    			coll.push(item);
    			return coll;
    		},this.orgaInfo.staff.uncertified)
    		this.removeCerArr = [];
    		console.log(this.addCerArr);
    		console.log(this.orgaInfo.staff)
    		/*将本地数据保存到vuex当中*/
    		for(var item in this.orgaInfo){
    			this.companyOrgaInfo.staff = this.orgaInfo.staff
    		}
    		this.showCer = false; /*关闭取消和添加按钮显示*/

    	},
    	addCer(index){/*添加认证 */
//  		console.log(index);

    		this.addCerArr.push(this.orgaInfo.staff.uncertified[index])/*把未认证的添加员工添加到data中的addCerArr*/
    		this.orgaInfo.staff.uncertified.splice(index,1);/*把这个员工从本地未认证数据数组中删除*/
//  		console.log(this.orgaInfo.staff.uncertified);

    	},
    	removeCer(index){
    		this.removeCerArr.push(this.orgaInfo.staff.certified[index])/*把已认证的添加员工添加到data中的addCerArr*/
    		this.orgaInfo.staff.certified.splice(index,1);/*把这个员工从本地认证数据数组中删除*/
    	},
    	overlay(){
    		/*模态框弹出有无可搜索员工判断*/
    		if(this.orgaInfo != ""){
    			var modalA= $('.modal-a')
					Modal.makeText(modalA)
					var modalB = $('modal-b')
					Modal.makeText(modalB)
    		}else{
    			var modalC = $('.modal-c')
    			Modal.makeText(modalC)
    		}

			},
			closeModal(){
				var modalA = $('.modal-a')
				Modal.closeModal(modalA)
				var modalB = $('.modal-b')
				Modal.closeModal(modalB)
				var modalC = $('.modal-c')
				Modal.closeModal(modalC)
			},
			choseThis(e){
				$(".resultList li span").removeClass('selected');
				$(e.target).addClass("selected");
				console.log($(".resultList li span"))
				
			},
			/*模态框搜索获取数据*/
			getData(){
				/*var timer = "";
				var url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+this.searchText;
				var that = this;
				clearTimeout(this.timer);

				this.timer = setTimeout(function(){
					axios.get(url).then((responseText) => {
						//获取到的数据一般都在responseText.data中
						console.log(responseText)
					}).catch((err) => {
						console.log(err);
					})
//					that.$http.jsonp(url,{
//						jsonp:"cb"
//					}).then((responseText)=>{
//						console.log(responseText.body)
//					},(err)=>{
//						console.log(err)
//					})
				},500)*/
			},

    },
    watch:{
//  	searchText:function(val){
//  		var url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+val;
//				this.$http.jsonp(url,{
//					jsonp:"cb"
//				}).then((responseText)=>{
//					console.log(responseText.body.s);
//					this.list= responseText.body.s;
//				},(err)=>{
//					console.log(err);
//				})
//  	}
    }
  }
</script>

<style lang="scss" >
$bfColor:#f7f9fc;
$activeColor: #2eb3cf;
	.companyOrganizIndex{
		width:940px;
		padding: 40px;
		.addMoreS{
			float: left;
			width: 100px;
			height: 100px;
			cursor: pointer;
			background: url(../../../assets/img/company/plus.png);
		}
		.btnBox{
			width: 100%;
			height: 33px;
			overflow: hidden;
			float: left;
			margin-top: 30px;
			margin-left: 10px;
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
		.searchHaveNone{

			.content-wrap{
				padding-top: 102px;
				padding-bottom: 181px;
				.haveNone{
    			height: 30px;
	     		line-height: 30px;
	     		font-size: 18px;
	     		color: $activeColor;
	     		text-align: center;
    		}
			}
		}
		.searchSenior,.searchBackbone,.searchHaveNone{
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
	    	overflow: hidden;

	    		.search-wrap,.result-wrap{

						text-align: center;
						padding-left:67px;
						margin-top:30px;
						margin-bottom:30px;
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
								background: url(../../../assets/img/company/rectangle08.png) no-repeat center;
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
									background: url(../../../assets/img/company/circular.png) no-repeat center;
								
									&:hover,&.selected{
										background: url(../../../assets/img/company/circular-blue.png) no-repeat center;
										
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
							background: url(../../../assets/img/company/rectangle05.png) no-repeat center;
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
		.orgTable{
			padding:30px 20px;
			border-bottom:1px solid #ebebeb;
			.t-title{
				height: 28px !important;
				/*line-height: 30px !important;*/
				text-align: left;
				font-size: 18px;
				display: table-cell;
				vertical-align: middle;
				img{
					width: 25px; height: 28px;
					display: inline-block;
					margin-right: 15px;
				}
			}
			.seniorInfo,.backboneInfo{
				padding: 30px 20px;
				overflow: hidden;
				.stateOne{
					color: #898989;
				}
				.seniorList,.backboneList{
					width: 100px;
					height: 130px;
					float: left;
					margin-right: 30px;
					position: relative;
					margin-bottom: 15px;
					img{
						width: 100px;
						height: 100px;


					}
					.seniorName,.backboneName{
						text-align: center;
						height: 45px;
						line-height: 45px;
					}
					.deleSen{
						width: 17px;
						height: 17px;
						background: url(../../../assets/img/company/Close.png) no-repeat center;
						display: block;
						position: absolute;
						top: 0; right: 0;
						cursor: pointer;
					}
				}

			}

			.editPersonBtn{
				height: 15px;
				line-height: 15px;
				text-align: left;
				padding-left: 27px;
				color: $activeColor;
				cursor: pointer;
				background: url(../../../assets/img/company/edit2.png) no-repeat left center;
			}
			&:last-child{
				border-bottom: none;
				.notice{
					padding-top: 20px;
					text-align: justify;
				}
				.staff{
					margin-top: 30px;
					overflow: hidden;
					position: relative;
					.tabWrap{
						height: 40px;
						/*line-height: 30px;*/
						text-align: left;
						display: table-cell;
						vertical-align: middle;
						overflow: hidden;
						background: url(../../../assets/img/company/bg01.png) no-repeat center;

						.tabBar{
							width: 160px;
							float: left;
							color: #898989;
							font-size: 18px;
							margin-right: 40px;
							cursor: pointer;

							&:last-child{
								margin-left: 40px;
								margin-right: 0;
							}
							&.unactiveBar{
								img{
									margin-right: 13px;
									width: 23px; height: 30px;
									float: left;
								}
								img:first-child{
										display:block ;
									}
									img:nth-child(2){
										display: none;
									}
							}
							&.activeBar{
								color: $activeColor;
								img{
									margin-right: 13px;
									width: 23px; height: 30px;
									float: left;

								}
								img:first-child{
										display: none;
									}
									img:last-child{
										display: block;
									}
							}

							&.switchTab{
								color: $activeColor;
								img{
									margin-right: 13px;
									width: 23px; height: 30px;
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
					.editPersonBtn{
							position: absolute;
							right: 0;
							top: 0;
					}
					.saveBtn{
							width: 117px;
						height: 33px;
						line-height: 33px;
						float: left;
						margin-right: 30px;
						text-align: center;
						border-radius: 5px;
						cursor: pointer;

							background-image: url("../../../assets/img/company/rectangle06.png") ;
		    			color: #FFFFFF;
		    			position: absolute;
		    			bottom: 0;
		    			left: 380px;
		    			&:hover{
		    				filter:alpha(opacity=80);       /* IE */
						  -moz-opacity:0.8;              /* 老版Mozilla */
						  -khtml-opacity:0.8;              /* 老版Safari */
						   opacity: 0.8;           /* 支持opacity的浏览器*/
		    			}
					}

				}
				.staffList{
						padding: 30px 20px;
						overflow: hidden;
						margin-bottom: 60px;
						.stateNone{
							font-size: 18px;
							color: #898989;
						}
						li{
							/*height: 110px;*/
							margin-right: 30px;
							margin-bottom: 30px;
							float: left;
							color: $activeColor;
							overflow: hidden;
							.person{

								text-align: center;
								dt{
									width: 80px;
									height: 80px;
									img{
										width: 100%;
										height: 100%;
									}
								}
								dd{
									margin-top: 15px;
									height: 15px;
									line-height: 15px;
								}
								.cerBtn{
									width: 80px;
									height: 30px;
									margin-top: 14px;
									background: $activeColor;
									color: #FFFFFF;
									border-radius: 5px;
									line-height: 30px;
									text-align: center;
									cursor: pointer;
								}
							}
						}


					}
			}
		}

	}

</style>
