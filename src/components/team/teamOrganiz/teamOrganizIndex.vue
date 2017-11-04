<template>
  <div class="teamOrganizIndex">
    <h3 class="t-title"><span>{{title}}</span></h3>
    <div class="orgTable"><!--高管部分 begin-->
    	<p class="org-title"><img src="../../../assets/img/team/icon_management.png" />高管团队</p>
    	<ul class="seniorInfo">
    		<li class="stateOne" v-if="haveSenior">(暂无高管团队)</li><!--暂无高管团队-->
    		<li v-for="(item,index) in orgaInfo.senior" class="seniorList" v-if="!haveSenior"><!--有高管团队-->
    			<dl class="senior">
    				<dt>
    					<img src="../../../assets/img/team/senior-green.png" v-if="cerState.senior[index]"/>
    					<img src="../../../assets/img/team/senior-gray.png" v-if="!cerState.senior[index]"/>
    				</dt>
    				<dd class="seniorName">{{item.dealId}}</dd>
    			</dl>
    			<span class="deleSen" @click="removeSenior(index)" v-if="editSeniorShow"></span>
    		</li>
    		<li class="addMoreS" @click="overlay" v-if="editSeniorShow"></li>

    		<!--添加高管模态框-->
				<div id="modal-overlay" class="modal-a">
					<div class="searchSenior">
						<h5>搜索个人用户</h5>
						<span class="modalChaBtn" @click="closeModal"></span>
						<div class="content-wrap">
								<div class="search-wrap">
									<span class="wrap-left">个人用户手机号</span>
									<p class="wrap-right">
										<input type="text" v-model="searchText"/>
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
									<span class="confirmBtn">确认</span>
								</div>
						</div>
					</div>
				</div>
				<!--添加高管模态框-->
				<div class="btnBox" v-if="editSeniorShow">
					<span class="saveBtn" @click="editDoneSenior">保存</span>
					<span class="cancelBtn" @click="cancleEditSenior">取消</span>
				</div>
    	</ul>


    <span class="editPersonBtn" @click="toEditSenior" v-if="!editSeniorShow">编辑</span>
    </div><!--高管部分 end-->
    <div class="orgTable"><!--骨干部分 begin-->
    	<p class="org-title"><img src="../../../assets/img/team/icon_bigpotato.png"/>重要骨干</p>
    	<ul class="backboneInfo">
    		<li class="stateOne" v-if="haveBackbone">(暂无骨干团队)</li><!--暂无骨干-->
    		<li v-for="(item,index) in orgaInfo.backbone" class="backboneList" v-if="!haveBackbone"><!--有骨干团队-->
    			<dl class="backbone">
    				<dt>
    					<img src="../../../assets/img/team/senior-green.png" v-if="cerState.backbone[index]"/>
    					<img src="../../../assets/img/team/senior-gray.png" v-if="!cerState.backbone[index]"/>

    				</dt>
    				<dd class="seniorName">{{item.dealId}}</dd>
    			</dl>
    			<span class="deleSen" @click="removeBackbone(index)" v-if="editBackboneShow"></span>
    		</li>
    		<li class="addMoreS" @click="overlay" v-if="editBackboneShow"></li>

				<div class="btnBox" v-if="editBackboneShow">
					<span class="saveBtn" @click="editDoneBackbone">保存</span>
					<span class="cancelBtn" @click="cancleEditBackbone">取消</span>
				</div>
    	</ul>

    	<span class="editPersonBtn" @click="toEditBackbone" v-if="!editBackboneShow">编辑</span>
    </div><!--骨干部分 end-->



    <div class="orgTable"><!--下属员工部分-->
    	<p class="org-title"><img src="../../../assets/img/team/icon_staff.png" />下属成员</p>
    	<p class="notice">
    		团队可以添加个人用户成为其成员，个人用户在其“工作经历”中同样添加对应团队或者确认后，才会正式成为认证成员。
    	</p>
    	<div class="staff">


            <div v-if="haveStaff" class="staffList">
            	<p class="stateNone">(此处暂无下属成员)</p>
            </div>
            <div v-if="!haveStaff" class="staffList">
            	<ul v-if="tab.aa[0]">
            		<li v-for="(item,index) in orgaInfo.staff">
            			<dl class="person">
            				<dt>
								<img src="../../../assets/img/team/staff-green.png" v-if="cerState.staff[index]"/>
								<img src="../../../assets/img/team/staff-gray.png" v-if="!cerState.staff[index]"/>
            				</dt>
            				<dd>{{item.dealId}}</dd>
            			</dl>
            			<span class="deleSen" @click="removeStaff(index)" v-if="editStaffShow"></span>
            		</li>
            		<li class="addMoreS" @click="overlay" v-if="editStaffShow"></li>
            	</ul>

            </div>


    		<span class="editPersonBtn" @click="editPerson" v-if="!editStaffShow">编辑</span>
    		<div class="btnBox" v-if="editStaffShow">
					<span class="saveBtn" @click="saveEditPerson">保存</span>
					<span class="cancelBtn" @click="cancleEditPerson">取消</span>
				</div>
    	</div>

    </div>
    <div class="orgTable"><!--所属公司部分-->
			<p class="org-title"><img src="../../../assets/img/team/icon_company.png" />所属公司</p>
			<ul class="companyInfo">
				<li class="stateNone" v-if="haveCompany">(暂无所属公司)</p>
				<li class="addMoreC" @click="overlay_com" v-if="haveCompany">添加所属公司</li>
				<li v-for="(item,index) in orgaInfo.company" class="companyList">
					<p class="comName">
						{{item.companyName}}
					</p>
					<span class="deleSen" @click="removeCompany(index)" v-if="editCompanyShow"></span>
				</li>
				<li class="addMoreS" @click="overlay_com" v-if="!haveCompany">更改所属公司</li>
				
	
			</ul>
			
			<!--<span class="addMoreS" @click="toEditCompany" v-if="!editCompanyShow"></span>-->
			<!--添加	公司模态框-->
				<div id="modal-overlay" class="modal-b">
					<div class="searchCompany">
						<h5>搜索公司</h5>
						<span class="modalChaBtn" @click="closeModal"></span>
						<div class="content-wrap">
								<div class="search-wrap">
									<span class="wrap-left">公司名称</span>
									<p class="wrap-right">
										<input type="text" />
										<span class="sBtn"><img src="../../../assets/img/team/icon.search.png" />搜索</span>
									</p>
								</div>
								<div class="result-wrap">
									<span class="wrap-left">搜索结果</span>
									<ul class="resultList">
										<li class="noResult">抱歉，未找到该项目，请重新搜索</li>
										<li v-for="" @click="choseThis">
											<router-link :to="{name:'TeamProDetail',query:{id:'1'}}">王大麻子</router-link>
											<span class="choseBtn">
											</span>
										</li>
										<li v-for="" @click="choseThis">
											<router-link :to="{name:'TeamProDetail',query:{id:'1'}}">王大麻子</router-link>
											<span class="choseBtn">
											</span>
										</li>
										<li v-for="" @click="choseThis">
											<router-link :to="{name:'TeamProDetail',query:{id:'1'}}">王大麻子</router-link>
											<span class="choseBtn">
											</span>
										</li>
										
									</ul>
									<router-link to="/yhzx/team/info/teamOrganiz/defineCompany" @click="closeModal">
										<div class="goToDefinedCom">自定义添加公司</div>
									</router-link>
									<span class="confirmBtn">确认</span>
								</div>
						</div>
					</div>
				</div>
				<!--添加公司模态框-->
		</div>

  </div>

