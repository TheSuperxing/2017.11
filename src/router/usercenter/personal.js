/*|个人部分路由开始|*/
import personal_content from "../../components/personal/personal_content.vue"
import personal from "../../components/personal/personal.vue"
/*概览页*/
import overview from "../../components/personal/overview.vue"

import personalIndex from "../../components/personal/personalIndex.vue"
/*|基础信息开始|*/
import personalBasicInfo from "../../components/personal/basicInfo/personalBasicInfo.vue"
/*|基础信息结束|*/
/*|教育背景开始|*/
import educationIndex from "../../components/personal/education/educationIndex.vue"
/*|教育背景结束|*/
/*|工作经历开始|*/
import workExperienceIndex from "../../components/personal/workExperience/workExperienceIndex.vue"
/*|工作经历结束|*/
/*|项目经历开始|*/
import projectExperienceIndex from "../../components/personal/projectExperience/projectExperienceIndex.vue"
/*|项目经历结束|*/
/*|团队经历开始|*/
import teamExperienceIndex from "../../components/personal/teamExperience/teamExperienceIndex.vue"
/*|团队经历结束|*/
/*|执业资格开始|*/
import certificateIndex from "../../components/personal/certificate/certificateIndex.vue"
/*|执业资格结束|*/
/*|职称信息开始|*/
import jobInfoIndex from "../../components/personal/jobInfo/jobInfoIndex.vue"
/*|职称信息结束|*/
/*|所获奖励开始|*/
import awardIndex from "../../components/personal/award/awardIndex.vue"
/*|所获奖励结束|*/
/*|论文专利开始|*/
import paperAndPatentIndex from "../../components/personal/paperAndPatent/paperAndPatentIndex.vue"
/*|论文专利结束|*/
/*|论文专利开始|*/
import languageAndSoftwareIndex from "../../components/personal/languageAndSoftware/otherSkillIndex.vue"
/*|论文专利结束|*/

var personalRouterChildren=[
  {
  	path:"/yhzx/personal",component:personal_content,redirect:"/yhzx/personal/overview",
  	children:[
  		{path:"/yhzx/personal/overview", component:overview,},
	  	{path:"/yhzx/personal/info",component:personal,redirect:"/yhzx/personal/info/personalIndex",
		    children:[
		    	
		      {path:"/yhzx/personal/info/personalIndex", component:personalIndex},
		      {path:"/yhzx/personal/info/basicInfo", component:personalBasicInfo},
		      {path:"/yhzx/personal/info/educationIndex", component:educationIndex},
		      {path:"/yhzx/personal/info/workExperienceIndex", component:workExperienceIndex},
		      {path:"/yhzx/personal/info/projectExperienceIndex", component:projectExperienceIndex},
		      {path:"/yhzx/personal/info/teamExperienceIndex", component:teamExperienceIndex},
		      {path:"/yhzx/personal/info/certificateIndex", component:certificateIndex},
		      {path:"/yhzx/personal/info/jobInfoIndex", component:jobInfoIndex},
		      {path:"/yhzx/personal/info/awardIndex", component:awardIndex},
		      {path:"/yhzx/personal/info/paperAndPatentIndex", component:paperAndPatentIndex},
		      {path:"/yhzx/personal/info/languageAndSoftwareIndex", component:languageAndSoftwareIndex},
		    ]
		  }
  	]
    

  },

  ];

/*|个人部分路由结束|*/
function personalRouter() {

  return personalRouterChildren

}
export {personalRouter}
