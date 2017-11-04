<template>
  <div class="teamInfo">
    <router-view></router-view>
  </div>
</template>

<script>
	export default {
    name:"teamInfo",
    data:function(){
      return {
        msg:"团队基本信息"
      }
    }
  }
</script>

<style>

</style>
