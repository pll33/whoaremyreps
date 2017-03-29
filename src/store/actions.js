import Vue from 'vue'
import * as types from './mutation-types'

export const setData = ({ commit }, { representatives, levels, composition, abbreviation }) => {
  commit(types.SET_API_DATA, { representatives, levels, composition })
  commit(types.SET_ABBREVIATION, abbreviation)
}

export const getPresidentInfo = ({ commit }, { slug }) => {
  Vue.http.get('/api/info/president/')
  .then((response) => {
    let infoObj = response.body
    commit(types.SET_REP_INFO, { slug, infoObj })
  }, (error) => {
    console.log('getPresidentInfo error:', error)
  })
}

export const getLegislatorInfoFederal = ({ commit }, { slug, role, party, name, ocdId }) => {
  let apiUrl = '/api/info/federal/?name=' + name + '&role=' + role + '&party=' + party + '&ocdId=' + ocdId
  Vue.http.get(apiUrl)
  .then((response) => {
    let infoObj = response.body
    commit(types.SET_REP_INFO, { slug, infoObj })
  }, (error) => {
    console.log('getLegislatorInfoFederal error:', error)
  })
}

export const getGovernorInfo = ({ commit, state }, { slug }) => {
  let stateAbbreviation = state.locationData.abbreviation
  Vue.http.get('/api/info/governor/' + stateAbbreviation)
  .then((response) => {
    let infoObj = response.body
    commit(types.SET_REP_INFO, { slug, infoObj })
  }, (error) => {
    console.log('getGovernorInfo error:', error)
  })
}

export const getLegislatorInfoState = ({ commit, state }, { slug, role, party, name }) => {
  let stateAbbreviation = state.locationData.abbreviation
  let apiUrl = '/api/info/state/' + stateAbbreviation + '/?name=' + name + '&party=' + party + '&role=' + role
  Vue.http.get(apiUrl)
  .then((response) => {
    let infoObj = response.body
    commit(types.SET_REP_INFO, { slug, infoObj })
  }, (error) => {
    console.log('getLegislatorInfoState error:', error)
  })
}
