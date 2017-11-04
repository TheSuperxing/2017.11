<template>
	<div class="wallet">
		<router-view></router-view>
	</div>
</template>

<script>
	export default{
		name:"wallet",
		data:function(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
$bfColor:#ffffff;
$activeColor:#546686;
.wallet{
	width: 940px;
	min-height: 410px;
	float: left;
	background: $bfColor;
	border-radius: 5px;
	
}
</style>