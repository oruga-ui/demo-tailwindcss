<template>
  <div
    class="border-b border-gray-200 py-6 flex items-center justify-between mb-16 sm:mb-20 -mx-4 sm:mx-0 sm:px-0"
  >
    <div class="flex items-center">
      <img class="w-14" src="https://oruga.io/logo.png" />
      <o-icon
        class="text-red-500 dark:text-primary"
        icon="heart"
        size="large"
      ></o-icon>
      <img
        class="w-14"
        src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg"
      />
    </div>
    <div class="flex">
      <dark-mode-switch />
      <a
        target="blank"
        class="transition duration-500 opacity-40 hover:opacity-100 text-main dark:text-main-dark"
        href="https://github.com/oruga-ui/demo-tailwindcss"
      >
        <o-icon class="ml-4" pack="fab" icon="github" size="large"></o-icon>
      </a>
    </div>
  </div>
</template>
