<template>
<div class="walletIndex">
	<div class="banlance-wrap">
		<div class="balance">
			<h1><img src="../../../assets/img/wallet/icon63.png"/>账户余额</h1>
			<div class="money-wrap"><span>{{banlance}}</span>元</div>
		</div>
		<div class="money-handle recharge"><router-link to="/yhzx/deal/wallet/recharge">充&nbsp;&nbsp;值</router-link></div>
		<div class="money-handle withdraw"><router-link to="/yhzx/deal/wallet/withdraw">提&nbsp;&nbsp;现</router-link></div>
		<div class="money-handle withdraw"><router-link to="/yhzx/deal/wallet/payment">支&nbsp;&nbsp;付</router-link></div>
	</div>
	<div class="fundFlow">
		<h1 class="flow-title"><span>资金流水</span></h1>
		<table class="flow-wrap" border="0" cellpadding="0" cellspacing="0">
			<tr class="f-title">
				<th>发布日期</th>
				<th>操作</th>
				<th>收支</th>
				<th>剩余可用</th>
				<th></th>
			</tr>
			
			<tr v-for="(item,index) in flowInfo">
				<td>{{item.tradingDate}}&nbsp;&nbsp;{{item.time}}</td>
				<td>{{item.operate}}</td>
				<td>{{item.amount}}元</td>
				<td>{{item.remain}}元</td>
				<td ><span @click="alertModal(index)">查看详情</span></td>
				
				<div id="modal-overlay" v-bind:class="classindex[index]">
					<div class="detail-wrap">
						<h5>资金流水明细</h5>
						<span class="modalChaBtn" @click="closeModal(index)"></span>
						<ul class="content-wrap">
							<li><span>创建时间</span>{{item.tradingDate}}&nbsp;&nbsp;{{item.time}}</li>
							<li><span>交易号</span>{{item.tradingNum}}</li>
							<li><span>对应协议</span>{{item.dealName}}</li>
							<li><span>交易类型</span>{{item.tradingType}}</li>
							<li><span>交易方</span>{{item.tradingObj}}</li>
							<li><span>操作</span>{{item.operate}}</li>
							<li><span>收支</span>{{item.amount}}</li>
							<li><span>剩余可用</span>{{item.remain}}</li>
						</ul>
						<p class="tips">如您对流水有疑问，请联系管理员。</p>
					</div>
				</div>
			</tr>
		</table>
	</div>
	
</div>
</template>

<script>
	import Modal from "../../../assets/js/modal"
	export default{
		name:"walletIndex",
		data:function(){
			return{
				banlance:"9000000000",
				classindex:[],
				flowInfo:[
					{
						tradingNum:"FDAD1545426",
						tradingDate:"2013.05.06",
						time:"14:30",
						amount:"5000",
						remain:"13000",
						dealName:"与万达的协议",
						tradingType:"协议内付款",
						tradingObj:"万达",
						operate:"收款",
						
					},
					{
						tradingNum:"DSAD1545256",
						tradingDate:"2017.09.06",
						time:"14:30",
						amount:"8000",
						remain:"13000",
						dealName:"与万达的协议",
						tradingType:"协议内付款",
						tradingObj:"万达",
						operate:"收款",
						
					},
					{
						tradingNum:"DSCA1545256",
						tradingDate:"2015.06.06",
						time:"14:30",
						amount:"-8000",
						remain:"13000",
						dealName:"与腾讯的协议",
						tradingType:"协议内付款",
						tradingObj:"腾讯",
						operate:"打款",
						
					},
					{
						tradingNum:"DSCA1545256",
						tradingDate:"2015.06.06",
						time:"14:30",
						amount:"-8000",
						remain:"13000",
						dealName:"与腾讯的协议",
						tradingType:"协议内付款",
						tradingObj:"腾讯",
						operate:"打款",
						
					}
				]
			}
		},
		mounted(){
			for(var i=0;i<this.flowInfo.length;i++){
				this.classindex.push("fundDetail"+i);
			}
//			console.log(this.classindex);
			
		},
		methods:{
			alertModal(index){
				var aa="fundDetail"+index;
				Modal.makeText($("."+aa));
				//
				
			},
			closeModal(index){
				
				var aa="fundDetail"+index;
				Modal.closeModal($("."+aa));
				console.log(aa)
				
			}
		}
	}
</script>

