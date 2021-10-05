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
      :rules="mixin_nameRules"
      item-value="id"
      solo
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
        if(this.$refs.adminProductRelations.validate()){
          let { category } = this.localProduct
          this.$emit('saveInfo', { category })
        }
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