import { createStore } from 'vuex'
import userModule from './modules/user'
import dealModule from './modules/deal'

export default createStore({
  modules: {
    user: userModule,
    deal: dealModule
  }
})