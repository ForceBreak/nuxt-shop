import * as firebase from 'firebase'

export const state = () => ({
  product: {}
})

export const getters = {
  product: (state) => state.product,
}

export const mutations = {
  SET_PRODUCT(state, payload){
    state.product = payload
  }
}
export const actions = { 
}