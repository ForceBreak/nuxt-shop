<template>
  <div>
    <hooper :settings="hooperSettings">
      <slide 
        v-for="slide in slides"
        :key="slide.id"
      >
        <v-img :src="slide.mainImage"></v-img>
      </slide>

      <hooper-pagination slot="hooper-addons"></hooper-pagination>
    </hooper>
  </div>
</template>

<script>
  import { Hooper, Slide, Pagination as HooperPagination } from 'hooper';
  import 'hooper/dist/hooper.css';
  
  export default {
    components: {
      Hooper,
      Slide,
      HooperPagination
    },
    props: {
      slides: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        hooperSettings: {
          itemsToShow: 3,
          centerMode: true,
          infiniteScroll: true
        }
      }
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>

</style>