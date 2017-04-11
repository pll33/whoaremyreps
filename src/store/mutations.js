import * as types from './mutation-types'

export default {
  [types.SET_API_DATA] (state, apiData) {
    state.apiData = apiData
  },
  [types.SET_REP_INFO] (state, { slug, infoObj }) {
    state.apiData.representatives[slug].info = infoObj
  },
  [types.SET_REP_ERROR] (state, { slug, errorMessage }) {
    state.apiData.representatives[slug].info = { error: errorMessage }
  },
  [types.SET_ABBREVIATION] (state, stateAbbreviation) {
    state.locationData.abbreviation = stateAbbreviation
  }
}
