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
              @click="mixin_set_active_component(item.component)"
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
          <component 
            :is="activeTab" 
            :product="product" 
            :categories="categories" 
            :mutationName="'SET_PRODUCT'"
            :collectionName="'products'"
            @saveInfo="saveInfo"
          />
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex'
  
  import adminProductInfo from '~/components/admin/productDetails/adminProductInfo'
  import adminProductPrice from '~/components/admin/productDetails/adminProductPrice'
  import adminCategoryImages from '~/components/admin/categoryDetails/adminCategoryImages'
  import adminSeo from '~/components/admin/productDetails/adminSeo'
  import adminRelations from '~/components/admin/productDetails/adminRelations'

  export default {
    layout: 'admin',
    components: {
      adminProductInfo,
      adminProductPrice,
      adminCategoryImages,
      adminSeo,
      adminRelations,
    },
    data() {
      return {
        item: 0,
        items: [
          { icon: 'mdi-information-outline', text: `${this.$t('info')}`, component:  'adminProductInfo'},
          { icon: 'mdi-cash', text: `${this.$t('price')}`, component: 'adminProductPrice' },
          { icon: 'mdi-image', text: `${this.$t('images')}`, component: 'adminCategoryImages' },
          { icon: 'mdi-robot', text: 'SEO', component: 'adminSeo' },
          { icon: 'mdi-folder-network', text: `${this.$t('relations')}`, component: 'adminRelations' },
        ],
        categories: []
      }
    },
    methods: {
      ...mapActions({
        UPDATE_ITEM: 'admin/general/UPDATE_ITEM'
      }),
      ...mapMutations({
        SET_LOADER_VISIBILITY: 'loader/SET_LOADER_VISIBILITY'
      }),
      async saveInfo(arg){
        this.SET_LOADER_VISIBILITY(true)
        await this.UPDATE_ITEM({
          id: this.$route.params.id,
          data: arg,
          collection: 'products'
        })
        this.SET_LOADER_VISIBILITY(false)
      }
    },
    computed: {
      activeTab() {
        return this.items[this.item].component
      },
      ...mapGetters({
        product: 'admin/products/product'
      }),
    }, 
    created(){
      if(this.$route.query.subPage) this.item = this.items.findIndex(elem => elem.component == this.$route.query.subPage)
    },
    async asyncData({ app, route }){
      await app.store.dispatch('admin/general/GET_ITEM', {
        data: route.params.id,
        collection: 'products',
        mutationName: 'SET_PRODUCT'
      })
      let categories = []
      let categoriesFromDB = await app.$fireStore.collection('categories').get()
      categoriesFromDB.forEach(elem => {
        let cat = elem.data()
        categories.push({id: elem.id, name: cat.name})
      })
      return { categories: categories }
    }
  }
</script>

<style lang="scss" scoped>

</style>