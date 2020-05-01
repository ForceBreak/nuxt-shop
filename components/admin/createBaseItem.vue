<template>
  <v-form
    ref="form"
    lazy-validation
  >
    <h3>{{ $t(title) }}</h3>
    <v-btn
      color="success"
      class="mr-4"
      @click="createBaseItem"
    >
      {{ $t('create') }}
    </v-btn>
  </v-form>
</template>

<script>
  export default {
    props: {
      collectionView: {
        type: String,
        default: ''
      },
      collection: {
        type: String,
        default: ''
      },
      itemView: {
        type: Object,
        default: () => {}
      },
      title: {
        type: String,
        default: ''
      }
    },
    methods: {
      async createBaseItem(){
        try {
          await this.$fireStore.collection(this.collectionView).doc().set({...this.itemView, id: 0})
          let itemViewId = await this.$fireStore
            .collection(this.collectionView)
            .get()
            .then(response => {
              return response.docs[0].id
            })
          await this.$fireStore.collection(this.collection).doc().set(this.itemView)
          this.$emit('createBaseItem', {
            itemViewId
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