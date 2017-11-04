/*|公司部分路由开始|*/

import company_content from "../../components/company/company_content.vue"
/*概览页*/
import overview from "../../components/company/overview.vue"

import Company from "../../components/company/company.vue"
import companyIndex from "../../components/company/companyIndex.vue"
import ProjectDetail from "../../components/company/projectDetail.vue"

/*|*公司账号信息*|*/

import companyAccount from "../../components/company/companyAccount/companyAccount.vue"
import editPassword from "../../components/company/companyAccount/editPassword.vue"
import editPasswordSuc from "../../components/company/companyAccount/editPasswordSuc.vue"
import companyAccountIndex from "../../components/company/companyAccount/companyAccountIndex.vue"


/*|*公司基本信息*|*/

import companyInfo from "../../components/company/companyInfo/companyInfo.vue"
import companyInfoIndex from "../../components/company/companyInfo/companyInfoIndex.vue"
import editCompanyInfo from "../../components/company/companyInfo/editCompanyInfo.vue"

/*|*公司认证信息*|*/

import companyConfirm from "../../components/company/companyConfirm/companyConfirm.vue"
import companyConfirmIndex from "../../components/company/companyConfirm/companyConfirmIndex.vue"

/*|*公司组织信息*|*/

import companyOrganiz from "../../components/company/companyOrganiz/companyOrganiz.vue"
import companyOrganizIndex from "../../components/company/companyOrganiz/companyOrganizIndex.vue"

/*|*公司项目信息*|*/

import companyProject from "../../components/company/companyProject/companyProject.vue"
import companyProjectIndex from "../../components/company/companyProject/companyProjectIndex.vue"
import editProject from "../../components/company/companyProject/editProject.vue"
import definedProject from "../../components/company/companyProject/definedProject.vue"
import comProDetail from "../../components/company/companyProject/comProDetail.vue"

/*|*公司团队信息*|*/

import companyTeam from "../../components/company/companyTeam/companyTeam.vue"
import companyTeamIndex from "../../components/company/companyTeam/companyTeamIndex.vue"


//var companyRouterPath="/yhzx/company/companyIndex";
//var companyRouterComponent=Company;
var companyRouterChildren=[
		{
			path:"/yhzx/company",component:company_content,redirect:"/yhzx/company/overview",
			children:[
				{path:"/yhzx/company/overview", component:overview,},
				{
					path:"/yhzx/company/info",component:Company,redirect:"/yhzx/company/info/companyIndex",
					children:[
						{
						    path:"/yhzx/company/info/companyIndex", component:companyIndex
						},
						{
						    path:"/yhzx/company/info/companyAccount", component:companyAccount, redirect: '/yhzx/company/info/companyAccount/index',
						    children:[
						        {
						      	 	path:"/yhzx/company/info/companyAccount/index", component:companyAccountIndex
						        },
						        {
						      		path:"/yhzx/company/info/companyAccount/editPassword", component:editPassword
						        },{
						      		path:"/yhzx/company/info/companyAccount/editPasswordSuc", component:editPasswordSuc
						      	},
		
						    ]
						},
					    {
						    path:"/yhzx/company/info/companyInfo", component:companyInfo, redirect:"/yhzx/company/info/companyInfo/index",
						    children:[
						        {
						       		path:"/yhzx/company/info/companyInfo/index", component:companyInfoIndex,name:'companyInfoIndex'
						       	},
						      	{
						      		path:"/yhzx/company/info/companyInfo/editCompanyInfo",component:editCompanyInfo
						      	}
						    ]
					    },
					    {
						    path:"/yhzx/company/info/companyConfirm", component:companyConfirm, redirect:"/yhzx/company/info/companyConfirm/index",
						    children:[
						      {path:"/yhzx/company/info/companyConfirm/index", component:companyConfirmIndex}
						      ]
						},
					    {
						    path:"/yhzx/company/info/companyOrganiz", component:companyOrganiz, redirect:"/yhzx/company/info/companyOrganiz/index",
						    children:[
						      {path:"/yhzx/company/info/companyOrganiz/index", component:companyOrganizIndex}
						      ]
						},
					    {
						    path:"/yhzx/company/info/companyProject", component:companyProject, redirect:"/yhzx/company/info/companyProject/index",
						    children:[
						        {
						        	path:"/yhzx/company/info/companyProject/index", component:companyProjectIndex},
						        {
						      	    path:"/yhzx/company/info/companyProject/editProject/:id",component:editProject,name:'editProject'
						      	},
						        {
						      		path:"/yhzx/company/info/companyProject/definedProject",component:definedProject
						        },
						        {
						      		path:"/yhzx/company/info/companyProject/detail",component:comProDetail,
						      	 	name:"comProDetail",
						      	},
		
						    ]
					  	},
						{
						    path: "/yhzx/company/info/companyTeam", component: companyTeam, redirect: "/yhzx/company/info/companyTeam/index",
						    children: [
						        {
						        	path: "/yhzx/company/info/companyTeam/index", component: companyTeamIndex
						        }
						    ]
						}
					]
				}
			]
			
		}
  ];
/*|公司部分路由结束|*/

function companyRouter() {

  return companyRouterChildren

}
export {companyRouter}
