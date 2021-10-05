<template>
  <v-form
    v-model="form"
    ref="adminProductSeo"
  >
    <v-text-field
      v-model="localProduct.meta_title"
      :value="localProduct.meta_title"
      :label="$t('meta_title')"
      :rules="mixin_nameRules"
    />
    <v-text-field
      v-model="localProduct.meta_description"
      :value="localProduct.meta_description"
      :label="$t('meta_description')"
      :rules="mixin_nameRules"
    />
    <v-combobox
      v-model="localProduct.meta_keywords"
      chips
      clearable
      :label="$t('meta_keywords')"
      multiple
      solo
      :rules="mixin_keyRules"
    >
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip
          v-bind="attrs"
          :input-value="selected"
          close
          @click="select"
          @click:close="remove(item)"
        >
          <strong>{{ item }}</strong>
        </v-chip>
      </template>
    </v-combobox>

    <v-text-field
      v-model="localProduct.link_text"
      :value="localProduct.link_text"
      :label="$t('link_text')"
      :rules="mixin_nameRules"
    />

    <v-btn
      color="primary"
      @click="saveInfo"
    >
      {{ $t('save') }}
    </v-btn>
  </v-form>
</template>

<script>
  export default {
    props: {
      product: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        form: true,
        localProduct: {}
      }
    },
    methods: {
      remove (item) {
        this.localProduct.meta_keywords.splice(this.localProduct.meta_keywords.indexOf(item), 1)
        this.localProduct.meta_keywords = [...this.localProduct.meta_keywords]
      },
      saveInfo(){
        if(this.$refs.adminProductSeo.validate()){
          let { meta_title, meta_description, meta_keywords, link_text } = this.localProduct
          this.$emit('saveInfo', { meta_title, meta_description, meta_keywords, link_text })
        }
      }
    },
    mounted(){
      this.localProduct = JSON.parse(JSON.stringify(this.product))
    },
  }
</script>

<style lang="scss" scoped>
.v-menu__content{
  display: none!important;
}
</style>