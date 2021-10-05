export const state = () => ({
  homeCategoriesCarousel: [],
})

export const getters = {
  homeCategoriesCarousel: (state) => state.homeCategoriesCarousel,
}

export const mutations = {
  GET_HOME_CATEGORIES_CAROUSEL(state, payload){
    state.homeCategoriesCarousel = payload
  }
}
export const actions = { 

}