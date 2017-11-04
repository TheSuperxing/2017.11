<template>
	<div class="demandSlider">
		<div class="wallet-bar">
			<router-link to="/yhzx/demand/wallet" class="myWallet"><img src="../../assets/img/wallet/icon63.png" />我的钱包</router-link>
			<ul class="sideNavList">
				<li v-for="item in sideNav">
					<router-link :to="item.router">
						<div class="list-left">
							<img :src="item.pic1" />
							<img :src="item.pic2" />
						</div>
						<p>{{item.text}}</p>
					</router-link>
				</li>
			</ul>
		</div>
		
	</div>
</template>

<script>
	export default{
		name:"demandSlider",
		data:function(){
			return{
				sideNav:[
					{text:"发布需求",pic1:require("../../assets/img/demand/icon40.png"),pic2:require("../../assets/img/demand/icon41.png"),router:"/yhzx/demand/publish"},
					{text:"需求草稿",pic1:require("../../assets/img/demand/icon42.png"),pic2:require("../../assets/img/demand/icon48.png"),router:"/yhzx/demand/draft"},
					{text:"我的发布",pic1:require("../../assets/img/demand/icon43.png"),pic2:require("../../assets/img/demand/icon52.png"),router:"/yhzx/demand/publishment"},
					{text:"我的申请",pic1:require("../../assets/img/demand/icon44.png"),pic2:require("../../assets/img/demand/icon58.png"),router:"/yhzx/demand/application"},
					{text:"我的收藏",pic1:require("../../assets/img/demand/icon45.png"),pic2:require("../../assets/img/demand/icon45.png"),router:"/yhzx/demand/collection"},
				]
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
$activeColor:#546686;
$bfColor:#ffffff;
.demandSlider{
	float: left;
	width: 240px;
	height: 405px;
	margin-left: 20px;
	.wallet-bar{
		width: 240px;
		
		text-align: center;
		
		.myWallet{
			display: block;
			width: 100%;
			height: 82px;
		    line-height: 82px;
		    background-image: url(../../assets/img/wallet/background1.png) ;
		    background-size: 100% 100%;
		    overflow: hidden;
			color: #FFFFFF;
			img{
				margin-bottom: 2px;
				margin-right: 10px;
			}
			&.router-link-active{
				background-image: url(../../assets/img/wallet/bg-king.png) ;
			}
		}
		.sideNavList{
			margin-top: 20px;
			background: $bfColor;
			border-radius:5px; 
			overflow: hidden;
			li{
				
				a{
					display: block;
					height: 61px;
					line-height: 61px;
					color: #353535;
					border-left: 2px solid $bfColor;
					&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
					.list-left{
						float: left;
						margin-left: 40px;
						margin-top: 20px;
						margin-right: 20px;
						img{
							&:first-child{
								display: block;
							}
							&:last-child{
								display: none;
							}
						}
					}
					p{
						float: left;
					}
				}
				a.router-link-active{
					color:$activeColor;
					border-left: 2px solid $activeColor;
					
					.list-left{
						img{
							&:first-child{
								display: none;
							}
							&:last-child{
								display: block;
							}
						}
					}
				}				
			}
		}
	}
}
</style>