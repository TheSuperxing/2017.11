<template>
  <div class="editSendDeal">
    <div id="modal-overlay">
      <div class="alert">
        <ul>
          <li>编辑提交后，该协议将进入审核流程</li>
          <li>审核通过后将发送至协议相关方</li>
          <li>否则，将被退回您的“协议草稿”</li>
        </ul>
        <button class="close" v-on:click="closeAlert"></button>
        <button class="confirm" v-on:click="confirmSubmit">确认提交</button>
      </div>
    </div>

    <div id="modal-overlay2">
      <div class="alert">
        <p>是否确认退出编辑？</p>
        <button class="close" v-on:click="closeAlert"></button>
      </div>
    </div>
    <!--提交/取消编辑提示-->
    <div id="modal-overlay3">
      <div class="alert">
        <button class="close" v-on:click="closeAlert(3)"></button>
        <ul class="protocolMemberType">
          <li v-for="(item,index) in protocolMemberType" :class="{active:reveal.agreementMembers.active[index]}" @click="protocolMemberTypeTog(index)" v-cloak>{{item}}</li>
        </ul>
        <ul class="typeContainer">
          <li v-if="reveal.agreementMembers.active[0]">
            <ul  :class="reveal.agreementMembers.searchResults[0] ? 'searchMember' : 'beforeSearchMember'">
              <li>
                <h4>个人用户手机号</h4>
                <div class="search">
                  <input  type="text" placeholder="请输入员工手机号">
                  <button @click="selectAgreementMember(0)">
                    <p>搜索</p>
                  </button>
                </div>
              </li>
              <li v-if="reveal.agreementMembers.option[0]">
                <h4>搜索结果</h4>
                <div class="selectMember">
                  <p v-for="(item,index) in reveal.agreementMembers.selectMembers" @click="selectMember(index,item)" :class="{selected:reveal.agreementMembers.classSelected[index]}" v-cloak>{{item}}</p>
                </div>
              </li>
              <li v-if="reveal.agreementMembers.option[0]">
                <button v-if="reveal.distinguish" class="confirm" @click="confirmFirstPartyMember">确认</button>
                <button v-if="!reveal.distinguish" class="confirm" @click="confirmSecondPartyMember">确认</button>
              </li>
            </ul>
          </li>
          <li v-if="reveal.agreementMembers.active[1]">
            <ul  :class="reveal.agreementMembers.searchResults[1] ? 'searchMember' : 'beforeSearchMember'">
              <li>
                <h4>团队名称</h4>
                <div class="search">
                  <input  type="text" placeholder="请输团队名称">
                  <button @click="selectAgreementMember(1)">
                    <p>搜索</p>
                  </button>
                </div>
              </li>
              <li v-if="reveal.agreementMembers.option[1]">
                <h4>搜索结果</h4>
                <div class="selectMember">
                  <p v-for="(item,index) in reveal.agreementMembers.selectMembers" @click="selectMember(index,item)" :class="{selected:reveal.agreementMembers.classSelected[index]}" v-cloak>{{item}}</p>
                </div>
              </li>
              <li v-if="reveal.agreementMembers.option[1]">
                <button v-if="reveal.distinguish" class="confirm" @click="confirmFirstPartyMember">确认</button>
                <button v-if="!reveal.distinguish" class="confirm" @click="confirmSecondPartyMember">确认</button>
              </li>
            </ul>
          </li>
          <li v-if="reveal.agreementMembers.active[2]">
            <ul :class="reveal.agreementMembers.searchResults[2] ? 'searchMember' : 'beforeSearchMember'">
              <li>
                <h4>公司名称</h4>
                <div class="search">
                  <input  type="text" placeholder="请输公司名称">
                  <button @click="selectAgreementMember(2)">
                    <p>搜索</p>
                  </button>
                </div>
              </li>
              <li v-if="reveal.agreementMembers.option[2]">
                <h4>搜索结果</h4>
                <div class="selectMember">
                  <p v-for="(item,index) in reveal.agreementMembers.selectMembers"  @click="selectMember(index,item)" :class="{selected:reveal.agreementMembers.classSelected[index]}" v-cloak>{{item}}</p>
                </div>
              </li>
              <li v-if="reveal.agreementMembers.option[2]">
                <button v-if="reveal.distinguish" class="confirm" @click="confirmFirstPartyMember">确认</button>
                <button v-if="!reveal.distinguish" class="confirm" @click="confirmSecondPartyMember">确认</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!--协议甲方和协议乙方的人员选择-->
    <div class="dealContentTitle">
      <h3>协议内容</h3>
    </div>
    <dl class="editDealInfo">
      <dt>带*号的选项为必填项</dt>
      <dd>
        <h4>
          <i>*</i>
          协议名称
        </h4>
        <input v-model="localDealInfo.mainInfo.name" type="text" placeholder="请输入需求名称">
        <button v-bind:class="{unfold:reveal.dealContentUnfold.state}" @click="dealContentUnfold" v-cloak>{{reveal.dealContentUnfold.text}}</button>
      </dd>

      <transition name="unfold-fade"><!--可以折叠的部分-->
        <dl v-if="reveal.dealContentUnfold.state">
          <dd>
            <h4>
              <i>*</i>
              甲 方
              <span></span>
              <!--
              文本两端对齐：
              1、必须要有这个span标签
              2、span样式设置为display: inline-block;text-align: justify;padding-left:100%;
              3、父级元素设置text-align:justify;
              -->
            </h4>
            <div class="dropDown">
              <input v-model="localDealInfo.content.firstParty.name" type="text" placeholder="甲方">
              <span @click="firstPartyOption"></span>
              <ul v-if="reveal.partyOption.firstParty.option">
                <li v-for="(item,index) in reveal.partyOption.firstParty.text" :class="{selected:reveal.partyOption.firstParty.select[index]}" @mouseenter="firstSelectTog(index)" @click="firstPartySelect(item)" v-cloak>{{item}}</li>
              </ul>
            </div>
          </dd>
          <dd>
            <h4>
              <i>*</i>
              乙方
              <span></span>
            </h4>
            <div class="dropDown">
              <input v-model="localDealInfo.content.secondParty.name" type="text" placeholder="乙方">
              <span @click="secondPartyOption"></span>
              <ul v-if="reveal.partyOption.secondParty.option">

                <li v-for="(item,index) in reveal.partyOption.secondParty.text" :class="{selected:reveal.partyOption.secondParty.select[index]}" @mouseenter="secondSelectTog(index)" @click="secondPartySelect(item)" v-cloak>{{item}}</li>
              </ul>
            </div>

          </dd>
          <dd>
            <h4>
              <i>*</i>
              协议内容
              <span></span>
            </h4>
            <textarea v-model="localDealInfo.content.partyContent" placeholder="请输入需求详细描述文案" cols="62" rows="6"></textarea>
          </dd>
          <dd class="stageTask">
            <h4>
              <i>*</i>
              阶段内容
            </h4>
            <div>
              <ul v-for="(item,index) in localDealInfo.content.stageTask">
                <h5>{{chineseNumber[index]}}、</h5>
                <li>
                  <input v-model="item.taskState" :value="item.taskState" type="text" placeholder="请输入阶段名称">
                  <input v-model="item.time" :value="item.time" type="text" placeholder="请输入要求时间">
                  <input v-model="item.taskDetail" :value="item.taskDetail" type="text" placeholder="请输入工作内容">
                  <input v-model="item.price" :value="item.price" type="text" placeholder="请输入薪酬">
                </li>
              </ul>
              <span @click="addStageTask" class="add">添加</span>
            </div>
          </dd>
          <dd>
            <h4>
              <i>*</i>
              付款方式
              <span></span>
            </h4>
            <input v-model="localDealInfo.content.modeOfPayment" :value="localDealInfo.content.modeOfPayment" type="text" placeholder="请输入付款方式">
          </dd>
          <dd>
            <h4>
              <i>*</i>
              协议总额
              <span></span>
            </h4>
            <input v-model="localDealInfo.content.cost" :value="localDealInfo.content.cost" type="text" placeholder="请输入协议总额">
          </dd>
          <dd class="remarksInfo">
            <h4>
              <i>*</i>
              备注信息
              <span></span>
            </h4>
            <textarea v-model="localDealInfo.content.remarksInfo" :value="localDealInfo.content.remarksInfo" placeholder="请输入需求详细描述文案" cols="62" rows="6"></textarea>
          </dd>
          <dd>
            <h4>
              <i>*</i>
              协议附件
              <span></span>
            </h4>

            <div v-if="reveal.accessory.state" class="deleteAccessory">
              <a :href="localDealInfo.content.accessory.fileAddress">{{this.localDealInfo.content.accessory.showText}}</a>
              <span @click="deleteAccessory" v-cloak>删除</span>
            </div>

            <dl v-if="!reveal.accessory.state" class="addAccessory">
              <dt>
                <p>
                  <span>上传文件</span>
                </p>
                <input type="file">
              </dt>
              <dd>
                附件格式为Word或PDF，大小不超过2M
              </dd>
            </dl>

          </dd>
        </dl>
      </transition>

    </dl>

    <div class="update">
      <button @click="submit" class="submit">提交审核</button>
      <button @click="cancelEdit" class="cancel">
        保存至协议草稿
        <!--<router-link :to="{path:'/yhzx/deal/sendDealIndex/sendDealInfo',query:{id:this.$route.query.id}}"></router-link>-->
      </button>
    </div>
    <!--以上是协议内容部分-->
  </div>
