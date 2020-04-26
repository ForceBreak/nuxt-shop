<template>
  <v-form
    ref="form"
    lazy-validation
  >
    <h3>{{ $t('no_products') }}</h3>
    <v-btn
      color="success"
      class="mr-4"
      @click="createBaseProduct"
    >
      {{ $t('create') }}
    </v-btn>
  </v-form>
</template>

<script>
  export default {
    methods: {
      async createBaseProduct(){
        try {
          await this.$fireStore.collection('products').doc().set({ 
            name: 'First product', 
            description: 'First product description',
            price: 550 
          })
          this.$emit('createBaseProduct')
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>