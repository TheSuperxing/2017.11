<template>
  <div class="paperIndex">

    <div class="title">
      <h2 v-cloak>{{title}}</h2>
      <p v-on:click="addPaper">添加</p>
    </div>
    <!--personaltitle结束-->
    <div class="paperContainer" v-if="reveal.addPaper">
      <div class="personal-empty" v-if="reveal.empty">（您尚未添加论文信息）</div>
      <!--显示、编辑已存在的信息开始-->
      <div class="paperInfo" v-for="(item,index) in this.paper">
        <!--显示信息列表开始-->
        <div class="paperInfoList" v-if="!reveal.editInfo[index]">
          <div class="paperInfoTitle">
            <h4 v-cloak>{{localPaper.paperName[index]}}</h4>
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
          <div class="paperInfoBody">
            <p v-cloak>{{localPaper.info.organ[index]}}</p>
            <p v-cloak>{{localPaper.info.time[index]}}</p>
          </div>
        </div>
        <!--显示信息列表结束-->
        <!--编辑显示信息列表开始-->
        <div class="paperInfoEdit" v-if="reveal.editInfo[index]">
          <ul>
            <li>带&nbsp;*&nbsp;号为必选项</li>
            <li>
              <label>
                <h5>*&nbsp;论文名称</h5>
                <input v-model="localPaper.paperName[index]" type="text" placeholder="请输入论文名称">
              </label>
            </li>
            <li>
              <label>
                <h5>发表期刊</h5>
                <input v-model="localPaper.info.organ[index]" type="text" placeholder="请输入熟练程度">
              </label>
            </li>
            <li>
              <label>
                <h5>发表时间</h5>
                <!--<input v-model="localPaper.info.time[index]" type="month">-->
                <datepicker v-model="localPaper.info.time[index]"></datepicker>
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
    <div class="paperContainer" v-if="!reveal.addPaper">
      <ul>
        <li>带&nbsp;*&nbsp;号为必选项</li>
        <li>
          <label>
            <h5>*&nbsp;论文名称</h5>
            <input v-model="newPaper.paperName" type="text" placeholder="请输入论文">
          </label>
        </li>
        <li>
          <label>
            <h5>发表期刊</h5>
            <input v-model="newPaper.info.organ" type="text" placeholder="请输入发表期刊">
          </label>
        </li>
        <li>
          <label>
            <h5>发表时间</h5>
            <!--<input v-model="newPaper.info.time" type="month" placeholder="请输入发表时间">-->
            <datepicker v-model="newPaper.info.time"></datepicker>
          </label>
        </li>
        <li>
          <button v-bind:class="{keepAdd:reveal.keepAddPaper}" v-on:click="keepNewPaper">保存</button>
          <button v-on:click="cancelNewPaper">取消</button>
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
    name:"PaperIndex",
    components:{
      datepicker
    },
    data(){
      return {
        title:"论文",
        reveal:{
          empty:true,//是否显示执业资格信息尚未添加
          openOrPrivacy:[],//信息是否公开显示,通过服务器获取的数据
          openOrPrivacyText:[],//信息是否公开显示,文字切换
          editInfo:[],//是否编辑信息
          addPaper:true,//是否添加信息
          keepAddPaper:true,//添加模式下，保存按钮是否可用
        },
        localPaper:{
          paperName:[],
          info:{
            time:[],
            organ:[]
          }
        },
        newPaper:{
          paperName:"",
          info:{
            time:"",
            organ:""
          }
        }
      }
    },
    mounted(){
      if(this.paper.length!=0){
        Vue.set(this.reveal,"empty",false)//是否显示执业资格信息尚未添加
        for(let i=0;i<this.paper.length;i++){
          /*数据同步本地一份开始*/
          this.localPaper.paperName[i]=this.paper[i].paperName;
          this.localPaper.info.organ[i]=this.paper[i].info.organ;
          this.localPaper.info.time[i]=this.paper[i].info.time;
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
      if(this.paper.length!=0){
        Vue.set(this.reveal,"empty",false)
      }else if(this.paper.length==0){
        Vue.set(this.reveal,"empty",true)//是否显示执业资格信息尚未添加
      }
      /*是否显示执业资格信息尚未添加*/
      if(this.newPaper.paperName.length!=0){
        if(this.newPaper.paperName.trim().length!=0){
          Vue.set(this.reveal,"keepAddPaper",false);//控制保存按钮的背景颜色
          Vue.set(this.newPaper,"paperName",this.newPaper.paperName.trim())//进行必填项的空格去除处理
        }
      }else {
        Vue.set(this.reveal,"keepAddPaper",true);//控制保存按钮的背景颜色
      }
    },
    computed:mapState({
      paper:state=>state.personal.personalMessage.paperAndPatent.paper,
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
        if(this.localPaper.paperName[index].trim().length!=0){
          Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index])//确认编辑后视图切换回到原来查看页面
          this.paper[index].paperName=this.localPaper.paperName[index];
          this.paper[index].info.time=this.localPaper.info.time[index];
          this.paper[index].info.organ=this.localPaper.info.organ[index];
          /*如果是保存，把数据保存到Vuex中*/
        }
      },
      paperEditCancel(index){//编辑状态，取消按钮
        Vue.set(this.reveal.editInfo,[index],!this.reveal.editInfo[index])//取消编辑后视图切换回到原来查看页面
        this.localPaper.paperName[index]=this.paper[index].paperName;
        this.localPaper.info.organ[index]=this.paper[index].info.organ;
        this.localPaper.info.time[index]=this.paper[index].info.time;

        /*如果是取消编辑，从新从Vuex中得到数据*/
      },
      paperEditDel(index){//编辑状态，删除按钮
        this.paper.splice(index,1);
        this.localPaper.paperName.splice(index,1);
        this.localPaper.info.organ.splice(index,1);
        this.localPaper.info.time.splice(index,1);
      },
      addPaper(){//添加信息按钮，添加信息的视图切换
        Vue.set(this.reveal,"addPaper",false);
        Vue.set(this.reveal,"empty",false);
      },
      keepNewPaper(){//添加模式下的保存
        if(this.newPaper.paperName.length!=0){
          if(this.newPaper.paperName.trim().length!=0){

            this.localPaper.paperName.push(this.newPaper.paperName);
            this.localPaper.info.organ.push(this.newPaper.info.organ);
            this.localPaper.info.time.push(this.newPaper.info.time);
            //同步信息到执业资格首页
            this.paper.push({paperName:this.newPaper.paperName,info:{time:this.newPaper.info.time,profession:"",introduce:"",level:"",organ:this.newPaper.info.organ,}})
            /*同步信息到个人信息首页*/
            Vue.set(this.reveal,"addPaper",true);
            //视图切换到执业资格的首页
            Vue.set(this.newPaper,"paperName","");
            Vue.set(this.newPaper.info,"organ","");
            Vue.set(this.newPaper.info,"time","");
            /*清除数据，保证下次输入时输入框为空*/
            this.reveal.openOrPrivacyText.push("显示")//追加显示隐藏按钮文字
            this.reveal.openOrPrivacy.push(false)//追加显示隐藏按钮状态
          }
        }
      },
      cancelNewPaper(){
        Vue.set(this.reveal,"addPaper",true);
        //视图切换到执业资格的首页
        //视图切换到执业资格的首页
        Vue.set(this.newPaper,"paperName","");
        Vue.set(this.newPaper.info,"organ","");
        Vue.set(this.newPaper.info,"time","");
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
  .paperIndex {
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
    .paperContainer{
      padding:0 20px;
      /*显示编辑信息列表开始*/
      .paperInfo{
        border-bottom:1px solid $borderColor;
        /*信息列表开始*/
        .paperInfoList{
          .paperInfoTitle{
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
          .paperInfoBody{
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
        .paperInfoEdit{
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
