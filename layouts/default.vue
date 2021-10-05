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
      <v-breadcrumbs :items="items"></v-breadcrumbs>
      {{breadcrumbs}}
      <nuxt/>
    </v-content>
  </v-app>
</template>

<script>
import headerDefault from '~/components/header/headerDefault.vue'
import mainSidebar from '~/components/mainSidebar'

export default {
  components: {
    headerDefault,
    mainSidebar
  },
  data(){
    return {
      drawer: false,
      // items: [
      //   { icon: 'mdi-trending-up', text: 'Most Popular' },
      //   { icon: 'mdi-youtube-subscription', text: 'Subscriptions' },
      //   { icon: 'mdi-history', text: 'History' },
      //   { icon: 'mdi-playlist-play', text: 'Playlists' },
      //   { icon: 'mdi-clock', text: 'Watch Later' },
      // ],
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
    }
  },
  computed: {
    breadcrumbs(){
      console.log(this.$route.fullPath.split('/'))
      return ''
    }
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

