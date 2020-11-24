<template>
  <section>
    <p
      class="max-w-screen-lg text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11 text-main dark:text-main-dark"
    >
      <b class="text-primary dark:text-primary-dark">OrugaUI + TailwindCSS 2 demo</b> shows how to customize <b>Oruga UI</b> with <b>TailwindCSS</b> and use components like Input, Radio, Loading, Switch Collapse and so on!
    </p>
    <h1>Recipes</h1>
    <recipes-finder />
    <h1>Add your recipe</h1>
    <recipes-uploader />
  </section>
</template>
<script lang="ts">
import Vue from "vue";
import RecipeUploader from "@/components/RecipeUploader.vue";
import RecipesFinder from "@/components/RecipesFinder.vue";

export default Vue.extend({
  components: {
    'recipes-finder' : RecipesFinder,
    'recipes-uploader' : RecipeUploader
  },
  name: "Home",
});
</script>
