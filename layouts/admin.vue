<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <mainSidebar :drawer="drawer" :items="items"/>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
      :color="mixin.admin_theme_text_color"
      dense
      dark
      height="60"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer></v-spacer>
      <headerDefault />
    </v-app-bar>

    <v-content>
      <nuxt/>
    </v-content>
  </v-app>
</template>

<script>
import headerDefault from '~/components/header/headerDefault.vue'
import mainSidebar from '~/components/mainSidebar'

export default {
  components: {
    headerDefault,
    mainSidebar
  },
  data(){
    return {
      drawer: false,
    }
  },
  computed: {
    items(){
      return [
          { icon: 'mdi-view-list', text: 'Products', link: {name: `admin-products___${this.mixin_locale}`} },
          { icon: 'mdi-format-list-bulleted', text: 'Categories', link: {name: `admin-categories___${this.mixin_locale}`} },
          { icon: 'mdi-cog', text: 'Modules', link: {name: `admin-modules___${this.mixin_locale}`} },
      ]
    }
  },
  mounted(){
    navigator.permissions
    .query({name:'notifications'})
    .then(async (result) => {
      if(result.state != 'granted') {
        await Notification.requestPermission()
      }
      console.log(result)
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

<style>

</style>

