import * as types from './mutation-types'

export default {
  [types.SET_REPRESENTATIVES] (state, reps) {
    state.apiData.representatives = reps
  },
  [types.SET_EXECUTIVES] (state, execs) {
    state.apiData.executives = execs
  },
  [types.SET_REP_LEVELS] (state, levels) {
    state.apiData.levels = levels
  },
  [types.SET_REP_INFO] (state, { slug, key, info }) {
    let repInfo = state.apiData.representatives[slug].info
    repInfo[key] = info
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
  },
  [types.SET_USER_INFO] (state, { address, location, abbreviation }) {
    state.locationData.address = address
    state.locationData.location = location
    state.locationData.abbreviation = abbreviation
  }
}
