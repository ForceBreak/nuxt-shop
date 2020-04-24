<template>
  <div>
    <nuxt-link :to="{ name: `auth___${locale}` }">Auth</nuxt-link>
  </div>
</template>

<script>

import Vue from 'vue'
import { mapGetters } from 'vuex'

export default {
  name: 'indexPage',
  data(){
    return {

    }
  },
  computed: {

  },
  methods: {

  },
  fetch() {

  },
}
</script>

<style>

</style>

