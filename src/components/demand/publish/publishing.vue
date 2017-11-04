<template>
	<div class="publishing">
		<router-view></router-view>
		
	</div>
</template>

<script>
	export default{
		name:"publishing",
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
.publishing{
	width: 940px;
	float: left;
	background: $bfColor;
	border-radius: 5px;
	
	
}

</style>