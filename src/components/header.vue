<template>
  <div class="header">
    <div class="headerTop">
      <h2>{{petName}}</h2>
      <ul class="topRight">
        <li>
          <p v-on:mouseover="outTogOver(tog)" v-on:mouseout="outTogOut(tog)">
            <span>设置</span>
          </p>
          <div class="tuichu" v-if="tog.value">
            <span></span>
            <p><em>退出登录</em></p>
          </div>
        </li>
        <li>
          <p>
            <span>消息</span>
            <span v-cloak>（{{msgNum}}）</span>
          </p>
        </li>
      </ul>
    </div>

    <div class="headerNavBg" v-if="user.userState==0">
      <div class="headerNav" >
        <h1>LOGO</h1>
        <ul class="navlist" v-bind:class="{'comStyle':user.userState==0}">
          <li class="primary" v-for="(item,_index) in nav"><router-link :to="item.rout[0]" @click="getState">{{item.text}}</router-link></li>
        	<li class="primary" >
        		<div  @click="redirect"><router-link to="/yhzx">用户中心</router-link></div>

        		<ul class="userNav">
		        	<li><router-link to="/yhzx/company/info">我的资料</router-link></li>
		        	<li><router-link to="/yhzx/demand">我的需求</router-link></li>
		        	<li><router-link to="/yhzx/deal">我的协议</router-link></li>
		        </ul>
        	</li>
        </ul>

      </div>
    </div>

    <div class="headerNavBg" v-if="user.userState==1">
      <div class="headerNav">
        <h1>LOGO</h1>
        <ul class="navlist" v-bind:class="{'teamStyle':user.userState==1}">
          <li class="primary" v-for="(item,_index) in nav"><router-link :to="item.rout[1]" @click="getState">{{item.text}}</router-link></li>
        	<li class="primary">
        		<div  @click="redirect"><router-link to="/yhzx">用户中心</router-link></div>
        		<ul class="userNav">
		        	<li><router-link to="/yhzx/team/info">我的资料</router-link></li>
		        	<li><router-link to="/yhzx/demand">我的需求</router-link></li>
		        	<li><router-link to="/yhzx/deal">我的协议</router-link></li>
		        </ul>
        	</li>
        </ul>
      </div>
    </div>

    <!--个人状态的导航-->
    <div class="headerNavBg"  v-if="user.userState==2">
      <div class="headerNav" >
        <h1>LOGO</h1>
        <ul class="navlist" v-bind:class="{'personStyle':user.userState==2}">
          <li class="primary" v-for="(item,_index) in nav"><router-link :to="item.rout[2]">{{item.text}}</router-link></li>
        	<li class="primary" >
        		<div  @click="redirect"><router-link to="/yhzx">用户中心</router-link></div>
        		<ul class="userNav">
		        	<li><router-link to="/yhzx/personal/info">我的资料</router-link></li>
		        	<li><router-link to="/yhzx/demand">我的需求</router-link></li>
		        	<li><router-link to="/yhzx/deal">我的协议</router-link></li>
		        </ul>
        	</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import {mapState} from "vuex"
  import router from "../router"
  export default {
    name: 'hello',
    data: function () {
      return {
        msgNum: "5",
        tog:{value:false},
        nav: [{
          text: "首页",
          rout: ["/index","/index","/index"],
          active: false
        }, {
          text: "交易大厅",
          rout: ["/trading","/trading","/trading"],
          active: false
        },],

       	comStyle:true,
       	teamStyle:true,
        /*导航原始数据*/

        /*导航颜色切换原始状态*/
       	state:"",
      }
    },
    computed:mapState({
	      petName:state=>state.personal.personalMessage.baseInfo.petName,
	      user:state=>state.userState.user

	    }),

	  mounted(){

				this.user.userState = sessionStorage.getItem("state");


	  },
	  updated(){
	  	this.user.userState = sessionStorage.getItem("state");
	  },
    methods: {

				/*nav单击切换颜色*/
	      outTogOver:function (tog) {
	        Vue.set(tog,"value",true)
	      },
	      outTogOut:function (tog) {
	        Vue.set(tog,"value",false)
	      },
	      /*鼠标滑过 退出登录的显示隐藏*/

	     getState(){
	     	this.state = sessionStorage.getItem("state");
	     },

	     redirect(){
	     	//console.log(this.user.userState)

				switch (this.user.userState){
					case '0':
						router.push("/yhzx/company/overview")
						break;
					case '1':
						router.push("/yhzx/team/overview")
						break;
					case '2':
						router.push("/yhzx/personal/overview")
						break;
					default:
						break;
				}
				 event.stopPropagation();
			}
    },



 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .header{
    width:100%;
    min-width: 1200px;
    height: 109px;
    position: fixed;
    top: 0;
    left:0;
    z-index: 100;
    .headerTop{
      height: 39px;
      background: #323333;
      color: #e1e1e1;
      h2{
        font-size:14px;
        float: left;
        padding-left:50px;
        line-height: 40px;
      }
      .topRight{
        float: right;
        padding-right:39px;
        li{
          float: left;
          line-height: 40px;
          height: 40px;
          p{
            display: inline-block;
            padding-left:37px;
            span:nth-child(2){
              color: #2eb3df;
            }
          }
        }
        li:nth-child(1){
          position: relative;
          p{
            background: url("../assets/img/top/shezhi.png") left center no-repeat;
            span{
              padding-right:35px;
            }
          }
          .tuichu{
            width: 140px;
            height: 44px;
            background: #ffffff;
            margin-left:-35px;
            position: absolute;
            bottom: -49px;
            border-radius: 10px;
            span{
              display: inline-block;
              height: 25px;
              width: 25px;
              background: #fff;
              transform: rotate(45deg);
              border:1px solid #eee;
              position: absolute;
              top: -8px;
              left: 33px;
              z-index: 20;
            }
            P{
              width: 138px;
              height: 42px;
              padding:0;
              color: #535353;
              position: absolute;
              z-index: 30;
              background: #fff;
              padding-left:30px;
              font-size: 14px;
              line-height: 44px;
              em{
                background: url("../assets/img/top/tuichu.png") left center no-repeat ;
                padding-left:25px;
              }
            }
          }
        }
        li:nth-child(2){
          p{
            background: url("../assets/img/top/xiaoxi.png") left center no-repeat;
          }
        }
      }
    }

    /*以上是top*/
    .headerNavBg{
      width:100%;
      height: 70px;
      background: #FFFFFF;
      border-bottom:1px solid #e0e0e0;

      .headerNav{
        width: 1200px;
        height:70px;
        position: relative;
        margin: 0 auto;
        h1{
          float: left;
          line-height: 70px;
          font-size:40px;
          color: #2eb3df;
          position: absolute;
          top: 0;
          left:0;

        }

        .comStyle{
        	.primary{
        		a{
				  		&.router-link-active{
				      		color: #2EB3CF;

				      	}
				  	}
        	}


			  }
			  .teamStyle{
			  	.primary{
			  		a{

				  		&.router-link-active{
					  		color: #02a672;

					  	}
				  	}
			  	}


			  }
			  .personStyle{
			  	.primary{
			  		a{
				  		&.router-link-active{
					  		color: rgb(242,117,25);
		
					  	}
				  	}
			  	}

			  }
        .navlist{
          position: absolute;
          right: 0;
          .primary{
            float: left;
            height:70px;
            line-height: 70px;

            position:relative;
            cursor: pointer;
            &:hover{
            	background: rgba(200,200,200,.2);
							.userNav{
								display: block;
							}
            }

            a{
              width: 100%;
              padding:0 50px 0 50px;
              color: #353535;
              text-decoration: none;
              display: block;
              height:70px;
              line-height: 70px;
              span{
                display: block;
                height:70px;
                border-bottom: 2px solid #f7f9fc;
              }
            }
            .userNav{
            	background: rgba(200,200,200,.5);
            	position: absolute;
            	left: 0;
            	top: 70px;
            	display: none;
	          	li{
	          		height: 40px;
	          		line-height: 40px;

	          		a{
	          			height: 100%;
	          			padding:0 50px 0 50px;
	          			width: 100%;
	          			display: inline-block;
	          			line-height: 40px;
	          			text-align: center;
	          		}
	          		&:hover{
	          			background: rgba(200,200,200,.8);
	          		}
	          	}
	          }
          }

         a.router-link-active{
            /*color: #2eb3df;*/
            background: -webkit-linear-gradient(top,rgba(109,125,155,0),rgba(109,125,155,.3)); /* Safari 5.1 - 6 */
					  background: -o-linear-gradient(top,rgba(109,125,155,0),rgba(109,125,155,.3)); /* Opera 11.1 - 12*/
					  background: -moz-linear-gradient(top,rgba(109,125,155,0),rgba(109,125,155,.3)); /* Firefox 3.6 - 15*/
					  background: linear-gradient(to top, rgba(109,125,155,0), rgba(109,125,155,.3)); /* 标准的语法 */
            span{
              border-bottom-color: #2eb3df;
            }
          }
        }

      }
    }
  }


</style>
