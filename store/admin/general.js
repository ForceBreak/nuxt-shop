import * as firebase from 'firebase'

export const state = () => ({
})

export const getters = {
}

export const mutations = {

}
export const actions = { 
  async GET_ITEM( {commit}, payload ){
    let product = await firebase.firestore().collection(payload.collection).doc(payload.data).get()
    commit(`admin/${payload.collection}/${payload.mutationName}`, product.data(), { root: true })
  },
  async UPDATE_ITEM( {commit}, payload ){
    let data = JSON.parse(JSON.stringify(payload.data))
    for (const key in data) {
      if (data[key] == undefined) data[key] = ''
    }
    await firebase
    .firestore()
    .collection(payload.collection)
    .doc(payload.id)
    .update(data)
  }
}