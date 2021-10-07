import Vue from "vue";

import locale from "../mixins/locale";
import config from "../mixins/config";
import firebase from "../mixins/firebase";
import redirects from "../mixins/redirects";
import validationRules from "../mixins/validationRules";
import general from "../mixins/general";

Vue.mixin(locale);
Vue.mixin(config);
Vue.mixin(firebase);
Vue.mixin(redirects);
Vue.mixin(validationRules);
Vue.mixin(general);