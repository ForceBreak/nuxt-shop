<template>
  <v-form
    ref="adminCategoryImages"
  >
    <v-row>
      <v-col xs="12" sm="6">
        <v-file-input
          accept="image/*"
          :label="$t('mainCatImage')"
          v-model="mainImage"
        ></v-file-input>
        <v-img
          v-if="product.mainImage"
          :src="product.mainImage"
        />
      </v-col>
    </v-row>

    <v-btn
      color="primary"
      @click="saveInfo"
    >
      {{ $t('save') }}
    </v-btn>
  </v-form>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    props: {
      product: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        mainImage: [],
        uploadValue: 0
      }
    },
    methods: {
      ...mapMutations({
        SET_LOADER_VISIBILITY: 'loader/SET_LOADER_VISIBILITY',
        SET_LOADER_VALUE: 'loader/SET_LOADER_VALUE',
        SET_CATEGORY: 'admin/category/SET_CATEGORY'
      }),
      saveInfo(){
        this.SET_LOADER_VISIBILITY(true)

        const storageRef = this.$fireStorage.ref(`categories/${this.$route.params.id}/mainImage`).put(this.mainImage)
        storageRef.on(`state_changed`, snapshot =>{
          this.SET_LOADER_VALUE((snapshot.bytesTransferred/snapshot.totalBytes)*100) 
          }, error=>{
            console.log(error.message)
          }, () =>{
              storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                this.$fireStore
                .collection('categories')
                .doc(this.$route.params.id)
                .update({ ...this.product, mainImage: url })

                this.SET_CATEGORY({ ...this.product, mainImage: url })
                
                setTimeout(() => {
                  this.SET_LOADER_VISIBILITY(false) 
                  this.SET_LOADER_VALUE(null)
                }, 0 )
              });
            }      
        );
      },
    },
    mounted(){
      this.localProduct = JSON.parse(JSON.stringify(this.product))
    },
  }
</script>

<style lang="scss" scoped>
.v-menu__content{
  display: none!important;
}
</style>