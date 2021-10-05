<template>
  <v-container fluid>
    
    <homeCategories />

    <v-row>
      <v-col>
        hello
        <nuxt-link :to="{ name: `auth___${mixin_locale}` }">Auth</nuxt-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import Vue from 'vue'
import { mapGetters } from 'vuex'
import * as firebase from 'firebase'
import homeCategories from '~/components/front/carousels/homeCategories'

export default {
  name: 'indexPage',
  components: {
    homeCategories
  },
  data(){
    return {

    }
  },
  computed: {

  },
  methods: {

  },
  async fetch(context) {
    // console.log(context, 'context')
    let categories = await firebase.firestore().collection('categories').get()
    let uploadedCategories = []
    categories.docs.forEach(elem => uploadedCategories.push({...elem.data(), id: elem.id}))
    context.store.commit('front/carousels/homeCategories/GET_HOME_CATEGORIES_CAROUSEL', uploadedCategories)
  },
}
</script>

<style>

</style>

