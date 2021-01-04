import './oruga-preview/oruga.css'

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'

// @ts-ignore
import Oruga from './oruga-preview/oruga'

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import DarkModeSwitch from "./components/DarkModeSwitch.vue";
import MainHeader from "./components/MainHeader.vue";

import './assets/tailwindcss.css';
import './assets/oruga-tailwindcss.css';

Vue.config.productionTip = false

library.add(fas);
library.add(fab);

Vue.component('vue-fontawesome', FontAwesomeIcon);
Vue.component('main-header', MainHeader);

Vue.filter('difficulty', (difficulty: string) => {
  let difficulties: any = {
    'easy' : 'Easy',
    'medium' : 'Medium',
    'hard' : 'Hard'
  };
  return difficulties[difficulty];
})

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recipes: [
      {
        title: "Red White and Blue Rice Krispie Treats",
        author: "Hank Douglas",
        time: 20,
        difficulty: "medium",
        servings: 4,
        procedure: "My recipe for Red White and Blue Rice Krispie Treats lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "https://www.iheartnaptime.net/wp-content/uploads/2018/05/red-white-and-blue-rice-krispie-treats.jpg",
        isFeatured: true
      },
      {
        title: "Garlic and Herb Sautéed Bell Pepper Strips",
        author: "Nicholas Denver",
        time: 30,
        difficulty: "easy",
        servings: 5,
        procedure: "Garlic and Herb Sautéed Bell Pepper Strips, at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
        image: "https://www.thespruceeats.com/thmb/eFyjZT5rxTDF3j3GD2undTytLjk=/3000x3000/smart/filters:no_upscale()/garlic-herb-sauteed-bell-pepper-recipe-102112-hero-01-5be21874c9e77c0051eed106.jpg",
        isFeatured: true
      },
      {
        title: "Lily’s Healthy Beef Burger",
        author: "Lily Ford",
        time: 10,
        difficulty: "easy",
        servings: 4,
        procedure: "Lily’s Healthy Beef Burger recipe, sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
        image: "https://tailwindcss.com/_next/static/media/healthy-beef-burger.e735f49f7da4c92099f8811abf828ea8.jpg"
      }
    ],
  },
  mutations: {
    addRecipe(state, recipe) {
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
  radio: {
    rootClass: 'radio',
    labelClass: 'radio-label',
    checkClass: 'radio-check'
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
  loading: {
    backgroundClass: 'loading-background'
  },
  icon: {
    override: true,
    spinClass: 'fa-spin'
  },
  switch: {
    checkClass: 'switch',
  },
})

Vue.component('dark-mode-switch', DarkModeSwitch);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
