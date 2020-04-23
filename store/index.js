export const actions = { 
  async nuxtServerInit({ dispatch, commit }, { res }) {
    if (res && res.locals && res.locals.user) {
      const { allClaims: claims, ...authUser } = res.locals.user
  
      await dispatch('auth/onAuthStateChanged', {
        authUser,
        claims
      }, { root: true })
    }
  }
}