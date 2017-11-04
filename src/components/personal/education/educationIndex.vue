<template>
  <div class="educationIndex">
    <div  class="title">
      <h2 v-cloak>{{title}}</h2>
      <p v-on:click="addEdu">添加</p>
    </div>
    <div class="educationContainer">
      <div class="personal-empty" v-if="empty.promote">（您尚未添加教育背景信息）</div>

      <div class="eduInfo" v-for="(item,index) in this.education" v-if="!editEdu.add">

        <div class="eduInfoContainer" v-if="editEdu.delete[0][index]">
          <div v-if="!editEdu.edit[0][index]">
            <h4 v-cloak>{{item.schoolName}}</h4>
            <ul>
              <li v-bind:class="{openOrPrivacy:openOrPrivacy[index]}" v-on:click="openOrPrivacyInfo(index)">{{openOrPrivacyText[index]}}</li>
              <li v-on:click="editEduExist(index)">编辑</li>
              <li v-on:click="deleteEduExist(index)">删除</li>
            </ul>
          </div>
          <div v-if="!editEdu.edit[0][index]">
            <p v-cloak >{{item.info.schoolTimeStart}}——{{item.info.schoolTimeEnd}}</p>
            <p v-cloak >{{item.info.profession}}</p>
            <p v-cloak >{{item.info.introduce}}</p>
          </div>

          <ul class="editEduInfo" v-if="editEdu.edit[0][index]">
            <li>
              <label>
                *学校名称 <input v-model="inputValue.schoolText[index]"  type="text" placeholder="请输入学校名称" v-on:input="changeShoolName(index)"><span>{{textLeng.schoolName[index]}}/30</span>
              </label>
            </li>
            <li>
              <span>在校时间</span>
              <datepicker v-model="inputValue.schoolTimeStart[index]"></datepicker>
              <span>——</span>
              <datepicker v-model="inputValue.schoolTimeEnd[index]"></datepicker>
            </li>
            <li>
              <label>
                专业名称 <input v-model="inputValue.professionText[index]" v-on:input="changeProfession(index)" type="text" placeholder="请输入专业名称"><span>{{textLeng.profession[index]}}/30</span>
              </label>
            </li>
            <li>
              <label>
                所获学历 <input v-model="inputValue.introduce[index]" type="text" placeholder="请选择学校">
              </label>
            </li>
            <li>
              <button v-bind:class="{eduDisabled: buttonColor.exist[index]}" v-on:click="keepEditEduExist(index)">保存</button>
              <button v-on:click="cancellEditEduExist(index)">取消</button>
            </li>
          </ul>
        </div>

      </div>

      <ul class="editEduInfo" v-if="editEdu.add">
        <li>
          <label>
            *学校名称 <input v-model="newInputValue.schoolText" v-on:input="addShoolName" type="text" placeholder="请输入学校名称"><span>{{newTextLeng.schoolName[0]}}/30</span>
          </label>
        </li>
        <li>
          <span>在校时间</span>
          <datepicker v-model="newInputValue.schoolTimeStart"></datepicker>
          <span>——</span>
          <datepicker v-model="newInputValue.schoolTimeEnd"></datepicker>
        </li>
        <li>
          <label>
            专业名称 <input v-model="newInputValue.professionText" v-on:input="addProfession" type="text" placeholder="请输入专业名称"><span>{{newTextLeng.profession[0]}}/30</span>
          </label>
        </li>
        <li>
          <label>
            所获学历 <input v-model="newInputValue.introduce" type="text" placeholder="请选择学校">
          </label>
        </li>
        <li>
          <button v-bind:class="{eduDisabled: buttonColor.add}" v-on:click="keepEditEduNew">保存</button>
          <button v-if="editEdu.add" v-on:click="cancellEditEdu">取消</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import Vue  from "vue"
  import datepicker from "../../units/Datepicker.vue"
  export default {
    name: 'educationIndex',
    components:{
      datepicker
    },
    data:function() {
      return {
        title:"教育背景",
        empty:{promote:true},
        editEdu:{add:false,edit:[[]],delete:[[]]},
        //状态部分
        textLeng:{schoolName:[],profession:[]},
        newTextLeng:{schoolName:[0],profession:[0]},
        //字符段长度
        openOrPrivacy:[false,true,false,true],//信息是否公开显示,通过服务器获取的数据
        openOrPrivacyText:[],//信息是否公开显示,文本信息
        inputValue:{schoolText:[],professionText:[],schoolTimeStart:[],schoolTimeEnd:[],introduce:[]},
        newInputValue:{schoolText:"",professionText:"",schoolTimeStart:"",schoolTimeEnd:"",introduce:""},
        buttonColor:{exist:[],add:true}
        //按钮颜色
      }
    },
    mounted(){
      if(this.education.length!==0){
        Vue.set(this.empty,"promote",false)
        //if 有信息 信息为空的提升隐藏
        for(let i = 0 ; i < this.education.length ; i++){
          this.editEdu.edit[0].push(false);
          this.editEdu.delete[0].push(true);
          this.textLeng.schoolName.push(0);
          this.textLeng.profession.push(0);
          this.buttonColor.exist.push(true);
          /*初始化本地数据开始*/
          this.inputValue.schoolText.push(this.education[i].schoolName);
          this.inputValue.professionText.push(this.education[i].info.profession);
          this.inputValue.schoolTimeStart.push(this.education[i].info.schoolTimeStart);
          this.inputValue.schoolTimeEnd.push(this.education[i].info.schoolTimeEnd);
          this.inputValue.introduce.push(this.education[i].info.introduce);
          /*初始化本地数据结束*/
          Vue.set(this.textLeng.schoolName,[i],this.inputValue.schoolText[i].length)
          Vue.set(this.textLeng.profession,[i],this.inputValue.professionText[i].length)
          /*初始化记录输入字符长度的值*/
          if(this.openOrPrivacy[i]){
            Vue.set(this.openOrPrivacyText,[i],"隐藏")
          }else{
            Vue.set(this.openOrPrivacyText,[i],"显示")
          }
          /*是否显示隐藏文本的初始化*/
        }
        //为每一个对象添加一个独有的状态
      }

    },
    computed:mapState({
      education:state=>state.personal.personalMessage.education
    }),

    methods:{
      addEdu(){//添加按钮事件
        Vue.set(this.editEdu,"add",true);//添加界面显示
        Vue.set(this.empty,"promote",false);//取消无数据提示信息
      },
      openOrPrivacyInfo(index){//是否显示隐藏按钮的事件
        Vue.set(this.openOrPrivacy,[index],!this.openOrPrivacy[index]);//通过类名控制图片和文字颜色
        if(this.openOrPrivacy[index]){
          Vue.set(this.openOrPrivacyText,[index],"隐藏")
        }else{
          Vue.set(this.openOrPrivacyText,[index],"显示")
        }
        /*显示隐藏文字切换*/
      },
      editEduExist(index){//编辑按钮事件，进入编辑模式
        Vue.set(this.editEdu.edit[0],[index],true);
        //编辑和显示的切换
        //console.log(this.buttonColor.exist)
        if(this.inputValue.schoolText[index].length!=0){
          Vue.set(this.buttonColor.exist,[index],false)
        }
      },
      cancellEditEduExist(index){//编辑模式取消编辑事件
        Vue.set(this.editEdu.edit[0],[index],false);
        //console.log("ok")
      },
      deleteEduExist(index){//删除按钮事件
        Vue.set(this.editEdu.delete[0],[index],false);
        this.education.splice(index,1)
        Vue.set(this.editEdu.delete[0],[index],true)//为了解决删除一项后一项不会显示问题
        if(this.education.length==0){//数据完全删除后显示无数据提示
          Vue.set(this.empty,"promote",true);
        }
      },
      //以上是状态的改变
      changeShoolName(index){//编辑状态，改变学校名称
        //console.log(this.inputValue.text[index].length)
        Vue.set(this.textLeng.schoolName,[index],this.inputValue.schoolText[index].length)
        //当input的值改变时后面会相应改变的数字

        if(this.inputValue.schoolText[index].length>=30){
          this.inputValue.schoolText[index]=this.inputValue.schoolText[index].slice(0,29);
        }
        if(this.inputValue.schoolText[index].length!=0){
          Vue.set(this.buttonColor.exist,[index],false)
        }else {
          Vue.set(this.buttonColor.exist,[index],true)
        }
        //通过学校名字的长度，设置提交按钮的不同样式
      },
      changeProfession(index){//编辑状态，改变专业名称
        //console.log(this.inputValue.text[index].length)
        Vue.set(this.textLeng.profession,[index],this.inputValue.professionText[index].length)
        //当input的值改变时改变相应的数字
        if(this.inputValue.professionText[index].length>=30){

          this.inputValue.professionText[index]=this.inputValue.professionText[index].slice(0,29);

        }
      },
      //以上是改变数据
      keepEditEduExist(index){//编辑状态，提交保存

        var judgUpDate=this.education[index].schoolName==this.inputValue.schoolText[index]&&this.education[index].info.profession==this.inputValue.professionText[index]&&this.education[index].info.schoolTimeStart==this.inputValue.schoolTimeStart[index]&&this.education[index].info.schoolTimeEnd==this.inputValue.schoolTimeEnd[index]&&this.education[index].info.introduce == this.inputValue.introduce[index];/*数据是否更改的判断条件*/

        if(this.inputValue.schoolText[index].length!=0){

          if(judgUpDate){
            Vue.set(this.editEdu.edit[0],[index],true);//如果数据没有进行修改不会进行视图切换，单击取消视图会切换
            //以后提交数据的条件
          }else{
            this.education[index].schoolName=this.inputValue.schoolText[index];
            this.education[index].info.profession=this.inputValue.professionText[index];
            this.education[index].info.schoolTimeStart=this.inputValue.schoolTimeStart[index];
            this.education[index].info.schoolTimeEnd=this.inputValue.schoolTimeEnd[index];
            this.education[index].info.introduce = this.inputValue.introduce[index];
            Vue.set(this.editEdu.edit[0],[index],false);//如果学校名称没有填写视图在单击保存时，视图不会切换 单击取消时视图会切换
          }

        }

      },
      //提交数据
      cancellEditEdu(){//添加模式下，取消编辑
        Vue.set(this.editEdu,"add",false);//取消添加的视图
        if(this.education.length==0){//在没有数据并且取消添加数据后，依然显示无数据视图
          Vue.set(this.empty,"promote",true);
        }
        Vue.set(this.newInputValue,"schoolText","")
        Vue.set(this.newInputValue,"TimeStart","")
        Vue.set(this.newInputValue,"schoolTimeEnd","")
        Vue.set(this.newInputValue,"professionText","")
        Vue.set(this.newInputValue,"introduce","")
        /*取消添加后，清除之前添加的数据*/
      },
      addShoolName(){//添加模式下，添加校名
        Vue.set(this.newTextLeng.schoolName,[0],this.newInputValue.schoolText.length)
        //当input的值改变时改变相应的数字
        if(this.newInputValue.schoolText.length>=30){
          this.newInputValue.schoolText=this.newInputValue.schoolText.slice(0,29);
        }
        if(this.newInputValue.schoolText.length!=0){
          Vue.set(this.buttonColor,"add",false)
        }else {
          Vue.set(this.buttonColor,"add",true)
        }
        //通过学校名字的长度，设置提交按钮的不同样式
      },
      addProfession(){//添加模式下，添加专业名
        Vue.set(this.newTextLeng.profession,[0],this.newInputValue.professionText.length)
        //当input的值改变时改变相应的数字

        if(this.newInputValue.professionText.length>=30){
          this.newInputValue.professionText=this.newInputValue.professionText.slice(0,31);
        }
      },
      keepEditEduNew(){//添加模式下保存

        if(this.newInputValue.schoolText.length!=0){
          this.inputValue.schoolText.push(this.newInputValue.schoolText);
          this.inputValue.professionText.push(this.newInputValue.professionText);
          this.inputValue.schoolTimeStart.push(this.newInputValue.schoolTimeStart);
          this.inputValue.schoolTimeEnd.push(this.newInputValue.schoolTimeEnd);
          this.inputValue.introduce.push(this.newInputValue.introduce);
          /*添加的数据，追加到本地数据里一份*/
          this.education.push({schoolName:this.newInputValue.schoolText,info:{schoolTimeStart:this.newInputValue.schoolTimeStart,schoolTimeEnd:this.newInputValue.schoolTimeEnd,profession:this.newInputValue.professionText,introduce:this.newInputValue.introduce}})//向store中追加添加的数据
          /*添加的数据追加到vuex中*/
          Vue.set(this.newInputValue,"schoolText","")
          Vue.set(this.newInputValue,"TimeStart","")
          Vue.set(this.newInputValue,"schoolTimeEnd","")
          Vue.set(this.newInputValue,"professionText","")
          Vue.set(this.newInputValue,"introduce","")
          /*保存添加后，清除之前添加的数据*/
          this.editEdu.delete[0].push(true)//解决添加数据后视图部更新
          Vue.set(this.editEdu,"add",false);//如果学校名称为空不能提交，视图不会切换
          this.openOrPrivacy.push(false);//是否显示样式
          this.openOrPrivacyText.push("显示");//是否显示文本信息
        }
      }
      //新建部分
    }
  }
