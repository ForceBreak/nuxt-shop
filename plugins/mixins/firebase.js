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
    },
    async initPushNotifications(notification) {
      const currentToken = await this.$fireMess.getToken()
      const data = JSON.stringify({
        notification,
        to: currentToken
      })
      const config = {
        method: 'post',
        url: 'https://fcm.googleapis.com/fcm/send',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'key=AAAAEf9JaLs:APA91bHdbmV_pP4CqaOPMmfsxv7xtshvMV4fM7l1SMbvZcL4MQCr3j9FchHq06qVVqjlrujgi1o7Ep-ohFQG27XuX-fY0vIiPz_VEwCQiKVTQ-8n75SdaVVu34KoHze3Jbnpu7qVRVTx'
        },
        data
      };

      await this.$axios(config)
      
      this.$fireMess.onMessage((payload) => {
        navigator.serviceWorker.ready.then(function(serviceWorker) {
          serviceWorker.showNotification(payload.notification.title, 
            { 
              ...payload.notification, 
              data: { url: payload.data['gcm.notification.url'] 
            } 
          });
        });
        
      })
      // this.$fireMess.onTokenRefresh(async () => {
      //   const refreshToken = await this.$fireMess.getToken()
      //   console.log('Token Refreshed',refreshToken)
      // })
    },
    async updateCart(id){
      await this.$fireStore.collection("carts").doc(id).update({ notified: true })
    }
  }
}