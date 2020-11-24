<template>
  <img
    :src="src"
    alt=""
    class="flex-none w-20 h-20 rounded-lg object-cover"
  />
</template>
<script>
import Vue from "vue";

export default Vue.extend({
  name: "RecipeImage",
  props: {
    src: ''
  }
})
</script>
