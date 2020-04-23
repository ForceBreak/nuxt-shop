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
  export default {
    name: 'profilePage',
    methods: {
      async logout() {
        try {
          await this.$fireAuth.signOut()
        } catch (e) {
          alert(e)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>