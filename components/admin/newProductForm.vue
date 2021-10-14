<template>
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
      <template v-for="(item, index) in localKeys">
        <v-text-field
          v-if="item.name == 'price'"
          :key="index"
          v-model.number="localProduct[item.name]"
          type="number"
          :rules="mixin_nameRules"
          :label="$t(item.name)"
          required
        />
        <v-text-field
          v-else
          :key="index"
          v-model="localProduct[item.name][mixin_locale]"
          :rules="mixin_nameRules"
          :label="$t(item.name)"
          required
        />
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
        @click="changeVisibility"
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
      newProductKeysArray:{
        type: Array,
        default: () => []
      },
      newProduct:{
        type: Object,
        default: () => {}
      },
      collection: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        newOne: false,
        validNewProductForm: true,
        localKeys: [],
        localProduct: {}
      }
    },
    methods: {
      changeVisibility(){
        this.newOne = !this.newOne
        if(!this.newOne) this.$refs.newProductForm.resetValidation()
          
        this.localKeys = this.newProductKeysArray.filter(elem => elem.name != 'category' && elem.name != 'image' && elem.name != 'code' && elem.name != 'base_price')
        this.localKeys = this.localKeys.sort((a, b) => a.index - b.index)

        this.localProduct = JSON.parse(JSON.stringify(this.newProduct))
        this.localProduct.name = {}
        this.localProduct.description = {}
        this.mixin_locales.forEach(elem => {
          this.localProduct.name[elem.id] = ''
          this.localProduct.description[elem.id] = ''
        });
      },
      async createProduct(){
        if(this.$refs.newProductForm.validate()){
          try {
            await this.$fireStore.collection(this.collection).doc().set(this.localProduct)
            this.$emit('createProduct')
          } catch (error) {
            console.log(error)
          }
        }
      },
    },
    mounted(){
      
    }
  }
</script>

<style lang="scss" scoped>

</style>