<template>
	<div class="company_content">
		<router-view></router-view>
	</div>
</template>

<script>
	export default{
		name:"company_content",
		data:function(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">

.company_content{
	width: 1200px;
}
</style>