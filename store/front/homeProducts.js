export const state = () => ({
    homeProducts: [],
  })
  
  export const getters = {
    homeProducts: (state) => state.homeProducts,
  }
  
  export const mutations = {
    GET_HOME_PRODUCTS(state, payload){
      state.homeProducts = payload
    }
  }
  export const actions = { 
  
  }