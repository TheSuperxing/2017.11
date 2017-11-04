<template>
  <div class="languageIndex">

    <div class="title">
      <h2 v-cloak>{{title}}</h2>
      <p v-on:click="addLanguage">添加</p>
    </div>
    <!--personaltitle结束-->
    <div class="languageContainer" v-if="reveal.addLanguage">
      <div class="personal-empty" v-if="reveal.empty">（您尚未添加语言信息）</div>
      <!--显示、编辑已存在的信息开始-->
      <div class="languageInfo" v-for="(item,index) in this.language">
        <!--显示信息列表开始-->
        <div class="languageInfoList" v-if="!reveal.editInfo[index]">
          <div class="languageInfoTitle">
            <h4 v-cloak>{{localLanguage.languageName[index]}}</h4>
            <ul>
              <li v-bind:class="{openOrPrivacy:reveal.openOrPrivacy[index]}" v-on:click="openOrPrivacy(index)">
                <p v-cloak>{{reveal.openOrPrivacyText[index]}}</p>
              </li>
              <li v-on:click="languageEdit(index)">
                <p>编辑</p>
              </li>
              <li v-on:click="languageEditDel(index)">
                <p>删除</p>
              </li>
            </ul>
          </div>
          <div class="languageInfoBody">
            <p v-cloak>{{localLanguage.info.profession[index]}}</p>
          </div>
        </div>
        <!--显示信息列表结束-->
        <!--编辑显示信息列表开始-->
        <div class="languageInfoEdit" v-if="reveal.editInfo[index]">
          <ul>
            <li>带&nbsp;*&nbsp;号为必选项</li>
            <li>
              <label>
                <h5>*&nbsp;语言种类</h5>
                <input v-model="localLanguage.languageName[index]" type="text" placeholder="请输入语言种类">
              </label>
            </li>
            <li>
              <label>
                <h5>熟练程度</h5>
                <input v-model="localLanguage.info.profession[index]" type="text" placeholder="请输入熟练程度">
              </label>
            </li>
            <li>
              <button v-on:click="languageEditKeep(index)">保存</button>
              <button v-on:click="languageEditCancel(index)">取消</button>
            </li>
          </ul>
        </div>
        <!--编辑显示信息列表结束-->
      </div>
    </div>
    <!--显示、编辑已存在的信息结束-->
    <div class="languageContainer" v-if="!reveal.addLanguage">
      <ul>
        <li>带&nbsp;*&nbsp;号为必选项</li>
        <li>
          <label>
            <h5>*&nbsp;语言种类</h5>
            <input v-model="newLanguage.languageName" type="text" placeholder="请输入语言种类">
          </label>
        </li>
        <li>
          <label>
            <h5>熟练程度</h5>
            <input v-model="newLanguage.info.profession" type="text" placeholder="请输入熟练程度">
          </label>
        </li>
        <li>
          <button v-bind:class="{keepAdd:reveal.keepAddLanguage}" v-on:click="keepNewLanguage">保存</button>
          <button v-on:click="cancelNewLanguage">取消</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Vue from "vue"
  import {mapState} from "vuex"
  export default {
    name:"LanguageIndex",
    data(){
      return {
        title:"语言",
        reveal:{
          empty:true,//是否显示执业资格信息尚未添加
          openOrPrivacy:[],//信息是否公开显示,通过服务器获取的数据
          openOrPrivacyText:[],//信息是否公开显示,文字切换
          editInfo:[],//是否编辑信息
          addLanguage:true,//是否添加信息
          keepAddLanguage:true,//添加模式下，保存按钮是否可用
        },
        localLanguage:{
          languageName:[],
          info:{
            time:[],
            profession:[]
          }
        },
        newLanguage:{
          languageName:"",
          info:{
            time:"",
            profession:""
          }
        }
      }
    },
    mounted(){
      if(this.language.length!=0){
        Vue.set(this.reveal,"empty",false)//是否显示执业资格信息尚未添加
        for(let i=0;i<this.language.length;i++){
          /*数据同步本地一份开始*/
          this.localLanguage.languageName[i]=this.language[i].languageName;
          this.localLanguage.info.profession[i]=this.language[i].info.profession;
          //论文数据
          this.reveal.editInfo.push(false);//信息是否可以编辑赋初始值
          this.reveal.openOrPrivacy.push(false);//信息是否对外显示赋初始值
          this.reveal.openOrPrivacyText.push("显示");//信息是否对外显示文字切换赋初始值
        }
      }else{
        Vue.set(this.reveal,"empty",true)//是否显示执业资格信息尚未添加
      }
    },
    updated(){
      if(this.language.length!=0){
        Vue.set(this.reveal,"empty",false)
      }else if(this.language.length==0){
        Vue.set(this.reveal,"empty",true)//是否显示执业资格信息尚未添加
      }
      /*是否显示执业资格信息尚未添加*/
      if(this.newLanguage.languageName.length!=0){
        if(this.newLanguage.languageName.trim().length!=0){
          Vue.set(this.reveal,"keepAddLanguage",false);//控制保存按钮的背景颜色
          Vue.set(this.newLanguage,"languageName",this.newLanguage.languageName.trim())//进行必填项的空格去除处理
        }
      }else {
        Vue.set(this.reveal,"keepAddLanguage",true);//控制保存按钮的背景颜色
      }
    },
    computed:mapState({
      language:state=>state.personal.personalMessage.otherSkill.language,
    }),
    methods:{
      openOrPrivacy(index){//信息是否对外公开控制按钮
        Vue.set(this.reveal.openOrPrivacy,[index],!this.reveal.openOrPrivacy[index]);
        if(this.reveal.openOrPrivacyText[index]=="显示"){//显示隐藏文字切换
          Vue.set(this.reveal.openOrPrivacyText,[index],"隐藏")
        }else{
          Vue.set(this.reveal.openOrPrivacyText,[index],"显示")
        }
      },
      languageEdit(index){//编辑状态进入按钮
        Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index]);//进入编辑状态
      },
      languageEditKeep(index){//编辑状态，保存按钮
        if(this.localLanguage.languageName[index].trim().length!=0){
          Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index])//确认编辑后视图切换回到原来查看页面
          this.language[index].languageName=this.localLanguage.languageName[index];
          this.language[index].info.profession=this.localLanguage.info.profession[index];
          /*如果是保存，把数据保存到Vuex中*/
        }
      },
      languageEditCancel(index){//编辑状态，取消按钮
        Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index])//取消编辑后视图切换回到原来查看页面
        this.localLanguage.languageName[index]=this.language[index].languageName;
        this.localLanguage.info.profession[index]=this.language[index].info.profession;

        /*如果是取消编辑，从新从Vuex中得到数据*/
      },
      languageEditDel(index){//编辑状态，删除按钮
        this.language.splice(index,1);
        this.localLanguage.languageName.splice(index,1);
        this.localLanguage.info.profession.splice(index,1);
      },
      addLanguage(){//添加信息按钮，添加信息的视图切换
        Vue.set(this.reveal,"addLanguage",false);
        Vue.set(this.reveal,"empty",false);
      },
      keepNewLanguage(){//添加模式下的保存
        if(this.newLanguage.languageName.length!=0){
          if(this.newLanguage.languageName.trim().length!=0){

            this.localLanguage.languageName.push(this.newLanguage.languageName);
            this.localLanguage.info.profession.push(this.newLanguage.info.profession);
            //同步信息到执业资格首页
            this.language.push({languageName:this.newLanguage.languageName,info:{time:"",profession:this.newLanguage.info.profession,introduce:"",level:"",organ:"",}})
            /*同步信息到个人信息首页*/
            Vue.set(this.reveal,"addLanguage",true);
            //视图切换到执业资格的首页
            Vue.set(this.newLanguage,"languageName","");
            Vue.set(this.newLanguage.info,"profession","");
            /*清除数据，保证下次输入时输入框为空*/
            this.reveal.openOrPrivacyText.push("显示")//追加显示隐藏按钮文字
            this.reveal.openOrPrivacy.push(false)//追加显示隐藏按钮状态
          }
        }
      },
      cancelNewLanguage(){
        Vue.set(this.reveal,"addLanguage",true);
        //视图切换到执业资格的首页
        Vue.set(this.newLanguage,"languageName","");
        Vue.set(this.newLanguage.info,"profession","");
        /*清除数据，保证下次输入时输入框为空*/
      }
    }
  }
