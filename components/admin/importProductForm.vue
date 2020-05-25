<template>
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
            v-if="typeof(item) == 'string'"
            v-model="importProductView[item]"
            :key="index"
            :items="importProductKeysArray"
            :label="item.charAt(0).toUpperCase() + item.slice(1)"
          />
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
</template>

<script>
  export default {
    props: {
      importedProducts:{
        type: Array,
        default: () => []
      },
      newProductKeysArray:{
        type: Array,
        default: () => []
      },
      importProductKeysArray:{
        type: Array,
        default: () => []
      },
      importProductView:{
        type: Object,
        default: () => {}
      },
      collection: {
        type: String,
        default: ''
      }
    },
    data(){
      return {
        importProductsModal: false,
        validImportProductForm: true
      }
    },
    methods: {
      changeVisibility(){
        this.importProductsModal = !this.importProductsModal
      },
      async importProducts(){
        this.importedProducts.forEach(elem => {
          let configuredItem = {}
          for(let item in this.importProductView){
            if(elem[this.importProductView[item]]){
              configuredItem[item] = elem[this.importProductView[item]]
            }else{
              configuredItem[item] = ''
            }
          }
          this.$fireStore.collection(this.collection).doc().set(configuredItem)
        })
        this.$emit('importProducts')
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>