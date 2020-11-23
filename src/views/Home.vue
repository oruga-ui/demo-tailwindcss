<template>
  <section>
    <p
      class="max-w-screen-lg text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11 dark:text-white"
    >
      OrugaUI + TailwindCSS 2 demo. A utility-first CSS framework packed with
      classes like flex, pt-4, text-center and rotate-90 that can be composed to
      build any design, directly in your markup.
    </p>
    <h1>Recipes</h1>
    <recipes-finder />
    <h1>Add your recipe</h1>
    <recipes-uploader />
  </section>
</template>
<script>
import Vue from "vue";
import RecipeUploader from "@/components/RecipeUploader";
import RecipesFinder from "@/components/RecipesFinder";

export default Vue.extend({
  components: {
    'recipes-finder' : RecipesFinder,
    'recipes-uploader' : RecipeUploader
  },
  name: "Home",
});
</script>
