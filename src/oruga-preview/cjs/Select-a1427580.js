'use strict';

var plugins = require('./plugins-2885446e.js');
var Icon = require('./Icon-31dd3104.js');
var FormElementMixin = require('./FormElementMixin-d665a3fc.js');

//
/**
 * Select an item in a dropdown list. Use with Field to access all functionalities
 * @displayName Select
 * @example ./examples/Select.md
 * @style _select.scss
 */

var script = {
  name: 'OSelect',
  components: {
    [Icon.__vue_component__.name]: Icon.__vue_component__
  },
  mixins: [plugins.BaseComponentMixin, FormElementMixin.FormElementMixin],
  configField: 'select',
  inheritAttrs: false,

  provide() {
    return {
      $elementRef: 'select'
    };
  },

  props: {
    /** @model */
    value: {
      type: [String, Number, Boolean, Object, Array],
      default: null
    },

    /**
     * Vertical size of input, optional
     * @values small, medium, large
     */
    size: String,

    /**
     * 	Icon name to be added on the right side
     */
    iconRight: String,

    /** Text when nothing is selected */
    placeholder: String,
    multiple: Boolean,

    /** Same as native size */
    nativeSize: [String, Number],
    rootClass: [String, Function, Array],
    selectClass: [String, Function, Array],
    iconLeftSpaceClass: [String, Function, Array],
    iconRightSpaceClass: [String, Function, Array],
    roundedClass: [String, Function, Array],
    multipleClass: [String, Function, Array],
    expandedClass: [String, Function, Array],
    iconLeftClass: [String, Function, Array],
    iconRightClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    variantClass: [String, Function, Array],
    placeholderClass: [String, Function, Array],
    arrowClass: [String, Function, Array]
  },

  data() {
    return {
      selected: this.value
    };
  },

  computed: {
    rootClasses() {
      return [this.computedClass('rootClass', 'o-ctrl-sel'), {
        [this.computedClass('expandedClass', 'o-ctrl-sel--expanded')]: this.expanded
      }];
    },

    selectClasses() {
      return [this.computedClass('selectClass', 'o-sel'), {
        [this.computedClass('roundedClass', 'o-sel--rounded')]: this.rounded
      }, {
        [this.computedClass('multipleClass', 'o-sel--multiple')]: this.multiple
      }, {
        [this.computedClass('sizeClass', 'o-sel--', this.size)]: this.size
      }, {
        [this.computedClass('variantClass', 'o-sel--', this.statusVariant)]: this.statusVariant
      }, {
        [this.computedClass('iconLeftSpaceClass', 'o-sel-iconspace-left')]: this.icon
      }, {
        [this.computedClass('iconRightSpaceClass', 'o-sel-iconspace-right')]: this.iconRight
      }, {
        [this.computedClass('placeholderClass', 'o-sel--placeholder')]: this.placeholderVisible
      }, {
        [this.computedClass('arrowClass', 'o-sel-arrow')]: !this.iconRight && !this.multiple
      }];
    },

    iconLeftClasses() {
      return [this.computedClass('iconLeftClass', 'o-sel__icon-left')];
    },

    iconRightClasses() {
      return [this.computedClass('iconRightClass', 'o-sel__icon-right')];
    },

    placeholderVisible() {
      return this.computedValue === null;
    },

    computedValue: {
      get() {
        return this.selected;
      },

      set(value) {
        this.selected = value;
        this.$emit('input', value);
        !this.isValid && this.checkHtml5Validity();
      }

    }
  },
  watch: {
    /**
    * When v-model is changed:
    *   1. Set the selected option.
    *   2. If it's invalid, validate again.
    */
    value(value) {
      this.selected = value;
      !this.isValid && this.checkHtml5Validity();
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClasses},[_c('select',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"select",class:_vm.selectClasses,attrs:{"multiple":_vm.multiple,"size":_vm.nativeSize},on:{"blur":function($event){_vm.$emit('blur', $event) && _vm.checkHtml5Validity();},"focus":function($event){return _vm.$emit('focus', $event)},"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.computedValue=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},'select',_vm.$attrs,false),[(_vm.placeholder)?[(_vm.placeholderVisible)?_c('option',{attrs:{"disabled":"","hidden":""},domProps:{"value":null}},[_vm._v(" "+_vm._s(_vm.placeholder)+" ")]):_vm._e()]:_vm._e(),_vm._t("default")],2),(_vm.icon)?_c('o-icon',{class:_vm.iconLeftClasses,attrs:{"icon":_vm.icon,"pack":_vm.iconPack,"size":_vm.size}}):_vm._e(),(_vm.iconRight)?_c('o-icon',{class:_vm.iconRightClasses,attrs:{"icon":_vm.iconRight,"pack":_vm.iconPack,"size":_vm.size}}):_vm._e()],1)};
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
