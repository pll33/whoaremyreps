// export const userGeolocation = state => state.locationData.position

// export const userAddress = state => state.locationData.address

// export const getVCard =

export const getRepresentatives = (state) => {
  return state.apiData.representatives
}

export const getRepresentativePage = (state) => {
  return state.apiData.representatives[state.route.params.rep]
}

export const getRepresentativeSocialMedia = (state) => {
  if (state.route.params.rep) {
    return state.apiData.representatives[state.route.params.rep].channels
  }
}

export const getRepresentativesByLevel = (state) => {
  return state.apiData.levels[state.route.params.level]
}

export const getLegislativeComposition = (state) => {
  return state.apiData.composition
}

export const getUserAddress = (state) => {
  return state.locationData.position
}

export const getUserGeolocation = (state) => {
  return state.locationData.address
}
