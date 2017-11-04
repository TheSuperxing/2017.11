<template>
  <div id="team">
    <router-view></router-view>
    <team-slider></team-slider>
  </div>
</template>

<script>
  import TeamSlider from "./teamSlider.vue"
  export default {
    name: 'team',
    data:function() {
      return {
        msg:"团队主页总入口"
      }
    },
    components:{
      TeamSlider
    }
  }
</script>
