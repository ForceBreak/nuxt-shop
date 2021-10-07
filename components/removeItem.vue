<template>
  <v-snackbar
    v-model="showDeleteConfirm"
    :timeout="0"
    top
  >
    <v-btn
      color="success"
      class="mx-0"
      small
      @click="remove"
    >
      {{ $t('submit') }}
    </v-btn>
    <h3>Delete?</h3>
    <v-btn
      color="warning"
      class="mx-0"
      small
      @click="hide"
    >
      {{ $t('close') }}
    </v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    data(){
      return{
        showDeleteConfirm: false,
        itemToRemove: ''
      }
    },
    methods:{
      show(item){
        this.showDeleteConfirm = true
        this.itemToRemove = JSON.parse(JSON.stringify(item))
      },
      hide(){
        this.showDeleteConfirm = false
        this.itemToRemove = ''
      },
      remove(){
        this.$emit('remove', this.itemToRemove)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>