</template>
<script>
  import Vue from "vue"
  import {mapState} from "vuex"
  import ChineseNumber from "../../../assets/js/units/chineseNumber"
  import ModalOpp from "../../../assets/js/modalOpp"
  /*document.onclick=function (e) {
    if(e.target.parentNode.parentNode.getAttribute("class")=="dropDown"||e.target.parentNode.getAttribute("class")=="dropDown"){

    }else{
      $(".dropDown").children("ul").css("display","none")

    }
  };*/
  export default {
    name:"editSendDeal",
    data(){
      return{
        protocolMemberType:["搜索个人","搜索团队","搜索公司"],//添加甲(乙)方的弹框，成员分类搜索
        reveal:{
          distinguish:Boolean,//区分保存按钮是保存甲方还是乙方选项
          agreementMembers:{//协议甲方和协议乙方的搜索弹框
            searchResults:[false,false,false],//有搜索结果和没有搜索结果的条件下，第一项距离顶部的距离
            active:[true,false,false],//搜索个人，搜索团队，搜索公司选中状态下的不同样式
            option:[false,false,false],//搜索结果是否显示
            selectMembers:["张三","李四"],//搜索结果展示
            selectedMember:String,//用来存放选中的结果
            classSelected:[false,false],//对类名selected的控制
          },
          dealContentUnfold:{//协议内容的收起或者展开
            state:true,
            text:"收起"
          },
          accessory:{//附件的删除和添加
            state:true,
          },
          partyOption:{//甲方和乙方的隐藏选项
            firstParty:{
              text:["张三","切换其它用户"],
              option:false,
              select:[true,false]
            },
            secondParty:{
              text:["张三","切换其它用户"],
              option:false,
              select:[true,false]
            }
          }
        },
        chineseNumber:[],//阶段任务的编号
        localDealInfo:{
          mainInfo:{//协议头部一些信息
            name:"",
            time:"",
            dealState:"",
            myRole:"甲方",
          },
          content:{
            firstParty:{
              name:"",
              comment:{
                start:"",
                text:"",
              },
            },
            secondParty:{
              name:'',
              comment:{
                start:"",
                text:"",
              },
            },
            partyContent:"",
            stageTask:[
              {
                taskState:"",
                time:"",
                taskDetail:"",
                price:"",
                section:''
              },
              {
                taskState:"",
                time:"",
                taskDetail:"",
                price:"",
                section:''
              }
            ],
            cost:"",
            modeOfPayment:"",
            remarksInfo:"",
            accessory:{
              showText:"",
              fileAddress:""
            }
          },
        },
      }
    },
    computed:mapState({
      dealInfo:state=>state.myDeal.dealInfo,
    }),
    created(){

    },
    mounted(){
      //console.log(this.$route.query.id)
      for(var i=0;i<this.localDealInfo.content.stageTask.length;i++){//阶段任务中文数字编号
        var chineseNumber = new ChineseNumber(i+1);
        Vue.set(this.chineseNumber,[i],chineseNumber.getChineseNumber())
      }
      if(this.localDealInfo.content.accessory.showText.length==0){//协议部分上传文件还是删除已有文件
        Vue.set(this.reveal.accessory,"state",false)
      }else{
        Vue.set(this.reveal.accessory,"state",true)
      }
    },
    beforeUpdate(){
      if(this.localDealInfo.content.accessory.showText.length==0){//协议部分上传文件还是删除已有文件
        Vue.set(this.reveal.accessory,"state",false)
      }else{
        Vue.set(this.reveal.accessory,"state",true)
      }
    },
    methods:{
      dealContentUnfold(){
        Vue.set(this.reveal.dealContentUnfold,"state",!this.reveal.dealContentUnfold.state)
        if(!this.reveal.dealContentUnfold.state){
          Vue.set(this.reveal.dealContentUnfold,"text","展开")
        }else {
          Vue.set(this.reveal.dealContentUnfold,"text","收起")
        }
        //console.log(this.reveal.unfold.state)
      },
      protocolMemberTypeTog(index){//甲方乙方成员弹框的，不同类型搜索的样式控制

        var active=this.reveal.agreementMembers.active;
        for(let i=0;i<active.length;i++){
          Vue.set(active,[i],false)
          Vue.set(this.reveal.agreementMembers.searchResults,[i],false)//有搜索结果和没有搜索结果的条件下，第一项距离顶部的距离进行初始化
          Vue.set(this.reveal.agreementMembers.option,[i],false)//切换不同用户选择时，把之前的搜索结果清除
        }
        Vue.set(active,[index],true)
        /*以上是控制不同用户类型的颜色*/
        Vue.set(this.reveal.agreementMembers.searchResults,[index],false)//有搜索结果和没有搜索结果的条件下，第一项距离顶部的距离进行初始化

        var selectMembers = this.reveal.agreementMembers.selectMembers
        for(let i=0;i<selectMembers.length;i++){
          Vue.set(this.reveal.agreementMembers.classSelected,[i],false)
        }
        /*以上是搜索结果选中状态样式控制的恢复初始化*/
      },
      selectAgreementMember(index){//点击搜索按钮，出来搜索结果
        Vue.set(this.reveal.agreementMembers.option,[index],true)

        Vue.set(this.reveal.agreementMembers.searchResults,[index],true)//有搜索结果和没有搜索结果的条件下，第一项距离顶部的距离
      },
      selectMember(index,item){//单击搜索结果选项
        Vue.set(this.reveal.agreementMembers,"selectedMember",item)//把选中的结果储存起来

        var selectMembers = this.reveal.agreementMembers.selectMembers
        for(let i=0;i<selectMembers.length;i++){
          Vue.set(this.reveal.agreementMembers.classSelected,[i],false)
        }
        Vue.set(this.reveal.agreementMembers.classSelected,[index],true)
        /*以上是搜索结果选中状态样式控制*/
      },
      confirmFirstPartyMember(){
        if(this.reveal.agreementMembers.selectedMember!=String){
          Vue.set(this.localDealInfo.content.firstParty,"name",this.reveal.agreementMembers.selectedMember)

          var modal3= new ModalOpp("#modal-overlay3");
          modal3.closeModal();
          var active=this.reveal.agreementMembers.active;
          for(let i=0;i<active.length;i++){//关闭甲方乙方选择框后，恢复初始状态
            Vue.set(this.reveal.agreementMembers.searchResults,[i],false)//有搜索结果和没有搜索结果的条件下，第一项距离顶部的距离进行初始化
            Vue.set(this.reveal.agreementMembers.option,[i],false)//切换不同用户选择时，把之前的搜索结果清除
          }
        }

        Vue.set(this.reveal.agreementMembers,"selectedMember",String)//恢复储存甲方或乙方选中的储存容器
        var selectMembers = this.reveal.agreementMembers.selectMembers
        for(let i=0;i<selectMembers.length;i++){
          Vue.set(this.reveal.agreementMembers.classSelected,[i],false)
        }
        /*以上是搜索结果选中状态样式控制的恢复初始化*/
      },
      confirmSecondPartyMember(){

        if(this.reveal.agreementMembers.selectedMember!=String){
          Vue.set(this.localDealInfo.content.secondParty,"name",this.reveal.agreementMembers.selectedMember)

          var modal3= new ModalOpp("#modal-overlay3");
          modal3.closeModal();
          var active=this.reveal.agreementMembers.active;
          for(let i=0;i<active.length;i++){//关闭甲方乙方选择框后，恢复初始状态
            Vue.set(this.reveal.agreementMembers.searchResults,[i],false)//有搜索结果和没有搜索结果的条件下，第一项距离顶部的距离进行初始化
            Vue.set(this.reveal.agreementMembers.option,[i],false)//切换不同用户选择时，把之前的搜索结果清除
          }
        }
        Vue.set(this.reveal.agreementMembers,"selectedMember",String)//恢复储存甲方或乙方选中的储存容器
        var selectMembers = this.reveal.agreementMembers.selectMembers
        for(let i=0;i<selectMembers.length;i++){
          Vue.set(this.reveal.agreementMembers.classSelected,[i],false)
        }
        /*以上是搜索结果选中状态样式控制的恢复初始化*/
      },
      firstPartyOption(){//甲方选项
        Vue.set(this.reveal.partyOption.firstParty,"option",!this.reveal.partyOption.firstParty.option)
        Vue.set(this.reveal.partyOption.secondParty,"option",false)//恢复储存甲方或乙方选中的储存容器
      },
      firstPartySelect(item){
        if(item=="切换其它用户"){
          var modal3=new ModalOpp("#modal-overlay3");
          modal3.makeText();
          /*以上是打开搜索弹框*/
          Vue.set(this.reveal,"distinguish",true)//设置弹框确定为甲方确定
        }else {
          Vue.set(this.localDealInfo.content.firstParty,"name",item)
        }
        Vue.set(this.reveal.partyOption.firstParty,"option",false)
      },
      firstSelectTog(index){
        var select=this.reveal.partyOption.firstParty.select;
        for(let i=0;i<select.length;i++){
          Vue.set(select,[i],false)
        }
        Vue.set(select,[index],true)
      },
      secondPartyOption(){//乙方选项
        Vue.set(this.reveal.partyOption.secondParty,"option",!this.reveal.partyOption.secondParty.option)
        Vue.set(this.reveal.partyOption.firstParty,"option",false)
      },
      secondPartySelect(item){
        if(item=="切换其它用户"){
          var modal3=new ModalOpp("#modal-overlay3");
          modal3.makeText();
          Vue.set(this.reveal,"distinguish",false)//设置弹框确定为乙方确定
        }else {
          Vue.set(this.localDealInfo.content.secondParty,"name",item)
        }
        Vue.set(this.reveal.partyOption.secondParty,"option",false)
      },
      secondSelectTog(index){
        var select=this.reveal.partyOption.secondParty.select;
        for(let i=0;i<select.length;i++){
          Vue.set(select,[i],false)
        }
        Vue.set(select,[index],true)
      },
      addStageTask(){//阶段任务的添加
        console.log(this.localDealInfo.content.stageTask)
        this.localDealInfo.content.stageTask.push({price:'',taskDetail:'',taskState:'',time:''})
        var chineseNumber = new ChineseNumber(this.localDealInfo.content.stageTask.length);
        Vue.set(this.chineseNumber,[this.localDealInfo.content.stageTask.length-1],chineseNumber.getChineseNumber())
      },
      deleteAccessory(){//附件删除
        Vue.set(this.localDealInfo.content.accessory,"showText","");
        Vue.set(this.localDealInfo.content.accessory,"fileAddress","");
      },
      submit(){//单击提交按钮后会有弹框提示
        var modal= new ModalOpp("#modal-overlay");
        modal.makeText();
      },
      cancelEdit(){//单击取消按钮后会有弹框提示
        location.hash="#/yhzx/deal/draftingDealIndex/draftingDeal";
      },
      closeAlert(index){//弹框关闭按钮
        var modal= new ModalOpp("#modal-overlay");
        modal.closeModal();
        var modal2= new ModalOpp("#modal-overlay2");
        modal2.closeModal();
        var modal3= new ModalOpp("#modal-overlay3");
        modal3.closeModal();
        /*以上是关闭各种弹框*/
        var active=this.reveal.agreementMembers.active;
        if(index=="3"){//关闭甲方乙方选择框后，恢复初始状态
          for(let i=0;i<active.length;i++){
            Vue.set(this.reveal.agreementMembers.searchResults,[i],false)//有搜索结果和没有搜索结果的条件下，第一项距离顶部的距离进行初始化
            Vue.set(this.reveal.agreementMembers.option,[i],false)//切换不同用户选择时，把之前的搜索结果清除
          }
          Vue.set(this.reveal.agreementMembers,"selectedMember",String)//恢复储存甲方或乙方选中的储存容器
          var selectMembers = this.reveal.agreementMembers.selectMembers
          for(let i=0;i<selectMembers.length;i++){
            Vue.set(this.reveal.agreementMembers.classSelected,[i],false)
          }
          /*以上是搜索结果选中状态样式控制的恢复初始化*/
        }
      },
      confirmSubmit(){//看到提示按钮后的确认提交按钮
        var modal= new ModalOpp("#modal-overlay");
        modal.closeModal();

        var verify = this.localDealInfo.mainInfo.name.length!=0&&this.localDealInfo.content.firstParty.length!=0&&this.localDealInfo.content.secondParty.length!=0&&this.localDealInfo.content.partyContent.length!=0&&this.localDealInfo.content.modeOfPayment.length!=0&&this.localDealInfo.content.cost.length!=0&&this.localDealInfo.content.accessory.showText.length!=0

        var stageTask = this.localDealInfo.content.stageTask;
        for(let i=0;i<stageTask.length;i++){//阶段任务的每一项不能为空
          verify=verify&&stageTask[i].price.length&&stageTask[i].taskDetail.length&&stageTask[i].taskState.length&&stageTask[i].time.length
        }

        if(verify){
          location.hash="#/yhzx/deal/draftingDealIndex/draftingDeal";
          this.dealInfo[this.$route.query.id]=this.localDealInfo;
        }
      },
    }
  }
