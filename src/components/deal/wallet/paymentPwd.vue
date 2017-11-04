<template>
	<div class="paymentPwd">
		<h1>账户余额&nbsp;&nbsp;|&nbsp;&nbsp;<span>支付</span></h1>
		<div class="content-wrap">
			<div class="wrap-left">输入密码</div>
			<p class="passWord">
				<input type="password" maxlength="1" v-model="passwords[0]" autofocus="autofocus" @keyup="nextFocus"/>
				<input type="password" maxlength="1" v-model="passwords[1]" autofocus="autofocus" autocomplete="on"/>
				<input type="password" maxlength="1" v-model="passwords[2]" autofocus="autofocus"/>
				<input type="password" maxlength="1" v-model="passwords[3]" autofocus="autofocus"/>
				<input type="password" maxlength="1" v-model="passwords[4]" autofocus="autofocus"/>
				<input type="password" maxlength="1" v-model="passwords[5]" autofocus="autofocus"/>
			</p>
			<alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
			
			<div class="btnBox" ><span @click="next">下一步</span></div>
		</div>
	</div>
</template>

<script>
		/*对不起，请不要重复提交请求。 请回到原始页面重新刷新*/
	import alertTip from "../../loginandregister/alertTip.vue"
	import router from "../../../router"
	
	$(document).ready(function(){
		$("input").each(function() {
            $(this).keyup(function(e) {
                e = window.event || e;
                var k = e.keyCode || e.which;
                if (k == 8) {   //8是shanchu键
                    if ($(this).val().length < 1) {
                        $(this).prev().focus();
                        $(this).prev().focus(function() {
                            var obj = e.srcElement ? e.srcElement: e.target;
                            if (obj.createTextRange) { //IE浏览器
                                var range = obj.createTextRange();
                                range.moveStart("character", 6);
                                range.collapse(true);
                                range.select();
                            }
                        });
                    }
                } else {
                    if ($(this).val().length >=1) {
                        $(this).next().focus();
                    }
                }
            })
        });
	})
	export default{
		name:"paymentPwd",
		data:function(){
			return{
				passwords:[
					"","","","","","",
				],
				showAlert:false,
				alertText:"",
			}
		},
		components:{
			alertTip
		},
		updated(){
			for(var i=0;i<this.passwords.length;i++){
				if(/^\d{0,1}$/gi.test(this.passwords[i])!=true){
					let ind = i;
					$("input").eq(ind).val("");
				}
			}
		},
		methods:{
			//自动跳到下一个输入框
			nextFocus(){
				var that = this;
				$("input").each(function(){
				})
			},
			
			next(){
				for(var i=0;i<this.passwords.length;i++){
					if(this.passwords[i]==""){
						this.showAlert = true;
						this.alertText = "请输入正确的密码。"
					}else{
						router.push("/yhzx/deal/wallet/payDone");
					}
				}
				
				console.log(this.passwords);
				
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
	.paymentPwd{
		padding: 30px 20px;
		width: 940px;
		height: 405px;
		float: left;
		background: $bfColor;
		border-radius: 5px;
		position: relative;
		.alet_container{
			width: 200px;
			bottom: 190px;
			right: 350px;
		}
		h1{
			font-size: 18px;
			font-weight: bold;
			color: $activeColor;
			span{
				color: #F77718;
			}
		}
		.content-wrap{
			margin-top: 90px;
			margin-left: 280px;
			.wrap-left{
				float: left;
				color: #494949;
				height: 40px;
				line-height: 40px;
				margin-right: 20px;
			}
			.passWord{
				height: 40px;
				line-height: 40px;
				vertical-align: middle;
				float:left;
				
				input{
					display: inline-block;
					margin-top: 5px;
					width: 30px;
					height: 30px;
					line-height: 30px;
					background: #F7F7F7;
					border: 1px solid #E0E0E0;
					margin-right: 10px;
					text-indent: 12px;
				}
			}
			.btnBox{
				width: 100%;
				margin-bottom: 40px;
				margin-top: 40px;
				overflow: hidden;
				span{
					display: block;
					float: left;
					width: 117px;
					height: 33px; line-height: 33px;
					text-align: center;
					background: url(../../../assets/img/wallet/bg43.png);
					color: #FFFFFF;
					margin-top: 60px;
					
					margin-left: 120px;
					cursor: pointer;
					
				}
			}
		}
	}
</style>