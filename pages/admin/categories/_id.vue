<template>
  <v-layout class="justify-start">
    <v-flex xs12 sm3 md2>
      <v-card
        class="mx-2 my-2"
        tile
      >
        <v-list dense>
          <v-list-item-group 
            v-model="item" 
            color="primary"
            mandatory
          >
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
            >
              <v-list-item-icon class="mr-4">
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex xs12 sm9 md10>
      <v-card
        class="mx-2 my-2"
        tile
      >
        <div class="mx-2 py-2">
          <!-- <component :is="activeTab" :product="product" @saveInfo="saveInfo"/> -->
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import adminProductInfo from '~/components/admin/productDetails/adminProductInfo'
  import adminProductPrice from '~/components/admin/productDetails/adminProductPrice'
  import adminSeo from '~/components/admin/productDetails/adminSeo'

  export default {
    layout: 'admin',
    components: {
      adminProductInfo,
      adminProductPrice,
      adminSeo,
    },
    data() {
      return {
        item: 0,
        items: [
          { icon: 'mdi-information-outline', text: `${this.$t('info')}`, component:  'adminProductInfo'},
          { icon: 'mdi-cash', text: `${this.$t('price')}`, component: 'adminProductPrice' },
          { icon: 'mdi-robot', text: 'SEO', component: 'adminSeo' },
        ],
        product: {}
      }
    },
    methods: {
      saveInfo(arg){
        this.$fireStore
        .collection('categories')
        .doc(this.$route.params.id)
        .update(arg)
      }
    },
    computed: {
      activeTab() {
        return this.items[this.item].component
      }
    }, 
    async asyncData({ app, route }){
      let product = await app.$fireStore.collection('categories').doc(route.params.id).get()
      return { product: product.data() }
    }
  }
</script>

<style lang="scss" scoped>

</style>