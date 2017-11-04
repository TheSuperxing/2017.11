<template>
	<div class="modifyPwd">
		<ul class="modify-wrap" v-if="haveNoPwd">
			<li class="">
				<p class="wrap-left">支付密码</p>
				<input type="text" placeholder="请输入6位数字支付密码" v-model="payPassword" @blur="regTest"/>
			</li>
			<li class="">
				<p class="wrap-left">确认密码</p>
				<input type="text" placeholder="请再次输入支付密码" v-model="cfmPwd" @blur="sameTest"/>
			</li>
			<alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
			
		</ul>
		<ul class="edit-wrap" v-if="!haveNoPwd">
			<li>
				<p class="wrap-left">原密码</p>
				<input type="text" placeholder="请输入原密码" v-model="originalPwd" @blur="originalTest"/>
			</li>
			<li>
				<p class="wrap-left">新密码</p>
				<input type="text" placeholder="请输入6位数字新密码" v-model="payPassword" @blur="regTest"/>
			</li>
			<li>
				<p class="wrap-left">确认密码</p>
				<input type="text" placeholder="请再次输入新密码" v-model="cfmPwd" @blur="sameTest"/>
			</li>
			<alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
			
		</ul>
		<div class="btnBox">
			<router-link to="/yhzx/deal/wallet/mywallet/account/accountIndex">
				<span class="cancelBtn">取消</span>
			</router-link>
			<router-link to="/yhzx/deal/wallet/mywallet/account/accountIndex">
				<span class="saveBtn" @click="save">确认</span>
			</router-link>
		</div>
	</div>
</template>

<script>
	import alertTip from "../../loginandregister/alertTip.vue"
	import router from "../../../router"
	export default{
		name:"modifyPwd",
		data:function(){
			return{
				payPassword:"",//
				cfmPwd:"",
				haveNoPwd:"",//有没有设置支付密码
				originalPwd:"",//原密码
				showAlert:false,
				alertText:"",
			}
		},
		components:{
			alertTip
		},
		mounted(){
			console.log(sessionStorage.getItem("payPwd"))
			if(sessionStorage.getItem("payPwd")==null){
				this.haveNoPwd =true ;
			}else{
				this.haveNoPwd = false;
			}
		},
		methods:{
			regTest(){
				if(/^\d{6}$/gi.test(this.payPassword)!=true&&this.payPassword!=""){
					this.showAlert = true;
					this.alertText = "请输入6位数字密码";
				}else{
					this.showAlert = false;
				}
				
				
			},
			sameTest(){
				if(this.payPassword!=this.cfmPwd){
					this.showAlert = true;
					this.alertText = "两次输入不一致";
				}else{
					this.showAlert = false;
					
				}
			},
			originalTest(){//测试原密码错误与否
				if(this.originalPwd!=sessionStorage.getItem("payPwd")&&this.payPassword!=""){
					this.showAlert = true;
					this.alertText = "原密码错误";
				}else{
					this.showAlert = false;
					
				}
			},
			save(){
				sessionStorage.setItem("payPwd",this.payPassword);
				router.push("/yhzx/demand/wallet/mywallet/account");
			},
			closeTip(){
				this.showAlert = false;
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
$bfColor:#ffffff;
$activeColor:#546686;
	.modifyPwd{
		padding-bottom: 40px;
		
		.modify-wrap,.edit-wrap{
			margin-left: 250px;
			margin-top: 60px;
			position: relative;
			li{
				height:40px;
				line-height: 40px;
				margin-bottom: 20px;
				
				.wrap-left{
					width: 70px;
					float: left;
					margin-right: 30px;
				}
				input{
					float: left;
					width: 323px;
					height: 40px;
					background: #F7F7F7;
					border: 1px solid #E0E0E0;
					border-radius: 5px;
					text-indent: 15px;
				}
				
			}
			.alet_container{
				width: 180px;
				bottom: -30px;
				left: 100px;
				/*font-size: 12px;*/
			}
		}
		.btnBox{
			margin-top: 40px;
			margin-left: 330px;
			overflow: hidden;
			a{
				width: 117px;
				height: 33px;
				float: left;
				margin-right: 30px;
				display: block;
			}
			span{
				width: 117px;
				height: 33px;
				line-height: 33px;
				text-align: center;
				border-radius: 5px;
				display: block;
				cursor: pointer; 
				&.cancelBtn{
					border:1px solid #E0E0E0;
					color: #535353;
					&:hover{
						color: $activeColor;
						border-color: $activeColor;
					}
				}
				&.saveBtn{
					color: #FFFFFF;
					background: url(../../../assets/img/wallet/bg50.png);
					&:hover{
						opacity: .9;
					}
				}

			}
		}
	}
</style>