<template>
  <v-form
    v-model="form"
    ref="adminProductInfo"
  >
    <v-text-field
      v-model.number="localProduct.base_price"
      :value="localProduct.base_price"
      :label="$t('base_price')"
      type="number"
    />
    <v-text-field
      v-model.number="localProduct.price"
      :value="localProduct.price"
      :label="$t('price')"
      type="number"
    />

    <v-checkbox 
      v-model="localProduct.sale" 
      :label="$t('show_sale_icon')"
    />

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
      }
    },
    data() {
      return {
        form: true,
        localProduct: {},
      }
    },
    methods: {
      saveInfo(){
        let { base_price, price, sale } = this.localProduct
        this.$emit('saveInfo', { base_price, price, sale })
      }
    },
    mounted(){
      this.localProduct = JSON.parse(JSON.stringify(this.product))
    },
  }
</script>

<style lang="scss" scoped>
.editor-wrap{
  height: 350px;
}
</style>