<template>
  <div class="paperAndPatentIndex">
    <paper></paper>
    <patent></patent>
  </div>
</template>
<script>
  import Paper from "./paper.vue"
  import Patent from "./patent.vue"
  export default {
    name:"paperAndPatentIndex",
    components:{
      Paper,
      Patent
    }
  }
</script>
<style scoped lang="scss">
  $bfColor:#ffffff;
  $activeColor: #f27519;
  $borderColor:#ebebeb;
  $emptyColor:#9c9c9c;
  $themeColor:rgb(242,117,25);
  .paperAndPatentIndex {
    width: 940px;
    float: left;
    padding: 0 40px;
    background: $bfColor;
    min-height: 671px;
  }
</style>
