<template>
<div class="mydemand">
	<router-view></router-view>
	<demand-slider></demand-slider>
	<div style="clear: both"></div>

</div>
</template>

<script>
	import demandSlider from "./demandSlider.vue"
	export default{
		name:"mydemand",
		data:function(){
			return{
				
			}
		},
		components:{
			demandSlider
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.mydemand{
		
		
	}
</style>