<template>
  <v-container fluid>
    <v-row>
      <v-col class="py-0 d-flex justify-end">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="showAddForm"
              v-bind="attrs"
              v-on="on"
              icon
              color="warning"
              @click="showAddForm = false"
            >
              <v-icon>mdi-minus-circle</v-icon>
            </v-btn>
            <v-btn
              v-else
              v-bind="attrs"
              v-on="on"
              icon
              color="success"
              @click="showAddForm = true"
            >
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </template>
          <span v-if="showAddForm"> Hide Add item </span>
          <span v-else> Add item </span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-form
      v-if="showAddForm"
      ref="carouselImageForm"
      v-model="validCarouselImageForm"
      lazy-validation
    >
      <v-row>
        <v-col xs="12" sm="6">
          <v-textarea
            v-model="carouselItem.description"
            :value="carouselItem.description"
            label="Описание 1"
            auto-grow
            clearable
            rows="3"
          />

          <v-textarea
            v-model="carouselItem.description_short"
            :value="carouselItem.description_short"
            label="Краткое описание"
            auto-grow
            clearable
            rows="3"
          />

          <v-text-field 
            v-model="carouselItem.link"
            :value="carouselItem.link"
            label="Ссылка, начинать с /"
          >
            <template v-slot:append>
              <client-only>
                <infoIcon :text="`без ${$origin}`" />
              </client-only>
            </template>

          </v-text-field>
        </v-col>
        <v-col xs="12" sm="6">
          <v-file-input
            accept="image/*"
            label="Изображение слайда"
            v-model="mainImage"
            :rules="!carouselItem.edit ? mixin_nameRules : []"
          ></v-file-input>
          <v-img
            v-if="carouselItem.mainImage.length"
            :src="carouselItem.mainImage"
          /> 
        </v-col>
      </v-row>

      <v-btn
        color="success"
        @click="saveInfo"
      >
        {{ $t('save') }}
      </v-btn>
      <v-btn
        v-if="carouselItem.edit"
        color="primary"
        @click="clearSlide"
      >
        Новый
      </v-btn>
    </v-form>
    <template v-for="slide in homeSlides">
      <div :key="slide.id" class="mt-6">
        <v-row>
          <v-col xs="12" sm="6">
            <p>
              <span class="title font-weight-black">Описание:</span>
              <span class="title">{{ slide.description }}</span>
            </p>
            <p>
              <span class="title font-weight-black">Краткое описание:</span>
              <span class="title">{{ slide.description_short }}</span>
            </p>
            <v-btn color="primary" @click="editSlide(slide)">Изменить</v-btn>
            <v-btn color="error" @click="confirmRemove(slide)">Удалить</v-btn>
          </v-col>
          <v-col xs="12" sm="6">
            <v-img
              v-if="slide.mainImage.length"
              :src="slide.mainImage"
            /> 
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </div>
    </template>

    <removeItem ref="removeItem" @remove="removeSlide"/>
  </v-container>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import removeItem from '~/components/removeItem'
  import infoIcon from '~/components/infoIcon'

  export default {
    layout: 'admin',
    components: {
      removeItem,
      infoIcon
    },
    data(){
      return{
        validCarouselImageForm: true,
        mainImage: null,
        carouselItem: {
          mainImage: '',
          description: '',
          description_short: '',
          link: ''
        },
        showDeleteConfirm: false,
        showAddForm: false
      }
    },
    computed: {
      ...mapGetters({
        homeSlides: 'admin/modules/home-slider/homeSlides'
      })
    },
    methods: {
      ...mapActions({
        GET_HOME_SLIDES: 'admin/modules/home-slider/GET_HOME_SLIDES',
        UPDATE_CAROUSEL_ITEM: 'admin/modules/home-slider/UPDATE_CAROUSEL_ITEM',
        ADD_CAROUSEL_ITEM: 'admin/modules/home-slider/ADD_CAROUSEL_ITEM',
      }),
      ...mapMutations({
        SET_LOADER_VISIBILITY: 'loader/SET_LOADER_VISIBILITY',
        SET_LOADER_VALUE: 'loader/SET_LOADER_VALUE',
      }),
      clearSlide(){
        delete this.carouselItem.edit
        for (const key in this.carouselItem) {
          this.carouselItem[key] = ''
        }
      },
      async saveInfo(){
        if(this.$refs.carouselImageForm.validate()){
          this.SET_LOADER_VISIBILITY(true)

          if(this.carouselItem.edit){
            let slideID = this.carouselItem.id

            delete this.carouselItem.id
            delete this.carouselItem.edit

            if(this.mainImage){
              this.setImage(slideID)
            }else{
              await this.UPDATE_CAROUSEL_ITEM({ id: slideID, data: this.carouselItem })
              await this.GET_HOME_SLIDES()
              this.clearSlide()
              this.SET_LOADER_VISIBILITY(false) 
            }
          }else{
            let slide = await this.ADD_CAROUSEL_ITEM(this.carouselItem)
            this.setImage(slide.id)
          }
        }
      },
      setImage(id){
        const storageRef = this.$fireStorage.ref(`modules/home-carousel/${id}`).put(this.mainImage)
        storageRef.on(`state_changed`, snapshot =>{
          this.SET_LOADER_VALUE((snapshot.bytesTransferred/snapshot.totalBytes)*100) 
          }, error=>{
            console.log(error.message)
          }, () =>{
              storageRef.snapshot.ref.getDownloadURL().then(async (url)=>{
                this.carouselItem.mainImage = url
                this.mainImage = null

                await this.UPDATE_CAROUSEL_ITEM({ id: id, data: this.carouselItem })
                await this.GET_HOME_SLIDES()

                this.clearSlide()
                
                setTimeout(() => {
                  this.SET_LOADER_VISIBILITY(false) 
                  this.SET_LOADER_VALUE(null)
                }, 0 )
              });
            }      
        );
      },
      async editSlide(slide){
        this.carouselItem = JSON.parse(JSON.stringify(slide))
        this.carouselItem.edit = true
      },
      confirmRemove(slide){
        this.$refs.removeItem.show(slide)
      },
      async removeSlide(slide){
        this.SET_LOADER_VISIBILITY(true)
        await this.$fireStore.collection('modules').doc('home-slider')
            .collection('slides').doc(slide.id).delete();
        await this.$fireStorage.ref(`modules/home-carousel/${slide.id}`).delete()
        await this.GET_HOME_SLIDES()
        this.$refs.removeItem.hide()
        this.SET_LOADER_VISIBILITY(false)
      }
    },
    async asyncData({ store }){
      await store.dispatch('admin/modules/home-slider/GET_HOME_SLIDES')
    }
    
  }
</script>

<style lang="scss" scoped>

</style>