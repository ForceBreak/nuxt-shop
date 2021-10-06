<template>  
  <v-row>
    <v-col
      v-for="product in homeProducts" 
      :key="product.id"
      sm="6" md="3">
      <v-card
        class="mx-auto my-12"
        max-width="374"
      >
        <nuxt-link :to="{ name: `products-id___${mixin_locale}`, params: {id: product.id} }">
          <v-img
            height="200"
            :src="product.mainImage"
          ></v-img>
        </nuxt-link>
        
        <v-card-subtitle class="pb-0">
          {{ product.short_description }}
        </v-card-subtitle>
        <v-card-title class="pt-2">{{ product.name }}</v-card-title>

        <v-card-text>
          <div class="text--primary">{{ product.description }}</div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-actions class="d-flex align-center justify-space-between py-3">
          <p class="mb-0 headline font-weight-black"> {{ product.price }} грн</p>
          <v-btn color="error" @click="setToCart({
            title: product.name,
            body: $moment().format('DD-MM-YYYY'),
            icon: product.mainImage,
            url: `${$origin}/products/${product.id}`
          })">
            В корзину
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data(){
    return {
      model: 0,
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange',
      ],
    }
  },
  computed: {
    ...mapGetters({
      homeProducts: 'front/homeProducts/homeProducts'
    })
  },
  methods: {
    async setToCart(item){
      await this.$fireStore.collection('carts').doc('cart1').set(item)
    }
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>

</style>