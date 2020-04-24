<template>
  <v-layout class="justify-center align-center full_heigth">
    <v-flex xs12 sm6 md4>
      <signInEmailPass role="admin"/>
    </v-flex>
  </v-layout>
</template>

<script>
  import signInEmailPass from '~/components/auth/signInEmailPass'

  export default {
    components: {
      signInEmailPass
    }
  }
</script>

<style lang="scss" scoped>

</style>