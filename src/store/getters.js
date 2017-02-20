// export const userGeolocation = state => state.locationData.position

// export const userAddress = state => state.locationData.address

// export const getVCard =

export const getRepresentativePage = (state, getters) => () => {
  return state.apiData.representatives[state.route.params.rep]
}

export const getRepresentativeSocialMedia = (state, getters) => () => {
  if (state.route.params.rep) {
    return state.apiData.representatives[state.route.params.rep].channels
  }
}

export const getRepresentativesByLevel = (state, getters) => () => {
  return state.apiData.levels[state.route.params.level]
}
