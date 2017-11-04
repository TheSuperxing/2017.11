<template>
  <div class="addProjectExp">
    <ul>
      <li>带&nbsp;*&nbsp;的选项为必须项</li>
      <li>
        <h5>*&nbsp;项目名称</h5>
        <input type="text" placeholder="请输入项目名称" v-on:click="addConpanyName" v-model="newProjectExperience.projectName">


      </li>
      <!--项目名称-->

      <li>
        <h5>项目地点</h5>
        <!--省市区三级联动组件-->
        <provinces-city v-on:accpt-province-change="changeProjectAds"></provinces-city>
      </li>

      <li>
        <h5>项目状态</h5>
        <div v-for="(item,index) in addNewProject.projectState" v-on:click="changeProjectStateColor(index)" v-bind:class="{projectStateColor:newProjectExperience.detailInfo.projectStateColor[index]}">
          <em></em>
          <p>{{item}}</p>
        </div>
      </li>
      <li>
        <h5>建成时间</h5>
        <input v-model="newProjectExperience.detailInfo.projectTimeStart" type="month">
        <span></span>
        <input v-model="newProjectExperience.detailInfo.projectTimeEnd" type="month">
      </li>
      <li>
        <h5>建筑功能</h5>
        <div class="projectTypeContainer">
          <div v-for="(item,index) in addNewProject.projectType" v-on:click="changeProjectTypeColor(index)" v-bind:class="{projectTypeColor:newProjectExperience.detailInfo.projectTypeColor[index]}">
            <em></em>
            <p>{{item}}</p>
          </div>
          <div v-bind:class="{addProjectType:addProjectType.type}">
            <em></em>
            <input v-on:focus="addProjectTypeName" v-on:blur="keepAddProjectTypeName" type="text" placeholder="（可自行填写建筑功能）" v-model="addProjectType.value">
          </div>
        </div>
      </li>
      <li>
        <h5>项目描述</h5>
        <textarea v-model="newProjectExperience.info.introduce" cols="66" rows="6" v-on:input="newTextLengthInfoIntroduce"></textarea>
        <i>{{reveal.newTextLength[0]}}/500</i>
      </li>
      <li>
        <h5>*&nbsp;参与时间</h5>
        <input v-model="newProjectExperience.info.timeStart" type="month">
        <span></span>
        <input v-model="newProjectExperience.info.timeEnd" type="month">
      </li>
      <li>
        <h5>*&nbsp;任职工作</h5>
        <input v-model="newProjectExperience.info.profession" v-on:input="newTextLengthInfoProfession" type="text" placeholder="请输入公司在项目中所属职位">
        <i>{{reveal.newTextLength[1]}}/500</i>
      </li>
      <li>
        <h5>详细描述</h5>
        <textarea v-model="newProjectExperience.detailInfo.introduce" cols="66" rows="6" v-on:input="newTextLengthDetailInfoIntroduce"></textarea>
        <i>{{reveal.newTextLength[2]}}/500</i>
      </li>
      <li class="picShow">
        <h5>图片展示</h5>
        <div>
          <p>
            <img src="../../../assets/img/personal/projectexperience/icon_upload.png" alt="">
            <i>请上传图片</i>
            <input type="file">
          </p>
          <p>(支持PNG，JPG最大不超过2M)</p>
        </div>
      </li>
      <li>
        <button v-on:click="keepAdd" v-bind:class="{keepAdd:reveal.keepAdd}">保存</button>
        <button v-on:click="cancelAdd">取消</button>
      </li>
    </ul>
 </div>
