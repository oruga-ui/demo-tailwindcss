import './helpers.js';
import { B as BaseComponentMixin, n as normalizeComponent, e as registerComponent, u as use } from './plugins-948abce9.js';
import { C as CheckRadioMixin } from './CheckRadioMixin-7f4f93a9.js';

//
/**
 * Select an option from a set
 * @displayName Radio
 * @example ./examples/Radio.md
 * @style _radio.scss
 */

var script = {
  name: 'ORadio',
  mixins: [BaseComponentMixin, CheckRadioMixin],
  configField: 'radio',
  props: {
    rootClass: [String, Function, Array],
    disabledClass: [String, Function, Array],
    checkedClass: [String, Function, Array],
    checkCheckedClass: [String, Function, Array],
    checkClass: [String, Function, Array],
    labelClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    variantClass: [String, Function, Array]
  },
  computed: {
    rootClasses() {
      return [this.computedClass('rootClass', 'o-radio'), {
        [this.computedClass('sizeClass', 'o-radio--', this.size)]: this.size
      }, {
        [this.computedClass('checkedClass', 'o-radio--checked')]: this.value === this.nativeValue
      }, {
        [this.computedClass('disabledClass', 'o-radio--disabled')]: this.disabled
      }, {
        [this.computedClass('variantClass', 'o-radio--', this.variant)]: this.variant
      }];
    },

    checkClasses() {
      return [this.computedClass('checkClass', 'o-radio__check'), {
        [this.computedClass('checkCheckedClass', 'o-radio__check--checked')]: this.value === this.nativeValue
      }];
    },

    labelClasses() {
      return [this.computedClass('labelClass', 'o-radio__label')];
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{ref:"label",class:_vm.rootClasses,attrs:{"disabled":_vm.disabled},on:{"click":_vm.focus,"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.$refs.label.click()}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",class:_vm.checkClasses,attrs:{"type":"radio","disabled":_vm.disabled,"required":_vm.required,"name":_vm.name},domProps:{"value":_vm.nativeValue,"checked":_vm._q(_vm.computedValue,_vm.nativeValue)},on:{"click":function($event){$event.stopPropagation();},"change":function($event){_vm.computedValue=_vm.nativeValue;}}}),_c('span',{class:_vm.labelClasses},[_vm._t("default")],2)])};
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
export { __vue_component__ as ORadio };
