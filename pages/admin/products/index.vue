<template>
  <div>
    <v-layout class="d-flex justify-end ">
      <v-flex xs12 sm2>
        <v-form
          v-model="validFile"
          ref="validFile"  
        >
          <v-file-input 
            v-if="!isProducts"
            @change="onUploadFile"
            @click:clear="resetImportValidation"
            :rules="isExcel"
            chips
            :label="$t('import_products')"
            accept="application/vnd.ms-excel"
            disabled
          />
        </v-form>
      </v-flex>
      <v-btn
        v-if="!isProducts"
        icon
        color="success"
        class="my-2"
        :title="$t('create_new_product')"
        @click="changeNewProductVisibility"
      >
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
      <v-btn
        v-if="!isProducts"
        icon
        color="primary"
        class="my-2"
        :title="$t('change_table_view_title')"
        @click="changeTableViewVisibility"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        v-if="!isProducts"
        icon
        color="warning"
        class="my-2"
        :title="$t('delete')"
        :disabled="!Boolean(selectedProducts.length)"
        @click="deleteProductsVisibility"
      >
        <v-icon>mdi-delete-sweep</v-icon>
      </v-btn>
      <v-btn
        v-if="!isProducts"
        icon
        color="primary"
        class="my-2"
        :title="$t('search')"
        @click="showSearch = !showSearch"
      > 
        <v-icon v-if="showSearch">mdi-close</v-icon>
        <v-icon v-else>mdi-magnify</v-icon>
      </v-btn>
    </v-layout>
    <v-card v-if="products.length">
      <v-card-title v-if="showSearch">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$t('search')"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        v-model="selectedProducts"
        :headers="headers"
        :items="products"
        :items-per-page="30"
        :search="search"
        class="elevation-1"
        show-select
      >
        <template v-slot:header.name="{ header }">
          {{ $t(header.value) }}
        </template>
        <template v-slot:header.description="{ header }">
          {{ $t(header.value) }}
        </template>
        <template v-slot:header.category="{ header }">
          {{ $t(header.value) }}
        </template>
        <template v-slot:header.price="{ header }">
          {{ $t(header.value) }}
        </template>
        <template v-slot:header.base_price="{ header }">
          {{ $t(header.value) }}
        </template>
        <template v-slot:header.image="{ header }">
          {{ $t(header.value) }}
        </template>
        <template v-slot:header.code="{ header }">
          {{ $t(header.value) }}
        </template>
        <template v-slot:header.actions="{ header }">
          {{ $t(header.value) }}
        </template>

        
        <template v-slot:item.actions="{ item }">
          <v-btn
            icon
            color="primary"
            class="mx-2"
            :title="$t('edit')"
            :to="{name: `admin-products-id___${mixin_locale}`, params: {id: item.id}}"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>

        <template v-slot:item.name="{ item }">
          {{ item.name[mixin_locale] }}
        </template>

        <template v-slot:item.description="{ item }">
          {{ mixin_truncate(item.description, 20) }}
        </template>
      </v-data-table>
    </v-card>

    <!-- Import components -->
    <section>
      <xlsx-read :file="file">
        <xlsx-json @parsed="parsed($event)"></xlsx-json>
      </xlsx-read>
    </section>
    <!-- Import components end -->

    <createBaseItem 
      v-if="isProducts" 
      collectionView="productView"
      collection="products"
      title="no_products"
      :itemView="itemView"
      @createBaseItem="createBaseProduct"
    />

    <importProductForm 
      :newProductKeysArray="newProductKeysArray"
      :importProductKeysArray="importProductKeysArray"
      :importProductView="importProductView"
      :importedProducts="importedProducts"
      collection="products"
      @importProducts="importProducts"
      ref="importProductForm"
    />

    <changeTableView 
      :headers="headers" 
      :productViewId="productViewId"
      collection="productView"
      @changeHeaders="changeHeaders"
      ref="changeTableView"
    />

    <newProductForm 
      :newProductKeysArray="newProductKeysArray"
      :newProduct="newProduct"
      collection="products"
      @createProduct="createProduct"
      ref="newProductForm"
    />

    <v-snackbar
      v-model="showDeleteConfirm"
      :timeout="0"
      top
    >
      <v-btn
        color="success"
        class="mx-0"
        small
        @click="deleteProducts"
      >
        {{ $t('submit') }}
      </v-btn>
      <h3>Delete?</h3>
      <v-btn
        color="warning"
        class="mx-0"
        small
        @click="deleteProductsVisibility"
      >
        {{ $t('close') }}
      </v-btn>
    </v-snackbar>

  </div>
