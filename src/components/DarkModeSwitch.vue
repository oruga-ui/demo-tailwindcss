<template>
  <div class="text-gray-400 flex items-center">
    <o-icon icon="sun" :class="{'text-highlight-background' : !darkMode}"></o-icon>
    <o-switch size="small" class="mx-1" v-model="darkMode"></o-switch>
    <o-icon icon="moon" :class="{'text-highlight-background-dark' : darkMode}"></o-icon>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "DarkModeSwitch",
  data() {
    return {
      darkMode: null as any,
    };
  },
  mounted() {
    this.darkMode =
      localStorage.theme == "dark"
        ? true
        : localStorage.theme == "light"
        ? false
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
  },
  watch: {
    darkMode(isDarkNow, wasDarkBefore) {
      if (wasDarkBefore !== null) {
        localStorage.theme = isDarkNow ? "dark" : "light";
      }
      setTimeout(() => {
        let html = document.querySelector("html")!;
        if (isDarkNow) {
          html.classList.add("dark");
        } else {
          html.classList.remove("dark");
        }
      }, 300);

    },
  },
});
</script>
