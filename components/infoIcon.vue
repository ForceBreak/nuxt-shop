<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-icon
        v-bind="attrs"
        v-on="on"
      >
        mdi-information
      </v-icon>
    </template>
    <client-only>
      <span> {{ text }} </span>
    </client-only>
  </v-tooltip>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>