</script>
<style scoped lang="scss">
  $bfColor:#ffffff;
  $activeColor: #f27519;
  $borderColor:#ebebeb;
  $emptyColor:#9c9c9c;
  $themeColor:rgb(242,117,25);
  .educationIndex{
    width:940px;
    float: left;
    padding:0 40px;
    background: $bfColor;
    min-height: 671px;
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
    .educationContainer{
      padding:0 20px;
      .eduInfo{
        padding-top:25px;

        .eduInfoContainer{
          border-bottom: 1px solid $borderColor;
          div:nth-child(1){
            color: $themeColor;
            padding-bottom:12px;
            h4{
              font-size: 18px;
              float: left;
            }
            ul{
              float: right;
              li{
                float: left;
                cursor: pointer;
              }
              li:nth-child(1){
                padding-left:37px;
                padding-right:20px;
                background: url("../../../assets/img/personal/education/eye.png") left center no-repeat;
              }
              li:nth-child(2){
                padding:0 20px 0 22px;
                background: url("../../../assets/img/personal/education/edit.png") left center no-repeat;
              }
              li:nth-child(3){
                padding:0 20px 0 26px;
                background: url("../../../assets/img/personal/education/delete.png") left center no-repeat;
              }
              .openOrPrivacy{
                  background: url("../../../assets/img/personal/education/hidden.png") left center no-repeat!important;
                  color: #353535;
              }
            }
          }
          div:nth-child(2){
            width:820px;
            float: left;
            padding-bottom:25px;
            p{
              float: left;
              font-size:14px;
            }
            p:nth-child(1){
              width:292px;
              height: 21px;
            }
            p:nth-child(2){
              width:214px;
              height: 21px;
            }
          }
        }
      }

      .editEduInfo{
        padding:20px 0;
        color: $themeColor;
        border-bottom:1px solid $borderColor;
        li{
          padding:10px 0;
          input{
            margin-left:32px;
            height: 35px;
            border:2px solid $borderColor;
            border-radius: 5px ;
            padding-left:12px;
            margin-right:10px;
            color: rgb(54,54,54);
          }
          span{
            color: $emptyColor;
          }
          input[type=month]::-webkit-inner-spin-button{
            visibility: hidden;
          }
          /*input[type=month]::-webkit-datetime-edit-fields-wrapper{
            visibility: hidden;
          }*/

        }
        li:nth-child(1){
          input{
            width:480px;
            margin-left:26px;
          }
        }
        li:nth-child(2){
          color: #000;
          span{
            float: left;
            line-height: 35px;
          }
          .date-picker{
            width:140px;
            float: left;
          }
          span:nth-child(1){
            color: $themeColor;
            margin-right: 35px;
          }
          span:nth-child(3){
            margin:0 20px;
          }
        }
        li:nth-child(3){
          input{
            width:480px;
          }
        }
        li:nth-child(4){
          input{
            width:480px;
          }
        }
        li:nth-child(5){
          padding-left:93px;
          button{
            height: 33px;
            width:117px;
            border-radius: 5px;
            color: #ffffff;
            border:0px;
            background: url("../../../assets/img/personal/education/btn_save_normal.png.png") left center no-repeat;
          }
          button:nth-child(2){
            background: #fff;
            color: $themeColor;
            margin-left:30px;
            border:2px solid $themeColor;
          }
          .eduDisabled{
            border:0px;
            color: #fff;
            background: url("../../../assets/img/personal/education/btn_save_disabled.png.png") left center no-repeat;
          }
        }
      }
    }
  }
</style>