</template>

<script>
	//import axios from "axios";
	import Vue from "vue"
	import {mapState} from "vuex"
	import Modal from "../../../assets/js/modal.js"
  export default {
    name:"teamOrganizIndex",
    data:function(){
      return {
        title:"团队组织信息",
        haveStaff:false,/*有无员工(控制高管及骨干模态框 有无员工可搜索)*/
        haveSenior:false,/*有无高管*/
       	haveBackbone:false,/*有无骨干*/
       	haveCompany:false,
       	cerState:{
       		senior:[],
       		backbone:[],
       		staff:[]
       	},
        state:"",
        editSeniorShow:false,
        editBackboneShow:false,
        editCompanyShow:false,
        editStaffShow:false,/*员工编辑状态的添加取消认证的按钮显隐*/
       	addCerArr:[],/*移除并添加认证的未认证员工*/
       	removeCerArr:[],/*移除并取消认证的已认证员工*/
        Tabflag:0,
        active:0,
        orgaInfo:{
        	senior:[],
        	backbone:[],
        	staff:[],
        	company:[]
        },
        tabbarinfo:[
        	{txt:"未认证员工",pic1:require("../../../assets/img/company/Authentication02.png"),
        	pic2:require("../../../assets/img/company/Authentication04.png"),
        	num:"10"
        	},
        	{txt:"已认证员工",pic1:require("../../../assets/img/company/Authentication01.png"),
        	pic2:require("../../../assets/img/company/Authentication03.png"),
        	num:"8"
        	}
        ],
        tab:{aa:[true,false]},
        have:{value:""},
       	searchText:"", /*搜索框input值*/
        list:[], /*搜索结果*/


      }
    },

    computed:mapState({
      teamOrgaInfo:state=>state.team.teamMessage.teamOrgaInfo/*获取vuex数据*/
    }),
    mounted(){
//  	console.log(this.teamOrgaInfo);
    	var str = JSON.stringify(this.teamOrgaInfo);
    	var data = JSON.parse(str);
    	console.log(data);

    	for(var item in data){/*遍历  引用赋值*/

    		this.orgaInfo.senior = data.senior;
    		this.orgaInfo.backbone = data.backbone;
    		this.orgaInfo.staff = data.staff;
    		this.orgaInfo.company = data.company;
    		for(var i=0; i<data[item].length; i++){
    				//console.log(data.item)
						switch (item){
							case "senior":
								this.cerState.senior.push(data[item][i].cerState)
								break;
							case "backbone":
								this.cerState.backbone.push(data[item][i].cerState)
								break;
							case "staff":
								this.cerState.staff.push(data[item][i].cerState)
								break;
							default:
								break;
						}
    		}
    		console.log(this.cerState)

    	}
//  	console.log(this.orgaInfo)
    	/*判断有无高管团队*/
    	if(this.teamOrgaInfo.senior.length==0){
    		this.haveSenior = true;
    	}
    	if(this.teamOrgaInfo.backbone.length==0){

    		this.haveBackbone = true;
    	}
    	if(this.teamOrgaInfo.staff.length==0){
    		this.haveStaff = true;
    	}
    	if(this.teamOrgaInfo.company.length==0){
    		this.haveCompany = true;
    	}

			/*判断是否被对方个人确认添加*/
			for(var i=0;i<this.orgaInfo.senior.length;i++){

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
//  		$('.seniorInfo').css("display","none").siblings('.editPersonBtn').css("display","none");
    		this.editSeniorShow = true;

//  		console.log($('.seniorInfo'));
    	},
    	editDoneSenior(){
    		var str = JSON.stringify(this.orgaInfo);
	    	var data = JSON.parse(str);
    		for(var item in data){
    			this.teamOrgaInfo.senior = data.senior;
    		}
    		this.editSeniorShow = false;

    		$('.seniorInfo').css("display","block").siblings('.editPersonBtn').css("display","block");

    	},
    	cancleEditSenior(){/*取消编辑的高管状态 （再获取一次vuex数据放到页面）*/

    		var str = JSON.stringify(this.teamOrgaInfo);
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
    			this.teamOrgaInfo.backbone = data.backbone;
    		}
    		this.editBackboneShow = false;
    		$('.backboneInfo').css("display","block").siblings('.editPersonBtn').css("display","block");
    	},
    	cancleEditBackbone(){/*取消编辑的高管状态 （再获取一次vuex数据放到页面）*/

    		var str = JSON.stringify(this.teamOrgaInfo);
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
    	toEditCompany(){
    		this.editCompanyShow = true;
    		$(this).parent().remove()
    	},
    	editDoneCom(){
    		var str = JSON.stringify(this.orgaInfo);
	    	var data = JSON.parse(str);
    		for(var item in data){
    			this.teamOrgaInfo.company = data.company;
    		}
    		this.editCompanyShow = false;
    	},
    	cancleEditCom(){
    		var str = JSON.stringify(this.teamOrgaInfo);
	    	var data = JSON.parse(str);
	    	console.log(data);
	    	for(var item in data){/*遍历  非引用赋值*/
	    		this.orgaInfo.senior = data.senior;
	    		this.orgaInfo.backbone = data.backbone;
	    		this.orgaInfo.staff = data.staff;
	    		this.orgaInfo.company = data.company
	    	}
    		this.editCompanyShow = false;
    	},
    	removeCompany(index){
    		
    		this.orgaInfo.company.splice(index,1);
    		if(this.orgaInfo.company.length===0){
	    		this.haveCompany = true;
	    	}
    	},
    	removeSenior(index){
//  		var that = this;
    		this.orgaInfo.senior.splice(index,1);

    		console.log($(this))

    	},
    	removeBackbone(index){
			
    		this.orgaInfo.backbone.splice(index,1);


    	},
    	removeStaff(index){
    		this.orgaInfo.staff.splice(index,1);
    	},
    	editPerson(){
    		this.editStaffShow = true;
//  		console.log(this.showCer)
    	},
    	saveEditPerson(){
    		/*保存取消和添加认证的操作到本地中*/
    		var str = JSON.stringify(this.orgaInfo);
	    	var data = JSON.parse(str);
    		for(var item in data){
    			this.teamOrgaInfo.staff = data.staff;
    		}
    		this.editStaffShow = false; /*关闭取消和添加按钮显示*/

    	},
    	cancleEditPerson(){
    		var str = JSON.stringify(this.teamOrgaInfo);
	    	var data = JSON.parse(str);
	    	console.log(data);
	    	for(var item in data){/*遍历  非引用赋值*/
	    		this.orgaInfo.senior = data.senior;
	    		this.orgaInfo.backbone = data.backbone;
	    		this.orgaInfo.staff = data.staff;
	    		this.orgaInfo.company = data.company
	    	}
	    	this.editStaffShow = false; /*关闭取消和添加按钮显示*/
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
    			var modalA= $('.modal-a')
					Modal.makeText(modalA)

//  			var modalC = $('.modal-c')
//  			Modal.makeText(modalC)

			},
			overlay_com(){
					var modalB = $('.modal-b')
					Modal.makeText(modalB)
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
    updated(){
    	if(this.teamOrgaInfo.senior.length===0){
    		this.haveSenior = true;
    	}
    	if(this.teamOrgaInfo.backbone.length===0){
    		this.haveBackbone = true;
    	}
    	if(this.teamOrgaInfo.staff.length===0){
    		this.haveStaff = true;
    	}
    	if(this.teamOrgaInfo.company.length===0){
    		this.haveCompany = true;
    	}

    	console.log(this.teamOrgaInfo.backbone)
    	console.log(this.orgaInfo.backbone);
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

<style lang="scss" scoped="">
	$bfColor:#ffffff;
	$activeColor: #02a672;
	.teamOrganizIndex{
		width:940px;
		padding: 40px 40px 80px 40px;
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
		.searchSenior{
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
	    	overflow: hidden;
	    		.search-wrap,.result-wrap{
						text-align: center;
						padding-left:35px;
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
								background: url(../../../assets/img/team/icon_searching.png) no-repeat center;
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
	    		.result-wrap{
	    			padding-left: 90px;
	    		}

	    }
		}
		.searchCompany{
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
	    	overflow: hidden;
	    		.search-wrap,.result-wrap{
						text-align: center;
						padding-left:70px;
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
								background: url(../../../assets/img/team/icon_searching.png) no-repeat center;
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
						.goToDefinedCom{
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


	    }
		}
		.orgTable{
			padding:30px 0 30px 20px;
			border-bottom:1px solid #ebebeb;
			&:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;}
			.editPersonBtn{/*编辑键*/
				height: 15px;
				line-height: 15px;
				text-align: left;
				padding-left: 27px;
				color: $activeColor;
				cursor: pointer;
				background: url(../../../assets/img/team/icon_green-edit.png) no-repeat left center;
			}
			.btnBox{/*保存取消对键*/
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
			.org-title{ /*标题*/
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
				padding: 30px 0;
				overflow: hidden;
				.stateOne{
					color: #898989;
					margin-bottom: 20px;
				}
				.addMoreS{
					float: left;
					width: 100px;
					height: 100px;
					cursor: pointer;
					border-radius: 50%;
					border: 1px dotted #d0d1d2;
					background: url(../../../assets/img/team/icon_add.png) no-repeat center;
				}
				.seniorList,.backboneList{
					width: 100px;
					height: 130px;
					float: left;
					margin-right: 30px;
					position: relative;
					margin-bottom: 30px;
					.imgBox{
							width: 100px;
							height: 100px;
							border-radius: 50%;
							background:#e6e6e6;
							position:relative;
						img{
							position:absolute;top:50%;left:50%;
							transform:translate(-50%,-50%);
							-webkit-transform:translate(-50%,-50%);
							-moz-transform:translate(-50%,-50%);
							-ms-transform:translate(-50%,-50%);
							-o-transform:translate(-50%,-50%);

						}
					}

					.seniorName,.backboneName{
						text-align: center;
						height: 45px;
						line-height: 45px;
					}
					.deleSen{
						width: 17px;
						height: 17px;
						background: url(../../../assets/img/team/icon_green_cancel.png) no-repeat center;
						display: block;
						position: absolute;
						top: 0; right: 0;
						cursor: pointer;
					}
				}

			}


			&:nth-of-type(3){
				border-bottom:1px solid #ebebeb;

				.notice{
					padding-top: 20px;
				}
				.staff{
					margin-top: 30px;
					padding-bottom: 40px;
					overflow: hidden;
					position: relative;

					.editPersonBtn{
							position: absolute;
							right: 10px;
							top: 0;
					}


				}
				.staffList{
						padding-top: 20px;
						overflow: hidden;
						&:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;}
						.stateNone{
							font-size: 18px;
							color: #898989;
						}
						.addMoreS{
							float: left;
							width: 80px;
							height: 80px;
							cursor: pointer;
							border-radius: 50%;
							border: 1px dotted #d0d1d2;
							background: url(../../../assets/img/team/icon_add.png) no-repeat center;
						}
						li{
							margin-right: 30px;
							margin-bottom: 30px;
							float: left;
							color: $activeColor;
							overflow: hidden;
							position: relative;
							.deleSen{
								width: 12px;
								height: 12px;
								background: url(../../../assets/img/team/icon_green_cancel.png) no-repeat center;
								display: block;
								position: absolute;
								top: 0; right: 0;
								cursor: pointer;
							}
							.person{
								text-align: center;
								dt{
									width: 80px;
									height: 80px;

									.imgBox{
										width: 80px;
										height: 80px;
										border-radius: 50%;
										background:#e6e6e6;
										position:relative;
									img{
										width: 60%;
										position:absolute;top:50%;left:50%;
										transform:translate(-50%,-50%);
										-webkit-transform:translate(-50%,-50%);
										-moz-transform:translate(-50%,-50%);
										-ms-transform:translate(-50%,-50%);
										-o-transform:translate(-50%,-50%);

										}
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
			}/*下属员工*/

			.companyInfo{/*所属公司*/
				padding: 20px 0;
				.editPersonBtn{
					display: inline-block;

				}
				.companyList{
					height: 35px;
					line-height: 35px;
					position: relative;
					padding-left: 10px;
					
					&:hover{
						background: #F1f1f1;
					}
					.comName{
						cursor: pointer;
					}
					.deleSen{
						width: 17px;
						height: 17px;
						background: url(../../../assets/img/team/icon_green_cancel.png) no-repeat center;
						display: inline-block;
						position: absolute;
						top: 10px; right: 10px;
						cursor: pointer;
					}

				}
				.addMoreC{
					float: left;
					margin-top: 15px;
					cursor: pointer;
					padding-left: 24px;
					color: $activeColor;
					background: url(../../../assets/img/team/plus.png) no-repeat left center;
				}
				.addMoreS{
					float: left;
					margin-top: 15px;
					cursor: pointer;
					padding-left: 24px;
					color: $activeColor;
					background: url(../../../assets/img/team/icon_green-edit.png) no-repeat left center;
				}
			}
		}

	}

</style>
