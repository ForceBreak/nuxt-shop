<template>  
  <v-row>
    <v-col
      v-for="category in homeCategoriesCarousel" 
      :key="category.id"
      sm="6" md="3">
      <v-card
        class="mx-auto my-12"
        max-width="374"
      >
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-img
          height="200"
          :src="category.mainImage"
        ></v-img>

        <v-card-title>{{ category.name }}</v-card-title>

        <v-card-text>
          <v-row
            align="center"
            class="mx-0"
          >
            <v-rating
              :value="4.5"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>

            <div class="grey--text ml-4">
              4.5 (413)
            </div>
          </v-row>

          <div>{{ category.short_description }}</div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-actions>
          <v-btn
            color="deep-purple lighten-2"
            text
          >
            Reserve
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data(){
    return {
      model: 0,
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange',
      ],
    }
  },
  computed: {
    ...mapGetters({
      homeCategoriesCarousel: 'front/carousels/homeCategories/homeCategoriesCarousel'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>