<template>
  <img
    :src="src"
    :alt="alt"
    class="flex-none w-20 h-20 rounded-lg object-cover"
  />
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "RecipeImage",
  props: {
    src: {
      type: String,
    },
    alt: {
      type: String
    }
  }
})
</script>
