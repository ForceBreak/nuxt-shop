export default {
methods: {
  mixin_redirect_sign_in(arg){
    if(arg === 'user'){
      return 'index___'
    }else if(arg === 'admin'){
      return 'admin___'
    }
  }
}
}