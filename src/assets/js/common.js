$(function () {
  topBarHid();
//var navSessionStorageTog=new SessionStorageTog("navTogcolor",[0,0,0,0,0],0,"router-link-active",$(".navlist li a"));
//navSessionStorageTog.setSessionStorage();
  //导航样式和路由保持一致
//var slideNavSessionStorageTog=new SessionStorageTog("sideBarTogImg",[1, 0, 0, 0, 0,],0,"router-link-active",$(".sliderNavList li a"));
//slideNavSessionStorageTog.setSessionStorage();
  //侧边栏样式和路由保持一致
})
function topBarHid() {
  $(window).scroll(function () {
    if(document.body.scrollTop){
      $(".header").css("top",-39);
    }else {
      $(".header").css("top",0);
    }
  })
}
//设置topbar显示隐藏
//function sessionStorageTog(key,value,index,name,obj) {
//if(sessionStorage.getItem(key)==null){
//  sessionStorage.setItem(key,value);
//  obj.eq(index).addClass(name);
//  //console.log("ok")
//}else {
//  var navTogcolor=sessionStorage.getItem(key).split(",");
//
//  for (var i = 0 ;i<navTogcolor.length;i++){
//    obj.eq(i).removeClass(name);
//    if(navTogcolor[i]==1){
//      obj.eq(i).addClass(name);
//    }
//  }
//}
//}
//
//function SessionStorageTog(key,value,index,name,obj) {
//this.key=key;
//this.value=value;
//this.index=index;
//this.name=name;
//this.obj=obj;
//this.navTogcolor=null;
//}
//SessionStorageTog.prototype.setSessionStorage=function () {
//if(sessionStorage.getItem(this.key)==null){
//  sessionStorage.setItem(this.key,this.value);
//  this.obj.eq(this.index).addClass(this.name);
//}else {
//  this.navTogcolor=sessionStorage.getItem(this.key).split(",");
//  for(var i = 0 ; i < this.navTogcolor.length;i++){
//    this.obj.eq(i).removeClass(this.name);
//    if(this.navTogcolor[i]==1){
//      this.obj.eq(i).addClass(this.name);
//    }
//  }
//}
//}
//通过sessionStorage保证页面刷新后obj样式和路由保持对应




