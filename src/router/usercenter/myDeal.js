import deal from "../../components/deal/deal.vue"
import Wallet from "../../components/wallet/wallet.vue"
import MyWallet from "../../components/deal/wallet/myWallet.vue"
import walletIndex from "../../components/deal/wallet/walletIndex.vue"
import walletAccount from "../../components/deal/wallet/walletAccount.vue"
import accountIndex from "../../components/deal/wallet/accountIndex.vue"
import modifyPwd from "../../components/deal/wallet/modifyPwd.vue"
import reCharge from "../../components/deal/wallet/reCharge.vue"
import withdraw from "../../components/deal/wallet/withdraw.vue"
import payment from "../../components/deal/wallet/payment.vue"
import paymentPwd from "../../components/deal/wallet/paymentPwd.vue"
import payDone from "../../components/deal/wallet/payDone.vue"
/*以上是钱包*/
import sendDealIndex from "../../components/deal/sendDeal/sendDealIndex.vue"
import sendDeal from "../../components/deal/sendDeal/sendDeal.vue"
import sendDealInfo from "../../components/deal/sendDeal/sendDealInfo.vue"
import editSendDeal from "../../components/deal/sendDeal/editSendDeal.vue"
/*以上是我发送的协议*/
import acceptDealIndex from "../../components/deal/acceptDeal/acceptDealIndex.vue"
import acceptDeal from "../../components/deal/acceptDeal/acceptDeal.vue"
import acceptDealInfo from "../../components/deal/acceptDeal/acceptDealInfo.vue"
import editAcceptDeal from "../../components/deal/acceptDeal/editAcceptDeal.vue"
/*以上是我接受的协议*/
import draftingDealIndex from "../../components/deal/draftingDeal/draftingDealIndex.vue"
import draftingDeal from "../../components/deal/draftingDeal/draftingDeal.vue"
import editDraftingDeal from "../../components/deal/draftingDeal/editDraftingDeal.vue"
/*以上是起草协议*/
import outlineDealIndex from "../../components/deal/outlineDeal/outlineDealIndex.vue"
import outlineDeal from "../../components/deal/outlineDeal/outlineDeal.vue"
import outlineDealInfo from "../../components/deal/outlineDeal/outlineDealInfo.vue"
import editOutlineDeal from "../../components/deal/outlineDeal/editOutlineDeal.vue"
var dealRouterChildren=[
  {
    path:"/yhzx/deal",name:"deal",component:deal,redirect:"/yhzx/deal/sendDealIndex",
    children:[
      {
				path:"/yhzx/deal/wallet",component:Wallet,redirect:"/yhzx/deal/wallet/mywallet",
				children:[
					{
						path:"/yhzx/deal/wallet/mywallet",component:MyWallet,redirect:"/yhzx/deal/wallet/mywallet/index",
						children:[
							{
								path:"/yhzx/deal/wallet/mywallet/index",component:walletIndex
							},{
								path:"/yhzx/deal/wallet/mywallet/account",component:walletAccount,redirect:"/yhzx/deal/wallet/mywallet/account/accountIndex",
								children:[
									{
										path:"/yhzx/deal/wallet/mywallet/account/accountIndex",component:accountIndex
									},{
										path:"/yhzx/deal/wallet/mywallet/account/modifyPwd",component:modifyPwd
									}
								]
							},
						]
					},{
						path:"/yhzx/deal/wallet/recharge",component:reCharge,
					},{
						path:"/yhzx/deal/wallet/withdraw",component:withdraw,
					},{
						path:"/yhzx/deal/wallet/payment",component:payment,
					},{
						path:"/yhzx/deal/wallet/paymentPwd",component:paymentPwd,
					},{
						path:"/yhzx/deal/wallet/payDone",component:payDone,
					},
				]
			},
      /*以上是钱包*/
      {
        path:"/yhzx/deal/sendDealIndex",name:"sendDealIndex",component:sendDealIndex,redirect:"/yhzx/deal/sendDealIndex/sendDeal",
        children:[
          {path:"/yhzx/deal/sendDealIndex/sendDeal",name:"sendDeal",component:sendDeal,},
          {path:"/yhzx/deal/sendDealIndex/sendDealInfo",name:"sendDealInfo",component:sendDealInfo,},
          {path:"/yhzx/deal/sendDealIndex/editSendDeal",name:"editSendDeal",component:editSendDeal,}
        ]
      },
      {
        path:"/yhzx/deal/acceptDealIndex",name:"acceptDealIndex",component:acceptDealIndex,redirect:"/yhzx/deal/acceptDealIndex/acceptDeal",
        children:[
          {path:"/yhzx/deal/acceptDealIndex/acceptDeal",name:"acceptDeal",component:acceptDeal,},
          {path:"/yhzx/deal/acceptDealIndex/acceptDealInfo",name:"acceptDealInfo",component:acceptDealInfo,},
          {path:"/yhzx/deal/acceptDealIndex/editAcceptDeal",name:"editAcceptDeal",component:editAcceptDeal,}
        ]
      },
      {
        path:"/yhzx/deal/draftingDealIndex",name:"draftingDealIndex",
        component:draftingDealIndex,redirect:"/yhzx/deal/draftingDealIndex/draftingDeal",
        children:[
          {
            path:"/yhzx/deal/draftingDealIndex/draftingDeal",name:"draftingDeal",
            component:draftingDeal,
          },
          {
            path:"/yhzx/deal/draftingDealIndex/editDraftingDeal",name:"editDraftingDeal",
            component:editDraftingDeal,
          }
        ]
      },
      {
        path:"/yhzx/deal/outlineDealIndex",name:"outlineDealIndex",component:outlineDealIndex,redirect:"/yhzx/deal/outlineDealIndex/outlineDeal",
        children:[
          {path:"/yhzx/deal/outlineDealIndex/outlineDeal",name:"outlineDeal",component:outlineDeal,},
          {path:"/yhzx/deal/outlineDealIndex/outlineDealInfo",name:"outlineDealInfo",component:outlineDealInfo,},
          {path:"/yhzx/deal/outlineDealIndex/editOutlineDeal",name:"editOutlineDeal",component:editOutlineDeal,}
        ]
      },
    ]
  }
]

function dealRouter() {

  return dealRouterChildren;

}
export {dealRouter}
