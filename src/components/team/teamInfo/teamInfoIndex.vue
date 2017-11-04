<template>
  <div class="teamInfoIndex">
    <h3 class="t-title"><span>{{title}}</span></h3>
    <ul class="ci-list">
      <li class="clear">
        <h4>团队标志</h4>
        <div class="logoBox">
        <img src="../../../assets/img/logo/logo02.png" alt="">
        </div>
        <router-link to="/yhzx/team/info/teamInfo/editTeamInfo">
        	<div class="modifyInfo">编辑信息</div>
        </router-link>
         
      </li>
      <li class="clear">
        <h4>团队名称</h4>
        <p >{{basicInfo.teamName}}</p>
       
      </li>
      <!--<li  class="clear">
        <h4>公司地址</h4>
        <p>{{basicInfo.teamAddress}}</p>
      </li>-->
      <li class="clear">
        <h4>团队简介</h4>
        <p v-html="basicInfo.teamDesc" v-if="stateOne.haveteamDesc"></p>
        <p v-if="!stateOne.haveteamDesc">暂无信息</p>
      </li>
      <li  class="clear">
        <h4>团队电话</h4>
        
        <p v-html="basicInfo.teamPhone" v-if="stateOne.haveteamPhone"></p>
        <p v-if="!stateOne.haveteamPhone">暂无信息</p>
      </li>
    </ul>
  </div>
</template>

<script>
	import Vue from "vue"
	import {mapState} from "vuex"
  export default {
    name:"teamInfoIndex",
    data:function(){
      return {
        title:"团队基本信息",
        info:{
        	teamName:'',
        	teamAddress:'',
        	teamDesc:"",
			    teamPhone:"",
        },
        stateOne:{
        	haveteamDesc:true,
        	haveteamPhone:true
        }
        
      }
    },
    computed:mapState({
      basicInfo:state=>state.team.teamMessage.basicInfo
    }),
    mounted(){
    	console.log(this.basicInfo)
    	//将vuex数据取到本组件
    	for(var item in this.basicInfo){
// 			this.contactsss.info.push(this.accountInfo.contacts[i])
				this.info.teamName=this.basicInfo.teamName;
				this.info.teamAddress=this.basicInfo.teamAddress;
				this.info.teamDesc=this.basicInfo.teamDesc;
				this.info.teamPhone=this.basicInfo.teamPhone;
   		}
    	console.log(this.info)

    	if(this.basicInfo.teamDesc.replace(/\s/g,"").length===0){/*两端空格*/
    		this.stateOne.haveteamDesc = false;
    	}else if(this.basicInfo.teamPhone.length===0){
    		this.stateOne.haveteamPhone = false;
    	}
      console.log(this.stateOne)
    }
  }
</script>

<style lang="scss" scoped>
$bfColor:#ffffff;
$activeColor: #02a672;
.teamInfoIndex{
	width:940px; 
  padding:40px 40px 80px 40px;
	&:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;} 
  
  .ci-list{
    padding-left: 30px;
    .clear{
      width:100%;
      /*height:100px;*/
      padding-top:30px;
      
      line-height: 18px;
			&:after{display:block; content:'clear'; clear:both; line-height:0; visibility:hidden;} 
      
      h4{
        float: left;
        height: 28px;
        line-height: 28px;
        font-size: 18px;
        color: #353535;
        margin-right: 90px;
      }
      .logoBox{
      	width:100px; height: 100px;
      	border:1px solid #e0e0e0;
      	float: left;
      	overflow: hidden;
      }
      img{
        
      }
      p{
        float: left;
        font-size: 14px;
        line-height: 28px;
        color: #666666;
        text-align: justify;
        width: 640px;
      }
      .modifyInfo{
        float: right;
        color: $activeColor; 
        padding-left:20px;
        background: url(../../../assets/img/team/icon_green-edit.png) left center no-repeat;
      }
    }
    li:nth-child(1){
      height:130px;
      line-height: 100px;
      h4{
      	height: 100px;
      	line-height: 100px;
      }
    }
  }
}
  
</style>




































