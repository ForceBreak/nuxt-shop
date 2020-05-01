<template>
  <v-dialog
    v-model="isShow"
    width="600"
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        {{ $t('change_table_view') }}
      </v-card-title>

      <v-card-text>
        <v-list dense>
          <draggable :list="tableHeaders" ghost-class="ghost">
            <template v-for="item in tableHeaders">
              <v-list-item
                v-if="item.value != 'actions'"
                :key="item.id"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            
          </draggable>
        </v-list>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="isShow = !isShow"
        >
          {{ $t('close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    props: {
      headers:{
        type: Array,
        default: () => {}
      },
      productViewId: {
        type: String,
        default: ''
      },
      collection: {
        type: String,
        default: ''
      }
    },
    components:{
      draggable,
    },
    data(){
      return{
        isShow: false,
        tableHeaders: []
      }
    },
    methods: {
      changeVisibility(){
        this.tableHeaders = JSON.parse(JSON.stringify(this.headers))
        this.isShow = !this.isShow
      },
    },
    watch: {
      tableHeaders(){
        let productView = {}
        this.tableHeaders.forEach((elem, index) => {
          productView[elem.value] = index
        })
        this.$fireStore.collection(this.collection).doc(this.productViewId).set(productView)
        this.$emit('changeHeaders', this.tableHeaders)
      }
    }
  }
</script>

<style lang="scss" scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>