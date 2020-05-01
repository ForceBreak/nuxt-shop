import Vue from 'vue'
import { createEditor } from 'vueditor'
import 'vueditor/dist/style/vueditor.min.css'

let editorone = createEditor

Vue.prototype.$vueeditor = editorone
