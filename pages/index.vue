<template>
  <v-container fluid>
    <v-slide-group
      multiple
      show-arrows
    >
      <v-slide-item
        v-for="item in homeCategoriesCarousel"
        :key="item.id"
        v-slot="{ active }"
      >
        <v-btn
          class="mx-2"
          :input-value="active"
          active-class="purple white--text"
          depressed
          rounded
          :to="{ name: `categories-id___${mixin_locale}`, params: {id: item.id} }"
        >
          {{ item.name }}
        </v-btn>
      </v-slide-item>
    </v-slide-group>
    
    <homeCarousel :slides="homeSlides"/>
    <!-- <homeCategories /> -->
    <h2 class="my-6">Главная</h2>
    <homeProducts />

  </v-container>
</template>

<script>

import { mapGetters } from 'vuex'
import * as firebase from 'firebase'
import homeCategories from '~/components/front/carousels/homeCategories'
import homeCarousel from '~/components/front/carousels/homeCarousel'
import homeProducts from '~/components/front/homeProducts'

export default {
  name: 'indexPage',
  components: {
    // homeCategories,
    homeProducts,
    homeCarousel
  },
  data(){
    return {

    }
  },
  computed: {
    ...mapGetters({
      homeCategoriesCarousel: 'front/carousels/homeCategories/homeCategoriesCarousel',
      role: 'auth/role',
      homeSlides: 'admin/modules/home-slider/homeSlides'
    })
  },
  methods: {
  },
  mounted(){
  },
  async fetch(context) {
    // console.log(context, 'context')
    let categories = await firebase.firestore().collection('categories').get()
    let products = await firebase.firestore().collection('products').get()
    await context.store.dispatch('admin/modules/home-slider/GET_HOME_SLIDES')

    let uploadedCategories = []
    categories.docs.forEach(elem => uploadedCategories.push({...elem.data(), id: elem.id}))
    context.store.commit('front/carousels/homeCategories/GET_HOME_CATEGORIES_CAROUSEL', uploadedCategories)

    let uploadedProducts = []
    products.docs.forEach(elem => uploadedProducts.push({...elem.data(), id: elem.id}))
    context.store.commit('front/homeProducts/GET_HOME_PRODUCTS', uploadedProducts)
  },
}
</script>

<style>

</style>

