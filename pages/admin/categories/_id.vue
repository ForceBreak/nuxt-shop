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
          <v-btn @click="firebaseFunc">Send</v-btn>
          <component 
            :is="activeTab" 
            :product="category" 
            :mutationName="'SET_CATEGORY'"
            :collectionName="'categories'"
            @saveInfo="saveInfo"
          />
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  import adminCategoryInfo from '~/components/admin/categoryDetails/adminCategoryInfo'
  import adminCategoryImages from '~/components/admin/categoryDetails/adminCategoryImages'
  import adminSeo from '~/components/admin/categoryDetails/adminSeo'

  export default {
    layout: 'admin',
    components: {
      adminCategoryInfo,
      adminCategoryImages,
      adminSeo,
    },
    data() {
      return {
        item: 0,
        items: [
          { icon: 'mdi-information-outline', text: `${this.$t('info')}`, component:  'adminCategoryInfo'},
          { icon: 'mdi-image', text: `${this.$t('images')}`, component: 'adminCategoryImages' },
          { icon: 'mdi-robot', text: 'SEO', component: 'adminSeo' },
        ],
        product: {}
      }
    },
    methods: {
      ...mapActions({
        UPDATE_ITEM: 'admin/general/UPDATE_ITEM'
      }),
      async saveInfo(arg){
        await this.UPDATE_ITEM({
          id: this.$route.params.id,
          data: arg,
          collection: 'categories'
        })
      },
      async firebaseFunc(){
        console.log(await this.$fireFunc.call('getProductsByCategory', {
          id: this.$route.params.id
        }, {}), '$fireFunc')
      },
    },
    computed: {
      ...mapGetters({
        category: 'admin/categories/category'
      }),
      activeTab() {
        return this.items[this.item].component
      }
    }, 
    created(){
      if(this.$route.query.subPage) this.item = this.items.findIndex(elem => elem.component == this.$route.query.subPage)
    },
    async asyncData({ app, route }){
      await app.store.dispatch('admin/general/GET_ITEM', {
        data: route.params.id,
        collection: 'categories',
        mutationName: 'SET_CATEGORY'
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>