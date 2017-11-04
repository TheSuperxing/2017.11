<template>
	<div class="tradingIndex">
		
		<div class="google">高级搜索</div>
		<div class="result-table">
			<ul class="table-head">
				<li>名称</li>
				<li>发布日期</li>
				<li>酬劳</li>
				<li>申请/查看</li>
				<li>需求对象</li>
			</ul>
			<ul class="result-list">
				<li class="list-wrap">
					<div><router-link :to="{name:'DemandDetail',query:{id:'000'}}">一个需求</router-link></div>
					<div>2017.10.26</div>
					<div>8000</div>
					<div>10/10</div>
					<div class="obj-wrap"><span class="demandObj">个人<i>;</i></span><span class="demandObj">团队<i>;</i></span></div>
					<div class="collect">
						<span class="cancelBtn" @click="cancelCollect()" v-if="haveCollect">
							取消收藏
						</span>
						<span class="collectBtn" v-if="!haveCollect" @click="collectThis()">
							<img src="../../assets/img/demand/icon002.png"/>
							收藏
						</span>
					</div>
				</li>
				<li v-for="item in dataInfo" class="list-wrap">
					<div><router-link :to="{name:'DemandDetail',query:{id:'000'}}">{{item.goodsName}}</router-link></div>
					<div>{{item.discount}}</div>
					<div>{{item.price}}</div>
					<div>{{item.discount}}/{{item.price}}</div>
					<div class="obj-wrap"><span class="demandObj">{{item.className}}<i>;</i></span><span class="demandObj">{{item.className}}<i>;</i></span></div>
					<div class="collect">
						<span class="cancelBtn" @click="cancelCollect()" v-if="haveCollect">
							取消收藏
						</span>
						<span class="collectBtn" v-if="!haveCollect" @click="collectThis()">
							<img src="../../assets/img/demand/icon002.png"/>
							收藏
						</span>
					</div>
				</li>
			</ul>
			<div class="M-box3"></div>
			
			  <div class="page"  v-show="show">
			    <div class="pagelist">
			      <span class="pre"  @click="pageMinus"></span>
			      <span v-show="current_page>5" class="jump" @click="jumpPage(1)">1</span>
			      <span class="ellipsis"  v-show="efont">...</span>
			      <span class="jump" v-for="num in indexs" :class="{bgprimary:current_page==num}" @click="jumpPage(num)">{{num}}</span>
			      <span class="ellipsis"  v-show="ebehind">...</span>
			      <span v-show="current_page<pages-4" class="jump" @click="jumpPage(pages)">{{pages}}</span>
			      <!--<span class="jumppoint">跳转到：</span>-->
			      <span class="jumpinp"><input type="text" v-model="changePage"><em @click="jumpPage(changePage)"></em></span>
			     <!-- <span class="gobtn" >GO</span>-->
			      <span :class="{disabled:pend}" class="next" @click="pagePlus"></span>
			    </div>
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
		name:"tradingIndex",
		data:function(){
			return{
				current_page: 1, //当前页
		        pages: "50", //总页数
		        changePage:'1',//跳转页
		        nowIndex: 0,
		        goodsIArr:[],
		        goodsTArr:[],
		        dataInfo:[],
		        haveCollect:false,//有没有在收藏里
		    }
        },
        mounted() {
        	var that = this;
			var url = "http://datainfo.duapp.com/shopdata/getGoods.php"
//			MyAjax.fetchJsonp(url, function(data){
//				console.log(data)
////				data = data.replace("callback(","");
////				Vue.set(this,"dataInfo",data);
////				console.log(this.dataInfo);
//				
//			},function(err){
//				console.log(err)
//			})
			MyAjax.ajax({
				type: "POST",
				url:url,
				data: {classID:that.changePage},
			}, function(data){
				data = data.replace("callback(","").slice(0,-1);
//				data = data.slice(0,-1);
				data = JSON.parse(data);
				console.log(data)
				that.dataInfo = data
				console.log(that.dataInfo)
			},function(err){
				console.log(err)
			})
        },
    	computed: {
    		show: function() {
    			return this.pages && this.pages != 1
    		},
    		pstart: function() {
    			return this.current_page == 1;
    		},
    		pend: function() {
    			return this.current_page == this.pages;
    		},
    		efont: function() {
    			if(this.pages <= 7) return false;
    			return this.current_page > 5
    		},
    		ebehind: function() {
    			if(this.pages <= 7) return false;
    			var nowAy = this.indexs;
    			return nowAy[nowAy.length - 1] != this.pages;
    		},
    		indexs: function() {

    			var left = 1,
    				right = this.pages,
    				ar = [];
    			if(this.pages >= 7) {
    				if(this.current_page > 5 && this.current_page < this.pages - 4) {
    					left = Number(this.current_page) - 3;
    					right = Number(this.current_page) + 3;
    				} else {
    					if(this.current_page <= 5) {
    						left = 1;
    						right = 7;
    					} else {
    						right = this.pages;

    						left = this.pages - 6;
    					}
    				}
    			}
    			while(left <= right) {
    				ar.push(left);
    				left++;
    			}
    			return ar;
    		},
    	},
    	methods: {
    		jumpPage(num){
    			
    			var that = this;
				var url = "http://datainfo.duapp.com/shopdata/getGoods.php"
	//			MyAjax.fetchJsonp(url, function(data){
	//				console.log(data)
	////				data = data.replace("callback(","");
	////				Vue.set(this,"dataInfo",data);
	////				console.log(this.dataInfo);
	//				
	//			},function(err){
	//				console.log(err)
	//			})
				this.current_page = num;
				MyAjax.ajax({
					type: "POST",
					url:url,
					data: {classID:this.current_page},
				}, function(data){
					data = data.replace("callback(","").slice(0,-1);
	//				data = data.slice(0,-1);
					data = JSON.parse(data);
					console.log(data)
					that.dataInfo = data
					console.log(that.dataInfo)
				},function(err){
					console.log(err)
				})
    		},
    		pagePlus() {
    			this.current_page++;
//  			return this.current_page;
    		},
    		pageMinus() {
    			this.current_page--;
//  			return this.current_page;
    		},
    		cancelCollect(){//取消收藏
//				for(let i=0;i<this.colletionInfo.length;i++){
//					if(id==this.colletionInfo[i].id){
//						this.colletionInfo.splice(i,1)
//					}
//				}
				console.log(this.colletionInfo)
				this.haveCollect = false;

			},
			collectThis(){
//				for(let i=0;i<this.colletionInfo.length;i++){
//					if(id==this.colletionInfo[i].id){
//						this.colletionInfo.splice(i,1,this.detailInfo)
//					}else{
//						this.colletionInfo.push(this.detailInfo)
//					}
//				}
				console.log(this.colletionInfo)
				this.haveCollect = true;
			},
    	},
    	watch:{
    		current_page:function(){
    			this.jumpPage(this.current_page);
    		}
    	}
	}