</template>

<script>  
  import { XlsxRead, XlsxJson} from "vue-xlsx/dist/vue-xlsx.es.js"

  import createBaseItem from '~/components/admin/createBaseItem'
  import importProductForm from '~/components/admin/importProductForm'
  import changeTableView from '~/components/admin/changeTableView'
  import newProductForm from '~/components/admin/newProductForm'

  export default {
    name: 'adminProducts',
    layout: 'admin',
    components: {
      XlsxRead,
      XlsxJson,
      createBaseItem,
      importProductForm,
      changeTableView,
      newProductForm
    },
    data() {
      return {
        itemView: {
          name: 1, 
          description: 2,
          category: 3,
          price: 4, 
          base_price: 5,
          image: 6,
          code: 7
        },
        search: '',
        showSearch: false,
        showDeleteConfirm: false,
        validFile: true,
        file: null,
        isProducts: null,
        products: [],
        headers: [],
        newProductKeysArray: [],
        importProductKeysArray: [],
        importedProducts: [],
        newProduct: {},
        importProductView: {},
        productView: {},
        productViewId: '',
        selectedProducts: [],
        isExcel: [
          value => 
            value && value.name.substr(value.name.length - 4) == 'xlsx' 
            || value && value.name.substr(value.name.length - 3) == 'xls' 
            || this.$t('excel_only')
        ]
      }
    },
    methods: {
      deleteProducts(){
        this.selectedProducts.forEach(async elem => {
          await this.$fireStore.collection('products').doc(elem.id).delete()
          this.products = this.products.filter(item => item.id != elem.id )
        })
        this.deleteProductsVisibility()
      },
      deleteProductsVisibility(){
        this.showDeleteConfirm = !this.showDeleteConfirm
      },
      changeTableViewVisibility(){
        this.$refs.changeTableView.changeVisibility()
      },
      changeNewProductVisibility(){
        this.$refs.newProductForm.changeVisibility()
      },
      changeHeaders(event){
        this.headers = JSON.parse(JSON.stringify(event))
      },
      resetImportValidation(){
        this.$refs.validFile.reset()
      },
      onUploadFile(event) {
        if(this.$refs.validFile.validate()){
          this.file = event ? event : null
        }
      },
      parsed(event){
        this.importProductKeysArray = []
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
        this.headers = new Array(Object.keys(this.productView).length)
        Object.keys(this.productView).forEach(elem => {
          if(elem != 'id' && elem != 'actions'){
            this.newProductKeysArray.push({ name: elem, index:  this.productView[elem] })
            this.newProduct[elem] = ''
            this.importProductView[elem] = ''
          }
          this.headers.splice(this.productView[elem], 1, {
            text: elem.charAt(0).toUpperCase() + elem.slice(1),
            value: elem,
            sortable: true
          })
        })
        let isActions = this.headers.find(elem => elem.value == 'actions')
        if(!isActions){
          this.headers.push({
            text: 'Actions',
            value: 'actions',
            sortable: false
          })
        }
        
      },
      async createBaseProduct(event){
        this.productView = {...this.itemView, id: 0}
        this.productViewId = event.itemViewId
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
      let parsedProductView, productViewId = ''
      // Create 'products collection' and first test product
      let isProducts = await app.$fireStore.collection('products').get()
      let productView = await app.$fireStore.collection('productView').get()

      if(!productView.empty){
        parsedProductView = productView.docs[0].data()
        productViewId = productView.docs[0].id
      }
      
      return { isProducts: isProducts.empty, productView: parsedProductView, productViewId: productViewId }
    }
  }
</script>

<style lang="scss" scoped>
</style>