<template>
  <v-form
    v-model="form"
    ref="adminProductInfo"
  >
    <v-text-field
      v-model="localProduct.base_price"
      :value="localProduct.base_price"
      :label="$t('base_price')"
    />
    <v-text-field
      v-model="localProduct.price"
      :value="localProduct.price"
      :label="$t('price')"
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
        let { base_price, price } = this.localProduct
        this.$emit('saveInfo', { base_price, price })
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