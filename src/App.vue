<template>
  <div id="app">
    <div class="titleChange" v-title>edi</div>
    <header-nav></header-nav>
    <div id="center-content" class="clear">
      <router-view></router-view>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
  import Vue from "vue";
  import FooterNav from "./components/footer.vue";
  import HeaderNav from "./components/header.vue";
  setInterval(function () {
    if($(".titleChange").text()=="edi"){
      $(".titleChange").text("建筑因您更美")
    }else {
      $(".titleChange").text("edi")
    }
  },2000)
export default {
  name: 'app',
  data(){
    return{

    }
  },
  components:{
    HeaderNav,
    FooterNav
  },
  /*created(){
  	$(document.body).css("overflow","scoll");
  },
  mounted(){
		$(document.body).css("overflow","scoll");
	}*/

}

</script>

