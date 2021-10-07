<template>
  <div>
    modules
    <nuxt-link :to="{ name: `admin-modules-home-carousel___${mixin_locale}` }"> Home carousel </nuxt-link>
  </div>  
</template>

<script>
  export default {
    layout: 'admin',
  }
</script>

<style lang="scss" scoped>

</style>