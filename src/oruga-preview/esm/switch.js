import './helpers.js';
import { B as BaseComponentMixin, n as normalizeComponent, e as registerComponent, u as use } from './plugins-948abce9.js';

//
/**
 * Switch between two opposing states
 * @displayName Switch
 * @example ./examples/Switch.md
 * @style _switch.scss
 */

var script = {
  name: 'OSwitch',
  mixins: [BaseComponentMixin],
  configField: 'switch',
  props: {
    /** @model */
    value: [String, Number, Boolean],

    /**
     * Same as native value
     */
    nativeValue: [String, Number, Boolean],
    disabled: Boolean,

    /**
     * Color of the switch, optional
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: String,

    /**
    * Color of the switch when is passive, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    passiveVariant: String,

    /** Name attribute on native checkbox */
    name: String,
    required: Boolean,

    /**
     * Vertical size of switch, optional
     * @values small, medium, large
     */
    size: String,

    /**
     * Overrides the returned value when it's checked
     */
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },

    /**
     * Overrides the returned value when it's not checked
     */
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },

    /** Rounded style */
    rounded: {
      type: Boolean,
      default: true
    },

    /** Show label on left */
    leftLabel: {
      type: Boolean,
      default: false
    },
    rootClass: [String, Function, Array],
    disabledClass: [String, Function, Array],
    checkClass: [String, Function, Array],
    checkCheckedClass: [String, Function, Array],
    checkSwitchClass: [String, Function, Array],
    roundedClass: [String, Function, Array],
    labelClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    variantClass: [String, Function, Array],
    elementsWrapperClass: [String, Function, Array],
    passiveVariantClass: [String, Function, Array],
    leftLabelClass: [String, Function, Array]
  },

  data() {
    return {
      newValue: this.value,
      isMouseDown: false
    };
  },

  computed: {
    rootClasses() {
      return [this.computedClass('rootClass', 'o-switch'), {
        [this.computedClass('sizeClass', 'o-switch--', this.size)]: this.size
      }, {
        [this.computedClass('disabledClass', 'o-switch--disabled')]: this.disabled
      }, {
        [this.computedClass('variantClass', 'o-switch--', this.variant)]: this.variant
      }, {
        [this.computedClass('passiveVariantClass', 'o-switch--', this.passiveVariant + '-passive')]: this.passiveVariant
      }];
    },

    checkClasses() {
      return [this.computedClass('checkClass', 'o-switch__check'), {
        [this.computedClass('checkCheckedClass', 'o-switch__check--checked')]: this.newValue !== this.falseValue
      }, {
        [this.computedClass('roundedClass', 'o-switch--rounded')]: this.rounded
      }];
    },

    elementsWrapperClasses() {
      return [this.computedClass('elementsWrapperClass', 'o-switch__wrapper'), {
        [this.computedClass('leftLabelClass', 'o-switch__wrapper--left')]: this.leftLabel
      }];
    },

    checkSwitchClasses() {
      return [this.computedClass('checkSwitchClass', 'o-switch__check-switch'), {
        [this.computedClass('roundedClass', 'o-switch--rounded')]: this.rounded
      }];
    },

    labelClasses() {
      return [this.computedClass('labelClass', 'o-switch__label')];
    },

    computedValue: {
      get() {
        return this.newValue;
      },

      set(value) {
        this.newValue = value;
        this.$emit('input', this.newValue);
      }

    }
  },
  watch: {
    /**
    * When v-model change, set internal value.
    */
    value(value) {
      this.newValue = value;
    }

  },
  methods: {
    focus() {
      // MacOS FireFox and Safari do not focus when clicked
      this.$refs.input.focus();
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{ref:"label",class:_vm.rootClasses,attrs:{"disabled":_vm.disabled},on:{"click":_vm.focus,"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.$refs.label.click()},"mousedown":function($event){_vm.isMouseDown = true;},"mouseup":function($event){_vm.isMouseDown = false;},"mouseout":function($event){_vm.isMouseDown = false;},"blur":function($event){_vm.isMouseDown = false;}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",attrs:{"type":"checkbox","disabled":_vm.disabled,"name":_vm.name,"required":_vm.required,"true-value":_vm.trueValue,"false-value":_vm.falseValue},domProps:{"value":_vm.nativeValue,"checked":Array.isArray(_vm.computedValue)?_vm._i(_vm.computedValue,_vm.nativeValue)>-1:_vm._q(_vm.computedValue,_vm.trueValue)},on:{"click":function($event){$event.stopPropagation();},"change":function($event){var $$a=_vm.computedValue,$$el=$event.target,$$c=$$el.checked?(_vm.trueValue):(_vm.falseValue);if(Array.isArray($$a)){var $$v=_vm.nativeValue,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.computedValue=$$a.concat([$$v]));}else {$$i>-1&&(_vm.computedValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else {_vm.computedValue=$$c;}}}}),_c('span',{class:_vm.elementsWrapperClasses},[_c('span',{class:_vm.checkClasses},[_c('span',{class:_vm.checkSwitchClasses})]),_c('span',{class:_vm.labelClasses},[_vm._t("default")],2)])])};
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
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
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
    registerComponent(Vue, __vue_component__);
  }

};
use(Plugin);

export default Plugin;
export { __vue_component__ as OSwitch };
