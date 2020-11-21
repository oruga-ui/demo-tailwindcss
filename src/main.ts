import Vue from 'vue'
import App from './App.vue'
import router from './router'

// @ts-ignore
import Oruga from '@oruga-ui/oruga';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import DarkModeSwitch from "./components/DarkModeSwitch.vue";

import '@oruga-ui/oruga/dist/oruga-lite.css'
import './assets/tailwindcss.css';
import './assets/oruga-tailwindcss.css';

Vue.config.productionTip = false

library.add(fas);
library.add(fab);

Vue.component('vue-fontawesome', FontAwesomeIcon);

Vue.use(Oruga, {
  iconPack: 'fas',
  iconComponent: 'vue-fontawesome',
  statusIcon: false,
  button: {
    override: true,
    rootClass: 'btn',
    roundedClass: 'btn-rounded',
    outlinedClass: 'btn-outlined',
    disabledClass: 'btn-disabled'
  },
  field: {
      override: true,
      labelClass: 'field-label',
      messageClass: 'text-xs italic',
      variantClass: 'field-'
  },
  input: {
      override: true,
      inputClass: 'input focus:outline-none focus:shadow-outline',
      roundedClass: 'rounded',
      variantClass: 'input-'
  },
  dropdown: {
      override: true,
      rootClass: 'dropdown',
      menuClass: 'dropdown-menu',
      itemClass: 'dropdown-item'
  },
  icon: {
      override: true
  },
  switch: {
    override: true,
    checkClass: 'switch',
  },
})
Vue.component('dark-mode-switch', DarkModeSwitch);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
