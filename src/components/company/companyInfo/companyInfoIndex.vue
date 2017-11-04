<template>
  <div class="companyInfoIndex">
    <h3 class="c-title"><span>{{title}}</span></h3>
    <ul class="ci-list">
      <li class="clear">
        <h4>公司标识</h4>
        <div class="logoBox">
        <img src="../../../assets/img/logo/logo02.png" alt="">
        </div>
        <router-link to="/yhzx/company/info/companyInfo/editCompanyInfo">
        	<div class="modifyInfo">编辑信息</div>
        </router-link>
        
      </li>
      <li class="clear">
        <h4>公司名称</h4>
        <p v-if="stateOne.haveCompanyName">{{basicInfo.companyName}}</p>
        <p v-if="!stateOne.haveCompanyName">暂无信息</p>
      </li>
      <li  class="clear">
        <h4>公司地址</h4>
        <p v-if="stateOne.haveCompanyAddress">{{basicInfo.companyAddress}}</p>
        <p v-if="!stateOne.haveCompanyAddress">暂无信息</p>
      </li>
      <li class="clear">
        <h4>公司简介</h4>
        <p v-html="basicInfo.companyDesc" v-if="stateOne.haveCompanyDesc"></p>
        <p v-if="!stateOne.haveCompanyDesc">暂无信息</p>
      </li>
      <li  class="clear">
        <h4>公司电话</h4>
        <p v-html="basicInfo.companyPhone" v-if="stateOne.haveCompanyPhone"></p>
        <p v-if="!stateOne.haveCompanyPhone">暂无信息</p>
      </li>
    </ul>
  </div>
</template>

<script>
	import Vue from "vue"
	import {mapState} from "vuex"
  export default {
    name:"companyInfoIndex",
    data:function(){
      return {
        title:"公司基本信息",
        info:{
        	companyName:'',
        	companyAddress:'',
        	companyDesc:"",
			    companyPhone:"",
        },
        stateOne:{
        	haveCompanyName:true,
        	haveCompanyAddress:true,
        	haveCompanyDesc:true,
        	haveCompanyPhone:true
        }
        
      }
    },
    computed:mapState({
      basicInfo:state=>state.company.companyMessage.basicInfo
    }),
    mounted(){
    	console.log(this.basicInfo)
    	//将vuex数据取到本组件
    	for(var item in this.basicInfo){
// 			this.contactsss.info.push(this.accountInfo.contacts[i])
				this.info.companyName=this.basicInfo.companyName;
				this.info.companyAddress=this.basicInfo.companyAddress;
				this.info.companyDesc=this.basicInfo.companyDesc;
				this.info.companyPhone=this.basicInfo.companyPhone;
   		}
    	console.log(this.info)
    	
    	if(this.basicInfo.companyName.replace(/(^\s*)|(\s*$)/g, "").length===0){
    		this.stateOne.haveCompanyName = false;
    	}
    	if(this.basicInfo.companyAddress.replace(/(^\s*)|(\s*$)/g, "").length===0){
    		this.stateOne.haveCompanyAddress = false;
    	}
    	if(this.basicInfo.companyDesc.replace(/(^\s*)|(\s*$)/g, "").length===0){
    		this.stateOne.haveCompanyDesc=false;
    		console.log(1)
    	}
    	if(this.basicInfo.companyPhone.replace(/(^\s*)|(\s*$)/g, "").length===0){
    		this.stateOne.haveCompanyPhone=false;
    		console.log(1)
    	}

    	
    }
  }
</script>

<style lang="scss" scoped>
$activeColor: #2eb3cf;
$bfColor:#ffffff;
.companyInfoIndex{
	width:940px;
  padding:40px;
  .ci-list{
    padding-left: 30px;
    li{
      width:100%;
      /*height:100px;*/
      padding-top:30px;
      line-height: 18px;
      overflow: hidden;
      h4{
        float: left;
        font-size: 18px;
        line-height: 24px;
        color: #353535;
        margin-right: 90px;
      }
      .logoBox{
      	width:100px; height: 100px;
      	border:1px solid #e0e0e0;
      	float: left;
      	overflow: hidden;
      }
      
      p{
        float: left;
        font-size: 14px;
        color: #666666;
        text-align: justify;
        width: 640px;
        line-height: 24px;
      }
      .modifyInfo{
        float: right;
        color: #2eb3cf;
        padding-left:20px;
        background: url("../../../assets/img/company/edit.png") left center no-repeat;
      }
    }
    li:nth-child(1){
      height:130px;
      line-height: 100px;
      
    }
  }
}
  
</style>




































