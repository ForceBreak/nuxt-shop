<template>
  <v-btn
    color="success"
    title="Save item"
    @click="save"
  >
    {{ text }}
  </v-btn>
</template>

<script>
  export default {
    props: ['text'],
    methods: {
      save(){
        this.$emit('save')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>