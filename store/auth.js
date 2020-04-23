// import * as firebase from 'firebase'
// import firebaseConf from '../plugins/firebase'
// import 'firebase/firestore'

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConf)
// }

// // Initialize Cloud Firestore through Firebase
// const db = firebase.firestore();

export const state = () => ({
  authUser: null
})

export const getters = {
  isLoggedIn: (state) => {
    try {
      return state.authUser.id !== null
    } catch {
      return false
    }
  },
  authUser: (state) => state.authUser,
  userName: (state) => {
    if(state.authUser && state.authUser.displayName){
      return state.authUser.displayName
    }else{
      return 'Anonymous'
    }
  },
  userAvatar: (state) => {
    if(state.authUser && state.authUser.photoURL){
      return state.authUser.photoURL
    }else{
      return '/img/user-nophoto.jpg'
    }
  },
}

export const mutations = {
  RESET_STORE: (state) => {
    Object.assign(state, { authUser: null })
  },
  SET_AUTH_USER: (state, { authUser }) => {
    if(authUser){
      const { uid, email, emailVerified, displayName, photoURL } = authUser
      state.authUser = { uid, email, emailVerified, displayName, photoURL }
    }
  }
}
export const actions = { 
  onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      commit('RESET_STORE')
      return
    }
  },
  googleSignIn({ commit }, firebase) {
    let provider =  new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
    .then(result => {
      // store the user ore wathever
      // this.$router.push('/home')
    }).catch(e => {
      // this.$snotify.error(e.message)
      console.log(e)
    })
  }
}