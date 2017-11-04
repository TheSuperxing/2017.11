<template>
  <div class="companyTeamIndex">
    <h3 class="c-title"><span>{{title}}</span></h3>
    <ul class="team-table">
    	<li class="stateOne" v-if="stateOne">（您尚未有团队认证信息）</li>
	    <li v-for="(item,index) in companyTeamInfo" v-bind:class="{bga:item.cerState,bgb:!item.cerState}">
	    	<span class="team-name">{{item.dealId}}<img src="../../../assets/img/company/Authentication-s.png" v-if="certified[index]"/></span>
	    	<span v-html="innertext[index]"  class="editBtn" @click="certifyTag(index)"></span>
	    </li>
	    
	    <!--<li v-for="(item,index) in teamInfo.uncertified" v-bind:class="bgb">
	    	<span class="team-name">{{item.dealId}}</span>
	    	<span v-html="textb"  class="editBtn" @click="addCer(index)"></span>
	    </li>-->
    
    </ul>
  </div>
</template>

<script>
	import Vue from "vue"
	import {mapState} from "vuex"
  export default {
    name:"companyTeamIndex",
    data:function(){
      return {
        title:"公司团队信息",
        innertext:[],
        certified:[],
        textb:"认证经历",
        bga:"bga",
        bgb:"bgb",
        stateOne:true,
      }
    },
    computed:mapState({
      companyTeamInfo:state=>state.company.companyMessage.companyTeamInfo/*获取vuex数据*/
    }),
    mounted(){
    	var str = JSON.stringify(this.companyTeamInfo);
    	var data = JSON.parse(str);
    	for(var i=0;i<this.companyTeamInfo.length;i++){
    		
    		if(this.companyTeamInfo[i].cerState===true){
					this.innertext.push("取消认证") 
					this.certified.push(true)
				}else{
					this.innertext.push( "添加认证")
					this.certified.push(false)
				}
    	}
    	if(this.companyTeamInfo.length!=0){
    		this.stateOne =false;
    	}
    },
    methods:{
    	certifyTag(index){
    		if(this.companyTeamInfo[index].cerState == true){
    			this.companyTeamInfo[index].cerState = false;
    			this.innertext[index] = "添加认证";
    			this.certified[index] = false;
    		}else{
    			this.companyTeamInfo[index].cerState = true;
    			this.innertext[index]= "取消认证";
    			this.certified[index] = true;
    		}
    		
    		
    	}
    }
  }
</script>

<style lang="scss" scoped="scoped">
$bfColor:#ffffff;
$activeColor: #2eb3cf;
.companyTeamIndex{
	width: 940px;
	padding: 40px;
	min-height: 427px;
	background: $bfColor;
	.stateOne{
		color: #898989;
	}
	.team-table{
		margin-top: 12px;
		padding: 0 20px;
		li{
			height: 54px;
			line-height: 54px;
			font-size: 18px;
			border-bottom: 1px solid #EBEBEB;
			overflow: hidden;
			.team-name{
				display: table-cell;
				float: left;
				vertical-align: middle;
				img{
					margin-left: 10px;
					margin-bottom: 3px;
					vertical-align: middle;
				}
			}
			.editBtn{
				padding-left: 35px;
				float: right;
				cursor: pointer;
			}
			&.bga{
				.editBtn{
					background: url(../../../assets/img/company/Close3.png) no-repeat left center;
				}
					
					color: $activeColor;
				}
			&.bgb{
				.editBtn{
					background: url(../../../assets/img/company/ok2.png) no-repeat left center;
				}
				
				
			}
			
		}
	}
	
}
</style>
