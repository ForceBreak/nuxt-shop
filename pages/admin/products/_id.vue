<template>
  <div>
    <code>
      {{ product }}
    </code>
  </div>
</template>

<script>
  export default {
    layout: 'admin',
    data() {
      return {
        product: {}
      }
    },
    async asyncData({ app, route }){
      let product = await app.$fireStore.collection('products').doc(route.params.id).get()
      return { product: product.data() }
    }
  }
</script>

<style lang="scss" scoped>

</style>