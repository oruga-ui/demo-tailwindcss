'use strict';

var helpers = require('./helpers.js');
var plugins = require('./plugins-d1c9ea2a.js');
var Icon = require('./Icon-d8c779b9.js');
var ssr = require('./ssr-39c7e185.js');

//
/**
 * A simple loading overlay
 * @displayName Loading
 * @example ./examples/Loading.md
 * @style _loading.scss
 */

var script = {
  name: 'OLoading',
  components: {
    [Icon.__vue_component__.name]: Icon.__vue_component__
  },
  mixins: [plugins.BaseComponentMixin],
  configField: 'loading',
  props: {
    /** Whether modal is active or not,  use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding */
    active: Boolean,
    programmatic: Boolean,
    container: [Object, Function, ssr.HTMLElement],

    /** Loader will overlay the full page */
    fullPage: {
      type: Boolean,
      default: true
    },

    /* Custom animation (transition name) */
    animation: {
      type: String,
      default: () => {
        return helpers.getValueByPath(plugins.config, 'loading.animation', 'fade');
      }
    },

    /** Can close Loading by pressing escape or clicking outside */
    canCancel: {
      type: Boolean,
      default: false
    },

    /** Callback function to call after user canceled (pressed escape / clicked outside) */
    onCancel: {
      type: Function,
      default: () => {}
    },

    /** Icon name */
    icon: {
      type: String,
      default: () => {
        return helpers.getValueByPath(plugins.config, 'loading.icon', 'sync-alt');
      }
    },

    /** Enable spin effect on icon */
    iconSpin: {
      type: Boolean,
      default: true
    },
    iconSize: {
      type: String,
      default: 'medium'
    },
    rootClass: [String, Function, Array],
    overlayClass: [String, Function, Array],
    iconClass: [String, Function, Array],
    fullPageIconClass: [String, Function, Array]
  },

  data() {
    return {
      isActive: this.active || false,
      displayInFullPage: this.fullPage
    };
  },

  watch: {
    active(value) {
      this.isActive = value;
    },

    fullPage(value) {
      this.displayInFullPage = value;
    }

  },
  computed: {
    rootClasses() {
      return [this.computedClass('rootClass', 'o-load'), {
        [this.computedClass('fullPageClass', 'o-load--fullpage')]: this.displayInFullPage
      }];
    },

    overlayClasses() {
      return [this.computedClass('overlayClass', 'o-load__overlay')];
    },

    iconClasses() {
      return [this.computedClass('iconClass', 'o-load__icon'), {
        [this.computedClass('fullPageIconClass', 'o-load__icon--fullpage')]: this.displayInFullPage
      }];
    }

  },
  methods: {
    /**
    * Close the Modal if canCancel.
    */
    cancel() {
      if (!this.canCancel || !this.isActive) return;
      this.close();
    },

    /**
    * Emit events, and destroy modal if it's programmatic.
    */
    close() {
      this.onCancel.apply(null, arguments);
      this.$emit('close');
      this.$emit('update:active', false); // Timeout for the animation complete before destroying

      if (this.programmatic) {
        this.isActive = false;
        setTimeout(() => {
          this.$destroy();
          helpers.removeElement(this.$el);
        }, 150);
      }
    },

    /**
    * Keypress event that is bound to the document.
    */
    keyPress({
      key
    }) {
      if (key === 'Escape' || key === 'Esc') this.cancel();
    }

  },

  created() {
    if (typeof window !== 'undefined') {
      document.addEventListener('keyup', this.keyPress);
    }
  },

  beforeMount() {
    // Insert the Loading component in body tag
    // only if it's programmatic
    if (this.programmatic) {
      if (!this.container) {
        document.body.appendChild(this.$el);
      } else {
        this.displayInFullPage = false;
        this.$emit('update:full-page', false);
        this.container.appendChild(this.$el);
      }
    }
  },

  mounted() {
    if (this.programmatic) this.isActive = true;
  },

  beforeDestroy() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('keyup', this.keyPress);
    }
  }

};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.animation}},[(_vm.isActive)?_c('div',{class:_vm.rootClasses},[_c('div',{class:_vm.overlayClasses,on:{"click":_vm.cancel}}),_vm._t("default",[_c('o-icon',{class:_vm.iconClasses,attrs:{"icon":_vm.icon,"spin":_vm.iconSpin,"size":_vm.iconSize}})])],2):_vm._e()])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/plugins.normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

exports.__vue_component__ = __vue_component__;
