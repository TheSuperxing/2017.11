<template>
	<div class="collectionIndex">
		<ul class="collectionTable">
			<li class="stateNone" v-if="!haveValue">此处暂无数据</li>
			<li v-for="(item,index) in colletionInfo">
				<h3>
					<router-link :to="{name:'colletionDetail',query:{id:item.id}}">{{item.name}}</router-link>
					<span @click="cancelCollect(index)">取消收藏</span>
				</h3>
				<p>创建时间：{{item.complateTime}}</p>
			</li>
		</ul>
	</div>
</template>

<script>
	import Vue from "vue"
	import {mapState} from "vuex"
	import Modal from "../../../assets/js/modal.js"
	import router from '../../../router'
	export default{
		name:"collectionIndex",
		data:function(){
			return{
				haveValue:true,
			}
		},
		computed:mapState({
		  demandInfo:state=>state.demand.demandInfo/*获取vuex数据*/,
		  colletionInfo:state=>state.demand.colletionInfo,
		  applicationInfo:state=>state.demand.applicationInfo,
		}),
		mounted(){
			if(this.colletionInfo.length!=0){
				Vue.set(this,'haveValue',true)
			}else{
				Vue.set(this,'haveValue',false)
			};//判断有效需求里面有没有数据
		},
		methods:{
			cancelCollect(index){
				this.colletionInfo.splice(index,1)
				if(this.colletionInfo.length!=0){
					Vue.set(this,'haveValue',true)
				}else{
					Vue.set(this,'haveValue',false)
				};//判断有效需求里面有没有数据
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
$activeColor:#546686;
$bfColor:#ffffff;
.collectionIndex{
	padding: 20px 20px;
	.collectionTable{
		.stateNone{
			border-bottom: none;
			padding-left: 50px;
			color: #858585;
		}
		li{
			padding:10px 0;
			border-bottom: 1px solid #E0E0E0;
			h3{
				height: 34px;
				line-height: 34px;
				text-align: left;
				font-size: 18px;
				color: $activeColor;
				position: relative;
				a{
					float:left;
					color: $activeColor;
				}
				span{
					/*position: absolute;*/
					float: right;
					height: 34px;
					line-height: 34px;
					color: #535353;
					cursor: pointer;
					font-size: 14px;
					padding-left: 24px;
					background: url(../../../assets/img/demand/icon59.png) no-repeat left center;
				}
			}
			p{
				color: #858585;
			}
		}
	}
}
</style>