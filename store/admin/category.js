import * as firebase from 'firebase'

export const state = () => ({
  category: {}
})

export const getters = {
  category: (state) => state.category,
}

export const mutations = {
  SET_CATEGORY(state, payload){
    state.category = payload
  }
}
export const actions = { 
  async GET_CATEGORY( {commit}, payload ){
    let category = await firebase.firestore().collection('categories').doc(payload).get()
    commit('SET_CATEGORY', category.data())
  }
}