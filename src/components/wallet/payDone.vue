<template>
	<div class="payDone">
		<div class="succseed" v-if="successShow">
			<p>
				支付成功！
			</p>
			<div class="btnBox" ><span @click="done">完成</span></div>
			<h5>如有疑问，请及时联系管理员！</h5>
		</div>
		<div class="failed" v-if="!successShow">
			<p>
				支付失败！
			</p>
			<div class="btnBox" ><span @click="done">完成</span></div>
			<h5>如有疑问，请及时联系管理员！</h5>
		</div>
		
	</div>
	
</template>

<script>
	import router from "../../router"
	
	export default{
		name:"payDone",
		data:function(){
			return{
				successShow:false,
				
			}
		},
		methods:{
			done(){
				router.push("/yhzx/demand/wallet")
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
$bfColor:#ffffff;
	$activeColor:#546686;
	.payDone{
		padding: 30px 20px;
	width: 940px;
	height: 405px;
	float: left;
	background: $bfColor;
	border-radius: 5px;
		
		.succseed,.failed{
			width:200px;
			margin:70px auto;
			p{
				width: 200px;
				height: 28px;
				line-height: 28px;
				color: #F37213;
				font-size: 24px;
				text-align: left;
				padding-left: 48px;
				margin-left: 18px;
				background: url(../../assets/img/wallet/icon64.png) no-repeat left center;
			}
			.btnBox{
				width: 120px;
				margin: 0 auto;
				span{
					display: inline-block;
					width: 120px;
					height: 42px;
					line-height: 42px;
					text-align: center;
					color: #FFFFFF;
					margin-top: 80px;
					background: url(../../assets/img/wallet/bg46.png);
					cursor: pointer;
				}
			}
			h5{
				font-style: normal;
				color: #8f8f8f;
				margin-top: 20px;
			}
		}
		.failed{
			p{
				background: url(../../assets/img/wallet/icon65.png) no-repeat left center;
				color: #787878;
			}
		}
	}
</style>