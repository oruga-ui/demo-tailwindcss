<template>
  <div class="divide-y divide-gray-100 border-b border-gray-100">
    <div class="flex space-x-2 py-3">
      <o-radio v-model="filter" class="btn_recipe_filter" :class="{ 'btn_recipe_filter--checked' : filter==='all' }" name="all" native-value="all" @click.native="isOpen = -1">
        All
      </o-radio>
      <o-radio v-model="filter" class="btn_recipe_filter" :class="{ 'btn_recipe_filter--checked' : filter==='featured' }" name="featured" native-value="featured" @click.native="isOpen = -1">
        Featured
      </o-radio>
      <o-radio v-model="filter" class="btn_recipe_filter" :class="{ 'btn_recipe_filter--checked' : filter==='faster' }" name="faster" native-value="faster" @click.native="isOpen = -1">
        Faster
      </o-radio>
    </div>
      <article
        class="p-4 flex space-x-4"
        v-for="(recipe, index) of filteredRecipes"
        :class="{ hidden : !isLoading }"
        :key="`loading-${index}`">
        <div>
          <o-skeleton circle width="64px" height="64px"></o-skeleton>
        </div>
        <div style="width: 100%">
          <o-skeleton width="100%" ></o-skeleton>
          <o-skeleton width="100%" ></o-skeleton>
          <o-skeleton width="100%" ></o-skeleton>
        </div>
      </article>
      <o-collapse
        animation="slide"
        v-for="(recipe, index) of filteredRecipes"
        :class="{ hidden : isLoading }"
        :key="index"
        :open="isOpen == index"
        @open="isOpen = index"
      >
        <article slot="trigger" slot-scope="props" class="card-header p-4 flex space-x-4 text-main dark:text-main-dark">
          <recipe-image :src="recipe.image" :alt="`Image for recipe ${recipe.title}`" />
          <div class="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
            <h2 class="text-lg font-semibold mb-0.5">
              {{ recipe.title }}
            </h2>
            <dl class="flex flex-wrap text-sm font-medium whitespace-pre">
              <div>
                <dt class="sr-only">Time</dt>
                <dd>
                  <abbr :title="`${recipe.time} minutes`">{{ recipe.time }}m</abbr>
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
                <dt class="">
                  <o-icon :icon="props.open ? 'caret-up' : 'caret-down'" size="large"/>
                </dt>
              </div>
            </dl>
          </div>
        </article>
        <div class="text-main dark:text-main-dark">
          <div class="p-4">
            {{ recipe.procedure }}
          </div>
        </div>
      </o-collapse>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import RecipeImage from '@/components/RecipeImage.vue';
import Recipe from '@/recipe';

export default Vue.extend({
  name: "RecipesFinder",
  mounted () {
    setTimeout(() => {
      this.isLoading = false;
    }, 2500);
  },
  components: {
    'recipe-image' : RecipeImage
  },
  computed: {
    filteredRecipes() {
      switch (this.filter) {
        case "featured":
          return this.$store.state.recipes.filter((recipe: Recipe) => {
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
      isLoading: true
    };
  },
});
</script>

<style>
.btn_recipe_filter {
  @apply text-main dark:text-main-dark;
}

.btn_recipe_filter--checked {
  @apply text-highlight bg-highlight-background dark:text-highlight-dark dark:bg-highlight-background-dark;
}
</style>
