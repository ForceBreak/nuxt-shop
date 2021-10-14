<template>
  <v-container>
    <v-row class="justify-end align-center">
      <successtextBtn :text="$t('save')" @save="updateTranslations"/>
      <v-col sm="3">
        <v-text-field
          @input="search"
          label="Search"
          outlined
          dense
          hide-details
        />
      </v-col>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="showAddForm"
            v-bind="attrs"
            v-on="on"
            icon
            color="warning"
            class="my-2"
            @click="hideAddField"
          >
            <v-icon>mdi-minus-circle</v-icon>
          </v-btn>
          <v-btn
            v-else
            v-bind="attrs"
            v-on="on"
            icon
            color="success"
            class="my-2"
            @click="showAddField"
          >
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
        </template>
        <span v-if="showAddForm"> Hide Add item </span>
        <span v-else> Add item </span>
      </v-tooltip>
      <v-col sm="1">
        <v-select
          v-model="selectedLang"
          :items="langs"
          dense
          solo
          hide-details
        />
      </v-col>
    </v-row>
    <v-row v-if="showAddForm">
      <v-col class="py-2 px-0">
        <v-card elevation="10" class="py-4 px-4">
          <h3>Add new translation</h3>
          <v-form ref="newItemForm">
            <v-row class="flex-wrap align-center">
              <v-col sm="4" class="py-0">
                <v-text-field
                  v-model="addItemView.name"
                  label="Key"
                  :rules="[...isUniqueRules, ...mixin_nameRules]"
                  required
                ></v-text-field>
              </v-col>
              <v-col sm="8" class="py-0">
                <v-text-field
                  v-model="addItemView.text"
                  label="Value"
                  :rules="mixin_nameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col sm="12" class="py-0 d-flex justify-end">
                <successtextBtn :text="$t('save')" @save="saveNewitem"/>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-form>
      <template v-for="(item, index) in keys">
        <v-row :key="item" class="flex-wrap align-center">
          <v-col sm="3" class="py-0">
            <span class="font-weight-black"> {{ item }} </span>
          </v-col>
          <v-col sm="8" class="py-0">
            <v-text-field
              v-model="docs[selectedLang][item]"
            ></v-text-field>
          </v-col>
          <v-col sm="1" class="py-0">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  icon
                  color="error"
                  class="my-2"
                  @click="confirmRemove(item)"
                >
                  <v-icon>mdi-delete-sweep</v-icon>
                </v-btn>
              </template>
              <span> Remove item </span>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-divider :key="`${item}${index}`"></v-divider>
      </template>      
    </v-form>

    <removeItem ref="removeItem" @remove="removeItem"/>
  </v-container>
</template>

<script>
  import successtextBtn from '~/components/buttons/success-text'
  import removeItem from '~/components/removeItem'
  import { mapMutations } from 'vuex'

  export default {
    name: 'adminTranslations',
    layout: 'admin',
    components: { 
      successtextBtn,
      removeItem
    },
    data(){
      return {
        addItemView: {
          name: '',
          text: ''
        },
        showAddForm: false,
        docs: {},
        keys: [],
        baseKeys: [],
        selectedLang: '',
        langs: [],
        isUniqueRules: [
          v => this.keys.indexOf(v) == -1 ? true : false || 'Must be unique',
        ],
      }
    },
    methods: {
      ...mapMutations({
        SET_LOADER_VISIBILITY: 'loader/SET_LOADER_VISIBILITY',
      }),
      showAddField(){
        this.addItemView.name = ''
        this.addItemView.text = ''
        this.showAddForm = true
      },
      hideAddField(){
        this.showAddForm = false
      },
      async saveNewitem(){
        if(this.$refs.newItemForm.validate()){
          this.SET_LOADER_VISIBILITY(true)
          for (let item in this.docs) {
            if(item == this.selectedLang) this.docs[item][this.addItemView.name] = this.addItemView.text
            else this.docs[item][this.addItemView.name] = ''

            await this.$fireStore.collection('translations').doc(item).update(this.docs[item])
          }
          this.keys.push(this.addItemView.name)
          this.baseKeys = JSON.parse(JSON.stringify(this.keys))
          this.SET_LOADER_VISIBILITY(false)
          this.hideAddField() 
        }
      },
      async updateTranslations(){
        this.SET_LOADER_VISIBILITY(true)
        for (let item in this.docs) {
          await this.$fireStore.collection('translations').doc(item).update(this.docs[item])
        }
        this.SET_LOADER_VISIBILITY(false)
      },
      async confirmRemove(item){
        this.$refs.removeItem.show(item)
      },
      async removeItem(item){
        this.SET_LOADER_VISIBILITY(true)
        for (let doc in this.docs) {
          await this.$fireStore.collection('translations').doc(doc).update({
            [item]: this.$fireStore.app.firebase_.firestore.FieldValue.delete()
          })
          delete this.docs[doc][item]
          this.keys = this.keys.filter(elem => elem != item)
          this.baseKeys = JSON.parse(JSON.stringify(this.keys))
        }
        this.SET_LOADER_VISIBILITY(false)
        this.$refs.removeItem.hide()
      },
      search(event){
        let keys = []
        if(event.length){
          for (const key in this.docs) {
            for (const item in this.docs[key]) {
              if(this.docs[key][item].toLowerCase().indexOf(event.toLowerCase()) != -1) keys.push(item)
            }
          }
          this.keys = JSON.parse(JSON.stringify(keys))
        }
        else this.keys = JSON.parse(JSON.stringify(this.baseKeys))
      }
    },
    async asyncData({ app }){
      let docs = {}
      let translationsFromDB = await app.$fireStore.collection('translations').get()
      if(translationsFromDB.docs.length){
        translationsFromDB.docs.forEach(elem => {
          docs[elem.id] = elem.data()
        })
      }
      let keys = Object.keys(docs[app.i18n.defaultLocale])
      let langs = Object.keys(docs)
      return {
        docs,
        keys,
        selectedLang: app.i18n.defaultLocale,
        langs,
        baseKeys: keys
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>