/*团队部分路由*/
import team_content from "../../components/company/company_content.vue"
/*概览页*/
import overview from "../../components/company/overview.vue"

import Team from "../../components/team/team.vue"
import teamIndex from "../../components/team/teamIndex.vue"

import teamAccount from "../../components/team/teamAccount/teamAccount.vue"
import teamAccountIndex from "../../components/team/teamAccount/teamAccountIndex.vue"
import editTeamPwd from "../../components/team/teamAccount/editTeamPassword.vue"

import teamInfo from "../../components/team/teamInfo/teamInfo.vue"
import teamInfoIndex from "../../components/team/teamInfo/teamInfoIndex.vue"
import editTeamInfo from "../../components/team/teamInfo/editTeamInfo.vue"

import teamOrganiz from "../../components/team/teamOrganiz/teamOrganiz.vue"
import teamOrganizIndex from "../../components/team/teamOrganiz/teamOrganizIndex.vue"
import defineCompany from "../../components/team/teamOrganiz/defineCompany.vue"

import teamProject from "../../components/team/teamProject/teamProject.vue"
import teamProjectIndex from "../../components/team/teamProject/teamProjectIndex.vue"
import editProject from "../../components/team/teamProject/editProject.vue"
import definedProject from "../../components/team/teamProject/definedProject.vue"
import TeamProDetail from "../../components/team/teamProject/teamProDetail.vue"

var teamRouterPath="/yhzx/team";
var teamRouterComponent=Team;
var teamRouterChildren=[
	{
		path:"/yhzx/team",component:team_content,redirect:"/yhzx/team/overview",
		children:[
			{path:"/yhzx/team/overview", component:overview,},
			{
				path:"/yhzx/team/info",component:Team,redirect:"/yhzx/team/info/teamIndex",
				children:[
					{
						path:"/yhzx/team/info/teamIndex", component:teamIndex,
			
					},
					{
						path:"/yhzx/team/info/teamAccount",component:teamAccount,redirect:"/yhzx/team/info/teamAccount/teamAccountIndex",
						children:[
							{
								path:"/yhzx/team/info/teamAccount/teamAccountIndex",component:teamAccountIndex
							},{
								path:"/yhzx/team/info/teanAccount/editTeamPwd",component:editTeamPwd
							}
						]
					},
					{
						path:"/yhzx/team/info/teamInfo",component:teamInfo,redirect:"/yhzx/team/info/teamInfo/teamInfoIndex",
						children:[
							{
								path:"/yhzx/team/info/teamInfo/teamInfoIndex",component:teamInfoIndex
							},{
								path:"/yhzx/team/info/teamInfo/editTeamInfo",component:editTeamInfo
							}
						]
					},
					{
						path:"/yhzx/team/info/teamOrganiz",component:teamOrganiz,redirect:"/yhzx/team/info/teamOrganiz/teamOrganizIndex",
						children:[
							{
								path:"/yhzx/team/info/teamOrganiz/teamOrganizIndex",component:teamOrganizIndex
							},{
								path:"/yhzx/team/info/teamOrganiz/defineCompany",component:defineCompany
							}
						]
					},
					{
						path:"/yhzx/team/info/teamProject",component:teamProject,redirect:"/yhzx/team/info/teamProject/teamProjectIndex",
						children:[
							{
								path:"/yhzx/team/info/teamProject/teamProjectIndex",component:teamProjectIndex
							},{
								path:"/yhzx/team/info/teamProject/editProject/:id",component:editProject,name:'editTeamProject'
							},{
								path:"/yhzx/team/info/teamProject/definedProject",component:definedProject
							},{
								path:"/yhzx/team/info/teamProject/detail",component:TeamProDetail,
								name:"TeamProDetail",
							}
						]
					}
				]
			}
		]
		
	}


]

function teamRouter() {

  return teamRouterChildren

}
export {teamRouter}
