<template>

      <div id="company">
        <router-view></router-view>
        <company-slider></company-slider>
        <div style="clear: both"></div>
      </div>

</template>

<script>
  import CompanySlider from "./companySlider.vue"
  export default {
    name: 'company',
    data:function() {
      return {
        msg:"公司主页"
      }
    },
    components:{
      CompanySlider
    },
    watch: {
//    '$route' (to, from) {
//      const toDepth = to.path.split('/').length
//      const fromDepth = from.path.split('/').length
//      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
//    }
    }
  }
</script>
<style>
  
</style>
