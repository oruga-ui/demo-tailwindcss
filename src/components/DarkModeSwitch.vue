<template>
  <div class="text-gray-400">
    <o-icon icon="sun" :class="{'text-yellow-400' : !darkMode}"></o-icon>
    <o-switch size="small" v-model="darkMode">Switch</o-switch>
    <o-icon icon="moon" :class="{'text-blue-400' : darkMode}"></o-icon>
  </div>
</template>
<script>
import Vue from "vue";

export default Vue.extend({
  name: "DarkModeSwitch",
  data() {
    return {
      darkMode: null,
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
      if (isDarkNow) {
        document.querySelector("html").classList.add("dark");
      } else {
        document.querySelector("html").classList.remove("dark");
      }
    },
  },
});
</script>
