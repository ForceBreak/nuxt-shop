<template>
  <v-app> 
    <!-- <mainSidebar :drawer="drawer" :items="items"/> -->
    <v-app-bar
      app
      clipped-left
      :color="mixin.theme_text_color"
      dense
      dark
      height="60"
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-spacer></v-spacer>
      <headerDefault />
    </v-app-bar>

    <v-content>
      <breadcrumbs />
      <nuxt/>
    </v-content>
    <v-footer
      :color="mixin.theme_text_color"
      padless
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
          class="my-2"
        >
          {{ link }}
        </v-btn>
        <v-col
          class="lighten-1 py-2 text-center white--text"
          :class="[mixin.theme_text_color]"
          cols="12"
        >
          Made with  
          <v-btn
            icon
            color="green"
            small
          >
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          by 
          <a href="https://www.upwork.com/search/profiles/?q=Pigusov&profile=~01a982bd5c224f351c" target="_blank" class="white--text">
            <strong>Illia</strong>
          </a>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import headerDefault from '~/components/header/headerDefault.vue'
import breadcrumbs from '~/components/breadcrumbs.vue'
import mainSidebar from '~/components/mainSidebar'

export default {
  components: {
    headerDefault,
    mainSidebar,
    breadcrumbs
  },
  data(){
    return {
      drawer: false,
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],
    }
  },
  computed: {
  },
  mounted(){
  }
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

