import * as firebase from 'firebase'

export const state = () => ({
  productsFromCategory: []
})

export const getters = {
  productsFromCategory: (state) => state.productsFromCategory,
}

export const mutations = {
  SET_PRODUCTS_FROM_CATEGORY(state, payload){
    state.productsFromCategory = payload
  }
}
export const actions = { 
  async GET_PRODUCTS_FROM_CATEGORY({ commit }, payload) {
    return await firebase.firestore().collection('products')
      .where("category", "==", payload)
      .get()
      .then(res => {
        let productsList = []
        res.docs.forEach(elem => {
          productsList.push({ id: elem.id, ...elem.data()})
        })
        return productsList
      })
  }
}