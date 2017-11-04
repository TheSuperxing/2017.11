<template>
  <div class="sendDealInfo">
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
        <p>是否删除？</p>
        <button class="close" v-on:click="closeAlert"></button>
        <button class="confirm" v-on:click="confirmDeleteDeal">确认</button>
      </div>
    </div>


    <div class="sendDealInfoTitle">
      <div class="titleLeft">
        <h2 v-cloak>{{this.dealInfo[this.$route.query.id].mainInfo.name}}</h2>
        <p v-cloak>发布时间：{{this.dealInfo[this.$route.query.id].mainInfo.time}}</p>
      </div>
      <ul class="titleRight">
        <li @click="deleteDeal" class="cancel">
          删除
          <!--<router-link :to="{path:'/yhzx/deal/sendDealIndex/editSendDeal',query:{id:this.$route.query.id}}"></router-link>-->
        </li>
        <li  @click="editPrompt" class="edit">
          编辑
          <!--<router-link :to="{path:'/yhzx/deal/sendDealIndex/editSendDeal',query:{id:this.$route.query.id}}"></router-link>-->
        </li>
        <li class="dealState" v-cloak>{{this.dealInfo[this.$route.query.id].mainInfo.dealState}}</li>
      </ul>
    </div>
    <!--以上是协议的骨干信息-->
    <!--协议内容开始-->
    <div class="dealContent">
      <div class="dealContentTitle">
        <h3>协议内容</h3>
        <button v-bind:class="{unfold:!reveal.dealContentUnfold.state}" @click="dealContentUnfold" v-cloak>{{reveal.dealContentUnfold.text}}</button>
      </div>
      <transition name="unfold-fade">
        <ul v-if="reveal.dealContentUnfold.state" class="dealContentContainer">
          <li>
            <h4>
              甲方
              <span></span>
            </h4>
            <p>{{this.dealInfo[this.$route.query.id].content.firstParty.name}}</p>
          </li>
          <li>
            <h4>
              乙方
              <span></span>
            </h4>
            <p>{{this.dealInfo[this.$route.query.id].content.secondParty.name}}</p>
          </li>
          <li>
            <h4>协议内容</h4>
            <p>{{this.dealInfo[this.$route.query.id].content.partyContent}}</p>
          </li>
          <!--阶段任务开始-->
          <li class="stageTask">
            <h4>阶段内容</h4>
            <ul v-for="(item,index) in this.dealInfo[this.$route.query.id].content.stageTask">
              <li v-for="$item in item" v-if="($item!='支付前'&&$item!='支付中'&&$item!='已支付')">
                <!--隐藏支付状态-->
                <p>
                  <span>{{index+1}}.</span>
                  <span>{{$item}}</span>
                </p>
              </li>

            </ul>
          </li>
          <!--阶段任务结束-->
          <li>
            <h4>付款总额</h4>
            <p>{{this.dealInfo[this.$route.query.id].content.cost}}</p>
          </li>
          <li>
            <h4>付款方式</h4>
            <p>{{this.dealInfo[this.$route.query.id].content.modeOfPayment}}</p>
          </li>
          <li>
            <h4>备注信息</h4>
            <p>{{this.dealInfo[this.$route.query.id].content.remarksInfo}}</p>
          </li>
        </ul>
      </transition>
    </div>
    <!--协议内容结束-->

  </div>
</template>
<script>
  import Vue from "vue"
  import {mapState} from "vuex"
  import ModalOpp from "../../../assets/js/modalOpp"
  export default {
    name:"sendDealInfo",
    data(){
      return{
        reveal:{
          dealContentUnfold:{//协议内容的收起或者展开
            state:true,
            text:"收起"
          },
        },
      }
    },
    computed:mapState({
      dealInfo:state=>state.myDeal.dealInfo,
      /*获取数据*/
    }),
    methods:{
      editPrompt(){//协议编辑的提示信息
        var modal= new ModalOpp("#modal-overlay");
        modal.makeText();
      },
      closeAlert(){//弹框关闭按钮
        var modal= new ModalOpp("#modal-overlay");
        modal.closeModal();
        var modal2= new ModalOpp("#modal-overlay2");
        modal2.closeModal();
        var modal3= new ModalOpp("#modal-overlay3");
        modal3.closeModal();
        var modal4= new ModalOpp("#modal-overlay4");
        modal4.closeModal();
      },
      confirmEdit(){
        var modal= new ModalOpp("#modal-overlay");
        modal.closeModal();
        location.hash="/yhzx/deal/outlineDealIndex/editOutlineDeal?id="+this.$route.query.id
      },
      deleteDeal(){//删除协议
        var modal= new ModalOpp("#modal-overlay2");
        modal.makeText();
      },
      confirmDeleteDeal(){
        var modal= new ModalOpp("#modal-overlay2");
        modal.closeModal();
        this.dealInfo.splice(this.$route.query.id,1);
        location.hash="/yhzx/deal/outlineDealIndex/outlineDeal"
      },
      closeStopDealAlert(){//关闭通知
        var modal3= new ModalOpp("#modal-overlay3");
        modal3.closeModal();
      },
      dealContentUnfold(){//协议内容的收起和展开
        Vue.set(this.reveal.dealContentUnfold,"state",!this.reveal.dealContentUnfold.state)
        if(!this.reveal.dealContentUnfold.state){
          Vue.set(this.reveal.dealContentUnfold,"text","展开")
        }else {
          Vue.set(this.reveal.dealContentUnfold,"text","收起")
        }
        //console.log(this.reveal.unfold.state)
      },
    }
  }
