<template>
  <v-form
    v-model="form"
    ref="adminProductInfo"
  >
    <v-text-field
      v-model="localProduct.name"
      :value="localProduct.name"
      :label="$t('text_name')"
    />

    <h4>{{ $t('short_description') }}</h4>
    <div class="editor-wrap-short mb-4">
      <div id="short_description"></div>
    </div>

    <h4>{{ $t('description') }}</h4>
    <div class="editor-wrap mb-4">
      <div id="description"></div>
    </div>

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
    name: 'adminCategoryInfo',
    props: {
      product: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        form: true,
        localProduct: {},
        descriptionEditor: '',
        shortDescriptionEditor: '',
      }
    },
    methods: {
      saveInfo(){
        this.localProduct.description = this.descriptionEditor.getContent()
        this.localProduct.short_description = this.shortDescriptionEditor.getContent()

        let { name, description, short_description } = this.localProduct
        this.$emit('saveInfo', { name, description, short_description })
      },
    },
    mounted(){
      this.localProduct = JSON.parse(JSON.stringify(this.product))
      let editorConfig = {
        toolbar: [
          'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
          'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider', 'subscript', 'superscript',
          'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
          'insertOrderedList', 'insertUnorderedList', '|', 'tables', '|', 'switchView'
        ],
        uploadUrl: ''
      }

      this.descriptionEditor = this.$vueeditor('#description', editorConfig)
      this.shortDescriptionEditor = this.$vueeditor('#short_description', editorConfig)
      this.descriptionEditor.setContent(this.product.description)

      if(this.product.short_description){
        this.shortDescriptionEditor.setContent(this.product.short_description)
      }
    },
  }
</script>

<style lang="scss" scoped>
.editor-wrap{
  height: 350px;
  &-short{
    height: 200px;
  }
}
</style>