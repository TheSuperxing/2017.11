<template>

  <div class="personalBasicInfo">

    <!--<div class="basicInfoTitle">
      <div class="basicInfoImg">
        <img v-bind:src="header.imgsrc" alt="">
      </div>
      <p>{{header.titleName}}</p>
    </div>-->
    <div class="basicInfoContainer">
      <div class="bic-title">
        <h2>基础信息</h2>
        <p v-on:click="editBasicInfo" v-if="reveal.edit">编辑</p>
      </div>
      <ul v-if="reveal.edit">
        <li>
          <h5>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</h5>
          <p>{{baseInfo.petName}}</p>

        </li>
        <li>
          <h5>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</h5>
          <p>{{baseInfo.name[0]}}</p>
          <strong v-bind:class="{openOrPrivacy:!reveal.openOrPrivacy[0]}" v-on:click="openOrPrivacy1"></strong>
        </li>
        <li>
          <h5>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</h5>
          <p>{{baseInfo.sex[0]}}</p>
          <strong v-bind:class="{openOrPrivacy:!reveal.openOrPrivacy[1]}" v-on:click="openOrPrivacy2"></strong>
        </li>
        <li>
          <h5>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄：</h5>
          <p>{{baseInfo.age[0]}}</p>
          <strong v-bind:class="{openOrPrivacy:!reveal.openOrPrivacy[2]}" v-on:click="openOrPrivacy3"></strong>
        </li>
        <li>
          <h5>手机号码：</h5>
          <p>{{baseInfo.phone[0]}}</p>
          <strong v-bind:class="{openOrPrivacy:!reveal.openOrPrivacy[3]}" v-on:click="openOrPrivacy4"></strong>
        </li>
        <li>
          <h5>联系邮箱：</h5>
          <p>{{baseInfo.mail[0]}}</p>
          <strong v-bind:class="{openOrPrivacy:!reveal.openOrPrivacy[4]}" v-on:click="openOrPrivacy5"></strong>
        </li>
      </ul>


      <ul v-if="!reveal.edit">
        <li>
          <h5><span>*</span>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</h5>
          <p><input type="text" v-model="localBaseInfo.petName" v-bind:value="localBaseInfo.petName" v-on:input="changePetName"></p>
          <i>{{textLeng.petName}}/30</i>
        </li>
        <li v-if="baseInfo.realName">
          <h5><span>*</span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</h5>
          <p>{{baseInfo.name[0]}}</p>
          <i>{{textLeng.name}}/30</i>
          <span>（进入实名认证流程后，姓名将不可以自行修改，需联系管理员）</span>

        </li>
        <li v-if="!baseInfo.realName">
          <h5><span>*</span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</h5>
          <p><input type="text" v-model="localBaseInfo.name" v-bind:value="localBaseInfo.name" v-on:input="changeName"></p>
          <i>{{textLeng.name}}/30</i>
        </li>
        <li>
          <h5>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</h5>
          <p>
            <button v-bind:class="{selectSex:reveal.selectSex}" v-on:click="selectSexNan">男</button>
            <button v-bind:class="{selectSex:!reveal.selectSex}" v-on:click="selectSexNv">女</button>
          </p>
        </li>
        <li>
          <h5>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄：</h5>
          <p><input type="text" v-model="localBaseInfo.age" v-bind:value="localBaseInfo.age"></p>
        </li>
        <li>
          <h5>手机号码：</h5>
          <p>{{baseInfo.phone[0]}}</p>
          <span>(手机号为当前登录账户，不可自行修改，如需修改登录手机号，请联系管理员)</span>
        </li>
        <li>
          <h5>联系邮箱：</h5>
          <p><input type="text" v-model="localBaseInfo.mail" v-bind:value="localBaseInfo.mail"></p>
        </li>
        <li class="cancelSubmit">
          <button v-on:click="cancelEdit">取消</button>
          <button v-on:click="submitEdit" v-bind:class="{submitBgColor:reveal.submitBgColor}">提交</button>
        </li>
      </ul>
      <div class="realName">
        <div class="realNameTop">
          <h5>实名认证：</h5>
          <p v-if="!localBaseInfo.realName" v-bind:class="{throughRealName:reveal.throughRealName}">（暂未上传认证文件）</p>
          <span v-on:click="addRealName">添加</span>
        </div>
        <div class="realNameMain" v-if="!baseInfo.realName">
          <ul class="addFile" v-if="localBaseInfo.realName">
            <li>
              <button>
                点击上传文件证件
                <input v-on:change="addFile" type="file">
              </button>
              <p>实例</p>
              <div>
                <img src="" alt="">
              </div>
            </li>
            <li>
              <p>请上传本人手持身份证照片一面的免冠近照，支持JPG、PNG,不超过2M</p>
              <p>请确认身份证姓名与您填写的姓名一致，以免影响审核结果</p>
            </li>
          </ul>

        </div>
        <div class="realNameMain" v-if="baseInfo.realName">
          <div class="pass" v-if="localBaseInfo.realName">
            <p>您已通过实名认证</p>
            <p>您可点击“添加”继续上传，不会影响您已上传的实名认证文件</p>
          </div>
          <ul class="addFile" v-if="!localBaseInfo.realName">
            <li>
              <button>
                点击上传文件证件
                <input v-on:change="addFile" type="file">
              </button>
              <p>实例</p>
              <div>
                <img src="" alt="">
              </div>
            </li>
            <li>
              <p>请上传本人手持身份证照片一面的免冠近照，支持JPG、PNG,不超过2M</p>
              <p>请确认身份证姓名与您填写的姓名一致，以免影响审核结果</p>
            </li>
          </ul>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue"
  import {mapState} from "vuex"
  export default {
    name: "personalBasicInfo",
    data: function () {
      return {
        header:{titleName:"个人头像",imgsrc:require("../../../assets/img/personal/basicInfo/basicInfoImg.png")},
        reveal:{
          edit:true,
          selectSex:true,
          throughRealName:"",
          submitBgColor:false,
          realName:"",
          openOrPrivacy:[]
        },
        textLeng:{
          petName:0,
          name:0
        },
        localBaseInfo:{
          petName:"",
          name:"",
          sex:"",
          phone:"",
          age:"",
          mail:"",
          realName:"",
        },

      }

    },
    computed:mapState({
      baseInfo:state=>state.personal.personalMessage.baseInfo,

    }),
    mounted(){
      //console.log(this.baseInfo)

      function emptyText(text) {
        if(text.trim().length==0){
          return "（此处暂时没有消息）";
        }else {
          return text;
        }
      }
      this.baseInfo.petName=emptyText(this.baseInfo.petName);
      this.baseInfo.name[0]=emptyText(this.baseInfo.name[0]);
      this.baseInfo.sex[0]=emptyText(this.baseInfo.sex[0]);
      this.baseInfo.age[0]=emptyText(this.baseInfo.age[0]);
      this.baseInfo.mail[0]=emptyText(this.baseInfo.mail[0]);
      //如果得到的数据为空，进行暂没有消息处理

      this.localBaseInfo.petName=this.baseInfo.petName;
      this.localBaseInfo.name=this.baseInfo.name[0];
      this.localBaseInfo.sex=this.baseInfo.sex[0];
      this.localBaseInfo.age=this.baseInfo.age[0];
      this.localBaseInfo.mail=this.baseInfo.mail[0];
      this.localBaseInfo.realName=this.baseInfo.realName;
      /*从store获取数据初始话本地数据，保证在修改数据的时候不会改变store中的原始数据，只有当提交修改数据的时候store的值再进行修改*/


      if(this.localBaseInfo.sex.trim().length==0){
        Vue.set(this.reveal,'selectSex',true);
      }else if(this.localBaseInfo.sex.trim()=="女"){
        Vue.set(this.reveal,'selectSex',false);
      }else if(this.localBaseInfo.sex.trim()=="男"){
        Vue.set(this.reveal,'selectSex',true);
      }
      /*设置性别的初始勾选状态*/
      if(this.baseInfo.realName){
        this.reveal.throughRealName=true;
      }

      /*0-name 1-sex 2-age 3-phone 4-mail*/
      this.reveal.openOrPrivacy.push(this.baseInfo.name[1])
      this.reveal.openOrPrivacy.push(this.baseInfo.sex[1])
      this.reveal.openOrPrivacy.push(this.baseInfo.age[1])
      this.reveal.openOrPrivacy.push(this.baseInfo.phone[1])
      this.reveal.openOrPrivacy.push(this.baseInfo.mail[1])
      /*初始化openOrPrivacy*/

    },
    methods:{
      editBasicInfo(){//编辑进入编辑状态
        Vue.set(this.reveal,"edit",false);
        function emptyText(text) {
          if(text=="（此处暂时没有消息）"){
            return "";

          }else {
            return text;
          }
        }
        this.localBaseInfo.petName=emptyText(this.baseInfo.petName);
        this.localBaseInfo.name=emptyText(this.baseInfo.name[0]);
        this.localBaseInfo.sex=emptyText(this.baseInfo.sex[0]);
        this.localBaseInfo.age=emptyText(this.baseInfo.age[0]);
        this.localBaseInfo.mail=emptyText(this.baseInfo.mail[0]);
        /*进入编辑状态之前的数据处理*/
        if(this.localBaseInfo.petName.trim().length!=0&&this.localBaseInfo.name.trim().length!=0){
          Vue.set(this.reveal,"submitBgColor",true)
        }else {
          Vue.set(this.reveal,"submitBgColor",false)
        }
        /*只有昵称和名字同时有值时保存按钮才是点亮状态*/
        Vue.set(this.textLeng,"petName",this.localBaseInfo.petName.length);
        Vue.set(this.textLeng,"name",this.localBaseInfo.name.length);
        /*对计算input框中的字符长度进行初始化*/
      },
      /*处于编辑状态时如果没有信息为空*/
      changePetName(){//编辑状态，修改昵称
        Vue.set(this.textLeng,"petName",this.localBaseInfo.petName.trim().length)
        if(this.localBaseInfo.petName.trim().length>=30){
          this.localBaseInfo.petName=this.localBaseInfo.petName.trim().slice(0,30)
          Vue.set(this.textLeng,"petName",30)
        }
        //设置字符串计数
        if(this.localBaseInfo.petName.trim().length!=0&&this.localBaseInfo.name.trim().length!=0){
          Vue.set(this.reveal,"submitBgColor",true)
        }else {
          Vue.set(this.reveal,"submitBgColor",false)
        }
        /*只有昵称和名字同时有值时保存按钮才是点亮状态*/
      },
      /*input字符长度显示*/
      changeName(){//编辑状态修改名字
        Vue.set(this.textLeng,"name",this.localBaseInfo.name.trim().length)
        if(this.localBaseInfo.name.trim().length>=30){
          this.localBaseInfo.name=this.localBaseInfo.name.trim().slice(0,30)
          Vue.set(this.textLeng,"name",30)
        }
        //设置字符串计数
        if(this.localBaseInfo.petName.trim().length!=0&&this.localBaseInfo.name.trim().length!=0){
          Vue.set(this.reveal,"submitBgColor",true)
        }else {
          Vue.set(this.reveal,"submitBgColor",false)
        }
        /*只有昵称和名字同时有值时保存按钮才是点亮状态*/
      },
      /*改变名字和昵称 控制30字符*/
      selectSexNan(){//编辑状态修改性别为男
        Vue.set(this.localBaseInfo,"sex","男");
        Vue.set(this.reveal,'selectSex',true);
      },
      selectSexNv(){//编辑状态修改性别为女
        Vue.set(this.localBaseInfo,"sex","女");
        Vue.set(this.reveal,'selectSex',false);
      },
      /*性别选择*/
      cancelEdit(){//从编辑状态退出
        Vue.set(this.reveal,"edit",true)
      },
      addFile(){
        console.log("ok")
      },
      submitEdit(){//保存编辑
        function emptyText(text) {
          if(text.trim().length==0){
            return "（此处暂时没有消息）";
          }else {
            return text;
          }
        }
        /*没有数据输入的处理函数*/
        if(this.localBaseInfo.petName.trim().length!=0&&this.localBaseInfo.name.trim().length!=0){
          Vue.set(this.reveal,"edit",true)
          /*只有当昵称，和名字不为空的时候，保存按钮才可用*/
          this.baseInfo.petName=this.localBaseInfo.petName;
          this.baseInfo.name[0]=this.localBaseInfo.name;
          /*昵称和名字必须要输入内容，不需要为空处理*/
          this.baseInfo.sex[0]=this.localBaseInfo.sex;
          /*性别是单选项，不需要为空处理*/
          this.baseInfo.age[0]=emptyText(this.localBaseInfo.age);
          this.baseInfo.mail[0]=emptyText(this.localBaseInfo.mail);
          /*数据为空处理*/
        }else {
          Vue.set(this.reveal,"edit",false)
          /*只有当昵称，和名字不为空的时候，保存按钮才可用*/
        }
      },
      /*提交和取消按钮*/
      addRealName(){//实名认证
        //console.log(this.localBaseInfo.realName)
        //if(this.baseInfo.realName=="false"){
          Vue.set(this.localBaseInfo,"realName",!this.localBaseInfo.realName);
          //console.log(Boolean(this.localBaseInfo.realName))
        //}
        //this.localBaseInfo.realName=true;

      },
      /*0-name 1-sex 2-age 3-phone 4-mail*/
      openOrPrivacy1(){
        Vue.set(this.reveal.openOrPrivacy,[0],!this.reveal.openOrPrivacy[0])
        this.baseInfo.name[1]=this.reveal.openOrPrivacy[0];
      },
      openOrPrivacy2(){
        Vue.set(this.reveal.openOrPrivacy,[1],!this.reveal.openOrPrivacy[1])
        this.baseInfo.sex[1]=this.reveal.openOrPrivacy[1];
      },
      openOrPrivacy3(){
        Vue.set(this.reveal.openOrPrivacy,[2],!this.reveal.openOrPrivacy[2])
        this.baseInfo.age[1]=this.reveal.openOrPrivacy[2];
      },
      openOrPrivacy4(){
        Vue.set(this.reveal.openOrPrivacy,[3],!this.reveal.openOrPrivacy[3])
        this.baseInfo.phone[1]=this.reveal.openOrPrivacy[3];
      },
      openOrPrivacy5(){
        Vue.set(this.reveal.openOrPrivacy,[4],!this.reveal.openOrPrivacy[4])
        this.baseInfo.mail[1]=this.reveal.openOrPrivacy[4];
      },
    },



  }
