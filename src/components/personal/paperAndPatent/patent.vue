<template>
  <div class="patentIndex">

    <div class="title">
      <h2 v-cloak>{{title}}</h2>
      <p v-on:click="addPatent">添加</p>
    </div>
    <!--personaltitle结束-->
    <div class="patentContainer" v-if="reveal.addPatent">
      <div class="personal-empty" v-if="reveal.empty">（您尚未添加论文信息）</div>
      <!--显示、编辑已存在的信息开始-->
      <div class="patentInfo" v-for="(item,index) in this.patent">
        <!--显示信息列表开始-->
        <div class="patentInfoList" v-if="!reveal.editInfo[index]">
          <div class="patentInfoTitle">
            <h4 v-cloak>{{localPatent.patentName[index]}}</h4>
            <ul>
              <li v-bind:class="{openOrPrivacy:reveal.openOrPrivacy[index]}" v-on:click="openOrPrivacy(index)">
                <p v-cloak>{{reveal.openOrPrivacyText[index]}}</p>
              </li>
              <li v-on:click="paperEdit(index)">
                <p>编辑</p>
              </li>
              <li v-on:click="paperEditDel(index)">
                <p>删除</p>
              </li>
            </ul>
          </div>
          <div class="patentInfoBody">
            <p v-cloak>{{localPatent.info.organ[index]}}</p>
            <p v-cloak>{{localPatent.info.time[index]}}</p>
          </div>
        </div>
        <!--显示信息列表结束-->
        <!--编辑显示信息列表开始-->
        <div class="patentInfoEdit" v-if="reveal.editInfo[index]">
          <ul>
            <li>带&nbsp;*&nbsp;号为必选项</li>
            <li>
              <label>
                <h5>*&nbsp;专利名称</h5>
                <input v-model="localPatent.patentName[index]" type="text" placeholder="请输入论文名称">
              </label>
            </li>
            <li>
              <label>
                <h5>颁发机构</h5>
                <input v-model="localPatent.info.organ[index]" type="text" placeholder="请输入熟练程度">
              </label>
            </li>
            <li>
              <label>
                <h5>有&nbsp;效&nbsp;期&nbsp;</h5>
                <!--<input v-model="localPatent.info.time[index]" type="month">-->
                <datepicker v-model="localPatent.info.time[index]"></datepicker>
              </label>
            </li>
            <li>
              <button v-on:click="paperEditKeep(index)">保存</button>
              <button v-on:click="paperEditCancel(index)">取消</button>
            </li>
          </ul>
        </div>
        <!--编辑显示信息列表结束-->
      </div>
    </div>
    <!--显示、编辑已存在的信息结束-->
    <div class="paperContainer" v-if="!reveal.addPatent">
      <ul>
        <li>带&nbsp;*&nbsp;号为必选项</li>
        <li>
          <label>
            <h5>*&nbsp;专利名称</h5>
            <input v-model="newPatent.patentName" type="text" placeholder="请输入论文">
          </label>
        </li>
        <li>
          <label>
            <h5>颁发机构</h5>
            <input v-model="newPatent.info.organ" type="text" placeholder="请输入发表期刊">
          </label>
        </li>
        <li>
          <label>
            <h5>有&nbsp;效&nbsp;期&nbsp;</h5>
            <!--<input v-model="newPatent.info.time" type="month" placeholder="请输入发表时间">-->
            <datepicker v-model="newPatent.info.time"></datepicker>
          </label>
        </li>
        <li>
          <button v-bind:class="{keepAdd:reveal.keepAddPatent}" v-on:click="keepNewPatent">保存</button>
          <button v-on:click="cancelNewPatent">取消</button>
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
    name:"PatentIndex",
    components:{
      datepicker
    },
    data(){
      return {
        title:"专利",
        reveal:{
          empty:true,//是否显示执业资格信息尚未添加
          openOrPrivacy:[],//信息是否公开显示,通过服务器获取的数据
          openOrPrivacyText:[],//信息是否公开显示,文字切换
          editInfo:[],//是否编辑信息
          addPatent:true,//是否添加信息
          keepAddPatent:true,//添加模式下，保存按钮是否可用
        },
        localPatent:{
          patentName:[],
          info:{
            time:[],
            organ:[]
          }
        },
        newPatent:{
          patentName:"",
          info:{
            time:"",
            organ:""
          }
        }
      }
    },
    mounted(){
      if(this.patent.length!=0){
        Vue.set(this.reveal,"empty",false)//是否显示执业资格信息尚未添加
        for(let i=0;i<this.patent.length;i++){
          /*数据同步本地一份开始*/
          this.localPatent.patentName[i]=this.patent[i].patentName;
          this.localPatent.info.organ[i]=this.patent[i].info.organ;
          this.localPatent.info.time[i]=this.patent[i].info.time;
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
      if(this.patent.length!=0){
        Vue.set(this.reveal,"empty",false)
      }else if(this.patent.length==0){
        Vue.set(this.reveal,"empty",true)//是否显示执业资格信息尚未添加
      }
      /*是否显示执业资格信息尚未添加*/
      if(this.newPatent.patentName.length!=0){
        if(this.newPatent.patentName.trim().length!=0){
          Vue.set(this.reveal,"keepAddPatent",false);//控制保存按钮的背景颜色
          Vue.set(this.newPatent,"patentName",this.newPatent.patentName.trim())//进行必填项的空格去除处理
        }
      }else {
        Vue.set(this.reveal,"keepAddPatent",true);//控制保存按钮的背景颜色
      }
    },
    computed:mapState({
      patent:state=>state.personal.personalMessage.paperAndPatent.patent,
    }),
    methods:{
      openOrPrivacy(index){//信息是否对外公开控制按钮
        Vue.set(this.reveal.openOrPrivacy,[index],!this.reveal.openOrPrivacy[index]);//信息是否对外公开的切换（颜色，和图片切换）
        if(this.reveal.openOrPrivacyText[index]=="显示"){//显示隐藏文字切换
          Vue.set(this.reveal.openOrPrivacyText,[index],"隐藏")
        }else{
          Vue.set(this.reveal.openOrPrivacyText,[index],"显示")
        }

      },
      paperEdit(index){//编辑状态进入按钮
        Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index]);//进入编辑状态
      },
      paperEditKeep(index){//编辑状态，保存按钮
        if(this.localPatent.patentName[index].trim().length!=0){
          Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index])//确认编辑后视图切换回到原来查看页面
          this.patent[index].patentName=this.localPatent.patentName[index];
          this.patent[index].info.time=this.localPatent.info.time[index];
          this.patent[index].info.organ=this.localPatent.info.organ[index];
          /*如果是保存，把数据保存到Vuex中*/
        }
      },
      paperEditCancel(index){//编辑状态，取消按钮
        Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index])//取消编辑后视图切换回到原来查看页面
        this.localPatent.patentName[index]=this.patent[index].patentName;
        this.localPatent.info.organ[index]=this.patent[index].info.organ;
        this.localPatent.info.time[index]=this.patent[index].info.time;

        /*如果是取消编辑，从新从Vuex中得到数据*/
      },
      paperEditDel(index){//编辑状态，删除按钮
        this.patent.splice(index,1);
        this.localPatent.patentName.splice(index,1);
        this.localPatent.info.organ.splice(index,1);
        this.localPatent.info.time.splice(index,1);
      },
      addPatent(){//添加信息按钮，添加信息的视图切换
        Vue.set(this.reveal,"addPatent",false);
        Vue.set(this.reveal,"empty",false);
      },
      keepNewPatent(){//添加模式下的保存
        if(this.newPatent.patentName.length!=0){
          if(this.newPatent.patentName.trim().length!=0){

            this.localPatent.patentName.push(this.newPatent.patentName);
            this.localPatent.info.organ.push(this.newPatent.info.organ);
            this.localPatent.info.time.push(this.newPatent.info.time);
            //同步信息到执业资格首页
            this.patent.push({patentName:this.newPatent.patentName,info:{time:this.newPatent.info.time,profession:"",introduce:"",level:"",organ:this.newPatent.info.organ,}})
            /*同步信息到个人信息首页*/
            Vue.set(this.reveal,"addPatent",true);
            //视图切换到执业资格的首页
            Vue.set(this.newPatent,"patentName","");
            Vue.set(this.newPatent.info,"organ","");
            Vue.set(this.newPatent.info,"time","");
            /*清除数据，保证下次输入时输入框为空*/
            this.reveal.openOrPrivacyText.push("显示")//追加显示隐藏按钮文字
            this.reveal.openOrPrivacy.push(false)//追加显示隐藏按钮状态
          }
        }
      },
      cancelNewPatent(){
        Vue.set(this.reveal,"addPatent",true);
        //视图切换到执业资格的首页
        Vue.set(this.newPatent,"patentName","");
        Vue.set(this.newPatent.info,"organ","");
        Vue.set(this.newPatent.info,"time","");
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
  .patentIndex {
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
    .patentContainer{
      padding:0 20px;
      /*显示编辑信息列表开始*/
      .patentInfo{
        border-bottom:1px solid $borderColor;
        /*信息列表开始*/
        .patentInfoList{
          .patentInfoTitle{
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
          .patentInfoBody{
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
        .patentInfoEdit{
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
    .paperContainer{
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
