<template>
  <div class="draftingDealIndex">
    <!--<send-deal></send-deal>
    <send-edal-info></send-edal-info>-->
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name:"draftingDealIndex",
  }
</script>
<style scoped lang="scss">
  .draftingDealIndex{
    float: left;
    width:940px;
    min-height:346px;
    background: #ffffff;
    padding:20px;
    color: #353535;
  }
</style>