</script>
<style scoped lang="scss">
  $bfColor:#ffffff;
  $activeColor: #f27519;
  $borderColor:#ebebeb;
  $emptyColor:#9c9c9c;
  $themeColor:rgb(242,117,25);
  .languageIndex {
    .title{
      padding:35px 0 0 0;
      font-size: 18px;
      color: $activeColor;
      border-bottom: 1px solid $borderColor;
      h2{
        float: left;
        padding-bottom: 8px;
        border-bottom:2px solid $activeColor;
        margin-bottom:-1px;
      }
      P{
        cursor: pointer;
        float: right;
        font-size: 14px;
        padding-right:20px;
        padding-left:20px;
        background: url("../../../assets/img/personal/education/add.png") left center no-repeat;
      }
    }
    /*头部*/
    .personal-empty{
      width: 820px;
      padding: 35px 0 10px 0;
      font-size:16px;
      color: $emptyColor;
      text-align: center;
    }
    /*信息为空提示*/
    .languageContainer{
      padding:0 20px;
      /*显示编辑信息列表开始*/
      .languageInfo{
        border-bottom:1px solid $borderColor;
        /*信息列表开始*/
        .languageInfoList{
          .languageInfoTitle{
            color: $themeColor;
            margin-top: 30px;
            margin-bottom:19px;
            h4{
              float: left;
            }
            ul{
              float: right;
              margin-top:2px;
              li{
                float: left;
                cursor: pointer;
                margin:0;
                padding:0;
                p{
                  color: $themeColor;
                  padding:0 17px 0 12px;
                }
              }
              li:nth-child(1){
                p{
                  padding-left:32px;
                  background: url("../../../assets/img/personal/education/eye.png") left center no-repeat;
                }
              }
              li:nth-child(2){
                p{
                  padding-left:27px;
                  background: url("../../../assets/img/personal/education/edit.png") left center no-repeat;
                }
              }
              li:last-child{
                p{
                  padding-right:0;
                  padding-left:21px;
                  background: url("../../../assets/img/personal/education/delete.png") left center no-repeat;
                }
              }
              .openOrPrivacy{
                p{
                  background: url("../../../assets/img/personal/education/hidden.png") left center no-repeat!important;
                  color: #353535;
                }

              }
            }

          }
          .languageInfoBody{
            p{
              height:20px;
              margin:15px 0 ;
              color: #353535;
              span{
                color: #757575;
                margin-left:8px;
              }
            }
            p:last-child{
              margin-bottom:17px;
            }
          }
        }
        /*信息列表结束*/
        /*编辑信息列表开始*/
        .languageInfoEdit{
          ul{
            li{
              margin:20px 0;
              h5{
                float: left;
                line-height: 35px;
                color: $themeColor;
                cursor: pointer;
              }
              input{
                float: left;
                height:35px;
                margin-left:22px;
                padding-left:15px;
                border-radius: 5px;
                border:1px solid $borderColor;
                cursor: pointer;
              }
              input[type=text]{
                width:480px;
              }
              input[type=month]{
                width:120px;
              }
              button{
                cursor: pointer;
              }
            }
            li:nth-child(1){
              color: #909090;
              margin-top:30px;
              margin-bottom:20px;
            }
            li:nth-child(2){
              h5{
                margin-left:-12px;
              }
            }
            li:last-child{
              padding-left:52px;
              button{
                margin-left:30px;
                width: 117px;
                height:33px;
                border-radius: 5px;
                border:1px solid $themeColor;
                background: #ffffff;
                color: $themeColor;
                line-height: 35px;
              }
              button:nth-child(1){
                border:0;
                color: #ffffff;
                background: url("../../../assets/img/personal/education/btn_save_normal.png.png") left center no-repeat;
              }
            }
          }
        }
        /*编辑信息列表结束*/
      }
      /*显示编辑信息列表结束*/
    }
    /*添加信息开始*/
    .languageContainer{
      ul{
        li{
          margin:20px 0;
          h5{
            float: left;
            line-height: 35px;
            color: $themeColor;
            cursor: pointer;
          }
          input{
            float: left;
            height:35px;
            margin-left:22px;
            padding-left:15px;
            border-radius: 5px;
            border:1px solid $borderColor;
            cursor: pointer;
          }
          input[type=text]{
            width:480px;
          }
          input[type=month]{
            width:120px;
          }
          button{
            cursor: pointer;
          }
        }
        li:nth-child(1){
          color: #909090;
          margin-top:30px;
          margin-bottom:20px;
        }
        li:nth-child(2){
          h5{
            margin-left:-12px;
          }
        }
        li:last-child{
          padding-left:52px;
          button{
            margin-left:30px;
            width: 117px;
            height:33px;
            border-radius: 5px;
            border:1px solid $themeColor;
            background: #ffffff;
            color: $themeColor;
            line-height: 35px;
          }
          button:nth-child(1){
            border:0;
            color: #ffffff;
            background: url("../../../assets/img/personal/education/btn_save_normal.png.png") left center no-repeat;
          }
          .keepAdd{
            background: url("../../../assets/img/personal/education/btn_save_disabled.png.png") left center no-repeat !important;
          }
        }
      }
    }
    /*添加信息结束*/
  }
</style>
