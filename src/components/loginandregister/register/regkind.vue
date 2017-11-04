<template>
<div class="regkind">
	<ul class="com-wrap" v-if="state==0">
		<li>
			<input type="text"  placeholder="请输入公司名" v-model="comRegInput.name" @blur="nameConfirm"/>
		</li>
		<li>
			<input type="text"  placeholder="请输入您的邮箱" v-model="comRegInput.email" @blur="mailConfirm"/>
		</li>
		<li>
			<input type="text" placeholder="请输入密码(字母、数字及.或_，6到18个字符。)" v-model="comRegInput.passWord" @blur="pwdConfirm"/>
		</li>
		<li>
			<input type="text" placeholder="请再次输入密码" v-model="comRegInput.passWordCfm" @blur="samePwd"/>
		</li>
		<alertTip v-if="comRegInput.showAlert" :showHide="comRegInput.showAlert" @closeTip="closeTip" :alertText="comRegInput.alertText"></alertTip>
		<div class="regBtn" @click="goRegisterDone">
			注册
		</div>
		<p class="notice">
			<span v-bind:class="{'selected':agree[0]}" @click="agreeDeal" class="agreeBtn"></span>您已阅读并同意
			<router-link to="">
				[buildingshop用户协议]
			</router-link>
		</p>
	</ul>
	<ul class="team-wrap" v-if="state==1">
		<li>
			<input type="text"  placeholder="请输入公司名" v-model="teamRegInput.name" @blur="nameConfirm"/>
		</li>
		<li>
			<input type="text"  placeholder="请输入您的邮箱" @blur="mailConfirm"/>
		</li>
		<li>
			<input type="text" placeholder="请输入密码(字母、数字及.或_，6到18个字符。)" v-model="teamRegInput.passWord" @blur="pwdConfirm"/>
		</li>
		<li>
			<input type="text" placeholder="请确认密码" v-model="teamRegInput.passWordCfm" @blur="samePwd"/>
		</li>
		<alertTip v-if="teamRegInput.showAlert" :showHide="teamRegInput.showAlert" @closeTip="closeTip" :alertText="teamRegInput.alertText"></alertTip>
		<div class="regBtn" @click="goRegisterDone">
			注册
		</div>
		<p class="notice">
			<span v-bind:class="{'selected':agree[1]}" @click="agreeDeal" class="agreeBtn"></span>您已阅读并同意
			<router-link to="">
				[buildingshop用户协议]
			</router-link>
		</p>
	</ul>
	<ul class="person-wrap" v-if="state==2">
		<li>
			<input type="text"  placeholder="请输入手机号" v-model="personalRegInput.tel" @blur="personTelCfm"/>
		</li>
		<li>
			<!--<input type="text" placeholder="请输入图形验证码"/>
			<span class="picConfirm"></span>-->
			<input v-model="personalRegInput.picConfirm" @blur="picConfirm" type="text" placeholder="图形验证码">
		    <p v-cloak @click="random">{{makeRandom.num}}</p>
		    <span v-if="reveal.error">图片验证码错误</span>
		</li>
		<li>
			<input type="text" placeholder="请确认短信验证码"/>
			<button @click="settime" class="msgConfirm" :disabled="!show">
			     <span v-if="show">获取验证码</span>
			     <span v-if="!show" class="count">{{count}} s</span>
			 </button>
		</li>
		<alertTip v-if="personalRegInput.showAlert" :showHide="personalRegInput.showAlert" @closeTip="closeTip" :alertText="personalRegInput.alertText"></alertTip>
		<!--<div class="regBtn" >-->
			<router-link to='/index' class="regBtn">
				注册
			</router-link>
			
		<!--</div>-->
		<p class="notice">
			<span v-bind:class="{'selected':agree[2]}" @click="agreeDeal" class="agreeBtn"></span>
			您已阅读并同意
			<router-link to="">
				[buildingshop用户协议]
			</router-link>
		</p>
	</ul>
	
</div>
</template>

