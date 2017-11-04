<template>
	<div class="accountIndex">
		<div class="content-wrap">
			<p class="wrap-left">支付密码：</p>
			<p class="passWord">{{payPassword}}</p>
			<button  @click="toSetPwd">{{buttonText}}</button>
		</div>
		<div id="modal-overlay" class="authentication">
			<div class="detail-wrap">
				<h5>身份验证</h5>
				<span class="modalChaBtn" @click="closeModal"></span>
				<ul>
					<li><p class="left">{{loginType}}</p><span class="dealname">{{dealname}}</span></li>
					<li>
						<p class="left">{{codeLeft}}</p>
						<div class="codeBox">
							<input type="text" placeholder="请输入验证码" v-model="msgCode"/>
							<button @click="getCode">获取验证码<span v-if="!show">({{count}}s)</span></button>
						</div>
						
					</li>
					
				</ul>
			    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
				
				<div class="btnBox"><span @click="cfmCode">确认</span></div>
			</div>
		</div>
	</div>
</template>

<script>
	import Modal from "../../assets/js/modal"
	import alertTip from "../loginandregister/alertTip.vue"
	import router from "../../router"
	
	
	export default{
		name:"accountIndex",
		data:function(){
			return{
				payPassword:"暂未设置",//支付密码
				buttonText:"",
				loginType:"",//弹窗wrap-left的文字  “登录邮箱、登录手机号”
				codeLeft:"",//弹窗wrap-left的文字 “验证码”
				dealname:"1385656565",
				count:"",//验证码倒计时
				timer:null,//定时器
				show:true,//定时器显隐
				msgCode:"",//"用户填写的验证码"
				showAlert:false,//提示框
				alertText:"",//提示文字
			}
		},
		
		components:{
			alertTip
		},
		mounted(){
			if(sessionStorage.getItem("payPwd")!=null){
				this.payPassword="*******";
				this.buttonText="修改密码";
				
			}else{
				this.payPassword="暂未设置";
				this.buttonText="设置密码";
			}
//			console.log(sessionStorage.getItem("state"))
			switch (sessionStorage.getItem("state")){
				case '0':
//					console.log("000")
					this.loginType="登录邮箱";
					this.codeLeft = "邮箱验证码"
					break;
				case '1':
//					console.log("000")
					this.loginType="登录邮箱";
					this.codeLeft = "邮箱验证码"
					break;
				case '2':
//					console.log("000")
					this.loginType="登录手机号";
					this.codeLeft = "短信验证码"
					break;
				default:
					break;
			}
		},
		methods:{
			toSetPwd(){
				Modal.makeText($(".authentication"));
			},
			closeModal(){
				this.timer = null;
				this.count = "";
				Modal.closeModal($(".authentication"));
				
			},
			getCode(){
				if (!this.timer) {
                this.count = 60;
                this.show = false;
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= 60) {
                    this.count--;
                  } else {
                    this.show = true;
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000)
              }
			},
			cfmCode(){
				if(this.msgCode!=""){
					this.showAlert = true;
					this.alertText = "验证码错误。"
				}else{
					this.closeModal();
					router.push("/yhzx/demand/wallet/mywallet/account/modifyPwd");
				}
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
	.accountIndex{
		#modal-overlay{
			.detail-wrap{
				/*width: 600px;*/
				padding: 0px 30px;
				background: #FFFFFF;
				border-radius: 10px;
				position:absolute;top:50%;left:50%; 
				transform:translate(-50%,-50%);
				-webkit-transform:translate(-50%,-50%);
				-moz-transform:translate(-50%,-50%);
				-ms-transform:translate(-50%,-50%);
				-o-transform:translate(-50%,-50%);
				h5{
				    color:$activeColor;
				    font-size: 18px;
				    height: 60px;
				    line-height: 60px;
				    text-align: left;
				    /*background: #f7f9fc;*/
				    /*padding: 0 40px;*/
			     
				}
				.alet_container{
					width: 150px;
					top: 200px;
					left: 180px;
					font-size: 12px;
				}
				.modalChaBtn{
					width: 20px;
				     height: 20px;
				     background: url(../../assets/img/wallet/close.png) no-repeat center;
				     position: absolute;
				     top: 20px;
				     right: 30px;
				     cursor: pointer;
				}
				ul{
					margin-left: 30px;
					margin-top: 30px;
					margin-bottom: 57px;
					margin-right: 30px;
					li{
						height:40px;
						line-height: 40px;
						margin-bottom: 20px;
						.left{
							width: 100px;
							height:40px;
							line-height: 40px;
							text-align: left;
							float: left;
							margin-right: 20px;
						}
						.dealname{
							float: left;
						}
						.codeBox{
							width: 325px;
							height: 42px;
							background: #F7F7F7;
							border: 1px solid #E0E0E0;
							border-radius: 5px;
							float: left;
							overflow: hidden;
							input{
								width: 200px;
								height: 40px;
								text-indent: 15px;
								float: left;
								color: #535353;
							}
							button{
								width: 123px;
								height: 40px;
								color: #FFFFFF;
								border: none;
								float: left;
								background: url(../../assets/img/wallet/bg42.png) no-repeat;
								background-size: 100%;
								
							}
						}
					}
				}
				.btnBox{
					width: 117px;
					margin: 57px auto 70px;
					span{
						width: 117px;
						height: 33px;
						line-height: 33px;
						text-align: center;
						color: #FFFFFF;
						background: url(../../assets/img/wallet/bg50.png);
						display: block;
						cursor: pointer;
					}
				}
			}
		}
		.content-wrap{
			height: 35px;
			line-height: 35px;
			text-align: center;
			margin-top: 120px;
			margin-left: 300px;
			margin-bottom: 118px;
			&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
			
			.wrap-left{
				float: left;
				color: $activeColor;
				margin-right: 10px;
			}
			.passWord{
				float: left;
				color: #969696;
				margin-right: 40px;
				
			}
			button{
				border: none;
				float: left;
				width: 90px;
				height: 32px;
				line-height: 32px;
				text-align: center;
				color: #FFFFFF;
				margin-top: 2px;
				background: url(../../assets/img/wallet/bg47.png);
			}
		}
	}
</style>