<template>
  <div>
    <v-layout class="d-flex justify-end ">
      <v-flex xs12 sm2>
        <v-file-input 
          @change="onUploadFile"
          chips
          :label="$t('import_products')"
        />
      </v-flex>
      <v-btn
        color="success"
        class="my-4 mx-4"
        @click="newOne = !newOne"
      >
        {{ $t('create_new_product') }}
      </v-btn>
      <v-btn
        color="success"
        class="my-4 mx-4"
        @click="drawer = !drawer"
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

    <v-form
      ref="form"
      lazy-validation
      v-if="isProducts"
    >
      <h3>{{ $t('no_products') }}</h3>
      <v-btn
        color="success"
        class="mr-4"
        @click="createBaseProduct"
      >
        Create
      </v-btn>
    </v-form>

    <v-dialog
      v-model="importProductsModal"
      width="500"
    >
      <v-card>
        <v-form
          ref="importProductForm"
          v-model="validImportProductForm"
          lazy-validation
          class="py-4 px-4"
        >
          <template v-for="(item, index) in newProductKeysArray">
            <v-select
              v-model="importProductView[item]"
              :key="index"
              :items="importProductKeysArray"
              :label="item.charAt(0).toUpperCase() + item.slice(1)"
            ></v-select>
          </template>

          <v-btn
            :color="mixin.admin_theme_text_color"
            dark
            class="mr-4"
            @click="importProducts"
          >
            {{ $t('submit') }}
          </v-btn>
          <v-btn
            :color="mixin.admin_theme_text_color_warning"
            dark
            class="mr-4"
            @click="importProductsModal = !importProductsModal"
          >
            {{ $t('close') }}
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="drawer"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{ $t('change_table_view') }}
        </v-card-title>

        <v-card-text>
          <v-list dense>
            <draggable :list="headers" ghost-class="ghost">
              <v-list-item
                v-for="item in headers"
                :key="item.id"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </draggable>
          </v-list>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="drawer = !drawer"
          >
            {{ $t('close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="newOne"
      width="500"
      persistent
    >
      <v-card>
        <v-form
        ref="newProductForm"
        v-model="validNewProductForm"
        lazy-validation
        class="py-4 px-4"
      >
        <template v-for="(item, index) in newProductKeysArray">
          <v-text-field
            :key="index"
            v-model="newProduct[item]"
            :rules="[v => !!v || `${item.charAt(0).toUpperCase() + item.slice(1)} is required`]"
            :label="item.charAt(0).toUpperCase() + item.slice(1)"
            required
          ></v-text-field>
        </template>

        <v-btn
          :color="mixin.admin_theme_text_color"
          dark
          class="mr-4"
          @click="createProduct"
        >
          {{ $t('submit') }}
        </v-btn>
        <v-btn
          :color="mixin.admin_theme_text_color_warning"
          dark
          class="mr-4"
          @click="closeNewOne"
        >
          {{ $t('close') }}
        </v-btn>
      </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>  
  import draggable from 'vuedraggable'
  import { XlsxRead, XlsxJson} from "vue-xlsx/dist/vue-xlsx.es.js"

  export default {
    name: 'adminProducts',
    layout: 'admin',
    components: {
      draggable,
      XlsxRead,
      XlsxJson,
    },
    data() {
      return {
        file: null,
        selectedSheet: null,
        isProducts: null,
        products: [],
        headers: [],
        newProductKeysArray: [],
        importProductKeysArray: [],
        importedProducts: [],
        drawer: false,
        newOne: false,
        importProductsModal: false,
        newProduct: {},
        importProductView: {},
        validNewProductForm: true,
        validImportProductForm: true
      }
    },
    methods: {
      onUploadFile(event) {
        this.file = event ? event : null
      },
      parsed(event){
        Object.keys(event[0]).forEach(elem => {
          this.importProductKeysArray.push(elem)
        })
        this.importedProducts = event
        this.importProductsModal =! this.importProductsModal
      },
      closeNewOne(){
        this.newOne = false
        this.$refs.newProductForm.resetValidation()
      },
      async importProducts(){
        this.importedProducts.forEach(elem => {
          let configuredItem = {}
          for(let item in this.importProductView){
            if(elem[this.importProductView[item]])
              configuredItem[item] = elem[this.importProductView[item]]
          }
          this.$fireStore.collection('products').doc().set(configuredItem)
        })
        await this.getProductsList()
        this.importProductsModal = false
        this.file = null
      },
      async createProduct(){
        if(this.$refs.newProductForm.validate()){
          try {
            await this.$fireStore.collection('products').doc().set(this.newProduct)
            this.getProductsList()
          } catch (error) {
            console.log(error)
          }
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
          let firstProduct = await this.$fireStore.collection('products').doc().set({ 
            name: 'First product', 
            description: 'First product description',
            price: 550 
          })
          await this.getProductsList()
          this.createProductsData()
          this.isProducts = !this.isProducts
        } catch (error) {
          console.log(error)
        }
      },
    },
    computed: {
      tableHeaders(){
        return this.headers
      }
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
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>