<template>
  <div class="awardIndex">

    <div class="title">
      <h2 v-cloak>{{title.text}}</h2>
      <p v-on:click="addInfo">添加</p>
    </div>
    <!--personaltitle结束-->
    <div class="awardContainer" v-if="reveal.addAward">
      <div class="personal-empty" v-if="reveal.empty">（您尚未添加执业资格信息）</div>
      <!--显示、编辑已存在的信息开始-->
      <div class="awardInfo" v-for="(item,index) in this.award">
        <!--显示信息列表开始-->
        <div class="awardInfoList" v-if="!reveal.editInfo[index]">
          <div class="awardInfoTitle">
            <h4 v-cloak>{{localAward.awardName[index]}}</h4>
            <ul>
              <li v-bind:class="{openOrPrivacy:reveal.openOrPrivacy[index]}" v-on:click="openOrPrivacy(index)">
                <p>{{reveal.openOrPrivacyText[index]}}</p>
              </li>
              <li v-on:click="awardEdit(index)">
                <p>编辑</p>
              </li>
              <li v-on:click="awardDel(index)">
                <p>删除</p>
              </li>
            </ul>
          </div>
          <div class="awardInfoBody">
            <p v-cloak>发证机构：<span>{{localAward.info.organ[index]}}</span></p>
            <p v-cloak>评定日期：<span>{{localAward.info.time[index]}}</span></p>
          </div>
        </div>
        <!--显示信息列表结束-->
        <!--编辑显示信息列表开始-->
        <div class="awardInfoEdit" v-if="reveal.editInfo[index]">
          <ul>
            <li>带&nbsp;*&nbsp;号为必选项</li>
            <li>
              <label>
                <h5>*&nbsp;奖励名称</h5>
                <input v-model="localAward.awardName[index]" type="text" placeholder="请输入资格名称">
              </label>
            </li>
            <li>
              <label>
                <h5>颁发机构</h5>
                <input v-model="localAward.info.organ[index]" type="text" placeholder="请输入发证机构">
              </label>
            </li>
            <li>
              <label>
                <h5>评定日期</h5>
                <datepicker v-model="localAward.info.time[index]"></datepicker>
              </label>
            </li>
            <li>
              <button v-on:click="keepAwardEdit(index)">保存</button>
              <button v-on:click="cancelAwardEdit(index)">取消</button>
            </li>
          </ul>
        </div>
        <!--编辑显示信息列表结束-->
      </div>
    </div>
    <!--显示、编辑已存在的信息结束-->
    <div class="addAwardContainer" v-if="!reveal.addAward">
      <ul>
        <li>带&nbsp;*&nbsp;号为必选项</li>
        <li>
          <label>
            <h5>*&nbsp;奖励名称</h5>
            <input v-model="newAward.awardName" type="text" placeholder="请输入资格名称">
          </label>
        </li>
        <li>
          <label>
            <h5>颁发机构</h5>
            <input v-model="newAward.info.organ" type="text" placeholder="请输入注册单位">
          </label>
        </li>
        <li>
          <label>
            <h5>获奖时间</h5>
            <!--<input v-model="newAward.info.time" type="month" placeholder="请输入注册单位">-->
            <datepicker v-model="newAward.info.time"></datepicker>
          </label>
        </li>
        <li>
          <button v-bind:class="{keepAdd:reveal.keepAdd}" v-on:click="keepAwardAdd">保存</button>
          <button v-on:click="cancelAwardAdd">取消</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Vue from "vue"
  import {mapState} from "vuex"
  import datepicker from "../../units/Datepicker.vue"
  export default {
    name:"awardIndex",
    components:{
      datepicker
    },
    data(){
      return {
        title:{text:"职称信息"},
        reveal:{
          empty:true,//是否显示执业资格信息尚未添加
          openOrPrivacy:[false,false],//信息是否公开显示,通过服务器获取的数据
          openOrPrivacyText:[],//信息是否公开显示文本,通过服务器获取的数据
          editInfo:[],//是否编辑信息
          addAward:true,//是否添加信息
          keepAdd:true,//添加模式下，保存按钮是否可用
        },
        localAward:{
          awardName:[],
          info:{
            time:[],
            organ:[]
          }
        },
        newAward:{
          awardName:"",
          info:{
            time:"",
            organ:""
          }
        }
      }
    },
    mounted(){
      if(this.award.length==0){
        Vue.set(this.reveal,"empty",true)//是否显示执业资格信息尚未添加
      }else {
        Vue.set(this.reveal,"empty",false)//是否显示执业资格信息尚未添加
        for(let i=0;i<this.award.length;i++){
          /*数据同步本地一份开始*/
          this.localAward.awardName[i]=this.award[i].awardName;
          this.localAward.info.time[i]=this.award[i].info.time;
          this.localAward.info.organ[i]=this.award[i].info.organ;

          /*数据同步本地一份结束*/
          this.reveal.editInfo.push(false);//信息是否可以编辑赋初始值
        }
      }
      /*以上是初始化*/
      if(this.reveal.openOrPrivacy.length!=0){
        for(let i=0;i<this.reveal.openOrPrivacy.length;i++){
          if(!this.reveal.openOrPrivacy[i]){
            Vue.set(this.reveal.openOrPrivacyText,[i],"显示")
            //this.reveal.openOrPrivacyText.push("显示")
          }else{
            Vue.set(this.reveal.openOrPrivacyText,[i],"隐藏")
            //this.reveal.openOrPrivacyText.push("隐藏")
          }
        }
      }
      /*以上是是否对外显示文本信息初始化*/
    },
    updated(){
      if(this.award.length==0){
        Vue.set(this.reveal,"empty",true)
      }else {
        Vue.set(this.reveal,"empty",false)//是否显示执业资格信息尚未添加
      }
      /*是否显示执业资格信息尚未添加*/
      if(this.newAward.awardName.length!=0){
        if(this.newAward.awardName.trim().length!=0){
          Vue.set(this.reveal,"keepAdd",false);
          Vue.set(this.newAward,"awardName",this.newAward.awardName.trim())//进行空格去除处理
        }
      }else {
        Vue.set(this.reveal,"keepAdd",true);
      }
      /*控制保存按钮的背景颜色*/
    },
    computed:mapState({
      award:state=>state.personal.personalMessage.award,
    }),
    methods:{
      openOrPrivacy(index){//信息是否对外公开控制按钮
        Vue.set(this.reveal.openOrPrivacy,[index],!this.reveal.openOrPrivacy[index]);
        if(!this.reveal.openOrPrivacy[index]){//显示文本的控制
          Vue.set(this.reveal.openOrPrivacyText,[index],"显示")
        }else{
          Vue.set(this.reveal.openOrPrivacyText,[index],"隐藏")
        }
      },
      awardEdit(index){//编辑状态进入按钮
        Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index]);//进入编辑状态
      },
      keepAwardEdit(index){//编辑状态，保存按钮
        if(this.localAward.awardName[index].trim().length!=0){
          Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index])//取消编辑后视图切换回到原来查看页面
          this.award[index].awardName=this.localAward.awardName[index];
          this.award[index].info.time=this.localAward.info.time[index];
          this.award[index].info.organ=this.localAward.info.organ[index];
          /*如果是保存，把数据保存到Vuex中*/
        }
      },
      cancelAwardEdit(index){//编辑状态，取消按钮
        Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index])//取消编辑后视图切换回到原来查看页面
        this.localAward.awardName[index]=this.award[index].awardName;
        this.localAward.info.time[index]=this.award[index].info.time;
        this.localAward.info.organ[index]=this.award[index].info.organ;

        /*如果是取消编辑，从新从Vuex中得到数据*/
      },
      awardDel(index){//编辑状态，删除按钮
        this.award.splice(index,1);
        this.localAward.awardName.splice(index,1);
        this.localAward.info.time.splice(index,1);
        this.localAward.info.organ.splice(index,1);
      },
      addInfo(){//添加信息按钮，添加信息的视图切换
        Vue.set(this.reveal,"addAward",false);
        Vue.set(this.reveal,"empty",false);
      },
      keepAwardAdd(){//添加模式下的保存
        if(this.newAward.awardName.length!=0){
          if(this.newAward.awardName.trim().length!=0){

            this.localAward.awardName.push(this.newAward.awardName);
            this.localAward.info.time.push(this.newAward.info.time);
            this.localAward.info.organ.push(this.newAward.info.organ);
            //同步信息到执业资格首页
            this.award.push({awardName:this.newAward.awardName,info:{time:this.newAward.info.time,organ:this.newAward.info.organ}})
            /*同步信息到个人信息首页*/
            Vue.set(this.reveal,"addAward",true);
            //视图切换到执业资格的首页
            Vue.set(this.newAward,"awardName","");
            Vue.set(this.newAward.info,"time","");
            Vue.set(this.newAward.info,"organ","");
            /*清除数据，保证下次输入时输入框为空*/
            this.reveal.openOrPrivacy.push(false)//设置是否对外显示
            this.reveal.openOrPrivacyText.push("显示")//设置是否对外显示文本
          }
        }
      },
      cancelAwardAdd(){
        Vue.set(this.reveal,"addAward",true);
        //视图切换到执业资格的首页
        Vue.set(this.newAward,"awardName","");
        Vue.set(this.newAward.info,"time","");
        Vue.set(this.newAward.info,"organ","");
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
  .awardIndex {
    width: 940px;
    float: left;
    padding: 0 40px;
    background: $bfColor;
    min-height: 671px;
    .date-picker{
      width:140px;
      float: left;
      margin-left:22px;
    }
    /*时间插件样式*/
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
    .awardContainer{
      padding:0 20px;
      /*显示编辑信息列表开始*/
      .awardInfo{
        border-bottom:1px solid $borderColor;
        /*信息列表开始*/
        .awardInfoList{
          .awardInfoTitle{
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
                p{
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
          .awardInfoBody{
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
        .awardInfoEdit{
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
    .addAwardContainer{
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
