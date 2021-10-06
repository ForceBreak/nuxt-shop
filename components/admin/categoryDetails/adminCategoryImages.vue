<template>
  <v-form
    ref="adminCategoryImages"
  >
    <v-row>
      <v-col xs="12" sm="6">
        <v-form
          ref="categoryImageForm"
          v-model="validCategoryImageForm"
          lazy-validation
          class="py-4 px-4"
        >
          <v-file-input
            accept="image/*"
            :label="$t('mainCatImage')"
            v-model="mainImage"
            :rules="mixin_nameRules"
          ></v-file-input>
        </v-form>
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
      },
      mutationName: {
        type: String,
        default: '',
        required: true
      },
      collectionName: {
        type: String,
        default: '',
        required: true
      },
    },
    data() {
      return {
        mainImage: null,
        uploadValue: 0,
        validCategoryImageForm: true
      }
    },
    methods: {
      ...mapMutations({
        SET_LOADER_VISIBILITY: 'loader/SET_LOADER_VISIBILITY',
        SET_LOADER_VALUE: 'loader/SET_LOADER_VALUE',
        SET_CATEGORY: 'admin/categories/SET_CATEGORY',
        SET_PRODUCT: 'admin/products/SET_PRODUCT'
      }),
      saveInfo(){
        if(this.$refs.categoryImageForm.validate()){
          this.SET_LOADER_VISIBILITY(true)

          const storageRef = this.$fireStorage.ref(`${this.collectionName}/${this.$route.params.id}/mainImage`).put(this.mainImage)
          storageRef.on(`state_changed`, snapshot =>{
            this.SET_LOADER_VALUE((snapshot.bytesTransferred/snapshot.totalBytes)*100) 
            }, error=>{
              console.log(error.message)
            }, () =>{
                storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                  this.$fireStore
                  .collection(`${this.collectionName}`)
                  .doc(this.$route.params.id)
                  .update({ ...this.product, mainImage: url })

                  this[this.mutationName]({ ...this.product, mainImage: url })
                  
                  setTimeout(() => {
                    this.SET_LOADER_VISIBILITY(false) 
                    this.SET_LOADER_VALUE(null)
                  }, 0 )
                });
              }      
          );
        }
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