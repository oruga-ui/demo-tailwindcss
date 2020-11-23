<template>
  <form
    class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:shadow-md rounded sm:px-8 sm:pt-6 pb-8 mb-4"
  >
    <div class="mb-4 col-start-1 md:col-end-3">
      <o-field
        label="Title"
        label-for="name"
        :variant="errors.title ? 'danger' : ''"
        :message="errors.title"
      >
        <o-input
          id="title"
          type="text"
          placeholder="Name of your recipe (e.g. Pizza)"
          v-model="recipe.title"
        />
      </o-field>
    </div>
    <div class="mb-4 col-start-1 md:col-end-3">
      <o-field
        label="Author"
        label-for="author"
        :variant="errors.author ? 'danger' : ''"
        :message="errors.author"
      >
        <o-input
          id="author"
          type="text"
          placeholder="Author name (e.g. Nick Cave)"
          v-model="recipe.author"
        />
      </o-field>
    </div>
    <div class="mb-4 col-start-1">
      <o-field
        label="Time (in minutes)"
        label-for="time"
        :variant="errors.time ? 'danger' : ''"
        :message="errors.time"
      >
        <o-input
          id="time"
          type="number"
          placeholder="Time"
          v-model.number="recipe.time"
          min="1"
        />
      </o-field>
    </div>
    <div class="mb-4">
      <o-field
        label="Servings"
        label-for="servings"
        :variant="errors.servings ? 'danger' : ''"
        :message="errors.servings"
      >
        <o-input
          id="servings"
          type="number"
          placeholder="Servings"
          v-model.number="recipe.servings"
          min="1"
        />
      </o-field>
    </div>
    <div class="mb-4 col-start-1 flex justify-between">
      <o-field
        label="Image"
        label-for="image"
        :variant="errors.image ? 'danger' : ''"
        :message="errors.image"
      >
        <o-upload v-model="file">
          <o-button tag="a" variant="primary">
            <o-icon icon="upload" class="mr-4"></o-icon>
            <span>Click to upload</span>
          </o-button>
        </o-upload>
      </o-field>
      <img
        :src="recipe.image"
        v-if="recipe.image"
        alt=""
        class="flex-none w-20 h-20 rounded-lg object-cover"
      />
    </div>
    <div class="mb-4">
      <o-field label="Difficulty" class="">
        <div class="flex justify-center align-center items-center">
          <o-dropdown
            placeholder="Difficulty"
            v-model="recipe.difficulty"
            aria-role="list"
          >
            <o-button
              variant="primary"
              type="button"
              slot="trigger"
              class="w-32"
            >
              <div class="flex justify-between">
                <span>{{ recipe.difficulty | difficulty }}</span>
                <o-icon icon="caret-down"></o-icon>
              </div>
            </o-button>
            <o-dropdown-item value="easy">
              <span>Easy</span>
            </o-dropdown-item>
            <o-dropdown-item value="medium">
              <span>Medium</span>
            </o-dropdown-item>
            <o-dropdown-item value="hard">
              <span>Hard</span>
            </o-dropdown-item>
          </o-dropdown>
        </div>
      </o-field>
    </div>
    <div class="mb-4 col-start-1 md:col-end-3">
      <o-field
        label="Procedure"
        label-for="procedure"
        :variant="errors.procedure ? 'danger' : ''"
        :message="errors.procedure"
      >
        <o-input
          inputClass="h-48"
          id="procedure"
          type="textarea"
          placeholder="How to make your recipe step by step"
          v-model="recipe.procedure"
        />
      </o-field>
    </div>
    <div class="flex justify-center col-start-1 md:col-end-3">
      <o-button label="Add recipe" @click="addRecipe" native-type="button" />
    </div>
    <p style="position: relative">
      <o-loading full-page :active.sync="isLoading">
        <o-icon icon="sync-alt" size="large" spin> </o-icon>
      </o-loading>
    </p>
  </form>
</template>
<script>
import Vue from "vue";

export default Vue.extend({
  name: "RecipeUploader",
  data() {
    return {
      file: null,
      isLoading: false,
      recipe: {
        title: null,
        author: null,
        time: 5,
        image: null,
        servings: 1,
        difficulty: "easy",
        procedure: "",
      },
      errors: {
        title: null,
        author: null,
        image: null,
        procedure: null,
        time: null,
        servings: null,
      },
    };
  },
  watch: {
    file(newFile) {
      this.recipe.image = window.URL.createObjectURL(newFile);
    },
  },
  methods: {
    _validateRecipe() {
      let isValid = true;
      for (const key in this.errors) {
        this.errors[key] = null;
        if (!this.recipe[key]) {
          this.errors[key] = "This field cannot be empty";
          isValid = false;
        }
        if ((key === "servings" || key === "time") && this.recipe[key] < 1) {
          this.errors[key] = "This field should be at least 1";
          isValid = false;
        }
      }
      return isValid;
    },
    addRecipe() {
      this.isLoading = true;

      if (this._validateRecipe()) {
        setTimeout(() => {
          this.$store.commit("addRecipe", this.recipe);
          this.recipe = {
            title: "",
            author: "",
            time: 0,
            image: null,
            servings: 1,
            difficulty: "easy",
            procedure: "",
          };
          this.isLoading = false;
        }, 2000);
      } else {
        this.isLoading = false;
      }
    },
  },
});
</script>
