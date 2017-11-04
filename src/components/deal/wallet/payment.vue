<template>
<div class="payment">
	<h1>账户余额&nbsp;&nbsp;|&nbsp;&nbsp;<span>支付</span></h1>
	<ul class="content-wrap">
		<li class="wrap">
			<div class="wrap-left">对应协议</div>
			<div class="dealname">
				<div v-text="paymentInfo.dealName" class="selected" @click="toChoseDeal"></div>
				<ul class="options-deal" v-if="dealShow">
					<li v-for="(item,index) in dealsInfo"   @click="selectDealName(index)" >{{item.name}}</li>
				</ul>
				
			</div>
		</li>
		<li class="wrap">
			<div class="wrap-left">阶段内容</div>
			
			<div class="stagename">
				<div v-text="paymentInfo.stageName" class="selected" @click="toChoseStage"></div>
				<ul class="options-stage" v-if="stageShow"> 
					<li v-for="(item,index) in selectedDeal.stage" v-text="item.name" @click="selectStageName(index)">{{item.name}}</li>
				</ul>
				
			</div>
		</li>
		<li class="wrap">
			<div class="wrap-left">支付金额</div>
			<input type="text" placeholder="请输入转账金额" v-model="paymentInfo.amount" @blur="textCfm" @focus="closeTip"/>
		</li>
		<alertTip v-if="showAlert.amount" :showHide="showAlert.amount" @closeTip="closeTip" :alertText="alertText.amount"></alertTip>
		<div class="btnBox" ><span @click="next">下一步</span></div>
		
	</ul>
	
	
</div>
</template>

<script>
	document.onclick=function(e){
//		console.log(e.target.getAttribute('class'))
		if(e.target.getAttribute('class')!='selected'){
			$(".options-deal").hide();
//			$(".options-stage").hide();
		}else{
			if($(".options-deal").css("display") =="block"){
				$(".options-stage").hide();
			}
		}
	}
	import AlertTip from "./units/alertTip.vue"
	import router from "../../../router"
	export default{
		name:"payment",
		data:function(){
			return{
				paymentInfo:{
					dealName:"",
					stageName:"",
					amount:"",
					
				},//上传的数据
				selectedDeal:{
//					dealnames:this.dealsInfo,
					stages:"",
					
				},
				dealShow:false,
				stageShow:false,
				showAlert:{amount:false,},//提示框显隐
	        	alertText:{amount:null,},
				
				step:[true,false,false],
				dealsInfo:[
					{
						name:"与万达的协议",
						amountAll:"90000",
						stage:[
							{
								name:"一楼一期",
								amount:"5000",
							},{
								name:"一楼二期",
								amount:"5000",
							},{
								name:"二楼全程",
								amount:"8000",
							}
						]
					},{
						name:"与携程的协议",
						amountAll:"90000",
						stage:[
							{
								name:"凌空SOHO一期",
								amount:"5000",
							},{
								name:"凌空SOHO二期",
								amount:"5000",
							},{
								name:"凌空SOHO园区地面",
								amount:"8000",
							}
						]
					},{
						name:"与绿地的协议",
						amountAll:"90000",
						stage:[
							{
								name:"一楼一期",
								amount:"5000",
							},{
								name:"一楼二期",
								amount:"5000",
							},{
								name:"二楼全程",
								amount:"8000",
							}
						]
					},
				]
			}
		},
		components:{
			AlertTip
		},
		methods:{
			selectDealName(index){
//				console.log(22)
				this.paymentInfo.stageName ="";
				for(var i=0;i<this.dealsInfo.length;i++){
//					console.log(this.paymentInfo.dealName)
					
					if(index == i){
//						console.log("ok")
						this.selectedDeal.stage = this.dealsInfo[index].stage;
						this.paymentInfo.dealName = this.dealsInfo[index].name;
						$(".options-deal li").eq(index).css("background-color","#5c5c5d")
						this.dealShow = false;
						
					}
				}
				console.log(this.selectedDeal.stage)
			},
			selectStageName(index){
				for(var i=0;i<this.selectedDeal.stage.length;i++){
					if(index == i){
//						console.log(444)
						this.paymentInfo.stageName = this.selectedDeal.stage[index].name;
						this.stageShow = false;
					}
				}
			},
			toChoseDeal(){
				
				if(this.dealShow==false){
					this.dealShow = true;
				}else{
					this.dealShow = false;
				}
			},
			toChoseStage(){
				if(this.stageShow==false){
					this.stageShow = true;
				}else{
					this.stageShow = false;
				}
			},
			textCfm(){
				
				if(this.paymentInfo.amount.trim()==""){
					this.showAlert.amount=true;
					this.alertText.amount = "请输入充值金额。"
				}else if(/^(([1-9]\d{0,9}))(\.\d{1,2})?$/gi.test(this.paymentInfo.amount)!=true){
					this.showAlert.amount=true;
					this.alertText.amount = "转入金额数值必须为不小于1的整数或小数，小数点后不超过2位。"
					console.log(this.alertText.amount)
				}else{
					this.showAlert.amount=false;
				}
				console.log(/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/gi.test(this.paymentInfo.amount))
			},
			closeTip(){
				this.showAlert.amount=false;
			},
			next(){
				
				if(/\d+/gi.test(this.paymentInfo.amount)==false){
					console.log(222)
					this.showAlert = true;
					this.alertText = "请输入金额数字。"
				}else{
					this.showAlert = false;
				}
				console.log(this.paymentInfo)
				if(this.paymentInfo.stageName==""){
					this.showAlert = true;
					this.alertText = "请选择阶段内容。"
				}
				if(this.paymentInfo.dealName==""){
					this.showAlert = true;
					this.alertText = "请选择对方协议。"
				}
				if(/\d+/gi.test(this.paymentInfo.amount)!=false&&this.paymentInfo.stageName!=""&&this.paymentInfo.dealName!=""){
					router.push("/yhzx/deal/wallet/paymentPwd")
				}
				
			},
			
			
			
		}
	}
