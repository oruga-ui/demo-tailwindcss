'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
var plugins = require('./plugins-3f7829d9.js');
var FormElementMixin = require('./FormElementMixin-2354d5ae.js');
var ssr = require('./ssr-39c7e185.js');

//
/**
 * Upload one or more files
 * @displayName Upload
 * @example ./examples/Upload.md
 * @style _upload.scss
 */

var script = {
  name: 'OUpload',
  mixins: [plugins.BaseComponentMixin, FormElementMixin.FormElementMixin],
  configField: 'upload',
  inheritAttrs: false,

  provide() {
    return {
      $elementRef: 'input'
    };
  },

  props: {
    /** @model */
    value: [Object, ssr.File, Array],

    /** Same as native, also push new item to v-model instead of replacing */
    multiple: Boolean,

    /** Same as native disabled */
    disabled: Boolean,

    /** Same as native accept */
    accept: String,

    /** Accepts drag & drop and change its style */
    dragDrop: Boolean,

    /**
    * Color of the control, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: {
      type: String
    },

    /** Replace last chosen files every time (like native file input element) */
    native: {
      type: Boolean,
      default: false
    },

    /** Upload will be expanded (full-width) */
    expanded: {
      type: Boolean,
      default: false
    },
    rootClass: String,
    draggableClass: String,
    variantClass: String,
    expandedClass: String,
    disabledClass: String,
    hoveredClass: String
  },

  data() {
    return {
      newValue: this.value,
      dragDropFocus: false
    };
  },

  computed: {
    rootClasses() {
      return [this.computedClass('rootClass', 'o-upl'), {
        [this.computedClass('expandedClass', 'o-upl--expanded')]: this.expanded
      }];
    },

    draggableClasses() {
      return [this.computedClass('draggableClass', 'o-upl__draggable'), {
        [this.computedClass('variantClass', 'o-upl__draggable--', this.variant)]: this.variant
      }, {
        [this.computedClass('hoveredClass', 'o-upl__draggable--hovered')]: !this.variant && this.dragDropFocus
      }, {
        [this.computedClass('variantClass', 'o-upl__draggable--hovered-', this.variant)]: this.variant && this.dragDropFocus
      }, {
        [this.computedClass('disabledClass', 'o-upl__draggable--disabled')]: this.disabled
      }];
    }

  },
  watch: {
    /**
     *   When v-model is changed:
     *   1. Set internal value.
     *   2. Reset interna input file value
     *   3. If it's invalid, validate again.
     */
    value(value) {
      this.newValue = value;

      if (!value || Array.isArray(value) && value.length === 0) {
        this.$refs.input.value = null;
      }

      !this.isValid && !this.dragDrop && this.checkHtml5Validity();
    }

  },
  methods: {
    /**
    * Listen change event on input type 'file',
    * emit 'input' event and validate
    */
    onFileChange(event) {
      if (this.disabled || this.loading) return;
      if (this.dragDrop) this.updateDragDropFocus(false);
      const value = event.target.files || event.dataTransfer.files;

      if (value.length === 0) {
        if (!this.newValue) return;
        if (this.native) this.newValue = null;
      } else if (!this.multiple) {
        // only one element in case drag drop mode and isn't multiple
        if (this.dragDrop && value.length !== 1) return;else {
          const file = value[0];
          if (this.checkType(file)) this.newValue = file;else if (this.newValue) this.newValue = null;else return;
        }
      } else {
        // always new values if native or undefined local
        let newValues = false;

        if (this.native || !this.newValue) {
          this.newValue = [];
          newValues = true;
        }

        for (let i = 0; i < value.length; i++) {
          const file = value[i];

          if (this.checkType(file)) {
            this.newValue.push(file);
            newValues = true;
          }
        }

        if (!newValues) return;
      }

      this.$emit('input', this.newValue);
      !this.dragDrop && this.checkHtml5Validity();
    },

    /**
    * Listen drag-drop to update internal variable
    */
    updateDragDropFocus(focus) {
      if (!this.disabled) {
        this.dragDropFocus = focus;
      }
    },

    /**
    * Check mime type of file
    */
    checkType(file) {
      if (!this.accept) return true;
      const types = this.accept.split(',');
      if (types.length === 0) return true;

      for (let i = 0; i < types.length; i++) {
        const type = types[i].trim();

        if (type) {
          if (type.substring(0, 1) === '.') {
            // check extension
            const extIndex = file.name.lastIndexOf('.');
            const extension = extIndex >= 0 ? file.name.substring(extIndex) : '';

            if (extension.toLowerCase() === type.toLowerCase()) {
              return true;
            }
          } else {
            // check mime type
            if (file.type.match(type)) return true;
          }
        }
      }

      return false;
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{class:_vm.rootClasses},[(!_vm.dragDrop)?[_vm._t("default")]:_c('div',{class:_vm.draggableClasses,on:{"mouseenter":function($event){return _vm.updateDragDropFocus(true)},"mouseleave":function($event){return _vm.updateDragDropFocus(false)},"dragover":function($event){$event.preventDefault();return _vm.updateDragDropFocus(true)},"dragleave":function($event){$event.preventDefault();return _vm.updateDragDropFocus(false)},"dragenter":function($event){$event.preventDefault();return _vm.updateDragDropFocus(true)},"drop":function($event){$event.preventDefault();return _vm.onFileChange($event)}}},[_vm._t("default")],2),_c('input',_vm._b({ref:"input",attrs:{"type":"file","multiple":_vm.multiple,"accept":_vm.accept,"disabled":_vm.disabled},on:{"change":_vm.onFileChange}},'input',_vm.$attrs,false))],2)};
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

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, __vue_component__);
  }

};
plugins.use(Plugin);

exports.OUpload = __vue_component__;
exports.default = Plugin;
