export default {
  methods: {
    mixin_redirect_sign_in(arg){
      if(arg === 'user'){
        return 'index___'
      }else if(arg === 'admin'){
        return 'admin___'
      }
    },
    mixin_set_active_component(component){
      this.$router.push({
        path: this.$route.path,
        query: {
          subPage: component
        }
      })
    }
  }
}