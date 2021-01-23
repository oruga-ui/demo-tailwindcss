import { n as normalizeComponent, B as BaseComponentMixin } from './plugins-b98d7e7d.js';
import { M as MatchMediaMixin } from './MatchMediaMixin-4e5c9540.js';

var script = {
  name: 'OFieldBody',
  inject: {
    $field: {
      name: '$field',
      default: false
    }
  },
  configField: 'field',
  computed: {
    parent() {
      return this.$field;
    }

  },

  render(h) {
    let first = true;
    return h('div', {
      attrs: {
        'class': this.parent.bodyHorizontalClasses
      }
    }, this.$slots.default.map(element => {
      // skip returns and comments
      if (!element.tag) {
        return element;
      }

      let message;

      if (first) {
        message = this.parent.newMessage;
        first = false;
      }

      return h('o-field', {
        attrs: {
          variant: this.parent.newVariant,
          message
        }
      }, [element]);
    }));
  }

};

/* script */
const __vue_script__ = script;

/* template */

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    {},
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

//
/**
 * Fields are used to add functionality to controls and to attach/group components and elements together
 * @displayName Field
 * @example ./examples/Field.md
 * @style _field.scss
 */

var script$1 = {
  name: 'OField',
  components: {
    [__vue_component__.name]: __vue_component__
  },
  configField: 'field',
  mixins: [BaseComponentMixin, MatchMediaMixin],

  provide() {
    return {
      $field: this
    };
  },

  inject: {
    $field: {
      name: '$field',
      default: false
    }
  },
  props: {
    /**
     * 	Color of the field and help message, also adds a matching icon, optional. Used by Input, Select and Autocomplete
     *  @values primary, info, success, warning, danger, and any other custom color
     */
    variant: [String, Object],

    /**
     * Field label
     */
    label: String,

    /**
     * Same as native for set on the label
     */
    labelFor: String,

    /**
     * Help message text
     */
    message: String,

    /**
     * Direct child components/elements of Field will be grouped horizontally (see which ones at the top of the page)
     */
    grouped: Boolean,

    /**
     * Allow controls to fill up multiple lines, making it responsive
     */
    groupMultiline: Boolean,

    /**
     * Group label and control on the same line for horizontal forms
     */
    horizontal: Boolean,

    /**
     * Field automatically attach controls together
     */
    addons: {
      type: Boolean,
      default: true
    },

    /**
    * Vertical size of input, optional
    * @values small, medium, large
    */
    labelSize: String,
    rootClass: [String, Function, Array],
    horizontalClass: [String, Function, Array],
    groupedClass: [String, Function, Array],
    groupMultilineClass: [String, Function, Array],
    labelClass: [String, Function, Array],
    labelSizeClass: [String, Function, Array],
    labelHorizontalClass: [String, Function, Array],
    bodyClass: [String, Function, Array],
    bodyHorizontalClass: [String, Function, Array],
    addonsClass: [String, Function, Array],
    messageClass: [String, Function, Array],
    variantClass: [String, Function, Array],
    mobileClass: [String, Function, Array]
  },

  data() {
    return {
      newVariant: this.variant,
      newMessage: this.message
    };
  },

  computed: {
    rootClasses() {
      return [this.computedClass('rootClass', 'o-field'), {
        [this.computedClass('horizontalClass', 'o-field--horizontal')]: this.horizontal
      }, {
        [this.computedClass('mobileClass', 'o-field--mobile')]: this.isMatchMedia
      }];
    },

    messageClasses() {
      return [this.computedClass('messageClass', 'o-field__message'), {
        [this.computedClass('variantClass', 'o-field__message-', this.newVariant)]: this.newVariant
      }];
    },

    labelClasses() {
      return [this.computedClass('labelClass', 'o-field__label'), {
        [this.computedClass('labelSizeClass', 'o-field__label-', this.labelSize)]: this.labelSize
      }];
    },

    labelHorizontalClasses() {
      return [this.computedClass('labelHorizontalClass', 'o-field__horizontal-label')];
    },

    bodyClasses() {
      return [this.computedClass('bodyClass', 'o-field__body')];
    },

    bodyHorizontalClasses() {
      return [this.computedClass('bodyHorizontalClass', 'o-field__horizontal-body')];
    },

    innerFieldClasses() {
      return [{
        [this.computedClass('groupMultilineClass', 'o-field--grouped-multiline')]: this.groupMultiline
      }, {
        [this.computedClass('groupedClass', 'o-field--grouped')]: this.grouped
      }, {
        [this.computedClass('addonsClass', 'o-field--addons')]: !this.grouped && this.hasAddons()
      }];
    },

    parent() {
      return this.$field;
    },

    hasLabelSlot() {
      return this.$slots.label;
    },

    hasMessageSlot() {
      return this.$slots.message;
    },

    hasLabel() {
      return this.label || this.hasLabelSlot;
    },

    hasMessage() {
      return (!this.parent || !this.parent.hasInnerField) && this.newMessage || this.hasMessageSlot;
    },

    hasInnerField() {
      return this.grouped || this.groupMultiline || this.hasAddons();
    }

  },
  watch: {
    /**
    * Set internal variant when prop change.
    */
    variant(value) {
      this.newVariant = value;
    },

    /**
    * Set internal message when prop change.
    */
    message(value) {
      this.newMessage = value;
    },

    /**
    * Set parent message if we use Field in Field.
    */
    newMessage(value) {
      if (this.parent && this.parent.hasInnerField) {
        this.parent.newMessage = value;
      }
    }

  },
  methods: {
    hasAddons() {
      let renderedNode = 0;

      if (this.$slots.default) {
        renderedNode = this.$slots.default.reduce((i, node) => node.tag ? i + 1 : i, 0);
      }

      return renderedNode > 1 && this.addons && !this.horizontal;
    }

  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClasses},[(_vm.horizontal)?_c('div',{class:_vm.labelHorizontalClasses},[(_vm.hasLabel)?_c('label',{class:_vm.labelClasses,attrs:{"for":_vm.labelFor}},[(_vm.hasLabelSlot)?_vm._t("label"):[_vm._v(_vm._s(_vm.label))]],2):_vm._e()]):[(_vm.hasLabel)?_c('label',{class:_vm.labelClasses,attrs:{"for":_vm.labelFor}},[(_vm.hasLabelSlot)?_vm._t("label"):[_vm._v(_vm._s(_vm.label))]],2):_vm._e()],(_vm.horizontal)?_c('o-field-body',[_vm._t("default")],2):(_vm.hasInnerField)?_c('div',{class:_vm.bodyClasses},[_c('o-field',{class:_vm.innerFieldClasses,attrs:{"addons":false,"variant":_vm.newVariant}},[_vm._t("default")],2)],1):[_vm._t("default")],(_vm.hasMessage && !_vm.horizontal)?_c('p',{class:_vm.messageClasses},[(_vm.hasMessageSlot)?_vm._t("message"):[_vm._v(_vm._s(_vm.message))]],2):_vm._e()],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

export { __vue_component__$1 as _ };
