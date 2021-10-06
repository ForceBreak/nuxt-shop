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
          :key="index"
          v-model="newProduct[item.name]"
          :rules="mixin_nameRules"
          :label="item.name.charAt(0).toUpperCase() + item.name.slice(1)"
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
        localKeys: []
      }
    },
    methods: {
      changeVisibility(){
        this.newOne = !this.newOne
        if(!this.newOne)
          this.$refs.newProductForm.resetValidation()
      },
      async createProduct(){
        if(this.$refs.newProductForm.validate()){
          try {
            await this.$fireStore.collection(this.collection).doc().set(this.newProduct)
            this.$emit('createProduct')
          } catch (error) {
            console.log(error)
          }
        }
      },
    },
    mounted(){
      this.localKeys = this.newProductKeysArray.filter(elem => elem.name != 'category' && elem.name != 'image' && elem.name != 'code')
      this.localKeys = this.localKeys.sort((a, b) => a.index - b.index)
    }
  }
</script>

<style lang="scss" scoped>

</style>