<template>
  <div class="companyInfo">
    <router-view></router-view>
  </div>
</template>

<script>
	export default {
    name:"companyInfo",
    data:function(){
      return {
        msg:"公司基本信息"
      }
    }
  }
</script>

<style>

</style>
