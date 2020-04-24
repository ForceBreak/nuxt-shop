<template>
  <div>
    {{$t('hello')}}
    <v-btn 
      :color="mixin.theme_text_color" 
      outlined 
      @click="logout"
    >
      Logout
    </v-btn>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
  export default {
    name: 'profilePage',
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
    }
  }
</script>

<style lang="scss" scoped>

</style>