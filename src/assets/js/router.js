/*|获取公司部分路由|*/
import {companyRouter} from "../../router/usercenter/company"
/*|获取个人部分路由|*/
import {personalRouter} from "../../router/usercenter/personal"
import {teamRouter} from "../../router/usercenter/team"
import {activateRouter} from "../../router/usercenter/activate"//进入用户中心后没有验证邮箱的页面路由
import {myDemandRouter} from "../../router/usercenter/myDemand"
import {dealRouter} from "../../router/usercenter/myDeal";
//import {myDemandRouter} from "../../router/myDemand"
import {projectDetailRouter} from "../../router/usercenter/projectDetail"
var user = [];
function userRouter() {
  for(var i=0;i<companyRouter().length;i++){
    user.push(companyRouter()[i])
  }
	for(var j=0;j<personalRouter().length;j++){
	    user.push(personalRouter()[j])
	}
  for(var k=0;k<teamRouter().length;k++){
    user.push(teamRouter()[k])
  }
	for(var l=0;l<activateRouter().length;l++){
		user.push(activateRouter()[l])
	}
	for(var m=0;m<myDemandRouter().length;m++){
		user.push(myDemandRouter()[m])
	}
  for(var n=0;n<dealRouter().length;n++){
	  user.push(dealRouter()[n])
  }
  for(let n=0;n<projectDetailRouter().length;n++){
    user.push(projectDetailRouter()[n])
  }//项目信息的详情页
  return user;

}
export {userRouter}

