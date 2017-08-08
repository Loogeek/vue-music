import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    plugins: [createLogger()],
    strict: process.env.NODE_ENV !== 'production'
})
