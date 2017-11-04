<template>
  <div class="projectExperienceIndex">
    <div id="modal-overlay">
      <div class="alert">
        对不起，请您先至“基础信息”菜单完善姓名信息才可添加工作经历
        <button v-on:click="closeAlert"></button>
      </div>
    </div>
    <!--以上是基础信息不完整，提示补全信息-->
    <!--公司名称搜索开始-->
    <div id="modal-overlay2">
      <div class="alert">
        <div class="modal-title">
          <h6>搜索项目</h6>
          <button v-on:click="closeAlert2"></button>
        </div>

        <ul class="modal-container" v-bind:class="{ modalContainerShow : reveal.modal,modalContainerEmpty: !reveal.modal}">
          <li v-bind:class="{beforeSearch:!reveal.searchShow}">
            <h6>项目名称</h6>
            <input v-model="input.value" type="text" placeholder="请输入项目名称">
            <button  v-on:click="search">
              <img src="../../../assets/img/personal/workexperience/icon.search.png" alt="">
              <p>搜索</p>
            </button>
          </li>
          <li v-if="reveal.searchShow">
            <h6>搜索结果</h6>
            <p v-if="!reveal.modal">抱歉，未找到该项目，请从新搜索</p>
            <div v-if="reveal.modal">
              <p v-for="(item,index) in this.num" v-on:click="selectprojectName(index)">
                <span>{{item}}</span>
                <i v-bind:class="{iSelectActive:reveal.iSelectActive[index]}"></i>
              </p>
            </div>
          </li>
          <li v-if="reveal.searchShow" v-on:click="customProject">
            自定义添加项目
          </li>
          <li v-if="reveal.searchShow">
            <button v-on:click="confirm">确认</button>
          </li>
        </ul>
      </div>
    </div>
    <!--公司名称搜索结束-->
    <div class="title">
      <h2 v-cloak>{{title.text}}</h2>
      <p v-on:click="addInfo" v-if="reveal.hiddenInfo">添加</p>
    </div>
    <div class="projectExpContainer">
      <div class="personal-empty" v-if="reveal.empty">（您尚未添加教育背景信息）</div>
      <!--信息为空 时提示信息-->
      <div class="projectExpInfo" v-if="reveal.addOrShow" v-for="(item,index) in this.projectExperience">
          <div class="existInfoContainer"  v-if="reveal.hiddenInfo">
            <div>
              <h4 v-cloak>{{localProjectExperience.projectName[index]}}</h4>
              <ul>
                <li v-bind:class="{openOrPrivacy:!reveal.openOrPrivacy[index]}" v-on:click="openOrPrivacy(index)">{{reveal.openOrPrivacyText[index]}}</li>
                <li v-on:click="editInfo(index)">编辑</li>
                <li v-on:click="deleteInfo(index)">删除</li>
              </ul>
            </div>
            <!--头部信息-->

            <div>
              <p>
                <span>{{item.info.timeStart}}</span>
                <span>——</span>
                <span>{{item.info.timeEnd}}</span>
              </p>
              <!--时间部分-->
              <p>{{localProjectExperience.info.profession[index]}}</p>
              <p>{{localProjectExperience.info.introduce[index]}}</p>

              <ul v-if="reveal.showPic[index]">
                <li  v-for="src in imgList[index]">
                  <img v-bind:src="src" alt="">

                </li>
              </ul>
              <!--图片展示-->
              <p><i v-on:click="showPic(index)" v-bind:class="{showPic:reveal.showPic[index]}">{{reveal.showPicText[index]}}</i></p>
            </div>
          </div>
          <!--显示存在信息-->

          <div class="editExistInfoContainer" v-if="!reveal.editInfo[index]">
            <ul class="eidtHidden" v-if="reveal.editDetailInfo[index]">
              <li>
                <h5>项目名称</h5>
                <p v-cloak>{{localAchieve.projectName}}</p>
              </li>
              <li>
                <h5>项目地点</h5>
                <p v-cloak>{{localAchieve.projectAds}}</p>
              </li>
              <li>
                <h5>项目状态</h5>
                <p v-cloak>{{localAchieve.projectState.finish}}</p>
              </li>
              <li>
                <h5>项目时间</h5>
                <p v-cloak>{{localAchieve.projectState.finishTime}}</p>
              </li>
              <li>
                <h5>建筑功能</h5>
                <p v-cloak>{{localAchieve.projectType}}</p>
              </li>
              <li class="projectIntroduce">
                <h5>项目描述</h5>
                <p v-cloak>{{localAchieve.projectIntroduce}}</p>
              </li>
              <li>
                <h5>项目图片</h5>
                <p>
                  <img v-for="img in localAchieve.projectPic" v-bind:src="img" alt="">
                </p>
              </li>
            </ul>
            <!--以上不是自定义-->
            <ul class="customProject"  v-if="!reveal.editDetailInfo[index]">
              <li>
                <h5>*&nbsp;项目名称</h5>
                <input type="text" v-model="localProjectExperience.projectName[index]">
              </li>
              <li>
                <h5>项目地点</h5>
                <!--省市区三级联动组件-->
                <provinces-city v-on:accpt-province-change="changeProjectAds"></provinces-city>
              </li>

              <li>
                <h5>项目状态</h5>
                <div v-for="(item,$index) in addNewProject.projectState" v-on:click="editProjectStateColor(index,$index)" v-bind:class="{projectStateColor:localProjectExperience.detailInfo.projectStateColor[index][$index]}">
                  <em></em>
                  <p>{{item}}</p>
                </div>
              </li>
              <li>
                <h5>建成时间</h5>
                <datepicker v-model="localProjectExperience.detailInfo.projectTimeStart[index]"></datepicker>
                <span></span>
                <datepicker v-model="localProjectExperience.detailInfo.projectTimeEnd[index]"></datepicker>
              </li>
              <li>
                <h5>建筑功能</h5>
                <div class="projectTypeContainer">
                  <div v-for="(item,$index) in addNewProject.projectType" v-on:click="editProjectTypeColor(index,$index)" v-bind:class="{projectTypeColor:localProjectExperience.detailInfo.projectTypeColor[index][$index]}">
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
                <textarea v-model="localProjectExperience.detailInfo.introduce[index]" @input="customTextLength(index)" cols="66" rows="6" ></textarea>
                <i>{{reveal.customTextLength[index]}}/500</i>
              </li>
            </ul>
            <!--以上是是否是自定义项目，如果是可以编辑，如果不是不能编辑-->
            <ul class="editUseful">
              <li>
                带&nbsp;&nbsp;*&nbsp;&nbsp;的选项为必选项
              </li>
              <li>
                <h5>*&nbsp;参与时间</h5>
                <!--<input type="month"  v-bind:value="localProjectExperience.info.timeStart[index]">-->
                <datepicker v-model="localProjectExperience.info.timeStart[index]"></datepicker>
                <span></span>
                <!--<input type="month"  v-bind:value="localProjectExperience.info.timeEnd[index]">-->
                <datepicker v-model="localProjectExperience.info.timeEnd[index]"></datepicker>

              </li>
              <li>
                <h5>*&nbsp;任职工作</h5>
                <input type="text" v-model="localProjectExperience.info.profession[index]" v-bind:value="localProjectExperience.info.profession[index]">
              </li>
              <li>
                <h5>详细描述</h5>
                <textarea v-model="localProjectExperience.info.introduce[index]" v-bind:value="localProjectExperience.info.introduce[index]" cols="66" rows="6" v-on:input="textLength(index)"></textarea>
                <i>{{reveal.textLength[index]}}/500</i>
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
                <button v-on:click="keepEdit(index)">保存</button>
                <button v-on:click="cancelEdit(index)">取消</button>
              </li>
            </ul>
            <!--以上是可以编辑项目信息-->
          </div>
          <!--编辑项目经验信息-->
      </div>

      <!--服务器获取的数据的展示-->
      <div class="addProjectExp" v-if="!reveal.addOrShow">
        <ul class="addProjectName">
          <li>带&nbsp;*&nbsp;的选项为必须项</li>
          <li  v-if="reveal.customProject">
            <h5>*&nbsp;项目名称</h5>
            <p>{{newProjectExperience.projectName}}</p>
          </li>
          <!--添加项目名称-->
        </ul>

        <ul class="customProject"  v-if="!reveal.customProject">
          <li  v-if="!reveal.customProject">
            <h5>*&nbsp;项目名称</h5>
            <input type="text" placeholder="请输入项目名称" v-model="newProjectExperience.projectName" >
          </li>

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
            <datepicker v-model="newProjectExperience.detailInfo.projectTimeStart"></datepicker>
            <span></span>
            <datepicker v-model="newProjectExperience.detailInfo.projectTimeEnd"></datepicker>
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
        </ul>
        <!--自定义项目-->
        <ul class="experienceInfo">
          <li>
            <h5>*&nbsp;参与时间</h5>
            <datepicker v-model="newProjectExperience.info.timeStart"></datepicker>
            <span></span>
            <datepicker v-model="newProjectExperience.info.timeEnd"></datepicker>
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
        <!--个人项目经验信息-->
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue"
  import ModalOpp from "../../../assets/js/modalOpp"
  import {mapState} from "vuex"
  import ProvincesCity from "../../units/province-city-county.vue"
  import datepicker from "../../units/Datepicker.vue"
  export default {
    name:"projectExperienceIndex",
    components:{
      ProvincesCity,
      datepicker
    },
    data(){
      return {
        title: {text:"项目经历"},//项目主页的标题
        num: ["1", "2", "3"],//从服务器获取的项目搜索列表
        input: {value: ""},//选择的项目名称
        projectName: {name: ''},
        imgList: [
          [
            require("../../../assets/img/personal/projectexperience/img_1_080.png"),
            require("../../../assets/img/personal/projectexperience/img_2_080.png"),
            require("../../../assets/img/personal/projectexperience/img_3_080.png"),
            require("../../../assets/img/personal/projectexperience/img_4_080.png"),
            require("../../../assets/img/personal/projectexperience/img_075.3.png"),
            require("../../../assets/img/personal/projectexperience/img_101.png")
          ],
          [
            require("../../../assets/img/personal/projectexperience/img_4_080.png"),
            require("../../../assets/img/personal/projectexperience/img_075.3.png"),
            require("../../../assets/img/personal/projectexperience/img_101.png")
          ]
        ],
        addNewProject:{projectState:["建成","在建","未建"],projectType:["绿地","公园","住宅","写字楼","交通枢纽","文化场馆","体育场馆","展示中心"]},//项目状态和建筑功能
        addProjectType:{value:"",type:false},//建筑功能的扩展
        /*以上是本地一些数据*/
        reveal: {//本地的状态控制
          empty: true,//控制信息为空提示语句
          hiddenInfo:true,//控制首页列表、包括添加按钮的显示情况
          editInfo: [],//编辑视图和首页视图的切换
          textLength: [],//编辑状态，多行文本编辑框的实时显示文本长度

          customTextLength: [],//编辑状态，自定义项目多行文本编辑框实时显示文本长度
          newTextLength: [0,0,0],//添加状态，多行文本编辑框实时显示文本长度
          addOrShow: true,//添加按钮单击后，在添加信息和显示首页列表之间的切换
          keepAddUse: false,//编辑状态，保存按钮是否可用
          modal: false,//通过不同的值改变搜索项目的modal的样式
          searchShow: false,//控制项目搜索后，显示结果
          iSelectActive: [],//控制选中搜索结果
          openOrPrivacy: [],//控制信息对外是否显示状态
          openOrPrivacyText: [],//控制信息是否对外显示文本
          keepAdd: false,//添加状态下，保存按钮是否可用
          showPic: [],//单击查看更多后，图片的收起与展示
          showPicText: [],//单击查看更多后，文字的切换
          customProject:true,//是否自定义项目
          editDetailInfo:[],//搜索添加的项目不能编辑，自己添加的项目能够编辑
        },
        localProjectExperience: {
          projectName: [],
          info: {
            timeStart: [],
            timeEnd: [],
            profession: [],
            introduce: []
          },
          detailInfo:{//如果是自定义项目，可以编辑的信息
            projectAds:{//项目地址信息
              province:[],//初始化，省份、城市、市区
              city:[],
              county:[],
            },
            projectStateColor:[],//项目状态的选中(单选)
            projectTypeColor:[],//建筑功能的选中(单选)
            introduce: [], //详细项目描述
            projectTimeStart:[],//项目开始时间
            projectTimeEnd:[],//项目结束时间
          }
        },
        //用来存放从Vuex上同步的数据已经存在
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
        localAchieve:{projectName:"水立方",projectAds:"北京市朝阳区",projectState:{finish:"建成",finishTime:"2008年"},projectType:"体育场馆",projectIntroduce:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium beatae blanditiis consectetur corporis cum cumque, cupiditate deleniti eum explicabo fuga iusto laudantium neque obcaecati quis, repudiandae sed tenetur ut voluptatibus!",projectPic:[require("../../../assets/img/personal/projectexperience/img_101.png"),require("../../../assets/img/personal/projectexperience/img_101.png")]},
        //用来存放新建的数据
      };
    },
    computed:mapState({
      projectExperience:state=>state.personal.personalMessage.projectExperience,
      /*从Vuex中获取projectExperience信息*/
      baseInfoName:state=>state.personal.personalMessage.baseInfo.name[0]
    }),
    /*获取基础信息中的姓名信息*/
    mounted(){

      if(this.baseInfoName.length==0||this.baseInfoName=="（此处暂时没有消息）"){
        var modeal= new ModalOpp("#modal-overlay");
        modeal.makeText();
      }
      /*如果姓名信息为空就会出现提示框*/
      if(this.projectExperience.length!=0){
        Vue.set(this.reveal,"empty",false)

        /*通过判断是否显示信息为空提示*/
        for(let i=0;i<this.projectExperience.length;i++){
          this.localProjectExperience.projectName[i]=this.projectExperience[i].projectName;
          this.localProjectExperience.info.timeStart[i]=this.projectExperience[i].info.timeStart;
          this.localProjectExperience.info.timeEnd[i]=this.projectExperience[i].info.timeEnd;
          this.localProjectExperience.info.introduce[i]=this.projectExperience[i].info.introduce;
          this.localProjectExperience.info.profession[i]=this.projectExperience[i].info.profession;
          /*把Vuex的数据同步到这个对象本地属性上*/
          this.reveal.editInfo.push(true);
          //this.reveal.hiddenInfo.push(true);
          /*对每一个循环列表编辑状态赋初始状态值*/
          this.reveal.openOrPrivacy.push(true);
          this.reveal.openOrPrivacyText.push("显示");
          /*对每一个循环列表的对外显示赋初始值*/
          this.reveal.showPic.push(false);
          this.reveal.showPicText.push("展开查看更多");
          /*为每一个循环列表的展开更多添加不同状态*/
          if(this.localProjectExperience.info.introduce[i].length==0){
            this.reveal.textLength.push(0);
          }else {
            this.reveal.textLength.push(this.localProjectExperience.info.introduce[i].length);
          }
          if(!this.projectExperience[i].projectDetailInfo){//筛选的项目
            Vue.set(this.reveal.editDetailInfo,[i],true);
            this.localProjectExperience.detailInfo.projectAds.province.push("");
            this.localProjectExperience.detailInfo.projectAds.city.push("");
            this.localProjectExperience.detailInfo.projectAds.county.push("");
            this.localProjectExperience.detailInfo.introduce.push("");
            this.localProjectExperience.detailInfo.projectTimeStart.push("");
            this.localProjectExperience.detailInfo.projectTimeEnd.push("");
            /*非自定义个人项目状态*/
            this.localProjectExperience.detailInfo.projectStateColor.push([false,false,false]);
            this.localProjectExperience.detailInfo.projectTypeColor.push([]);

            this.reveal.customTextLength.push(0)

          }else {//个人自定义的项目
            Vue.set(this.reveal.editDetailInfo,[i],false);
            this.localProjectExperience.detailInfo.projectAds.province.push(this.projectExperience[i].projectDetailInfo.projectAds.province);
            this.localProjectExperience.detailInfo.projectAds.city.push(this.projectExperience[i].projectDetailInfo.projectAds.city);
            this.localProjectExperience.detailInfo.projectAds.county.push(this.projectExperience[i].projectDetailInfo.projectAds.county);
            this.localProjectExperience.detailInfo.introduce.push(this.projectExperience[i].projectDetailInfo.introduce);
            this.localProjectExperience.detailInfo.projectTimeStart.push(this.projectExperience[i].projectDetailInfo.projectTimeStart);
            this.localProjectExperience.detailInfo.projectTimeEnd.push(this.projectExperience[i].projectDetailInfo.projectTimeEnd);
            this.localProjectExperience.detailInfo.projectStateColor.push([])
            for(let j=0;j<this.projectExperience[i].projectDetailInfo.projectStateColor.length;j++){//初始化建筑状态，避免应用赋值
              this.localProjectExperience.detailInfo.projectStateColor[i].push(this.projectExperience[i].projectDetailInfo.projectStateColor[j]);
            }
            this.localProjectExperience.detailInfo.projectTypeColor.push([]);
            for(let k=0;k<this.projectExperience[i].projectDetailInfo.projectTypeColor.length;k++){//初始化建筑类型，避免应用赋值
              this.localProjectExperience.detailInfo.projectTypeColor[i].push(this.projectExperience[i].projectDetailInfo.projectTypeColor[k]);

            }

            this.reveal.customTextLength.push(this.projectExperience[i].projectDetailInfo.introduce.length)
          }
        }
        /*初始化文本计数*/
      }
      for(let i=0;i<this.addNewProject.projectState.length;i++){
        this.newProjectExperience.detailInfo.projectStateColor.push(false);
      }
      /*projectStateColor赋初值*/
      for(let i=0;i<this.addNewProject.projectType.length;i++){
        this.newProjectExperience.detailInfo.projectTypeColor.push(false);
      }
      /*projectTypeColor赋初值*/
    },
    methods:{
      closeAlert(){
        var modal= new ModalOpp("#modal-overlay");
        modal.closeModal();
      },
      /*关闭提示框但不会跳转到基础信息*/
      closeAlert2(){
        var modal2= new ModalOpp("#modal-overlay2");
        modal2.closeModal();
        Vue.set(this.reveal,"modal",false)
        Vue.set(this.reveal,"searchShow",false)//搜索恢复没有显示状态
        Vue.set(this.reveal,"addOrShow",true)//如果关闭搜索框，证明放弃添加，回到显示列表
      },
     /*关闭项目搜索*/
      openOrPrivacy(index){//显示隐藏按钮，通过这个按钮可以控制显示到别人查看信息页的信息
        Vue.set(this.reveal.openOrPrivacy,[index],!this.reveal.openOrPrivacy[index])
        if(this.reveal.openOrPrivacyText[index]=="显示"){
          Vue.set(this.reveal.openOrPrivacyText,[index],"隐藏")
        }else {
          Vue.set(this.reveal.openOrPrivacyText,[index],"显示")
        }
      },
      editInfo(index){//编辑按钮单击事件，进入编辑状态
        Vue.set(this.reveal.editInfo,[index],false);//切换到编辑视图
        Vue.set(this.reveal,"hiddenInfo",false)//隐藏主页上所有列表包括添加按钮
        Vue.set(this.title,"text","编辑项目经历");//头部标题显示文本
      },
      cancelEdit(index){//编辑状态取消按钮的单击事件，取消编辑状态，回到显示状态
        Vue.set(this.reveal.editInfo,[index],true);
        this.localProjectExperience.projectName[index]=this.projectExperience[index].projectName;
        this.localProjectExperience.info.timeStart[index]=this.projectExperience[index].info.timeStart;
        this.localProjectExperience.info.timeEnd[index]=this.projectExperience[index].info.timeEnd;
        this.localProjectExperience.info.introduce[index]=this.projectExperience[index].info.introduce;
        this.localProjectExperience.info.profession[index]=this.projectExperience[index].info.profession;
        /*取消编辑后，需要重新把vuex的数据载入到本地对应数据*/
        Vue.set(this.reveal,"hiddenInfo",true)//让所有隐藏的列表从新显示出来包括添加按钮
        Vue.set(this.title,"text","项目经历");//头部标题显示文本
        if(this.projectExperience[index].projectDetailInfo){//自己添加项目修改的取消
          this.localProjectExperience.detailInfo.projectAds.province[index]=this.projectExperience[index].projectDetailInfo.projectAds.province;
          this.localProjectExperience.detailInfo.projectAds.city[index]=this.projectExperience[index].projectDetailInfo.projectAds.city;
          this.localProjectExperience.detailInfo.projectAds.county[index]=this.projectExperience[index].projectDetailInfo.projectAds.county;
          this.localProjectExperience.detailInfo.introduce[index]=this.projectExperience[index].projectDetailInfo.introduce;
          this.localProjectExperience.detailInfo.projectTimeStart[index]=this.projectExperience[index].projectDetailInfo.projectTimeStart;
          this.localProjectExperience.detailInfo.projectTimeEnd[index]=this.projectExperience[index].projectDetailInfo.projectTimeEnd;
          this.localProjectExperience.detailInfo.projectStateColor[index]=this.projectExperience[index].projectDetailInfo.projectStateColor;
          this.localProjectExperience.detailInfo.projectTypeColor[index]=this.projectExperience[index].projectDetailInfo.projectTypeColor;
        }
      },
      textLength(index){//编辑状态下记录输入多行文本的字数
        if(this.localProjectExperience.info.introduce[index].trim().length<=500){
          Vue.set(this.reveal.textLength,[index],this.localProjectExperience.info.introduce[index].trim().length)
        }else{
          this.localProjectExperience.info.introduce[index]=this.localProjectExperience.info.introduce[index].trim().slice(0,499);
          Vue.set(this.reveal.textLength,[index],500)//设置字符长度
        }
      },
      customTextLength(index){//编辑状态下，自定义项目多行文本
        if(this.localProjectExperience.detailInfo.introduce[index].trim().length<=500){
          Vue.set(this.reveal.customTextLength,[index],this.localProjectExperience.detailInfo.introduce[index].trim().length)
        }else{
          this.localProjectExperience.detailInfo.introduce[index]=this.localProjectExperience.detailInfo.introduce[index].trim().slice(0,499);
          Vue.set(this.reveal.customTextLength,[index],500)//设置字符长度
        }
      },
      /*自定义项目编辑开始*/
      editProjectStateColor(index,$index){
        for(var i=0;i<this.localProjectExperience.detailInfo.projectStateColor[index].length;i++){
          Vue.set(this.localProjectExperience.detailInfo.projectStateColor[index],[i],false);
        }
        Vue.set(this.localProjectExperience.detailInfo.projectStateColor[index],[$index],true);
      },
      editProjectTypeColor(index,$index){
        Vue.set(this.localProjectExperience.detailInfo.projectTypeColor[index],[$index],!this.localProjectExperience.detailInfo.projectTypeColor[index][$index])
      },

      /*自定义项目编辑结束*/
      keepEdit(index){//编辑状态下的保存按钮
        var judgUpDate=this.localProjectExperience.projectName[index]==this.projectExperience[index].projectName&&this.localProjectExperience.info.timeStart[index]==this.projectExperience[index].info.timeStart&&this.localProjectExperience.info.timeEnd[index]==this.projectExperience[index].info.timeEnd&&this.localProjectExperience.info.introduce[index]==this.projectExperience[index].info.introduce&&this.localProjectExperience.info.profession[index]==this.projectExperience[index].info.profession;

        if(this.localProjectExperience.info.profession[index].trim().length!=0&&this.localProjectExperience.info.timeStart[index].trim().length!=0&&this.localProjectExperience.info.timeEnd[index].trim().length!=0){//必填项有信息编辑保存才能用

          /*if(judgUpDate){
            alert("没有更改的信息，你可以取消编辑");
          }else {

          }*///判断数据是否更新
          this.projectExperience[index].projectName=this.localProjectExperience.projectName[index];
          this.projectExperience[index].info.timeStart=this.localProjectExperience.info.timeStart[index];
          this.projectExperience[index].info.timeEnd=this.localProjectExperience.info.timeEnd[index];
          this.projectExperience[index].info.introduce=this.localProjectExperience.info.introduce[index];
          this.projectExperience[index].info.profession=this.localProjectExperience.info.profession[index];
          /*信息更新到vuex*/
          if(this.projectExperience[index].projectDetailInfo){//自己添加项目修改的提交
            this.projectExperience[index].projectDetailInfo.projectAds.province=this.localProjectExperience.detailInfo.projectAds.province[index];
            this.projectExperience[index].projectDetailInfo.projectAds.city=this.localProjectExperience.detailInfo.projectAds.city[index];
            this.projectExperience[index].projectDetailInfo.projectAds.county=this.localProjectExperience.detailInfo.projectAds.county[index];
            this.projectExperience[index].projectDetailInfo.introduce=this.localProjectExperience.detailInfo.introduce[index];
            this.projectExperience[index].projectDetailInfo.projectTimeStart=this.localProjectExperience.detailInfo.projectTimeStart[index];
            this.projectExperience[index].projectDetailInfo.projectTimeEnd=this.localProjectExperience.detailInfo.projectTimeEnd[index];
            this.projectExperience[index].projectDetailInfo.projectStateColor=this.localProjectExperience.detailInfo.projectStateColor[index];
            this.projectExperience[index].projectDetailInfo.projectTypeColor=this.localProjectExperience.detailInfo.projectTypeColor[index];
          }
          Vue.set(this.reveal.editInfo,[index],true);//编辑视图隐藏
          /*视图的切换*/
          Vue.set(this.reveal,"hiddenInfo",true)//让所有隐藏的列表从新显示出来包括添加按钮
          Vue.set(this.title,"text","项目经历");//头部标题显示文本
        }
      },
      deleteInfo(index){//删除显示信息
        this.localProjectExperience.projectName.splice(index,1)
        this.localProjectExperience.info.timeStart.splice(index,1)
        this.localProjectExperience.info.timeEnd.splice(index,1)
        this.localProjectExperience.info.introduce.splice(index,1)
        this.localProjectExperience.info.profession.splice(index,1)
        /*删除本地数据*/
        this.projectExperience.splice(index,1);
        /*删除vuex中的数据*/
        /*获或者对模块数据尽心逐个删除*/
        if(this.projectExperience.length==0){
          Vue.set(this.reveal,"empty",true)
        }
      },
      showPic(index){//展开更多
        Vue.set(this.reveal.showPic,[index],!this.reveal.showPic[index]);//通过类名控制显示更多的上下箭头图片的切换
        if(this.reveal.showPicText[index]=="展开查看更多"){//展开查看更多和收起图片的切换
            Vue.set(this.reveal.showPicText,[index],"收起图片");
        }else {
          Vue.set(this.reveal.showPicText,[index],"展开查看更多");
        }
      },
      addInfo(){//添加信息
        var model= new ModalOpp("#modal-overlay2");
        model.makeText();
        /*添加项目经历时先进行搜索*/
        Vue.set(this.reveal,"addOrShow",false);//视图在添加项目和显示项目列表之间的切换
        Vue.set(this.title,"text","添加项目经历");//头部标题显示文本
        Vue.set(this.reveal,"empty",false)//添加信息时，为空提示隐藏
        Vue.set(this.reveal,"customProject",true);//自定义界面，关闭
      },
      /*addConpanyName(){//添加公司信息

      },*/
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
          var modal2= new ModalOpp("#modal-overlay2");
          modal2.closeModal();
          //关闭搜索框
          Vue.set(this.reveal,"modal",false);
          Vue.set(this.reveal,"searchShow",false)//搜索恢复没有显示状态
          this.input.value="";//清空搜索框内容
        }

      },
      customProject(){//添加模式下，如果搜索信息为空，或者不满意，可以自定义项目信息
        Vue.set(this.reveal,"customProject",false);//自定义界面出现
        var modal2= new ModalOpp("#modal-overlay2");
        modal2.closeModal();
        //关闭搜索框

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
        /*for(var i=0 ; i<this.addNewProject.projectType.length ; i++){//遍历当前所有建筑功能，如果匹配进行设置
          if(i==index){
            Vue.set(this.newProjectExperience.detailInfo.projectTypeColor,[index],true);
          }else{
            Vue.set(this.newProjectExperience.detailInfo.projectTypeColor,[i],false);
          }
        }*/
        /*注释掉的为单选功能*/
        Vue.set(this.newProjectExperience.detailInfo.projectTypeColor,[index],!this.newProjectExperience.detailInfo.projectTypeColor[index])//多选
      },
      addProjectTypeName(){//添加模式下，建筑功能的扩展
          Vue.set(this.addProjectType,"type",true);
        /*for(var i=0 ; i<this.addNewProject.projectType.length ; i++){//遍历当前所有建筑功能，如果匹配进行设置
          Vue.set(this.newProjectExperience.detailInfo.projectTypeColor,[i],false);//如果添加，其它建筑功能选项全部不选中
        }*/
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
          if(!this.reveal.customProject){
            this.reveal.editDetailInfo.push(false);
            this.projectExperience.push({
              projectName:this.newProjectExperience.projectName,projectDetailInfo:this.newProjectExperience.detailInfo,info:{timeStart:this.newProjectExperience.info.timeStart,timeEnd:this.newProjectExperience.info.timeEnd,profession:this.newProjectExperience.info.profession,introduce:this.newProjectExperience.info.introduce}},)//把添加的信息同步到personal-store，这条信息会更新到首页
            console.log("自定义公司")
          }else {
            this.newProjectExperience.detailInfo=false;
            this.projectExperience.push({projectName:this.newProjectExperience.projectName,projectDetailInfo:this.newProjectExperience.detailInfo,info:{timeStart:this.newProjectExperience.info.timeStart,timeEnd:this.newProjectExperience.info.timeEnd,profession:this.newProjectExperience.info.profession,introduce:this.newProjectExperience.info.introduce}},)//把添加的信息同步到personal-store，这条信息会更新到首页
            console.log("挑选公司")
          }


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
      var judgUpDate=this.newProjectExperience.projectName.trim().length!=0&&this.newProjectExperience.info.timeStart.trim().length!=0&&this.newProjectExperience.info.timeEnd.trim().length!=0&&this.newProjectExperience.info.profession.trim().length!=0;
      if(judgUpDate){
        Vue.set(this.reveal,"keepAdd",true);//设置保存按钮的颜色
        Vue.set(this.reveal,"keepAddUse",true)//设置保存按钮可用
      }else{
        Vue.set(this.reveal,"keepAdd",false);//设置保存按钮的颜色
        Vue.set(this.reveal,"keepAddUse",false)//设置保存按钮可用
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
  .projectExperienceIndex{
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
    .date-picker{
      width:140px;
      float: left;
    }
    /*时间插件样式*/
    #modal-overlay{
      .alert{
        width: 500px;
        overflow: hidden;
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
      padding-top:35px;
      font-size: 18px;
      color: $activeColor;
      border-bottom: 1px solid $borderColor;
      h2{
        float: left;
        padding-bottom: 8px;
        border-bottom:2px solid $themeColor;
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
    .customProject{
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
          border-radius: 5px;
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
      li:nth-child(1){
        h5{
          margin-left:-10px;
        }
      }
      li:nth-child(3){
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
      /*项目状态结束*/
      li:nth-child(5){
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
      /*建筑功能结束*/
    }
    /*自定义项目类型*/
    .projectExpContainer{
      padding:0 20px;
      .projectExpInfo{
        .existInfoContainer{
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
                padding-left: 27px;
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
            p:last-child{
              float: left;
              width:820px;
              cursor: pointer;
              i{
                display: block;
                color: $themeColor;
                width:130px;
                margin:0 auto;
                padding-left: 24px;
                background: url("../../../assets/img/personal/projectexperience/icon_lookmore.png") left center no-repeat;
              }
              .showPic{
                background: url("../../../assets/img/personal/projectexperience/icon_revoke_075.3.png") left center no-repeat;
              }
            }
            ul{
              float: left;
              margin:0;
              margin-top:23px;
              li{
                padding:0;
                float: left;
                img{
                  border:0;
                  margin:0 20px 20px 0;
                }
              }
            }
            /*图片部分样式*/
          }
          /*显示个人职位信息*/
        }
        /*编辑项目经历信息开始*/
          .editExistInfoContainer{
            margin-left:-10px;
            .eidtHidden{//个人不可编辑部分开始
              margin-top:17px;
              li{
                padding:13px 0;
                line-height: 35px;
                h5{
                  float: left;
                  font-size:14px;
                  margin-right:35px;
                  color: #737373;
                }
                p{
                  float: left;
                  color: #353535;
                }
              }
              .projectIntroduce{
                overflow: hidden;
                p{
                  position: relative;
                  top: -35px;
                  left:95px;
                  padding-right:95px;
                }
              }
              li:last-child{
                margin-top: -35px;
                img{
                  margin-left:15px;

                }
                img:first-child{
                  margin-left: 0px;
                }
              }
            }//个人不可编辑部分结束
            .editUseful{//个人可以编辑部分开始
              //margin-left:-10px;
              li{
                padding:10px 0;
                line-height: 35px;
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
                }
                textarea{
                  overflow: visible;
                  float: left;
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
                  border-radius: 5px;
                }
                button:nth-child(1){
                  margin-left:86px;
                  border:0;
                  background: url("../../../assets/img/personal/education/btn_save_normal.png.png")left center no-repeat;
                  color: #ffffff;
                }
              }
              li:first-child{
                color: #ababab;
              }
              li:nth-child(2){
                margin-left:-10px;
              }
              li:nth-child(3){
                margin-left:-10px;
              }
              li:nth-child(4){
                position: relative;
                i{
                  position: absolute;
                  bottom: 0;
                  margin-left:5px;
                }
              }
              .picShow{
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
              }
            }//个人可以编辑部分结束
          }
          /*编辑项目经历信息结束*/
      }
      /*显示已有信息的样式*/
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
        .addProjectName{
          li:first-child{
            color: #ababab;
          }
          li:nth-child(2){
            margin-left:-12px;
            p{
              line-height: 35px;
              float: left;
            }
          }
        }
        .customProject{
          padding-top:0px;
        }
        .experienceInfo{
          li:nth-child(1){
            margin-left:-12px;
          }
          li:nth-child(2){
            margin-left:-12px;
            i{
              line-height: 32px;
            }
          }
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
    }
  }
</style>
