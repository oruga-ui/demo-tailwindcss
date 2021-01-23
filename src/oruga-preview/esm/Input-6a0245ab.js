import { getValueByPath } from './helpers.js';
import { B as BaseComponentMixin, c as config, n as normalizeComponent } from './plugins-b98d7e7d.js';
import { _ as __vue_component__$1 } from './Icon-a954439c.js';
import { F as FormElementMixin } from './FormElementMixin-03848984.js';

//
/**
 * Get user Input. Use with Field to access all functionalities
 * @displayName Input
 * @example ./examples/Input.md
 * @style _input.scss
 */

var script = {
  name: 'OInput',
  components: {
    [__vue_component__$1.name]: __vue_component__$1
  },
  mixins: [BaseComponentMixin, FormElementMixin],
  configField: 'input',
  inheritAttrs: false,

  provide() {
    return {
      $elementRef: this.type === 'textarea' ? 'textarea' : 'input'
    };
  },

  props: {
    /** @model */
    value: [Number, String],

    /**
     * Input type, like native
     * @values Any native input type, and textarea
     */
    type: {
      type: String,
      default: 'text'
    },

    /**
     * Vertical size of input, optional
     * @values small, medium, large
     */
    size: String,

    /**
     * 	Adds the reveal password functionality
     */
    passwordReveal: Boolean,

    /**
     * Makes the icon clickable
     */
    iconClickable: Boolean,

    /**
     * Show character counter when maxlength prop is passed
     */
    hasCounter: {
      type: Boolean,
      default: () => {
        return getValueByPath(config, 'input.counter', false);
      }
    },

    /**
     * 	Icon name to be added on the right side
     */
    iconRight: String,

    /**
     * Make the icon right clickable
     */
    iconRightClickable: Boolean,

    /** Variant of right icon */
    iconRightType: [String, Function, Array],
    rootClass: [String, Function, Array],
    expandedClass: [String, Function, Array],
    iconLeftSpaceClass: [String, Function, Array],
    iconRightSpaceClass: [String, Function, Array],
    inputClass: [String, Function, Array],
    roundedClass: [String, Function, Array],
    iconLeftClass: [String, Function, Array],
    iconRightClass: [String, Function, Array],
    counterClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    variantClass: [String, Function, Array]
  },

  data() {
    return {
      newValue: this.value,
      newType: this.type,
      newAutocomplete: this.autocomplete || getValueByPath(config, 'input.autocompletete', 'off'),
      isPasswordVisible: false
    };
  },

  computed: {
    rootClasses() {
      return [this.computedClass('rootClass', 'o-ctrl-input'), {
        [this.computedClass('expandedClass', 'o-ctrl-input--expanded')]: this.expanded
      }];
    },

    inputClasses() {
      return [this.computedClass('inputClass', 'o-input'), {
        [this.computedClass('roundedClass', 'o-input--rounded')]: this.rounded
      }, {
        [this.computedClass('sizeClass', 'o-input--', this.size)]: this.size
      }, {
        [this.computedClass('variantClass', 'o-input--', this.statusVariant)]: this.statusVariant
      }, {
        [this.computedClass('textareaClass', 'o-input__textarea')]: this.type === 'textarea'
      }, {
        [this.computedClass('iconLeftSpaceClass', 'o-input-iconspace-left')]: this.icon
      }, {
        [this.computedClass('iconRightSpaceClass', 'o-input-iconspace-right')]: this.hasIconRight
      }];
    },

    iconLeftClasses() {
      return [this.computedClass('iconLeftClass', 'o-input__icon-left')];
    },

    iconRightClasses() {
      return [this.computedClass('iconRightClass', 'o-input__icon-right')];
    },

    counterClasses() {
      return [this.computedClass('counterClass', 'o-input__counter')];
    },

    computedValue: {
      get() {
        return this.newValue;
      },

      set(value) {
        this.newValue = value;
        this.$emit('input', this.newValue);
        !this.isValid && this.checkHtml5Validity();
      }

    },

    hasIconRight() {
      return this.passwordReveal || this.statusIcon && this.statusVariantIcon || this.iconRight;
    },

    rightIcon() {
      if (this.passwordReveal) {
        return this.passwordVisibleIcon;
      } else if (this.iconRight) {
        return this.iconRight;
      }

      return this.statusVariantIcon;
    },

    rightIconVariant() {
      if (this.passwordReveal || this.iconRight) {
        return this.iconRightType || null;
      }

      return this.statusVariant;
    },

    /**
    * Icon name (MDI) based on the type.
    */
    statusVariantIcon() {
      switch (this.statusVariant) {
        case 'success':
          return 'check';

        case 'danger':
          return 'alert-circle';

        case 'info':
          return 'information';

        case 'warning':
          return 'alert';

        default:
          return '';
      }
    },

    /**
    * Check if have any message prop from parent if it's a Field.
    */
    hasMessage() {
      return !!this.statusMessage;
    },

    /**
    * Current password-reveal icon name.
    */
    passwordVisibleIcon() {
      return !this.isPasswordVisible ? 'eye' : 'eye-off';
    },

    /**
    * Get value length
    */
    valueLength() {
      if (typeof this.computedValue === 'string') {
        return this.computedValue.length;
      } else if (typeof this.computedValue === 'number') {
        return this.computedValue.toString().length;
      }

      return 0;
    }

  },
  watch: {
    /**
    * When v-model is changed:
    *   1. Set internal value.
    */
    value(value) {
      this.newValue = value;
    }

  },
  methods: {
    /**
    * Toggle the visibility of a password-reveal input
    * by changing the type and focus the input right away.
    */
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
      this.newType = this.isPasswordVisible ? 'text' : 'password';
      this.$nextTick(() => {
        this.focus();
      });
    },

    iconClick(emit, event) {
      this.$emit(emit, event);
      this.$nextTick(() => {
        this.focus();
      });
    },

    rightIconClick(event) {
      if (this.passwordReveal) {
        this.togglePasswordVisibility();
      } else if (this.iconRightClickable) {
        this.iconClick('icon-right-click', event);
      }
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClasses},[((_vm.newType)==='checkbox'&&(_vm.type !== 'textarea'))?_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",class:_vm.inputClasses,attrs:{"autocomplete":_vm.newAutocomplete,"maxlength":_vm.maxlength,"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.computedValue)?_vm._i(_vm.computedValue,null)>-1:(_vm.computedValue)},on:{"blur":_vm.onBlur,"focus":_vm.onFocus,"change":function($event){var $$a=_vm.computedValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.computedValue=$$a.concat([$$v]));}else {$$i>-1&&(_vm.computedValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else {_vm.computedValue=$$c;}}}},'input',_vm.$attrs,false)):((_vm.newType)==='radio'&&(_vm.type !== 'textarea'))?_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",class:_vm.inputClasses,attrs:{"autocomplete":_vm.newAutocomplete,"maxlength":_vm.maxlength,"type":"radio"},domProps:{"checked":_vm._q(_vm.computedValue,null)},on:{"blur":_vm.onBlur,"focus":_vm.onFocus,"change":function($event){_vm.computedValue=null;}}},'input',_vm.$attrs,false)):(_vm.type !== 'textarea')?_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",class:_vm.inputClasses,attrs:{"autocomplete":_vm.newAutocomplete,"maxlength":_vm.maxlength,"type":_vm.newType},domProps:{"value":(_vm.computedValue)},on:{"blur":_vm.onBlur,"focus":_vm.onFocus,"input":function($event){if($event.target.composing){ return; }_vm.computedValue=$event.target.value;}}},'input',_vm.$attrs,false)):_c('textarea',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"textarea",class:_vm.inputClasses,attrs:{"maxlength":_vm.maxlength},domProps:{"value":(_vm.computedValue)},on:{"blur":_vm.onBlur,"focus":_vm.onFocus,"input":function($event){if($event.target.composing){ return; }_vm.computedValue=$event.target.value;}}},'textarea',_vm.$attrs,false)),(_vm.icon)?_c('o-icon',{class:_vm.iconLeftClasses,attrs:{"clickable":_vm.iconClickable,"icon":_vm.icon,"pack":_vm.iconPack,"size":_vm.size},nativeOn:{"click":function($event){return _vm.iconClick('icon-click', $event)}}}):_vm._e(),(_vm.hasIconRight)?_c('o-icon',{class:_vm.iconRightClasses,attrs:{"clickable":_vm.passwordReveal || _vm.iconRightClickable,"icon":_vm.rightIcon,"pack":_vm.iconPack,"size":_vm.size,"variant":_vm.rightIconVariant,"both":""},nativeOn:{"click":function($event){return _vm.rightIconClick($event)}}}):_vm._e(),(_vm.maxlength && _vm.hasCounter && _vm.isFocused && _vm.type !== 'number')?_c('small',{class:_vm.counterClasses},[_vm._v(" "+_vm._s(_vm.valueLength)+" / "+_vm._s(_vm.maxlength)+" ")]):_vm._e()],1)};
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

export { __vue_component__ as _ };
