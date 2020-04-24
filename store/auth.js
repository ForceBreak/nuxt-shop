// import * as firebase from 'firebase'
// import firebaseConf from '../plugins/firebase'
// import 'firebase/firestore'

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConf)
// }

// // Initialize Cloud Firestore through Firebase
// const db = firebase.firestore();

export const state = () => ({
  authUser: {},
  role: null
})

export const getters = {
  isLoggedIn: (state) => {
    return Object.keys(state.authUser).length
  },
  authUser: (state) => state.authUser,
  role: (state) => state.role,
  userName: (state) => {
    if(state.authUser.displayName){
      return state.authUser.displayName
    }else{
      return 'Anonymous'
    }
  },
  userAvatar: (state) => {
    if(state.authUser.photoURL){
      return state.authUser.photoURL
    }else{
      return '/img/user-nophoto.jpg'
    }
  },
}

export const mutations = {
  RESET_STORE: (state) => {
    Object.assign(state, { authUser: {} })
  },
  SET_AUTH_USER: (state, { authUser }) => {
    if(authUser){
      const { uid, email, emailVerified, displayName, photoURL } = authUser
      state.authUser = { uid, email, emailVerified, displayName, photoURL }
      console.log(state.authUser, 'state.authUser')
    }
  },
  ADD_ROLE(state, payload){
    state.role = payload
  }
}
export const actions = { 
  onAuthStateChanged({ commit }, { authUser }) {
    return new Promise((resolve, reject) => {
      if (!authUser) {
        commit('RESET_STORE')
        resolve()
      }else{
        commit('SET_AUTH_USER', authUser)
        resolve()
      }
      
    })
  }
}