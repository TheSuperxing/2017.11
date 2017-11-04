import Vue from "vue"

const title=Vue.directive('title',{
  inserted:function (el,binding) {
    var el=el;
    setInterval(function (){
      document.title=el.innerText;
    },2000)
  }
})

export {title}