</template>
<script>
  import Vue from "vue"
  import ModalOpp from "../../../assets/js/modal"
  import {mapState} from "vuex"
  import ProvincesCity from "../../units/province-city-county.vue"
  export  default {
    name:"AddProjectExp",
    components:{
      ProvincesCity
    },
    props:["keepAndCancel"],
    data(){
      return {
        num: ["1", "2", "3"],//从服务器获取的项目搜索列表
        newProjectName: {value: ""},//选择的项目名称
        addNewProject:{projectState:["建成","在建","未建"],projectType:["绿地","公园","住宅","写字楼","交通枢纽","文化场馆","体育场馆","展示中心","(自行填写的建筑功能)"]},//项目状态和建筑功能
        projectName: {name: ''},
        reveal:{
          modal: false,//通过不同的值改变搜索项目的modal的样式
          searchShow: false,//控制项目搜索后，显示结果
          iSelectActive: [],//控制选中搜索结果
          newTextLength:[0,0,0],//添加状态，多行文本编辑框实时显示文本长度
          keepAdd: false,//添加状态下，保存按钮是否可用
        },
        newProjectExperience: {//同步到数据库的数据
          projectName: "",
          info: {//同步到个人主页和项目主页的数据
            timeStart: "2019-09",//个人加入项目开始时间
            timeEnd: "2020-10",//个人加入项目结束时间
            profession: "",//任职工作
            introduce: ""//项目描述
          },
          detailInfo:{//没有同步到个人主页或项目首页，同步到服务器的一些详细信息
            projectAds:{//项目地址信息
              province:"北京市",//初始化，省份、城市、市区
              city:"北京市",
              county:"东城区",
            },
            projectStateColor:[],//项目状态的选中(单选)
            projectTypeColor:[],//建筑功能的选中(单选)
            introduce: "", //详细项目描述
            projectTimeStart:"2016-01",//项目开始时间
            projectTimeEnd:"2017-01",//项目结束时间
          }
        },
      }
    },
    methods:{
      addInfo(){//添加信息
        Vue.set(this.reveal,"addOrShow",false);//视图在添加项目和显示项目列表之间的切换
        Vue.set(this.title,"text","添加项目经历");//头部标题显示文本
        Vue.set(this.reveal,"empty",false)//添加信息时，为空提示隐藏
      },
      addConpanyName(){//添加公司信息
        var model= new ModalOpp("#modal-overlay2");
        model.makeText();
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
      selectprojectName(index){//在弹出的公司列表里挑选公司名称
        Vue.set(this.projectName,"name",this.num[index]);

        for(var i= 0 ; i< this.num.length;i++){/*在每一次单击后对搜索出的列表状态进行初始化*/
          Vue.set(this.reveal.iSelectActive,[i],false)
        }
        Vue.set(this.reveal.iSelectActive,[index],true);
      },
      confirm(){//确认保存项目名称
        if(this.projectName.name){//如果没有选中任何一个项目，不能保存
          Vue.set(this.newProjectExperience,"projectName",this.projectName.name);//把选中的名称放入到添加项目属性里
          //var modal2= new Modal("#modal-overlay2");
          //modal2.closeModal();
          //关闭搜索框
          Vue.set(this.reveal,"modal",false);
          Vue.set(this.reveal,"searchShow",false)//搜索恢复没有显示状态
          this.input.value="";//清空搜索框内容
        }

      },
      changeProjectStateColor(index){//添加模式下，标记项目状态选中
        for(var i=0 ; i<this.addNewProject.projectState.length ; i++){
          if(i==index){
            Vue.set(this.newProjectExperience.detailInfo.projectStateColor,[index],true);
          }else{
            Vue.set(this.newProjectExperience.detailInfo.projectStateColor,[i],false);
          }
        }
      },
      changeProjectTypeColor(index){//添加模式下，标记建筑功能选中
        for(var i=0 ; i<this.addNewProject.projectType.length ; i++){//遍历当前所有建筑功能，如果匹配进行设置
          if(i==index){
            Vue.set(this.newProjectExperience.detailInfo.projectTypeColor,[index],true);
          }else{
            Vue.set(this.newProjectExperience.detailInfo.projectTypeColor,[i],false);
          }
        }
      },
      addProjectTypeName(){//添加模式下，建筑功能的扩展
        Vue.set(this.addProjectType,"type",true);
        for(var i=0 ; i<this.addNewProject.projectType.length ; i++){//遍历当前所有建筑功能，如果匹配进行设置
          Vue.set(this.newProjectExperience.detailInfo.projectTypeColor,[i],false);//如果添加，其它建筑功能选项全部不选中
        }
      },
      keepAddProjectTypeName(){//添加模式下，建筑功能的扩展的保存
        Vue.set(this.addProjectType,"type",false);
        if(this.addProjectType.value.trim()!=''){
          this.addNewProject.projectType.push(this.addProjectType.value)
          Vue.set(this.addProjectType,"value","");//清空input框的内容
          this.newProjectExperience.detailInfo.projectTypeColor.push(true);//使得新添加的建筑功能被选中
        }

      },
      newTextLengthInfoIntroduce(){//添加模式下，计算多行文本框的字符个数
        Vue.set(this.reveal.newTextLength,[0],this.newProjectExperience.info.introduce.length);
        if(this.newProjectExperience.info.introduce.trim().length>500){
          this.newProjectExperience.info.introduce=this.newProjectExperience.info.introduce.trim().slice(0,499);
        }
      },
      newTextLengthInfoProfession(){
        Vue.set(this.reveal.newTextLength,[1],this.newProjectExperience.info.profession.length);
        if(this.newProjectExperience.info.profession.trim().length>500){
          this.newProjectExperience.info.profession=this.newProjectExperience.info.profession.trim().slice(0,499);
        }
      },
      newTextLengthDetailInfoIntroduce(){
        Vue.set(this.reveal.newTextLength,[2],this.newProjectExperience.detailInfo.introduce.length);
        if(this.newProjectExperience.detailInfo.introduce.trim().length>500){
          this.newProjectExperience.detailInfo.introduce=this.newProjectExperience.detailInfo.introduce.trim().slice(0,499);
        }
      },
      keepAdd(){//添加模式下，确认添加按钮
        var judgUpDate=this.newProjectExperience.projectName.trim().length!=0&&this.newProjectExperience.info.timeStart.trim().length!=0&&this.newProjectExperience.info.timeEnd.trim().length!=0&&this.newProjectExperience.info.profession.trim().length!=0;
        if(judgUpDate){//保证公司信息不为空才能进行操作
          //设置保存按钮的样式是是否可用
          this.localProjectExperience.projectName.push(this.newProjectExperience.projectName);
          this.localProjectExperience.info.timeStart.push(this.newProjectExperience.info.timeStart);
          this.localProjectExperience.info.timeEnd.push(this.newProjectExperience.info.timeEnd);
          this.localProjectExperience.info.profession.push(this.newProjectExperience.info.profession);
          this.localProjectExperience.info.introduce.push(this.newProjectExperience.info.introduce);//把添加的信息同步到本地显示列表一份,这条信息会更新到工作经历首页
          this.projectExperience.push({projectName:this.newProjectExperience.projectName,info:{timeStart:this.newProjectExperience.info.timeStart,timeEnd:this.newProjectExperience.info.timeEnd,profession:this.newProjectExperience.info.profession,introduce:this.newProjectExperience.info.introduce}},)//把添加的信息同步到personal-store，这条信息会更新到首页
          this.reveal.editInfo.push(true);//在是否编辑的状态里添加一条新的状态
          this.reveal.openOrPrivacy.push(true);//在是否让他人查看添加一条新的信息
          this.reveal.openOrPrivacyText.push("显示");//在是否让他人查看添加一条新的信息
          Vue.set(this.reveal,"addOrShow",true)//切换到显示信息页
          Vue.set(this.title,"text","项目经历");//头部标题显示文本
          /*清空上一次输入内容开始*/
          Vue.set(this.newProjectExperience,"projectName","");
          Vue.set(this.newProjectExperience.info,"introduce","");
          Vue.set(this.newProjectExperience.detailInfo,"introduce","");
          Vue.set(this.newProjectExperience.info,"profession","");
          /*清空上一次输入内容结束*/
        }

      },
      cancelAdd(){//取消添加
        Vue.set(this.reveal,"addOrShow",true)//切换到显示信息页
        Vue.set(this.title,"text","项目经历");//头部标题显示文本

        if(this.projectExperience.length!=0){//在取消添加之前，查看项目经历是否为空，如果为空就不显示为空提示，否则显示为空提示
          Vue.set(this.reveal,"empty",false)
        }else{
          Vue.set(this.reveal,"empty",true)
        }
        /*清空上一次输入内容开始*/
        Vue.set(this.newProjectExperience,"projectName","");
        Vue.set(this.newProjectExperience.info,"introduce","");
        Vue.set(this.newProjectExperience.detailInfo,"introduce","");
        Vue.set(this.newProjectExperience.info,"profession","");
        /*清空上一次输入内容结束*/
      },
      changeProjectAds(val){//通过事件同步子组件信息
        this.newProjectExperience.detailInfo.projectAds=val;
      }
    },
    updated(){
      /*console.log(this.newProjectExperience.detailInfo.projectAds);
      console.log(this.localKeepAndCancel)*/
    },
    mounted(){
      //console.log(this.localKeepAndCancel)
    },
    watch:{
      localKeepAndCancel:function (val) {
        Vue.set(this.localKeepAndCancel,val)
      }
    }
  }
</script>
<style scoped lang="scss">
  $borderColor:#ebebeb;
  $themeColor:rgb(242,117,25);
  $bfColor:#ffffff;
  .addProjectExp{
    padding-top:20px;
    li{
      margin:10px 0;
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
      color: #ababab;
    }
    li:nth-child(2){
      margin-left:-12px;
    }
    li:nth-child(4){
      div{
        float: left;
        line-height: 35px;
        height:35px;
        cursor: pointer;
        em{
          float: left;
          width: 15px;
          height: 15px;
          margin-top:10px;
          background: rgb(191,191,191);
          border-radius: 50%;
        }
        p{
          float: left;
          padding:0 30px 0 15px;
        }
      }
      .projectStateColor{
        em{
          background: $themeColor;
        }
      }

    }
    li:nth-child(6){
      h5{
        float: left;
      }
      .projectTypeContainer{
        float: left;
        width:480px;
        div{
          float: left;
          line-height: 35px;
          height:35px;
          cursor: pointer;
          em{
            float: left;
            width: 15px;
            height: 15px;
            margin-top:10px;
            background: rgb(191,191,191);
            border-radius: 50%;
          }
          p{
            float: left;
            padding:0 30px 0 15px;
          }
          input{
            float: left;
            padding-left:0;
            margin-left:15px;
            width:170px;
            border: 0px;
            border-bottom:2px solid $borderColor;
            background: $bfColor;
          }
        }
        div:nth-child(4){
          margin-right:40px;
        }
        .projectTypeColor{
          em{
            background: $themeColor;
          }
        }
        .addProjectType{
          input{
            background: #ffffff;
            border:1px solid $borderColor;
            border-radius: 5px;
          }
          em{
            background: $themeColor;
          }
        }
      }
    }
    li:nth-child(8){
      margin-left:-12px;
    }
    li:nth-child(9){
      margin-left:-12px;
    }
    .picShow{//图片组件样式开始
      div{
        float: left;
        p{
          float: none;
        }
        p:nth-child(1){
          position: relative;
          width:100px;
          height:100px;
          background: #e6e6e6;
          img{
            float: left;
            border:0;
            margin-left:33px;
            margin-top:20px;
            margin-bottom:3px;
          }
          i{
            float: left;
            width: 100px;
            text-align: center;
            margin:0;
            padding:0;
          }
          input{
            width: 100px;
            height:100px;
            position:absolute;
            top:0;
            left:0;
            opacity: 0;
          }
        }
        p:nth-child(2){
          margin-top:10px;
        }
      }
    }//图片组件样式结束
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
  /*添加项目信息结束*/
</style>
