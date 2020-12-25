<template>
  <v-btn icon>
    <v-progress-circular
      v-if="!circular"
      :value="value ? value : 0"
      :color="mixin.loader_color"
    ></v-progress-circular>
    <v-progress-circular
      v-if="circular"
      indeterminate
      :color="mixin.loader_color"
    ></v-progress-circular>
  </v-btn>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      value: 'loader/value',
      circular: 'loader/circular'
    })
  }
}
</script>