<script>
	import Router from "../../../router"
	import Vue from "vue";
	 import alertTip from '../alertTip'
	export default{
		name:"Regkind",
		data:function(){
			return {
				state:"",
				count:"",
				timer:null,
				show:true,
				agree:[false,false,false],/*同意协议与否*/
				comRegInput:{
					name:"",
					email:null,
					passWord:null,
					passWordCfm:null,
					showAlert: false, //显示提示组件
					alertText: null, //提示的内容
				},
				teamRegInput:{
					name:"",
					email:null,
					passWord:null,
					passWordCfm:null,
					showAlert: false, //显示提示组件
					alertText: null, //提示的内容
				},
				personalRegInput:{
		           tel:"",
		           picConfirm:"",
		           messageConfirm:"",
		           showAlert: false, //显示提示组件
				   alertText: null, //提示的内容
		        },
		        makeRandom:{num:"",},
		        reveal:{
		          error:false,
		          buttonDisabled:false
		        },
		        
                
			}
		},
		 components: {
            alertTip,
        },
        computed:{
        	
        	rightComEmail:function(){
        		return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/gi.test(this.comRegInput.email);
        		
        	},
        	rightTeamEmail:function(){
        		return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/gi.test(this.comRegInput.email);
        		
        	},
        	
        },
		mounted(){
			
			var id = this.$route.params.id
//			console.log(id)
			this.state = id;
//			console.log(this.state)
			do{
		        Vue.set(this.makeRandom,"num",parseInt(Math.random()*10000))
		      }while (this.makeRandom.num<1000);
		},
		
		methods:{
			settime(e) { 
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
			goRegisterDone(){
				Router.push({name:"RegisterDone",params:{id:this.state}})
			},
			agreeDeal(){
				for(var i=0;i<this.agree.length;i++){
					if(this.agree[i]!= true){
						Vue.set(this.agree,i,true)
					}else{
						console.log(11)
						Vue.set(this.agree,i,false)
					}
				}
				
			},
			random(){
			    do{
			      Vue.set(this.makeRandom,"num",parseInt(Math.random()*10000))
			    }while (this.makeRandom.num<1000);
			
			    if(this.personalRegInput.picConfirm!=this.makeRandom.num&&this.personalRegInput.picConfirm){
			      Vue.set(this.reveal,"error",true)
			    }else {
			      Vue.set(this.reveal,"error",false)
			    }
			},
			picConfirm(){
		        if(this.personalRegInput.picConfirm!=this.makeRandom.num){
		          Vue.set(this.reveal,"error",true)
		        }else {
		          Vue.set(this.reveal,"error",false)
		        };
		        
		       
		    },
		    nameConfirm(){/*验证输入的名字是否为空*/console.log(111)
		    	if(!/^[A-Za-z0-9\u4e00-\u9fa5]+$/gi.test(this.comRegInput.name)){
		    		
		    		this.comRegInput.showAlert = true;
		    		this.comRegInput.alertText = '您输入的公司名称不能为空';
		    	}else{
		    		this.comRegInput.showAlert = false;
		    	};/*验证公司*/
		    	
		    	if(!/^[A-Za-z0-9\u4e00-\u9fa5]+$/gi.test(this.teamRegInput.name)){
		    		console.log(222)
		    		this.teamRegInput.showAlert = true;
		    		this.teamRegInput.alertText = '您输入的团队名称不能为空';
		    	}else{
		    		this.teamRegInput.showAlert = false;
		    	};
		    	
		    },
		    mailConfirm(){/*验证邮箱*/
		    	if(!this.rightComEmail){
		    		this.comRegInput.showAlert = true;
		    		this.comRegInput.alertText = '您输入的邮箱格式不正确';
		    	}else{
		    		this.comRegInput.showAlert = false;
		    	};/*验证公司邮箱*/
		    	
		    	if(!this.rightTeamEmail){
		    		this.teamRegInput.showAlert = true;
		    		this.teamRegInput.alertText = '您输入的邮箱格式不正确';
		    	}else{
		    		this.teamRegInput.showAlert = false;
		    	};/*验证团队邮箱*/
		    },
		    pwdConfirm(){/*验证密码*/
		    	if(!/^[a-zA-Z0-9]{1}([a-zA-Z0-9]|[._]){4,18}$/gi.test(this.comRegInput.passWord)){
		    		this.comRegInput.showAlert = true;
		    		this.comRegInput.alertText = '您输入的密码格式不正确';
		    	}else{
		    		this.comRegInput.showAlert = false;
		    	};/*验证公司密码*/
		    	
		    	if(!/^[a-zA-Z0-9]{1}([a-zA-Z0-9]|[._]){4,18}$/gi.test(this.teamRegInput.passWord)){
		    		this.teamRegInput.showAlert = true;
		    		this.teamRegInput.alertText = '您输入的密码格式不正确';
		    	}else{
		    		this.teamRegInput.showAlert = false;
		    	};/*验证团队密码*/
		    	
		    },
		    samePwd(){
		    	if(this.comRegInput.passWord != this.comRegInput.passWordCfm){
		    		this.comRegInput.showAlert = true;
		    		this.comRegInput.alertText = '您两次输入的密码不一致';
		    	}else{
		    		this.comRegInput.showAlert = false;
		    		
		    	};
		    	if(this.teamRegInput.passWord != this.teamRegInput.passWordCfm){
		    		this.teamRegInput.showAlert = true;
		    		this.teamRegInput.alertText = '您两次输入的密码不一致';
		    	}else{
		    		this.teamRegInput.showAlert = false;
		    		
		    	}
		    },
		    personTelCfm(){/*验证个人登录的手机号*/
		    	if(!/^1[34578]\d{9}$/gi.test(this.personalRegInput.tel)){
		    		console.log(11)
		    		this.personalRegInput.showAlert = true;
		    		this.personalRegInput.alertText = '您输入的手机号码格式不正确';
		    	}else{
		    		this.personalRegInput.showAlert = false;
		    	}
		    },
		    closeTip(){  /*关闭提示框*/
                this.comRegInput.showAlert = false;
                this.teamRegInput.showAlert = false;
                this.personalRegInput.showAlert = false;
            }
		},
		updated(){
			var id = this.$route.params.id
//			console.log(id)
			this.state = id;
//			console.log(this.state)
		},
		beforeDestroy(){
			$(document.body).css("overflow","scoll");
//			console.log(1111)
			
		},
		watch:{
			$route:function(){
				var id= window.location.href.split("/register/regkind/")[1];
				this.state = id;
			}
		}
	}
</script>

<style lang="scss" scoped="">
	.regkind{
		ul{
			position: relative;
		}
		.com-wrap{
			li{
				border-bottom: 1px solid #EAEAEA;
				padding:15px 0px 15px 48px;
				text-align: left;
				input{
					width: 300px;
					height: 25px;
					line-height: 25px;
				}
				&:nth-child(1){
					margin-top: 15px;
					background: url(../../../assets/img/register/icon_company.png) no-repeat left center;
				}
				&:nth-child(2){
					background: url(../../../assets/img/register/mail.png) no-repeat left center;
				}
				&:nth-child(3){
					background: url(../../../assets/img/register/icon_code.png) no-repeat left center;
				}
				&:nth-child(4){
					background: url(../../../assets/img/register/icon_confirmcode.png) no-repeat left center;
				}
			}
			.regBtn{
				background: url(../../../assets/img/register/blue_zhuce.png) no-repeat;;
			}
			.notice{
				.agreeBtn{
					&.selected{
						background: url(../../../assets/img/register/icon_blue_ok.png) no-repeat left center
					}
				}
				
				a{
					color:#2EB3CF ;
				}
				
			}
		}
		.team-wrap{
			li{
				border-bottom: 1px solid #EAEAEA;
				padding:15px 0px 15px 48px;
				text-align: left;
				input{
					width: 300px;
					height: 25px;
					line-height: 25px;
				}
				&:nth-child(1){
					margin-top: 15px;
					background: url(../../../assets/img/register/icon_company.png) no-repeat left center;
				}
				&:nth-child(2){
					background: url(../../../assets/img/register/mail.png) no-repeat left center;
				}
				&:nth-child(3){
					background: url(../../../assets/img/register/icon_code.png) no-repeat left center;
				}
				&:nth-child(4){
					background: url(../../../assets/img/register/icon_confirmcode.png) no-repeat left center;
				}
			}
			.regBtn{
				background: url(../../../assets/img/register/green_zhuce.png) no-repeat;
			}
			.notice{
				.agreeBtn{
					&.selected{
						background: url(../../../assets/img/register/icon_green_ok.png) no-repeat left center
					}
				}
				
				a{
					color:#02a672 ;
				}
				
			}
		}
		.person-wrap{
			li{
				border-bottom: 1px solid #EAEAEA;
				padding:15px 0px 15px 48px;
				text-align: left;
				input{
					width: 250px;
					height: 25px;
					line-height: 25px;
				}
				&:nth-child(1){
					margin-top: 15px;
					background: url(../../../assets/img/register/icon_company.png) no-repeat left center;
				}
				
				&:nth-child(2){
					position: relative;
					background: url(../../../assets/img/register/confirm.png) no-repeat left center;
					.picConfirm{
						width: 70px;
						height: 27px;
						background: #E6E6E6;
						position: absolute;
						right: 20px;
						top: 15px;
						
					}
					position: relative;
					  
					  p{
					    position: absolute;
					    top: 15px;
					    right:120px;
					    width: 71px;
					    height:27px; line-height: 27px;
					    text-align: center;
					    background: #cccccc;
					    cursor: pointer;
					  }
					  span{
					    font-size: 14px;
					    line-height: 18px;
					    color: rgb(242,117,25);
					    display: block;
					    width:100px;
					    text-align: left;
					    position: absolute;
					    top: 17px;
					    right: 8px;
					  }
				}
				&:nth-child(3){
					
					background: url(../../../assets/img/register/icon_confirmcode.png) no-repeat left center;
					.msgConfirm{
						color: rgb(242,117,25);
						cursor: pointer;
						display: inline-block;
						border: none;
						width: 80px;
						height: 20px;
						background: none;
					}
					.count{
						color:rgb(242,117,25);
					}
				}
			}
			.regBtn{
				display: block;
				background: url(../../../assets/img/register/orange_zhuce.png) no-repeat;;
				margin-top: 80px;
			}
			.notice{
				.agreeBtn{
					&.selected{
						background: url(../../../assets/img/register/icon_orange_ok.png) no-repeat left center
					}
				}
				
				a{
					color:rgb(242,117,25);
				}
				
			}
		}
		.regBtn{
			width: 314px;
			height: 50px;
			line-height: 50px;
			color: #FFFFFF;
			font-size: 20px;
			margin: 40px auto 0;
			border-radius: 5px;
			cursor: pointer;
		}
		.notice{
			width: 314px;
			height: 17px;
			line-height: 17px;
			margin: 20px auto 0;
			margin-left: 50px;
			text-align: left;
			.agreeBtn{
				display: inline-block;
				width: 17px;
				height: 17px;
				margin-right: 14px;
				background: url(../../../assets/img/register/agree_no.png) no-repeat left center;
			}
		}
		
	}
</style>