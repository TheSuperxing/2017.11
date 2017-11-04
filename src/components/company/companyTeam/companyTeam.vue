<template>
  <div class="companyTeam">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name:"companyTeam",
    data:function(){
      return {

      }
    }
  }
</script>
<style lang="scss" scoped="">
$bfColor:#f7f9fc;
$activeColor: #2eb3cf;
  .companyTeam{
    width:940px;
    background-color:$bfColor;

    float:left;
    border-radius:5px;
  }
</style>
