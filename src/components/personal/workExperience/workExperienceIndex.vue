<template>
  <div class="workExperienceIndex">
    <div id="modal-overlay">
      <div class="alert">
        对不起，请您先至“基础信息”菜单完善姓名信息才可添加工作经历
        <button v-on:click="closeAlert"></button>
      </div>
    </div>
    <!--如果信息没有补全，补全信息提示-->

    <!--公司名称搜索开始-->
    <div id="modal-overlay2">
      <div class="alert">
        <div class="modal-title">
          <h6>搜索公司</h6>
          <button v-on:click="closeAlert2"></button>
        </div>
        <ul class="modal-container" v-bind:class="{ modalContainerShow : reveal.modal,modalContainerEmpty: !reveal.modal}">
          <li v-bind:class="{beforeSearch:!reveal.searchShow}">
            <h6>公司名称</h6>
            <input v-model="input.value" type="text" placeholder="请输入公司名称">
            <button  v-on:click="search">
              <img src="../../../assets/img/personal/workexperience/icon.search.png" alt="">
              <p>搜索</p>
            </button>
          </li>
          <li v-if="reveal.searchShow">
            <h6>搜索结果</h6>
            <p v-if="!reveal.modal">抱歉，未找到该公司，请从新搜索</p>
            <div v-if="reveal.modal">
              <p v-for="(item,index) in num" v-on:click="selectCompanyName(index)">
                <span>{{item}}</span>
                <i v-bind:class="{iSelectActive:reveal.iSelectActive[index]}"></i>
              </p>
            </div>
          </li>
          <li v-if="reveal.searchShow" v-on:click="customCompanyName">
            自定义添加公司
          </li>
          <li v-if="reveal.searchShow">
            <button v-on:click="confirm">确认</button>
          </li>
        </ul>
      </div>
    </div>
    <!--公司名称搜索结束-->

    <div class="title">
      <h2 v-cloak>{{title}}</h2>
      <p v-on:click="addInfo">添加</p>
    </div>
    <!--workExpContainer开始-->
    <div class="workExpContainer">
      <div class="personal-empty" v-if="reveal.empty">（您尚未添加教育背景信息）</div>
        <!--信息为空 时提示信息-->
      <div class="workExpInfo" v-if="reveal.addOrShow">
        <div v-for="(item,index) in workExperience" class="workExpInfoContainer">
          <div v-if="reveal.editInfo[index]">
            <h4 v-cloak>{{localWorkExperience.companyName[index]}}</h4>
            <ul>
              <li v-bind:class="{openOrPrivacy:!reveal.openOrPrivacy[index]}" v-on:click="openOrPrivacy(index)">{{reveal.openOrPrivacyText[index]}}</li>
              <li v-on:click="editInfo(index)">编辑</li>
              <li v-on:click="deleteInfo(index)">删除</li>
            </ul>
          </div>
          <!--头部信息-->
          <div v-if="reveal.editInfo[index]">
            <p>
              <span>{{item.info.timeStart}}</span>
              <span>——</span>
              <span>{{item.info.timeEnd}}</span>
            </p>
            <!--时间部分-->
            <p>{{localWorkExperience.info.profession[index]}}</p>
            <p>{{localWorkExperience.info.introduce[index]}}</p>
          </div>
          <!--显示存在信息-->
          <!--编辑工作经历-->
          <ul v-if="!reveal.editInfo[index]">
            <li>
              <h5>公司名称</h5>
              <p v-if="reveal.editDetailInfo[index]">{{localWorkExperience.companyName[index]}}</p>
              <input v-if="!reveal.editDetailInfo[index]" type="text" v-model="localWorkExperience.companyName[index]" placeholder="请输入公司名称">
            </li>
            <li  v-if="!reveal.editDetailInfo[index]" class="companyAddress">
              <h5>公司地址</h5>
              <input type="text" v-model="localWorkExperience.companyDetailInfo[index]" placeholder="请输入公司地址">
            </li>
            <li>
              <h5>任职职位</h5>
              <input type="text" v-model="localWorkExperience.info.profession[index]" v-bind:value="localWorkExperience.info.profession[index]">
            </li>
            <li>
              <h5>任职时间</h5>
              <datepicker v-model="localWorkExperience.info.timeStart[index]"></datepicker>
              <span></span>
              <datepicker v-model="localWorkExperience.info.timeEnd[index]"></datepicker>
            </li>
            <li class="textArea">
              <h5>职位描述</h5>
              <textarea v-model="localWorkExperience.info.introduce[index]" v-bind:value="localWorkExperience.info.introduce[index]" cols="66" rows="6" v-on:input="textLength(index)"></textarea>
              <i>{{reveal.textLength[index]}}/500</i>
            </li>
            <li>
              <button v-on:click="keepEdit(index)">保存</button>
              <button v-on:click="cancelEdit(index)">取消</button>
            </li>
          </ul>
          <!--编辑个人职位信息-->
        </div>
      </div>
      <!--服务器获取的数据的展示-->
      <!--添加工作经历（默认情况）开始-->

      <!--添加工作经历（默认情况）-->

      <ul class="addWorkExp" v-if="!reveal.addOrShow">
        <li>
          <h5>*&nbsp;公司名称</h5>
          <p v-if="reveal.customCompanyName">{{newWorkExperience.companyName}}</p>
          <input v-if="!reveal.customCompanyName" type="text" placeholder="请输入公司名称" v-model="newWorkExperience.companyName">

        </li>
        <li v-if="!reveal.customCompanyName">
          <h5>公司地址</h5>
          <input v-model="newWorkExperience.companyDetailInfo" type="text" placeholder="请输入公司地址">
        </li>
        <li>
          <h5>任职职位</h5>
          <input v-model="newWorkExperience.info.profession" type="text" placeholder="请输入职位名称">
        </li>
        <li>
          <h5>任职时间</h5>
          <datepicker v-model="newWorkExperience.info.timeStart"></datepicker>
          <span></span>
          <datepicker v-model="newWorkExperience.info.timeEnd"></datepicker>
        </li>
        <li>
          <h5>职位描述</h5>
          <textarea v-model="newWorkExperience.info.introduce" cols="66" rows="6" v-on:input="newTextLength"></textarea>
          <i>{{reveal.newTextLength}}/500</i>
        </li>
        <li>
          <button v-on:click="keepAdd" v-bind:class="{keepAdd:reveal.keepAdd}">保存</button>
          <button v-on:click="cancelAdd">取消</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Vue from "vue"
  import ModalOpp from "../../../assets/js/modalOpp"
  import {mapState} from "vuex"
  import datepicker from "../../units/Datepicker.vue"
  export default {
    name:"workExperienceIndex",
    components:{
      datepicker
    },
    data(){
      return {
        title:"工作经历",
        num:["1","2","3"],
        input:{value:""},//搜索公司时，自己输入的公司名称
        companyName:{name:''},//用来存放选择公司的索引
        reveal:{
          empty:true,//信息为空时，为空信息提示
          editInfo:[],//编辑信息的状态切换
          editDetailInfo:[],//搜索添加的公司不能编辑，自己添加的公司能够编辑
          textLength:[],//文本长度的计算
          newTextLength:0,//添加信息的文本长度计算
          addOrShow:true,//添加和显示视图的切换
          modal:false,//搜索公司的，样式控制
          searchShow:false,//搜索公司搜索结果控制
          iSelectActive:[],//搜索公司搜索结果的选定
          openOrPrivacy:[],//信息是否对外显示，样式控制
          openOrPrivacyText:[],//信息是否对外显示文本控制
          keepAdd:false,//添加保存按钮是否可用，样式控制
          customCompanyName:true,//是否自定义公司名称
        },
        localWorkExperience:{
          companyName:[],
          companyDetailInfo:[],
          info:{
            timeStart:[],
            timeEnd:[],
            profession:[],
            introduce:[]
          }
        },
        newWorkExperience:{
          companyName:"",
          companyDetailInfo:"",
          info:{
            timeStart:"",
            timeEnd:"",
            profession:"",
            introduce:""
          }
        }
      }
    },
    computed:mapState({
      workExperience:state=>state.personal.personalMessage.workExperience,
      /*从Vuex中获取workExperience信息*/
      baseInfoName:state=>state.personal.personalMessage.baseInfo.name[0]
    }),
    /*获取基础信息中的姓名信息*/
    mounted(){
      if(this.baseInfoName.length==0||this.baseInfoName=="（此处暂时没有消息）"){
        var modeal= new ModalOpp("#modal-overlay");
        modeal.makeText();
      }
      /*如果姓名信息为空就会出现提示框*/
      if(this.workExperience.length!=0){
        Vue.set(this.reveal,"empty",false)
        /*通过判断是否显示信息为空提示*/
        for(var i=0;i<this.workExperience.length;i++){
          this.localWorkExperience.companyName[i]=this.workExperience[i].companyName;
          this.localWorkExperience.info.timeStart[i]=this.workExperience[i].info.timeStart;
          this.localWorkExperience.info.timeEnd[i]=this.workExperience[i].info.timeEnd;
          this.localWorkExperience.info.introduce[i]=this.workExperience[i].info.introduce;
          this.localWorkExperience.info.profession[i]=this.workExperience[i].info.profession;
          /*把Vuex的数据同步到这个对象本地属性上*/
          if(!this.workExperience[i].companyDetailInfo){
            this.localWorkExperience.companyDetailInfo.push("")
            Vue.set(this.reveal.editDetailInfo,[i],true)
          }else {
            this.localWorkExperience.companyDetailInfo.push(this.workExperience[i].companyDetailInfo.ads);
            Vue.set(this.reveal.editDetailInfo,[i],false)
          }
          /*初始化是否能够编辑公司详细信息*/

          this.reveal.editInfo.push(true);
          /*对每一个循环列表编辑状态赋初始状态值*/
          this.reveal.openOrPrivacy.push(true);
          this.reveal.openOrPrivacyText.push("显示");
          /*对每一个循环列表的对外显示赋初始值*/
          if(this.localWorkExperience.info.introduce[i].length==0){
            this.reveal.textLength.push(0);
          }else {
            this.reveal.textLength.push(this.localWorkExperience.info.introduce[i].length);
          }
          /*初始化文本计数*/

        }

      }else {
        Vue.set(this.reveal,"empty",true)
        /*判断是否显示信息为空提示*/
      }
    },
    updated(){
      if(this.newWorkExperience.companyName.trim().length!=0){
        Vue.set(this.reveal,"keepAdd",true)//设置保存按钮样式可用状态
      }else{
        Vue.set(this.reveal,"keepAdd",false)//设置保存按钮样式可用状态
      }
    },
    methods:{
      closeAlert(){
        var modal= new ModalOpp("#modal-overlay");
        modal.closeModal();
      },
      closeAlert2(){
        var modal2= new ModalOpp("#modal-overlay2");
        modal2.closeModal();
        Vue.set(this.reveal,"modal",false)
        Vue.set(this.reveal,"searchShow",false)//搜索恢复没有显示状态
        Vue.set(this.input,"value","")//每次关闭选择公司信息后都会把输入要搜索的公司的信息清空
        Vue.set(this.reveal,"addOrShow",true);//添加按钮视图切换
      },
      /*关闭提示框但不会调整到基础信息*/
      openOrPrivacy(index){//显示隐藏按钮，通过这个按钮可以控制显示到别人查看信息页的信息
        Vue.set(this.reveal.openOrPrivacy,[index],!this.reveal.openOrPrivacy[index])
        if(this.reveal.openOrPrivacyText[index]=="显示"){
          Vue.set(this.reveal.openOrPrivacyText,[index],"隐藏")
        }else {
          Vue.set(this.reveal.openOrPrivacyText,[index],"显示")
        }
      },
      editInfo(index){//编辑按钮单击事件，进入编辑状态
        Vue.set(this.reveal.editInfo,[index],false);
      },
      cancelEdit(index){//编辑状态取消按钮的单击事件，取消编辑状态，回到显示状态
        Vue.set(this.reveal.editInfo,[index],true);//取消编辑的视图切换
        this.localWorkExperience.companyName[index]=this.workExperience[index].companyName;
        this.localWorkExperience.info.timeStart[index]=this.workExperience[index].info.timeStart;
        this.localWorkExperience.info.timeEnd[index]=this.workExperience[index].info.timeEnd;
        this.localWorkExperience.info.introduce[index]=this.workExperience[index].info.introduce;
        this.localWorkExperience.info.profession[index]=this.workExperience[index].info.profession;
        /*取消编辑，要把数据更新到和Vuex同步*/
        if(this.workExperience[index].companyDetailInfo){
          this.localWorkExperience.companyDetailInfo[index]=this.workExperience[index].companyDetailInfo.ads;
        }
        /*取消编辑后，把数据和vuex同步*/
      },
      textLength(index){//编辑状态下记录输入多行文本的字数
        if(this.localWorkExperience.info.introduce[index].trim().length<=500){
          Vue.set(this.reveal.textLength,[index],this.localWorkExperience.info.introduce[index].trim().length)
        }else{
          this.localWorkExperience.info.introduce[index]=this.localWorkExperience.info.introduce[index].trim().slice(0,499);
          Vue.set(this.reveal.textLength,[index],500)
        }
      },
      keepEdit(index){//编辑状态下的保存按钮
       /*var judgUpDate=this.localWorkExperience.companyName[index]==this.workExperience[index].companyName&&this.localWorkExperience.info.timeStart[index]==this.workExperience[index].info.timeStart&&this.localWorkExperience.info.timeEnd[index]==this.workExperience[index].info.timeEnd&&this.localWorkExperience.info.introduce[index]==this.workExperience[index].info.introduce&&this.localWorkExperience.info.profession[index]==this.workExperience[index].info.profession;
        if(judgUpDate){
          alert("没有更改的信息，你可以取消编辑");
        }else {

        }*///判断数据是否更新
        this.workExperience[index].companyName=this.localWorkExperience.companyName[index];
        this.workExperience[index].info.timeStart=this.localWorkExperience.info.timeStart[index];
        this.workExperience[index].info.timeEnd=this.localWorkExperience.info.timeEnd[index];
        this.workExperience[index].info.introduce=this.localWorkExperience.info.introduce[index];
        this.workExperience[index].info.profession=this.localWorkExperience.info.profession[index];
        /*信息更新到vuex*/

        if(this.workExperience[index].companyDetailInfo){
          this.workExperience[index].companyDetailInfo.ads=this.localWorkExperience.companyDetailInfo[index];
        }
        /*保存编辑后，数据同步到vuex*/
        Vue.set(this.reveal.editInfo,[index],true);
        /*视图的切换*/
      },
      deleteInfo(index){//删除显示信息
        this.localWorkExperience.companyName.splice(index,1)
        this.localWorkExperience.info.timeStart.splice(index,1)
        this.localWorkExperience.info.timeEnd.splice(index,1)
        this.localWorkExperience.info.introduce.splice(index,1)
        this.localWorkExperience.info.profession.splice(index,1)
        /*对本数据尽心一次更新，同步到当前展示页*/
        this.workExperience.splice(index,1);

        if(this.workExperience.length==0){
          Vue.set(this.reveal,"empty",true)
        }
      },
      addInfo(){//添加信息
        var model2= new ModalOpp("#modal-overlay2");
        model2.makeText();
        Vue.set(this.reveal,"addOrShow",false);//添加按钮视图切换
        Vue.set(this.reveal,"empty",false);
        Vue.set(this.reveal,"customCompanyName",true);//切换到只能在已有库中挑选公司
      },
      search(){//公司名称的搜索,单击时可能出现公司名称列表
        if(this.input.value!=0){
          Vue.set(this.reveal,"searchShow",true)//点击搜索按钮后，展示搜索结果

          if(this.num.length!=0){
            Vue.set(this.reveal,"modal",true)
          }else {
            Vue.set(this.reveal,"modal",false)
          }
        }

        for(var i= 0 ; i< this.num.length;i++){/*给每一个搜索出的公司的列表添加一个状态*/
          this.reveal.iSelectActive.push(false);
        }
      },
      customCompanyName(){//自定义公司
        Vue.set(this.reveal,"customCompanyName",false);//切换到能自定义公司数据
        var modal2= new ModalOpp("#modal-overlay2");
        modal2.closeModal();
        /*关闭搜索公司的弹框*/
        Vue.set(this.reveal,"searchShow",false)//搜索恢复没有显示状态
        Vue.set(this.input,"value","")//选择自定义公司后会把输入要搜索的公司的信息清空
      },
      selectCompanyName(index){//在弹出的公司列表里挑选公司名称
        Vue.set(this.companyName,"name",this.num[index]);

        for(var i= 0 ; i< this.num.length;i++){/*在每一次单击后对搜索出的列表状态进行初始化*/
          Vue.set(this.reveal.iSelectActive,[i],false)
        }
        Vue.set(this.reveal.iSelectActive,[index],true);
      },
      confirm(){//确认保存公司名称
       if(this.num.length!=0){//如果搜索结果不为空，确认按钮才能用
         Vue.set(this.newWorkExperience,"companyName",this.companyName.name);
         var modal2= new ModalOpp("#modal-overlay2");
         modal2.closeModal();
         Vue.set(this.reveal,"modal",false);
         Vue.set(this.reveal,"keepAdd",true);//设置保存按钮的颜色

         Vue.set(this.reveal,"searchShow",false)//搜索恢复没有显示状态
         Vue.set(this.input,"value","")//每次确认选择公司信息后都会把输入要搜索的公司的信息清空
       }
      },
      newTextLength(){//添加模式下，计算多行文本框的字符个数
        Vue.set(this.reveal,"newTextLength",this.newWorkExperience.info.introduce.length);
        if(this.newWorkExperience.info.introduce.trim().length>500){
          this.newWorkExperience.info.introduce=this.newWorkExperience.info.introduce.trim().slice(0,499);
        }
      },
      keepAdd(){//添加模式下，确认添加按钮
        if(this.newWorkExperience.companyName.length!=0){//保证公司信息不为空才能进行操作
          this.localWorkExperience.companyName.push(this.newWorkExperience.companyName);
          this.localWorkExperience.info.timeStart.push(this.newWorkExperience.info.timeStart);
          this.localWorkExperience.info.timeEnd.push(this.newWorkExperience.info.timeEnd);
          this.localWorkExperience.info.profession.push(this.newWorkExperience.info.profession);
          this.localWorkExperience.info.introduce.push(this.newWorkExperience.info.introduce);
          if(!this.reveal.customCompanyName){//自定义公司提交数据
            this.reveal.editDetailInfo.push(false);
            this.workExperience.push({companyName:this.newWorkExperience.companyName,companyDetailInfo:{ads:this.newWorkExperience.companyDetailInfo},info:{timeStart:this.newWorkExperience.info.timeStart,timeEnd:this.newWorkExperience.info.timeEnd,profession:this.newWorkExperience.info.profession,introduce:this.newWorkExperience.info.introduce}},)//把添加的信息同步到personal-store，这条信息会更新到首页

          }else {//挑选公司提交数据
            this.newWorkExperience.companyDetailInfo=false;
            this.reveal.editDetailInfo.push(true);
            this.workExperience.push({companyName:this.newWorkExperience.companyName,companyDetailInfo:this.newWorkExperience.companyDetailInfo,info:{timeStart:this.newWorkExperience.info.timeStart,timeEnd:this.newWorkExperience.info.timeEnd,profession:this.newWorkExperience.info.profession,introduce:this.newWorkExperience.info.introduce}},)//把添加的信息同步到personal-store，这条信息会更新到首页

          }
          this.localWorkExperience.companyDetailInfo.push(this.newWorkExperience.companyDetailInfo);
          console.log(this.localWorkExperience.companyDetailInfo)
          //公司详细信息
          //把添加的信息同步到本地显示列表一份,这条信息会更新到工作经历首页

          this.reveal.editInfo.push(true);//在是否编辑的状态里添加一条新的状态
          this.reveal.openOrPrivacy.push(true);//在是否让他人查看添加一条新的信息
          this.reveal.openOrPrivacyText.push("显示");//在是否让他人查看添加一条新的信息
          this.reveal.textLength.push(this.newWorkExperience.info.introduce.trim().length);//编辑状态文本框计数添加信息
          Vue.set(this.reveal,"addOrShow",true)//切换到显示信息页
          Vue.set(this.newWorkExperience,"companyName","")
          Vue.set(this.newWorkExperience.info,"timeStart","")
          Vue.set(this.newWorkExperience.info,"timeEnd","")
          Vue.set(this.newWorkExperience.info,"profession","")
          Vue.set(this.newWorkExperience.info,"introduce","")
          /*确定添加后信息的清除*/

        }

      },
      cancelAdd(){
        Vue.set(this.reveal,"addOrShow",true)//切换到显示信息页
        if(this.workExperience.length==0){//公司名称为必填项，可以用作是否信息为空的判断标准
          Vue.set(this.reveal,"empty",true)
        }else{
          Vue.set(this.reveal,"empty",false)
        }

        Vue.set(this.reveal,"addOrShow",true)//切换到显示信息页
        Vue.set(this.newWorkExperience,"companyName","")
        Vue.set(this.newWorkExperience.info,"timeStart","")
        Vue.set(this.newWorkExperience.info,"timeEnd","")
        Vue.set(this.newWorkExperience.info,"profession","")
        Vue.set(this.newWorkExperience.info,"introduce","")
        /*取消添加后信息的清除*/
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
  $textColor:rgb(72,72,72);
  $hColor:rgb(35,35,35);
  .workExperienceIndex{
    float: left;
    width:940px;
    float: left;
    padding:0 40px;
    background: $bfColor;
    min-height: 671px;
    color: $textColor;
    button{
      cursor: pointer;
    }
    textarea{
      padding:10px;
    }
    #modal-overlay{
      .alert{
        width: 500px;
        overflow: hidden!important;
        position:absolute;top:50%;left:50%;
        transform:translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        -moz-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        -o-transform:translate(-50%,-50%);
        background: #FFFFFF;
        border-radius: 10px;
        text-align: center;
        font-size: 16px;
        line-height: 26px;
        padding-top: 134px;
        padding-bottom: 141px;
        padding-left:44px;
        padding-right:44px;
        color: #f27519;
        button{
          width: 20px;
          height:20px;
          position: absolute;
          top: 20px;
          right:20px;
          background: url("../../../assets/img/personal/workexperience/icon_close.png") left center no-repeat;
          border:0;

        }
      }
    }
    /*补全信息弹出框*/
    #modal-overlay2{
      .alert {
        width: 549px;
        overflow: hidden;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        background: #FFFFFF;
        border-radius: 10px;
        text-align: center;
        color: #f27519;
        .modal-title{
          background: rgb(247,249,252);
          h6{
            float: left;
            font-size: 16px;
            padding-left: 19px;
            line-height: 50px;
          }
          button{
            width: 20px;
            height:20px;
            background: url("../../../assets/img/personal/workexperience/icon_close.png") left center no-repeat;
            border:0;
            float: right;
            margin-right: 20px;
            margin-top:14px;
          }
        }

        .modal-container{
          background: #ffffff;
          padding-left:66px;
          li{
            margin:20px 0;
            color: #484949;
            h6{
              float: left;
              padding-right:23px;
              font-size:16px;
              color: #484949;
            }
            input{
              float: left;
              width:230px;
              background: rgb(247,249,252);
              border-radius:5px ;
              height:35px;
              border:1px solid $borderColor;
              padding-left:15px;
            }
          }
          li:nth-child(1){
            h6{
              line-height: 35px;
            }
            button{
              float: left;
              width:102px;
              border:0;
              background: url("../../../assets/img/personal/workexperience/btn_search.png") left center no-repeat;
              margin-left:-5px;
              height:35px;
              img{
                float: left;
                margin:7px 13px 0 21px;
              }
              p{
                float: left;
                color: #ffffff;
                line-height: 33px;
              }
            }
          }
          .beforeSearch{
            margin:92px 0 142px 0;
          }
          li:nth-child(2){
            line-height: 24px;
            p{
              float: left;
            }
          }
          li:nth-child(3){
            cursor: pointer;
            text-align: left;
            margin-left:92px;
            color: $themeColor;
            padding-left:28px;
            background: url("../../../assets/img/personal/workexperience/icon_add.png") left center no-repeat;
          }
          li:nth-child(4){
            margin-top:17px;
            margin-left:150px;
            color: #ffffff;
            button{
              float: left;
              width: 117px;
              height:33px;
              margin:0;
              border:0;
              background: url("../../../assets/img/personal/education/btn_save_normal.png.png");
            }
          }
        }
        .modalContainerEmpty{
          li{
            margin:40px 0;
          }
          li:nth-child(1){
            margin-top:70px;
          }
          li:last-child{
            margin-bottom:70px;
          }
        }
        .modalContainerShow{
          li{
            margin:30px 0;
          }
          li:nth-child(2){
            line-height: 24px;
            div{
              float: left;
              margin-left:89px;
              margin-top:-24px;
              p{
                width:326px;
                text-align: left;
                height:36px;
                background: #f8f8f8;
                padding-left:12px;
                cursor: pointer;
                span{
                  border:0;
                  margin:0;
                  height:36px;
                  line-height: 36px;
                  float: left;
                }
                i{
                  float: right;
                  margin-right: 20px;
                  width: 15px;
                  height: 15px;
                  margin-top:11px;
                  background: rgb(113,113,113);
                  border-radius: 50%;
                }
                .iSelectActive{
                  background: $themeColor;
                }
              }
              p:nth-child(2){
                background: #f2f2f2;
              }
              p:nth-child(4){
                background: #f2f2f2;
              }
              p:nth-child(6){
                background: #f2f2f2;
              }
              p:nth-child(8){
                background: #f2f2f2;
              }
              p:nth-child(10){
                background: #f2f2f2;
              }
            }
          }
        }
      }
    }
    /*搜索信息弹出框*/
    .title{
      padding:35px 0 0 0;
      font-size: 18px;
      color: $activeColor;
      border-bottom: 1px solid $borderColor;
      h2{
        float: left;
        padding-bottom: 8px;
        border-bottom: 2px solid $themeColor;
        margin-bottom: -1px;
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
    .workExpContainer{
      padding:0 20px;
      .workExpInfo{
        .workExpInfoContainer{
          padding-top: 26px;
          padding-bottom:26px;
          border-bottom:1px solid $borderColor;
          div:nth-child(1){
            color: $themeColor;
            h4{
              float: left;
              font-size: 16px;
              line-height: 35px;
            }
            ul{
              float: right;
              border:0;
              margin-top:0;
              li{
                float: left;
                padding:0 20px 0 37px;
                cursor: pointer;
              }
              .openOrPrivacy{
                background: url("../../../assets/img/personal/education/hidden.png") left center no-repeat!important;
                color: #353535;
              }
              li:nth-child(1){
                background: url("../../../assets/img/personal/education/eye.png") left center no-repeat;
              }
              li:nth-child(2){
                padding-left:27px;
                background: url("../../../assets/img/personal/education/edit.png") left center no-repeat;
              }
              li:nth-child(3){
                padding-left:27px;
                background: url("../../../assets/img/personal/education/delete.png") left center no-repeat;
              }
            }
          }
          /*公司名字*/
          div:nth-child(2){
            p{
              float: left;
              padding-top:20px;
              span{
                float: left;
              }
            }
            p:nth-child(1){
              width:292px;
            }
            p:nth-child(3){
              padding-top:18px;
              width:820px;
              word-wrap:break-word;
              white-space:normal;
            }
          }
          /*显示个人职位信息*/
          ul{
            margin-top:-26px;
            margin-left:-10px;
            li{
              padding:13px 0;
              line-height: 35px;
              .date-picker{
                width:140px;
                float: left;
              }
              h5{
                float: left;
                font-size:14px;
                color: $themeColor;
                margin-right:35px;
              }
              p{
                float: left;
                color: #4a4a4b;
              }
              input{
                float: left;
                height:35px;
                background: #ffffff;
                border:1px solid $borderColor;
                padding-left:13px;
                border-radius: 5px;
              }
              textarea{
                overflow: visible;
                float: left;
                border-radius: 5px;
                padding-left: 13px;
                padding-right:13px;
              }
              span{
                float: left;
                margin:17px 20px;
                width:20px;
                height: 0px;
                border-top:2px solid #4a4a4b;
              }
              button{
                float: left;
                width: 117px;
                height: 33px;
                text-align: center;
                line-height:29px;
                border:1px solid $themeColor;
                margin-right:30px;
                background: #ffffff;
                color: $themeColor;
                margin-top:14px;
                border-radius: 5px ;
              }
              button:nth-child(1){
                margin-left:86px;
                border:0;
                background: url("../../../assets/img/personal/education/btn_save_normal.png.png")left center no-repeat;
                color: #ffffff;
              }
            }
            .companyAddress{
              input{
                width:464px;
              }
            }
            .textArea{
              position: relative;
              i{
                position: absolute;
                bottom: 0;
                margin-left:5px;
              }
            }
          }
          /*编辑个人职位信息*/
        }
      }
      /*显示已有信息的样式*/
      .addWorkExp{
        padding-top:20px;
        li{
          margin:10px 0;
          .date-picker{
            width:140px;
            float: left;
          }
          h5{
            float: left;
            line-height: 35px;
            padding-right:35px;
            color: $themeColor;
          }
          input{
            float: left;
            height: 35px;
            line-height: 33px;
            border:1px solid $borderColor;
            padding-left:13px;
            color: #353535;

          }
          input[type=text]{
            width:480px;
          }
          span{
            float: left;
            margin:17px 20px;
            width:20px;
            height: 0px;
            border-top:2px solid #4a4a4b;
          }
        }
        li:first-child{
          margin-left:-12px;
          p{
            line-height: 35px;
          }
        }
        textarea{
          border:1px solid $borderColor;
        }
        button{
          float: left;
          width: 117px;
          height: 33px;
          text-align: center;
          line-height:29px;
          border:1px solid $themeColor;
          margin-right:30px;
          background: #ffffff;
          color: $themeColor;
          margin-top:14px;
          border-radius: 5px ;
        }
        button:nth-child(1){
          margin-left:86px;
          border:0;
          background: url("../../../assets/img/personal/education/btn_save_disabled.png.png")left center no-repeat;
          color: #ffffff;
        }
        .keepAdd{
          background: url("../../../assets/img/personal/education/btn_save_normal.png.png")left center no-repeat!important;
        }
      }
    }
  }
</style>
