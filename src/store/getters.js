export default {
  getRepresentatives (state) {
    return state.apiData.representatives
  },
  getRepresentativePage (state) {
    return state.apiData.representatives[state.route.params.rep]
  },
  getRepresentativeInfo (state) {
    if (state.route.params.rep) {
      let rep = state.apiData.representatives[state.route.params.rep]
      return (rep.info) ? rep.info : null
    }
  },
  getRepresentativesByLevel (state) {
    return state.apiData.levels[state.route.params.level]
  },
  getLegislativeComposition (state) {
    return state.apiData.composition
  },
  getStateAbbreviation (state) {
    return state.locationData.abbreviation
  }
}
