<template>

	<div class="editPassword">
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
			<router-link to="/yhzx/company/info/companyAccount/index">
				<span class="cancelBtn">取消</span>
			</router-link>
			
			<router-link to="/yhzx/company/info/companyAccount/editPasswordSuc">
				<span class="confirmBtn" >确认</span>
			</router-link>
			
		</div>
		
	</div>

</template>

<script>
	import Vue from 'vue'
	import {Form,FormItem,Input} from "element-ui"
	import router from "../../../router"
	Vue.use(FormItem)
	Vue.use(Input)
	Vue.use(Form)
	export default{
		data() {
	      return {
	        labelPosition: 'left',
	        formLabelAlign: {
	          name: '',
	          region: '',
	          type: ''
	        },
	        showSuc:false
	      }
	    },
	    methods:{
	   		
	    }
	}
</script>

<style lang="scss">
    $bfColor:#f7f9fc;
    $activeColor: #2eb3cf;
	.editPassword{
		width:940px;
	    padding:60px 0px;
	    background-color:#FFFFFF;
	    float:left;
	    border-radius:5px;
	    position: relative;
	    form{
	    	width: 450px;
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
					right: 10px;
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

	    		&.cancelBtn{
	    			border: 1px solid #bfcbd9;

	    			&:hover{
	    				border: 1px solid $activeColor;
	    				color: $activeColor;
	    			}
	    		}
	    		&.confirmBtn{
	    			background-image: url("../../../assets/img/company/rectangle06.png") ;
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
