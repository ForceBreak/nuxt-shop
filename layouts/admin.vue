<template>
  <v-app> 
    <mainSidebar :drawer="drawer" :items="items"/>
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
          { icon: 'mdi-cog', text: 'Configuration', link: {name: `admin-configuration___${this.mixin_locale}`} },
      ]
    }
  }
}
</script>

<style>

</style>

