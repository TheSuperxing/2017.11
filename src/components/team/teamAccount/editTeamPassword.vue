<template>

	<div class="editTeamPassword">
		<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
		  <el-form-item label="输入原密码">
		    <el-input v-model="formLabelAlign.name"></el-input>
		  </el-form-item>
		  <el-form-item label="输入新密码">
		    <el-input v-model="formLabelAlign.region"></el-input>

		  </el-form-item>
		  <p class="notice">密码由6-14位字母（区分大小写）、数字或符号组成</p>
		  <el-form-item label="确认新密码">
		    <el-input v-model="formLabelAlign.type"></el-input>
		  </el-form-item>
		</el-form>
		<div class="btnBox">
			<router-link to="/yhzx/team/info/teamAccount">
				<span class="cancelBtn">取消</span>
			</router-link>
			<router-link to="/yhzx/team/info/teamAccount">
				<span class="confirmBtn">确认</span>
			</router-link>
			
		</div>
		<div class="succseed" v-if="showSuc">
			<div class="s-wrap">您已成功修改代码！</div>
			<span class="confirmBtn">完成</span>
		</div>
	</div>

</template>

<script>
	import Vue from 'vue'
	import {Form,FormItem,Input} from "element-ui"
	Vue.use(FormItem)
	Vue.use(Input)
	Vue.use(Form)
	export default{
		data() {
	      return {
	      	name:"editTeamPassword",
	        labelPosition: 'left',
	        formLabelAlign: {
	          name: '',
	          region: '',
	          type: ''
	        },
	        showSuc:false
	      };
	    }
	}
</script>

<style lang="scss">
    $bfColor:#ffffff;
    $activeColor: #02a672;
	.editTeamPassword{
		width:940px;
	    padding:60px 0px;
	    background-color:$bfColor;
	    float:left;
	    border-radius:5px;
	    position: relative;
	    form{
	    	width: 480px;
	    	margin: 0 auto;
		    &.el-form{
		    	position: relative;
		    	.el-form-item{
		    		margin-bottom: 30px !important;
		    		&:nth-child(2){
						margin-bottom: 54px !important;
					}
		    		.el-form-item__label{
		    			font-size: 18px !important;
		    			margin-right: 20px;
		    			padding: 0;
		    			float: left;
		    			height: 40px;
		    			line-height: 40px;
		    			width: 95px !important;
		    		}
		    		.el-form-item__content{
		    			width: 270px !important;
		    			height: 40px;
		    			margin: 0 !important;
		    			float: left;

		    			.el-input{
		    				height: 40px;
		    				.el-input__inner{
		    					height: 40px;
		    				}
		    			}

		    		}
		    	}
		    	.notice{
					position: absolute;
					top: 120px;
					right: 0;
					height: 14px;
					line-height: 14px;
					font-size: 14px;
					color: #9a9a9a;

				}

		    }
	    }

	    .btnBox{
	    	height: 40px;
	    	width: 330px;
	    	margin:0 auto;
	    	display: flex;
	    	justify-content: space-between;
	    	overflow: hidden;
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
				color: #353535;
	    		&.cancelBtn{
	    			
	    			border: 1px solid #bfcbd9;

	    			&:hover{
	    				border: 1px solid $activeColor;
	    				color: $activeColor;
	    			}
	    		}
	    		&.confirmBtn{
	    			background-image: url("../../../assets/img/team/icon_green_next_nor.png") ;
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

	    .succseed{
	    	width: 940px;
	    	height: 400px;
	    	padding-top: 129px;
	    	background: $bfColor;
	    	z-index: 9999;
	    	position: absolute;
	    	left: 0; top: 0;
	    	padding-left: 341px;
	    	border-radius: 5px;
	    	.s-wrap{
	    		height: 28px;
	    		background: url(../../../assets/img/team/icon_green_congratulation.png) no-repeat left center;

	    		font-size: 24px;
	    		line-height: 28px;
	    		color: $activeColor;
	    		margin-bottom: 60px;
	    		padding-left: 51px;


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
	    			background-image: url(../../../assets/img/team/icon_green_next_nor.png) ;
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
	}

</style>
