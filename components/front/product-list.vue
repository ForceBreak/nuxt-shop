<template>  
  <v-row>
    <template v-if="view == 'blocks'">
      <v-col
        v-for="product in products" 
        :key="product.id"
        sm="6" md="4" lg="3"
        class="py-0"
      >
        <v-card  class="mx-auto mb-6">
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
            <div class="text--primary">{{ mixin_truncate(product.description, 70) }}</div>
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
    </template>
    <template v-else>
      <v-col
        v-for="product in products" 
        :key="product.id"
        sm="12" md="12" lg="6"
        class="py-0"
      >
        <v-card class="mx-auto mb-6">
          <div class="d-flex flex-no-wrap">
            <nuxt-link :to="{ name: `products-id___${mixin_locale}`, params: {id: product.id} }">
            <v-avatar
              class="ma-3"
              size="125"
              tile
            >
              <v-img
                height="200"
                :src="product.mainImage"
              ></v-img>
            </v-avatar>
            </nuxt-link>
            <div>
              <v-card-title
                class="text-h5"
                v-text="product.name"
              ></v-card-title>

              <v-card-subtitle> {{ product.weight }} гр. </v-card-subtitle>

              <v-card-text>
                <div class="text--primary">{{ mixin_truncate(product.description, 100) }}</div>
              </v-card-text>

            </div>
          </div>
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
    </template>

  </v-row>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      default: () => []
    },
    view: {
      type: String,
      default: 'blocks'
    }
  },
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
  methods: {
    setToCart(item){
      this.$emit('addToCart', { ...item, notified: false })
    }
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>

</style>