<template>
  <div class="hello">
    <h1 v-on:click="text()">{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>

    <template>
      <el-button :plain="true" @click="open5">消息</el-button>
      <el-button :plain="true" @click="open6">成功</el-button>
      <el-button :plain="true" @click="open7">警告</el-button>
      <el-button :plain="true" @click="open8">错误</el-button>
    </template>
  </div>
</template>

<script>
  import Vue from "vue"
  import {Message,Button} from "element-ui"
  Vue.prototype.$message = Message
  Vue.use(Button)
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    text(){
      console.log($("h1").text());
      console.log($("img").attr("src"))
    },
    open5() {
      this.$message({
        showClose: true,
        message: '这是一条消息提示'
      });
    },

    open6() {
      this.$message({
        showClose: true,
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      });
    },

    open7() {
      this.$message({
        showClose: true,
        message: '警告哦，这是一条警告消息',
        type: 'warning'
      });
    },

    open8() {
      this.$message({
        showClose: true,
        message: '错了哦，这是一条错误消息',
        type: 'error'
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
  
}
li {
    display: inline-block;
    margin: 0 10px;
    
  }
  a {
      color: #42b983;
    }



</style>
