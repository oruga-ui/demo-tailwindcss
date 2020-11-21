<template>
  <div>
    <o-icon icon="sun"></o-icon>
    <o-switch size="small" v-model="darkMode">Switch</o-switch>
    <o-icon icon="moon"></o-icon>
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
    darkMode(isDarkNew, isDarkOld) {
      if (isDarkOld !== null) {
        localStorage.theme = isDarkNew ? "dark" : "light";
      }
      if (isDarkNew) {
        document.querySelector("html").classList.add("dark");
      } else {
        document.querySelector("html").classList.remove("dark");
      }
    },
  },
});
</script>
