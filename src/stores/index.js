import Vue from 'vue'
import Vuex from 'vuex'

// Modules import
import UserModule from 'modules/user'
import DealsModule from 'modules/deal'

Vue.use(Vuex)

const state = {}
const actions = ({})
const mutations = ({})
const getters = ({})

// const modules = {
//   user: userModule,
//   deal: DealModule
// }

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules
})