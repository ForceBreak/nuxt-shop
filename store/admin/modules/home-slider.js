import * as firebase from 'firebase'

export const state = () => ({
  homeSlides: []
})

export const getters = {
  homeSlides: (state) => state.homeSlides,
}

export const mutations = {
  SET_HOME_SLIDES(state, payload){
    state.homeSlides = payload
  }
}
export const actions = { 
  async GET_HOME_SLIDES( {commit}, payload ){
    let slides = []
    const slidesFromDB = await firebase.firestore().collection('modules').doc('home-slider').collection('slides').get()
    slidesFromDB.docs.forEach(element => {
      slides.push({ ...element.data(), id: element.id })
    });
    commit('SET_HOME_SLIDES', slides)
  },
  async UPDATE_CAROUSEL_ITEM( {commit}, payload ){
    await firebase.firestore()
          .collection('modules')
          .doc('home-slider')
          .collection('slides')
          .doc(payload.id)
          .update(payload.data) 
  },
  async ADD_CAROUSEL_ITEM( {commit}, payload ){
    return await firebase.firestore()
          .collection('modules')
          .doc('home-slider')
          .collection('slides')
          .add(payload) 
  }
}