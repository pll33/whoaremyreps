import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  locationInput: {
    placeholder: 'Your address',
    locateError: false,
    searchType: 'search',
    value: ''
  },
  apiData: {
    representative: {},
    levels: {
      federal: [], // federal level: president, vp, congress
      state: [], // state level: governor, lt governor, state reps
      local: [], // local level:
      other: []
    },
    districtMaps: {
      usHouse: {},
      stateHouse: {},
      stateSenate: {}
    }
  },
  locationData: {
    position: {},
    address: ''
  }
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store
