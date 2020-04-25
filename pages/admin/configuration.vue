<template>
  <div>
    <v-form
      ref="form"
      lazy-validation
    >
      <v-btn
        v-if="isProducts"
        color="success"
        class="mr-4"
        @click="createProduct"
      >
        Create test product
      </v-btn>
      <v-btn
        v-if="isCategories"
        color="success"
        class="mr-4"
        @click="createCategory"
      >
        Create test category
      </v-btn>

    </v-form>
  </div>
</template>

<script>
  export default {
    name: 'adminConfiguration',
    layout: 'admin',
    data() {
      return {
        isProducts: null,
        isCategories: null,
      }
    },
    methods: {
      async createProduct(){
        try {
          let firstProduct = await this.$fireStore.collection('products').doc().set({ 
            name: 'First product', 
            description: 'First product description',
            price: 550 
          })
          this.isProducts = !this.isProducts
        } catch (error) {
          console.log(error)
        }
      },
      async createCategory(){
        try {
          let firstCategory = await this.$fireStore.collection('categories').doc().set({ 
            name: 'First category', 
            description: 'First category description'
          })
          this.isCategories = !this.isCategories
        } catch (error) {
          console.log(error)
        }
      }
    },

    async asyncData({ app }){
      // Create 'products collection' and first test product
      let isProducts = await app.$fireStore.collection('products').get()
      let isCategories = await app.$fireStore.collection('categories').get()

      return {
        isProducts: isProducts.empty,
        isCategories: isCategories.empty
      }
      

      // if(isProducts.empty){
        
      // }
      // if(isCategories.empty){
        
      // }
      // console.log(isProducts, isCategories)
      
      // await app.$fireStore.collection('products').doc().set({ 
      //   name: 'First product', 
      //   description: 'First product description',
      //   price: 550 
      // })
    }
  }
</script>

<style lang="scss" scoped>

</style>