</script>
<style scoped lang="scss">
  $borderColor:#ebebeb;
  $textColor:#8c8c8c;
  $themeColor:#546686;
  $alertColor:#525252;
  .editSendDeal{
    #modal-overlay{
      .alert{
        width: 549px;
        height:326px;
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
        font-size: 18px;
        line-height: 34px;
        padding-top:72px;
        color: $alertColor;
        .close{
          width: 20px;
          height:20px;
          position: absolute;
          top: 20px;
          right:20px;
          background: url("../../../assets/img/deal/sendDeal/close.png") left center no-repeat;
          border:0;
        }
        .confirm{
          width: 160px;
          height:42px;
          margin-top: 42px;
          background: url("../../../assets/img/deal/sendDeal/confirm.png") left center no-repeat;
          border:0px;
          color: #ffffff;
        }
      }
    }
    #modal-overlay2{
      .alert{
        width: 549px;
        height:326px;
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
        font-size: 18px;
        line-height: 34px;
        padding-top:102px;
        color: $alertColor;
        .close{
          width: 20px;
          height:20px;
          position: absolute;
          top: 20px;
          right:20px;
          background: url("../../../assets/img/deal/sendDeal/close.png") left center no-repeat;
          border:0;
        }
        .confirm{
          width: 160px;
          height:42px;
          margin-top: 52px;
          background: url("../../../assets/img/deal/sendDeal/confirm.png") left center no-repeat;
          border:0px;
          color: #ffffff;
        }
      }
    }
    #modal-overlay3{//协议的甲方和乙方挑选成员
      $protocolMemberType:#747474;
      $active:#546686;
      .alert{
        width: 549px;
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
        font-size: 18px;
        line-height: 34px;
        color: $alertColor;
        padding:0 20px;
        .close{
          width: 20px;
          height:20px;
          position: absolute;
          top: 20px;
          right:20px;
          background: url("../../../assets/img/deal/sendDeal/close.png") left center no-repeat;
          border:0;
        }
        .protocolMemberType{
          float: left;
          margin-top:48px;
          border-bottom:1px solid rgb(235,235,235);
          padding:0 56px;
          li{
            float: left;
            font-size:18px;
            line-height: 32px;
            color: $protocolMemberType;
            padding:0 30px;
            cursor: pointer;
          }
          .active{
            color: $active;
            border-bottom: 3px solid rgb(84,102,132);
            margin-bottom:-2px;
          }
        }
        .typeContainer{
          float: left;
          margin-left:20px;
          li{
            ul{
              li{
                margin-bottom:30px;
                h4{
                  width:126px;
                  text-align: right;
                  float: left;
                  line-height: 40px;
                  margin-right:20px;
                  color: #484949;
                }
                .search{
                  float: left;
                  position: relative;
                  width:323px;
                  height: 40px;
                  input{
                    width:323px;
                    height: 42px;
                    line-height: 40px;
                    border-radius: 5px;
                    padding-left:20px;
                    border:1px solid #ababab;
                    background: rgb(248,248,248);
                  }
                  button{
                    position: absolute;
                    cursor: pointer;
                    width: 101px;
                    height:40px;
                    top: 1px;
                    right:0;
                    border: 0;
                    color: #ffffff;
                    background: url("../../../assets/img/deal/sendDeal/searchbg.png") left center no-repeat;
                    p{
                      line-height: 40px;
                      text-align: left;
                      padding-left:46px;
                      background: url("../../../assets/img/deal/sendDeal/search.png") 15px center no-repeat;
                    }
                  }
                }
                /*以上是搜索样式*/
                .selectMember{
                  width:326px;
                  float: left;
                  background: rgb(248,248,248);
                  p{
                    cursor: pointer;
                    text-align: left;
                    padding:0 20px 0 13px;
                    line-height: 40px;
                    background: url("../../../assets/img/deal/sendDeal/selectMember.png") 291px center no-repeat;
                  }
                  .selected{
                    background: url("../../../assets/img/deal/sendDeal/selectedMember.png") 291px center no-repeat;
                  }
                }
                .confirm{
                  width: 160px;
                  height:42px;
                  background: url("../../../assets/img/deal/sendDeal/confirm.png") left center no-repeat;
                  border:0px;
                  color: #ffffff;
                }
                /*以上搜索结果样式*/
              }
            }

          }
          .beforeSearchMember{
            li:nth-child(1){
              margin-top:90px;
              margin-bottom: 90px;
            }
          }
          .searchMember{
            li:nth-child(1){
              margin-top:40px;
            }

          }
        }
      }
    }
    /*以上是弹框提示*/

    .dealContentTitle{
      height:60px;
      border-bottom:1px solid $borderColor;
      h3{
        float: left;
        font-size: 18px;
        color: $themeColor;
        line-height:42px;
        margin-top:16px;
        border-bottom:2px solid $themeColor;
        margin-bottom:-1px;
      }
      button{
        color: $themeColor;
        border:none;
        background: #ffffff;
        cursor: pointer;
        float: right;
        line-height:55px;
        padding-left:23px;
        background: url("../../../assets/img/deal/sendDeal/up.png") left center no-repeat;
      }
      .unfold{
        background: url("../../../assets/img/deal/sendDeal/down.png") left center no-repeat;
      }
    }
    /*以上是标题部分*/
    /*协议内容开始*/
    .editDealInfo{
      dt{
        color: $textColor;
        line-height: 22px;
        padding-top:16px;
      }
      dd{
        margin:20px 0;
        h4{
          width:62px;
          text-align: justify;
          line-height: 35px;
          height:35px;
          float: left;
          margin-right:30px;
          overflow: hidden;
          i{
            float: left;
          }
          span{
            display: inline-block;
            text-align: justify;
            padding-left:100%;
          }
        }
        input{
          float: left;
          width: 480px;
          height:35px;
          line-height: 35px;
          border:1px solid $borderColor;
          border-radius: 5px;
          padding-left:14px;
        }
        .dropDown{
          float: left;
          position: relative;
          span{
            height:35px;
            width:25px;
            position: absolute;
            top: 0;
            right:0;
            background: url("../../../assets/img/deal/sendDeal/dropDown.png") left center no-repeat;
            cursor: pointer;
          }
          ul{
            width:480px;
            position: absolute;
            top: 35px;
            left:0;
            z-index: 10;
            li{
              line-height: 34px;
              background: rgb(235,235,236);
              opacity: 0.8;
              padding-left:14px;
              cursor: pointer;
            }
            .selected{
              color: #ffffff;
              background: rgb(93,93,93);
            }
          }
        }
        textarea{
          line-height: 25px;
          border:1px solid $borderColor;
          border-radius: 5px;
          padding:0 14px;
        }
      }
      dd:nth-child(2){
        height:35px;
        button{
          color: $themeColor;
          border:none;
          background: #ffffff;
          cursor: pointer;
          float: right;
          line-height:55px;
          padding-left:23px;
          background: url("../../../assets/img/deal/sendDeal/up.png") left center no-repeat;
        }
        .unfold{
          background: url("../../../assets/img/deal/sendDeal/down.png") left center no-repeat;
        }
      }
      .stageTask{
        div{
          width:808px;
          float: right;
          ul{
            width:808px;
            float: left;
            margin-top:20px;
            h5{
              float: left;
              line-height: 35px;
            }
            li{
              width:480px;
              float: left;
              input{
                margin:5px 0;
              }
              input:nth-child(1){
                margin-top:0px;
              }
              input:nth-last-child(1){
                margin-bottom:0px;
              }
            }
          }
          ul:nth-child(1){
            margin-top:0px;
          }
          .add{
            cursor: pointer;
            float: left;
            padding-left:30px;
            margin-left:42px;
            margin-top:20px;
            background: url("../../../assets/img/deal/sendDeal/add.png") left center no-repeat;

          }
        }
      }
      .remarksInfo{
        h4{
          i{
            visibility: hidden;
          }
        }
      }
      dd:nth-last-child(1){
        .deleteAccessory{
          width:480px;
          padding-left:14px;
          float: left;
          a{
            float: left;
            color: $themeColor;
            line-height: 35px;
            text-decoration: underline;
          }
          span{
            cursor: pointer;
            float: right;
            padding-left:28px;
            line-height: 35px;
            background: url("../../../assets/img/deal/sendDeal/delete.png") left center no-repeat;
          }
        }
        .addAccessory{
          width:480px;
          padding-left:14px;
          float: left;
          dt{
            width: 120px;
            height:40px;
            float: left;
            position: relative;
            p{
              width: 120px;
              height:40px;
              position: absolute;
              top:0;
              left:0;
              cursor: pointer;
              background: #000;
              color: #ffffff;
              text-align: center;
              line-height: 40px;
              span{
                padding-left:21px;
                background: url("../../../assets/img/deal/sendDeal/addAccessory.png") left center no-repeat;
              }
            }
            input{
              width: 120px;
              height:40px;
              opacity: 0;
              position: absolute;
              top:0;
              left:0;
              cursor: pointer;
            }
          }
          dd{
            float: left;
            width:300px;
            margin:0 ;
            margin-left:30px;
            line-height: 40px;
            color: #8b8b8b;
          }
        }
      }

      /*协议内容展开收起动画开始*/
      .unfold-fade-enter-active {
        transition: all .3s ease;
      }
      .unfold-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
      }
      .unfold-fade-enter, .unfold-fade-leave-to
        /* .slide-fade-leave-active 在低于 2.1.8 版本中 */ {
        transform: translateX(10px);
        opacity: 0;
      }
      /*协议内容展开收起动画结束*/
    }
    /*协议内容部分结束*/

    /*提交取消开始*/
    .update{
      margin:20px 0;
      padding-left:92px;
      button{
        cursor: pointer;
        margin-right:30px;
        height: 36px;
        a{
          display: block;
          width: 100px;
          height: 36px;
          line-height: 36px;
          text-align: center;
          color: $themeColor;
        }
      }
      .submit{
        width: 100px;
        border: 0px;
        background: url("../../../assets/img/deal/sendDeal/submit.png") left center no-repeat;
        color: #ffffff;
      }
      .cancel{
        border: 1px solid $themeColor;
        color: $themeColor;
        background: #ffffff;
        border-radius: 3px;
        padding:0 15px;
      }
    }
    /*提交取消结束*/
  }
</style>
