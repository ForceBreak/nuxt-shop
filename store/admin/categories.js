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
}