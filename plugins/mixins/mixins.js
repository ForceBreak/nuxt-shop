import Vue from "vue";

import locale from "../mixins/locale";
import config from "../mixins/config";
import firebase from "../mixins/firebase";
import redirects from "../mixins/redirects";

Vue.mixin(locale);
Vue.mixin(config);
Vue.mixin(firebase);
Vue.mixin(redirects);