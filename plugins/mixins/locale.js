export default {
  computed: {
    mixin_locale() {
      return this.$i18n.locale
    },
    mixin_locales() {
      let languages = []
      this.$i18n.locales.forEach(item => {
        languages.push({
          id: item.code,
          title: item.code.toUpperCase(),
          flagSrc: `https://cdn.vuetifyjs.com/images/flags/${item.code}.png`
        })
      });

      return languages
    },
    linkLocale() {
      if(this.$route.path.length > 1){
        return `${this.$route.path}/`
      }else {
        return this.$route.path
      }
    },
  }
}