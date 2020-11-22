<template>
  <div id="app" class="container mx-auto px-8 sm:px-12">
    <div class="header dark:text-white">
      <div>TailwindCSS 2 + Oruga Demo</div>
      <div>
        <dark-mode-switch />
        <o-icon pack="fab" icon="github" size="small"></o-icon>
      </div>
    </div>
    <p class="intro">A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.</p>
    <router-view/>
  </div>
</template>
