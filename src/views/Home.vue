<template>
  <section>
    <h1>Recipes</h1>
    <RecipesFinder />
    <h1>Add your recipe</h1>
    <RecipeUploader />
  </section>
</template>
<script>
import Vue from 'vue'
import RecipeUploader from "@/components/RecipeUploader"
import RecipesFinder from "@/components/RecipesFinder"

export default Vue.extend({
    components: {
        RecipeUploader,
        RecipesFinder
    },
    name: 'Home',
})
</script>