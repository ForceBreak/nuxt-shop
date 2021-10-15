<template>
  <v-container fluid class="pt-0">
    <div class="d-flex flex-wrap align-center justify-space-between">
      <h2 class="flex-grow-1">{{ category.name[mixin_locale] }}</h2>
      <div class="d-flex align-center">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn 
              v-bind="attrs"
              v-on="on" 
              icon
              @click="productListView = 'list'"
              :color="productListView == 'list' ? 'indigo' : ''"
              class="d-none d-sm-block"
            >
              <v-icon> mdi-view-list </v-icon>
            </v-btn>
          </template>
          <span> Список </span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn 
              v-bind="attrs"
              v-on="on" 
              icon
              class="d-none d-sm-block mr-4"
              @click="productListView = 'blocks'"
              :color="productListView == 'blocks' ? 'indigo' : ''"
            >
              <v-icon> mdi-view-module </v-icon>
            </v-btn>
          </template>
          <span> Сетка </span>
        </v-tooltip>
        <v-select
          :items="sortItemsList"
          item-text="name"
          item-value="id"
          label="Сортировать"
          clearable
          @change="sortItems($event)"
          class="mw-220"
        ></v-select>
      </div>
    </div>
    <productList :products="products" :view="productListView"/>
  </v-container>
</template>

<script>
  import productList from '~/components/front/product-list'

  export default {
    components: {
      productList
    },
    data(){
      return {
        products: [],
        baseproducts: [],
        category: {},
        sortItemsList: [
          {
            id: 'priceLow',
            name: 'Цена по убыванию'
          },
          {
            id: 'priceHigh',
            name: 'Цена по возрастанию'
          },
          {
            id: 'weigthLow',
            name: 'Вес по убыванию'
          },
          {
            id: 'weigthHigh',
            name: 'Вес по возрастанию'
          },
        ],
        productListView: 'blocks'
      }
    },
    methods:{
      sortItems(item){
        if(item == this.sortItemsList[0].id) this.products = this.products.sort((a, b) => b.price - a.price)
        else if(item == this.sortItemsList[1].id) this.products = this.products.sort((a, b) => a.price - b.price)
        else if(item == this.sortItemsList[2].id) this.products = this.products.sort((a, b) => b.weight - a.weight)
        else if(item == this.sortItemsList[3].id) this.products = this.products.sort((a, b) => a.weight - b.weight)
        else this.products = JSON.parse(JSON.stringify(this.baseproducts))
      }
    },
    async asyncData({ app, route }){
      let id = ''
      let categoryWithLinkText = await app.$fireStore
      .collection('categories')
      .where("link_text", "==", route.params.id)
      .get()

      if(categoryWithLinkText.docs.length){
        id = categoryWithLinkText.docs[0].id
      }else id = route.params.id

      const products = await app.store.dispatch('front/products/GET_PRODUCTS_FROM_CATEGORY', id)
      const category = await app.$fireStore.collection('categories').doc(id).get()

      return { products: products, baseproducts: JSON.parse(JSON.stringify(products)), category: { ...category.data(), id: category.id} }
    }
  }
</script>

<style lang="scss" scoped>

</style>