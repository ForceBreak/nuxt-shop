<template>
  <div>
    <v-layout class="d-flex justify-end ">
      <v-flex xs12 sm2>
        <v-file-input 
          v-if="!isProducts"
          @change="onUploadFile"
          chips
          :label="$t('import_products')"
        />
      </v-flex>
      <v-btn
        v-if="!isProducts"
        color="success"
        class="my-4 mx-4"
        @click="changeNewProductVisibility"
      >
        {{ $t('create_new_product') }}
      </v-btn>
      <v-btn
        v-if="!isProducts"
        color="success"
        class="my-4 mx-4"
        @click="changeTableViewVisibility"
      >
        {{ $t('change_table_view_title') }}
      </v-btn>
    </v-layout>
    <v-data-table
      v-if="products.length"
      :headers="headers"
      :items="products"
      :items-per-page="5"
      class="elevation-1"
    >
    </v-data-table>

    <!-- Import components -->
    <section>
      <xlsx-read :file="file">
        <xlsx-json @parsed="parsed($event)"></xlsx-json>
      </xlsx-read>
    </section>
    <!-- Import components end -->

    <createBaseProduct v-if="isProducts" @createBaseProduct="createBaseProduct"/>

    <importProductForm 
      :newProductKeysArray="newProductKeysArray"
      :importProductKeysArray="importProductKeysArray"
      :importProductView="importProductView"
      :importedProducts="importedProducts"
      @importProducts="importProducts"
      ref="importProductForm"
    />

    <changeTableView 
      :headers="headers" 
      @changeHeaders="changeHeaders"
      ref="changeTableView"
    />

    <newProductForm 
      :newProductKeysArray="newProductKeysArray"
      :newProduct="newProduct"
      @createProduct="createProduct"
      ref="newProductForm"
    />

  </div>
</template>

<script>  
  import { XlsxRead, XlsxJson} from "vue-xlsx/dist/vue-xlsx.es.js"

  import createBaseProduct from '~/components/admin/createBaseProduct'
  import importProductForm from '~/components/admin/importProductForm'
  import changeTableView from '~/components/admin/changeTableView'
  import newProductForm from '~/components/admin/newProductForm'

  export default {
    name: 'adminProducts',
    layout: 'admin',
    components: {
      XlsxRead,
      XlsxJson,
      createBaseProduct,
      importProductForm,
      changeTableView,
      newProductForm
    },
    data() {
      return {
        file: null,
        isProducts: null,
        products: [],
        headers: [],
        newProductKeysArray: [],
        importProductKeysArray: [],
        importedProducts: [],
        newProduct: {},
        importProductView: {},
      }
    },
    methods: {
      changeTableViewVisibility(){
        this.$refs.changeTableView.changeVisibility()
      },
      changeNewProductVisibility(){
        this.$refs.newProductForm.changeVisibility()
      },
      changeHeaders(event){
        this.headers = JSON.parse(JSON.stringify(event))
      },
      onUploadFile(event) {
        this.file = event ? event : null
      },
      parsed(event){
        Object.keys(event[0]).forEach(elem => {
          this.importProductKeysArray.push(elem)
        })
        this.importedProducts = event
        this.$refs.importProductForm.changeVisibility()
      },
      async importProducts(){
        await this.getProductsList()
        this.$refs.importProductForm.changeVisibility()
        this.file = null
      },
      async createProduct(){
        try {
          await this.getProductsList()
          this.changeNewProductVisibility()
        } catch (error) {
          console.log(error)
        }
      },
      async getProductsList(){
        await this.$fireStore
          .collection('products')
          .get()
          .then(res => {
            let productsList = []
            res.docs.forEach(elem => {
              productsList.push({ id: elem.id, ...elem.data()})
              this.products = productsList
            })
          })        
      },
      createProductsData(){
        Object.keys(this.products[0]).forEach(elem => {
          if(elem != 'id'){
            this.newProductKeysArray.push(elem)
            this.newProduct[elem] = ''
            this.importProductView[elem] = ''
          }
          this.headers.push({
            text: elem.charAt(0).toUpperCase() + elem.slice(1),
            value: elem,
            sortable: true
          })
        })
      },
      async createBaseProduct(){
        try {
          await this.getProductsList()
          this.createProductsData()
          this.isProducts = !this.isProducts
        } catch (error) {
          console.log(error)
        }
      },
    },
    async created() {
      if(!this.isProducts){
        await this.getProductsList()
        this.createProductsData()
      }
    },

    async asyncData({ app }){
      // Create 'products collection' and first test product
      let isProducts = await app.$fireStore.collection('products').get()

      return { isProducts: isProducts.empty }
    }
  }
</script>

<style lang="scss" scoped>
</style>