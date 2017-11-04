<template>
  <div class="personalIndex">
    <div class="picture">
    	<div class="basicInfoImg">
    		<img v-bind:src="personal.personalPicture" alt="">
    		<span class="meng" @click="croperShow">更换头像</span>
    	</div>
      <div id="modal-overlay" class="corpbox">
      	<div class="container">
				  <div class="imageBox">
				    <div class="thumbBox"></div>
				    <div class="spinner" style="display: none">Loading...</div>
				  </div>
				  <div class="action"> 
				     <!--<input type="file" id="file" style=" width: 200px">-->
				    <div class="new-contentarea tc"> <a href="javascript:void(0)" class="upload-img">
				      <label for="upload-file">上传图像</label>
				      </a>
				      <input type="file" class="" name="upload-file" id="upload-file" />
				    </div>
				    <input type="button" id="btnCrop"  class="Btnsty_peyton" value="裁切">
				    <input type="button" id="btnZoomIn" class="Btnsty_peyton" value="+">
				    <input type="button" id="btnZoomOut" class="Btnsty_peyton" value="-">
				  </div>
				  <div class="cropped"></div>
				</div>
      </div>
      <p v-cloak>{{personalMessage.baseInfo.petName}}</p>
    </div>
    <ul class="personalIndexList">
      <li>
        <h3 class="pi-title">基础信息</h3>
        <div class="baseInfoContainer">

          <div class="emptyBasicInfo" v-if="empty.basicInfo">
            <h5>手机号码：</h5>
            <p>138-6666-8888</p>
          </div>

          <ul v-if="!empty.basicInfo">
            <li>
              <h5>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</h5>
              <p>{{personalMessage.baseInfo.petName}}</p>
            </li>
            <li>
              <h5>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</h5>
              <p>{{personalMessage.baseInfo.name[0]}}</p>
            </li>
            <li>
              <h5>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</h5>
              <p>{{personalMessage.baseInfo.sex[0]}}</p>
            </li>
            <li>
              <h5>手机号码：</h5>
              <p>{{personalMessage.baseInfo.phone[0]}}</p>
            </li>
          </ul>
        </div>
      </li>
      <!--基础信息部分结束-->
      <li>
        <h3 class="pi-title">教育背景</h3>
        <div class="infoContainer">
          <div class="pi-empty" v-if="empty.education[0]">（此处暂无信息）</div>

          <div v-for="(item,index) in this.personalMessage.education">
            <h4 v-cloak>{{item.schoolName}}</h4>
            <div v-if="empty.education[index+2]">
              <p v-cloak v-if="empty.education[1][index][0]">{{item.info.schoolTimeStart}}——{{item.info.schoolTimeEnd}}</p>
              <p v-cloak v-if="empty.education[1][index][1]">{{item.info.profession}}</p>
              <p v-cloak v-if="empty.education[1][index][2]">{{item.info.introduce}}</p>
            </div>
          </div>
        </div>
      </li>
      <!--教育背景结束-->
      <li>
        <h3 class="pi-title">工作经历</h3>
        <div class="infoContainer">
          <div class="pi-empty" v-if="empty.workExperience[0]">（此处暂无信息）</div>
          <div v-for="(item,index) in this.personalMessage.workExperience">
            <h4 v-cloak>{{item.companyName}}</h4>
            <div v-if="empty.workExperience[index+2]">
              <p v-cloak v-if="empty.workExperience[1][index][0]">
                <span>{{item.info.timeStart}}</span>
                <span>——</span>
                <span>{{item.info.timeEnd}}</span>
              </p>
              <p v-cloak v-if="empty.workExperience[1][index][1]">{{item.info.profession}}</p>
              <p v-cloak v-if="empty.workExperience[1][index][2]">{{item.info.introduce}}</p>
            </div>
          </div>
        </div>
      </li>
      <!--工作经历结束-->
      <li>
        <h3 class="pi-title">项目经历</h3>
        <div class="infoContainer">
          <div class="pi-empty" v-if="empty.projectExperience[0]">（此处暂无信息）</div>
          <div v-for="(item,index) in this.personalMessage.projectExperience">
            <h4 v-cloak>{{item.projectName}}</h4>
            <div v-if="empty.projectExperience[index+2]">
              <p v-cloak v-if="empty.projectExperience[1][index][0]">
                <span>{{item.info.timeStart}}</span>
                <span>——</span>
                <span>{{item.info.timeEnd}}</span>
              </p>
              <p v-cloak v-if="empty.projectExperience[1][index][1]">{{item.info.profession}}</p>
              <p v-cloak v-if="empty.projectExperience[1][index][2]">{{item.info.introduce}}
              </p>
              <p>查看更多>></p>
            </div>
          </div>
        </div>
      </li>
      <!--项目经历结束-->
      <li>
        <h3 class="pi-title">团队经历</h3>
        <div class="infoContainer">
          <div class="pi-empty" v-if="empty.teamExperience[0]">（此处暂无信息）</div>
          <div v-for="(item,index) in this.personalMessage.teamExperience">
            <h4 v-cloak>{{item.teamName}}</h4>
            <div v-if="empty.teamExperience[index+2]">
              <p v-cloak v-if="empty.teamExperience[1][index][0]">{{item.info.time}}</p>
              <p v-cloak v-if="empty.teamExperience[1][index][1]">{{item.info.profession}}</p>
            </div>
          </div>
        </div>
      </li>
      <!--团队经历结束-->
      <li>
        <h3 class="pi-title">执业资格</h3>
        <div class="infoContainer">
          <div class="pi-empty" v-if="empty.certificate[0]">（此处暂无信息）</div>
          <div v-for="(item,index) in this.personalMessage.certificate">
            <h4 v-cloak>{{item.certificateName}}</h4>
            <div v-if="empty.certificate[index+2]">
              <p v-cloak v-if="empty.certificate[1][index][0]">{{item.info.time}}</p>
              <p v-cloak v-if="empty.certificate[1][index][1]">{{item.info.profession}}</p>
              <p v-cloak v-if="empty.certificate[1][index][2]">证书编号：{{item.info.introduce}}</p>
            </div>
          </div>
        </div>
      </li>
      <!--执业资格部分结束-->
      <li>
        <h3 class="pi-title">职称信息</h3>
        <div class="infoContainer">
          <div class="pi-empty" v-if="empty.jobInfo[0]">（此处暂无信息）</div>
          <div v-for="(item,index) in this.personalMessage.jobInfo">
            <h4 v-cloak>{{item.jobInfoName}}</h4>
            <div v-if="empty.jobInfo[index+2]">
              <p v-cloak v-if="empty.jobInfo[1][index][1]">职称专业：&nbsp;&nbsp;{{item.info.profession}}</p>
              <p v-cloak v-if="empty.jobInfo[1][index][3]">职称级别：&nbsp;&nbsp;{{item.info.level}}</p>
              <p v-cloak v-if="empty.jobInfo[1][index][2]">证书编号：&nbsp;&nbsp;{{item.info.introduce}}</p>
              <p v-cloak v-if="empty.jobInfo[1][index][0]">评定日期：&nbsp;&nbsp;{{item.info.time}}</p>
              <p v-cloak v-if="empty.jobInfo[1][index][4]">发证机构：&nbsp;&nbsp;{{item.info.organ}}</p>
            </div>
          </div>
        </div>
      </li>
      <!--职称信息结束-->
      <li>
        <h3 class="pi-title">所获奖励</h3>
        <div class="infoContainer">
          <div class="pi-empty" v-if="empty.award[0]">（此处暂无信息）</div>
          <div v-for="(item,index) in this.personalMessage.award">
            <h4 v-cloak>{{item.awardName}}</h4>
            <div v-if="empty.award[index+2]">
              <p v-cloak v-if="empty.award[1][index][4]">颁发机构：&nbsp;&nbsp;{{item.info.organ}}</p>
              <p v-cloak v-if="empty.award[1][index][0]">{{item.info.time}}</p>
            </div>
          </div>
        </div>
      </li>
      <!--所获奖励结束-->
      <li>
        <h3 class="pi-title">论文专利</h3>
        <div class="infoContainer">
          <div class="pi-empty" v-if="empty.paperAndPatent">（此处暂无信息）</div>
          <div v-for="(item,index) in this.personalMessage.paperAndPatent.paper">
            <h4 v-cloak>{{item.paperName}}</h4>
            <div v-if="empty.paper[index+2]">
              <p v-cloak v-if="empty.paper[1][index][4]">{{item.info.organ}}</p>
              <p v-cloak v-if="empty.paper[1][index][0]">{{item.info.time}}</p>
            </div>
          </div>
          <div v-for="(item,index) in this.personalMessage.paperAndPatent.patent">
            <h4 v-cloak>{{item.patentName}}</h4>
            <div v-if="empty.patent[index+2]">
              <p v-cloak v-if="empty.patent[1][index][4]">{{item.info.organ}}</p>
              <p v-cloak v-if="empty.patent[1][index][0]">{{item.info.time}}</p>
            </div>
          </div>
        </div>
      </li>
      <!--论文专利结束-->
      <li>
        <h3 class="pi-title">语言软件</h3>
        <div class="infoContainer">
          <div class="pi-empty" v-if="empty.otherSkill">（此处暂无信息）</div>
          <div v-for="(item,index) in this.personalMessage.otherSkill.language">
            <h4 v-cloak>{{item.languageName}}</h4>
            <div v-if="empty.language[index+2]">
              <p v-cloak v-if="empty.language[1][index][4]">{{item.info.profession}}</p>
            </div>
          </div>
          <div v-for="(item,index) in this.personalMessage.otherSkill.software">
            <h4 v-cloak>{{item.softwareName}}</h4>
            <div v-if="empty.software[index+2]">
              <p v-cloak v-if="empty.software[1][index][4]">{{item.info.profession}}</p>
            </div>
          </div>
        </div>
      </li>

    </ul>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import Vue from "vue"
