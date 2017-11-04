window.onhashchange=function (){
  var hashLength=location.hash.split("/").length;
  var hash=location.hash.split("/");
  var navHash=location.hash.split("/")[1];

  (function nav() {
    switch (navHash){
      case "index":
        navHashUpdateSessionStorageAndColor(0);
        break;
      case "fxxq":
        navHashUpdateSessionStorageAndColor(1);
        break;
      case "fbxq":
        navHashUpdateSessionStorageAndColor(2);
        break;
      case "wdjy":
        navHashUpdateSessionStorageAndColor(3);
        break;
      case "personal":
        navHashUpdateSessionStorageAndColor(4);
        break;
    }
  }(navHash));//导航颜色变化
  (function personal() {
    switch (hash[2]){
      case "personalIndex":
        sliderHashUpdateSessionStorageAndColor(0);
        break;
      case "basicInfo":
        sliderHashUpdateSessionStorageAndColor(1);
        break;
      case "educationIndex":
        sliderHashUpdateSessionStorageAndColor(2);
        break;
      case "workExperienceIndex":
        sliderHashUpdateSessionStorageAndColor(3);
        break;
      case "projectExperienceIndex":
        sliderHashUpdateSessionStorageAndColor(4);
        break;
      case "teamExperienceIndex":
        sliderHashUpdateSessionStorageAndColor(5);
        break;
      case "certificateIndex":
        sliderHashUpdateSessionStorageAndColor(6);
        break;
      case "jobInfoIndex":
        sliderHashUpdateSessionStorageAndColor(7);
        break;
      case "awardIndex":
        sliderHashUpdateSessionStorageAndColor(8);
        break;
      case "paperAndPatentIndex":
        sliderHashUpdateSessionStorageAndColor(9);
        break;
      case "languageAndSoftwareIndex":
        sliderHashUpdateSessionStorageAndColor(10);
        break;
    }
  }(hash[2]));//个人部分侧边栏颜色变化
};

function sliderHashUpdateSessionStorageAndColor(index) {
  $(".sliderNavList li").removeClass("selected");
  $(".sliderNavList li").eq(index).addClass("selected");
}
//通过不同hash设置sessionstorage和类名样式
function navHashUpdateSessionStorageAndColor(index) {
  $(".navlist li").removeClass("selected");
  $(".navlist li").eq(index).addClass("selected");
}

