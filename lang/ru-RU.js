import * as firebase from 'firebase'

export default (context) => {
  return new Promise(async (resolve)=> {
    let translationsFromDB = await firebase.firestore().collection('translations').doc('ru').get()
    resolve(translationsFromDB.data())
  });
}