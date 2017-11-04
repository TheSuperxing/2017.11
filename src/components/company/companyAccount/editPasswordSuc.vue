<template>
	<div class="editPasswordSuc">
		<div class="s-wrap">您已成功修改代码！</div>
		<router-link to="/yhzx/company/info/companyAccount/index">
			<span class="confirmBtn" >完成</span>
		</router-link>
		
	</div>
</template>

<script>
	export default{
		name:"editPasswordSuc",
		data:function(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
$bfColor:#f7f9fc;
    $activeColor: #2eb3cf;
	.editPasswordSuc{
		width: 940px;
		min-height: 410px;
		background: #FFFFFF;
		padding-left: 341px;
		padding-top: 128px;
		.s-wrap{
				
	    		height: 28px;
	    		background: url(../../../assets/img/company/Smile.png) no-repeat left center;

	    		font-size: 24px;
	    		line-height: 28px;
	    		color: $activeColor;
	    		margin-bottom: 60px;
	    		padding-left: 51px;


	    	}
	    	a{
	    		display: inline-block;
	    	}
	    	span{
	    		float: left;
	    		/*margin-right: 50px;*/
	    		width: 140px;
	    		height: 40px;
	    		line-height: 40px;
	    		text-align: center;
	    		vertical-align: middle;
	    		font-size: 18px;
	    		border-radius: 5px;
	    		cursor: pointer;
	    		margin-left: 59px;
	    		&.confirmBtn{
	    			background-image: url(../../../assets/img/company/rectangle06.png) ;
	    			color: #FFFFFF;
	    			&:hover{
	    				filter:alpha(opacity=80);       /* IE */
					  -moz-opacity:0.8;              /* 老版Mozilla */
					  -khtml-opacity:0.8;              /* 老版Safari */
					   opacity: 0.8;           /* 支持opacity的浏览器*/
	    			}
	    		}
	    	}
	}
</style>