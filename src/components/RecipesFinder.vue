<template>
  <div class="divide-y divide-gray-100">
    <div>
      <o-radio v-model="radio" name="name" native-value="Flint">
        Featured
      </o-radio>
      <o-radio v-model="radio" name="name" native-value="Silver">
        Popular
      </o-radio>
      <o-radio v-model="radio" name="name" native-value="Jack">
        Recent
      </o-radio>
    </div>
    <div>
      <o-collapse
        class="card"
        animation="slide"
        v-for="(recipe, index) of recipes"
        :key="index"
        :open="isOpen == index"
        @open="isOpen = index"
      >
        <article slot="trigger" slot-scope="props" class="card-header p-4 flex space-x-4">
          <img
            :src="recipe.image"
            alt=""
            class="flex-none w-18 h-18 rounded-lg object-cover"
            width="144"
            height="144"
          />
          <div class="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
            <h2 class="text-lg font-semibold text-black mb-0.5">
              {{ recipe.title }}
            </h2>
            <dl class="flex flex-wrap text-sm font-medium whitespace-pre">
              <div>
                <dt class="sr-only">Time</dt>
                <dd>
                  <abbr :title="`${recipe.time} minutes`"
                    >{{ recipe.time }}m</abbr
                  >
                </dd>
              </div>
              <div>
                <dt class="sr-only">Difficulty</dt>
                <dd>· {{ recipe.difficulty }}</dd>
              </div>
              <div>
                <dt class="sr-only">Servings</dt>
                <dd>· {{ recipe.servings }} servings</dd>
              </div>
              <div class="flex-none w-full mt-0.5 font-normal">
                <dt class="inline">By</dt>
                <dd class="inline text-black">{{ recipe.author }}</dd>
              </div>
              <div
                class="absolute top-0 right-0 rounded-full bg-amber-50 text-amber-900 px-2 py-0.5 hidden sm:flex lg:hidden xl:flex items-center space-x-1"
              >
                <dt class="text-amber-500">
                  <span class="sr-only">Rating</span>
                  <svg width="16" height="20" fill="currentColor">
                    <path
                      d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z"
                    />
                  </svg>
                </dt>
                <dd>{{ recipe.rating }}</dd>
              </div>
            </dl>
          </div>
        </article>
        <div class="card-content">
          <div class="content">
            {{ recipe.text }}
          </div>
        </div>
      </o-collapse>
    </div>
  </div>
</template>
<script>
import Vue from "vue";

export default Vue.extend({
  name: "RecipesFinder",
  data() {
    return {
      isOpen: 0,
      radio: 0,
      recipes: [
        {
          title: "Hank’s Juiciest Beef Burger",
          time: "20",
          difficulty: "Easy",
          servings: "4",
          rating: "4.95",
          text: "My recipe for Hank’s Juiciest Beef Burger",
          image: "https://tailwindcss.com/_next/static/media/jucy-beef-burger.032c3c262707ccb9636fb3c909efeaf6.jpg"
        },
        {
          title: "Southern Fried Chicken Sandwich",
          time: "30",
          difficulty: "Easy",
          servings: "4",
          rating: "4.95",
          text: "Southern Fried Chicken Sandwich",
          image: "https://tailwindcss.com/_next/static/media/chicken-sandwich.cdedaf24984d883d5ed1fd3de8f49ec3.jpg"
        },
        {
          title: "Lily’s Healthy Beef Burger",
          time: "20",
          difficulty: "Easy",
          servings: "4",
          rating: "4.95",
          text: "Lily’s Healthy Beef Burger recipe",
          image: "https://tailwindcss.com/_next/static/media/healthy-beef-burger.e735f49f7da4c92099f8811abf828ea8.jpg"
        }
      ],
    };
  },
});
</script>