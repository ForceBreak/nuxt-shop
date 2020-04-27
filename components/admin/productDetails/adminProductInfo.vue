<template>
  <v-form
    v-model="form"
    ref="adminProductInfo"
  >
  <v-text-field
    v-model="localProduct.name"
    :value="localProduct.name"
    :label="$t('text_name')"
  />
  <v-text-field
    v-model="localProduct.code"
    :value="localProduct.code"
    :label="$t('product_code')"
  />

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
    mounted(){
      this.localProduct = JSON.parse(JSON.stringify(this.product))
    },
  }
</script>

<style lang="scss" scoped>

</style>