<style lang="scss">
$bfColor:#ffffff;
$activeColor:#546686;
.walletIndex{
	padding: 40px 0;
	&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
	/*模态框样式*/
	#modal-overlay{

		.detail-wrap{
			width: 775px;
			padding: 0px 40px;
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
			    height: 80px;
			    line-height: 80px;
			    text-align: left;
			    /*background: #f7f9fc;*/
			    /*padding: 0 40px;*/
		     
			}
			.modalChaBtn{
				width: 20px;
			     height: 20px;
			     background: url(../../../assets/img/wallet/close.png) no-repeat center;
			     position: absolute;
			     top: 30px;
			     right: 40px;
			     cursor: pointer;
			}
			.content-wrap{
				li{
					height: 45px;
					line-height: 45px;
					text-align: left;
					color: #767676;
					border-bottom: 1px dotted #999999;
					padding-left: 20px;
					span{
						float: left;
						width: 60px;
						margin-right: 80px;
						color: #353535;
					}
				}
				
			}
			.tips{
				height: 45px;
				line-height: 45px;
				text-align: left;
				color: #999999;
				margin-bottom: 20px;
			}
		}
	}
	.banlance-wrap{
		&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
		
		.balance{
			/*padding: 0px 68px;*/
			float:left;
			border-radius:5px;
			overflow:hidden;
			h1{
				width: 100%;
				height: 38px;
				line-height: 38px;
				text-align: center;
				color: #FFFFFF;
				background:#f37213;
				img{
					margin-right: 10px;
				}
			}
			.money-wrap{
				min-width: 200px;
				padding: 31px 68px;
				color: #F37213;
				background: #f6f6f6;
				text-align: center;
				/*display: flex;*/
				
				span{
					display: inline-block;
					height: 28px;
					line-height: 28px;
					font-size: 28px;
					margin-right: 5px;
					float: left;
					
				}
				
				
			}
		}
		.money-handle {
			float: left;
			width: 120px;
			height: 40px;
			margin-top: 38px;
			border-radius: 5px;
			overflow: hidden;
			margin-left: 50px;
			a{
				display: inline-block;
				width: 100%;
				height: 100%;
				line-height: 40px;
				text-align: center;
				border: 1px solid $activeColor;
				border-radius: 5px;
				overflow: hidden;
				border: 1px solid $activeColor;
				color: $activeColor;
				&:hover{
					border:none;
					background-image: url(../../../assets/img/wallet/bg42.png);
					background-size: 100%;
					color: #FFFFFF;
				}
				
			}
			
		}
	}
	.fundFlow{
		margin-top: 27px;
		.flow-title{
			height: 40px;
			line-height: 40px;
			border-bottom:1px solid #EBEBEB;
			
			span{
				height: 40px;
				line-height: 40px;
				display: inline-block;
				color: $activeColor;
				border-bottom: 2px $activeColor solid;
			}
		}
		.flow-wrap{
			width: 100%;
			border-collapse:collapse;
			margin-top: 30px;
			tr{
				
				padding: 22px 0;
				border-bottom: 1px dotted #cdcdcd;
				&:hover{
					color: #F27519;
					td:last-of-type{
						
						span{
							background: url(../../../assets/img/wallet/bg40.png);
						}
					}
				}
				td{
					width: 150px ;
					height: 62px;
					line-height: 62px;
					text-align: center;
					margin: 0; padding: 0;
					&:nth-child(1){
						width: 180px;
						text-align: left;
						padding-left: 15px;
						span{
							margin-right: 10px;
						}
					}
					&:last-of-type{
						width: 160px;
						text-align: center;
						
						span{
							width: 100px;
							height: 30px;
							line-height: 30px;
							color: #FFFFFF;
							display: inline-block;
							background: url(../../../assets/img/wallet/bg41.png);
							cursor: pointer;
							vertical-align: middle;/*样式修正*/
							cursor: pointer;
							float: right;
						}
					}
				}
			}
			.f-title{
				
				
				/*display: inline-block;*/
				background: #f8f8f8;
				
				border:1px solid #EBEBEB;
				th{
					color: #767676;
					font-weight: normal;
					width: 150px;height: 58px;
					text-align: center;
					&:nth-child(1){
						width: 180px;
						text-align: left;
						padding-left: 22px;
					}
					
				}
			}
		}
	}
}
</style>