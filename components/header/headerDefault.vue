<template>
 <div>
    <client-only>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            dark
            icon
            v-on="on"
          >
            <v-icon>mdi-earth</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in mixin_locales"
            :key="index"
            nuxt
            :to="switchLocalePath(item.id)"
          >
            <v-list-item-avatar width="25" min-width="25" height="25" min-height="25" horizontal>
              <v-img :src="item.flagSrc"></v-img>
            </v-list-item-avatar>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        v-if="isLoggedIn"
        icon
        :to="{ name: `profile___${mixin_locale}` }"
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
        :to="{ name: `auth___${mixin_locale}` }"
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <downloadLoader slot="placeholder"/>

    </client-only>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import downloadLoader from '~/components/loaders/downloadLoader'

  export default {
    components: {
      downloadLoader,
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