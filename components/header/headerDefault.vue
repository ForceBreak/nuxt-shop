<template>
 <div>
    <v-app-bar
      :color="mixin.theme_text_color"
      dense
      dark
      height="60"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>

      <client-only>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn
          v-if="isLoggedIn"
          icon
          :to="{ name: `profile___${locale}` }"
        >
          <v-avatar>
            <img
              :src="userAvatar"
              :alt="userName"
            >
          </v-avatar>
        </v-btn>

        <v-btn 
          v-else 
          icon
          :to="{ name: `auth___${locale}` }"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>

        <downloadLoader slot="placeholder"/>

      </client-only>
      
    </v-app-bar>
    
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import downloadLoader from '~/components/loaders/downloadLoader'

  export default {
    components: {
      downloadLoader
    },
    computed: {
      ...mapGetters({
        userName: 'auth/userName',
        userAvatar: 'auth/userAvatar',
        isLoggedIn: 'auth/isLoggedIn'
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>