</script>
<style scoped lang="scss">
  $borderColor:#ebebeb;
  $hColor:#353535;
  $textColor:#8c8c8c;
  $themeColor:#546686;
  $alertColor:#525252;
  .sendDealInfo{
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
    #modal-overlay3{
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
    .sendDealInfoTitle{
      height:90px;
      border-bottom: 1px solid $borderColor;
      .titleLeft{
        float: left;
        margin-top:14px;
        h2{
          line-height: 30px;
          font-size:18px;
          color: $themeColor;
        }
        p{
          margin-top:-2px;
          font-size: 14px;
          line-height: 22px;
          color: $textColor;
        }
      }
      .titleRight{
        float: right;
        li{
          float: right;
          margin-left:19px;
          cursor: pointer;
          padding-left: 24px;
          color: $hColor;
        }
        li:nth-last-child(2){
          margin-left:30px;
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
        .dealState{
          color: #f56212;
        }
      }
    }

    /*协议个部分标题样式开始*/
    .dealContentTitle{
      height:60px;
      border-bottom:1px solid $borderColor;
      h3{
        float: left;
        color: $themeColor;
        line-height:42px;
        margin-top:16px;
        border-bottom:1px solid $themeColor;
        margin-bottom:-1px;
      }
      button{
        color: $themeColor;
        border:none;
        background: #ffffff;
        cursor: pointer;
        float: right;
        line-height:42px;
        margin-top:16px;
        padding-left:23px;
        background: url("../../../assets/img/deal/sendDeal/up.png") left center no-repeat;
      }
      .unfold{
        background: url("../../../assets/img/deal/sendDeal/down.png") left center no-repeat;
      }
    }
    /*协议个部分标题样式结束*/

    /*协议内容开始*/
    .dealContent{
      .dealContentContainer{
        margin-top:20px;
        li{
          padding:4px 0;
          h4{
            height: 22px;
            width:56px;
            float: left;
            color: $hColor;
            text-align:justify;
            span{
              display: inline-block;
              text-align: justify;
              padding-left:100%;
            }
          }
          p{
            width:830px;
            float: right;
            color: $textColor;
            min-height: 22px;
          }
        }
        .stageTask{
          ul{
            float: right;
            width:830px;
            border-bottom: 1px solid $borderColor;
            padding:7px 0;
            position: relative;
            li{
              padding:0px;
              p{
                min-height: 22px;
                span{
                  float: left;
                }
                span:nth-child(1){
                  display: none;
                }
              }
            }
            li:nth-child(1){
              p{
                span:nth-child(1){
                  display: block;
                }
              }
            }
            .stageTaskButton{
              width: 100px;
              position: absolute;
              top: 10px;
              right:0;
              p{
                width:100px;
                float: left;
                color: #f56212;
              }
              button{
                width: 100px;
                height: 36px;
                background: url("../../../assets/img/deal/sendDeal/stageTask.png") left center no-repeat;
                border: 0;
                color: #ffffff;
                cursor: pointer;
              }
            }
          }
          ul:nth-child(2){
            padding-top:0;
          }
        }
        /*阶段内容的编号*/
        .fileDownload{
          p{
            a{
              color: $themeColor;
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
      }
      /*协议内容展开收起动画开始*/
      .unfold-fade-enter-active {
        transition: all .3s ease;
      }
      .unfold-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
      }
      .unfold-fade-enter, .unfold-fade-leave-to
        /* .slide-fade-leave-active 在低于 2.1.8 版本中 */ {
        transform: translateX(10px);
        opacity: 0;
      }
      /*协议内容展开收起动画结束*/
    }
    /*协议内容结束*/

  }
</style>