</script>

<style lang="scss" scoped="scoped">
$bfColor:#ffffff;
$activeColor:#546686;
.payment{
	padding: 30px 20px;
	width: 940px;
	height: 405px;
	float: left;
	background: $bfColor;
	border-radius: 5px;
	h1{
		font-size: 18px;
		font-weight: bold;
		color: $activeColor;
		span{
			color: #F77718;
		}
	}
	.content-wrap{
		margin-top: 26px;
		margin-left: 250px;
		/*margin-right: 200px;*/
		position: relative;
		.wrap-left{
				float: left;
				color: #494949;
				height: 40px;
				line-height: 40px;
				margin-right: 20px;
			}
		.alet_container{
			bottom: 60px;
			left: 80px;
		}
		
		.wrap{
			margin-bottom: 20px;
			&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
			.wrap-left{
				float: left;
				color: #494949;
				height: 40px;
				line-height: 40px;
				margin-right: 20px;
			}
			.dealname,.stagename{
				width: 323px;
				height: 40px;
				line-height: 40px;
				float: left;
				border: 1px #ABABAB solid;
				border-radius: 5px;
				text-indent: 10px;
				background: #F7F7F7;
				position: relative;
				 .selected{
				 	height: 40px;line-height: 40px;
				 	padding-right: 15px;
				 	background: url(../../../assets/img/wallet/icon12.png) no-repeat right center;
				 	background-position: 295px;
				 }
				.options-deal,.options-stage{
					width: 100%;
					position: absolute;
					z-index: 9;
					border: 1px solid #e0e0e0;
					li{
						background: rgba(230,230,230,.6);
						 
					  &:hover{
					  	background: rgba(100,100,100,.6);
					  	color: #FFFFFF;
					  }
						
					}
				}
				
			}
		}
		.alet_container{
			position: absolute;
			bottom: 100px;
			left: 60px;
			.tip_icon{
				float: left;
			}
			p{
				float: right;
			}
		}
		
		input{
			width: 323px;
			height: 40px;
			line-height: 40px;
			float: left;
			border: 1px #ABABAB solid;
			border-radius: 5px;
			text-indent: 10px;
			background: #F7F7F7;
		}
		
		.btnBox{
			width: 100%;
			margin-bottom: 40px;
			margin-top: 40px;
			overflow: hidden;
			span{
				display: block;
				float: left;
				width: 117px;
				height: 33px; line-height: 33px;
				text-align: center;
				background: url(../../../assets/img/wallet/bg43.png);
				color: #FFFFFF;
				margin-top: 20px;
				
				margin-left: 150px;
				cursor: pointer;
				
			}
		}
		
	}
}
</style>