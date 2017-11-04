<template>
	<div class="defineCompany">
		<h3 class="t-title"><span>{{title}}</span></h3>
		<ul class="content-wrap">
			<li class="name-wrap">
				<p>公司名称</p>
			   	<input type="text" v-model="company.name"/>
			</li>
			<li class="address-wrap">
				<p>公司地址</p>
			   	<input type="text" v-model="company.address"/>
			</li>
		</ul>
		<div class="btnBox" >
			<router-link to="/yhzx/team/info/teamOrganiz/teamOrganizIndex">
				<span class="saveBtn" @click="editDoneCom">保存</span>
			</router-link>
			<router-link to="/yhzx/team/info/teamOrganiz/teamOrganizIndex">
				<span class="cancelBtn" @click="cancleEditCom">取消</span>
			</router-link>
			
		</div>
	</div>
</template>

<script>
	export default {
    name:"defineCompany",
    data:function(){
      return {
      	title:"编辑公司信息",
      	company:{
  			id:"",
  			name:"一幢大楼有限公司",
  			address:"淮海中路999号"
      	}
      	
      }
    },
    mounted(){
    	$(document.body).css("overflow-y","scroll");
    },
    methods:{
    	editDoneCom(){
    		
    	},
    	cancleEditCom(){
    		
    	}
    }
  }
</script>

<style lang="scss" scoped="">
$bfColor:#ffffff;
$activeColor: #02a672;
.defineCompany{
	width:940px; 
	height: 690px;
	padding: 40px 40px 80px 40px;
	.content-wrap{
		padding: 40px 10px;
		&:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;} 
		
		li{
			height: 35px;
			line-height: 35px;
			margin-bottom: 21px;
			&:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;} 
			
			p{
				float: left;
				color: $activeColor;
				margin-right: 30px;
			}
			input{
				float: left;
				height: 35px;
				width: 480px;
				border: 1px solid #bebebe;
				color: #BEBEBE;
				text-indent: 14px;
				border-radius: 5px;
				background: #f7f7f7;
			}
		}
	}
	.btnBox{/*保存取消对键*/
		/*width: 100%;*/
		height: 33px;
		overflow: hidden;
		float: left;
		margin-top: 20px;
		margin-left: 100px;
		a{
			color: #353535;
		}
		span{
			width: 117px;
			height: 33px;
			line-height: 33px;
			float: left;
			margin-right: 30px;
			text-align: center;
			border-radius: 5px;
			cursor: pointer;
			&.cancelBtn{
			border: 1px solid #bfcbd9;

			&:hover{
				border: 1px solid $activeColor;
				color: $activeColor;
			}
		}
		&.saveBtn{
			background-image: url("../../../assets/img/team/icon_green_119inform_confirm.png") ;
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