<template>
  <div class="index">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data:function(){
      return {
        msg:"首页"
      }
    },
    mounted(){
    	$(document.body).css("overflow","scoll");
    }
  }
</script>
<style scoped lang="scss">
.index{
	width: 1200px;
	min-height: 600px;
	color: #FFFFFF;
	font-size: 20px;
	 /*background-image: linear-gradient(rgba(255,255,255,0),rgba(255,255,255,1));*/
	background: -webkit-linear-gradient(top,rgba(109,125,155,0),rgba(109,125,155,0.5)); /* Safari 5.1 - 6 */
  background: -o-linear-gradient(top,rgba(109,125,155,0),rgba(109,125,155,0.5)); /* Opera 11.1 - 12*/
  background: -moz-linear-gradient(top,rgba(109,125,155,0),rgba(109,125,155,0.5)); /* Firefox 3.6 - 15*/
  background: linear-gradient(to top, rgba(109,125,155,0), rgba(109,125,155,0.5)); /* 标准的语法 */
 	h1{
 		line-height: 250px;
 		text-align: center;
 	}
}
</style>
