<template>
  <v-form
    v-model="form"
    ref="adminProductInfo"
  >
    <template>
      <v-text-field
        v-model="localProduct.name[mixin_locale]"
        :value="localProduct.name[mixin_locale]"
        :label="$t('text_name')"
      />
    </template>
    <v-text-field
      v-model="localProduct.code"
      :value="localProduct.code"
      :label="$t('product_code')"
    />
    <v-text-field
      v-model.number="localProduct.weight"
      :value="localProduct.weight"
      :label="$t('weigth')"
      type="number"
    />

    <h4>{{ $t('short_description') }}</h4>
    <div class="editor-wrap-short mb-4">
      <div id="short_description"></div>
    </div>

    <h4>{{ $t('description') }}</h4>
    <div class="editor-wrap mb-4">
      <div id="description"></div>
    </div>

    <v-combobox
      v-model="localProduct.tags[mixin_locale]"
      chips
      clearable
      :label="$t('tags')"
      multiple
      solo
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
        localProduct: {
          tags: {},
          name: {}
        },
        descriptionEditor: '',
        shortDescriptionEditor: ''
      }
    },
    methods: {
      saveInfo(){
        this.localProduct.description[this.mixin_locale] = this.descriptionEditor.getContent()
        this.localProduct.short_description[this.mixin_locale] = this.shortDescriptionEditor.getContent()
        
        let { name, code, description, short_description, tags, weight } = this.localProduct
        this.$emit('saveInfo', { name, code, description, short_description, tags, weight })
      },
      remove (item) {
        this.localProduct.tags[this.mixin_locale].splice(this.localProduct.tags[this.mixin_locale].indexOf(item), 1)
        this.localProduct.tags[this.mixin_locale] = [...this.localProduct.tags[this.mixin_locale]]
      },
      setContent(val){
        this.descriptionEditor.setContent(this.product.description[val])

        if(this.product.short_description){
          this.shortDescriptionEditor.setContent(this.product.short_description[val])
        }
      }
    },
    watch: {
      mixin_locale(val){
        this.setContent(val)
      }
    },
    mounted(){
      Object.assign(this.localProduct, JSON.parse(JSON.stringify(this.product)))
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

      this.setContent(this.mixin_locale)
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