<template>
<div class="reCharge">
	<h1>账户余额&nbsp;&nbsp;|&nbsp;&nbsp;<span>充值</span></h1>
	<div class="content-wrap">
		<div>
			<div class="wrap-left">转入金额</div>
			<input type="text" placeholder="请输入转账金额" v-model="rechargeAmount" @blur="textCfm" @focus="closeTip"/>
		</div>
		
		<alertTip v-if="showAlert.amount" :showHide="showAlert.amount" @closeTip="closeTip" :alertText="alertText.amount"></alertTip>
		
		<div class="btnBox"><span>下一步</span></div>
		
	</div>
</div>
</template>

<script>
	import AlertTip from "./units/alertTip.vue"
	import Vue from "vue"
	export default{
		name:"reCharge",
		data:function(){
			return{
				rechargeAmount:"",
				showAlert:{amount:false,},//提示框显隐
	        	alertText:{amount:null,},
			}
		},
		components:{
			AlertTip,
		},
		mounted(){
			
		},
		methods:{
			textCfm(){
				
				if(this.rechargeAmount.trim()==""){
					this.showAlert.amount=true;
					this.alertText.amount = "请输入充值金额。"
				}else if(/^(([1-9]\d{0,9}))(\.\d{1,2})?$/gi.test(this.rechargeAmount)!=true){
					this.showAlert.amount=true;
					this.alertText.amount = "转入金额数值必须为不小于1的整数或小数，小数点后不超过2位。"
					console.log(this.alertText.amount)
				}else{
					this.showAlert.amount=false;
				}
				console.log(/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/gi.test(this.rechargeAmount))
			},
			closeTip(){
				this.showAlert.amount=false;
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
$bfColor:#ffffff;
$activeColor:#546686;
.reCharge{
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
		margin-top: 100px;
		margin-left: 250px;
		/*margin-right: 200px;*/
		&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
		.wrap-left{
			float: left;
			color: #494949;
			height: 40px;
			line-height: 40px;
			margin-right: 20px;
		}
		input{
			width: 323px;
			height: 40px;
			line-height: 40px;
			float: left;
			border: 1px #ABABAB solid;
			border-radius: 5px;
			text-indent: 10px;
			background: #F7f7f7;
		}
		.alet_container{
			/*max-width: 350px;*/
			margin-left: 80px;
			.tip_icon{
				float: left;
			}
			p{
				float: right;
			}
		}
		.btnBox{
			width: 100%;
			overflow: hidden;
			span{
				display: block;
				float: left;
				width: 117px;
				height: 33px; line-height: 33px;
				text-align: center;
				background: url(../../assets/img/wallet/bg43.png);
				color: #FFFFFF;
				margin-top: 40px;
				margin-left: 150px;
				cursor: pointer;
				
			}
		}
		
	}
}
</style>