<template>
  <div class="sendDeal">

    <div id="modal-overlay">
      <div class="alert">
        <ul>
          <li>编辑提交后，该协议将由交易管理员进行审核。</li>
          <li>审核通过后，将发生至协议相关方</li>
          <li>如未通过审核，该协议将退回至“我的协议”——“协议草稿”</li>
        </ul>
        <button class="close" v-on:click="closeAlert"></button>
        <button class="confirm" v-on:click="confirmEdit">进入编辑</button>
      </div>
    </div>

    <div id="modal-overlay2">
      <div class="alert">
        <p>确认删除吗？</p>
        <button class="close" v-on:click="closeAlert"></button>
        <button class="confirm" v-on:click="confirmStopDeal">确认</button>
      </div>
    </div>

    <!--终止/编辑提示-->
    <ul class="sendDealContainer">
      <li v-for="(item,index) in dealInfo">
        <ul class="sendDealTitle">
          <li>
            <h2 v-cloak>
              <router-link :to="{path:'/yhzx/deal/outlineDealIndex/outlineDealInfo',query:{id:index}}">
                {{item.mainInfo.name}}
              </router-link>
            </h2>
          </li>
          <li v-cloak>{{item.mainInfo.dealState}}</li>
          <li class="titleButton">
            <div @click="deleteDeal(index)" class="cancel">
              删除
            </div>
            <div @click="editPrompt(index)" class="edit">
              编辑
            </div>

          </li>
        </ul>
        <p v-cloak>创建时间：{{item.mainInfo.time}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
  import Vue from "vue"
  import {mapState} from "vuex"
  import ModalOpp from "../../../assets/js/modalOpp"
  export default {
    name:"sendDeal",
    data(){
      return{
        reveal:{
          //dealState:[],//不同的协议状态对应不同的按钮
          index:"",
        },
        routerLinkPath:{//发送的协议和接受的协议对应的不同跳转
          path:""
        },
      }
    },
    computed:mapState({
      dealInfo:state=>state.myDeal.dealInfo,
      /*获取数据*/
    }),
    methods:{
      editPrompt(index){//协议编辑的提示信息
        var modal= new ModalOpp("#modal-overlay");
        modal.makeText();
        Vue.set(this.reveal,"index",index)
      },
      closeAlert(){//弹框关闭按钮
        var modal= new ModalOpp("#modal-overlay");
        modal.closeModal();
        var modal2= new ModalOpp("#modal-overlay2");
        modal2.closeModal();
      },
      confirmEdit(){
        var modal= new ModalOpp("#modal-overlay");
        modal.closeModal();
        location.hash="/yhzx/deal/outlineDealIndex/editOutlineDeal?id="+this.reveal.index;
      },
      deleteDeal(index){//删除协议
        var modal= new ModalOpp("#modal-overlay2");
        modal.makeText();
        Vue.set(this.reveal,"index",index)
      },
      confirmStopDeal(){//确认删除协议
        var modal2= new ModalOpp("#modal-overlay2");
        modal2.closeModal();
        this.dealInfo.splice(this.reveal.index,1)

      },
    }
  }
</script>
<style scoped lang="scss">
  $themeColor:#546686;
  $normalColor:#353535;
  $alertColor:#525252;
  .sendDeal{
    #modal-overlay{
      .alert{
        width: 549px;
        height:326px;
        overflow: hidden!important;
        position:absolute;top:50%;left:50%;
        transform:translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        -moz-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        -o-transform:translate(-50%,-50%);
        background: #FFFFFF;
        border-radius: 10px;
        text-align: center;
        font-size: 18px;
        line-height: 34px;
        padding-top:72px;
        color: $alertColor;
        .close{
          width: 20px;
          height:20px;
          position: absolute;
          top: 20px;
          right:20px;
          background: url("../../../assets/img/deal/sendDeal/close.png") left center no-repeat;
          border:0;
        }
        .confirm{
          width: 160px;
          height:42px;
          margin-top: 42px;
          background: url("../../../assets/img/deal/sendDeal/confirm.png") left center no-repeat;
          border:0px;
          color: #ffffff;
        }
      }
    }
    #modal-overlay2{
      .alert{
        width: 549px;
        height:326px;
        overflow: hidden!important;
        position:absolute;top:50%;left:50%;
        transform:translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        -moz-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        -o-transform:translate(-50%,-50%);
        background: #FFFFFF;
        border-radius: 10px;
        text-align: center;
        font-size: 18px;
        line-height: 34px;
        padding-top:102px;
        color: $alertColor;
        .close{
          width: 20px;
          height:20px;
          position: absolute;
          top: 20px;
          right:20px;
          background: url("../../../assets/img/deal/sendDeal/close.png") left center no-repeat;
          border:0;
        }
        .confirm{
          width: 160px;
          height:42px;
          margin-top: 52px;
          background: url("../../../assets/img/deal/sendDeal/confirm.png") left center no-repeat;
          border:0px;
          color: #ffffff;
        }
      }
    }
    /*以上是弹框提示*/
    .sendDealContainer{
      color: $normalColor;
      li{
        width: 900px;
        height: 80px;
        border-bottom:1px solid #ebebeb;
        .sendDealTitle{
          height:44px;
          padding-top:14px;
          li{
            width:33%;
            height:30px;
            line-height: 30px;
            float: left;
            border:0;
            h2{
              cursor: pointer;
              font-size:18px;
              line-height: 30px;
              float: left;
              a{
                display: block;
                line-height: 30px;
                color: $normalColor;
              }
            }
          }
          li:nth-child(2){
            padding-left:140px;
            color: #f56212;
          }
          .titleButton{
            float: right;
            .edit,.cancel{
              float: right;
              padding-left: 24px;
              margin-left:19px;
              cursor: pointer;
              color: $normalColor;
            }
            .edit{
              background: url("../../../assets/img/deal/sendDeal/edit-gray.png") left center no-repeat;
            }
            .cancel{
              background: url("../../../assets/img/deal/sendDeal/cancell-gray.png") left center no-repeat;
            }
            .edit:hover{
              background: url("../../../assets/img/deal/sendDeal/edit.png") left center no-repeat;
              color: $themeColor;
            }
            .cancel:hover{
              background: url("../../../assets/img/deal/sendDeal/cancell.png") left center no-repeat;
              color: $themeColor;
            }
          }

        }
        p{
          line-height: 22px;
        }
      }
    }
  }
</style>
