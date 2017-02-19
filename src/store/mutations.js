import * as types from './mutation-types'

export default {
  [types.SET_REPRESENTATIVE] (state, { rep }) {
    state.apiData.representative = rep
  },
  [types.SET_REP_LEVELS] (state, { levels }) {
    state.apiData.levels = levels
  },
  [types.SET_MAP_FEDERAL] (state, { map }) {
    state.apiData.districtMaps.usHouse = map
  },
  [types.SET_MAP_STATE_H] (state, { map }) {
    state.apiData.districtMaps.stateHouse = map
  },
  [types.SET_MAP_STATE_S] (state, { map }) {
    state.apiData.districtMaps.stateSenate = map
  },
  [types.SET_USER_LOCATION] (state, { position }) {
    state.locationData.position = position
  },
  [types.SET_USER_ADDRESS] (state, { addressString }) {
    state.locationData.address = addressString
  }
}
