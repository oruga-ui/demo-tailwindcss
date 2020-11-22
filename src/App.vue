<template>
  <div id="app" class="container mx-auto px-8 sm:px-12">
    <div class="header dark:text-white">
      <div class="flex items-center"><img class="w-14" src="https://oruga.io/logo.png" /><o-icon class="text-red-500" icon="heart" size="large"></o-icon><img class="w-14" src="https://www.markusantonwolf.com/media/pages/blog/tailwind-css/265298487-1596675041/tailwind-css-logo.svg"></div>
      <div class="flex">
        <dark-mode-switch />
        <a target="blank" href="https://github.com/oruga-ui/demo-tailwindcss">
          <o-icon class="ml-4" pack="fab" icon="github" size="large"></o-icon>
        </a>
      </div>
    </div>

    <p class="intro">OrugaUI + TailwindCSS 2 demo. A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.</p>
    <router-view/>
  </div>
</template>
