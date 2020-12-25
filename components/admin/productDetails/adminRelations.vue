<template>
  <v-form
    v-model="form"
    ref="adminProductRelations"
  >
    <v-autocomplete
      v-model="localProduct.category"
      :items="categories"
      item-text="name"
      clearable
      :label="$t('categories')"
      item-value="id"
      multiple
      solo
      chips
    ></v-autocomplete>    

    <v-btn
      color="primary"
      @click="saveInfo"
    >
      {{ $t('save') }}
    </v-btn>
  </v-form>
</template>

<script>
  export default {
    props: {
      product: {
        type: Object,
        default: () => {}
      },
      categories: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        form: true,
        localProduct: {},
      }
    },
    methods: {
      remove (item, from) {
        this.localProduct[from].splice(this.localProduct[from].indexOf(item), 1)
        this.localProduct[from] = [...this.localProduct[from]]
      },
      saveInfo(){
        let { meta_title, meta_description, meta_keywords, link_text, category } = this.localProduct
        this.$emit('saveInfo', { meta_title, meta_description, meta_keywords, link_text, category })
      }
    },
    mounted(){
      this.localProduct = JSON.parse(JSON.stringify(this.product))
    },
  }
</script>

<style lang="scss" scoped>
.v-menu__content{
  display: none!important;
}
</style>