//	import cropbox from "../../assets/js/units/corpbox/CORPBOX.js"
  import Modal from "../../assets/js/modal.js"
  export default{
    name: 'personalIndex',
    data:function(){
      return {
        empty:{basicInfo:false,education:[true],workExperience:[true],projectExperience:[true],teamExperience:[true],certificate:[true],jobInfo:[true],award:[true],patent:[true],paper:[true],paperAndPatent:true,language:[true],software:[true],otherSkill:true},
        personal:{
          personalPicture:require("../../assets/img/personal/personalIndex/picture.png"),
        },
        
      }
    },
    mounted(){
    	//上传头像
//  	console.log(cropbox)
    	
    	var options =
			{
				thumbBox: '.thumbBox',
				spinner: '.spinner',
				imgSrc: ''
			}
			var cropper = $('.imageBox').cropbox(options);
			$('#upload-file').on('change', function(){
				var reader = new FileReader();
				reader.onload = function(e){
					options.imgSrc = e.target.result;
					cropper = $('.imageBox').cropbox(options);
				}
				reader.readAsDataURL(this.files[0]);
				this.files = [];
			})
			$('#btnCrop').on('click', function(){
				var img = cropper.getDataURL();
				$('.cropped').html('');
				$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:64px;margin-top:4px;border-radius:64px;box-shadow:0px 0px 12px #7E7E7E;" ><p>64px*64px</p>');
				$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:128px;margin-top:4px;border-radius:128px;box-shadow:0px 0px 12px #7E7E7E;"><p>128px*128px</p>');
				$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:180px;margin-top:4px;border-radius:180px;box-shadow:0px 0px 12px #7E7E7E;"><p>180px*180px</p>');
			})
			$('#btnZoomIn').on('click', function(){
				cropper.zoomIn();
			})
			$('#btnZoomOut').on('click', function(){
				cropper.zoomOut();
			})
    	//上传头像end
    	
      if(this.personalMessage.baseInfo.petName.length==0 && this.personalMessage.baseInfo.name[0].length==0 && this.personalMessage.baseInfo.sex[0].length==0){
        Vue.set(this.empty,"basicInfo",true)
      }
      //基础信息部分数据空和非空切换
      function Message(message,empty) {
        this.message = message;
        this.empty=empty;
      }
      Message.prototype.setEmpty=function () {

        if(this.message.length!=0){
          Vue.set(this.empty,[0],false)

          this.empty.push([]);//push个空数组存放教育时间，背景，学历的状态

          for(var i = 0 ; i< this.message.length;i++){
            var arrLength = Object.keys(this.message[i].info).length;//获取对象长度

            this.empty.push([true]);//存放教育信息的状态
            this.empty[1].push([]);

            for(var j=0 ; j<arrLength ; j++){
              this.empty[1][i].push(true);
            }
            if(this.message[i].info.introduce=="" && this.message[i].info.profession=="" && this.message[i].info.time=="" && this.message[i].info.level=="" && this.message[i].info.organ==""){
              Vue.set(this.empty,[i+2],false)
            }else if(this.message[i].info.time==""){
              Vue.set(this.empty[1][i],[0],false)

            }else if(this.message[i].info.profession==""){
              Vue.set(this.empty[1][i],[1],false)

            }else if(this.message[i].info.introduce==""){

              Vue.set(this.empty[1][i],[2],false)
            }else if(this.message[i].info.level==""){

              Vue.set(this.empty[1][i],[3],false)
            }else if(this.message[i].info.organ==""){
              Vue.set(this.empty[1][i],[4],false)
            }

          }

        }
      }
      //显示数据切换对象
      var education = new Message(this.personalMessage.education,this.empty.education);
      education.setEmpty();
      //教育背景部分数据的显示
      var workExperience = new Message(this.personalMessage.workExperience,this.empty.workExperience);
      workExperience.setEmpty();
      //工作经历部分数据的显示
      var projectExperience = new Message(this.personalMessage.projectExperience,this.empty.projectExperience);
      projectExperience.setEmpty();
      //项目经历部分数据显示
      var teamExperience = new Message(this.personalMessage.teamExperience,this.empty.teamExperience);
      teamExperience.setEmpty();
      //团队经历部分数据显示
      var certificate = new Message(this.personalMessage.certificate,this.empty.certificate);
      certificate.setEmpty();
      //执业资格部分数据显示
      var jobInfo = new Message(this.personalMessage.jobInfo,this.empty.jobInfo);
      jobInfo.setEmpty();
      //执业资格部分数据显示
      var award = new Message(this.personalMessage.award,this.empty.award);
      award.setEmpty();
      //所获奖励部分数据显示
      var patent = new Message(this.personalMessage.paperAndPatent.patent,this.empty.patent);
      patent.setEmpty();
      var paper = new Message(this.personalMessage.paperAndPatent.paper,this.empty.paper);
      paper.setEmpty();
      //所获奖励部分数据显示
      var language = new Message(this.personalMessage.otherSkill.language,this.empty.language);
      language.setEmpty();
      var software = new Message(this.personalMessage.otherSkill.software,this.empty.software);
      software.setEmpty();
      //语言软件部分数据显示
      /*论文专利为空显示开始*/
      if(this.personalMessage.paperAndPatent.paper.length==0&&this.personalMessage.paperAndPatent.patent.length==0){
        Vue.set(this.empty,"paperAndPatent",true)
      }else{
        Vue.set(this.empty,"paperAndPatent",false)
      }
      /*论文专利为空显示结束*/
      /*语言软件为空显示开始*/
      if(this.personalMessage.otherSkill.software.length==0&&this.personalMessage.otherSkill.language.length==0){
        Vue.set(this.empty,"otherSkill",true)
      }else{
        Vue.set(this.empty,"otherSkill",false)
      }
      /*语言软件为空显示结束*/
    },
    computed:mapState({
      personalMessage:state=>state.personal.personalMessage,
      /*获取数据*/

    }),
    methods:{
    	croperShow(){
    		Modal.makeText($('.corpbox'))
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
  .personalIndex {
  	
    width: 940px;
    padding: 40px 40px 60px 40px;
    background-color: $bfColor;
    float: left;
    border-radius: 5px;
    .pi-title{
      padding:25px 0 11px 0;
      font-size: 18px;
      color: $activeColor;
      border-bottom: 1px solid $borderColor;
    }
    /*共有头部*/
    .pi-empty{
      padding: 40px 0 10px 0;
      font-size:18px;
      color: $emptyColor;
      text-align: center;
    }
    /*空数据*/
    .picture{
    	/*上传头像*/
    	.container{
    		position:absolute;top:50%;left:42%; 
				transform:translate(-50%,-50%);
				-webkit-transform:translate(-50%,-50%);
				-moz-transform:translate(-50%,-50%);
				-ms-transform:translate(-50%,-50%);
				-o-transform:translate(-50%,-50%);
				
    	}
      padding-bottom:30px;
      border-bottom: 1px solid $borderColor;
      .basicInfoImg{
      	width: 115px;
      	height: 115px;
      	padding: 1px;
      	border-radius: 50%;
      	background: bisque;
      	overflow: hidden;
      	position: relative;
      	float: left;
      	&:hover{
      		.meng{
      			display: block;
      		}
      	}
      	img{
	        
	      }
	      .meng{
	      	position: absolute;
	      	width: 100%;
	      	height: 115px;
	      	line-height: 115px;
	      	text-align: center;
	      	background: rgba(0,0,0,.5);
	      	top: 0; left: 0;
	      	color: #FFFFFF;
	      	cursor: pointer;
	      	display: none;
	      }
      }
      
      p{
        width:717px;
        float: left;
        padding-left:30px;
        color: $activeColor;
        font-size: 24px;
        margin-top:31px;
      }
    }
    .personalIndexList{
      li{
        .infoContainer{
          color: rgb(53,53,53);
          padding:0 22px;
          h4{
            padding-top:25px;
            padding-bottom:15px;
            font-size: 18px;
            color: $themeColor;
          }
          div{
            border-bottom:1px solid $borderColor;
            p{
              float: left;
              padding-bottom:17px;
              span{
                float: left;
              }
            }
          }
          div:last-child{
            border-bottom: 0;
          }
        }
      }
      li:nth-child(1){
        .emptyBasicInfo{
          padding-left:20px;
          color: rgb(114,114,114);
          h5{
            float: left;
            color: rgb(53,53,53);
            padding-left:25px;
            background: url("../../assets/img/personal/personalIndex/baseinfo/phone.png") left center no-repeat;
          }
          p{
            float: left;
            margin-left:13px;
          }
        }
        .baseInfoContainer{
          padding-top: 30px;
          ul{
            color: rgb(114,114,114);
            padding-left:20px;
            li{
              padding-bottom:20px;
              h5{
                float: left;
                color: rgb(53,53,53);
                padding-left:25px;
                //width:95px;
              }
              p{
                float: left;
                margin-left:13px;
              }
            }
            li:nth-child(1) {
              h5 {
                background: url("../../assets/img/personal/personalIndex/baseinfo/petName.png") left center no-repeat;
              }
            }
            li:nth-child(2) {
              h5 {
                background: url("../../assets/img/personal/personalIndex/baseinfo/name.png") left center no-repeat;
              }
            }
            li:nth-child(3){
              h5{
                background: url("../../assets/img/personal/personalIndex/baseinfo/sex.png") left center no-repeat;
              }
            }
            li:nth-child(4){
              padding-bottom:10px;
              h5{
                background: url("../../assets/img/personal/personalIndex/baseinfo/phone.png") left center no-repeat;
              }
            }
          }
          div:last-child{
            padding-bottom: 15px;
          }
        }
      }
      li:nth-child(2){
        div{
          p{
            padding-right:0px;
          }
          p:nth-child(1){
            width:292px;
          }
          p:nth-child(2){
            width:214px;
          }
        }
      }
      li:nth-child(3){
        .infoContainer{
          div{
            p:nth-child(1){
              width:292px;
            }
            p:last-child{
              padding-right:0px;
              width:820px;
            }
          }
        }
      }

      li:nth-child(4){
        .infoContainer{
          div{
            p:nth-child(1){
              width:292px;
            }
            p:nth-child(3){
              padding-right:0px;
              width:820px;
            }
            p:last-child{
              color: $themeColor;
              cursor: pointer;

            }
          }
        }
      }

      li:nth-child(5){
        .infoContainer{
          div{
            h4:nth-child(1){
              color: rgb(53,53,53);
            }
            p:last-child{
              padding-right:0px;
            }
          }
        }
      }
      li:nth-child(6){
        .infoContainer{
          div{
            p:nth-child(1){
              width:800px;
              padding-right:0;
              padding-bottom:10px;
              color: rgb(120,120,120);
            }
            p:nth-child(2){
              width:800px;
              padding-right:0;
              color: rgb(53,53,53);
            }
            p:last-child{

            }
          }
        }
      }
      li:nth-child(7){
        .infoContainer{
          div{
            p{
              width:800px;
            }
          }
        }
      }
      li:nth-child(9){
        .infoContainer{
          div{
            p{
              width:800px;
            }
            p:last-child{
              color: rgb(117,117,117);
            }
          }
        }
      }

    }
  }
</style>
