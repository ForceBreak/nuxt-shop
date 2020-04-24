import * as firebase from 'firebase'

export const actions = { 
  async nuxtServerInit({ dispatch, commit, state }, { res }) {
    if (res && res.locals && res.locals.user) {
      const { allClaims: claims, ...authUser } = res.locals.user
      await dispatch('auth/onAuthStateChanged', {
        authUser,
        claims
      }, { root: true })
      
      await firebase.firestore().collection('users')
      .doc(authUser.uid)
      .get()
      .then(response => {
        commit('auth/ADD_ROLE', response.data().role)
      })
    }
  }
}