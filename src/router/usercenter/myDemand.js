//我的需求部分的路由
import Demand from "../../components/demand/demand.vue"
import Wallet from "../../components/wallet/wallet.vue"
import MyWallet from "../../components/wallet/myWallet.vue"
import walletIndex from "../../components/wallet/walletIndex.vue"
import walletAccount from "../../components/wallet/walletAccount.vue"
import accountIndex from "../../components/wallet/accountIndex.vue"
import modifyPwd from "../../components/wallet/modifyPwd.vue"
import reCharge from "../../components/wallet/reCharge.vue"
import withdraw from "../../components/wallet/withdraw.vue"
import payment from "../../components/wallet/payment.vue"
import paymentPwd from "../../components/wallet/paymentPwd.vue"
import payDone from "../../components/wallet/payDone.vue"
import Publishing from "../../components/demand/publish/publishing.vue"
import EditDemand from "../../components/demand/publish/editDemand.vue"
import PublishBtn from "../../components/demand/publish/PublishBtn.vue"
import DraftIndex from "../../components/demand/draft/draftIndex.vue"
import modifyDraft from "../../components/demand/draft/modifyDraft.vue"
import demandDraft from "../../components/demand/draft/demandDraft.vue"
import draftDetail from "../../components/demand/publishment/publishmentDetail.vue"
import Application from "../../components/demand/application/application.vue"
import ApplicationIndex from "../../components/demand/application/applicationIndex.vue"
import ApplicationDetail from "../../components/demand/application/applicationDetail.vue"
import Publishment from "../../components/demand/publishment/publishment.vue"
import PublishmentIndex from "../../components/demand/publishment/publishmentIndex.vue"
import PublishmentDetail from "../../components/demand/publishment/publishmentDetail.vue"
import Collection from "../../components/demand/collection/collection.vue"
import CollectionIndex from "../../components/demand/collection/collectionIndex.vue"
import CollectionDetail from "../../components/demand/collection/collectionDetail.vue"

var myDemand = [
	{
		path:"/yhzx/demand",name:"demand",component:Demand,redirect:"/yhzx/demand/publish",
		children:[
			{
				path:"/yhzx/demand/wallet",component:Wallet,redirect:"/yhzx/demand/wallet/mywallet",
				children:[
					{
						path:"/yhzx/demand/wallet/mywallet",component:MyWallet,redirect:"/yhzx/demand/wallet/mywallet/index",
						children:[
							{
								path:"/yhzx/demand/wallet/mywallet/index",component:walletIndex
							},{
								path:"/yhzx/demand/wallet/mywallet/account",component:walletAccount,redirect:"/yhzx/demand/wallet/mywallet/account/accountIndex",
								children:[
									{
										path:"/yhzx/demand/wallet/mywallet/account/accountIndex",component:accountIndex
									},{
										path:"/yhzx/demand/wallet/mywallet/account/modifyPwd",component:modifyPwd
									}
								]
							},
						]
					},{
						path:"/yhzx/demand/wallet/recharge",component:reCharge,
					},{
						path:"/yhzx/demand/wallet/withdraw",component:withdraw,
					},{
						path:"/yhzx/demand/wallet/payment",component:payment,
					},{
						path:"/yhzx/demand/wallet/paymentPwd",component:paymentPwd,
					},{
						path:"/yhzx/demand/wallet/payDone",component:payDone,
					},
				]
			},{
				path:"/yhzx/demand/publish",component:Publishing,redirect:"/yhzx/demand/publish/index",
				children:[
					{
						path:"/yhzx/demand/publish/index",component:PublishBtn
					},{
						path:"/yhzx/demand/publish/editDemand",component:EditDemand
					}
				]
			},{
				path:"/yhzx/demand/draft",component:DraftIndex,redirect:"/yhzx/demand/draft/index",
				children:[
					{
						path:"/yhzx/demand/draft/index",component:demandDraft
					},{
						path:"/yhzx/demand/draft/modify",component:modifyDraft,name:"modifyDraft"
					},{
						path:"/yhzx/demand/draft/detail",component:PublishmentDetail,
						name:"draftDetail",
					}
				]
			},{
				path:"/yhzx/demand/application",component:Application,redirect:"/yhzx/demand/application/index",
				children:[
					{
						path:"/yhzx/demand/application/index",component:ApplicationIndex,
					},{
						path:"/yhzx/demand/application/detail",component:ApplicationDetail,name:"ApplicationDetail",
					}
				]
			},{
				path:"/yhzx/demand/publishment",component:Publishment,redirect:"/yhzx/demand/publishment/index",
				children:[
					{
						path:"/yhzx/demand/publishment/index",component:PublishmentIndex,
					},{
						path:"/yhzx/demand/publishment/detail",component:PublishmentDetail,
						name:"publishmentDetail",
					}
				]
			},{
				path:"/yhzx/demand/collection",component:Collection,redirect:"/yhzx/demand/collection/index",
				children:[
					{
						path:"/yhzx/demand/collection/index",component:CollectionIndex,
					},{
						path:"/yhzx/demand/collection/detail",component:CollectionDetail,
						name:"colletionDetail",
					},
				]
			},
		]
	}

]

function myDemandRouter(){
	return myDemand;
}

export {myDemandRouter}
