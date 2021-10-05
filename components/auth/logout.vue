<template>
  <v-btn
    v-if="isLoggedIn" 
    @click="logout"
    color="primary"
  >
    Logout
  </v-btn>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    methods: {
      ...mapMutations({
        ADD_ROLE: 'auth/ADD_ROLE'
      }),
      async logout() {
        try {
          await this.$fireAuth.signOut()
          this.ADD_ROLE(null)
          this.$router.replace({ name: `auth___${this.mixin_locale}` })
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