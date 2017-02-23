import * as types from './mutation-types'

export default {
  [types.SET_REPRESENTATIVES] (state, reps) {
    state.apiData.representatives = reps
  },
  [types.SET_REP_LEVELS] (state, levels) {
    state.apiData.levels = levels
  },
  [types.SET_COMPOSITION_FED] (state, composition) {
    state.apiData.composition.federal = composition
  },
  [types.SET_COMPOSITION_STATE] (state, composition) {
    state.apiData.composition.state = composition
  },
  // [types.SET_MAP_FEDERAL] (state, { map }) {
  //   state.apiData.districtMaps.usHouse = map
  // },
  // [types.SET_MAP_STATE_H] (state, { map }) {
  //   state.apiData.districtMaps.stateHouse = map
  // },
  // [types.SET_MAP_STATE_S] (state, { map }) {
  //   state.apiData.districtMaps.stateSenate = map
  // },
  [types.SET_USER_LOCATION] (state, location) {
    state.locationData.location = location
  },
  [types.SET_USER_ADDRESS] (state, addressString) {
    state.locationData.address = addressString
  }
}
