export default {
  getRepresentatives (state) {
    return state.apiData.representatives
  },
  getRepresentativePage (state) {
    return state.apiData.representatives[state.route.params.rep]
  },
  getRepresentativeSocialMedia (state) {
    if (state.route.params.rep) {
      return state.apiData.representatives[state.route.params.rep].channels
    }
  },
  getRepresentativeInfo (state) {
    if (state.route.params.rep) {
      return state.apiData.representatives[state.route.params.rep].info
    }
  },
  getRepresentativesByLevel (state) {
    return state.apiData.levels[state.route.params.level]
  },
  getLegislativeComposition (state) {
    return state.apiData.composition
  },
  getPresidentParty (state) {
    let execs = state.apiData.levels.executives
    if (execs) {
      return state.apiData.representatives[execs.president].party
    }
  },
  getGovernorParty (state) {
    let execs = state.apiData.levels.executives
    if (execs) {
      return state.apiData.representatives[execs.governor].party
    }
  },
  getVCard (state) {
    // TO-DO
  },
  getUserAddress (state) {
    return state.locationData.position
  },
  getUserGeolocation (state) {
    return state.locationData.address
  }
}
