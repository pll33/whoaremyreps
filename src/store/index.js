import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  apiData: {
    representatives: {},
    executives: {},
    levels: {
      all: [],
      federal: [], // federal level: president, vp, congress
      state: [], // state level: governor, lt governor, state reps
      local: [], // local level:
      other: []
    },
    // districtMaps: {
    //   usHouse: {},
    //   stateHouse: {},
    //   stateSenate: {}
    // },
    composition: {
      federal: {
        head: '', // political party for head of government
        senate: {},
        house: {}
      },
      state: {
        name: '', // legislature name
        head: '', // political party for head of government
        upper: {
          name: '', // chamber name
          majority: '',
          parties: {}
        },
        lower: {
          name: '',
          majority: '',
          parties: {}
        }
      }
    }
  },
  locationData: {
    abbreviation: '',
    geo: '',
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
