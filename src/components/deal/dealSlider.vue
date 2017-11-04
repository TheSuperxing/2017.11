<template>
  <div class="dealSlider">
    <div class="wallet">
      <router-link to="/yhzx/deal/wallet" class="myWallet"><img src="../../assets/img/wallet/icon63.png" />我的钱包</router-link>
    </div>
    <ul>
      <li v-for="(item,index) in slider" @click="retrieveData(item)">
        <router-link :to="item.path" v-cloak>{{item.title}}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  import Vue from "vue"
  import {mapState} from "vuex"
  export default {
    name:"dealSlider",
    data(){
      return{
        slider:[
          {title:"我发送的协议",path:"/yhzx/deal/sendDealIndex"},
          {title:"我收到的协议",path:"/yhzx/deal/acceptDealIndex"},
          {title:"起草协议",path:"/yhzx/deal/draftingDealIndex"},
          {title:"协议草稿",path:"/yhzx/deal/outlineDealIndex"}
        ]
      }
    },
    computed:mapState({
      state:state=>state.myDeal,
      /*获取数据*/
    }),
    methods:{
      retrieveData(item){

      }
    }
  }
</script>
<style scoped lang="scss">
  $themeColor:#546686;
  .dealSlider{
    float: right;
    .wallet{
      width:242px;
      height:82px;
      color: #ffffff;
      margin-bottom: 20px;
      background: url("../../assets/img/deal/dealSlider/background1.png") left center no-repeat;
      vertical-align: middle;
      
      .myWallet{
				display: block;
				width: 100%;
				height: 82px;
			    line-height: 82px;
			    text-align: center;
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
    }
    ul{
      background: #ffffff;
      border-radius: 10px;
      li{
        width:242px;
        height: 61px;
        overflow: hidden;
        a{
          display: block;
          height:61px;
          line-height: 61px;
          border-left:2px solid #ffffff;
          padding-left:80px;
          color: #353535;
        }
        .router-link-exact-active,.router-link-active{
          border-left:2px solid $themeColor;
          color: $themeColor;
        }
      }
      li:nth-child(1){
        a{
          background: url("../../assets/img/deal/dealSlider/senddeal-gray.png") 42px center no-repeat;
        }
        .router-link-exact-active,.router-link-active{
          background: url("../../assets/img/deal/dealSlider/senddeal.png") 42px center no-repeat;
        }
      }
      li:nth-child(2){
        a{
          background: url("../../assets/img/deal/dealSlider/acceptdeal-gray.png") 42px center no-repeat;
        }
        .router-link-exact-active,.router-link-active{
          background: url("../../assets/img/deal/dealSlider/acceptdeal.png") 42px center no-repeat;
        }
      }
      li:nth-child(3){
        a{
          background: url("../../assets/img/deal/dealSlider/editdeal-gray.png") 42px center no-repeat;
        }
        .router-link-exact-active,.router-link-active{
          background: url("../../assets/img/deal/dealSlider/editdeal.png") 42px center no-repeat;
        }
      }
      li:nth-child(4){
        a{
          background: url("../../assets/img/deal/dealSlider/draft-gray.png") 42px center no-repeat;
        }
        .router-link-exact-active,.router-link-active{
          background: url("../../assets/img/deal/dealSlider/draft.png") 42px center no-repeat;
        }
      }
    }
  }
</style>
