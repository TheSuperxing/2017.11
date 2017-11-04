<template>
  <div class="otherSkillIndex">
    <language></language>
    <software></software>
  </div>
</template>
<script>
  import Language from "./language.vue"
  import Software from "./software.vue"
  export default {
    name:"paperAndPatentIndex",
    components:{
      Language,
      Software
    }
  }
</script>
<style scoped lang="scss">
  $bfColor:#ffffff;
  $activeColor: #f27519;
  $borderColor:#ebebeb;
  $emptyColor:#9c9c9c;
  $themeColor:rgb(242,117,25);
  .otherSkillIndex{
    width: 940px;
    float: left;
    padding: 0 40px;
    background: $bfColor;
    min-height: 671px;
  }
</style>
