export const state = () => ({
  isShow: false,
  value: null,
  circular: true
})

export const getters = {
  isShow: (state) => state.isShow,
  value: (state) => state.value,
  circular: (state) => state.circular,
}

export const mutations = {
  SET_LOADER_VISIBILITY(state, payload){
    state.circular = true
    state.isShow = payload
  },
  SET_LOADER_VALUE(state, payload){
    state.circular = false
    state.value = payload
  }
}
export const actions = { 

}