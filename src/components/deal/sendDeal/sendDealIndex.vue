<template>
  <div class="sendDealIndex">
    <!--<send-deal></send-deal>
    <send-edal-info></send-edal-info>-->
    <router-view></router-view>
  </div>
</template>
<script>
  import Vue from "vue"
  import {mapState} from "vuex"
  import {ajaxData} from "./acceptData"
  export default {
    name:"sendDealIndex",
    computed:mapState({
      state:state=>state.myDeal,
      /*获取数据*/
    }),
    created() {
      Vue.set(this.state, "dealInfo", ajaxData())
    }
  }
</script>
<style scoped lang="scss">
  .sendDealIndex{
    float: left;
    width:940px;
    min-height:346px;
    background: #ffffff;
    padding:20px;
    color: #353535;
  }
</style>
