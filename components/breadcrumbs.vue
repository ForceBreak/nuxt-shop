<template>
  <v-container fluid>
    <ol
      v-if="isShow"
      vocab="http://schema.org/"
      typeof="BreadcrumbList"
      class="pl-0"
    >
      <li property="itemListElement" typeof="ListItem">
        <NLink property="item" typeof="WebPage" :to="{ name: `index___${mixin_locale}` }">
          <span property="name">{{ $t('mainPage') }}</span>
        </NLink>
        <meta property="position" content="1" />
      </li>
      <li
        v-for="(crumb, index) in crumbs"
        :key="index"
        property="itemListElement"
        typeof="ListItem"
      >
        <NLink property="item" typeof="WebPage" :to="crumb.path">
          <span property="name">{{
            crumb.title
          }}</span>
        </NLink>
        <meta property="position" :content="index + 2" />
      </li>
    </ol>
  </v-container>
</template>

<script>
  export default {
    computed: {
      crumbs() {
        const fullPath = this.$route.fullPath
        const params = fullPath.startsWith('/')
          ? fullPath.substring(1).split('/')
          : fullPath.split('/')
        const crumbs = []
        let path = ''
        params.forEach((param, index) => {
          path = `${path}/${param}`
          const match = this.$router.match(path)
          // console.log(match, 'match', path, 'path')
          if (match.name !== null) {
            crumbs.push({
              title: this.$t(param.replace(/-/g, ' ')),
              ...match,
            })
          }
        })

        if(this.mixin_locale != this.$i18n.defaultLocale ) crumbs.shift()
        
        return crumbs
      },
      isShow(){
        if(this.crumbs.length == 1 && this.crumbs[0].fullPath == '/') return false
        if(this.crumbs.length == 0) return false
        else return true
      }
    }
  }
</script>

<style lang="scss" scoped>
ol {
  list-style: none;
}
li {
  display: inline;
}
li:after {
  content: ' » ';
  display: inline;
  font-size: 0.9em;
  color: #aaa;
  padding: 0 0.0725em 0 0.15em;
}
li:last-child:after {
  content: '';
}
li a {
  color: black;
}
li a.nuxt-link-exact-active.nuxt-link-active {
  color: grey;
}
</style>