</script>

<style lang="scss" scoped="scoped">
$activeColor:#546686;
$bfColor : #ffffff;
.tradingIndex{
	width: 1200px;
	min-height: 500px;
	background: $bfColor;
	.google{
		width: 1200px;
		min-height: 50px;
		line-height: 50px;
		text-align: center;
		background: papayawhip;
		margin-bottom: 30px;
		box-shadow: 6px 5px 5px #999999;
	}
	.result-table{
		width: 1200px;
		/*min-height: 600px;*/
		position: relative;
		.table-head{
			width: 1200px;
			height: 58px;
			background: #f8f8f8;
			border: 1px solid #E0E0E0;
			padding: 0 20px;
			li{
				float: left;
				height: 58px;
				line-height: 58px;
				text-align: center;
				&:nth-child(1){
					text-align: left;
					width: 230px;
				}
				&:nth-child(2){
					width: 176px;
				}
				&:nth-child(3){
					width: 250px;
				}
				&:nth-child(4){
					width: 170px;
				}
				&:nth-child(5){
					width: 170px;
				}
			}
		}
		.result-list{
			padding:5px 20px;
			.list-wrap{
				height: 50px;
				line-height: 50px;
				border-bottom:1px dotted #E0E0E0 ;
				>div{
					height: 50px;
					line-height: 50px;
					text-align: center;
					float: left;
					&:nth-child(1){
						text-align: left;
						width: 230px;
						text-overflow:ellipsis; white-space:nowrap; overflow:hidden;
						cursor: pointer;
						a{
							color: #535353;
						}
					}
					&:nth-child(2){
						width: 176px;
					}
					&:nth-child(3){
						width: 250px;
					}
					&:nth-child(4){
						width: 170px;
					}
					&:nth-child(5){
						width: 170px;
					}
					
					
					
				}
				.obj-wrap{
					display: -moz-box;
				    display: -webkit-box;
				    display: -ms-flexbox;
				    display: -webkit-flex;
				    display: flex;
				    -moz-box-align: center;
				    -webkit-box-align: center;
				    -ms-flex-align: center;
				    -webkit-align-items: center;
				    align-items: center;
				    -moz-box-pack: center;
				    -webkit-box-pack: center;
				    -ms-flex-pack: center;
				    -webkit-justify-content: center;
				    /*for ie9*/
				    justify-content: center;
					.demandObj{
						margin-right: 5px;
						&:last-of-type{
							margin-right:0;
							i{
								display: none;
							}
						}
					}
				}
				.collect{
					float:right;
					/*margin-right: 30px;*/
					.cancelBtn{
						float: right;
						width: 80px;
						height: 30px;
						line-height: 30px;
						margin-top: 10px;
						color: #FFFFFF;
						cursor: pointer;
						font-size: 14px;
						margin-left: 15px;
						background: #333333;
						border-radius:5px; 
						&:last-of-type{
							/*margin-right: 20px;*/
						}
						
						
					}
					.collectBtn{
						width: 80px;
						height: 30px;
						line-height: 30px;
						text-align: center;
						color: #FFFFFF;
						float: right;
						background: url(../../assets/img/demand/icon007.png) no-repeat;
						font-size: 14px;
						cursor: pointer;
						/*margin-right: 20px;*/
						margin-top: 10px;
						img{
							/*display: inline-block;*/
							margin-bottom: 3px;
		
						}
						
					}
				}
				&:hover{
					color: #f27519;
					a{
						color:#f27519 !important;
					}
					.collectBtn{
						background: url(../../assets/img/demand/icon008.png) no-repeat;
					}
				}
			}
		}
		.page {
			/*min-width: 900px;*/
			text-align: center;
			color: #888888;
			
			 /*transform:translateX(-50%);
			 -webkit-transform:translateX(-50%);
			-moz-transform:translateX(-50%);
			-ms-transform:translateX(-50%);
			-o-transform:translateX(-50%);*/
			 display: table;
   			 margin: 30px auto 80px;
			
			.pagelist {
				font-size: 0;
				height: 34px;
				/*line-height: 50px;*/
				span {
					font-size: 14px;
					float: left;
					width: 28px;
					height: 28px;
					line-height: 28px;
					margin-right: 14px;
					
				}
				.jump {
					border: 1px solid #6d7d9b;
					width: 28px;
					height: 28px;
					line-height: 26px;
					text-align: center;
					-webkit-border-radius: 14px;
					-moz-border-radius: 14px;
					border-radius: 14px;
					cursor: pointer;
					margin-top: 3px;
					
					
				}
				.pre,.next{
					width: 34px;
					height: 34px;
					border: none;
					-webkit-border-radius: 17px;
					-moz-border-radius: 17px;
					border-radius: 17px;
					background: url(../../assets/img/demand/icon013.png) no-repeat;
				}
				.pre{
					margin-right: 50px;
					transform: rotateY(180deg);
					-webkit-transform: rotateY(180deg);    /* for Chrome || Safari */
           			-moz-transform: rotateY(180deg);       /* for Firefox */
           			-ms-transform: rotateY(180deg);        /* for IE */
	                -o-transform: rotateY(180deg);         /* for Opera */
				}
				.next{
					margin-left: 50px;
				}
				.bgprimary {
					cursor: default;
					line-height: 23px;
					/*color: #fff;*/
					/*background: #337ab7;*/
					border: 3px solid #6d7d9b;
					
				}
				.jumpinp{
					margin-top: 3px;
					height:28px;
					width: 79px;
					/*border: 1px solid #ccc;*/
					
					-webkit-border-radius: 14px;
					-moz-border-radius: 14px;
					border-radius: 14px;
					padding-left: 10px;
					background: url(../../assets/img/demand/icon010.png) no-repeat center;
					overflow: hidden;
					input{
						width: 40px;
						height: 24px;
						font-size: 13px;
						text-align: center;
						margin-top: 2px;
						float: left;
					}
					em{
						width: 24px;
						height: 24px;
						float: right;
						margin-top: 2px;
						margin-right: 2px;
						background: url(../../assets/img/demand/icon001.png) no-repeat right center;
					}
				}
				
				
				.ellipsis {
					padding: 0px 8px;
				}
				
				.jumppoint {
					margin-left: 30px;
				}
				.gobtn {
					font-size: 12px;
				}
				.disabled {
					pointer-events: none;
					background: #ddd;
				}
			}
		}
	}
}
</style>