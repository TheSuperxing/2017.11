<template>
<div class="draftIndex">
		<router-view></router-view>
		
</div>
</template>

<script>
	
	export default{
		name:"draftIndex",
		data:function(){
			return{
				
				
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped="scoped">
$activeColor:#546686;
$bfColor:#ffffff;
.draftIndex{
	width: 940px;
	min-height: 410px;
	float: left;
	background: $bfColor;
	border-radius: 5px;
}
</style>