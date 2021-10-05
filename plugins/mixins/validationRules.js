export default {
  data(){
    return {
      mixin_nameRules: [
        v => !!v || 'Field is required'
      ],
      mixin_keyRules: [
        v => v && Boolean(v.length) || 'Field is required'
      ],
    }
  }
}