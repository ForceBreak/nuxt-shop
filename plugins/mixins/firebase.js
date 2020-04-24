import * as firebase from 'firebase'
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations({
      ADD_ROLE: 'auth/ADD_ROLE'
    }),
    signViaGoogle(){
      let provider =  new firebase.auth.GoogleAuthProvider()
      return new Promise((resolve, reject) => {
        this.$fireAuth.signInWithPopup(provider)
        .then(result => {
          resolve(result.user)
        }).catch(e => {
          // this.$snotify.error(e.message)
          console.log(e)
          reject(console.log(new Error(e)))
        })
      })
    },
    createUserInDB(args){
      const {uid, email, emailVerified, displayName, role} = {...args}

      return this.$fireStore.collection('users').doc(uid).set({
        uid, 
        email,
        emailVerified,
        displayName,
        role
      })
      .then(response => {
        this.ADD_ROLE(role)
      })
    }
  }
}