<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
  >
    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.text"
        link
        :to="item.link"
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ item.text }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <client-only>
        <v-list-item
          v-if="isLoggedIn" 
          link 
          @click="logout"
        >
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('logout') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-else
          link 
          :to="{ name: `auth___${mixin_locale}` }"
        >
          <v-list-item-action>
            <v-icon>mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('signIn') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </client-only>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'

  export default {
    props: {
      drawer:{
        type: Boolean,
        default: false
      },
      items: {
        type: Array
      }
    },
    methods: {
      ...mapMutations({
        ADD_ROLE: 'auth/ADD_ROLE'
      }),
      async logout() {
        try {
          await this.$fireAuth.signOut()
          this.ADD_ROLE(null)
        } catch (e) {
          alert(e)
        }
      }
    },
    computed: {
      ...mapGetters({
        isLoggedIn: 'auth/isLoggedIn'
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>