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
        // Value is order of the field
        let productView = {
          id: 0,
          name: 1, 
          description: 2,
          category: 3,
          price: 4, 
          base_price: 5,
          image: 6,
          code: 7
        }
        try {
          await this.$fireStore.collection('productView').doc().set(productView)
          let productViewId = await this.$fireStore
            .collection('productView')
            .get()
            .then(response => {
              return response.docs[0].id
            })
          await this.$fireStore.collection('products').doc().set({ 
            name: 'First product', 
            description: 'First product description',
            category: 'First product category',
            price: 550,
            base_price: 400,
            image: '',
            code: 'Adasd124' 
          })
          this.$emit('createBaseProduct', {
            productView: productView,
            productViewId: productViewId
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>