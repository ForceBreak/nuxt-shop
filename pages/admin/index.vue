<template>
  <v-layout>
    <v-flex xs12>
      Home
    </v-flex>
  </v-layout>
</template>

<script>

  export default {
    name: 'adminHomePage',
    layout: 'admin',
    data() {
      return {
      }
    },
    methods: {
    },
    mounted(){
      navigator.permissions
      .query({name:'notifications'})
      .then(async (result) => {
        if(result.state != 'granted') {
          await Notification.requestPermission()
        }
        this.$fireStore.collection("carts")
        .where("notified", "==", false)
        .onSnapshot((data) =>{
          if(data.docs.length){
            data.docs.forEach(async elem => {
              await this.initPushNotifications(elem.data())
              await this.updateCart(elem.id)
            })
          }
        });
      });
    }
  }
</script>

<style lang="scss" scoped>

</style>