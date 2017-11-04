<template>
	<div id="modal-overlay" class="register">
		<div class="registerBox">
			<div class="reg-wrap">
				<ul class="reg-tab">
					<li v-for="(item,index) in tab" @click="switchTab(index)">
						<router-link :to='{name:"regkind",params:{id:index}}'>
							{{item.text}}
						</router-link>
					</li>
				</ul>

				<router-view></router-view>

			</div>
			<ul class="toLoginBox">
				<li class="text-wrap"  v-for="(item,$index) in tab" v-if="indexActive==$index">
					<p>已有账号</p>
					<router-link to="/login" v-bind:class="item.style">
						立即登录>>
					</router-link>
				</li>
			</ul>

		</div>

	</div>
</template>

<script>
	import Modal from "../../../assets/js/modal.js"
    import Regkind from "./regkind.vue"
	import Vue from "vue";
  	import {mapState} from "vuex"
	export default{
		name:"Register",
		components:{
			Regkind,
		},
		computed:mapState({
	      user:state=>state.userState.user
	    }),
		data:function(){
			return {
				tab:[
					{
						style:"comStyle",text:"公司注册",flag:false
					},{
						style:"teamStyle",text:"团队注册",flag:true
					},{
						style:"personStyle",text:"个人注册",flag:true
					}
				],
				indexActive:""
			}
		},
		mounted(){
			var modal = $('.register');
			Modal.makeText(modal);
			var id= window.location.href.split("/register/regkind/")[1];
//			console.log(id)
			this.indexActive = id;

		},
		methods:{
			switchTab(index){
//				console.log(index);
				this.indexActive = index;
				console.log(this.indexActive)
//				for(var i=0;i<this.tab.length;i++){
//					this.tab[i].flag = true;
//					this.tab[index].flag = false;
//				}
//				for(var i=0;i<this.flag.length;i++){
//					this.flag[i] = true;
//					this.flag[index] = false;
//				}

			}
		},
		beforeDestroy(){
			$(document.body).css("overflow","scoll");
			var modal = $('.register');
			Modal.closeModal(modal);
			sessionStorage.setItem("state",this.indexActive);
			Vue.set(this.user,'userState',this.indexActive)
			console.log(sessionStorage.getItem("state"));
			
		}
	}
</script>

<style lang="scss" scoped="">
	.register{
		box-sizing: border-box;
		background: #FFFFFF !important;
		background-image: url(../../../assets/img/register/bg_login_register.png) !important;
		background-size: 100% 100% !important;
		&:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;}
		.comStyle{
			color: #2EB3CF !important;
		}
		.teamStyle{
			color: #02a672 !important;
		}
		.personStyle{
			color: rgb(242,117,25) !important;
		}
		.registerBox{

			width: 715px;
			height: 487px;
			background: #FFFFFF;
			border-radius: 10px;
			position:absolute;top:50%;left:50%;
			transform:translate(-50%,-50%);
			-webkit-transform:translate(-50%,-50%);
			-moz-transform:translate(-50%,-50%);
			-ms-transform:translate(-50%,-50%);
			-o-transform:translate(-50%,-50%);
			padding:25px 60px 30px;
			.reg-wrap{
				float: left;
				.reg-tab{
					height: 46px;
					line-height: 46px;
				    &:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;}

					li{
						float: left;
						width: 132px;
						height: 46px;
						border-bottom: 2px solid #cfcfcf;
						a{
							display: inline-block;
							width: 100%;
							height: 46px;
							line-height: 46px;
							text-align: center;
							font-size: 18px;
							color: #747474;



						}
						&:nth-child(1){
							a.router-link-active{
								color: #2EB3CF !important;
								border-bottom: 2px solid #2EB3CF;
							}
						}
						&:nth-child(2){
							a.router-link-active{
								color: #02a672 !important;
								border-bottom: 2px solid #02a672;
							}
						}
						&:nth-child(3){
							a.router-link-active{
								color: rgb(242,117,25) !important;
								border-bottom: 2px solid rgb(242,117,25);
							}
						}
					}
				}
			}

		}
		.toLoginBox{
			float: right;
			width: 138px;
			height: 400px;
			border-left: 1px dashed #CFCFCF;
			margin-top: 30px;
			&:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;}

			.text-wrap{
				float:right;
				text-align: left;
				margin-top: 150px;

				p{
					color: #CFCFCF;
				}
				a{
					height: 33px;
					line-height: 33px;
					font-size: 18px;
					border-bottom: none;
				}
			}
			/*.comStyle{
				color: #2EB3CF;
				border-bottom: 2px solid #2EB3CF;
					.linkToLogin{
						color: #2EB3CF !important;
					}

				}
					.teamStyle{
						color: #02a672;
						border-bottom: 2px solid #02a672;
						.linkToLogin{
							color: #02a672 !important;
						}
					}
					.personStyle{
						color: rgb(242,117,25);
						border-bottom: 2px solid rgb(242,117,25);
					}*/
		}

	}
</style>
