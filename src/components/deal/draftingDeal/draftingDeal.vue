<template>
  <div class="draftingDeal">
    <button @click="edit">
      <p>起草协议</p>
    </button>
  </div>
</template>
<script>
  export default {
    name:"draftingDeal",
    methods:{
      edit(){
        location.hash="/yhzx/deal/draftingDealIndex/editDraftingDeal"
      }
    }
  }
</script>
<style scoped lang="scss">
  .draftingDeal{
    button{
      width: 180px;
      height: 46px;
      margin:123px 0 0 380px;
      background: url("../../../assets/img/deal/draftingDeal/draftingDeal.png") left center no-repeat;
      border:0;
      color: #ffffff;
      cursor: pointer;
      p{
        margin-left:50px;
        float: left;
        padding-left:25px;
        background: url("../../../assets/img/deal/draftingDeal/add.png") left center no-repeat;
      }
    }
  }
</style>
