<template>
  <form
    class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
  >
    <div class="mb-4 col-start-1 md:col-end-3">
      <o-field label="Name" label-for="name">
        <o-input
          id="name"
          type="text"
          placeholder="Name"
          v-model="recipe.title"
        />
      </o-field>
    </div>
    <div class="mb-4 col-start-1">
      <o-field label="Time (in minutes)" label-for="time">
        <o-input
          id="time"
          type="number"
          placeholder="Time"
          v-model="recipe.time"
        />
      </o-field>
    </div>
    <div class="mb-4">
      <o-field label="Servings" label-for="servings">
        <o-input
          id="servings"
          type="number"
          placeholder="Servings"
          v-model="recipe.servings"
        />
      </o-field>
    </div>
    <div class="mb-4 col-start-1 flex justify-between">
      <o-field label="Image" label-for="image">
        <o-upload v-model="file">
          <o-button tag="a" variant="primary">
            <o-icon icon="upload"></o-icon>
            <span>Click to upload</span>
          </o-button>
        </o-upload>
      </o-field>
      <img
        :src="recipe.image"
        v-if="recipe.image"
        alt=""
        class="flex-none w-18 h-18 rounded-lg object-cover"
      />
    </div>
    <div class="mb-4">
      <o-field label="Difficulty" class="">
        <div class="flex justify-center align-center items-center">
          <o-select placeholder="Difficulty" v-model="recipe.difficulty">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </o-select>
        </div>
      </o-field>
    </div>
    <div class="mb-4 col-start-1 md:col-end-3">
      <o-field label="Procedure" label-for="procedure">
        <o-input
          id="procedure"
          type="textarea"
          placeholder="Procedure"
          v-model="recipe.procedure"
        />
      </o-field>
    </div>
    <!-- <div class="mb-6">
                <o-field label="Password" label-for="password" variant="danger" message="Please choose a password">
                    <o-input id="password" type="password" placeholder="Password" />
                </o-field>
            </div> -->
    <div class="flex justify-center col-start-1 md:col-end-3">
      <o-button label="Add recipe" @click="addRecipe" native-type="button" />
    </div>
  </form>
</template>
<script>
import Vue from "vue";

export default Vue.extend({
  name: "RecipeUploader",
  data() {
    return {
      file: null,
      recipe: {
        title: "",
        time: 0,
        image: null,
        servings: 1,
        difficulty: "easy",
        procedure: "",
      },
    };
  },
  watch: {
    file: function (newFile, oldFile) {
      this.recipe.image = window.URL.createObjectURL(newFile)
    },
  },
  methods: {
    addRecipe() {
      this.$store.commit('addRecipe', this.recipe)
      this.recipe = {
        title: "",
        time: 0,
        image: null,
        servings: 1,
        difficulty: "easy",
        procedure: "",
      }
    },
  },
});
</script>

<style>
#procedure {
  height: 12rem;
}
</style>