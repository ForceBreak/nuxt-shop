<template>
  <div>
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
            :to="{ name: `categories-id___${mixin_locale}`, params: { id: item.link_text && item.link_text.length ? item.link_text : item.id } }"
          >
            {{ item.name[mixin_locale] }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>
    </v-container>

    <homeCarousel :slides="homeSlides" class="my-4"/>

    <v-container fluid>
      <!-- <homeCategories /> -->
      <h2 class="my-6">{{ $t('mainPage') }}</h2>
      <productList :products="homeProducts" @addToCart="addToCart"/>

    </v-container>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import * as firebase from 'firebase'
import homeCategories from '~/components/front/carousels/homeCategories'
import homeCarousel from '~/components/front/carousels/homeCarousel'
import productList from '~/components/front/product-list'

export default {
  name: 'indexPage',
  components: {
    // homeCategories,
    productList,
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
      homeSlides: 'admin/modules/home-slider/homeSlides',
      homeProducts: 'front/homeProducts/homeProducts'
    })
  },
  methods: {
    async addToCart(item){
      await this.$fireStore.collection('carts').doc().set({ ...item, notified: false })
    }
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

