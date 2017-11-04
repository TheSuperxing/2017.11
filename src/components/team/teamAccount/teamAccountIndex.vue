<template>
  <div class="teamAccountIndex">
    <h3 class="t-title"><span>{{title}}</span></h3>
    <ul class="cA-BasicInfo">
      <li class="clearfix">
        <h4 class="info-left"><img src="../../../assets/img/connect/zcshijian.png"/>注册时间</h4>
        <p class="registerTime">{{accountInfo.registerTime}}</p>
        <div style="clear: both"></div>
      </li>
      <li class="clearfix">
        <h4 class="info-left"><img src="../../../assets/img/connect/zcmail.png"/>登录邮箱</h4>
        <p class="teamMail">{{accountInfo.teamMail}}</p>
        <div style="clear: both"></div>
      </li>
      <li class="clearfix">
        <h4 class="info-left"><img src="../../../assets/img/connect/zcmima.png"/>登录密码</h4>
        <p class="teamPassword">{{accountInfo.passwords}}</p>
        <router-link to="/yhzx/team/info/teanAccount/editTeamPwd">
          <span class="editPwd" >
             修改密码
          </span>
        </router-link>
        <div style="clear: both"></div>
      </li>
    </ul>

    <ul class="cA-contactInfo" v-if="!ediCtrShow">
      <li v-for="item in accountInfo.contacts" class="contactor">
        <dl>
          <dt><img src="../../../assets/img/team/icon_green_person_112.png" /></dt>
          <dd>
            <p class="contactN" v-html="item.name"></p>
            <p class="contactP">{{item.phoneNum}}</p>
          </dd>
        </dl>
      </li>
      <p class="editCtr" v-if="!ediCtrShow">
          <span class="editPwd" @click="toEditCtr">
             	编辑信息
          </span>
      </p>
      
    </ul>
    <!--编辑联系人状态栏   点击上面编辑信息显示出来-->
    <ul class="ediCtrBox" v-if="ediCtrShow">
    	<li v-for="item in contactsss.info" class="contactor">
        <dl>
          <dt><img src="../../../assets/img/team/icon_green_person_112.png" /></dt>
          <dd>
            <p class="contactN"><input v-model="item.name" class="input1"/></p>
            <p class="contactP"><input v-model="item.phoneNum"/></p>
          </dd>
        </dl>
      </li>
      <div class="btnBox">  
				<span class="cancelBtn" @click="canlceEdit">取消</span>
				<span class="confirmBtn" @click="ediContactors">确认</span>
			</div>
    </ul>
  </div>
</template>
<script>
	import Vue from "vue"
	import {mapState} from "vuex"
  export default {
    name:"teamAccountIndex",
    data:function(){
      return {
        title:"团队帐号信息",
        contactsss:{
        	info:[
        	{
        		name:"",phoneNum:""
        	},{
        		name:"",phoneNum:""
        	}
        	]
        },
        ediCtrShow:false
      }
    },
    computed:mapState({
      accountInfo:state=>state.team.teamMessage.accountInfo
    }),
    mounted(){
    	
   		for(var i=0;i<this.accountInfo.contacts.length;i++){
// 			this.contactsss.info.push(this.accountInfo.contacts[i])
				this.contactsss.info[i].name=this.accountInfo.contacts[i].name;
				this.contactsss.info[i].phoneNum=this.accountInfo.contacts[i].phoneNum;
   		}
   		console.log(this.contactsss.info);
   		
    },
    methods:{
    	toEditCtr(){
    		this.ediCtrShow = true;
    		
    	},
    	canlceEdit(){
    		for(var i=0;i<this.accountInfo.contacts.length;i++){
					this.contactsss.info[i].name=this.accountInfo.contacts[i].name;
					this.contactsss.info[i].phoneNum=this.accountInfo.contacts[i].phoneNum;
	   		}
    		this.ediCtrShow = false;
    		
    	},
    	ediContactors(){
//  		Vue.set(this.accountInfo,'contacts',this.contactsss.info)
				for(var i=0;i<this.contactsss.info.length;i++){
		// 			this.contactsss.info.push(this.accountInfo.contacts[i])
					this.accountInfo.contacts[i].name=this.contactsss.info[i].name;
					this.accountInfo.contacts[i].phoneNum=this.contactsss.info[i].phoneNum;
				}
    		this.ediCtrShow = false;
//			this.$store.commit("ediContactors",this.contactsss.info)
				return false;
    	}
    },
    updated(){
//  	console.log(this.accountInfo)
//  	console.log(this.contactsss)
    }
  }
</script>
<style lang="scss" scoped="scoped">
$activeColor: #02a672;
$bfColor:#ffffff;

.ediCtrBox{
	padding-top: 32px;
	padding-bottom: 30px;
	overflow: hidden;
	
	background: $bfColor;
	overflow: hidden;
	.contactor{
    width: 260px;
    height: 104px;
    /*padding: 30px;*/
    background: #f7f7f7;
    border-radius: 5px;
    float: left;
    margin-right: 40px;
    dl{
    	&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
    	/*height: 100%;*/
        dt{
        	height: 74px;
        	float:left;	
        	margin-top: 30px;
          margin-left: 30px;
	        img{
	            width: 37px;
	            height: 42px;
	            float: left;
	            margin-right: 30px;
	        }
        }
        dd{
            float: left;
            width: 130px;
            height: 104px;
            .contactN,.contactP{
            	width: 100%;
            	height: 34px;
            	line-height: 33px;
            	margin-top: 10px;
            	border-bottom: 1px solid #b6b6b6;
            	input{
            		width: 100%;
            		color: #B6B6B6;
            		font-size: 14px;
            		text-indent: 8px;
            		
            	}
                

            }
            
        }
    }
	}
	.btnBox{
		height: 40px;
		width: 330px;
		float: left;
		display: flex;
		justify-content: space-between;
		overflow: hidden;
		margin-top: 40px;
		margin-left: 161px;
		span{
			float: left;
			/*margin-right: 50px;*/
			width: 140px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			vertical-align: middle;
			font-size: 18px;
			border-radius: 5px;
			cursor: pointer;
	
			&.cancelBtn{
				border: 1px solid #bfcbd9;
	
				&:hover{
					border: 1px solid $activeColor;
					color: $activeColor;
				}
			}
			&.confirmBtn{
				background-image: url("../../../assets/img/team/icon_green_next_nor.png") ;
				color: #FFFFFF;
				&:hover{
					filter:alpha(opacity=80);       /* IE */
				  -moz-opacity:0.8;              /* 老版Mozilla */
				  -khtml-opacity:0.8;              /* 老版Safari */
				   opacity: 0.8;           /* 支持opacity的浏览器*/
				}
			}
		}
	}
}
	
	



















</style>
