<template>
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <o-field label="Image" label-for="image">
        <o-upload v-model="file">
          <o-button tag="a" variant="primary">
            <o-icon icon="upload"></o-icon>
            <span>Click to upload</span>
          </o-button>
        </o-upload>
        <span class="file-name" v-if="file">
          {{ file.name }}
        </span>
      </o-field>
    </div>
    <div class="mb-4">
      <o-field label="Name" label-for="name">
        <o-input id="name" type="text" placeholder="Name" />
      </o-field>
    </div>
    <div class="mb-4">
      <o-field label="Time" label-for="time">
        <o-input id="time" type="text" placeholder="Time" />
      </o-field>
    </div>
    <div class="mb-4">
      <o-field label="Servings" label-for="servings">
        <o-input id="servings" type="text" placeholder="Servings" />
      </o-field>
    </div>
    <!-- <div class="mb-6">
                <o-field label="Password" label-for="password" variant="danger" message="Please choose a password">
                    <o-input id="password" type="password" placeholder="Password" />
                </o-field>
            </div> -->
    <div class="flex items-center justify-between">
      <o-button label="Add" native-type="button" />
      <a
        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        href="#"
      >
        Forgot Password?
      </a>
    </div>
  </form>
</template>
<script>
import Vue from 'vue'

export default Vue.extend({
    name: 'RecipeUploader',
})
</script>