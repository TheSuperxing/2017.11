<template>
	<div class="collection">
		<router-view></router-view>
	</div>
</template>

<script>
	export default{
		name:"collection",
		data:function(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
$activeColor:#546686;
$bfColor:#ffffff;
.collection{
	width: 940px;
	min-height: 410px;
	float: left;
	background: $bfColor;
	border-radius: 5px;
}

</style>