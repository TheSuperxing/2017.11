import Vue from "vue"
import Vuex from "vuex"
import {mapState} from "vuex"
import Personal from "./modules/personal"
import Company from "./modules/company"
import Team from "./modules/team"
import UserState from "./modules/userState"
import MyDeal from "./modules/myDeal"
import Demand from "./modules/demand"
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{

    personal:Personal,
    company:Company,
    team:Team,
    userState:UserState,
    myDeal:MyDeal,
	  demand:Demand,
	  
  }
})
