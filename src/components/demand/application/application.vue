<template>
	<div class="myApplication">
		<router-view></router-view>
	</div>
</template>

<script>
	export default{
		name:"myApplication",
		data:function(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
$activeColor:#546686;
$bfColor:#ffffff;
.myApplication{
	width: 940px;
	min-height: 405px;
	float: left;
	background: $bfColor;
	border-radius: 5px;
}

</style>