</script>
<style lang="scss" scoped>
  $bfColor:#ffffff;
  $activeColor: #f27519;
  $borderColor:#ebebeb;
  $emptyColor:#9c9c9c;
  $themeColor:rgb(242,117,25);
  $textColor:rgb(72,72,72);
  $hColor:rgb(35,35,35);
  .personalBasicInfo{
    float: left;
    width:940px;
    float: left;
    padding:0 40px;
    background: $bfColor;
    min-height: 671px;
    color: $textColor;
    .basicInfoTitle{
      padding:42px 0;
      border-bottom:1px solid $borderColor;
      
      .basicInfoImg{
        width:113px;
        height:113px;
        border-radius: 50%;
        background: #cccccc;
        float:left;
      }
      p{
        margin-left:21px;
        font-size:16px;
        padding:4px 0 2px 0;
        float: left;
      }
    }
    .basicInfoContainer{
      .bic-title{
        padding:28px 0 0 0;
        font-size: 18px;
        color: $activeColor;
        border-bottom: 1px solid $borderColor;
        h2{
          float: left;
          border-bottom:2px solid $themeColor;
          height:36px;
          margin-bottom: -1px;
        }
        P{
          color: $textColor;
          cursor: pointer;
          float: right;
          font-size: 14px;
          padding-right:32px;
          padding-left:32px;
          position: relative;
          bottom: -5px;
          background: url("../../../assets/img/personal/basicInfo/edit.png") left center no-repeat;
        }
      }
      ul{
        padding-left:20px;
        padding-top:31px;
        padding-bottom:15px;
        border-bottom:2px solid $borderColor;
        color: $hColor;
        li{
          margin-bottom:12px;
          h5{
            float: left;
            padding-left:25px;
            width:95px;
            text-align: right;
            span{
              color: $themeColor;
              float: left;
            }
          }
          p{
            float: left;
            margin-left:19px;
            color: $textColor;
            font-size:12px;
            line-height: 21px;
          }
          input{
            border:1px solid $borderColor;
            padding-left:10px;
            font-size: 12px;
            line-height: 19px;
          }
          i{
            margin-left:30px;
            float: left;
          }
          strong{
            float: right;
            margin-right:50px;
            width: 25px;
            height: 14px;
            background: url("../../../assets/img/personal/basicInfo/icon_available.png") left center no-repeat;
          }
          .openOrPrivacy{
            background: url("../../../assets/img/personal/basicInfo/hidden.png") left center no-repeat;
          }

        }
        li:nth-child(1){
          h5{
            background: url("../../../assets/img/personal/basicInfo/pet_name.png") left center no-repeat;
            span{
              float: left;
              height:21px;
              overflow: hidden;
              line-height: 26px;
              margin-left:-8px;
            }
          }
          input{
            width:384px;
          }
          i{
            float: right;
            margin-right:50px;
          }

        }
        li:nth-child(2){
          h5{
            background: url("../../../assets/img/personal/basicInfo/name.png") left center no-repeat;
            span{
              float: left;
              height:21px;
              overflow: hidden;
              line-height: 26px;
              margin-left:-8px;
            }
          }
          span{
            float: right;
            color: $themeColor;
          }
          i{
            float: right;
            margin-right:50px;
          }
          input{
            width:384px;
          }
        }
        li:nth-child(3){
          h5{
            background: url("../../../assets/img/personal/basicInfo/sex.png") left center no-repeat;
          }
          button{
            border: 0;
            padding:0 12px;
            color: #ffffff;
            background: #a4a4a4;
            cursor: pointer;
          }
          .selectSex{
            background: $themeColor;
          }
        }
        li:nth-child(4){
          h5{
            background: url("../../../assets/img/personal/basicInfo/icon_ages.png") left center no-repeat;
          }
        }
        li:nth-child(5){
          h5{
            background: url("../../../assets/img/personal/basicInfo/phone.png") 3px center no-repeat;
          }
          span{
            float: left;
            margin-left: 10px;
            color: $themeColor;
          }
        }
        li:nth-child(6){
          h5{
            background: url("../../../assets/img/personal/basicInfo/icon_mail.png") left center no-repeat;
          }
        }
        .cancelSubmit{
          margin:30px 0 15px 277px;
          button{
            cursor: pointer;
            height: 33px;
            width: 117px;
            background: #FFF;
            border:1px solid #f27519;
            border-radius: 5px;
            float: left;
            color: #f27519;
            margin-right:30px;
            background: url("../../../assets/img/personal/education/btn_save_disabled.png.png");
          }
          button:nth-child(1){
            background: #ffffff;
          }
          button:nth-child(2){
            border:0;
            color: #FFF;
          }
          .submitBgColor{
            background: url("../../../assets/img/personal/education/btn_save_normal.png.png");
          }
        }
      }
      .realName{
        padding-left:20px;
        padding-top:30px;
        .realNameTop{
          h5{
            color: #4a4a4a;
            float: left;
            padding-left:25px;
            background: url("../../../assets/img/personal/basicInfo/icon_confirm.png") left center no-repeat;
            color: $hColor;
          }
          p{
            color: #727272;
            float: left;
            margin-left:19px;
          }
          .throughRealName{
            display: none;
          }
          span{
            cursor: pointer;
            float:right;
            padding:0 32px;
            background: url("../../../assets/img/personal/basicInfo/edit.png") left center no-repeat;
            margin-top:-4px;
          }
        }
        .realNameMain{
          padding-left:26px;
          .pass{
            padding-top:12px;
            color: #727272;
            p{
              margin-bottom:3px;
            }
          }
          .addFile{
            padding:0;
            border: 0;
            li:nth-child(1){
              button{
                float: left;
                position: relative;
                overflow: hidden;
                border: 0;
                background: $bfColor;
                margin-top:25px;
                cursor: pointer;
                input{
                  position: absolute;
                  top: 0;
                  left: 0;
                  opacity: 0;
                }
              }
              p{
                float: left;
                margin-top:25px;
                padding-left:42px;
              }
              div{
                margin-left:20px;
                float: left;
                width:76px;
                height:42px;
                background: $themeColor;
              }
            }
            li:nth-child(2){
              p{
                color: #f38b4d;
                font-size:12px;
                float: none;
                margin:0;
              }
            }

          }
        }
      }
    }
  }

</style>
