import * as firebase from 'firebase'
import { firebaseOptions } from '~/helpers/general'

console.log(firebase.apps.length)
if(firebase.apps.length === 0) firebase.initializeApp(firebaseOptions)

export const actions = { 
  async nuxtServerInit({ dispatch, commit }, { res, app }) {
    let translationsFromDB = await firebase.firestore().collection('translations').get()
    translationsFromDB.docs.forEach(elem => {
      app.i18n.mergeLocaleMessage(elem.id, {...elem.data()});
    })

    if (res && res.locals && res.locals.user) {
      const { allClaims: claims, ...authUser } = res.locals.user
      await dispatch('auth/onAuthStateChanged', {
        authUser,
        claims
      }, { root: true })
      
      await firebase.firestore().collection('users').doc(authUser.uid).get()
      .then(response => {
        commit('auth/ADD_ROLE', response.data().role)
      })
    }
  }
}