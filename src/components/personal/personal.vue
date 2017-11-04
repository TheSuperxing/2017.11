<template>
  <div class="personal clear">
    <router-view></router-view>
    <personal-slider></personal-slider>
  </div>
</template>

<script>
  import PersonalSlider from "./personalSlider.vue"
  export default {
    name: 'personal',
    components:{
      PersonalSlider
    }
  }
</script>
