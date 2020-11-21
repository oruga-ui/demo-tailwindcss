import Vue from 'vue'
import Vuex from 'vuex'
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

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recipes: [
      {
        title: "Hank’s Juiciest Beef Burger",
        author: "Hank Douglas",
        time: 20,
        difficulty: "Easy",
        servings: 4,
        procedure: "My recipe for Hank’s Juiciest Beef Burger",
        image: "https://tailwindcss.com/_next/static/media/jucy-beef-burger.032c3c262707ccb9636fb3c909efeaf6.jpg",
        isFeatured: true
      },
      {
        title: "Southern Fried Chicken Sandwich",
        author: "Nicholas Denver",
        time: 30,
        difficulty: "Easy",
        servings: 5,
        procedure: "Southern Fried Chicken Sandwich",
        image: "https://tailwindcss.com/_next/static/media/chicken-sandwich.cdedaf24984d883d5ed1fd3de8f49ec3.jpg",
        isFeatured: true
      },
      {
        title: "Lily’s Healthy Beef Burger",
        author: "Lily Ford",
        time: 10,
        difficulty: "Easy",
        servings: 4,
        procedure: "Lily’s Healthy Beef Burger recipe",
        image: "https://tailwindcss.com/_next/static/media/healthy-beef-burger.e735f49f7da4c92099f8811abf828ea8.jpg"
      }
    ],
  },
  mutations: {
    addRecipe (state, recipe) {
      state.recipes.push(recipe)
    }
  }
})

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
  store,
  render: h => h(App)
}).$mount('#app')
