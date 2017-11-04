<template>
<div class="myWallet">
	<h1 class="wallet-title">
		<div class="tab-bar"><router-link to="/yhzx/demand/wallet/mywallet/index">首页</router-link></div>
		<div class="tab-bar"><router-link to="/yhzx/demand/wallet/mywallet/account">账户设置</router-link></div>
	</h1>
	<router-view></router-view>
</div>
</template>

<script>
	export default{
		name:"myWallet",
		data:function(){
			return{
				
			}
		},
		
	}
</script>

<style lang="scss" scoped="scoped">
$bfColor:#ffffff;
$activeColor:#546686;
.myWallet{
	width: 940px;
	float: left;
	padding: 25px 20px 60px;
	background: $bfColor;
	border-radius: 5px;
	.wallet-title{
		height: 48px;
		border-bottom: 1px #ebebeb solid;
		&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
		.tab-bar{
			float: left;
			width: 120px;
			/*height: 33px;*/
			
			a{
				display: inline-block;
				width: 120px;
				height: 48px;
				line-height: 48px;
				text-align: center;
				padding-bottom: 15px;
				font-size: 18px;
				color: #969696;
				&.router-link-active{
					color: $activeColor;
					border-bottom:2px $activeColor solid;
				}
			}
		}
		
	}
}
</style>