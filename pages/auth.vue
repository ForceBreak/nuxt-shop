<template>
  <v-layout class="justify-center align-center full_heigth">
    <v-flex xs12 sm6 md4>
      <signInEmailPass role="user"/>
    </v-flex>
  </v-layout>
</template>

<script>
  import signInEmailPass from '~/components/auth/signInEmailPass'

  export default {
    name: 'authPage',
    components: {
      signInEmailPass
    }
  }
</script>

<style lang="scss" scoped>

</style>