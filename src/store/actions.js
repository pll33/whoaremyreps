import Vue from 'vue'
import * as types from './mutation-types'

export const setData = ({ commit }, { representatives, levels, composition, abbreviation }) => {
  commit(types.SET_API_DATA, { representatives, levels, composition })
  commit(types.SET_ABBREVIATION, abbreviation)
}

export const getPresidentInfo = ({ commit }, { slug }) => {
  return Vue.http.get('/api/info/president/')
    .then((response) => {
      let infoObj = response.body.info
      commit(types.SET_REP_INFO, { slug, infoObj })
    }, (error) => {
      let errorMessage = error.body.message
      commit(types.SET_REP_ERROR, { slug, errorMessage })
    })
}

export const getLegislatorInfoFederal = ({ commit }, { slug, role, party, name, ocdId }) => {
  let apiUrl = `/api/info/federal/?name=${name}&party=${party}&role=${role}&ocdId=${ocdId}`
  return Vue.http.get(apiUrl)
    .then((response) => {
      let infoObj = response.body.info
      commit(types.SET_REP_INFO, { slug, infoObj })
    }, (error) => {
      let errorMessage = error.body.message
      commit(types.SET_REP_ERROR, { slug, errorMessage })
    })
}

export const getGovernorInfo = ({ commit, state }, { slug }) => {
  let stateAbbreviation = state.locationData.abbreviation
  return Vue.http.get(`/api/info/governor/${stateAbbreviation}`)
    .then((response) => {
      let infoObj = response.body.info
      commit(types.SET_REP_INFO, { slug, infoObj })
    }, (error) => {
      let errorMessage = error.body.message
      commit(types.SET_REP_ERROR, { slug, errorMessage })
    })
}

export const getLegislatorInfoState = ({ commit, state }, { slug, role, party, name, ocdId }) => {
  let stateAbbreviation = state.locationData.abbreviation
  let apiUrl = `/api/info/state/${stateAbbreviation}/?name=${name}&party=${party}&role=${role}&ocdId=${ocdId}`
  return Vue.http.get(apiUrl)
    .then((response) => {
      let infoObj = response.body.info
      commit(types.SET_REP_INFO, { slug, infoObj })
    }, (error) => {
      let errorMessage = error.body.message
      commit(types.SET_REP_ERROR, { slug, errorMessage })
    })
}
