<template>
	<div class="publishBtn">
		<router-link to="/yhzx/demand/publish/editDemand">
			<img src="../../../assets/img/demand/icon_p.png" />
			发布需求
		</router-link>
		
	</div>
</template>

<script>
	export default{
		name:"publishBtn",
		data:function(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">

	.publishBtn{
		
		width: 940px;
		
		img{
				margin-right: 10px;
			}
		a{
			display: block;
			color: #FFFFFF;
			width: 240px;
			height: 50px;
			line-height: 50px;
			text-align: center;
			color: #FFFFFF;
			font-size: 18px;
			border-radius: 5px;
			background: url(../../../assets/img/demand/bg20.png) no-repeat;
			overflow: hidden;
			cursor: pointer;
			margin: 180px auto;
		}
		
	}
</style>