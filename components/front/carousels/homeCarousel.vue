<template>
  <div>
    <hooper :settings="hooperSettings">
      <slide 
        v-for="slide in slides"
        :key="slide.id"
      >
        <v-img :src="slide.mainImage" />
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
          infiniteScroll: true,
          itemsToShow: 1.25
        }
      }
    },
    methods: {
    }
  }
</script>

<style lang="scss">
.hooper{
  height: 400px;
  @media (max-width: 767px) {
    height: 200px;
  }
  &-list{
    .hooper-track{
      padding: 0;
    }
    .hooper-indicators{
      padding: 0;
      button{
        position: relative;
        display: inline-block;
        width: 14px;
        height: 14px;
        margin: 0 6px;
        background: transparent;
        border: 2px solid #fff;
        border-radius: 10px;
        opacity: 1;
        cursor: pointer;
        &:hover{
          background-color: transparent;
        }
        &.is-active{
          background-color: transparent;
          span{
            content: "";
            width: 6px;
            height: 6px;
            position: absolute;
            left: 3px;
            top: 3px;
            background: #fff;
            border-radius: 10px;
            clip: inherit;
          }
        }
      }
    }
    .hooper-pagination{
      bottom: 10px;
    }
  }
  &-slide{
    &>div{
      height: 100%;
      border-top: 10px solid #fff;
      border-bottom: 10px solid #fff;
      border-left: 20px solid #fff;
      border-right: 20px solid #fff;
    }
    .v-image{
      &__image{
        border-radius: 10px;
      }
    }
    &.is-current{
      &>div{
        border: 0;
      }
    }
  }

}
</style>