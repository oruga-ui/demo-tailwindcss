<template>
  <div class="divide-y divide-gray-100">
    <div class="flex space-x-2 py-3">
      <o-radio v-model="filter" class="btn_recipe_filter" :class="{ 'btn_recipe_filter--checked' : filter==='all' }" name="all" native-value="all">
        All
      </o-radio>
      <o-radio v-model="filter" class="btn_recipe_filter" :class="{ 'btn_recipe_filter--checked' : filter==='featured' }" name="featured" native-value="featured">
        Featured
      </o-radio>
      <o-radio v-model="filter" class="btn_recipe_filter" :class="{ 'btn_recipe_filter--checked' : filter==='faster' }" name="faster" native-value="faster">
        Faster
      </o-radio>
    </div>
      <o-collapse
        animation="slide"
        v-for="(recipe, index) of filteredRecipes"
        :key="index"
        :open="isOpen == index"
        @open="isOpen = index"
      >
        <article slot="trigger" slot-scope="props" class="card-header p-4 flex space-x-4">
          <img
            :src="recipe.image"
            alt=""
            class="flex-none w-20 h-20 rounded-lg object-cover"
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
                <dd>· {{ recipe.difficulty | difficulty }}</dd>
              </div>
              <div>
                <dt class="sr-only">Servings</dt>
                <dd>· {{ recipe.servings }} servings</dd>
              </div>
              <div class="flex-none w-full mt-0.5 font-normal">
                <dt class="inline mr-1">By</dt>
                <dd class="inline">{{ recipe.author }}</dd>
              </div>
              <div
                class="absolute top-0 right-0 rounded-full px-2 py-0.5 hidden sm:flex lg:hidden xl:flex items-center space-x-1"
              >
                <dt class="text-amber-500">
                  <o-icon :icon="props.open ? 'caret-down' : 'caret-up'" size="large"/>
                </dt>
              </div>
            </dl>
          </div>
        </article>
        <div class="">
          <div class="p-4">
            {{ recipe.procedure }}
          </div>
        </div>
      </o-collapse>
  </div>
</template>
<script>
import Vue from "vue";

export default Vue.extend({
  name: "RecipesFinder",
  computed: {
    filteredRecipes() {
      switch (this.filter) {
        case "featured":
          return this.$store.state.recipes.filter((recipe) => {
            return recipe.isFeatured;
          });
        case "faster":
          return [...this.$store.state.recipes].sort((a, b) => a.time - b.time);
        default:
          return this.$store.state.recipes;
      }
    },
  },
  data() {
    return {
      isOpen: -1,
      filter: 'all',
    };
  },
});
</script>

<style>
.btn_recipe_filter {
}

.btn_recipe_filter--checked {
  @apply text-highlight bg-highlight-background dark:text-highlight-dark dark:bg-highlight-background-dark;
}
</style>
