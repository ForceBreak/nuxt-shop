export default {
  computed: {
    locale() {
      return this.$i18n.locale
    },
    locales() {
      return this.$i18n.locales
    },
    linkLocale() {
      if(this.$route.path.length > 1){
        return `${this.$route.path}/`
      }else {
        return this.$route.path
      }
    }
  }
}