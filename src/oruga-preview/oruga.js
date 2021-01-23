/*! Oruga v0.3.0-dev | MIT License | github.com/oruga-ui/oruga */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.Oruga = {}));
}(this, (function (exports) { 'use strict';

    /**
     * +/- function to native math sign
     */
    /**
     * Checks if the flag is set
     * @param val
     * @param flag
     * @returns {boolean}
     */

    function hasFlag(val, flag) {
      return (val & flag) === flag;
    }
    /**
     * Get value of an object property/path even if it's nested
     */

    function getValueByPath(obj, path, defaultValue = undefined) {
      const value = path.split('.').reduce((o, i) => typeof o !== 'undefined' ? o[i] : obj[i], obj);
      return typeof value !== 'undefined' ? value : defaultValue;
    }
    /**
     * Extension of indexOf method by equality function if specified
     */

    function indexOf(array, obj, fn) {
      if (!array) return -1;
      if (!fn || typeof fn !== 'function') return array.indexOf(obj);

      for (let i = 0; i < array.length; i++) {
        if (fn(array[i], obj)) {
          return i;
        }
      }

      return -1;
    }
    /**
     * Merge function to replace Object.assign with deep merging possibility
     */

    const isObject = item => typeof item === 'object' && !Array.isArray(item);

    const mergeFn = (target, source, deep = false) => {
      if (deep || !Object.assign) {
        const isDeep = prop => isObject(source[prop]) && target !== null && Object.prototype.hasOwnProperty.call(target, prop) && isObject(target[prop]);

        let replaced;

        if (source === null || typeof source === 'undefined') {
          replaced = false;
        } else {
          replaced = Object.getOwnPropertyNames(source).map(prop => ({
            [prop]: isDeep(prop) ? mergeFn(target[prop], source[prop], deep) : source[prop]
          })).reduce((a, b) => ({ ...a,
            ...b
          }), {});
        }

        return { ...target,
          ...replaced
        };
      } else {
        return Object.assign(target, source);
      }
    };

    const merge = mergeFn;
    /**
     * Mobile detection
     * https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
     */

    const isMobile = {
      Android: function () {
        return typeof window !== 'undefined' && window.navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return typeof window !== 'undefined' && window.navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
        return typeof window !== 'undefined' && window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return typeof window !== 'undefined' && window.navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return typeof window !== 'undefined' && window.navigator.userAgent.match(/IEMobile/i);
      },
      any: function () {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
      }
    };
    function removeElement(el) {
      if (typeof el.remove !== 'undefined') {
        el.remove();
      } else if (typeof el.parentNode !== 'undefined' && el.parentNode !== null) {
        el.parentNode.removeChild(el);
      }
    }
    function createAbsoluteElement(el) {
      const root = document.createElement('div');
      root.style.position = 'absolute';
      root.style.left = '0px';
      root.style.top = '0px';
      const wrapper = document.createElement('div');
      root.appendChild(wrapper);
      wrapper.appendChild(el);
      document.body.appendChild(root);
      return root;
    }
    /**
     * Escape regex characters
     * http://stackoverflow.com/a/6969486
     */

    function escapeRegExpChars(value) {
      if (!value) return value; // eslint-disable-next-line

      return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    }
    function toCssDimension(width) {
      return width === undefined ? null : isNaN(width) ? width : width + 'px';
    }
    function blankIfUndefined(value) {
      return typeof value !== 'undefined' && value !== null ? value : '';
    }
    function defaultIfUndefined(value, defaultValue) {
      return typeof value !== 'undefined' && value !== null ? value : defaultValue;
    }
    /**
     * Return month names according to a specified locale
     * @param  {String} locale A bcp47 localerouter. undefined will use the user browser locale
     * @param  {String} format long (ex. March), short (ex. Mar) or narrow (M)
     * @return {Array<String>} An array of month names
     */

    function getMonthNames(locale = undefined, format = 'long') {
      const dates = [];

      for (let i = 0; i < 12; i++) {
        dates.push(new Date(2000, i, 15));
      }

      const dtf = new Intl.DateTimeFormat(locale, {
        month: format,
        timeZone: 'UTC'
      });
      return dates.map(d => dtf.format(d));
    }
    /**
     * Return weekday names according to a specified locale
     * @param  {String} locale A bcp47 localerouter. undefined will use the user browser locale
     * @param  {Number} first day of week index
     * @param  {String} format long (ex. Thursday), short (ex. Thu) or narrow (T)
     * @return {Array<String>} An array of weekday names
     */

    function getWeekdayNames(locale = undefined, firstDayOfWeek = 0, format = 'narrow') {
      const dates = [];

      for (let i = 1, j = 0; j < 7; i++) {
        const d = new Date(Date.UTC(2000, 0, i));
        const day = d.getUTCDay();

        if (day === firstDayOfWeek + 1 || j > 0) {
          dates.push(d);
          j++;
        }
      }

      const dtf = new Intl.DateTimeFormat(locale, {
        weekday: format,
        timeZone: 'UTC'
      });
      return dates.map(d => dtf.format(d));
    }
    /**
     * Accept a regex with group names and return an object
     * ex. matchWithGroups(/((?!=<year>)\d+)\/((?!=<month>)\d+)\/((?!=<day>)\d+)/, '2000/12/25')
     * will return { year: 2000, month: 12, day: 25 }
     * @param  {String} includes injections of (?!={groupname}) for each group
     * @param  {String} the string to run regex
     * @return {Object} an object with a property for each group having the group's match as the value
     */

    function matchWithGroups(pattern, str) {
      const matches = str.match(pattern);
      return pattern // get the pattern as a string
      .toString() // suss out the groups
      .match(/<(.+?)>/g) // remove the braces
      .map(group => {
        const groupMatches = group.match(/<(.+)>/);

        if (!groupMatches || groupMatches.length <= 0) {
          return null;
        }

        return group.match(/<(.+)>/)[1];
      }) // create an object with a property for each group having the group's match as the value
      .reduce((acc, curr, index) => {
        if (matches && matches.length > index) {
          acc[curr] = matches[index + 1];
        } else {
          acc[curr] = null;
        }

        return acc;
      }, {});
    }
    function debounce(func, wait, immediate) {
      let timeout;
      return function () {
        const context = this;
        const args = arguments;

        const later = function () {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }

    let config = {
      iconPack: 'mdi',
      useHtml5Validation: true,
      statusIcon: true
    };
    const setOptions = options => {
      config = options;
    };
    let VueInstance;
    const setVueInstance = Vue => {
      VueInstance = Vue;
    };
    const Programmatic = {
      getOptions() {
        return config;
      },

      setOptions(options) {
        setOptions(merge(config, options, true));
      }

    };
    const Plugin = {
      install(Vue, options = {}) {
        setVueInstance(Vue); // Options

        setOptions(merge(config, options, true));
      }

    };

    const _defaultSuffixProcessor = (input, suffix) => {
      return blankIfUndefined(input).split(' ').filter(cls => cls.length > 0).map(cls => cls + suffix).join(' ');
    };

    var BaseComponentMixin = {
      props: {
        override: Boolean
      },
      methods: {
        computedClass(field, defaultValue, suffix = '') {
          let override = this.$props.override || getValueByPath(config, `${this.$options.configField}.override`, false);
          let overrideClass = getValueByPath(config, `${this.$options.configField}.${field}.override`, override);
          let globalClass = getValueByPath(config, `${this.$options.configField}.${field}.class`, '') || getValueByPath(config, `${this.$options.configField}.${field}`, '');
          let currentClass = this.$props[field];

          if (Array.isArray(currentClass)) {
            currentClass = currentClass.join(' ');
          }

          if (defaultValue.search("{*}") !== -1) {
            defaultValue = defaultValue.replace(/\{\*\}/g, suffix);
          } else {
            defaultValue = defaultValue + suffix;
          }

          if (typeof currentClass === "function") {
            currentClass = currentClass(suffix, {
              props: this.$props
            });
          } else {
            currentClass = _defaultSuffixProcessor(currentClass, suffix);
          }

          if (typeof globalClass === "function") {
            globalClass = globalClass(suffix, {
              props: this.$props
            });
          } else {
            globalClass = _defaultSuffixProcessor(globalClass, suffix);
          }

          return (`${override && !overrideClass || !override && !overrideClass ? defaultValue : ''} ` + `${blankIfUndefined(globalClass)} ` + `${blankIfUndefined(currentClass)}`).trim().replace(/\s\s+/g, ' ');
        }

      }
    };

    const mdiIcons = {
      sizes: {
        'default': 'mdi-24px',
        'small': null,
        'medium': 'mdi-36px',
        'large': 'mdi-48px'
      },
      iconPrefix: 'mdi-'
    };

    const faIcons = () => {
      const iconComponent = getValueByPath(config, 'iconComponent');
      const faIconPrefix = iconComponent ? '' : 'fa-';
      return {
        sizes: {
          'default': null,
          'small': null,
          'medium': faIconPrefix + 'lg',
          'large': faIconPrefix + '2x'
        },
        iconPrefix: faIconPrefix,
        internalIcons: {
          'information': 'info-circle',
          'alert': 'exclamation-triangle',
          'alert-circle': 'exclamation-circle',
          'chevron-right': 'angle-right',
          'chevron-left': 'angle-left',
          'chevron-down': 'angle-down',
          'chevron-up': 'angle-up',
          'eye-off': 'eye-slash',
          'caret-down': 'caret-down',
          'caret-up': 'caret-up',
          'close-circle': 'times-circle',
          'spin': 'circle-notch'
        }
      };
    };

    const getIcons = () => {
      let icons = {
        mdi: mdiIcons,
        fa: faIcons(),
        fas: faIcons(),
        far: faIcons(),
        fad: faIcons(),
        fab: faIcons(),
        fal: faIcons()
      };
      const customIconPacks = getValueByPath(config, 'customIconPacks');

      if (customIconPacks) {
        icons = merge(icons, customIconPacks, true);
      }

      return icons;
    };

    //
    /**
     * Icons take an important role of any application
     * @displayName Icon
     * @example ./examples/Icon.md
     * @style _icon.scss
     */

    var script = {
      name: 'OIcon',
      mixins: [BaseComponentMixin],
      configField: 'icon',
      props: {
        /**
         * 	Color of the icon, optional
         *  @values primary, info, success, warning, danger, and any other custom color
         */
        variant: [String, Object],

        /**
         * Icon component name
         */
        component: String,

        /**
         * Icon pack to use
         * @values mdi, fa, fas and any other custom icon pack
         */
        pack: String,

        /**
         * Icon name
         */
        icon: String,

        /**
         * Icon size, optional
         * @values small, medium, large
         */
        size: String,

        /**
         * Overrides icon font size, optional
         * @values Depends on library: null (smallest), fa-lg, fa-2x, fa-3x, fa-4x, fa-5x, mdi-18px, mdi-24px, mdi-36px, mdi-48px
         */
        customSize: String,

        /**
         * Add class to icon font, optional. See here for MDI, here for FontAwesome 4 and here for FontAwesome 5 custom classes
         */
        customClass: String,

        /**
         * When true makes icon clickable
         */
        clickable: Boolean,

        /** Enable spin effect on icon */
        spin: Boolean,

        /** Rotation 0-360 */
        rotation: [Number, String],

        /** @ignore */
        both: Boolean,
        // This is used internally
        rootClass: [String, Function, Array],
        clickableClass: [String, Function, Array],
        spinClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        variantClass: [String, Function, Array]
      },
      computed: {
        rootClasses() {
          return [this.computedClass('rootClass', 'o-icon'), {
            [this.computedClass('clickableClass', 'o-icon--clickable')]: this.clickable
          }, {
            [this.computedClass('spinClass', 'o-icon--spin')]: this.spin
          }, {
            [this.computedClass('sizeClass', 'o-icon--', this.size)]: this.size
          }, {
            [this.computedClass('variantClass', 'o-icon--', this.newVariant)]: this.newVariant
          }];
        },

        rootStyle() {
          return {
            transform: `rotate(${defaultIfUndefined(this.rotation, 0)}deg)`
          };
        },

        iconConfig() {
          return getIcons()[this.newPack];
        },

        iconPrefix() {
          if (this.iconConfig && this.iconConfig.iconPrefix) {
            return this.iconConfig.iconPrefix;
          }

          return '';
        },

        /**
        * Internal icon name based on the pack.
        * If pack is 'fa', gets the equivalent FA icon name of the MDI,
        * internal icons are always MDI.
        */
        newIcon() {
          return `${this.iconPrefix}${this.getEquivalentIconOf(this.icon)}`;
        },

        newPack() {
          return this.pack || getValueByPath(config, 'iconPack', 'mdi');
        },

        newVariant() {
          if (!this.variant) return;
          let newVariant = '';

          if (typeof this.variant === 'string') {
            newVariant = this.variant;
          } else {
            newVariant = Object.keys(this.variant).filter(key => this.variant[key])[0];
          }

          return newVariant;
        },

        newCustomSize() {
          return this.customSize || this.customSizeByPack;
        },

        customSizeByPack() {
          if (this.iconConfig && this.iconConfig.sizes) {
            if (this.size && this.iconConfig.sizes[this.size] !== undefined) {
              return this.iconConfig.sizes[this.size];
            } else if (this.iconConfig.sizes.default) {
              return this.iconConfig.sizes.default;
            }
          }

          return null;
        },

        useIconComponent() {
          if (this.component) return this.component;
          const component = getValueByPath(config, 'iconComponent');
          if (component) return component;
          return null;
        }

      },
      methods: {
        /**
        * Equivalent icon name of the MDI.
        */
        getEquivalentIconOf(value) {
          // Only transform the class if the both prop is set to true
          if (!this.both) {
            return value;
          }

          if (this.iconConfig && this.iconConfig.internalIcons && this.iconConfig.internalIcons[value]) {
            return this.iconConfig.internalIcons[value];
          }

          return value;
        }

      }
    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
    /* server only */
    , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
      } // Vue.extend constructor export interop.


      const options = typeof script === 'function' ? script.options : script; // render functions

      if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true; // functional template

        if (isFunctionalTemplate) {
          options.functional = true;
        }
      } // scopedId


      if (scopeId) {
        options._scopeId = scopeId;
      }

      let hook;

      if (moduleIdentifier) {
        // server build
        hook = function (context) {
          // 2.3 injection
          context = context || // cached call
          this.$vnode && this.$vnode.ssrContext || // stateful
          this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
          // 2.2 with runInNewContext: true

          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          } // inject component styles


          if (style) {
            style.call(this, createInjectorSSR(context));
          } // register component module identifier for async chunk inference


          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        }; // used by ssr in case component is cached and beforeCreate
        // never gets called


        options._ssrRegister = hook;
      } else if (style) {
        hook = shadowMode ? function (context) {
          style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function (context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook) {
        if (options.functional) {
          // register for functional component in vue file
          const originalRender = options.render;

          options.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = options.beforeCreate;
          options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }

      return script;
    }

    /* script */
    const __vue_script__ = script;

    /* template */
    var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{class:_vm.rootClasses,style:(_vm.rootStyle)},[(!_vm.useIconComponent)?_c('i',{class:[_vm.newPack, _vm.newIcon, _vm.newCustomSize, _vm.customClass]}):_c(_vm.useIconComponent,{tag:"component",class:[_vm.customClass],attrs:{"icon":[_vm.newPack, _vm.newIcon],"size":_vm.newCustomSize}})],1)};
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

    var FormElementMixin = {
      inject: {
        $field: {
          name: "$field",
          default: false
        },
        $elementRef: {
          name: "$elementRef",
          default: false
        }
      },
      props: {
        /**
         * Makes input full width when inside a grouped or addon field
         */
        expanded: Boolean,

        /**
         * Makes the element rounded
         */
        rounded: Boolean,

        /**
         * Icon name to be added
         */
        icon: String,

        /**
         * Icon pack to use
         * @values mdi, fa, fas and any other custom icon pack
         */
        iconPack: String,

        /** Native options to use in HTML5 validation */
        autocomplete: String,

        /** Same as native maxlength, plus character counter */
        maxlength: [Number, String],

        /** Enable html 5 native validation */
        useHtml5Validation: {
          type: Boolean,
          default: () => {
            return getValueByPath(config, "useHtml5Validation", true);
          }
        },

        /** Show status icon using field and variant prop */
        statusIcon: {
          type: Boolean,
          default: () => {
            return getValueByPath(config, "statusIcon", true);
          }
        },

        /**
         * The message which is shown when a validation error occurs
         */
        validationMessage: String
      },

      data() {
        return {
          isValid: true,
          isFocused: false,
          newIconPack: this.iconPack
        };
      },

      computed: {
        parentField() {
          return this.$field;
        },

        /**
         * Get the type prop from parent if it's a Field.
         */
        statusVariant() {
          if (!this.parentField) return;
          if (!this.parentField.newVariant) return;

          if (typeof this.parentField.newVariant === "string") {
            return this.parentField.newVariant;
          } else {
            for (const key in this.parentField.newVariant) {
              if (this.parentField.newVariant[key]) {
                return key;
              }
            }
          }
        },

        /**
         * Get the message prop from parent if it's a Field.
         */
        statusMessage() {
          if (!this.parentField) return;
          return this.parentField.newMessage || this.parentField.hasMessageSlot;
        }

      },
      methods: {
        /**
         * Focus method that work dynamically depending on the component.
         */
        focus() {
          const el = this.getElement();
          if (el === undefined) return;
          this.$nextTick(() => {
            if (el) el.focus();
          });
        },

        onBlur($event) {
          this.isFocused = false;
          this.$emit("blur", $event);
          this.checkHtml5Validity();
        },

        onFocus($event) {
          this.isFocused = true;
          this.$emit("focus", $event);
        },

        getElement() {
          let el = this.$refs[this.$elementRef];

          while (el && el.$elementRef) {
            el = el.$refs[el.$elementRef];
          }

          return el;
        },

        setInvalid() {
          const variant = "danger";
          const message = this.validationMessage || this.getElement().validationMessage;
          this.setValidity(variant, message);
        },

        setValidity(variant, message) {
          this.$nextTick(() => {
            if (this.parentField) {
              // Set type only if not defined
              if (!this.parentField.variant) {
                this.parentField.newVariant = variant;
              } // Set message only if not defined


              if (!this.parentField.message) {
                this.parentField.newMessage = message;
              }
            }
          });
        },

        /**
         * Check HTML5 validation, set isValid property.
         * If validation fail, send 'danger' type,
         * and error message to parent if it's a Field.
         */
        checkHtml5Validity() {
          if (!this.useHtml5Validation) return;
          const el = this.getElement();
          if (el === undefined) return;

          if (!el.checkValidity()) {
            this.setInvalid();
            this.isValid = false;
          } else {
            this.setValidity(null, null);
            this.isValid = true;
          }

          return this.isValid;
        }

      }
    };

    //
    /**
     * Get user Input. Use with Field to access all functionalities
     * @displayName Input
     * @example ./examples/Input.md
     * @style _input.scss
     */

    var script$1 = {
      name: 'OInput',
      components: {
        [__vue_component__.name]: __vue_component__
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
    const __vue_script__$1 = script$1;

    /* template */
    var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClasses},[((_vm.newType)==='checkbox'&&(_vm.type !== 'textarea'))?_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",class:_vm.inputClasses,attrs:{"autocomplete":_vm.newAutocomplete,"maxlength":_vm.maxlength,"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.computedValue)?_vm._i(_vm.computedValue,null)>-1:(_vm.computedValue)},on:{"blur":_vm.onBlur,"focus":_vm.onFocus,"change":function($event){var $$a=_vm.computedValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.computedValue=$$a.concat([$$v]));}else {$$i>-1&&(_vm.computedValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else {_vm.computedValue=$$c;}}}},'input',_vm.$attrs,false)):((_vm.newType)==='radio'&&(_vm.type !== 'textarea'))?_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",class:_vm.inputClasses,attrs:{"autocomplete":_vm.newAutocomplete,"maxlength":_vm.maxlength,"type":"radio"},domProps:{"checked":_vm._q(_vm.computedValue,null)},on:{"blur":_vm.onBlur,"focus":_vm.onFocus,"change":function($event){_vm.computedValue=null;}}},'input',_vm.$attrs,false)):(_vm.type !== 'textarea')?_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",class:_vm.inputClasses,attrs:{"autocomplete":_vm.newAutocomplete,"maxlength":_vm.maxlength,"type":_vm.newType},domProps:{"value":(_vm.computedValue)},on:{"blur":_vm.onBlur,"focus":_vm.onFocus,"input":function($event){if($event.target.composing){ return; }_vm.computedValue=$event.target.value;}}},'input',_vm.$attrs,false)):_c('textarea',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"textarea",class:_vm.inputClasses,attrs:{"maxlength":_vm.maxlength},domProps:{"value":(_vm.computedValue)},on:{"blur":_vm.onBlur,"focus":_vm.onFocus,"input":function($event){if($event.target.composing){ return; }_vm.computedValue=$event.target.value;}}},'textarea',_vm.$attrs,false)),(_vm.icon)?_c('o-icon',{class:_vm.iconLeftClasses,attrs:{"clickable":_vm.iconClickable,"icon":_vm.icon,"pack":_vm.iconPack,"size":_vm.size},nativeOn:{"click":function($event){return _vm.iconClick('icon-click', $event)}}}):_vm._e(),(_vm.hasIconRight)?_c('o-icon',{class:_vm.iconRightClasses,attrs:{"clickable":_vm.passwordReveal || _vm.iconRightClickable,"icon":_vm.rightIcon,"pack":_vm.iconPack,"size":_vm.size,"variant":_vm.rightIconVariant,"both":""},nativeOn:{"click":function($event){return _vm.rightIconClick($event)}}}):_vm._e(),(_vm.maxlength && _vm.hasCounter && _vm.isFocused && _vm.type !== 'number')?_c('small',{class:_vm.counterClasses},[_vm._v(" "+_vm._s(_vm.valueLength)+" / "+_vm._s(_vm.maxlength)+" ")]):_vm._e()],1)};
    var __vue_staticRenderFns__$1 = [];

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
        { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
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

    //
    /**
     * Extended input that provide suggestions while the user types
     * @displayName Autocomplete
     * @example ./examples/Autocomplete.md
     * @style _autocomplete.scss
     */

    var script$2 = {
      name: 'OAutocomplete',
      configField: 'autocomplete',
      components: {
        [__vue_component__$1.name]: __vue_component__$1
      },
      mixins: [BaseComponentMixin, FormElementMixin],
      inheritAttrs: false,

      provide() {
        return {
          $elementRef: 'input'
        };
      },

      props: {
        /** @model */
        value: [Number, String],

        /** Options / suggestions */
        data: {
          type: Array,
          default: () => []
        },

        /**
         * Vertical size of input, optional
         * @values small, medium, large
         */
        size: String,

        /** Property of the object (if data is array of objects) to use as display text, and to keep track of selected option */
        field: {
          type: String,
          default: 'value'
        },

        /** The first option will always be pre-selected (easier to just hit enter or tab) */
        keepFirst: Boolean,

        /** Clear input text on select */
        clearOnSelect: Boolean,

        /** Open dropdown list on focus */
        openOnFocus: Boolean,

        /** Function to format an option to a string for display in the input as alternative to field prop) */
        customFormatter: Function,

        /** Makes the component check if list reached scroll end and emit infinite-scroll event. */
        checkInfiniteScroll: Boolean,

        /** Keep open dropdown list after select */
        keepOpen: Boolean,

        /** Add a button/icon to clear the inputed text */
        clearable: Boolean,

        /** Max height of dropdown content */
        maxHeight: [String, Number],

        /**
         * Position of dropdown
         * @values auto, top, bottom
         */
        menuPosition: {
          type: String,
          default: 'auto'
        },

        /** Transition name to apply on dropdown list */
        animation: {
          type: String,
          default: () => {
            return getValueByPath(config, 'autocomplete.animation', 'fade');
          }
        },

        /** Property of the object (if <code>data</code> is array of objects) to use as display text of group */
        groupField: String,

        /** Property of the object (if <code>data</code> is array of objects) to use as key to get items array of each group, optional */
        groupOptions: String,

        /** Number of milliseconds to delay before to emit typing event */
        debounceTyping: Number,

        /** Icon name to be added on the right side */
        iconRight: String,

        /** Clickable icon right if exists */
        iconRightClickable: Boolean,

        /** Append autocomplete content to body */
        appendToBody: Boolean,

        /** Array of keys (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) which will add a tag when typing (default tab and enter) */
        confirmKeys: {
          type: Array,
          default: () => ['Tab', 'Enter']
        },
        rootClass: [String, Function, Array],
        menuClass: [String, Function, Array],
        expandedClass: [String, Function, Array],
        menuPositionClass: [String, Function, Array],
        itemClass: [String, Function, Array],
        itemHoverClass: [String, Function, Array],
        itemGroupTitleClass: [String, Function, Array],

        /** Classes to apply on internal input (@see o-input style docs) */
        inputClasses: Object
      },

      data() {
        return {
          selected: null,
          hovered: null,
          isActive: false,
          newValue: this.value,
          newAutocomplete: this.autocomplete || 'off',
          isListInViewportVertically: true,
          hasFocus: false,
          bodyEl: undefined // Used to append to body

        };
      },

      computed: {
        rootClasses() {
          return [this.computedClass('rootClass', 'o-acp'), {
            [this.computedClass('expandedClass', 'o-acp--expanded')]: this.expanded
          }];
        },

        menuClasses() {
          return [this.computedClass('menuClass', 'o-acp__menu'), {
            [this.computedClass('menuPositionClass', 'o-acp__menu--', this.newDropdownPosition)]: !this.appendToBody
          }];
        },

        itemClasses() {
          return [this.computedClass('itemClass', 'o-acp__item')];
        },

        itemEmptyClasses() {
          return [...this.itemClasses, this.computedClass('itemGroupTitleClass', 'o-acp__item-group-title')];
        },

        inputBind() {
          return { ...this.$attrs,
            ...this.inputClasses
          };
        },

        computedData() {
          if (this.groupField) {
            if (this.groupOptions) {
              const newData = [];
              this.data.forEach(option => {
                const group = getValueByPath(option, this.groupField);
                const items = getValueByPath(option, this.groupOptions);
                newData.push({
                  group,
                  items
                });
              });
              return newData;
            } else {
              const tmp = {};
              this.data.forEach(option => {
                const group = getValueByPath(option, this.groupField);
                if (!tmp[group]) tmp[group] = [];
                tmp[group].push(option);
              });
              const newData = [];
              Object.keys(this.data).forEach(group => {
                newData.push({
                  group,
                  items: this.data[group]
                });
              });
              return newData;
            }
          }

          return [{
            items: this.data
          }];
        },

        isEmpty() {
          if (!this.computedData) return true;
          return !this.computedData.some(element => element.items && element.items.length);
        },

        /**
         * White-listed items to not close when clicked.
         * Add input, dropdown and all children.
         */
        whiteList() {
          const whiteList = [];
          whiteList.push(this.$refs.input.$el.querySelector('input'));
          whiteList.push(this.$refs.dropdown); // Add all children from dropdown

          if (this.$refs.dropdown !== undefined) {
            const children = this.$refs.dropdown.querySelectorAll('*');

            for (const child of children) {
              whiteList.push(child);
            }
          }

          if (this.$parent.$data._isTaginput) {
            // Add taginput container
            whiteList.push(this.$parent.$el); // Add .tag and .delete

            const tagInputChildren = this.$parent.$el.querySelectorAll('*');

            for (const tagInputChild of tagInputChildren) {
              whiteList.push(tagInputChild);
            }
          }

          return whiteList;
        },

        newDropdownPosition() {
          if (this.menuPosition === 'top' || this.menuPosition === 'auto' && !this.isListInViewportVertically) {
            return 'top';
          }

          return 'bottom';
        },

        newIconRight() {
          if (this.clearable && this.newValue) {
            return 'close-circle';
          }

          return this.iconRight;
        },

        newIconRightClickable() {
          if (this.clearable) {
            return true;
          }

          return this.iconRightClickable;
        },

        menuStyle() {
          return {
            maxHeight: toCssDimension(this.maxHeight)
          };
        }

      },
      watch: {
        /**
         * When v-model is changed:
         *   1. Update internal value.
         *   2. If it's invalid, validate again.
         */
        value(value) {
          this.newValue = value;
        },

        /**
         * When dropdown is toggled, check the visibility to know when
         * to open upwards.
         */
        isActive(active) {
          if (this.menuPosition === 'auto') {
            if (active) {
              this.calcDropdownInViewportVertical();
            } else {
              // Timeout to wait for the animation to finish before recalculating
              setTimeout(() => {
                this.calcDropdownInViewportVertical();
              }, 100);
            }
          }

          if (active) this.$nextTick(() => this.setHovered(null));
        },

        /**
         * When updating input's value
         *   1. Emit changes
         *   2. If value isn't the same as selected, set null
         *   3. Close dropdown if value is clear or else open it
         */
        newValue(value) {
          this.$emit('input', value); // Check if selected is invalid

          const currentValue = this.getValue(this.selected);

          if (currentValue && currentValue !== value) {
            this.setSelected(null, false);
          } // Close dropdown if input is clear or else open it


          if (this.hasFocus && (!this.openOnFocus || value)) {
            this.isActive = !!value;
          }
        },

        /**
         * Select first option if "keep-first"
         */
        data(value) {
          // Keep first option always pre-selected
          if (this.keepFirst) {
            this.selectFirstOption(value);
          }
        },

        debounceTyping: {
          handler(value) {
            this.debouncedEmitTyping = debounce(this.emitTyping, value);
          },

          immediate: true
        }
      },
      methods: {
        itemOptionClasses(option) {
          return [...this.itemClasses, {
            [this.computedClass('itemHoverClass', 'o-acp__item--hover')]: option === this.hovered
          }];
        },

        /**
         * Set which option is currently hovered.
         */
        setHovered(option) {
          if (option === undefined) return;
          this.hovered = option;
        },

        /**
         * Set which option is currently selected, update v-model,
         * update input value and close dropdown.
         */
        setSelected(option, closeDropdown = true, event = undefined) {
          if (option === undefined) return;
          this.selected = option;
          /**
           * @property {Object} selected selected option
           * @property {Event} event native event
           */

          this.$emit('select', this.selected, event);

          if (this.selected !== null) {
            this.newValue = this.clearOnSelect ? '' : this.getValue(this.selected);
            this.setHovered(null);
          }

          closeDropdown && this.$nextTick(() => {
            this.isActive = false;
          });
          this.checkValidity();
        },

        /**
         * Select first option
         */
        selectFirstOption(options) {
          this.$nextTick(() => {
            if (options.length) {
              // If has visible data or open on focus, keep updating the hovered
              if (this.openOnFocus || this.newValue !== '' && this.hovered !== options[0]) {
                this.setHovered(options[0]);
              }
            } else {
              this.setHovered(null);
            }
          });
        },

        /**
         * Key listener.
         * Select the hovered option.
         */
        keydown(event) {
          const {
            key
          } = event; // cannot destructure preventDefault (https://stackoverflow.com/a/49616808/2774496)
          // Close dropdown on Tab & no hovered

          this.isActive = key !== 'Tab';
          if (this.hovered === null) return;

          if (this.confirmKeys.indexOf(key) >= 0) {
            // If adding by comma, don't add the comma to the input
            if (key === ',') event.preventDefault(); // Close dropdown on select by Tab

            const closeDropdown = !this.keepOpen || key === 'Tab';
            this.setSelected(this.hovered, closeDropdown, event);
          }
        },

        /**
         * Close dropdown if clicked outside.
         */
        clickedOutside(event) {
          if (!this.hasFocus && this.whiteList.indexOf(event.target) < 0) {
            if (this.keepFirst && this.hovered) {
              this.setSelected(this.hovered, true);
            } else {
              this.isActive = false;
            }
          }
        },

        /**
         * Return display text for the input.
         * If object, get value from path, or else just the value.
         */
        getValue(option) {
          if (option === null) return;

          if (typeof this.customFormatter !== 'undefined') {
            return this.customFormatter(option);
          }

          return typeof option === 'object' ? getValueByPath(option, this.field) : option;
        },

        /**
         * Check if the scroll list inside the dropdown
         * reached it's end.
         */
        checkIfReachedTheEndOfScroll() {
          const list = this.$refs.dropdown;

          if (list.clientHeight !== list.scrollHeight && list.scrollTop + list.clientHeight >= list.scrollHeight) {
            this.$emit('infinite-scroll');
          }
        },

        /**
         * Calculate if the dropdown is vertically visible when activated,
         * otherwise it is openened upwards.
         */
        calcDropdownInViewportVertical() {
          this.$nextTick(() => {
            /**
            * this.$refs.dropdown may be undefined
            * when Autocomplete is conditional rendered
            */
            if (this.$refs.dropdown === undefined) return;
            const rect = this.$refs.dropdown.getBoundingClientRect();
            this.isListInViewportVertically = rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);

            if (this.appendToBody) {
              this.updateAppendToBody();
            }
          });
        },

        /**
         * Arrows keys listener.
         * If dropdown is active, set hovered option, or else just open.
         */
        keyArrows(direction) {
          const sum = direction === 'down' ? 1 : -1;

          if (this.isActive) {
            const data = this.computedData.map(d => d.items).reduce((a, b) => [...a, ...b], []);
            let index = data.indexOf(this.hovered) + sum;
            index = index > data.length - 1 ? data.length - 1 : index;
            index = index < 0 ? 0 : index;
            this.setHovered(data[index]);
            const list = this.$refs.dropdown;
            const element = list.querySelectorAll(`a`)[index];
            if (!element) return;
            const visMin = list.scrollTop;
            const visMax = list.scrollTop + list.clientHeight - element.clientHeight;

            if (element.offsetTop < visMin) {
              list.scrollTop = element.offsetTop;
            } else if (element.offsetTop >= visMax) {
              list.scrollTop = element.offsetTop - list.clientHeight + element.clientHeight;
            }
          } else {
            this.isActive = true;
          }
        },

        /**
         * Focus listener.
         * If value is the same as selected, select all text.
         */
        focused(event) {
          if (this.getValue(this.selected) === this.newValue) {
            this.$el.querySelector('input').select();
          }

          if (this.openOnFocus) {
            this.isActive = true;

            if (this.keepFirst) {
              this.selectFirstOption(this.computedData);
            }
          }

          this.hasFocus = true;
          this.$emit('focus', event);
        },

        /**
        * Blur listener.
        */
        onBlur(event) {
          this.hasFocus = false;
          this.$emit('blur', event);
        },

        onInput() {
          const currentValue = this.getValue(this.selected);
          if (currentValue && currentValue === this.newValue) return;

          if (this.debounceTyping) {
            this.debouncedEmitTyping();
          } else {
            this.emitTyping();
          }
        },

        emitTyping() {
          this.$emit('typing', this.newValue);
          this.checkValidity();
        },

        rightIconClick(event) {
          if (this.clearable) {
            this.newValue = '';
            this.setSelected(null, false);

            if (this.openOnFocus) {
              this.$refs.input.$el.focus();
            }
          } else {
            this.$emit('icon-right-click', event);
          }
        },

        checkValidity() {
          if (this.useHtml5Validation) {
            this.$nextTick(() => {
              this.checkHtml5Validity();
            });
          }
        },

        updateAppendToBody() {
          const dropdownMenu = this.$refs.dropdown;
          const trigger = this.$refs.input.$el;

          if (dropdownMenu && trigger) {
            // update wrapper dropdown
            const root = this.$data.bodyEl;
            root.classList.forEach(item => root.classList.remove(item));
            this.rootClasses.forEach(item => {
              if (item) {
                if (typeof item === 'object') {
                  Object.keys(item).filter(key => item[key]).forEach(key => root.classList.add(key));
                } else {
                  root.classList.add(item);
                }
              }
            });
            const rect = trigger.getBoundingClientRect();
            let top = rect.top + window.scrollY;
            const left = rect.left + window.scrollX;

            if (this.newDropdownPosition !== 'top') {
              top += trigger.clientHeight;
            } else {
              top -= dropdownMenu.clientHeight;
            }

            dropdownMenu.style.position = 'absolute';
            dropdownMenu.style.top = `${top}px`;
            dropdownMenu.style.left = `${left}px`;
            dropdownMenu.style.width = `${trigger.clientWidth}px`;
            dropdownMenu.style.maxWidth = `${trigger.clientWidth}px`;
            dropdownMenu.style.zIndex = '9999';
          }
        }

      },

      created() {
        if (typeof window !== 'undefined') {
          document.addEventListener('click', this.clickedOutside);
          if (this.menuPosition === 'auto') window.addEventListener('resize', this.calcDropdownInViewportVertical);
        }
      },

      mounted() {
        const list = this.$refs.dropdown;

        if (this.checkInfiniteScroll && list) {
          list.addEventListener('scroll', this.checkIfReachedTheEndOfScroll);
        }

        if (this.appendToBody) {
          this.$data.bodyEl = createAbsoluteElement(list);
          this.updateAppendToBody();
        }
      },

      beforeDestroy() {
        if (typeof window !== 'undefined') {
          document.removeEventListener('click', this.clickedOutside);
          if (this.menuPosition === 'auto') window.removeEventListener('resize', this.calcDropdownInViewportVertical);
        }

        if (this.checkInfiniteScroll && this.$refs.dropdown) {
          const list = this.$refs.dropdown;
          list.removeEventListener('scroll', this.checkIfReachedTheEndOfScroll);
        }

        if (this.appendToBody) {
          removeElement(this.$data.bodyEl);
        }
      }

    };

    /* script */
    const __vue_script__$2 = script$2;

    /* template */
    var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClasses},[_c('o-input',_vm._b({ref:"input",attrs:{"type":"text","size":_vm.size,"rounded":_vm.rounded,"icon":_vm.icon,"icon-right":_vm.newIconRight,"icon-right-clickable":_vm.newIconRightClickable,"icon-pack":_vm.iconPack,"maxlength":_vm.maxlength,"autocomplete":_vm.newAutocomplete,"use-html5-validation":false},on:{"input":_vm.onInput,"focus":_vm.focused,"blur":_vm.onBlur,"icon-right-click":_vm.rightIconClick,"icon-click":function (event) { return _vm.$emit('icon-click', event); }},nativeOn:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }$event.preventDefault();_vm.isActive = false;},"keydown":[function($event){return _vm.keydown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }$event.preventDefault();return _vm.keyArrows('up')},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }$event.preventDefault();return _vm.keyArrows('down')}]},model:{value:(_vm.newValue),callback:function ($$v) {_vm.newValue=$$v;},expression:"newValue"}},'o-input',_vm.inputBind,false)),_c('transition',{attrs:{"name":_vm.animation}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive && (!_vm.isEmpty || _vm.$slots.empty || _vm.$slots.header)),expression:"isActive && (!isEmpty || $slots.empty || $slots.header)"}],ref:"dropdown",class:_vm.menuClasses,style:(_vm.menuStyle)},[(_vm.$slots.header)?_c('div',{class:_vm.itemClasses},[_vm._t("header")],2):_vm._e(),_vm._l((_vm.computedData),function(element,groupindex){return [(element.group)?_c('div',{key:groupindex + 'group',class:_vm.itemEmptyClasses},[(_vm.$scopedSlots.group)?_vm._t("group",null,{"group":element.group,"index":groupindex}):_c('span',[_vm._v(" "+_vm._s(element.group)+" ")])],2):_vm._e(),_vm._l((element.items),function(option,index){return _c('div',{key:groupindex + ':' + index,class:_vm.itemOptionClasses(option),on:{"click":function($event){return _vm.setSelected(option, undefined, $event)}}},[(_vm.$scopedSlots.default)?_vm._t("default",null,{"option":option,"index":index}):_c('span',[_vm._v(" "+_vm._s(_vm.getValue(option, true))+" ")])],2)})]}),(_vm.isEmpty && _vm.$slots.empty)?_c('div',{class:_vm.itemEmptyClasses},[_vm._t("empty")],2):_vm._e(),(_vm.$slots.footer)?_c('div',{class:_vm.itemClasses},[_vm._t("footer")],2):_vm._e()],2)])],1)};
    var __vue_staticRenderFns__$2 = [];

      /* style */
      const __vue_inject_styles__$2 = undefined;
      /* scoped */
      const __vue_scope_id__$2 = undefined;
      /* module identifier */
      const __vue_module_identifier__$2 = undefined;
      /* functional template */
      const __vue_is_functional_template__$2 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
        __vue_inject_styles__$2,
        __vue_script__$2,
        __vue_scope_id__$2,
        __vue_is_functional_template__$2,
        __vue_module_identifier__$2,
        false,
        undefined,
        undefined,
        undefined
      );

    const use = plugin => {
      if (typeof window !== 'undefined' && window.Vue) {
        window.Vue.use(plugin);
      }
    };
    const registerPlugin = (vm, plugin) => {
      vm.use(plugin);
    };
    const registerComponent = (vm, component) => {
      vm.component(component.name, component);
    };
    const registerComponentProgrammatic = (vm, property, component) => {
      if (!vm.prototype.$oruga) vm.prototype.$oruga = {};
      vm.prototype.$oruga[property] = component;
    };

    const Plugin$1 = {
      install(Vue) {
        registerComponent(Vue, __vue_component__$2);
      }

    };
    use(Plugin$1);

    //
    /**
     * The classic button, in different colors, sizes, and states
     * @displayName Button
     * @example ./examples/Button.md
     * @style _button.scss
     */

    var script$3 = {
      name: 'OButton',
      components: {
        [__vue_component__.name]: __vue_component__
      },
      configField: 'button',
      mixins: [BaseComponentMixin],
      inheritAttrs: false,
      props: {
        /**
        * Color of the control, optional
        * @values primary, info, success, warning, danger, and any other custom color
        */
        variant: [String, Object],

        /**
         * Size of button, optional
         * @values small, medium, large
         */
        size: String,

        /**
         * Button label, optional when default slot
         */
        label: String,

        /**
         * Icon pack to use
         * @values mdi, fa, fas and any other custom icon pack
         */
        iconPack: String,

        /**
         * Icon name to show on the left
         */
        iconLeft: String,

        /**
         * Icon name to show on the right
         */
        iconRight: String,

        /**
         * Rounded style
         */
        rounded: {
          type: Boolean,
          default: () => {
            return getValueByPath(config, 'button.rounded', false);
          }
        },

        /**
         * Outlined style
         */
        outlined: Boolean,

        /**
         * Button will be expanded (full-width)
         */
        expanded: Boolean,
        inverted: Boolean,

        /**
         * Button type, like native
         */
        nativeType: {
          type: String,
          default: 'button',
          validator: value => {
            return ['button', 'submit', 'reset'].indexOf(value) >= 0;
          }
        },

        /**
         * Button tag name
         * @values button, a, input, router-link, nuxt-link (or other nuxt alias)
         */
        tag: {
          type: String,
          default: 'button'
        },

        /**
         * Button will be disabled
         */
        disabled: Boolean,

        /**  @ignore */
        iconBoth: Boolean,
        // This is used internally
        rootClass: [String, Function, Array],
        outlinedClass: [String, Function, Array],
        invertedClass: [String, Function, Array],
        expandedClass: [String, Function, Array],
        roundedClass: [String, Function, Array],
        disabledClass: [String, Function, Array],
        iconClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        variantClass: [String, Function, Array]
      },
      computed: {
        rootClasses() {
          return [this.computedClass('rootClass', 'o-btn'), {
            [this.computedClass('sizeClass', 'o-btn--', this.size)]: this.size
          }, {
            [this.computedClass('variantClass', 'o-btn--', this.variant)]: this.variant
          }, {
            [this.computedClass('outlinedClass', 'o-btn--outlined')]: this.outlined && !this.variant
          }, {
            [this.computedClass('invertedClass', 'o-btn--inverted')]: this.inverted && !this.variant
          }, {
            [this.computedClass('outlinedClass', 'o-btn--outlined-', this.variant)]: this.outlined && this.variant
          }, {
            [this.computedClass('invertedClass', 'o-btn--inverted-', this.variant)]: this.inverted && this.variant
          }, {
            [this.computedClass('expandedClass', 'o-btn--expanded')]: this.expanded
          }, {
            [this.computedClass('roundedClass', 'o-btn--rounded')]: this.rounded
          }, {
            [this.computedClass('disabledClass', 'o-btn--disabled')]: this.disabled
          }];
        },

        iconClasses() {
          return [this.computedClass('iconClass', 'o-btn__icon')];
        },

        elementsWrapperClasses() {
          return [this.computedClass('elementsWrapperClass', 'o-btn__wrapper')];
        },

        computedTag() {
          if (this.disabled !== undefined && this.disabled !== false) {
            return 'button';
          }

          return this.tag;
        },

        computedNativeType() {
          if (this.tag === 'a') {
            return;
          }

          return this.nativeType;
        }

      }
    };

    /* script */
    const __vue_script__$3 = script$3;

    /* template */
    var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.computedTag,_vm._g(_vm._b({tag:"component",class:_vm.rootClasses,attrs:{"type":_vm.computedNativeType}},'component',_vm.$attrs,false),_vm.$listeners),[_c('span',{class:_vm.elementsWrapperClasses},[(_vm.iconLeft)?_c('o-icon',{class:_vm.iconClasses,attrs:{"pack":_vm.iconPack,"icon":_vm.iconLeft,"size":_vm.size,"both":_vm.iconBoth}}):_vm._e(),(_vm.label)?_c('span',[_vm._v(_vm._s(_vm.label))]):(_vm.$slots.default)?_c('span',[_vm._t("default")],2):_vm._e(),(_vm.iconRight)?_c('o-icon',{class:_vm.iconClasses,attrs:{"pack":_vm.iconPack,"icon":_vm.iconRight,"size":_vm.size,"both":_vm.iconBoth}}):_vm._e()],1)])};
    var __vue_staticRenderFns__$3 = [];

      /* style */
      const __vue_inject_styles__$3 = undefined;
      /* scoped */
      const __vue_scope_id__$3 = undefined;
      /* module identifier */
      const __vue_module_identifier__$3 = undefined;
      /* functional template */
      const __vue_is_functional_template__$3 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$3 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
        __vue_inject_styles__$3,
        __vue_script__$3,
        __vue_scope_id__$3,
        __vue_is_functional_template__$3,
        __vue_module_identifier__$3,
        false,
        undefined,
        undefined,
        undefined
      );

    const Plugin$2 = {
      install(Vue) {
        registerComponent(Vue, __vue_component__$3);
      }

    };
    use(Plugin$2);

    var CheckRadioMixin = {
      props: {
        /** @model */
        value: [String, Number, Boolean, Array],

        /**
         * Same as native value
         */
        nativeValue: [String, Number, Boolean, Array],

        /**
         * Color of the control, optional
         * @values primary, info, success, warning, danger, and any other custom color
         */
        variant: String,

        /**
         * Same as native disabled
         */
        disabled: Boolean,
        required: Boolean,

        /**
         * Same as native name
         */
        name: String,

        /**
         * Size of the control, optional
         * @values small, medium, large
         */
        size: String
      },

      data() {
        return {
          newValue: this.value,
          isIndeterminate: this.indeterminate
        };
      },

      computed: {
        computedValue: {
          get() {
            return this.newValue;
          },

          set(value) {
            this.newValue = value;
            this.isIndeterminate = false;
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

    //
    /**
     * Select a single or grouped options
     * @displayName Checkbox
     * @example ./examples/Checkbox.md
     * @style _checkbox.scss
     */

    var script$4 = {
      name: 'OCheckbox',
      mixins: [BaseComponentMixin, CheckRadioMixin],
      configField: 'checkbox',
      props: {
        /**
         * Same as native indeterminate
         */
        indeterminate: {
          type: Boolean,
          default: false
        },

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
        rootClass: [String, Function, Array],
        disabledClass: [String, Function, Array],
        checkClass: [String, Function, Array],
        checkedClass: [String, Function, Array],
        checkCheckedClass: [String, Function, Array],
        checkIndeterminateClass: [String, Function, Array],
        labelClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        variantClass: [String, Function, Array]
      },
      watch: {
        indeterminate: {
          handler(val) {
            this.isIndeterminate = val;
          },

          immediate: true
        }
      },
      computed: {
        isChecked() {
          return this.computedValue === this.trueValue || Array.isArray(this.computedValue) && this.computedValue.indexOf(this.nativeValue) !== -1;
        },

        rootClasses() {
          return [this.computedClass('rootClass', 'o-chk'), {
            [this.computedClass('checkedClass', 'o-chk--checked')]: this.isChecked
          }, {
            [this.computedClass('sizeClass', 'o-chk--', this.size)]: this.size
          }, {
            [this.computedClass('disabledClass', 'o-chk--disabled')]: this.disabled
          }, {
            [this.computedClass('variantClass', 'o-chk--', this.variant)]: this.variant
          }];
        },

        checkClasses() {
          return [this.computedClass('checkClass', 'o-chk__check'), {
            [this.computedClass('checkCheckedClass', 'o-chk__check--checked')]: this.isChecked
          }, {
            [this.computedClass('checkIndeterminateClass', 'o-chk__check--indeterminate')]: this.isIndeterminate
          }];
        },

        labelClasses() {
          return [this.computedClass('labelClass', 'o-chk__label')];
        }

      }
    };

    /* script */
    const __vue_script__$4 = script$4;

    /* template */
    var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{ref:"label",class:_vm.rootClasses,attrs:{"disabled":_vm.disabled},on:{"click":_vm.focus,"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.$refs.label.click()}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",class:_vm.checkClasses,attrs:{"type":"checkbox","disabled":_vm.disabled,"required":_vm.required,"name":_vm.name,"true-value":_vm.trueValue,"false-value":_vm.falseValue},domProps:{"indeterminate":_vm.indeterminate,"value":_vm.nativeValue,"checked":Array.isArray(_vm.computedValue)?_vm._i(_vm.computedValue,_vm.nativeValue)>-1:_vm._q(_vm.computedValue,_vm.trueValue)},on:{"click":function($event){$event.stopPropagation();},"change":function($event){var $$a=_vm.computedValue,$$el=$event.target,$$c=$$el.checked?(_vm.trueValue):(_vm.falseValue);if(Array.isArray($$a)){var $$v=_vm.nativeValue,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.computedValue=$$a.concat([$$v]));}else {$$i>-1&&(_vm.computedValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else {_vm.computedValue=$$c;}}}}),_c('span',{class:_vm.labelClasses},[_vm._t("default")],2)])};
    var __vue_staticRenderFns__$4 = [];

      /* style */
      const __vue_inject_styles__$4 = undefined;
      /* scoped */
      const __vue_scope_id__$4 = undefined;
      /* module identifier */
      const __vue_module_identifier__$4 = undefined;
      /* functional template */
      const __vue_is_functional_template__$4 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$4 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
        __vue_inject_styles__$4,
        __vue_script__$4,
        __vue_scope_id__$4,
        __vue_is_functional_template__$4,
        __vue_module_identifier__$4,
        false,
        undefined,
        undefined,
        undefined
      );

    const Plugin$3 = {
      install(Vue) {
        registerComponent(Vue, __vue_component__$4);
      }

    };
    use(Plugin$3);

    /**
     * An easy way to toggle what you want
     * @displayName Collapse
     * @example ./examples/Collapse.md
     * @style _collapse.scss
     */

    var script$5 = {
      name: 'OCollapse',
      mixins: [BaseComponentMixin],
      configField: 'collapse',
      props: {
        /**
         * Whether collapse is open or not, use the .sync modifier (Vue 2.x) or v-model:open (Vue 3.x) to make it two-way binding
         */
        open: {
          type: Boolean,
          default: true
        },

        /**
         * Custom animation (transition name)
         */
        animation: {
          type: String,
          default: () => {
            return getValueByPath(config, 'collapse.animation', 'fade');
          }
        },
        ariaId: {
          type: String,
          default: ''
        },

        /**
         * Trigger position
         * @values top, bottom
         */
        position: {
          type: String,
          default: 'top',

          validator(value) {
            return ['top', 'bottom'].indexOf(value) > -1;
          }

        },
        rootClass: [String, Function, Array],
        triggerClass: [String, Function, Array],
        contentClass: [String, Function, Array]
      },

      data() {
        return {
          isOpen: this.open
        };
      },

      watch: {
        open(value) {
          this.isOpen = value;
        }

      },
      methods: {
        /**
        * Toggle and emit events
        */
        toggle() {
          this.isOpen = !this.isOpen;
          this.$emit('update:open', this.isOpen);
          this.$emit(this.isOpen ? 'open' : 'close');
        }

      },

      render(h) {
        const trigger = h('div', {
          staticClass: this.computedClass('triggerClass', 'o-clps__trigger'),
          on: {
            click: this.toggle
          }
        }, this.$scopedSlots.trigger ? this.$scopedSlots.trigger({
          open: this.isOpen
        }) : this.$slots.trigger);
        const content = h('transition', {
          props: {
            name: this.animation
          }
        }, [h('div', {
          staticClass: this.computedClass('contentClass', 'o-clps__content'),
          attrs: {
            'id': this.ariaId,
            'aria-expanded': this.isOpen
          },
          directives: [{
            name: 'show',
            value: this.isOpen
          }]
        }, this.$slots.default)]);
        return h('div', {
          staticClass: this.computedClass('rootClass', 'o-clps')
        }, this.position === 'top' ? [trigger, content] : [content, trigger]);
      }

    };

    /* script */
    const __vue_script__$5 = script$5;

    /* template */

      /* style */
      const __vue_inject_styles__$5 = undefined;
      /* scoped */
      const __vue_scope_id__$5 = undefined;
      /* module identifier */
      const __vue_module_identifier__$5 = undefined;
      /* functional template */
      const __vue_is_functional_template__$5 = undefined;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$5 = /*#__PURE__*/normalizeComponent(
        {},
        __vue_inject_styles__$5,
        __vue_script__$5,
        __vue_scope_id__$5,
        __vue_is_functional_template__$5,
        __vue_module_identifier__$5,
        false,
        undefined,
        undefined,
        undefined
      );

    const Plugin$4 = {
      install(Vue) {
        registerComponent(Vue, __vue_component__$5);
      }

    };
    use(Plugin$4);

    var MatchMediaMixin = {
      props: {
        /**
         * Mobile breakpoint as max-width value
         */
        mobileBreakpoint: String
      },

      data() {
        return {
          $matchMediaRef: undefined,
          isMatchMedia: undefined
        };
      },

      methods: {
        onMatchMedia(event) {
          this.isMatchMedia = event.matches;
        }

      },

      created() {
        if (typeof window !== 'undefined') {
          let width = this.mobileBreakpoint;

          if (!width) {
            const defaultWidth = getValueByPath(config, `mobileBreakpoint`, '1023px');
            width = getValueByPath(config, `${this.$options.configField}.mobileBreakpoint`, defaultWidth);
          }

          this.$matchMediaRef = window.matchMedia(`(max-width: ${width})`);
          this.isMatchMedia = this.$matchMediaRef.matches;
          this.$matchMediaRef.addListener(this.onMatchMedia, false);
        }
      },

      beforeDestroy() {
        if (typeof window !== 'undefined') {
          this.$matchMediaRef.removeListener(this.checkMatchMedia);
        }
      }

    };

    const findFocusable = (element, programmatic = false) => {
      if (!element) {
        return null;
      }

      if (programmatic) {
        return element.querySelectorAll(`*[tabindex="-1"]`);
      }

      return element.querySelectorAll(`a[href]:not([tabindex="-1"]),
                                     area[href],
                                     input:not([disabled]),
                                     select:not([disabled]),
                                     textarea:not([disabled]),
                                     button:not([disabled]),
                                     iframe,
                                     object,
                                     embed,
                                     *[tabindex]:not([tabindex="-1"]),
                                     *[contenteditable]`);
    };

    let onKeyDown;

    const bind = (el, {
      value = true
    }) => {
      if (value) {
        let focusable = findFocusable(el);
        let focusableProg = findFocusable(el, true);

        if (focusable && focusable.length > 0) {
          onKeyDown = event => {
            // Need to get focusable each time since it can change between key events
            // ex. changing month in a datepicker
            focusable = findFocusable(el);
            focusableProg = findFocusable(el, true);
            const firstFocusable = focusable[0];
            const lastFocusable = focusable[focusable.length - 1];

            if (event.target === firstFocusable && event.shiftKey && event.key === 'Tab') {
              event.preventDefault();
              lastFocusable.focus();
            } else if ((event.target === lastFocusable || Array.from(focusableProg).indexOf(event.target) >= 0) && !event.shiftKey && event.key === 'Tab') {
              event.preventDefault();
              firstFocusable.focus();
            }
          };

          el.addEventListener('keydown', onKeyDown);
        }
      }
    };

    const unbind = el => {
      el.removeEventListener('keydown', onKeyDown);
    };

    const directive = {
      bind,
      unbind
    };

    //
    /**
     * Dropdowns are very versatile, can used as a quick menu or even like a select for discoverable content
     * @displayName Dropdown
     * @requires ./DropdownItem.vue
     * @example ./examples/Dropdown.md
     * @style _dropdown.scss
     */

    var script$6 = {
      name: 'ODropdown',
      directives: {
        trapFocus: directive
      },
      configField: 'dropdown',
      mixins: [BaseComponentMixin, MatchMediaMixin],

      provide() {
        return {
          $dropdown: this
        };
      },

      props: {
        /** @model */
        value: {
          type: [String, Number, Boolean, Object, Array],
          default: null
        },

        /**
         * Dropdown disabled
         */
        disabled: Boolean,

        /**
         * Dropdown content (items) are shown inline, trigger is removed
         */
        inline: Boolean,

        /**
         * Dropdown content will be scrollable
         */
        scrollable: Boolean,

        /**
         * Max height of dropdown content
         */
        maxHeight: {
          type: [String, Number],
          default: () => {
            return getValueByPath(config, 'dropdown.maxHeight', 200);
          }
        },

        /**
         * Optional, position of the dropdown relative to the trigger
         * @values top-right, top-left, bottom-left
         */
        position: {
          type: String,

          validator(value) {
            return ['top-right', 'top-left', 'bottom-left', 'bottom-right'].indexOf(value) > -1;
          }

        },

        /**
         * Dropdown content (items) are shown into a modal on mobile
         */
        mobileModal: {
          type: Boolean,
          default: () => {
            return getValueByPath(config, 'dropdown.mobileModal', true);
          }
        },

        /**
         * Role attribute to be passed to list container for better accessibility. Use menu only in situations where your dropdown is related to navigation menus
         * @values list, menu, dialog
         */
        ariaRole: {
          type: String,

          validator(value) {
            return ['menu', 'list', 'dialog'].indexOf(value) > -1;
          },

          default: null
        },

        /**
         * Custom animation (transition name)
         */
        animation: {
          type: String,
          default: () => {
            return getValueByPath(config, 'dropdown.animation', 'fade');
          }
        },

        /**
         * Allows multiple selections
         */
        multiple: Boolean,

        /**
         * Trap focus inside the dropdown.
         */
        trapFocus: {
          type: Boolean,
          default: () => {
            return getValueByPath(config, 'dropdown.trapFocus', true);
          }
        },

        /**
         * Close dropdown when content is clicked
         */
        closeOnClick: {
          type: Boolean,
          default: true
        },

        /**
         * Can close dropdown by pressing escape or by clicking outside
         * @values escape, outside
         */
        canClose: {
          type: [Array, Boolean],
          default: true
        },

        /**
         * Dropdown will be expanded (full-width)
         */
        expanded: Boolean,

        /**
         * Dropdown will be triggered by any events
         * @values click, hover, contextmenu, focus
         */
        triggers: {
          type: Array,
          default: () => ['click']
        },

        /**
         * Append dropdown content to body
         */
        appendToBody: Boolean,
        appendToBodyCopyParent: Boolean,
        rootClass: [String, Function, Array],
        triggerClass: [String, Function, Array],
        inlineClass: [String, Function, Array],
        menuMobileOverlayClass: [String, Function, Array],
        menuClass: [String, Function, Array],
        menuPositionClass: [String, Function, Array],
        menuActiveClass: [String, Function, Array],
        mobileClass: [String, Function, Array],
        disabledClass: [String, Function, Array],
        expandedClass: [String, Function, Array]
      },

      data() {
        return {
          selected: this.value,
          isActive: false,
          isHoverable: false,
          bodyEl: undefined // Used to append to body

        };
      },

      computed: {
        rootClasses() {
          return [this.computedClass('rootClass', 'o-drop'), {
            [this.computedClass('disabledClass', 'o-drop--disabled')]: this.disabled
          }, {
            [this.computedClass('expandedClass', 'o-drop--expanded')]: this.expanded
          }, {
            [this.computedClass('inlineClass', 'o-drop--inline')]: this.inline
          }, {
            [this.computedClass('mobileClass', 'o-drop--mobile')]: this.isMobileModal && this.isMatchMedia
          }];
        },

        triggerClasses() {
          return [this.computedClass('triggerClass', 'o-drop__trigger')];
        },

        menuMobileOverlayClasses() {
          return [this.computedClass('menuMobileOverlayClass', 'o-drop__overlay')];
        },

        menuClasses() {
          return [this.computedClass('menuClass', 'o-drop__menu'), {
            [this.computedClass('menuPositionClass', 'o-drop__menu--', this.position)]: this.position
          }, {
            [this.computedClass('menuActiveClass', 'o-drop__menu--active')]: this.isActive || this.inline
          }];
        },

        isMobileModal() {
          return this.mobileModal && !this.inline;
        },

        cancelOptions() {
          return typeof this.canClose === 'boolean' ? this.canClose ? ['escape', 'outside'] : [] : this.canClose;
        },

        menuStyle() {
          return {
            maxHeight: this.scrollable ? toCssDimension(this.maxHeight) : null,
            overflow: this.scrollable ? 'auto' : null
          };
        },

        hoverable() {
          return this.triggers.indexOf('hover') >= 0;
        }

      },
      watch: {
        /**
        * When v-model is changed set the new selected item.
        */
        value(value) {
          this.selected = value;
        },

        /**
        * Emit event when isActive value is changed.
        */
        isActive(value) {
          this.$emit('active-change', value);

          if (this.appendToBody) {
            this.$nextTick(() => {
              this.updateAppendToBody();
            });
          }
        }

      },
      methods: {
        /**
         * Click listener from DropdownItem.
         *   1. Set new selected item.
         *   2. Emit input event to update the user v-model.
         *   3. Close the dropdown.
         */
        selectItem(value) {
          if (this.multiple) {
            if (this.selected) {
              if (this.selected.indexOf(value) === -1) {
                // Add value
                this.selected = [...this.selected, value];
              } else {
                // Remove value
                this.selected = this.selected.filter(val => val !== value);
              }
            } else {
              this.selected = [value];
            }

            this.$emit('change', this.selected);
          } else {
            if (this.selected !== value) {
              this.selected = value;
              this.$emit('change', this.selected);
            }
          }

          this.$emit('input', this.selected);

          if (!this.multiple) {
            this.isActive = !this.closeOnClick;

            if (this.hoverable && this.closeOnClick) {
              this.isHoverable = false;
            }
          }
        },

        /**
        * White-listed items to not close when clicked.
        */
        isInWhiteList(el) {
          if (el === this.$refs.dropdownMenu) return true;
          if (el === this.$refs.trigger) return true; // All chidren from dropdown

          if (this.$refs.dropdownMenu !== undefined) {
            const children = this.$refs.dropdownMenu.querySelectorAll('*');

            for (const child of children) {
              if (el === child) {
                return true;
              }
            }
          } // All children from trigger


          if (this.$refs.trigger !== undefined) {
            const children = this.$refs.trigger.querySelectorAll('*');

            for (const child of children) {
              if (el === child) {
                return true;
              }
            }
          }

          return false;
        },

        /**
        * Close dropdown if clicked outside.
        */
        clickedOutside(event) {
          if (this.cancelOptions.indexOf('outside') < 0) return;
          if (this.inline) return;
          if (!this.isInWhiteList(event.target)) this.isActive = false;
        },

        /**
         * Keypress event that is bound to the document
         */
        keyPress({
          key
        }) {
          if (this.isActive && (key === 'Escape' || key === 'Esc')) {
            if (this.cancelOptions.indexOf('escape') < 0) return;
            this.isActive = false;
          }
        },

        onClick() {
          if (this.triggers.indexOf('click') < 0) return;
          this.toggle();
        },

        onContextMenu() {
          if (this.triggers.indexOf('contextmenu') < 0) return;
          this.toggle();
        },

        onHover() {
          if (this.triggers.indexOf('hover') < 0) return;
          this.isHoverable = true;
        },

        onFocus() {
          if (this.triggers.indexOf('focus') < 0) return;
          this.toggle();
        },

        /**
        * Toggle dropdown if it's not disabled.
        */
        toggle() {
          if (this.disabled) return;

          if (!this.isActive) {
            // if not active, toggle after clickOutside event
            // this fixes toggling programmatic
            this.$nextTick(() => {
              const value = !this.isActive;
              this.isActive = value; // Vue 2.6.x ???

              setTimeout(() => this.isActive = value);
            });
          } else {
            this.isActive = !this.isActive;
          }
        },

        updateAppendToBody() {
          const dropdownMenu = this.$refs.dropdownMenu;
          const trigger = this.$refs.trigger;

          if (dropdownMenu && trigger) {
            // update wrapper dropdown
            const dropdown = this.$data.bodyEl.children[0];
            dropdown.classList.forEach(item => dropdown.classList.remove(item));
            this.rootClasses.forEach(item => {
              if (item) {
                if (typeof item === 'object') {
                  Object.keys(item).filter(key => item[key]).forEach(key => dropdown.classList.add(key));
                } else {
                  dropdown.classList.add(item);
                }
              }
            });

            if (this.appendToBodyCopyParent) {
              const parentNode = this.$refs.dropdown.parentNode;
              const parent = this.$data.bodyEl;
              parent.classList.forEach(item => parent.classList.remove(item));
              parentNode.classList.forEach(item => parent.classList.add(item));
            }

            const rect = trigger.getBoundingClientRect();
            let top = rect.top + window.scrollY;
            let left = rect.left + window.scrollX;

            if (!this.position || this.position.indexOf('bottom') >= 0) {
              top += trigger.clientHeight;
            } else {
              top -= dropdownMenu.clientHeight;
            }

            if (this.position && this.position.indexOf('left') >= 0) {
              left -= dropdownMenu.clientWidth - trigger.clientWidth;
            }

            dropdownMenu.style.position = 'absolute';
            dropdownMenu.style.top = `${top}px`;
            dropdownMenu.style.left = `${left}px`;
            dropdownMenu.style.zIndex = '9999';
          }
        }

      },

      mounted() {
        if (this.appendToBody) {
          this.$data.bodyEl = createAbsoluteElement(this.$refs.dropdownMenu);
          this.updateAppendToBody();
        }
      },

      created() {
        if (typeof window !== 'undefined') {
          document.addEventListener('click', this.clickedOutside);
          document.addEventListener('keyup', this.keyPress);
        }
      },

      beforeDestroy() {
        if (typeof window !== 'undefined') {
          document.removeEventListener('click', this.clickedOutside);
          document.removeEventListener('keyup', this.keyPress);
        }

        if (this.appendToBody) {
          removeElement(this.$data.bodyEl);
        }
      }

    };

    /* script */
    const __vue_script__$6 = script$6;

    /* template */
    var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"dropdown",class:_vm.rootClasses},[(!_vm.inline)?_c('div',{ref:"trigger",class:_vm.triggerClasses,attrs:{"role":"button","aria-haspopup":"true"},on:{"click":_vm.onClick,"contextmenu":function($event){$event.preventDefault();return _vm.onContextMenu($event)},"mouseenter":_vm.onHover,"mouseleave":function($event){_vm.isHoverable = false;},"!focus":function($event){return _vm.onFocus($event)}}},[_vm._t("trigger",null,{"active":_vm.isActive})],2):_vm._e(),_c('transition',{attrs:{"name":_vm.animation}},[(_vm.isMobileModal)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"}],class:_vm.menuMobileOverlayClasses,attrs:{"aria-hidden":!_vm.isActive}}):_vm._e()]),_c('transition',{attrs:{"name":_vm.animation}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:((!_vm.disabled && (_vm.isActive || _vm.isHoverable)) || _vm.inline),expression:"(!disabled && (isActive || isHoverable)) || inline"},{name:"trap-focus",rawName:"v-trap-focus",value:(_vm.trapFocus),expression:"trapFocus"}],ref:"dropdownMenu",class:_vm.menuClasses,style:(_vm.menuStyle),attrs:{"aria-hidden":!_vm.isActive,"role":_vm.ariaRole},on:{"mouseenter":_vm.onHover,"mouseleave":function($event){_vm.isHoverable = false;}}},[_vm._t("default")],2)])],1)};
    var __vue_staticRenderFns__$5 = [];

      /* style */
      const __vue_inject_styles__$6 = undefined;
      /* scoped */
      const __vue_scope_id__$6 = undefined;
      /* module identifier */
      const __vue_module_identifier__$6 = undefined;
      /* functional template */
      const __vue_is_functional_template__$6 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$6 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
        __vue_inject_styles__$6,
        __vue_script__$6,
        __vue_scope_id__$6,
        __vue_is_functional_template__$6,
        __vue_module_identifier__$6,
        false,
        undefined,
        undefined,
        undefined
      );

    //
    /**
     * @displayName Dropdown Item
     */

    var script$7 = {
      name: 'ODropdownItem',
      mixins: [BaseComponentMixin],
      configField: 'dropdown',
      inject: ["$dropdown"],
      props: {
        /**
         * The value that will be returned on events and v-model
         */
        value: {
          type: [String, Number, Boolean, Object, Array],
          default: null
        },

        /**
         * Item is disabled
         */
        disabled: Boolean,

        /**
         * Item is clickable and emit an event
         */
        clickable: {
          type: Boolean,
          default: true
        },
        tabindex: {
          type: [Number, String],
          default: 0
        },
        ariaRole: {
          type: String,
          default: ''
        },
        itemClass: [String, Function, Array],
        itemActiveClass: [String, Function, Array],
        itemDisabledClass: [String, Function, Array]
      },
      computed: {
        parent() {
          return this.$dropdown;
        },

        rootClasses() {
          return [this.computedClass('itemClass', 'o-drop__item'), {
            [this.computedClass('itemDisabledClass', 'o-drop__item--disabled')]: this.parent.disabled || this.disabled
          }, {
            [this.computedClass('itemActiveClass', 'o-drop__item--active')]: this.isActive
          }];
        },

        ariaRoleItem() {
          return this.ariaRole === 'menuitem' || this.ariaRole === 'listitem' ? this.ariaRole : null;
        },

        isClickable() {
          return !this.parent.disabled && !this.disabled && this.clickable;
        },

        isActive() {
          if (this.parent.selected === null) return false;
          if (this.parent.multiple) return this.parent.selected.indexOf(this.value) >= 0;
          return this.value === this.parent.selected;
        }

      },
      methods: {
        /**
        * Click listener, select the item.
        */
        selectItem() {
          if (!this.isClickable) return;
          this.parent.selectItem(this.value);
          this.$emit('click');
        }

      },

      created() {
        if (!this.parent) {
          throw new Error('You should wrap oDropdownItem on a oDropdown');
        }
      }

    };

    /* script */
    const __vue_script__$7 = script$7;

    /* template */
    var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{tag:"component",class:_vm.rootClasses,attrs:{"role":_vm.ariaRoleItem,"tabindex":_vm.tabindex},on:{"click":_vm.selectItem}},[_vm._t("default")],2)};
    var __vue_staticRenderFns__$6 = [];

      /* style */
      const __vue_inject_styles__$7 = undefined;
      /* scoped */
      const __vue_scope_id__$7 = undefined;
      /* module identifier */
      const __vue_module_identifier__$7 = undefined;
      /* functional template */
      const __vue_is_functional_template__$7 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$7 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
        __vue_inject_styles__$7,
        __vue_script__$7,
        __vue_scope_id__$7,
        __vue_is_functional_template__$7,
        __vue_module_identifier__$7,
        false,
        undefined,
        undefined,
        undefined
      );

    var script$8 = {
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
    const __vue_script__$8 = script$8;

    /* template */

      /* style */
      const __vue_inject_styles__$8 = undefined;
      /* scoped */
      const __vue_scope_id__$8 = undefined;
      /* module identifier */
      const __vue_module_identifier__$8 = undefined;
      /* functional template */
      const __vue_is_functional_template__$8 = undefined;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$8 = /*#__PURE__*/normalizeComponent(
        {},
        __vue_inject_styles__$8,
        __vue_script__$8,
        __vue_scope_id__$8,
        __vue_is_functional_template__$8,
        __vue_module_identifier__$8,
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

    var script$9 = {
      name: 'OField',
      components: {
        [__vue_component__$8.name]: __vue_component__$8
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
    const __vue_script__$9 = script$9;

    /* template */
    var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClasses},[(_vm.horizontal)?_c('div',{class:_vm.labelHorizontalClasses},[(_vm.hasLabel)?_c('label',{class:_vm.labelClasses,attrs:{"for":_vm.labelFor}},[(_vm.hasLabelSlot)?_vm._t("label"):[_vm._v(_vm._s(_vm.label))]],2):_vm._e()]):[(_vm.hasLabel)?_c('label',{class:_vm.labelClasses,attrs:{"for":_vm.labelFor}},[(_vm.hasLabelSlot)?_vm._t("label"):[_vm._v(_vm._s(_vm.label))]],2):_vm._e()],(_vm.horizontal)?_c('o-field-body',[_vm._t("default")],2):(_vm.hasInnerField)?_c('div',{class:_vm.bodyClasses},[_c('o-field',{class:_vm.innerFieldClasses,attrs:{"addons":false,"variant":_vm.newVariant}},[_vm._t("default")],2)],1):[_vm._t("default")],(_vm.hasMessage && !_vm.horizontal)?_c('p',{class:_vm.messageClasses},[(_vm.hasMessageSlot)?_vm._t("message"):[_vm._v(_vm._s(_vm.message))]],2):_vm._e()],2)};
    var __vue_staticRenderFns__$7 = [];

      /* style */
      const __vue_inject_styles__$9 = undefined;
      /* scoped */
      const __vue_scope_id__$9 = undefined;
      /* module identifier */
      const __vue_module_identifier__$9 = undefined;
      /* functional template */
      const __vue_is_functional_template__$9 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$9 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
        __vue_inject_styles__$9,
        __vue_script__$9,
        __vue_scope_id__$9,
        __vue_is_functional_template__$9,
        __vue_module_identifier__$9,
        false,
        undefined,
        undefined,
        undefined
      );

    //
    /**
     * Select an item in a dropdown list. Use with Field to access all functionalities
     * @displayName Select
     * @example ./examples/Select.md
     * @style _select.scss
     */

    var script$a = {
      name: 'OSelect',
      components: {
        [__vue_component__.name]: __vue_component__
      },
      mixins: [BaseComponentMixin, FormElementMixin],
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
        iconRight: {
          type: String,
          default: () => {
            return getValueByPath(config, 'select.iconRight', 'caret-down');
          }
        },

        /** Text when nothing is selected */
        placeholder: String,
        multiple: Boolean,

        /** Same as native size */
        nativeSize: [String, Number],
        rootClass: [String, Function, Array],
        iconLeftSpaceClass: [String, Function, Array],
        iconRightSpaceClass: [String, Function, Array],
        roundedClass: [String, Function, Array],
        multipleClass: [String, Function, Array],
        expandedClass: [String, Function, Array],
        iconLeftClass: [String, Function, Array],
        iconRightClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        variantClass: [String, Function, Array],
        placeholderClass: [String, Function, Array]
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
    const __vue_script__$a = script$a;

    /* template */
    var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClasses},[_c('select',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"select",class:_vm.selectClasses,attrs:{"multiple":_vm.multiple,"size":_vm.nativeSize},on:{"blur":function($event){_vm.$emit('blur', $event) && _vm.checkHtml5Validity();},"focus":function($event){return _vm.$emit('focus', $event)},"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.computedValue=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},'select',_vm.$attrs,false),[(_vm.placeholder)?[(_vm.placeholderVisible)?_c('option',{class:_vm.placeholderClasses,attrs:{"disabled":"","hidden":""},domProps:{"value":null}},[_vm._v(" "+_vm._s(_vm.placeholder)+" ")]):_vm._e()]:_vm._e(),_vm._t("default")],2),(_vm.icon)?_c('o-icon',{class:_vm.iconLeftClasses,attrs:{"icon":_vm.icon,"pack":_vm.iconPack,"size":_vm.size}}):_vm._e(),(_vm.iconRight && !_vm.multiple)?_c('o-icon',{class:_vm.iconRightClasses,attrs:{"icon":_vm.iconRight,"pack":_vm.iconPack,"size":_vm.size,"both":""}}):_vm._e()],1)};
    var __vue_staticRenderFns__$8 = [];

      /* style */
      const __vue_inject_styles__$a = undefined;
      /* scoped */
      const __vue_scope_id__$a = undefined;
      /* module identifier */
      const __vue_module_identifier__$a = undefined;
      /* functional template */
      const __vue_is_functional_template__$a = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$a = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
        __vue_inject_styles__$a,
        __vue_script__$a,
        __vue_scope_id__$a,
        __vue_is_functional_template__$a,
        __vue_module_identifier__$a,
        false,
        undefined,
        undefined,
        undefined
      );

    //
    var script$b = {
      name: 'ODatepickerTableRow',
      mixins: [BaseComponentMixin],
      configField: 'datepicker',
      inject: {
        $datepicker: {
          name: '$datepicker',
          default: false
        }
      },
      props: {
        selectedDate: {
          type: [Date, Array]
        },
        hoveredDateRange: Array,
        day: {
          type: Number
        },
        week: {
          type: Array,
          required: true
        },
        month: {
          type: Number,
          required: true
        },
        showWeekNumber: Boolean,
        minDate: Date,
        maxDate: Date,
        disabled: Boolean,
        unselectableDates: Array,
        unselectableDaysOfWeek: Array,
        selectableDates: Array,
        events: Array,
        indicators: String,
        dateCreator: Function,
        nearbyMonthDays: Boolean,
        nearbySelectableMonthDays: Boolean,
        weekNumberClickable: Boolean,
        range: Boolean,
        multiple: Boolean,
        rulesForFirstWeek: Number,
        firstDayOfWeek: Number,
        tableRowClass: [String, Function, Array],
        tableCellClass: [String, Function, Array],
        tableCellSelectedClass: [String, Function, Array],
        tableCellFirstSelectedClass: [String, Function, Array],
        tableCellWithinSelectedClass: [String, Function, Array],
        tableCellLastSelectedClass: [String, Function, Array],
        tableCellFirstHoveredClass: [String, Function, Array],
        tableCellInvisibleClass: [String, Function, Array],
        tableCellWithinHoveredClass: [String, Function, Array],
        tableCellLastHoveredClass: [String, Function, Array],
        tableCellTodayClass: [String, Function, Array],
        tableCellSelectableClass: [String, Function, Array],
        tableCellUnselectableClass: [String, Function, Array],
        tableCellNearbyClass: [String, Function, Array],
        tableCellEventsClass: [String, Function, Array],
        tableEventClass: [String, Function, Array],
        tableEventIndicatorsClass: [String, Function, Array],
        tableEventsClass: [String, Function, Array],
        tableEventVariantClass: [String, Function, Array]
      },
      computed: {
        tableRowClasses() {
          return [this.computedClass('tableRowClass', 'o-dpck__table__row')];
        },

        tableCellClasses() {
          return [this.computedClass('tableCellClass', 'o-dpck__table__cell')];
        },

        tableEventsClasses() {
          return [this.computedClass('tableEventsClass', 'o-dpck__table__events')];
        },

        hasEvents() {
          return this.events && this.events.length;
        }

      },
      watch: {
        day(day) {
          const refName = `day-${this.month}-${day}`;
          this.$nextTick(() => {
            if (this.$refs[refName] && this.$refs[refName].length > 0) {
              if (this.$refs[refName][0]) {
                this.$refs[refName][0].focus();
              }
            }
          }); // $nextTick needed when month is changed
        }

      },
      methods: {
        firstWeekOffset(year, dow, doy) {
          // first-week day -- which january is always in the first week (4 for iso, 1 for other)
          const fwd = 7 + dow - doy; // first-week day local weekday -- which local weekday is fwd

          const firstJanuary = new Date(year, 0, fwd);
          const fwdlw = (7 + firstJanuary.getDay() - dow) % 7;
          return -fwdlw + fwd - 1;
        },

        daysInYear(year) {
          return this.isLeapYear(year) ? 366 : 365;
        },

        isLeapYear(year) {
          return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        },

        getSetDayOfYear(input) {
          return Math.round((input - new Date(input.getFullYear(), 0, 1)) / 864e5) + 1;
        },

        weeksInYear(year, dow, doy) {
          const weekOffset = this.firstWeekOffset(year, dow, doy);
          const weekOffsetNext = this.firstWeekOffset(year + 1, dow, doy);
          return (this.daysInYear(year) - weekOffset + weekOffsetNext) / 7;
        },

        getWeekNumber(mom) {
          const dow = this.firstDayOfWeek; // first day of week
          // Rules for the first week : 1 for the 1st January, 4 for the 4th January

          const doy = this.rulesForFirstWeek;
          const weekOffset = this.firstWeekOffset(mom.getFullYear(), dow, doy);
          const week = Math.floor((this.getSetDayOfYear(mom) - weekOffset - 1) / 7) + 1;
          let resWeek;
          let resYear;

          if (week < 1) {
            resYear = mom.getFullYear() - 1;
            resWeek = week + this.weeksInYear(resYear, dow, doy);
          } else if (week > this.weeksInYear(mom.getFullYear(), dow, doy)) {
            resWeek = week - this.weeksInYear(mom.getFullYear(), dow, doy);
            resYear = mom.getFullYear() + 1;
          } else {
            resYear = mom.getFullYear();
            resWeek = week;
          }

          return resWeek;
        },

        clickWeekNumber(week) {
          if (this.weekNumberClickable) {
            this.$datepicker.$emit('week-number-click', week);
          }
        },

        /*
         * Check that selected day is within earliest/latest params and
         * is within this month
         */
        selectableDate(day) {
          const validity = [];

          if (this.minDate) {
            validity.push(day >= this.minDate);
          }

          if (this.maxDate) {
            validity.push(day <= this.maxDate);
          }

          if (this.nearbyMonthDays && !this.nearbySelectableMonthDays) {
            validity.push(day.getMonth() === this.month);
          }

          if (this.selectableDates) {
            for (let i = 0; i < this.selectableDates.length; i++) {
              const enabledDate = this.selectableDates[i];

              if (day.getDate() === enabledDate.getDate() && day.getFullYear() === enabledDate.getFullYear() && day.getMonth() === enabledDate.getMonth()) {
                return true;
              } else {
                validity.push(false);
              }
            }
          }

          if (this.unselectableDates) {
            for (let i = 0; i < this.unselectableDates.length; i++) {
              const disabledDate = this.unselectableDates[i];
              validity.push(day.getDate() !== disabledDate.getDate() || day.getFullYear() !== disabledDate.getFullYear() || day.getMonth() !== disabledDate.getMonth());
            }
          }

          if (this.unselectableDaysOfWeek) {
            for (let i = 0; i < this.unselectableDaysOfWeek.length; i++) {
              const dayOfWeek = this.unselectableDaysOfWeek[i];
              validity.push(day.getDay() !== dayOfWeek);
            }
          }

          return validity.indexOf(false) < 0;
        },

        /*
        * Emit select event with chosen date as payload
        */
        emitChosenDate(day) {
          if (this.disabled) return;

          if (this.selectableDate(day)) {
            this.$emit('select', day);
          }
        },

        eventsDateMatch(day) {
          if (!this.events || !this.events.length) return false;
          const dayEvents = [];

          for (let i = 0; i < this.events.length; i++) {
            if (this.events[i].date.getDay() === day.getDay()) {
              dayEvents.push(this.events[i]);
            }
          }

          if (!dayEvents.length) {
            return false;
          }

          return dayEvents;
        },

        /*
        * Build cellClasses for cell using validations
        */
        cellClasses(day) {
          function dateMatch(dateOne, dateTwo, multiple) {
            // if either date is null or undefined, return false
            // if using multiple flag, return false
            if (!dateOne || !dateTwo || multiple) {
              return false;
            }

            if (Array.isArray(dateTwo)) {
              return dateTwo.some(date => dateOne.getDate() === date.getDate() && dateOne.getFullYear() === date.getFullYear() && dateOne.getMonth() === date.getMonth());
            }

            return dateOne.getDate() === dateTwo.getDate() && dateOne.getFullYear() === dateTwo.getFullYear() && dateOne.getMonth() === dateTwo.getMonth();
          }

          function dateWithin(dateOne, dates, multiple) {
            if (!Array.isArray(dates) || multiple) {
              return false;
            }

            return dateOne > dates[0] && dateOne < dates[1];
          }

          return [...this.tableCellClasses, {
            [this.computedClass('tableCellSelectedClass', 'o-dpck__table__cell--selected')]: dateMatch(day, this.selectedDate) || dateWithin(day, this.selectedDate, this.multiple)
          }, {
            [this.computedClass('tableCellFirstSelectedClass', 'o-dpck__table__cell--first-selected')]: dateMatch(day, Array.isArray(this.selectedDate) && this.selectedDate[0], this.multiple)
          }, {
            [this.computedClass('tableCellWithinSelectedClass', 'o-dpck__table__cell--within-selected')]: dateWithin(day, this.selectedDate, this.multiple)
          }, {
            [this.computedClass('tableCellLastSelectedClass', 'o-dpck__table__cell--last-selected')]: dateMatch(day, Array.isArray(this.selectedDate) && this.selectedDate[1], this.multiple)
          }, {
            [this.computedClass('tableCellFirstHoveredClass', 'o-dpck__table__cell--first-hovered')]: dateMatch(day, Array.isArray(this.hoveredDateRange) && this.hoveredDateRange[0])
          }, {
            [this.computedClass('tableCellWithinHoveredClass', 'o-dpck__table__cell--within-hovered')]: dateWithin(day, this.hoveredDateRange)
          }, {
            [this.computedClass('tableCellLastHoveredClass', 'o-dpck__table__cell--last-hovered')]: dateMatch(day, Array.isArray(this.hoveredDateRange) && this.hoveredDateRange[1])
          }, {
            [this.computedClass('tableCellTodayClass', 'o-dpck__table__cell--today')]: dateMatch(day, this.dateCreator())
          }, {
            [this.computedClass('tableCellSelectableClass', 'o-dpck__table__cell--selectable')]: this.selectableDate(day) && !this.disabled
          }, {
            [this.computedClass('tableCellUnselectableClass', 'o-dpck__table__cell--unselectable')]: !this.selectableDate(day) || this.disabled
          }, {
            [this.computedClass('tableCellInvisibleClass', 'o-dpck__table__cell--invisible')]: !this.nearbyMonthDays && day.getMonth() !== this.month
          }, {
            [this.computedClass('tableCellNearbyClass', 'o-dpck__table__cell--nearby')]: this.nearbySelectableMonthDays && day.getMonth() !== this.month
          }, {
            [this.computedClass('tableCellEventsClass', 'o-dpck__table__cell--events')]: this.hasEvents
          }, {
            [this.computedClass('tableCellTodayClass', 'o-dpck__table__cell--today')]: dateMatch(day, this.dateCreator())
          }];
        },

        eventClasses(event) {
          return [this.computedClass('tableEventClass', 'o-dpck__table__event'), {
            [this.computedClass('tableEventVariantClass', 'o-dpck__table__event--', event.type)]: event.type
          }, {
            [this.computedClass('tableEventIndicatorsClass', 'o-dpck__table__event--', this.indicators)]: this.indicators
          }];
        },

        setRangeHoverEndDate(day) {
          if (this.range) {
            this.$emit('rangeHoverEndDate', day);
          }
        },

        manageKeydown({
          key
        }, weekDay) {
          // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
          switch (key) {
            case ' ':
            case 'Space':
            case 'Spacebar':
            case 'Enter':
              {
                this.emitChosenDate(weekDay);
                break;
              }

            case 'ArrowLeft':
            case 'Left':
              {
                this.changeFocus(weekDay, -1);
                break;
              }

            case 'ArrowRight':
            case 'Right':
              {
                this.changeFocus(weekDay, 1);
                break;
              }

            case 'ArrowUp':
            case 'Up':
              {
                this.changeFocus(weekDay, -7);
                break;
              }

            case 'ArrowDown':
            case 'Down':
              {
                this.changeFocus(weekDay, 7);
                break;
              }
          }
        },

        changeFocus(day, inc) {
          const nextDay = day;
          nextDay.setDate(day.getDate() + inc);

          while ((!this.minDate || nextDay > this.minDate) && (!this.maxDate || nextDay < this.maxDate) && !this.selectableDate(nextDay)) {
            nextDay.setDate(day.getDate() + Math.sign(inc));
          }

          this.$emit('change-focus', nextDay);
        }

      }
    };

    /* script */
    const __vue_script__$b = script$b;

    /* template */
    var __vue_render__$9 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.tableRowClasses},[(_vm.showWeekNumber)?_c('a',{class:_vm.tableCellClasses,style:({'cursor: pointer': _vm.weekNumberClickable }),on:{"click":function($event){$event.preventDefault();_vm.clickWeekNumber(_vm.getWeekNumber(_vm.week[6]));}}},[_c('span',[_vm._v(_vm._s(_vm.getWeekNumber(_vm.week[6])))])]):_vm._e(),_vm._l((_vm.week),function(weekDay,index){return [(_vm.selectableDate(weekDay) && !_vm.disabled)?_c('a',{key:index,ref:("day-" + (weekDay.getMonth()) + "-" + (weekDay.getDate())),refInFor:true,class:_vm.cellClasses(weekDay),attrs:{"role":"button","href":"#","disabled":_vm.disabled,"tabindex":_vm.day === weekDay.getDate() ? null : -1},on:{"click":function($event){$event.preventDefault();return _vm.emitChosenDate(weekDay)},"mouseenter":function($event){return _vm.setRangeHoverEndDate(weekDay)},"keydown":function($event){$event.preventDefault();return _vm.manageKeydown($event, weekDay)}}},[_c('span',[_vm._v(_vm._s(weekDay.getDate()))]),(_vm.eventsDateMatch(weekDay))?_c('div',{class:_vm.tableEventsClasses},_vm._l((_vm.eventsDateMatch(weekDay)),function(event,index){return _c('div',{key:index,class:_vm.eventClasses(event)})}),0):_vm._e()]):_c('div',{key:index,class:_vm.cellClasses(weekDay)},[_c('span',[_vm._v(_vm._s(weekDay.getDate()))])])]})],2)};
    var __vue_staticRenderFns__$9 = [];

      /* style */
      const __vue_inject_styles__$b = undefined;
      /* scoped */
      const __vue_scope_id__$b = undefined;
      /* module identifier */
      const __vue_module_identifier__$b = undefined;
      /* functional template */
      const __vue_is_functional_template__$b = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$b = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
        __vue_inject_styles__$b,
        __vue_script__$b,
        __vue_scope_id__$b,
        __vue_is_functional_template__$b,
        __vue_module_identifier__$b,
        false,
        undefined,
        undefined,
        undefined
      );

    //
    var script$c = {
      name: 'ODatepickerTable',
      mixins: [BaseComponentMixin],
      configField: 'datepicker',
      components: {
        [__vue_component__$b.name]: __vue_component__$b
      },
      props: {
        value: {
          type: [Date, Array]
        },
        dayNames: Array,
        monthNames: Array,
        firstDayOfWeek: Number,
        events: Array,
        indicators: String,
        minDate: Date,
        maxDate: Date,
        focused: Object,
        disabled: Boolean,
        dateCreator: Function,
        unselectableDates: Array,
        unselectableDaysOfWeek: Array,
        selectableDates: Array,
        nearbyMonthDays: Boolean,
        nearbySelectableMonthDays: Boolean,
        showWeekNumber: Boolean,
        weekNumberClickable: Boolean,
        rulesForFirstWeek: Number,
        range: Boolean,
        multiple: Boolean,
        tableClass: [String, Function, Array],
        tableHeadClass: [String, Function, Array],
        tableHeadCellClass: [String, Function, Array],
        tableBodyClass: [String, Function, Array],
        tableRowClass: [String, Function, Array],
        tableCellClass: [String, Function, Array],
        tableCellSelectedClass: [String, Function, Array],
        tableCellFirstSelectedClass: [String, Function, Array],
        tableCellInvisibleClass: [String, Function, Array],
        tableCellWithinSelectedClass: [String, Function, Array],
        tableCellLastSelectedClass: [String, Function, Array],
        tableCellFirstHoveredClass: [String, Function, Array],
        tableCellWithinHoveredClass: [String, Function, Array],
        tableCellLastHoveredClass: [String, Function, Array],
        tableCellTodayClass: [String, Function, Array],
        tableCellSelectableClass: [String, Function, Array],
        tableCellUnselectableClass: [String, Function, Array],
        tableCellNearbyClass: [String, Function, Array],
        tableCellEventsClass: [String, Function, Array],
        tableEventClass: [String, Function, Array],
        tableEventIndicatorsClass: [String, Function, Array],
        tableEventsClass: [String, Function, Array],
        tableEventVariantClass: [String, Function, Array]
      },

      data() {
        return {
          selectedBeginDate: undefined,
          selectedEndDate: undefined,
          hoveredEndDate: undefined,
          multipleSelectedDates: this.multiple && this.value ? this.value : []
        };
      },

      computed: {
        tableClasses() {
          return [this.computedClass('tableClass', 'o-dpck__table')];
        },

        tableHeadClasses() {
          return [this.computedClass('tableHeadClass', 'o-dpck__table__head')];
        },

        tableHeadCellClasses() {
          return [this.computedClass('tableHeadCellClass', 'o-dpck__table__head-cell'), ...this.tableCellClasses];
        },

        tableBodyClasses() {
          return [this.computedClass('tableBodyClass', 'o-dpck__table__body')];
        },

        tableCellClasses() {
          return [this.computedClass('tableCellClass', 'o-dpck__table__cell')];
        },

        visibleDayNames() {
          const visibleDayNames = [];
          let index = this.firstDayOfWeek;

          while (visibleDayNames.length < this.dayNames.length) {
            const currentDayName = this.dayNames[index % this.dayNames.length];
            visibleDayNames.push(currentDayName);
            index++;
          }

          if (this.showWeekNumber) visibleDayNames.unshift('');
          return visibleDayNames;
        },

        /*
        * Return array of all events in the specified month
        */
        eventsInThisMonth() {
          if (!this.events) return [];
          const monthEvents = [];

          for (let i = 0; i < this.events.length; i++) {
            let event = this.events[i];

            if (!Object.prototype.hasOwnProperty.call(event, 'date')) {
              event = {
                date: event
              };
            }

            if (event.date.getMonth() === this.focused.month && event.date.getFullYear() === this.focused.year) {
              monthEvents.push(event);
            }
          }

          return monthEvents;
        },

        /*
        * Return array of all weeks in the specified month
        */
        weeksInThisMonth() {
          this.validateFocusedDay();
          const month = this.focused.month;
          const year = this.focused.year;
          const weeksInThisMonth = [];
          let startingDay = 1;

          while (weeksInThisMonth.length < 6) {
            const newWeek = this.weekBuilder(startingDay, month, year);
            weeksInThisMonth.push(newWeek);
            startingDay += 7;
          }

          return weeksInThisMonth;
        },

        hoveredDateRange() {
          if (!this.range) {
            return [];
          }

          if (!isNaN(this.selectedEndDate)) {
            return [];
          }

          if (this.hoveredEndDate < this.selectedBeginDate) {
            return [this.hoveredEndDate, this.selectedBeginDate].filter(d => d !== undefined);
          }

          return [this.selectedBeginDate, this.hoveredEndDate].filter(d => d !== undefined);
        }

      },
      methods: {
        /*
        * Emit input event with selected date as payload for v-model in parent
        */
        updateSelectedDate(date) {
          if (!this.range && !this.multiple) {
            this.$emit('input', date);
          } else if (this.range) {
            this.handleSelectRangeDate(date);
          } else if (this.multiple) {
            this.handleSelectMultipleDates(date);
          }
        },

        /*
        * If both begin and end dates are set, reset the end date and set the begin date.
        * If only begin date is selected, emit an array of the begin date and the new date.
        * If not set, only set the begin date.
        */
        handleSelectRangeDate(date) {
          if (this.selectedBeginDate && this.selectedEndDate) {
            this.selectedBeginDate = date;
            this.selectedEndDate = undefined;
            this.$emit('range-start', date);
          } else if (this.selectedBeginDate && !this.selectedEndDate) {
            if (this.selectedBeginDate > date) {
              this.selectedEndDate = this.selectedBeginDate;
              this.selectedBeginDate = date;
            } else {
              this.selectedEndDate = date;
            }

            this.$emit('range-end', date);
            this.$emit('input', [this.selectedBeginDate, this.selectedEndDate]);
          } else {
            this.selectedBeginDate = date;
            this.$emit('range-start', date);
          }
        },

        /*
        * If selected date already exists list of selected dates, remove it from the list
        * Otherwise, add date to list of selected dates
        */
        handleSelectMultipleDates(date) {
          const multipleSelect = this.multipleSelectedDates.filter(selectedDate => selectedDate.getDate() === date.getDate() && selectedDate.getFullYear() === date.getFullYear() && selectedDate.getMonth() === date.getMonth());

          if (multipleSelect.length) {
            this.multipleSelectedDates = this.multipleSelectedDates.filter(selectedDate => selectedDate.getDate() !== date.getDate() || selectedDate.getFullYear() !== date.getFullYear() || selectedDate.getMonth() !== date.getMonth());
          } else {
            this.multipleSelectedDates.push(date);
          }

          this.$emit('input', this.multipleSelectedDates);
        },

        /*
         * Return array of all days in the week that the startingDate is within
         */
        weekBuilder(startingDate, month, year) {
          const thisMonth = new Date(year, month);
          const thisWeek = [];
          const dayOfWeek = new Date(year, month, startingDate).getDay();
          const end = dayOfWeek >= this.firstDayOfWeek ? dayOfWeek - this.firstDayOfWeek : 7 - this.firstDayOfWeek + dayOfWeek;
          let daysAgo = 1;

          for (let i = 0; i < end; i++) {
            thisWeek.unshift(new Date(thisMonth.getFullYear(), thisMonth.getMonth(), startingDate - daysAgo));
            daysAgo++;
          }

          thisWeek.push(new Date(year, month, startingDate));
          let daysForward = 1;

          while (thisWeek.length < 7) {
            thisWeek.push(new Date(year, month, startingDate + daysForward));
            daysForward++;
          }

          return thisWeek;
        },

        validateFocusedDay() {
          const focusedDate = new Date(this.focused.year, this.focused.month, this.focused.day);
          if (this.selectableDate(focusedDate)) return;
          let day = 0; // Number of days in the current month

          const monthDays = new Date(this.focused.year, this.focused.month + 1, 0).getDate();
          let firstFocusable = null;

          while (!firstFocusable && ++day < monthDays) {
            const date = new Date(this.focused.year, this.focused.month, day);

            if (this.selectableDate(date)) {
              firstFocusable = focusedDate;
              const focused = {
                day: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear()
              };
              this.$emit('update:focused', focused);
            }
          }
        },

        /*
         * Check that selected day is within earliest/latest params and
         * is within this month
         */
        selectableDate(day) {
          const validity = [];

          if (this.minDate) {
            validity.push(day >= this.minDate);
          }

          if (this.maxDate) {
            validity.push(day <= this.maxDate);
          }

          if (this.nearbyMonthDays && !this.nearbySelectableMonthDays) {
            validity.push(day.getMonth() === this.focused.month);
          }

          if (this.selectableDates) {
            for (let i = 0; i < this.selectableDates.length; i++) {
              const enabledDate = this.selectableDates[i];

              if (day.getDate() === enabledDate.getDate() && day.getFullYear() === enabledDate.getFullYear() && day.getMonth() === enabledDate.getMonth()) {
                return true;
              } else {
                validity.push(false);
              }
            }
          }

          if (this.unselectableDates) {
            for (let i = 0; i < this.unselectableDates.length; i++) {
              const disabledDate = this.unselectableDates[i];
              validity.push(day.getDate() !== disabledDate.getDate() || day.getFullYear() !== disabledDate.getFullYear() || day.getMonth() !== disabledDate.getMonth());
            }
          }

          if (this.unselectableDaysOfWeek) {
            for (let i = 0; i < this.unselectableDaysOfWeek.length; i++) {
              const dayOfWeek = this.unselectableDaysOfWeek[i];
              validity.push(day.getDay() !== dayOfWeek);
            }
          }

          return validity.indexOf(false) < 0;
        },

        eventsInThisWeek(week) {
          return this.eventsInThisMonth.filter(event => {
            const stripped = new Date(Date.parse(event.date));
            stripped.setHours(0, 0, 0, 0);
            const timed = stripped.getTime();
            return week.some(weekDate => weekDate.getTime() === timed);
          });
        },

        setRangeHoverEndDate(day) {
          this.hoveredEndDate = day;
        },

        changeFocus(day) {
          const focused = {
            day: day.getDate(),
            month: day.getMonth(),
            year: day.getFullYear()
          };
          this.$emit('update:focused', focused);
        }

      }
    };

    /* script */
    const __vue_script__$c = script$c;

    /* template */
    var __vue_render__$a = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{class:_vm.tableClasses},[_c('header',{class:_vm.tableHeadClasses},_vm._l((_vm.visibleDayNames),function(day,index){return _c('div',{key:index,class:_vm.tableHeadCellClasses},[_c('span',[_vm._v(_vm._s(day))])])}),0),_c('div',{class:_vm.tableBodyClasses},_vm._l((_vm.weeksInThisMonth),function(week,index){return _c('o-datepicker-table-row',{key:index,attrs:{"selected-date":_vm.value,"day":_vm.focused.day,"week":week,"month":_vm.focused.month,"min-date":_vm.minDate,"max-date":_vm.maxDate,"disabled":_vm.disabled,"unselectable-dates":_vm.unselectableDates,"unselectable-days-of-week":_vm.unselectableDaysOfWeek,"selectable-dates":_vm.selectableDates,"events":_vm.eventsInThisWeek(week),"indicators":_vm.indicators,"date-creator":_vm.dateCreator,"nearby-month-days":_vm.nearbyMonthDays,"nearby-selectable-month-days":_vm.nearbySelectableMonthDays,"show-week-number":_vm.showWeekNumber,"week-number-clickable":_vm.weekNumberClickable,"first-day-of-week":_vm.firstDayOfWeek,"rules-for-first-week":_vm.rulesForFirstWeek,"range":_vm.range,"hovered-date-range":_vm.hoveredDateRange,"multiple":_vm.multiple,"table-row-class":_vm.tableRowClass,"table-cell-class":_vm.tableCellClass,"table-cell-selected-class":_vm.tableCellSelectedClass,"table-cell-first-selected-class":_vm.tableCellFirstSelectedClass,"table-cell-invisible-class":_vm.tableCellInvisibleClass,"table-cell-within-selected-class":_vm.tableCellWithinSelectedClass,"table-cell-last-selected-class":_vm.tableCellLastSelectedClass,"table-cell-first-hovered-class":_vm.tableCellFirstHoveredClass,"table-cell-within-hovered-class":_vm.tableCellWithinHoveredClass,"table-cell-last-hovered-class":_vm.tableCellLastHoveredClass,"table-cell-today-class":_vm.tableCellTodayClass,"table-cell-selectable-class":_vm.tableCellSelectableClass,"table-cell-unselectable-class":_vm.tableCellUnselectableClass,"table-cell-nearby-class":_vm.tableCellNearbyClass,"table-cell-events-class":_vm.tableCellEventsClass,"table-events-class":_vm.tableEventsClass,"table-event-variant-class":_vm.tableEventVariantClass,"table-event-class":_vm.tableEventClass,"table-event-indicators-class":_vm.tableEventIndicatorsClass},on:{"select":_vm.updateSelectedDate,"rangeHoverEndDate":_vm.setRangeHoverEndDate,"change-focus":_vm.changeFocus}})}),1)])};
    var __vue_staticRenderFns__$a = [];

      /* style */
      const __vue_inject_styles__$c = undefined;
      /* scoped */
      const __vue_scope_id__$c = undefined;
      /* module identifier */
      const __vue_module_identifier__$c = undefined;
      /* functional template */
      const __vue_is_functional_template__$c = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$c = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
        __vue_inject_styles__$c,
        __vue_script__$c,
        __vue_scope_id__$c,
        __vue_is_functional_template__$c,
        __vue_module_identifier__$c,
        false,
        undefined,
        undefined,
        undefined
      );

    //

    const defaultDateFormatter = (date, vm) => {
      const targetDates = Array.isArray(date) ? date : [date];
      const dates = targetDates.map(date => {
        const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
        return !vm.isTypeMonth ? vm.dtf.format(d) : vm.dtfMonth.format(d);
      });
      return !vm.multiple ? dates.join(' - ') : dates.join(', ');
    };

    const defaultDateParser = (date, vm) => {
      if (vm.dtf.formatToParts && typeof vm.dtf.formatToParts === 'function') {
        const formatRegex = (vm.isTypeMonth ? vm.dtfMonth : vm.dtf).formatToParts(new Date(2000, 11, 25)).map(part => {
          if (part.type === 'literal') {
            return part.value;
          }

          return `((?!=<${part.type}>)\\d+)`;
        }).join('');
        const dateGroups = matchWithGroups(formatRegex, date); // We do a simple validation for the group.
        // If it is not valid, it will fallback to Date.parse below

        if (dateGroups.year && dateGroups.year.length === 4 && dateGroups.month && dateGroups.month <= 12) {
          if (vm.isTypeMonth) return new Date(dateGroups.year, dateGroups.month - 1);else if (dateGroups.day && dateGroups.day <= 31) {
            return new Date(dateGroups.year, dateGroups.month - 1, dateGroups.day, 12);
          }
        }
      } // Fallback if formatToParts is not supported or if we were not able to parse a valid date


      if (!vm.isTypeMonth) return new Date(Date.parse(date));

      if (date) {
        const s = date.split('/');
        const year = s[0].length === 4 ? s[0] : s[1];
        const month = s[0].length === 2 ? s[0] : s[1];

        if (year && month) {
          return new Date(parseInt(year, 10), parseInt(month - 1, 10), 1, 0, 0, 0, 0);
        }
      }

      return null;
    };
    /**
     * An input with a simple dropdown/modal for selecting a date, uses native datepicker for mobile
     * @displayName Datepicker
     * @example ./examples/Datepicker.md
     */


    var script$d = {
      name: 'ODatepicker',
      components: {
        [__vue_component__$c.name]: __vue_component__$c,
        [__vue_component__$1.name]: __vue_component__$1,
        [__vue_component__$9.name]: __vue_component__$9,
        [__vue_component__$a.name]: __vue_component__$a,
        [__vue_component__.name]: __vue_component__,
        [__vue_component__$6.name]: __vue_component__$6,
        [__vue_component__$7.name]: __vue_component__$7
      },
      configField: 'datepicker',
      mixins: [BaseComponentMixin, FormElementMixin, MatchMediaMixin],
      inheritAttrs: false,

      provide() {
        return {
          $datepicker: this
        };
      },

      props: {
        value: {
          type: [Date, Array]
        },
        dayNames: {
          type: Array,
          default: () => {
            return getValueByPath(config, 'datepicker.dayNames', undefined);
          }
        },
        monthNames: {
          type: Array,
          default: () => {
            return getValueByPath(config, 'datepicker.monthNames', undefined);
          }
        },
        firstDayOfWeek: {
          type: Number,
          default: () => {
            return getValueByPath(config, 'datepicker.firstDayOfWeek', 0);
          }
        },

        /**
         * Size of button, optional
         * @values small, medium, large
         */
        size: String,
        inline: Boolean,
        minDate: Date,
        maxDate: Date,
        focusedDate: Date,
        placeholder: String,
        editable: Boolean,
        disabled: Boolean,
        horizontalTimePicker: Boolean,
        unselectableDates: Array,
        unselectableDaysOfWeek: {
          type: Array,
          default: () => {
            return getValueByPath(config, 'datepicker.unselectableDaysOfWeek', undefined);
          }
        },
        selectableDates: Array,
        dateFormatter: {
          type: Function,
          default: (date, vm) => {
            const dateFormatter = getValueByPath(config, 'datepicker.dateFormatter', undefined);

            if (typeof dateFormatter === 'function') {
              return dateFormatter(date);
            } else {
              return defaultDateFormatter(date, vm);
            }
          }
        },
        dateParser: {
          type: Function,
          default: (date, vm) => {
            const dateParser = getValueByPath(config, 'datepicker.dateParser', undefined);

            if (typeof dateParserr === 'function') {
              return dateParser(date);
            } else {
              return defaultDateParser(date, vm);
            }
          }
        },
        dateCreator: {
          type: Function,
          default: () => {
            const dateCreator = getValueByPath(config, 'datepicker.dateCreator', undefined);

            if (typeof dateCreator === 'function') {
              return dateCreator();
            } else {
              return new Date();
            }
          }
        },
        mobileNative: {
          type: Boolean,
          default: () => {
            return getValueByPath(config, 'datepicker.mobileNative', true);
          }
        },
        position: String,
        iconRight: String,
        events: Array,
        indicators: {
          type: String,
          default: 'dots'
        },
        openOnFocus: Boolean,
        iconPrev: {
          type: String,
          default: () => {
            return getValueByPath(config, 'datepicker.iconPrev', 'chevron-left');
          }
        },
        iconNext: {
          type: String,
          default: () => {
            return getValueByPath(config, 'datepicker.iconNext', 'chevron-right');
          }
        },
        yearsRange: {
          type: Array,
          default: () => {
            return getValueByPath(config, 'datepicker.yearsRange', [-100, 10]);
          }
        },
        type: {
          type: String,
          validator: value => {
            return ['month'].indexOf(value) >= 0;
          }
        },
        nearbyMonthDays: {
          type: Boolean,
          default: () => {
            return getValueByPath(config, 'datepicker.nearbyMonthDays', true);
          }
        },
        nearbySelectableMonthDays: {
          type: Boolean,
          default: () => {
            return getValueByPath(config, 'datepicker.nearbySelectableMonthDays', false);
          }
        },
        showWeekNumber: {
          type: Boolean,
          default: () => {
            return getValueByPath(config, 'datepicker.showWeekNumber', false);
          }
        },
        weekNumberClickable: {
          type: Boolean,
          default: () => {
            return getValueByPath(config, 'datepicker.weekNumberClickable', false);
          }
        },
        rulesForFirstWeek: {
          type: Number,
          default: () => 4
        },
        range: {
          type: Boolean,
          default: false
        },
        closeOnClick: {
          type: Boolean,
          default: true
        },
        multiple: {
          type: Boolean,
          default: false
        },
        mobileModal: {
          type: Boolean,
          default: () => {
            return getValueByPath(config, 'datepicker.mobileModal', true);
          }
        },
        trapFocus: {
          type: Boolean,
          default: () => {
            return getValueByPath(config, 'datepicker.trapFocus', true);
          }
        },
        locale: {
          type: [String, Array],
          default: () => {
            return getValueByPath(config, 'locale');
          }
        },
        appendToBody: Boolean,
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        rootClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        boxClass: [String, Function, Array],
        headerClass: [String, Function, Array],
        headerButtonsClass: [String, Function, Array],
        headerButtonsSizeClass: [String, Function, Array],
        prevBtnClass: [String, Function, Array],
        nextBtnClass: [String, Function, Array],
        listsClass: [String, Function, Array],
        footerClass: [String, Function, Array],
        tableClass: [String, Function, Array],
        tableHeadClass: [String, Function, Array],
        tableHeadCellClass: [String, Function, Array],
        tableBodyClass: [String, Function, Array],
        tableRowClass: [String, Function, Array],
        tableCellClass: [String, Function, Array],
        tableCellSelectedClass: [String, Function, Array],
        tableCellFirstSelectedClass: [String, Function, Array],
        tableCellInvisibleClass: [String, Function, Array],
        tableCellWithinSelectedClass: [String, Function, Array],
        tableCellLastSelectedClass: [String, Function, Array],
        tableCellFirstHoveredClass: [String, Function, Array],
        tableCellWithinHoveredClass: [String, Function, Array],
        tableCellLastHoveredClass: [String, Function, Array],
        tableCellTodayClass: [String, Function, Array],
        tableCellSelectableClass: [String, Function, Array],
        tableCellUnselectableClass: [String, Function, Array],
        tableCellNearbyClass: [String, Function, Array],
        tableCellEventsClass: [String, Function, Array],
        tableEventsClass: [String, Function, Array],
        tableEventVariantClass: [String, Function, Array],
        tableEventClass: [String, Function, Array],
        tableEventIndicatorsClass: [String, Function, Array],
        mobileClass: [String, Function, Array],

        /** Classes to apply on internal input (@see o-input style docs) */
        inputClasses: Object,

        /** Classes to apply on internal dropdown (@see o-dropdown style docs) */
        dropdownClasses: Object
      },

      data() {
        const focusedDate = (Array.isArray(this.value) ? this.value[0] : this.value) || this.focusedDate || this.dateCreator();

        if (!this.value && this.maxDate && this.maxDate.getFullYear() < new Date().getFullYear()) {
          focusedDate.setFullYear(this.maxDate.getFullYear());
        }

        return {
          dateSelected: this.value,
          focusedDateData: {
            day: focusedDate.getDate(),
            month: focusedDate.getMonth(),
            year: focusedDate.getFullYear()
          },
          $elementRef: 'input'
        };
      },

      computed: {
        inputBind() {
          return { ...this.$attrs,
            ...this.inputClasses
          };
        },

        dropdownBind() {
          return { ...this.dropdownClasses
          };
        },

        rootClasses() {
          return [this.computedClass('rootClass', 'o-dpck'), {
            [this.computedClass('sizeClass', 'o-dpck--', this.size)]: this.size
          }, {
            [this.computedClass('mobileClass', 'o-dpck--mobile')]: this.isMatchMedia
          }];
        },

        boxClasses() {
          return [this.computedClass('boxClass', 'o-dpck__box')];
        },

        headerClasses() {
          return [this.computedClass('headerClass', 'o-dpck__header')];
        },

        headerButtonsClasses() {
          return [this.computedClass('headerButtonsClass', 'o-dpck__header__buttons'), {
            [this.computedClass('headerButtonsSizeClass', 'o-dpck__header__buttons--', this.size)]: this.size
          }];
        },

        prevBtnClasses() {
          return [this.computedClass('prevBtnClass', 'o-dpck__header__previous')];
        },

        nextBtnClasses() {
          return [this.computedClass('nextBtnClass', 'o-dpck__header__next')];
        },

        listsClasses() {
          return [this.computedClass('listsClass', 'o-dpck__header__list')];
        },

        footerClasses() {
          return [this.computedClass('footerClass', 'o-dpck__footer')];
        },

        computedValue: {
          get() {
            return this.dateSelected;
          },

          set(value) {
            this.updateInternalState(value);
            if (!this.multiple) this.togglePicker(false);
            this.$emit('input', value);

            if (this.useHtml5Validation) {
              this.$nextTick(() => {
                this.checkHtml5Validity();
              });
            }
          }

        },

        formattedValue() {
          return this.formatValue(this.computedValue);
        },

        localeOptions() {
          return new Intl.DateTimeFormat(this.locale, {
            year: 'numeric',
            month: 'numeric'
          }).resolvedOptions();
        },

        dtf() {
          return new Intl.DateTimeFormat(this.locale, {
            timezome: 'UTC'
          });
        },

        dtfMonth() {
          return new Intl.DateTimeFormat(this.locale, {
            year: this.localeOptions.year || 'numeric',
            month: this.localeOptions.month || '2-digit',
            timezome: 'UTC'
          });
        },

        newMonthNames() {
          if (Array.isArray(this.monthNames)) {
            return this.monthNames;
          }

          return getMonthNames(this.locale);
        },

        newDayNames() {
          if (Array.isArray(this.dayNames)) {
            return this.dayNames;
          }

          return getWeekdayNames(this.locale);
        },

        listOfMonths() {
          let minMonth = 0;
          let maxMonth = 12;

          if (this.minDate && this.focusedDateData.year === this.minDate.getFullYear()) {
            minMonth = this.minDate.getMonth();
          }

          if (this.maxDate && this.focusedDateData.year === this.maxDate.getFullYear()) {
            maxMonth = this.maxDate.getMonth();
          }

          return this.newMonthNames.map((name, index) => {
            return {
              name: name,
              index: index,
              disabled: index < minMonth || index > maxMonth
            };
          });
        },

        /*
         * Returns an array of years for the year dropdown. If earliest/latest
         * dates are set by props, range of years will fall within those dates.
         */
        listOfYears() {
          let latestYear = this.focusedDateData.year + this.yearsRange[1];

          if (this.maxDate && this.maxDate.getFullYear() < latestYear) {
            latestYear = Math.max(this.maxDate.getFullYear(), this.focusedDateData.year);
          }

          let earliestYear = this.focusedDateData.year + this.yearsRange[0];

          if (this.minDate && this.minDate.getFullYear() > earliestYear) {
            earliestYear = Math.min(this.minDate.getFullYear(), this.focusedDateData.year);
          }

          const arrayOfYears = [];

          for (let i = earliestYear; i <= latestYear; i++) {
            arrayOfYears.push(i);
          }

          return arrayOfYears.reverse();
        },

        showPrev() {
          if (!this.minDate) return false;

          if (this.isTypeMonth) {
            return this.focusedDateData.year <= this.minDate.getFullYear();
          }

          const dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month);
          const date = new Date(this.minDate.getFullYear(), this.minDate.getMonth());
          return dateToCheck <= date;
        },

        showNext() {
          if (!this.maxDate) return false;

          if (this.isTypeMonth) {
            return this.focusedDateData.year >= this.maxDate.getFullYear();
          }

          const dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month);
          const date = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth());
          return dateToCheck >= date;
        },

        isMobile() {
          return this.mobileNative && isMobile.any();
        },

        isTypeMonth() {
          return this.type === 'month';
        },

        ariaRole() {
          return !this.inline ? 'dialog' : undefined;
        }

      },
      watch: {
        /**
         * When v-model is changed:
         *   1. Update internal value.
         *   2. If it's invalid, validate again.
         */
        value(value) {
          this.updateInternalState(value);
          if (!this.multiple) this.togglePicker(false);
        },

        focusedDate(value) {
          if (value) {
            this.focusedDateData = {
              day: value.getDate(),
              month: value.getMonth(),
              year: value.getFullYear()
            };
          }
        },

        /*
         * Emit input event on month and/or year change
         */
        'focusedDateData.month'(value) {
          this.$emit('change-month', value);
        },

        'focusedDateData.year'(value) {
          this.$emit('change-year', value);
        }

      },
      methods: {
        /*
         * Parse string into date
         */
        onChange(value) {
          const date = this.dateParser(value, this);

          if (date && (!isNaN(date) || Array.isArray(date) && date.length === 2 && !isNaN(date[0]) && !isNaN(date[1]))) {
            this.computedValue = date;
          } else {
            // Force refresh input value when not valid date
            this.computedValue = null;

            if (this.$refs.input) {
              this.$refs.input.newValue = this.computedValue;
            }
          }
        },

        /*
         * Format date into string
         */
        formatValue(value) {
          if (Array.isArray(value)) {
            const isArrayWithValidDates = Array.isArray(value) && value.every(v => !isNaN(v));
            return isArrayWithValidDates ? this.dateFormatter([...value], this) : null;
          }

          return value && !isNaN(value) ? this.dateFormatter(value, this) : null;
        },

        /*
         * Either decrement month by 1 if not January or decrement year by 1
         * and set month to 11 (December) or decrement year when 'month'
         */
        prev() {
          if (this.disabled) return;

          if (this.isTypeMonth) {
            this.focusedDateData.year -= 1;
          } else {
            if (this.focusedDateData.month > 0) {
              this.focusedDateData.month -= 1;
            } else {
              this.focusedDateData.month = 11;
              this.focusedDateData.year -= 1;
            }
          }
        },

        /*
         * Either increment month by 1 if not December or increment year by 1
         * and set month to 0 (January) or increment year when 'month'
         */
        next() {
          if (this.disabled) return;

          if (this.isTypeMonth) {
            this.focusedDateData.year += 1;
          } else {
            if (this.focusedDateData.month < 11) {
              this.focusedDateData.month += 1;
            } else {
              this.focusedDateData.month = 0;
              this.focusedDateData.year += 1;
            }
          }
        },

        formatNative(value) {
          return this.isTypeMonth ? this.formatYYYYMM(value) : this.formatYYYYMMDD(value);
        },

        /*
         * Format date into string 'YYYY-MM-DD'
         */
        formatYYYYMMDD(value) {
          const date = new Date(value);

          if (value && !isNaN(date)) {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return year + '-' + ((month < 10 ? '0' : '') + month) + '-' + ((day < 10 ? '0' : '') + day);
          }

          return '';
        },

        /*
         * Format date into string 'YYYY-MM'
         */
        formatYYYYMM(value) {
          const date = new Date(value);

          if (value && !isNaN(date)) {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            return year + '-' + ((month < 10 ? '0' : '') + month);
          }

          return '';
        },

        /*
         * Parse date from string
         */
        onChangeNativePicker(event) {
          const date = event.target.value;
          const s = date ? date.split('-') : [];

          if (s.length === 3) {
            const year = parseInt(s[0], 10);
            const month = parseInt(s[1]) - 1;
            const day = parseInt(s[2]);
            this.computedValue = new Date(year, month, day);
          } else {
            this.computedValue = null;
          }
        },

        updateInternalState(value) {
          const currentDate = Array.isArray(value) ? !value.length ? this.dateCreator() : value[0] : !value ? this.dateCreator() : value;
          this.focusedDateData = {
            day: currentDate.getDate(),
            month: currentDate.getMonth(),
            year: currentDate.getFullYear()
          };
          this.dateSelected = value;
        },

        /*
         * Toggle datepicker
         */
        togglePicker(active) {
          if (this.$refs.dropdown) {
            if (this.closeOnClick) {
              this.$refs.dropdown.isActive = typeof active === 'boolean' ? active : !this.$refs.dropdown.isActive;
            }
          }
        },

        /*
         * Call default onFocus method and show datepicker
         */
        handleOnFocus(event) {
          this.onFocus(event);

          if (this.openOnFocus) {
            this.togglePicker(true);
          }
        },

        /*
         * Toggle dropdown
         */
        toggle() {
          if (this.mobileNative && this.isMobile) {
            const input = this.$refs.input.$refs.input;
            input.focus();
            input.click();
            return;
          }

          this.$refs.dropdown.toggle();
        },

        /*
         * Avoid dropdown toggle when is already visible
         */
        onInputClick(event) {
          if (this.$refs.dropdown.isActive) {
            event.stopPropagation();
          }
        },

        /**
         * Keypress event that is bound to the document.
         */
        keyPress({
          key
        }) {
          if (this.$refs.dropdown && this.$refs.dropdown.isActive && (key === 'Escape' || key === 'Esc')) {
            this.togglePicker(false);
          }
        },

        /**
         * Emit 'blur' event on dropdown is not active (closed)
         */
        onActiveChange(value) {
          if (!value) {
            this.onBlur();
          }
        },

        changeFocus(day) {
          this.focusedDateData = {
            day: day.getDate(),
            month: day.getMonth(),
            year: day.getFullYear()
          };
        }

      },

      created() {
        if (typeof window !== 'undefined') {
          document.addEventListener('keyup', this.keyPress);
        }
      },

      beforeDestroy() {
        if (typeof window !== 'undefined') {
          document.removeEventListener('keyup', this.keyPress);
        }
      }

    };

    /* script */
    const __vue_script__$d = script$d;

    /* template */
    var __vue_render__$b = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClasses},[(!_vm.isMobile || _vm.inline)?_c('o-dropdown',_vm._b({ref:"dropdown",attrs:{"position":_vm.position,"disabled":_vm.disabled,"inline":_vm.inline,"mobile-modal":_vm.mobileModal,"trap-focus":_vm.trapFocus,"aria-role":_vm.ariaRole,"aria-modal":!_vm.inline,"append-to-body":_vm.appendToBody,"append-to-body-copy-parent":""},on:{"active-change":_vm.onActiveChange},scopedSlots:_vm._u([(!_vm.inline)?{key:"trigger",fn:function(){return [_vm._t("trigger",[_c('o-input',_vm._b({ref:"input",attrs:{"autocomplete":"off","value":_vm.formattedValue,"placeholder":_vm.placeholder,"size":_vm.size,"icon":_vm.icon,"icon-right":_vm.iconRight,"icon-pack":_vm.iconPack,"rounded":_vm.rounded,"loading":_vm.loading,"disabled":_vm.disabled,"readonly":!_vm.editable,"use-html5-validation":false},on:{"focus":_vm.handleOnFocus},nativeOn:{"click":function($event){return _vm.onInputClick($event)},"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.togglePicker(true)},"change":function($event){return _vm.onChange($event.target.value)}}},'o-input',_vm.inputBind,false))])]},proxy:true}:null],null,true)},'o-dropdown',_vm.dropdownBind,false),[_c('o-dropdown-item',{attrs:{"override":"","disabled":_vm.disabled,"clickable":false}},[_c('div',{class:_vm.boxClasses},[_c('header',{class:_vm.headerClasses},[(_vm.$slots.header !== undefined && _vm.$slots.header.length)?[_vm._t("header")]:_c('div',{class:_vm.headerButtonsClasses},[_c('a',{directives:[{name:"show",rawName:"v-show",value:(!_vm.showPrev && !_vm.disabled),expression:"!showPrev && !disabled"}],class:_vm.prevBtnClasses,attrs:{"role":"button","href":"#","disabled":_vm.disabled,"aria-label":_vm.ariaPreviousLabel},on:{"click":function($event){$event.preventDefault();return _vm.prev($event)},"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.prev($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"space",32,$event.key,[" ","Spacebar"])){ return null; }$event.preventDefault();return _vm.prev($event)}]}},[_c('o-icon',{attrs:{"icon":_vm.iconPrev,"pack":_vm.iconPack,"both":"","clickable":""}})],1),_c('a',{directives:[{name:"show",rawName:"v-show",value:(!_vm.showNext && !_vm.disabled),expression:"!showNext && !disabled"}],class:_vm.nextBtnClasses,attrs:{"role":"button","href":"#","disabled":_vm.disabled,"aria-label":_vm.ariaNextLabel},on:{"click":function($event){$event.preventDefault();return _vm.next($event)},"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.next($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"space",32,$event.key,[" ","Spacebar"])){ return null; }$event.preventDefault();return _vm.next($event)}]}},[_c('o-icon',{attrs:{"icon":_vm.iconNext,"pack":_vm.iconPack,"both":"","clickable":""}})],1),_c('div',{class:_vm.listsClasses},[_c('o-field',[(!_vm.isTypeMonth)?_c('o-select',{attrs:{"disabled":_vm.disabled,"size":_vm.size},model:{value:(_vm.focusedDateData.month),callback:function ($$v) {_vm.$set(_vm.focusedDateData, "month", $$v);},expression:"focusedDateData.month"}},_vm._l((_vm.listOfMonths),function(month){return _c('option',{key:month.name,attrs:{"disabled":month.disabled},domProps:{"value":month.index}},[_vm._v(" "+_vm._s(month.name)+" ")])}),0):_vm._e(),_c('o-select',{attrs:{"disabled":_vm.disabled,"size":_vm.size},model:{value:(_vm.focusedDateData.year),callback:function ($$v) {_vm.$set(_vm.focusedDateData, "year", $$v);},expression:"focusedDateData.year"}},_vm._l((_vm.listOfYears),function(year){return _c('option',{key:year,domProps:{"value":year}},[_vm._v(" "+_vm._s(year)+" ")])}),0)],1)],1)])],2),_c('o-datepicker-table',{attrs:{"day-names":_vm.newDayNames,"month-names":_vm.newMonthNames,"first-day-of-week":_vm.firstDayOfWeek,"rules-for-first-week":_vm.rulesForFirstWeek,"min-date":_vm.minDate,"max-date":_vm.maxDate,"focused":_vm.focusedDateData,"disabled":_vm.disabled,"unselectable-dates":_vm.unselectableDates,"unselectable-days-of-week":_vm.unselectableDaysOfWeek,"selectable-dates":_vm.selectableDates,"events":_vm.events,"indicators":_vm.indicators,"date-creator":_vm.dateCreator,"type-month":_vm.isTypeMonth,"nearby-month-days":_vm.nearbyMonthDays,"nearby-selectable-month-days":_vm.nearbySelectableMonthDays,"show-week-number":_vm.showWeekNumber,"week-number-clickable":_vm.weekNumberClickable,"range":_vm.range,"multiple":_vm.multiple,"table-class":_vm.tableClass,"table-head-class":_vm.tableHeadClass,"table-head-cell-class":_vm.tableHeadCellClass,"table-body-class":_vm.tableBodyClass,"table-row-class":_vm.tableRowClass,"table-cell-class":_vm.tableCellClass,"table-cell-selected-class":_vm.tableCellSelectedClass,"table-cell-first-selected-class":_vm.tableCellFirstSelectedClass,"table-cell-invisible-class":_vm.tableCellInvisibleClass,"table-cell-within-selected-class":_vm.tableCellWithinSelectedClass,"table-cell-last-selected-class":_vm.tableCellLastSelectedClass,"table-cell-first-hovered-class":_vm.tableCellFirstHoveredClass,"table-cell-within-hovered-class":_vm.tableCellWithinHoveredClass,"table-cell-last-hovered-class":_vm.tableCellLastHoveredClass,"table-cell-today-class":_vm.tableCellTodayClass,"table-cell-selectable-class":_vm.tableCellSelectableClass,"table-cell-unselectable-class":_vm.tableCellUnselectableClass,"table-cell-nearby-class":_vm.tableCellNearbyClass,"table-cell-events-class":_vm.tableCellEventsClass,"table-events-class":_vm.tableEventsClass,"table-event-variant-class":_vm.tableEventVariantClass,"table-event-class":_vm.tableEventClass,"table-event-indicators-class":_vm.tableEventIndicatorsClass},on:{"range-start":function (date) { return _vm.$emit('range-start', date); },"range-end":function (date) { return _vm.$emit('range-end', date); },"close":function($event){return _vm.togglePicker(false)},"update:focused":function($event){_vm.focusedDateData = $event;}},model:{value:(_vm.computedValue),callback:function ($$v) {_vm.computedValue=$$v;},expression:"computedValue"}})],1),(_vm.$slots.default !== undefined && _vm.$slots.default.length)?_c('footer',{class:_vm.footerClasses},[_vm._t("default")],2):_vm._e()])],1):_c('o-input',_vm._b({ref:"input",attrs:{"type":!_vm.isTypeMonth ? 'date' : 'month',"autocomplete":"off","value":_vm.formatNative(_vm.computedValue),"placeholder":_vm.placeholder,"size":_vm.size,"icon":_vm.icon,"icon-pack":_vm.iconPack,"rounded":_vm.rounded,"loading":_vm.loading,"max":_vm.formatNative(_vm.maxDate),"min":_vm.formatNative(_vm.minDate),"disabled":_vm.disabled,"readonly":false,"use-html5-validation":false},on:{"focus":_vm.onFocus,"blur":_vm.onBlur},nativeOn:{"change":function($event){return _vm.onChangeNativePicker($event)}}},'o-input',_vm.$attrs,false))],1)};
    var __vue_staticRenderFns__$b = [];

      /* style */
      const __vue_inject_styles__$d = undefined;
      /* scoped */
      const __vue_scope_id__$d = undefined;
      /* module identifier */
      const __vue_module_identifier__$d = undefined;
      /* functional template */
      const __vue_is_functional_template__$d = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$d = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
        __vue_inject_styles__$d,
        __vue_script__$d,
        __vue_scope_id__$d,
        __vue_is_functional_template__$d,
        __vue_module_identifier__$d,
        false,
        undefined,
        undefined,
        undefined
      );

    const Plugin$5 = {
      install(Vue) {
        registerComponent(Vue, __vue_component__$d);
      }

    };
    use(Plugin$5);

    const Plugin$6 = {
      install(Vue) {
        registerComponent(Vue, __vue_component__$6);
        registerComponent(Vue, __vue_component__$7);
      }

    };
    use(Plugin$6);

    const Plugin$7 = {
      install(Vue) {
        registerComponent(Vue, __vue_component__$9);
      }

    };
    use(Plugin$7);

    const Plugin$8 = {
      install(Vue) {
        registerComponent(Vue, __vue_component__);
      }

    };
    use(Plugin$8);

    const Plugin$9 = {
      install(Vue) {
        registerComponent(Vue, __vue_component__$1);
      }

    };
    use(Plugin$9);

    // Polyfills for SSR
    const isSSR = typeof window === 'undefined';
    const HTMLElement = isSSR ? Object : window.HTMLElement;
    const File = isSSR ? Object : window.File;

    //
    /**
     * A simple loading overlay
     * @displayName Loading
     * @example ./examples/Loading.md
     * @style _loading.scss
     */

    var script$e = {
      name: 'OLoading',
      components: {
        [__vue_component__.name]: __vue_component__
      },
      mixins: [BaseComponentMixin],
      configField: 'loading',
      props: {
        /** Whether modal is active or not,  use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding */
        active: Boolean,
        programmatic: Boolean,
        container: [Object, Function, HTMLElement],

        /** Loader will overlay the full page */
        fullPage: {
          type: Boolean,
          default: true
        },

        /* Custom animation (transition name) */
        animation: {
          type: String,
          default: () => {
            return getValueByPath(config, 'loading.animation', 'fade');
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
            return getValueByPath(config, 'loading.icon', 'sync-alt');
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
              removeElement(this.$el);
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
    const __vue_script__$e = script$e;

    /* template */
    var __vue_render__$c = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.animation}},[(_vm.isActive)?_c('div',{class:_vm.rootClasses},[_c('div',{class:_vm.overlayClasses,on:{"click":_vm.cancel}}),_vm._t("default",[_c('o-icon',{class:_vm.iconClasses,attrs:{"icon":_vm.icon,"spin":_vm.iconSpin,"size":_vm.iconSize}})])],2):_vm._e()])};
    var __vue_staticRenderFns__$c = [];

      /* style */
      const __vue_inject_styles__$e = undefined;
      /* scoped */
      const __vue_scope_id__$e = undefined;
      /* module identifier */
      const __vue_module_identifier__$e = undefined;
      /* functional template */
      const __vue_is_functional_template__$e = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$e = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
        __vue_inject_styles__$e,
        __vue_script__$e,
        __vue_scope_id__$e,
        __vue_is_functional_template__$e,
        __vue_module_identifier__$e,
        false,
        undefined,
        undefined,
        undefined
      );

    let localVueInstance;
    const LoadingProgrammatic = {
      open(params) {
        const defaultParam = {
          programmatic: true
        };
        const propsData = merge(defaultParam, params);
        const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || VueInstance;
        const LoadingComponent = vm.extend(__vue_component__$e);
        return new LoadingComponent({
          el: document.createElement('div'),
          propsData
        });
      }

    };
    const Plugin$a = {
      install(Vue) {
        localVueInstance = Vue;
        registerComponent(Vue, __vue_component__$e);
        registerComponentProgrammatic(Vue, 'loading', LoadingProgrammatic);
      }

    };
    use(Plugin$a);

    //
    /**
     * Classic modal overlay to include any content you may need
     * @displayName Modal
     * @example ./examples/Modal.md
     * @style _modal.scss
     */

    var script$f = {
      name: 'OModal',
      components: {
        [__vue_component__.name]: __vue_component__
      },
      configField: 'modal',
      directives: {
        trapFocus: directive
      },
      mixins: [BaseComponentMixin, MatchMediaMixin],
      props: {
        /** Whether modal is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding */
        active: Boolean,

        /** Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.$emit('close') */
        component: [Object, Function],

        /** Text content */
        content: String,

        /** Close button text content */
        closeButtonContent: {
          type: String,
          default: '✕'
        },
        programmatic: Boolean,

        /** Props to be binded to the injected component */
        props: Object,

        /** Events to be binded to the injected component */
        events: Object,

        /** Width of the Modal */
        width: {
          type: [String, Number],
          default: () => {
            return getValueByPath(config, 'modal.width', 960);
          }
        },

        /** Enable custom style on modal content */
        custom: Boolean,

        /** Custom animation (transition name) */
        animation: {
          type: String,
          default: () => {
            return getValueByPath(config, 'modal.animation', 'zoom-out');
          }
        },

        /**
         * Can close Modal by clicking 'X', pressing escape or clicking outside
         * @values escape, x, outside, button
         */
        canCancel: {
          type: [Array, Boolean],
          default: () => {
            return getValueByPath(config, 'modal.canCancel', ['escape', 'x', 'outside', 'button']);
          }
        },

        /** Callback function to call after user canceled (clicked 'X' / pressed escape / clicked outside) */
        onCancel: {
          type: Function,
          default: () => {}
        },

        /**
         * clip to remove the body scrollbar, keep to have a non scrollable scrollbar to avoid shifting background, but will set body to position fixed, might break some layouts
         * @values keep, clip
         */
        scroll: {
          type: String,
          default: () => {
            return getValueByPath(config, 'modal.scroll', 'keep');
          }
        },

        /** Display modal as full screen */
        fullScreen: Boolean,

        /** Trap focus inside the modal. */
        trapFocus: {
          type: Boolean,
          default: () => {
            return getValueByPath(config, 'modal.trapFocus', true);
          }
        },
        ariaRole: {
          type: String,
          validator: value => {
            return ['dialog', 'alertdialog'].indexOf(value) >= 0;
          }
        },
        ariaModal: Boolean,

        /** Destroy modal on hide */
        destroyOnHide: {
          type: Boolean,
          default: () => {
            return getValueByPath(config, 'modal.destroyOnHide', true);
          }
        },

        /** Automatically focus modal when active */
        autoFocus: {
          type: Boolean,
          default: () => {
            return getValueByPath(config, 'modal.autoFocus', true);
          }
        },

        /** Icon name */
        closeIcon: {
          type: String,
          default: () => {
            return getValueByPath(config, 'modal.closeIcon', 'times');
          }
        },
        closeIconSize: {
          type: String,
          default: 'medium'
        },
        rootClass: [String, Function, Array],
        overlayClass: [String, Function, Array],
        contentClass: [String, Function, Array],
        closeClass: [String, Function, Array],
        fullScreenClass: [String, Function, Array],
        mobileClass: [String, Function, Array]
      },

      data() {
        return {
          isActive: this.active || false,
          savedScrollTop: null,
          newWidth: toCssDimension(this.width),
          animating: true,
          destroyed: !this.active
        };
      },

      computed: {
        rootClasses() {
          return [this.computedClass('rootClass', 'o-modal'), {
            [this.computedClass('mobileClass', 'o-modal--mobile')]: this.isMatchMedia
          }];
        },

        overlayClasses() {
          return [this.computedClass('overlayClass', 'o-modal__overlay')];
        },

        contentClasses() {
          return [{
            [this.computedClass('contentClass', 'o-modal__content')]: !this.custom
          }, {
            [this.computedClass('fullScreenClass', 'o-modal__content--fullscreen')]: this.fullScreen
          }];
        },

        closeClasses() {
          return [this.computedClass('closeClass', 'o-modal__close')];
        },

        cancelOptions() {
          return typeof this.canCancel === 'boolean' ? this.canCancel ? getValueByPath(config, 'modal.canCancel', ['escape', 'x', 'outside', 'button']) : [] : this.canCancel;
        },

        showX() {
          return this.cancelOptions.indexOf('x') >= 0;
        },

        customStyle() {
          if (!this.fullScreen) {
            return {
              maxWidth: this.newWidth
            };
          }

          return null;
        }

      },
      watch: {
        active(value) {
          this.isActive = value;
        },

        isActive(value) {
          if (value) this.destroyed = false;
          this.handleScroll();
          this.$nextTick(() => {
            if (value && this.$el && this.$el.focus && this.autoFocus) {
              this.$el.focus();
            }
          });
        }

      },
      methods: {
        handleScroll() {
          if (typeof window === 'undefined') return;

          if (this.scroll === 'clip') {
            if (this.isActive) {
              document.documentElement.classList.add('o-clipped');
            } else {
              document.documentElement.classList.remove('o-clipped');
            }

            return;
          }

          this.savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;

          if (this.isActive) {
            document.body.classList.add('o-noscroll');
          } else {
            document.body.classList.remove('o-noscroll');
          }

          if (this.isActive) {
            document.body.style.top = `-${this.savedScrollTop}px`;
            return;
          }

          document.documentElement.scrollTop = this.savedScrollTop;
          document.body.style.top = null;
          this.savedScrollTop = null;
        },

        /**
        * Close the Modal if canCancel and call the onCancel prop (function).
        */
        cancel(method) {
          if (this.cancelOptions.indexOf(method) < 0) return;
          this.onCancel.apply(null, arguments);
          this.close();
        },

        /**
        * Call the onCancel prop (function).
        * Emit events, and destroy modal if it's programmatic.
        */
        close() {
          this.$emit('close');
          this.$emit('update:active', false); // Timeout for the animation complete before destroying

          if (this.programmatic) {
            this.isActive = false;
            setTimeout(() => {
              this.$destroy();
              removeElement(this.$el);
            }, 150);
          }
        },

        /**
        * Keypress event that is bound to the document.
        */
        keyPress({
          key
        }) {
          if (this.isActive && (key === 'Escape' || key === 'Esc')) this.cancel('escape');
        },

        /**
        * Transition after-enter hook
        */
        afterEnter() {
          this.animating = false;
        },

        /**
        * Transition before-leave hook
        */
        beforeLeave() {
          this.animating = true;
        },

        /**
        * Transition after-leave hook
        */
        afterLeave() {
          if (this.destroyOnHide) {
            this.destroyed = true;
          }
        }

      },

      created() {
        if (typeof window !== 'undefined') {
          document.addEventListener('keyup', this.keyPress);
        }
      },

      beforeMount() {
        // Insert the Modal component in body tag
        // only if it's programmatic
        this.programmatic && document.body.appendChild(this.$el);
      },

      mounted() {
        if (this.programmatic) this.isActive = true;else if (this.isActive) this.handleScroll();
      },

      beforeDestroy() {
        if (typeof window !== 'undefined') {
          document.removeEventListener('keyup', this.keyPress); // reset scroll

          document.documentElement.classList.remove('o-clipped');
          const savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
          document.body.classList.remove('o-noscroll');
          document.documentElement.scrollTop = savedScrollTop;
          document.body.style.top = null;
        }
      }

    };

    /* script */
    const __vue_script__$f = script$f;

    /* template */
    var __vue_render__$d = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.animation},on:{"after-enter":_vm.afterEnter,"before-leave":_vm.beforeLeave,"after-leave":_vm.afterLeave}},[(!_vm.destroyed)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"},{name:"trap-focus",rawName:"v-trap-focus",value:(_vm.trapFocus),expression:"trapFocus"}],class:_vm.rootClasses,attrs:{"tabindex":"-1","role":_vm.ariaRole,"aria-modal":_vm.ariaModal}},[_c('div',{class:_vm.overlayClasses,on:{"click":function($event){return _vm.cancel('outside')}}}),_c('div',{class:_vm.contentClasses,style:(_vm.customStyle)},[(_vm.component)?_c(_vm.component,_vm._g(_vm._b({tag:"component",on:{"close":_vm.close}},'component',_vm.props,false),_vm.events)):(_vm.content)?_c('div',[_vm._v(" "+_vm._s(_vm.content)+" ")]):_vm._t("default"),(_vm.showX)?_c('o-icon',{directives:[{name:"show",rawName:"v-show",value:(!_vm.animating),expression:"!animating"}],class:_vm.closeClasses,attrs:{"clickable":"","icon":_vm.closeIcon,"size":_vm.closeIconSize},nativeOn:{"click":function($event){return _vm.cancel('x')}}}):_vm._e()],2)]):_vm._e()])};
    var __vue_staticRenderFns__$d = [];

      /* style */
      const __vue_inject_styles__$f = undefined;
      /* scoped */
      const __vue_scope_id__$f = undefined;
      /* module identifier */
      const __vue_module_identifier__$f = undefined;
      /* functional template */
      const __vue_is_functional_template__$f = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$f = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
        __vue_inject_styles__$f,
        __vue_script__$f,
        __vue_scope_id__$f,
        __vue_is_functional_template__$f,
        __vue_module_identifier__$f,
        false,
        undefined,
        undefined,
        undefined
      );

    let localVueInstance$1;
    const ModalProgrammatic = {
      open(params) {
        let parent;

        if (typeof params === 'string') {
          params = {
            content: params
          };
        }

        const defaultParam = {
          programmatic: true
        };

        if (params.parent) {
          parent = params.parent;
          delete params.parent;
        }

        let slot;

        if (Array.isArray(params.content)) {
          slot = params.content;
          delete params.content;
        }

        const propsData = merge(defaultParam, params);
        const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance$1 || VueInstance;
        const ModalComponent = vm.extend(__vue_component__$f);
        const instance = new ModalComponent({
          parent,
          el: document.createElement('div'),
          propsData
        });

        if (slot) {
          instance.$slots.default = slot;
        }

        return instance;
      }

    };
    const Plugin$b = {
      install(Vue) {
        localVueInstance$1 = Vue;
        registerComponent(Vue, __vue_component__$f);
        registerComponentProgrammatic(Vue, 'modal', ModalProgrammatic);
      }

    };
    use(Plugin$b);

    //
    var script$g = {
      name: 'OPaginationButton',
      inject: {
        $pagination: {
          name: '$pagination'
        }
      },
      configField: 'pagination',
      props: {
        page: {
          type: Object,
          required: true
        },
        tag: {
          type: String,
          default: 'a',
          validator: value => getValueByPath(config, 'linkTags', ['a', 'button', 'input', 'router-link', 'nuxt-link']).indexOf(value) >= 0
        },
        disabled: {
          type: Boolean,
          default: false
        },
        linkClass: [String, Array, Object],
        linkCurrentClass: [String, Array, Object]
      },
      computed: {
        linkClasses() {
          return [this.linkClass || [...this.$pagination.linkClasses], this.page.class, {
            [this.linkCurrentClass]: this.page.isCurrent
          }];
        },

        href() {
          if (this.tag === 'a') {
            return '#';
          }

          return '';
        },

        isDisabled() {
          return this.disabled || this.page.disabled;
        }

      }
    };

    /* script */
    const __vue_script__$g = script$g;

    /* template */
    var __vue_render__$e = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,_vm._b({tag:"component",class:_vm.linkClasses,attrs:{"role":"button","href":_vm.href,"disabled":_vm.isDisabled,"aria-label":_vm.page['aria-label'],"aria-current":_vm.page.isCurrent},on:{"click":function($event){$event.preventDefault();return _vm.page.click($event)}}},'component',_vm.$attrs,false),[_vm._t("default",[_vm._v(_vm._s(_vm.page.number))])],2)};
    var __vue_staticRenderFns__$e = [];

      /* style */
      const __vue_inject_styles__$g = undefined;
      /* scoped */
      const __vue_scope_id__$g = undefined;
      /* module identifier */
      const __vue_module_identifier__$g = undefined;
      /* functional template */
      const __vue_is_functional_template__$g = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$g = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
        __vue_inject_styles__$g,
        __vue_script__$g,
        __vue_scope_id__$g,
        __vue_is_functional_template__$g,
        __vue_module_identifier__$g,
        false,
        undefined,
        undefined,
        undefined
      );

    //
    /**
     * A responsive and flexible pagination
     * @displayName Pagination
     * @example ./examples/Pagination.md
     * @style _pagination.scss
     */

    var script$h = {
      name: 'OPagination',
      components: {
        [__vue_component__.name]: __vue_component__,
        [__vue_component__$g.name]: __vue_component__$g
      },
      configField: 'pagination',
      mixins: [BaseComponentMixin, MatchMediaMixin],

      provide() {
        return {
          $pagination: this
        };
      },

      emits: ['update:active', 'change'],
      props: {
        /** Total count of items */
        total: [Number, String],

        /** Items count for each page */
        perPage: {
          type: [Number, String],
          default: () => {
            return getValueByPath(config, 'pagination.perPage', 20);
          }
        },

        /** Current page number, use the .sync modifier (Vue 2.x) or v-model:current (Vue 3.x) to make it two-way binding */
        current: {
          type: [Number, String],
          default: 1
        },

        /** Number of pagination items to show before current page */
        rangeBefore: {
          type: [Number, String],
          default: 1
        },

        /** Number of pagination items to show after current page */
        rangeAfter: {
          type: [Number, String],
          default: 1
        },

        /**
         * Pagination size, optional
         * @values small, medium, large
         */
        size: String,

        /** Simple style */
        simple: Boolean,

        /** Rounded button styles */
        rounded: Boolean,

        /**
         * Buttons order, optional
         * @values centered, right, left
         */
        order: String,

        /**
         * Icon pack to use
         * @values mdi, fa, fas and any other custom icon pack
         */
        iconPack: String,

        /** Icon to use for previous button */
        iconPrev: {
          type: String,
          default: () => {
            return getValueByPath(config, 'pagination.iconPrev', 'chevron-left');
          }
        },

        /** Icon to use for next button */
        iconNext: {
          type: String,
          default: () => {
            return getValueByPath(config, 'pagination.iconNext', 'chevron-right');
          }
        },
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String,
        rootClass: [String, Function, Array],
        prevBtnClass: [String, Function, Array],
        nextBtnClass: [String, Function, Array],
        listClass: [String, Function, Array],
        linkClass: [String, Function, Array],
        linkCurrentClass: [String, Function, Array],
        ellipsisClass: [String, Function, Array],
        infoClass: [String, Function, Array],
        orderClass: [String, Function, Array],
        simpleClass: [String, Function, Array],
        roundedClass: [String, Function, Array],
        linkDisabledClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        mobileClass: [String, Function, Array]
      },
      computed: {
        rootClasses() {
          return [this.computedClass('rootClass', 'o-pag'), {
            [this.computedClass('orderClass', 'o-pag--', this.order)]: this.order
          }, {
            [this.computedClass('sizeClass', 'o-pag--', this.size)]: this.size
          }, {
            [this.computedClass('simpleClass', 'o-pag--simple')]: this.simple
          }, {
            [this.computedClass('mobileClass', 'o-pag--mobile')]: this.isMatchMedia
          }];
        },

        prevBtnClasses() {
          return [this.computedClass('prevBtnClass', 'o-pag__previous'), {
            [this.computedClass('linkDisabledClass', 'o-pag__link--disabled')]: !this.hasPrev
          }];
        },

        nextBtnClasses() {
          return [this.computedClass('nextBtnClass', 'o-pag__next'), {
            [this.computedClass('linkDisabledClass', 'o-pag__link--disabled')]: !this.hasNext
          }];
        },

        infoClasses() {
          return [this.computedClass('infoClass', 'o-pag__info')];
        },

        ellipsisClasses() {
          return [this.computedClass('ellipsisClass', 'o-pag__ellipsis')];
        },

        listClasses() {
          return [this.computedClass('listClass', 'o-pag__list')];
        },

        linkClasses() {
          return [this.computedClass('linkClass', 'o-pag__link'), {
            [this.computedClass('roundedClass', 'o-pag__link--rounded')]: this.rounded
          }];
        },

        linkCurrentClasses() {
          return [this.computedClass('linkCurrentClass', 'o-pag__link--current')];
        },

        beforeCurrent() {
          return parseInt(this.rangeBefore);
        },

        afterCurrent() {
          return parseInt(this.rangeAfter);
        },

        /**
        * Total page size (count).
        */
        pageCount() {
          return Math.ceil(this.total / this.perPage);
        },

        /**
        * First item of the page (count).
        */
        firstItem() {
          const firstItem = this.current * this.perPage - this.perPage + 1;
          return firstItem >= 0 ? firstItem : 0;
        },

        /**
        * Check if previous button is available.
        */
        hasPrev() {
          return this.current > 1;
        },

        /**
        * Check if first page button should be visible.
        */
        hasFirst() {
          return this.current >= 2 + this.beforeCurrent;
        },

        /**
        * Check if first ellipsis should be visible.
        */
        hasFirstEllipsis() {
          return this.current >= this.beforeCurrent + 4;
        },

        /**
        * Check if last page button should be visible.
        */
        hasLast() {
          return this.current <= this.pageCount - (1 + this.afterCurrent);
        },

        /**
        * Check if last ellipsis should be visible.
        */
        hasLastEllipsis() {
          return this.current < this.pageCount - (2 + this.afterCurrent);
        },

        /**
        * Check if next button is available.
        */
        hasNext() {
          return this.current < this.pageCount;
        },

        /**
        * Get near pages, 1 before and 1 after the current.
        * Also add the click event to the array.
        */
        pagesInRange() {
          if (this.simple) return;
          let left = Math.max(1, this.current - this.beforeCurrent);

          if (left - 1 === 2) {
            left--; // Do not show the ellipsis if there is only one to hide
          }

          let right = Math.min(this.current + this.afterCurrent, this.pageCount);

          if (this.pageCount - right === 2) {
            right++; // Do not show the ellipsis if there is only one to hide
          }

          const pages = [];

          for (let i = left; i <= right; i++) {
            pages.push(this.getPage(i));
          }

          return pages;
        },

        hasDefaultSlot() {
          return this.$scopedSlots.default;
        },

        hasPreviousSlot() {
          return this.$scopedSlots.previous;
        },

        hasNextSlot() {
          return this.$scopedSlots.next;
        }

      },
      watch: {
        /**
        * If current page is trying to be greater than page count, set to last.
        */
        pageCount(value) {
          if (this.current > value) this.last();
        }

      },
      methods: {
        /**
        * Previous button click listener.
        */
        prev(event) {
          this.changePage(this.current - 1, event);
        },

        /**
        * Next button click listener.
        */
        next(event) {
          this.changePage(this.current + 1, event);
        },

        /**
        * First button click listener.
        */
        first(event) {
          this.changePage(1, event);
        },

        /**
        * Last button click listener.
        */
        last(event) {
          this.changePage(this.pageCount, event);
        },

        changePage(num, event) {
          if (this.current === num || num < 1 || num > this.pageCount) return;
          this.$emit('change', num);
          this.$emit('update:current', num); // Set focus on element to keep tab order

          if (event && event.target) {
            this.$nextTick(() => event.target.focus());
          }
        },

        getPage(num, options = {}) {
          return {
            number: num,
            isCurrent: this.current === num,
            click: event => this.changePage(num, event),
            disabled: options.disabled || false,
            class: options.class || '',
            'aria-label': options['aria-label'] || this.getAriaPageLabel(num, this.current === num)
          };
        },

        /**
        * Get text for aria-label according to page number.
        */
        getAriaPageLabel(pageNumber, isCurrent) {
          if (this.ariaPageLabel && (!isCurrent || !this.ariaCurrentLabel)) {
            return this.ariaPageLabel + ' ' + pageNumber + '.';
          } else if (this.ariaPageLabel && isCurrent && this.ariaCurrentLabel) {
            return this.ariaCurrentLabel + ', ' + this.ariaPageLabel + ' ' + pageNumber + '.';
          }

          return null;
        }

      }
    };

    /* script */
    const __vue_script__$h = script$h;

    /* template */
    var __vue_render__$f = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{class:_vm.rootClasses},[(_vm.hasPreviousSlot)?_vm._t("previous",[_c('o-icon',{attrs:{"icon":_vm.iconPrev,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],{"linkClass":_vm.linkClasses,"linkCurrentClass":_vm.linkCurrentClasses,"page":_vm.getPage(_vm.current - 1, {
                class: _vm.prevBtnClasses,
                'aria-label': _vm.ariaPreviousLabel
        })}):_c('o-pagination-button',{class:_vm.prevBtnClasses,attrs:{"linkClass":_vm.linkClasses,"linkCurrentClass":_vm.linkCurrentClasses,"page":_vm.getPage(_vm.current - 1)}},[_c('o-icon',{attrs:{"icon":_vm.iconPrev,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],1),(_vm.hasNextSlot)?_vm._t("next",[_c('o-icon',{attrs:{"icon":_vm.iconNext,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],{"linkClass":_vm.linkClasses,"linkCurrentClass":_vm.linkCurrentClasses,"page":_vm.getPage(_vm.current + 1, {
                class: _vm.nextBtnClasses,
                'aria-label': _vm.ariaNextLabel,
        })}):_c('o-pagination-button',{class:_vm.nextBtnClasses,attrs:{"linkClass":_vm.linkClasses,"linkCurrentClass":_vm.linkCurrentClasses,"page":_vm.getPage(_vm.current + 1)}},[_c('o-icon',{attrs:{"icon":_vm.iconNext,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],1),(_vm.simple)?_c('small',{class:_vm.infoClasses},[(_vm.perPage == 1)?[_vm._v(" "+_vm._s(_vm.firstItem)+" / "+_vm._s(_vm.total)+" ")]:[_vm._v(" "+_vm._s(_vm.firstItem)+"-"+_vm._s(Math.min(_vm.current * _vm.perPage, _vm.total))+" / "+_vm._s(_vm.total)+" ")]],2):_c('ul',{class:_vm.listClasses},[(_vm.hasFirst)?_c('li',[(_vm.hasDefaultSlot)?_vm._t("default",null,{"page":_vm.getPage(1),"linkClass":_vm.linkClasses,"linkCurrentClass":_vm.linkCurrentClasses}):_c('o-pagination-button',{attrs:{"linkClass":_vm.linkClasses,"linkCurrentClass":_vm.linkCurrentClasses,"page":_vm.getPage(1)}})],2):_vm._e(),(_vm.hasFirstEllipsis)?_c('li',[_c('span',{class:_vm.ellipsisClasses},[_vm._v("…")])]):_vm._e(),_vm._l((_vm.pagesInRange),function(page){return _c('li',{key:page.number},[(_vm.hasDefaultSlot)?_vm._t("default",null,{"page":page,"linkClass":_vm.linkClasses,"linkCurrentClass":_vm.linkCurrentClasses}):_c('o-pagination-button',{attrs:{"linkClass":_vm.linkClasses,"linkCurrentClass":_vm.linkCurrentClasses,"page":page}})],2)}),(_vm.hasLastEllipsis)?_c('li',[_c('span',{class:_vm.ellipsisClasses},[_vm._v("…")])]):_vm._e(),(_vm.hasLast)?_c('li',[(_vm.hasDefaultSlot)?_vm._t("default",null,{"page":_vm.getPage(_vm.pageCount),"linkClass":_vm.linkClasses,"linkCurrentClass":_vm.linkCurrentClasses}):_c('o-pagination-button',{attrs:{"linkClass":_vm.linkClasses,"linkCurrentClass":_vm.linkCurrentClasses,"page":_vm.getPage(_vm.pageCount)}})],2):_vm._e()],2)],2)};
    var __vue_staticRenderFns__$f = [];

      /* style */
      const __vue_inject_styles__$h = undefined;
      /* scoped */
      const __vue_scope_id__$h = undefined;
      /* module identifier */
      const __vue_module_identifier__$h = undefined;
      /* functional template */
      const __vue_is_functional_template__$h = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$h = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
        __vue_inject_styles__$h,
        __vue_script__$h,
        __vue_scope_id__$h,
        __vue_is_functional_template__$h,
        __vue_module_identifier__$h,
        false,
        undefined,
        undefined,
        undefined
      );

    const Plugin$c = {
      install(Vue) {
        registerComponent(Vue, __vue_component__$h);
        registerComponent(Vue, __vue_component__$g);
      }

    };
    use(Plugin$c);

    //
    /**
     * Select an option from a set
     * @displayName Radio
     * @example ./examples/Radio.md
     * @style _radio.scss
     */

    var script$i = {
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
    const __vue_script__$i = script$i;

    /* template */
    var __vue_render__$g = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{ref:"label",class:_vm.rootClasses,attrs:{"disabled":_vm.disabled},on:{"click":_vm.focus,"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.$refs.label.click()}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",class:_vm.checkClasses,attrs:{"type":"radio","disabled":_vm.disabled,"required":_vm.required,"name":_vm.name},domProps:{"value":_vm.nativeValue,"checked":_vm._q(_vm.computedValue,_vm.nativeValue)},on:{"click":function($event){$event.stopPropagation();},"change":function($event){_vm.computedValue=_vm.nativeValue;}}}),_c('span',{class:_vm.labelClasses},[_vm._t("default")],2)])};
    var __vue_staticRenderFns__$g = [];

      /* style */
      const __vue_inject_styles__$i = undefined;
      /* scoped */
      const __vue_scope_id__$i = undefined;
      /* module identifier */
      const __vue_module_identifier__$i = undefined;
      /* functional template */
      const __vue_is_functional_template__$i = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$i = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
        __vue_inject_styles__$i,
        __vue_script__$i,
        __vue_scope_id__$i,
        __vue_is_functional_template__$i,
        __vue_module_identifier__$i,
        false,
        undefined,
        undefined,
        undefined
      );

    const Plugin$d = {
      install(Vue) {
        registerComponent(Vue, __vue_component__$i);
      }

    };
    use(Plugin$d);

    const Plugin$e = {
      install(Vue) {
        registerComponent(Vue, __vue_component__$a);
      }

    };
    use(Plugin$e);

    /**
     * A placeholder for content to load
     * @displayName Skeleton
     * @example ./examples/Skeleton.md
     * @style _skeleton.scss
     */

    var script$j = {
      name: 'OSkeleton',
      mixins: [BaseComponentMixin],
      configField: 'skeleton',
      props: {
        /** Show or hide loader	 */
        active: {
          type: Boolean,
          default: true
        },

        /** Show a loading animation */
        animated: {
          type: Boolean,
          default: true
        },

        /** Custom width */
        width: [Number, String],

        /** Custom height */
        height: [Number, String],

        /** Show a circle shape */
        circle: Boolean,

        /** Rounded style */
        rounded: {
          type: Boolean,
          default: true
        },

        /** Number of shapes to display */
        count: {
          type: Number,
          default: 1
        },

        /**
         * Skeleton position in relation to the element
         * @values left, centered, right
         */
        position: {
          type: String,
          default: 'left',

          validator(value) {
            return ['left', 'centered', 'right'].indexOf(value) > -1;
          }

        },

        /**
         * Size of skeleton
         * @values small, medium, large
         */
        size: String,
        rootClass: [String, Function, Array],
        animationClass: [String, Function, Array],
        positionClass: [String, Function, Array],
        itemClass: [String, Function, Array],
        itemRoundedClass: [String, Function, Array],
        sizeClass: [String, Function, Array]
      },

      render(h) {
        if (!this.active) return;
        const items = [];
        const width = this.width;
        const height = this.height;

        for (let i = 0; i < this.count; i++) {
          items.push(h('div', {
            staticClass: this.computedClass('itemClass', 'o-sklt__item'),
            class: [{
              [this.computedClass('itemRoundedClass', 'o-sklt__item--rounded')]: this.rounded
            }, {
              [this.computedClass('animationClass', 'o-sklt__item--animated')]: this.animated
            }, {
              [this.computedClass('sizeClass', 'o-sklt__item--', this.size)]: this.size
            }],
            key: i,
            style: {
              height: toCssDimension(height),
              width: toCssDimension(width),
              borderRadius: this.circle ? '50%' : null
            }
          }));
        }

        return h('div', {
          staticClass: this.computedClass('rootClass', 'o-sklt'),
          class: [{
            [this.computedClass('positionClass', 'o-sklt--', this.position)]: this.position
          }]
        }, items);
      }

    };

    /* script */
    const __vue_script__$j = script$j;

    /* template */

      /* style */
      const __vue_inject_styles__$j = undefined;
      /* scoped */
      const __vue_scope_id__$j = undefined;
      /* module identifier */
      const __vue_module_identifier__$j = undefined;
      /* functional template */
      const __vue_is_functional_template__$j = undefined;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$j = /*#__PURE__*/normalizeComponent(
        {},
        __vue_inject_styles__$j,
        __vue_script__$j,
        __vue_scope_id__$j,
        __vue_is_functional_template__$j,
        __vue_module_identifier__$j,
        false,
        undefined,
        undefined,
        undefined
      );

    const Plugin$f = {
      install(Vue) {
        registerComponent(Vue, __vue_component__$j);
      }

    };
    use(Plugin$f);

    //
    /**
     * A sidebar to use as left/right overlay or static
     * @displayName Sidebar
     * @example ./examples/Sidebar.md
     * @style _sidebar.scss
     */

    var script$k = {
      name: 'OSidebar',
      mixins: [BaseComponentMixin, MatchMediaMixin],
      configField: 'sidebar',
      props: {
        /** To control the behaviour of the sidebar programmatically, use the .sync modifier (Vue 2.x) or v-model:open (Vue 3.x) to make it two-way binding */
        open: Boolean,

        /**
        * Color of the sidebar, optional
        * @values primary, info, success, warning, danger, and any other custom color
        */
        variant: [String, Object],

        /** Show an overlay like modal */
        overlay: Boolean,

        /**
         * Skeleton position in relation to the window
         * @values fixed, absolute, static
         */
        position: {
          type: String,
          default: () => {
            return getValueByPath(config, 'sidebar.position', 'fixed');
          },
          validator: value => {
            return ['fixed', 'absolute', 'static'].indexOf(value) >= 0;
          }
        },

        /** Show sidebar in fullheight */
        fullheight: Boolean,

        /** Show sidebar in fullwidth */
        fullwidth: Boolean,

        /** Show the sidebar on right */
        right: Boolean,

        /**
         * Custom layout on mobile
         * @values fullwidth, reduced, hidden
         */
        mobile: {
          type: String,
          validator: value => {
            return ['', 'fullwidth', 'reduced', 'hidden'].indexOf(value) >= 0;
          }
        },

        /** Show a small sidebar */
        reduce: Boolean,

        /** Expand sidebar on hover when reduced or mobile is reduce */
        expandOnHover: Boolean,

        /** Expand sidebar on hover with fixed position when reduced or mobile is reduce */
        expandOnHoverFixed: Boolean,

        /**
         * Sidebar cancel options
         * @values true, false, 'escape', 'outside'
         */
        canCancel: {
          type: [Array, Boolean],
          default: () => {
            return getValueByPath(config, 'sidebar.canCancel', ['escape', 'outside']);
          }
        },

        /**
         * Callback on cancel
         */
        onCancel: {
          type: Function,
          default: () => {}
        },
        scroll: {
          type: String,
          default: () => {
            return getValueByPath(config, 'sidebar.scroll', 'clip');
          },
          validator: value => {
            return ['clip', 'keep'].indexOf(value) >= 0;
          }
        },
        rootClass: [String, Function, Array],
        overlayClass: [String, Function, Array],
        contentClass: [String, Function, Array],
        fixedClass: [String, Function, Array],
        staticClass: [String, Function, Array],
        absoluteClass: [String, Function, Array],
        fullheightClass: [String, Function, Array],
        fullwidthClass: [String, Function, Array],
        rightClass: [String, Function, Array],
        reduceClass: [String, Function, Array],
        expandOnHoverClass: [String, Function, Array],
        expandOnHoverFixedClass: [String, Function, Array],
        mobileReduceClass: [String, Function, Array],
        mobileHideClass: [String, Function, Array],
        mobileFullwidthClass: [String, Function, Array],
        variantClass: [String, Function, Array],
        mobileClass: [String, Function, Array]
      },

      data() {
        return {
          isOpen: this.open,
          transitionName: null,
          animating: true,
          savedScrollTop: null
        };
      },

      computed: {
        rootClasses() {
          return [this.computedClass('rootClass', 'o-side'), {
            [this.computedClass('mobileClass', 'o-side--mobile')]: this.isMatchMedia
          }];
        },

        overlayClasses() {
          return [this.computedClass('overlayClass', 'o-side__overlay')];
        },

        contentClasses() {
          return [this.computedClass('contentClass', 'o-side__content'), {
            [this.computedClass('variantClass', 'o-side__content--', this.variant)]: this.variant
          }, {
            [this.computedClass('fixedClass', 'o-side__content--fixed')]: this.isFixed
          }, {
            [this.computedClass('staticClass', 'o-side__content--static')]: this.isStatic
          }, {
            [this.computedClass('absoluteClass', 'o-side__content--absolute')]: this.isAbsolute
          }, {
            [this.computedClass('fullheightClass', 'o-side__content--fullheight')]: this.fullheight
          }, {
            [this.computedClass('fullwidthClass', 'o-side__content--fullwidth')]: this.fullwidth
          }, {
            [this.computedClass('rightClass', 'o-side__content--right')]: this.right
          }, {
            [this.computedClass('reduceClass', 'o-side__content--mini')]: this.reduce
          }, {
            [this.computedClass('expandOnHoverClass', 'o-side__content--mini-expand')]: this.expandOnHover && this.mobile !== 'fullwidth'
          }, {
            [this.computedClass('expandOnHoverFixedClass', 'o-side__content--expand-mini-hover-fixed')]: this.expandOnHover && this.expandOnHoverFixed && this.mobile !== 'fullwidth'
          }, {
            [this.computedClass('mobileReduceClass', 'o-side__content--mini-mobile')]: this.mobile === 'reduced' && this.isMatchMedia
          }, {
            [this.computedClass('mobileHideClass', 'o-side__content--hidden-mobile')]: this.mobile === 'hidden' && this.isMatchMedia
          }, {
            [this.computedClass('mobileFullwidthClass', 'o-side__content--fullwidth-mobile')]: this.mobile === 'fullwidth' && this.isMatchMedia
          }];
        },

        cancelOptions() {
          return typeof this.canCancel === 'boolean' ? this.canCancel ? getValueByPath(config, 'sidebar.canCancel', ['escape', 'outside']) : [] : this.canCancel;
        },

        isStatic() {
          return this.position === 'static';
        },

        isFixed() {
          return this.position === 'fixed';
        },

        isAbsolute() {
          return this.position === 'absolute';
        }

      },
      watch: {
        open: {
          handler(value) {
            this.isOpen = value;

            if (this.overlay) {
              this.handleScroll();
            }

            const open = this.right ? !value : value;
            this.transitionName = !open ? 'slide-prev' : 'slide-next';
          },

          immediate: true
        }
      },
      methods: {
        /**
         * White-listed items to not close when clicked.
         * Add sidebar content and all children.
         */
        whiteList() {
          const whiteList = [];
          whiteList.push(this.$refs.sidebarContent); // Add all chidren from dropdown

          if (this.$refs.sidebarContent !== undefined) {
            const children = this.$refs.sidebarContent.querySelectorAll('*');

            for (const child of children) {
              whiteList.push(child);
            }
          }

          return whiteList;
        },

        /**
        * Keypress event that is bound to the document.
        */
        keyPress({
          key
        }) {
          if (this.isFixed) {
            if (this.isOpen && (key === 'Escape' || key === 'Esc')) this.cancel('escape');
          }
        },

        /**
        * Close the Sidebar if canCancel and call the onCancel prop (function).
        */
        cancel(method) {
          if (this.cancelOptions.indexOf(method) < 0) return;
          if (this.isStatic) return;
          this.onCancel.apply(null, arguments);
          this.close();
        },

        /**
        * Call the onCancel prop (function) and emit events
        */
        close() {
          this.isOpen = false;
          this.$emit('close');
          this.$emit('update:open', false);
        },

        /**
         * Close fixed sidebar if clicked outside.
         */
        clickedOutside(event) {
          if (this.isFixed) {
            if (this.isOpen && !this.animating) {
              if (this.whiteList().indexOf(event.target) < 0) {
                this.cancel('outside');
              }
            }
          }
        },

        /**
        * Transition before-enter hook
        */
        beforeEnter() {
          this.animating = true;
        },

        /**
        * Transition after-leave hook
        */
        afterEnter() {
          this.animating = false;
        },

        handleScroll() {
          if (typeof window === 'undefined') return;

          if (this.scroll === 'clip') {
            if (this.open) {
              document.documentElement.classList.add('o-clipped');
            } else {
              document.documentElement.classList.remove('o-clipped');
            }

            return;
          }

          this.savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;

          if (this.open) {
            document.body.classList.add('o-noscroll');
          } else {
            document.body.classList.remove('o-noscroll');
          }

          if (this.open) {
            document.body.style.top = `-${this.savedScrollTop}px`;
            return;
          }

          document.documentElement.scrollTop = this.savedScrollTop;
          document.body.style.top = null;
          this.savedScrollTop = null;
        }

      },

      created() {
        if (typeof window !== 'undefined') {
          document.addEventListener('keyup', this.keyPress);
          document.addEventListener('click', this.clickedOutside);
        }
      },

      mounted() {
        if (typeof window !== 'undefined') {
          if (this.isFixed) {
            document.body.appendChild(this.$el);
          }

          if (this.overlay && this.open) {
            this.handleScroll();
          }
        }
      },

      beforeDestroy() {
        if (typeof window !== 'undefined') {
          document.removeEventListener('keyup', this.keyPress);
          document.removeEventListener('click', this.clickedOutside);

          if (this.overlay) {
            // reset scroll
            document.documentElement.classList.remove('o-clipped');
            const savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
            document.body.classList.remove('o-noscroll');
            document.documentElement.scrollTop = savedScrollTop;
            document.body.style.top = null;
          }
        }

        if (this.isFixed) {
          removeElement(this.$el);
        }
      }

    };

    /* script */
    const __vue_script__$k = script$k;

    /* template */
    var __vue_render__$h = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClasses},[(_vm.overlay && _vm.isOpen)?_c('div',{class:_vm.overlayClasses}):_vm._e(),_c('transition',{attrs:{"name":_vm.transitionName},on:{"before-enter":_vm.beforeEnter,"after-enter":_vm.afterEnter}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isOpen),expression:"isOpen"}],ref:"sidebarContent",class:_vm.contentClasses},[_vm._t("default")],2)])],1)};
    var __vue_staticRenderFns__$h = [];

      /* style */
      const __vue_inject_styles__$k = undefined;
      /* scoped */
      const __vue_scope_id__$k = undefined;
      /* module identifier */
      const __vue_module_identifier__$k = undefined;
      /* functional template */
      const __vue_is_functional_template__$k = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$k = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
        __vue_inject_styles__$k,
        __vue_script__$k,
        __vue_scope_id__$k,
        __vue_is_functional_template__$k,
        __vue_module_identifier__$k,
        false,
        undefined,
        undefined,
        undefined
      );

    const Plugin$g = {
      install(Vue) {
        registerComponent(Vue, __vue_component__$k);
      }

    };
    use(Plugin$g);

    //
    /**
     * Display a brief helper text to your user
     * @displayName Tooltip
     * @example ./examples/Tooltip.md
     * @style _tooltip.scss
     */

    var script$l = {
      name: 'OTooltip',
      mixins: [BaseComponentMixin],
      configField: 'tooltip',
      props: {
        /** Whether tooltip is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding */
        active: {
          type: Boolean,
          default: true
        },

        /** Tooltip text */
        label: String,

        /** Tooltip delay before it appears (number in ms) */
        delay: Number,

        /**
         * Tooltip position in relation to the element
         * @values top, bottom, left, right
         */
        position: {
          type: String,
          default: () => {
            return getValueByPath(config, 'tooltip.position', 'top');
          },

          validator(value) {
            return ['top', 'bottom', 'left', 'right'].indexOf(value) > -1;
          }

        },

        /**
         * Tooltip trigger events
         * @values hover, click, focus, contextmenu
         */
        triggers: {
          type: Array,
          default: () => {
            return getValueByPath(config, 'tooltip.triggers', ['hover']);
          }
        },

        /** Tooltip will be always active */
        always: Boolean,

        /** Tooltip will have an animation */
        animated: {
          type: Boolean,
          default: true
        },

        /** Tooltip default animation */
        animation: {
          type: String,
          default: () => {
            return getValueByPath(config, 'tooltip.animation', 'fade');
          }
        },

        /**
         * Tooltip auto close options
         * @values true, false, 'inside', 'outside'
         */
        autoClose: {
          type: [Array, Boolean],
          default: true
        },

        /** Tooltip will be multilined */
        multiline: Boolean,

        /** Append tooltip content to body */
        appendToBody: Boolean,

        /**
        * Color of the tooltip
        * @values primary, info, success, warning, danger, and any other custom color
        */
        variant: [String, Function, Array],
        rootClass: [String, Function, Array],
        contentClass: [String, Function, Array],
        orderClass: [String, Function, Array],
        triggerClass: [String, Function, Array],
        multilineClass: [String, Function, Array],
        alwaysClass: [String, Function, Array],
        variantClass: [String, Function, Array],
        arrowClass: [String, Function, Array],
        arrowOrderClass: [String, Function, Array]
      },

      data() {
        return {
          isActive: false,
          triggerStyle: {},
          bodyEl: undefined // Used to append to body

        };
      },

      computed: {
        rootClasses() {
          return [this.computedClass('rootClass', 'o-tip')];
        },

        triggerClasses() {
          return [this.computedClass('triggerClass', 'o-tip__trigger')];
        },

        arrowClasses() {
          return [this.computedClass('arrowClass', 'o-tip__arrow'), {
            [this.computedClass('arrowOrderClass', 'o-tip__arrow--', this.position)]: this.position
          }, {
            [this.computedClass('variantArrowClass', 'o-tip__arrow--', this.variant)]: this.variant
          }];
        },

        contentClasses() {
          return [this.computedClass('contentClass', 'o-tip__content'), {
            [this.computedClass('orderClass', 'o-tip__content--', this.position)]: this.position
          }, {
            [this.computedClass('variantClass', 'o-tip__content--', this.variant)]: this.variant
          }, {
            [this.computedClass('multilineClass', 'o-tip__content--multiline')]: this.multiline
          }, {
            [this.computedClass('alwaysClass', 'o-tip__content--always')]: this.always
          }];
        },

        newAnimation() {
          return this.animated ? this.animation : undefined;
        }

      },
      watch: {
        isActive(value) {
          if (value && this.appendToBody) {
            this.updateAppendToBody();
          }
        }

      },
      methods: {
        updateAppendToBody() {
          const tooltip = this.$refs.tooltip;
          const trigger = this.$refs.trigger;

          if (tooltip && trigger) {
            // update wrapper tooltip
            const tooltipEl = this.$data.bodyEl.children[0];
            tooltipEl.classList.forEach(item => tooltipEl.classList.remove(item));

            if (this.$vnode && this.$vnode.data && this.$vnode.data.staticClass) {
              tooltipEl.classList.add(this.$vnode.data.staticClass);
            }

            this.rootClasses.forEach(item => {
              if (typeof item === 'object') {
                Object.keys(item).filter(key => !!item[key]).forEach(key => tooltipEl.classList.add(key));
              } else {
                tooltipEl.classList.add(item);
              }
            });
            tooltipEl.style.width = `${trigger.clientWidth}px`;
            tooltipEl.style.height = `${trigger.clientHeight}px`;
            const rect = trigger.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            const left = rect.left + window.scrollX;
            const wrapper = this.$data.bodyEl;
            wrapper.style.position = 'absolute';
            wrapper.style.top = `${top}px`;
            wrapper.style.left = `${left}px`;
            wrapper.style.zIndex = this.isActive || this.always ? '99' : '-1';
            this.triggerStyle = {
              zIndex: this.isActive || this.always ? '100' : undefined
            };
          }
        },

        onClick() {
          if (this.triggers.indexOf('click') < 0) return; // if not active, toggle after clickOutside event
          // this fixes toggling programmatic

          this.$nextTick(() => {
            setTimeout(() => this.open());
          });
        },

        onHover() {
          if (this.triggers.indexOf('hover') < 0) return;
          this.open();
        },

        onFocus() {
          if (this.triggers.indexOf('focus') < 0) return;
          this.open();
        },

        onContextMenu(event) {
          if (this.triggers.indexOf('contextmenu') < 0) return;
          event.preventDefault();
          this.open();
        },

        open() {
          if (this.delay) {
            this.timer = setTimeout(() => {
              this.isActive = true;
              this.timer = null;
            }, this.delay);
          } else {
            this.isActive = true;
          }
        },

        close() {
          if (typeof this.autoClose === 'boolean') {
            this.isActive = !this.autoClose;
          }

          if (this.autoClose && this.timer) clearTimeout(this.timer);
        },

        /**
        * Close tooltip if clicked outside.
        */
        clickedOutside(event) {
          if (this.isActive) {
            if (Array.isArray(this.autoClose)) {
              if (this.autoClose.indexOf('outside') >= 0) {
                if (!this.isInWhiteList(event.target)) this.isActive = false;
              } else if (this.autoClose.indexOf('inside') >= 0) {
                if (this.isInWhiteList(event.target)) this.isActive = false;
              }
            }
          }
        },

        /**
         * Keypress event that is bound to the document
         */
        keyPress({
          key
        }) {
          if (this.isActive && (key === 'Escape' || key === 'Esc')) {
            if (Array.isArray(this.autoClose)) {
              if (this.autoClose.indexOf('escape') >= 0) this.isActive = false;
            }
          }
        },

        /**
        * White-listed items to not close when clicked.
        */
        isInWhiteList(el) {
          if (el === this.$refs.content) return true; // All chidren from content

          if (this.$refs.content !== undefined) {
            const children = this.$refs.content.querySelectorAll('*');

            for (const child of children) {
              if (el === child) {
                return true;
              }
            }
          }

          return false;
        }

      },

      mounted() {
        if (this.appendToBody) {
          this.$data.bodyEl = createAbsoluteElement(this.$refs.content);
          this.updateAppendToBody();
        }
      },

      created() {
        if (typeof window !== 'undefined') {
          document.addEventListener('click', this.clickedOutside);
          document.addEventListener('keyup', this.keyPress);
        }
      },

      beforeDestroy() {
        if (typeof window !== 'undefined') {
          document.removeEventListener('click', this.clickedOutside);
          document.removeEventListener('keyup', this.keyPress);
        }

        if (this.appendToBody) {
          removeElement(this.$data.bodyEl);
        }
      }

    };

    /* script */
    const __vue_script__$l = script$l;

    /* template */
    var __vue_render__$i = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{ref:"tooltip",class:_vm.rootClasses},[_c('transition',{attrs:{"name":_vm.newAnimation}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.active && (_vm.isActive || _vm.always)),expression:"active && (isActive || always)"}],ref:"content",class:_vm.contentClasses},[_c('span',{class:_vm.arrowClasses}),(_vm.label)?[_vm._v(_vm._s(_vm.label))]:(_vm.$slots.default)?[_vm._t("content")]:_vm._e()],2)]),_c('div',{ref:"trigger",class:_vm.triggerClasses,style:(_vm.triggerStyle),on:{"click":_vm.onClick,"contextmenu":_vm.onContextMenu,"mouseenter":_vm.onHover,"!focus":function($event){return _vm.onFocus($event)},"!blur":function($event){return _vm.close($event)},"mouseleave":_vm.close}},[_vm._t("default")],2)],1)};
    var __vue_staticRenderFns__$i = [];

      /* style */
      const __vue_inject_styles__$l = undefined;
      /* scoped */
      const __vue_scope_id__$l = undefined;
      /* module identifier */
      const __vue_module_identifier__$l = undefined;
      /* functional template */
      const __vue_is_functional_template__$l = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$l = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$i, staticRenderFns: __vue_staticRenderFns__$i },
        __vue_inject_styles__$l,
        __vue_script__$l,
        __vue_scope_id__$l,
        __vue_is_functional_template__$l,
        __vue_module_identifier__$l,
        false,
        undefined,
        undefined,
        undefined
      );

    //
    var script$m = {
      name: 'OSliderThumb',
      components: {
        [__vue_component__$l.name]: __vue_component__$l
      },
      configField: 'slider',
      inheritAttrs: false,
      inject: {
        $slider: {
          name: '$slider'
        }
      },
      props: {
        value: {
          type: Number,
          default: 0
        },
        variant: {
          variant: String,
          default: ''
        },
        tooltip: {
          type: Boolean,
          default: true
        },
        indicator: {
          type: Boolean,
          default: false
        },
        customFormatter: Function,
        format: {
          type: String,
          default: 'raw',
          validator: value => {
            return ['raw', 'percent'].indexOf(value) >= 0;
          }
        },
        locale: {
          type: [String, Array],
          default: () => {
            return getValueByPath(config, 'locale');
          }
        },
        tooltipAlways: {
          type: Boolean,
          default: false
        }
      },

      data() {
        return {
          isFocused: false,
          dragging: false,
          startX: 0,
          startPosition: 0,
          newPosition: null,
          oldValue: this.value
        };
      },

      computed: {
        disabled() {
          return this.$parent.disabled;
        },

        max() {
          return this.$parent.max;
        },

        min() {
          return this.$parent.min;
        },

        step() {
          return this.$parent.step;
        },

        precision() {
          return this.$parent.precision;
        },

        currentPosition() {
          return `${(this.value - this.min) / (this.max - this.min) * 100}%`;
        },

        wrapperStyle() {
          return {
            left: this.currentPosition
          };
        },

        formattedValue() {
          if (typeof this.customFormatter !== 'undefined') {
            return this.customFormatter(this.value);
          }

          if (this.format === 'percent') {
            return new Intl.NumberFormat(this.locale, {
              style: 'percent'
            }).format((this.value - this.min) / (this.max - this.min));
          }

          return new Intl.NumberFormat(this.locale).format(this.value);
        }

      },
      methods: {
        onFocus() {
          this.isFocused = true;
        },

        onBlur() {
          this.isFocused = false;
        },

        onButtonDown(event) {
          if (this.disabled) return;
          event.preventDefault();
          this.onDragStart(event);

          if (typeof window !== 'undefined') {
            document.addEventListener('mousemove', this.onDragging);
            document.addEventListener('touchmove', this.onDragging);
            document.addEventListener('mouseup', this.onDragEnd);
            document.addEventListener('touchend', this.onDragEnd);
            document.addEventListener('contextmenu', this.onDragEnd);
          }
        },

        onLeftKeyDown() {
          if (this.disabled || this.value === this.min) return;
          this.newPosition = parseFloat(this.currentPosition) - this.step / (this.max - this.min) * 100;
          this.setPosition(this.newPosition);
          this.$parent.emitValue('change');
        },

        onRightKeyDown() {
          if (this.disabled || this.value === this.max) return;
          this.newPosition = parseFloat(this.currentPosition) + this.step / (this.max - this.min) * 100;
          this.setPosition(this.newPosition);
          this.$parent.emitValue('change');
        },

        onHomeKeyDown() {
          if (this.disabled || this.value === this.min) return;
          this.newPosition = 0;
          this.setPosition(this.newPosition);
          this.$parent.emitValue('change');
        },

        onEndKeyDown() {
          if (this.disabled || this.value === this.max) return;
          this.newPosition = 100;
          this.setPosition(this.newPosition);
          this.$parent.emitValue('change');
        },

        onDragStart(event) {
          this.dragging = true;
          this.$emit('dragstart');

          if (event.type === 'touchstart') {
            event.clientX = event.touches[0].clientX;
          }

          this.startX = event.clientX;
          this.startPosition = parseFloat(this.currentPosition);
          this.newPosition = this.startPosition;
        },

        onDragging(event) {
          if (this.dragging) {
            if (event.type === 'touchmove') {
              event.clientX = event.touches[0].clientX;
            }

            const diff = (event.clientX - this.startX) / this.$parent.sliderSize() * 100;
            this.newPosition = this.startPosition + diff;
            this.setPosition(this.newPosition);
          }
        },

        onDragEnd() {
          this.dragging = false;
          this.$emit('dragend');

          if (this.value !== this.oldValue) {
            this.$parent.emitValue('change');
          }

          this.setPosition(this.newPosition);

          if (typeof window !== 'undefined') {
            document.removeEventListener('mousemove', this.onDragging);
            document.removeEventListener('touchmove', this.onDragging);
            document.removeEventListener('mouseup', this.onDragEnd);
            document.removeEventListener('touchend', this.onDragEnd);
            document.removeEventListener('contextmenu', this.onDragEnd);
          }
        },

        setPosition(percent) {
          if (percent === null || isNaN(percent)) return;

          if (percent < 0) {
            percent = 0;
          } else if (percent > 100) {
            percent = 100;
          }

          const stepLength = 100 / ((this.max - this.min) / this.step);
          const steps = Math.round(percent / stepLength);
          let value = steps * stepLength / 100 * (this.max - this.min) + this.min;
          value = parseFloat(value.toFixed(this.precision));
          this.$emit('input', value);

          if (!this.dragging && value !== this.oldValue) {
            this.oldValue = value;
          }
        }

      }
    };

    /* script */
    const __vue_script__$m = script$m;

    /* template */
    var __vue_render__$j = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.$slider.thumbWrapperClasses,style:(_vm.wrapperStyle)},[_c('o-tooltip',{attrs:{"label":_vm.formattedValue,"variant":_vm.variant,"always":_vm.dragging || _vm.isFocused || _vm.tooltipAlways,"active":!_vm.disabled && _vm.tooltip}},[_c('div',_vm._b({class:_vm.$slider.thumbClasses,attrs:{"tabindex":_vm.disabled ? false : 0},on:{"mousedown":_vm.onButtonDown,"touchstart":_vm.onButtonDown,"focus":_vm.onFocus,"blur":_vm.onBlur,"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"left",37,$event.key,["Left","ArrowLeft"])){ return null; }if('button' in $event && $event.button !== 0){ return null; }$event.preventDefault();return _vm.onLeftKeyDown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"right",39,$event.key,["Right","ArrowRight"])){ return null; }if('button' in $event && $event.button !== 2){ return null; }$event.preventDefault();return _vm.onRightKeyDown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }$event.preventDefault();return _vm.onLeftKeyDown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }$event.preventDefault();return _vm.onRightKeyDown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"home",undefined,$event.key,undefined)){ return null; }$event.preventDefault();return _vm.onHomeKeyDown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"end",undefined,$event.key,undefined)){ return null; }$event.preventDefault();return _vm.onEndKeyDown($event)}]}},'div',_vm.$attrs,false),[(_vm.indicator)?_c('span',[_vm._v(_vm._s(_vm.formattedValue))]):_vm._e()])])],1)};
    var __vue_staticRenderFns__$j = [];

      /* style */
      const __vue_inject_styles__$m = undefined;
      /* scoped */
      const __vue_scope_id__$m = undefined;
      /* module identifier */
      const __vue_module_identifier__$m = undefined;
      /* functional template */
      const __vue_is_functional_template__$m = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$m = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$j, staticRenderFns: __vue_staticRenderFns__$j },
        __vue_inject_styles__$m,
        __vue_script__$m,
        __vue_scope_id__$m,
        __vue_is_functional_template__$m,
        __vue_module_identifier__$m,
        false,
        undefined,
        undefined,
        undefined
      );

    //
    /**
     * @displayName Slider Tick
     */

    var script$n = {
      name: 'OSliderTick',
      mixins: [BaseComponentMixin],
      configField: 'slider',
      inject: {
        $slider: {
          name: '$slider'
        }
      },
      props: {
        /** Value of single tick */
        value: {
          variant: Number,
          default: 0
        },
        tickClass: [String, Function, Array],
        tickHiddenClass: [String, Function, Array],
        tickLabelClass: [String, Function, Array]
      },
      computed: {
        rootClasses() {
          return [this.computedClass('tickClass', 'o-slide__tick'), {
            [this.computedClass('tickHiddenClass', 'o-slide__tick--hidden')]: this.hidden
          }];
        },

        tickLabelClasses() {
          return [this.computedClass('tickLabelClass', 'o-slide__tick-label')];
        },

        position() {
          const pos = (this.value - this.$parent.min) / (this.$parent.max - this.$parent.min) * 100;
          return pos >= 0 && pos <= 100 ? pos : 0;
        },

        hidden() {
          return this.value === this.$parent.min || this.value === this.$parent.max;
        },

        tickStyle() {
          return {
            'left': this.position + '%'
          };
        }

      },

      created() {
        if (!this.$slider) {
          throw new Error('You should wrap oSliderTick on a oSlider');
        }
      }

    };

    /* script */
    const __vue_script__$n = script$n;

    /* template */
    var __vue_render__$k = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClasses,style:(_vm.tickStyle)},[(_vm.$slots.default)?_c('span',{class:_vm.tickLabelClasses},[_vm._t("default")],2):_vm._e()])};
    var __vue_staticRenderFns__$k = [];

      /* style */
      const __vue_inject_styles__$n = undefined;
      /* scoped */
      const __vue_scope_id__$n = undefined;
      /* module identifier */
      const __vue_module_identifier__$n = undefined;
      /* functional template */
      const __vue_is_functional_template__$n = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$n = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$k, staticRenderFns: __vue_staticRenderFns__$k },
        __vue_inject_styles__$n,
        __vue_script__$n,
        __vue_scope_id__$n,
        __vue_is_functional_template__$n,
        __vue_module_identifier__$n,
        false,
        undefined,
        undefined,
        undefined
      );

    //
    /**
     * A slider to select a value or range from a given range
     * @displayName Slider
     * @requires ./SliderTick.vue
     * @example ./examples/Slider.md
     * @style _slider.scss
     */

    var script$o = {
      name: 'OSlider',
      components: {
        [__vue_component__$m.name]: __vue_component__$m,
        [__vue_component__$n.name]: __vue_component__$n
      },
      configField: 'slider',
      mixins: [BaseComponentMixin],

      provide() {
        return {
          $slider: this
        };
      },

      props: {
        /** @model */
        value: {
          type: [Number, Array],
          default: 0
        },

        /** Minimum value */
        min: {
          type: Number,
          default: 0
        },

        /** Maximum  value */
        max: {
          type: Number,
          default: 100
        },

        /** Step interval of ticks */
        step: {
          type: Number,
          default: 1
        },

        /**
         * Color of the slider
         * @values primary, info, success, warning, danger, and any other custom color
         */
        variant: {
          type: String,
          default: () => {
            return getValueByPath(config, 'slider.variant', 'primary');
          }
        },

        /**
         * Vertical size of slider, optional
         * @values small, medium, large
         */
        size: String,

        /** Show tick marks */
        ticks: {
          type: Boolean,
          default: false
        },

        /** Show tooltip when thumb is being dragged */
        tooltip: {
          type: Boolean,
          default: true
        },

        /**
         * Color of the tooltip
         * @values primary, info, success, warning, danger, and any other custom color
         */
        tooltipVariant: String,

        /** Rounded thumb */
        rounded: {
          type: Boolean,
          default: () => {
            return getValueByPath(config, 'slider.rounded', false);
          }
        },
        disabled: {
          type: Boolean,
          default: false
        },

        /** Update v-model only when dragging is finished */
        lazy: {
          type: Boolean,
          default: false
        },

        /** Function to format the tooltip label for display */
        customFormatter: Function,
        ariaLabel: [String, Array],

        /** Increases slider size on focus */
        biggerSliderFocus: {
          type: Boolean,
          default: false
        },
        indicator: {
          type: Boolean,
          default: false
        },
        format: {
          type: String,
          default: 'raw',
          validator: value => {
            return ['raw', 'percent'].indexOf(value) >= 0;
          }
        },
        locale: {
          type: [String, Array],
          default: () => {
            return getValueByPath(config, 'locale');
          }
        },

        /** Tooltip displays always */
        tooltipAlways: {
          type: Boolean,
          default: false
        },
        rootClass: [String, Function, Array],
        trackClass: [String, Function, Array],
        fillClass: [String, Function, Array],
        thumbRoundedClass: [String, Function, Array],
        thumbDraggingClass: [String, Function, Array],
        disabledClass: [String, Function, Array],
        thumbWrapperClass: [String, Function, Array],
        thumbClass: [String, Function, Array],
        variantClass: [String, Function, Array]
      },

      data() {
        return {
          value1: null,
          value2: null,
          dragging: false,
          isRange: false
        };
      },

      computed: {
        rootClasses() {
          return [this.computedClass('rootClass', 'o-slide'), {
            [this.computedClass('sizeClass', 'o-slide--', this.size)]: this.size
          }, {
            [this.computedClass('disabledClass', 'o-slide--disabled')]: this.disabled
          }];
        },

        trackClasses() {
          return [this.computedClass('trackClass', 'o-slide__track')];
        },

        fillClasses() {
          return [this.computedClass('fillClass', 'o-slide__fill'), {
            [this.computedClass('variantClass', 'o-slide__fill--', this.variant)]: this.variant
          }];
        },

        thumbClasses() {
          return [this.computedClass('thumbClass', 'o-slide__thumb'), {
            [this.computedClass('thumbDraggingClass', 'o-slide__thumb--dragging')]: this.dragging
          }, {
            [this.computedClass('thumbRoundedClass', 'o-slide__thumb--rounded')]: this.rounded
          }];
        },

        thumbWrapperClasses() {
          return [this.computedClass('thumbWrapperClass', 'o-slide__thumb-wrapper')];
        },

        newTooltipVariant() {
          return this.tooltipVariant ? this.tooltipVariant : this.variant;
        },

        tickValues() {
          if (!this.ticks || this.min > this.max || this.step === 0) return [];
          const result = [];

          for (let i = this.min + this.step; i < this.max; i = i + this.step) {
            result.push(i);
          }

          return result;
        },

        minValue() {
          return Math.min(this.value1, this.value2);
        },

        maxValue() {
          return Math.max(this.value1, this.value2);
        },

        barSize() {
          return this.isRange ? `${100 * (this.maxValue - this.minValue) / (this.max - this.min)}%` : `${100 * (this.value1 - this.min) / (this.max - this.min)}%`;
        },

        barStart() {
          return this.isRange ? `${100 * (this.minValue - this.min) / (this.max - this.min)}%` : '0%';
        },

        precision() {
          const precisions = [this.min, this.max, this.step].map(item => {
            const decimal = ('' + item).split('.')[1];
            return decimal ? decimal.length : 0;
          });
          return Math.max(...precisions);
        },

        barStyle() {
          return {
            width: this.barSize,
            left: this.barStart
          };
        }

      },
      watch: {
        value1() {
          this.onInternalValueUpdate();
        },

        value2() {
          this.onInternalValueUpdate();
        },

        min() {
          this.setValues(this.value);
        },

        max() {
          this.setValues(this.value);
        },

        /**
        * When v-model is changed set the new active step.
        */
        value(value) {
          this.setValues(value);
        }

      },
      methods: {
        setValues(newValue) {
          if (this.min > this.max) {
            return;
          }

          if (Array.isArray(newValue)) {
            this.isRange = true;
            const smallValue = typeof newValue[0] !== 'number' || isNaN(newValue[0]) ? this.min : Math.min(Math.max(this.min, newValue[0]), this.max);
            const largeValue = typeof newValue[1] !== 'number' || isNaN(newValue[1]) ? this.max : Math.max(Math.min(this.max, newValue[1]), this.min);
            this.value1 = this.isThumbReversed ? largeValue : smallValue;
            this.value2 = this.isThumbReversed ? smallValue : largeValue;
          } else {
            this.isRange = false;
            this.value1 = isNaN(newValue) ? this.min : Math.min(this.max, Math.max(this.min, newValue));
            this.value2 = null;
          }
        },

        onInternalValueUpdate() {
          if (this.isRange) {
            this.isThumbReversed = this.value1 > this.value2;
          }

          if (!this.lazy || !this.dragging) {
            this.emitValue('input');
          }

          if (this.dragging) {
            this.emitValue('dragging');
          }
        },

        sliderSize() {
          return this.$refs.slider.getBoundingClientRect().width;
        },

        onSliderClick(event) {
          if (this.disabled || this.isTrackClickDisabled) return;
          const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left;
          const percent = (event.clientX - sliderOffsetLeft) / this.sliderSize() * 100;
          const targetValue = this.min + percent * (this.max - this.min) / 100;
          const diffFirst = Math.abs(targetValue - this.value1);

          if (!this.isRange) {
            if (diffFirst < this.step / 2) return;
            this.$refs.button1.setPosition(percent);
          } else {
            const diffSecond = Math.abs(targetValue - this.value2);

            if (diffFirst <= diffSecond) {
              if (diffFirst < this.step / 2) return;
              this.$refs['button1'].setPosition(percent);
            } else {
              if (diffSecond < this.step / 2) return;
              this.$refs['button2'].setPosition(percent);
            }
          }

          this.emitValue('change');
        },

        onDragStart() {
          this.dragging = true;
          this.$emit('dragstart');
        },

        onDragEnd() {
          this.isTrackClickDisabled = true;
          setTimeout(() => {
            // avoid triggering onSliderClick after dragend
            this.isTrackClickDisabled = false;
          }, 0);
          this.dragging = false;
          this.$emit('dragend');

          if (this.lazy) {
            this.emitValue('input');
          }
        },

        emitValue(event) {
          const val = this.isRange ? [this.minValue, this.maxValue] : this.value1;
          this.$emit(event, val);
        }

      },

      created() {
        this.isThumbReversed = false;
        this.isTrackClickDisabled = false;
        this.setValues(this.value);
      }

    };

    /* script */
    const __vue_script__$o = script$o;

    /* template */
    var __vue_render__$l = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClasses,on:{"click":_vm.onSliderClick}},[_c('div',{ref:"slider",class:_vm.trackClasses},[_c('div',{class:_vm.fillClasses,style:(_vm.barStyle)}),(_vm.ticks)?_vm._l((_vm.tickValues),function(val,key){return _c('o-slider-tick',{key:key,attrs:{"value":val}})}):_vm._e(),_vm._t("default"),_c('o-slider-thumb',{ref:"button1",attrs:{"variant":_vm.newTooltipVariant,"tooltip":_vm.tooltip,"custom-formatter":_vm.customFormatter,"indicator":_vm.indicator,"role":"slider","format":_vm.format,"locale":_vm.locale,"tooltip-always":_vm.tooltipAlways,"aria-valuenow":_vm.value1,"aria-valuemin":_vm.min,"aria-valuemax":_vm.max,"aria-orientation":"horizontal","aria-label":Array.isArray(_vm.ariaLabel) ? _vm.ariaLabel[0] : _vm.ariaLabel,"aria-disabled":_vm.disabled},on:{"dragstart":_vm.onDragStart,"dragend":_vm.onDragEnd},model:{value:(_vm.value1),callback:function ($$v) {_vm.value1=$$v;},expression:"value1"}}),(_vm.isRange)?_c('o-slider-thumb',{ref:"button2",attrs:{"variant":_vm.newTooltipVariant,"tooltip":_vm.tooltip,"custom-formatter":_vm.customFormatter,"indicator":_vm.indicator,"role":"slider","format":_vm.format,"locale":_vm.locale,"tooltip-always":_vm.tooltipAlways,"aria-valuenow":_vm.value2,"aria-valuemin":_vm.min,"aria-valuemax":_vm.max,"aria-orientation":"horizontal","aria-label":Array.isArray(_vm.ariaLabel) ? _vm.ariaLabel[1] : '',"aria-disabled":_vm.disabled},on:{"dragstart":_vm.onDragStart,"dragend":_vm.onDragEnd},model:{value:(_vm.value2),callback:function ($$v) {_vm.value2=$$v;},expression:"value2"}}):_vm._e()],2)])};
    var __vue_staticRenderFns__$l = [];

      /* style */
      const __vue_inject_styles__$o = undefined;
      /* scoped */
      const __vue_scope_id__$o = undefined;
      /* module identifier */
      const __vue_module_identifier__$o = undefined;
      /* functional template */
      const __vue_is_functional_template__$o = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$o = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$l, staticRenderFns: __vue_staticRenderFns__$l },
        __vue_inject_styles__$o,
        __vue_script__$o,
        __vue_scope_id__$o,
        __vue_is_functional_template__$o,
        __vue_module_identifier__$o,
        false,
        undefined,
        undefined,
        undefined
      );

    const Plugin$h = {
      install(Vue) {
        registerComponent(Vue, __vue_component__$o);
        registerComponent(Vue, __vue_component__$n);
      }

    };
    use(Plugin$h);

    var SlotComponent = {
      name: 'OSlotComponent',
      props: {
        component: {
          type: Object,
          required: true
        },
        name: {
          type: String,
          default: 'default'
        },
        scoped: {
          type: Boolean
        },
        props: {
          type: Object
        },
        tag: {
          type: String,
          default: 'div'
        },
        event: {
          type: String,
          default: 'hook:updated'
        }
      },
      methods: {
        refresh() {
          this.$forceUpdate();
        }

      },

      created() {
        this.component.$on(this.event, this.refresh);
      },

      beforeDestroy() {
        this.component.$off(this.event, this.refresh);
      },

      render(h) {
        const slot = this.scoped ? this.component.$scopedSlots[this.name](this.props) : this.component.$slots[this.name];
        return h(this.tag, {}, slot);
      }

    };

    const items = 1;
    const sorted = 3;
    const Sorted = sorted;
    var ProviderParentMixin = ((itemName, flags = 0) => {
      const mixin = {
        provide() {
          return {
            ['o' + itemName]: this
          };
        }

      };

      if (hasFlag(flags, items)) {
        mixin.data = function () {
          return {
            childItems: [],
            sequence: 1
          };
        };

        mixin.methods = {
          _registerItem(item) {
            this.$nextTick(() => {
              item.index = this.childItems.length;
              this.childItems.push(item);
            });
          },

          _unregisterItem(item) {
            this.$nextTick(() => {
              this.childItems = this.childItems.filter(i => i !== item);
              let index = 0;
              this.childItems.forEach(it => {
                it.index = index++;
              });
            });
          },

          _nextSequence() {
            return this.sequence++;
          }

        };

        if (hasFlag(flags, sorted)) {
          mixin.computed = {
            /**
             * When items are added/removed sort them according to their position
             */
            sortedItems() {
              return this.childItems.slice().sort((i1, i2) => {
                return i1.index - i2.index;
              });
            }

          };
        }
      }

      return mixin;
    });

    var TabbedMixin = (cmp => ({
      mixins: [ProviderParentMixin(cmp, Sorted)],
      components: {
        [__vue_component__.name]: __vue_component__,
        [SlotComponent.name]: SlotComponent
      },
      props: {
        /** @model */
        value: [String, Number],

        /**
        * Color of the control, optional
        * @values primary, info, success, warning, danger, and any other custom color
        */
        variant: [String, Object],

        /**
         * Tab size, optional
         * @values small, medium, large
         */
        size: String,
        animated: {
          type: Boolean,
          default: true
        },

        /** Show tab in vertical layout */
        vertical: {
          type: Boolean,
          default: false
        },

        /**
         * Position of the tab, optional
         * @values centered, right
         */
        position: String,

        /** Destroy tab on hide */
        destroyOnHide: {
          type: Boolean,
          default: false
        }
      },

      data() {
        return {
          activeId: this.value,
          contentHeight: 0,
          isTransitioning: false
        };
      },

      computed: {
        activeItem() {
          return this.activeId !== undefined && this.activeId !== null ? this.childItems.filter(i => i.newValue === this.activeId)[0] : this.items[0];
        },

        items() {
          return this.sortedItems;
        }

      },
      watch: {
        /**
         * When v-model is changed set the new active tab.
         */
        value(value) {
          this.performAction();
          this.activeId = value;
        }

      },
      methods: {
        /**
        * Child click listener, emit input event and change active child.
        */
        childClick(child) {
          if (this.activeId !== child.newValue) {
            this.performAction();
            this.activeId = child.newValue;
            this.$emit('input', this.activeId);
          }
        },

        /**
        * Activate next child and deactivate prev child
        */
        performAction() {
          const oldValue = this.activeId;
          const oldTab = oldValue !== undefined && oldValue !== null ? this.childItems.filter(i => i.newValue === oldValue)[0] : this.items[0];

          if (oldTab && this.activeItem) {
            oldTab.deactivate(this.activeItem.index);
            this.activeItem.activate(oldTab.index);
          }
        }

      }
    }));

    //
    /**
     * Responsive horizontal process steps
     * @displayName Steps
     * @requires ./StepItem.vue
     * @example ./examples/Steps.md
     * @style _steps.scss
     */

    var script$p = {
      name: 'OSteps',
      components: {
        [__vue_component__$3.name]: __vue_component__$3,
        [__vue_component__.name]: __vue_component__
      },
      configField: 'steps',
      mixins: [BaseComponentMixin, MatchMediaMixin, TabbedMixin('step')],
      props: {
        /**
         * Icon pack to use for the navigation
         * @values mdi, fa, fas and any other custom icon pack
         */
        iconPack: String,

        /** Icon to use for navigation button */
        iconPrev: {
          type: String,
          default: () => {
            return getValueByPath(config, 'steps.iconPrev', 'chevron-left');
          }
        },

        /** Icon to use for navigation button */
        iconNext: {
          type: String,
          default: () => {
            return getValueByPath(config, 'steps.iconNext', 'chevron-right');
          }
        },

        /**
         * Next and previous buttons below the component. You can use this property if you want to use your own custom navigation items.
         */
        hasNavigation: {
          type: Boolean,
          default: true
        },

        /**
         * Step navigation is animated
         */
        animated: {
          type: Boolean,
          default: true
        },

        /**
         * Position of the marker label, optional
         * @values bottom, right, left
         */
        labelPosition: {
          type: String,

          validator(value) {
            return ['bottom', 'right', 'left'].indexOf(value) > -1;
          },

          default: 'bottom'
        },

        /** Rounded step markers */
        rounded: {
          type: Boolean,
          default: true
        },
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        rootClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        verticalClass: [String, Function, Array],
        positionClass: [String, Function, Array],
        stepsClass: [String, Function, Array],
        variantClass: [String, Function, Array],
        animatedClass: [String, Function, Array],
        stepMarkerRoundedClass: [String, Function, Array],
        stepDividerClass: [String, Function, Array],
        stepMarkerClass: [String, Function, Array],
        stepContentClass: [String, Function, Array],
        stepContentTransitioningClass: [String, Function, Array],
        stepNavigationClass: [String, Function, Array],
        stepDetailsClass: [String, Function, Array],
        stepTitleClass: [String, Function, Array],
        stepLinkClass: [String, Function, Array],
        stepLinkClickableClass: [String, Function, Array],
        stepLinkLabelClass: [String, Function, Array],
        stepLinkLabelPositionClass: [String, Function, Array],
        mobileClass: [String, Function, Array]
      },
      computed: {
        wrapperClasses() {
          return [this.computedClass('rootClass', 'o-steps__wrapper'), {
            [this.computedClass('sizeClass', 'o-steps--', this.size)]: this.size
          }, {
            [this.computedClass('verticalClass', 'o-steps__wrapper-vertical')]: this.vertical
          }, {
            [this.computedClass('positionClass', 'o-steps__wrapper-position-', this.position)]: this.position && this.vertical
          }, {
            [this.computedClass('mobileClass', 'o-steps--mobile')]: this.isMatchMedia
          }];
        },

        mainClasses() {
          return [this.computedClass('stepsClass', 'o-steps'), {
            [this.computedClass('variantClass', 'o-steps--', this.variant)]: this.variant
          }, {
            [this.computedClass('animatedClass', 'o-steps--animated')]: this.animated
          }];
        },

        stepDividerClasses() {
          return [this.computedClass('stepDividerClass', 'o-steps__divider')];
        },

        stepMarkerClasses() {
          return [this.computedClass('stepMarkerClass', 'o-steps__marker'), {
            [this.computedClass('stepMarkerRoundedClass', 'o-steps__marker--rounded')]: this.rounded
          }];
        },

        stepContentClasses() {
          return [this.computedClass('stepContentClass', 'o-steps__content'), {
            [this.computedClass('stepContentTransitioningClass', 'o-steps__content-transitioning')]: this.isTransitioning
          }];
        },

        stepNavigationClasses() {
          return [this.computedClass('stepNavigationClass', 'o-steps__navigation')];
        },

        stepLinkLabelClasses() {
          return [this.computedClass('stepLinkLabelClass', 'o-steps__title')];
        },

        // Override mixin implementation to always have a value
        activeItem() {
          return this.childItems.filter(i => i.newValue === this.activeId)[0] || this.items[0];
        },

        /**
         * Check if previous button is available.
         */
        hasPrev() {
          return !!this.prevItem;
        },

        /**
         * Retrieves the next visible item
         */
        nextItem() {
          let nextItem = null;
          let idx = this.activeItem ? this.items.indexOf(this.activeItem) + 1 : 0;

          for (; idx < this.items.length; idx++) {
            if (this.items[idx].visible) {
              nextItem = this.items[idx];
              break;
            }
          }

          return nextItem;
        },

        /**
         * Retrieves the previous visible item
         */
        prevItem() {
          if (!this.activeItem) {
            return null;
          }

          let prevItem = null;

          for (let idx = this.items.indexOf(this.activeItem) - 1; idx >= 0; idx--) {
            if (this.items[idx].visible) {
              prevItem = this.items[idx];
              break;
            }
          }

          return prevItem;
        },

        /**
         * Check if next button is available.
         */
        hasNext() {
          return !!this.nextItem;
        },

        navigationProps() {
          return {
            previous: {
              disabled: !this.hasPrev,
              action: this.prev
            },
            next: {
              disabled: !this.hasNext,
              action: this.next
            }
          };
        }

      },
      methods: {
        stepLinkClasses(childItem) {
          return [this.computedClass('stepLinkClass', 'o-steps__link'), {
            [this.computedClass('stepLinkLabelPositionClass', 'o-steps__link-label-', this.labelPosition)]: this.labelPosition
          }, {
            [this.computedClass('stepLinkClickableClass', 'o-steps__link-clickable')]: this.isItemClickable(childItem)
          }];
        },

        /**
         * Return if the step should be clickable or not.
         */
        isItemClickable(stepItem) {
          if (stepItem.clickable === undefined) {
            return stepItem.index < this.activeItem.index;
          }

          return stepItem.clickable;
        },

        /**
         * Previous button click listener.
         */
        prev() {
          if (this.hasPrev) {
            this.childClick(this.prevItem);
          }
        },

        /**
         * Previous button click listener.
         */
        next() {
          if (this.hasNext) {
            this.childClick(this.nextItem);
          }
        }

      }
    };

    /* script */
    const __vue_script__$p = script$p;

    /* template */
    var __vue_render__$m = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.wrapperClasses},[_c('nav',{class:_vm.mainClasses},_vm._l((_vm.items),function(childItem,index){return _c('div',{directives:[{name:"show",rawName:"v-show",value:(childItem.visible),expression:"childItem.visible"}],key:childItem.newValue,class:childItem.itemClasses},[(index > 0)?_c('span',{class:_vm.stepDividerClasses}):_vm._e(),_c('a',{class:_vm.stepLinkClasses(childItem),on:{"click":function($event){_vm.isItemClickable(childItem) && _vm.childClick(childItem);}}},[_c('div',{class:_vm.stepMarkerClasses},[(childItem.icon)?_c('o-icon',{attrs:{"icon":childItem.icon,"pack":childItem.iconPack,"size":_vm.size}}):(childItem.step)?_c('span',[_vm._v(_vm._s(childItem.step))]):_vm._e()],1),_c('div',{class:_vm.stepLinkLabelClasses},[_vm._v(_vm._s(childItem.label))])])])}),0),_c('section',{class:_vm.stepContentClasses},[_vm._t("default")],2),_vm._t("navigation",[(_vm.hasNavigation)?_c('nav',{class:_vm.stepNavigationClasses},[_c('o-button',{attrs:{"role":"button","icon-left":_vm.iconPrev,"icon-pack":_vm.iconPack,"icon-both":"","disabled":_vm.navigationProps.previous.disabled,"aria-label":_vm.ariaPreviousLabel},on:{"click":function($event){$event.preventDefault();return _vm.navigationProps.previous.action($event)}}}),_c('o-button',{attrs:{"role":"button","icon-left":_vm.iconNext,"icon-pack":_vm.iconPack,"icon-both":"","disabled":_vm.navigationProps.next.disabled,"aria-label":_vm.ariaNextLabel},on:{"click":function($event){$event.preventDefault();return _vm.navigationProps.next.action($event)}}})],1):_vm._e()],{"previous":_vm.navigationProps.previous,"next":_vm.navigationProps.next})],2)};
    var __vue_staticRenderFns__$m = [];

      /* style */
      const __vue_inject_styles__$p = undefined;
      /* scoped */
      const __vue_scope_id__$p = undefined;
      /* module identifier */
      const __vue_module_identifier__$p = undefined;
      /* functional template */
      const __vue_is_functional_template__$p = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$p = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$m, staticRenderFns: __vue_staticRenderFns__$m },
        __vue_inject_styles__$p,
        __vue_script__$p,
        __vue_scope_id__$p,
        __vue_is_functional_template__$p,
        __vue_module_identifier__$p,
        false,
        undefined,
        undefined,
        undefined
      );

    const sorted$1 = 1;
    const optional = 2;
    const Sorted$1 = sorted$1;
    var InjectedChildMixin = ((parentItemName, flags = 0) => {
      const mixin = {
        inject: {
          parent: {
            from: 'o' + parentItemName
          }
        },

        created() {
          this.newValue = typeof this.value === 'undefined' ? this.parent._nextSequence() : this.value;

          if (!this.parent) {
            if (!hasFlag(flags, optional)) {
              throw new Error('You should wrap ' + this.$options.name + ' in a ' + parentItemName);
            }
          } else if (this.parent._registerItem) {
            this.parent._registerItem(this);
          }
        },

        beforeDestroy() {
          if (this.parent && this.parent._unregisterItem) {
            this.parent._unregisterItem(this);
          }
        }

      };

      if (hasFlag(flags, sorted$1)) {
        mixin.data = () => {
          return {
            index: null
          };
        };
      }

      return mixin;
    });

    var TabbedChildMixin = (parentCmp => ({
      mixins: [InjectedChildMixin(parentCmp, Sorted$1)],
      props: {
        /**
         * Item label
         */
        label: String,

        /**
         * Icon on the left
         */
        icon: String,

        /**
         * Icon pack
         */
        iconPack: String,

        /**
         * Show/hide item
         */
        visible: {
          type: Boolean,
          default: true
        },

        /**
         * Item value (it will be used as v-model of wrapper component)
         */
        value: [String, Number],

        /**
         * Header class of the item
         */
        headerClass: {
          type: [String, Array, Object]
        }
      },

      data() {
        return {
          transitionName: undefined,
          newValue: this.value
        };
      },

      computed: {
        isActive() {
          return this.parent.activeItem === this;
        },

        elementClasses() {
          return [];
        }

      },
      methods: {
        /**
         * Activate element, alter animation name based on the index.
         */
        activate(oldIndex) {
          this.transitionName = this.index < oldIndex ? this.parent.vertical ? 'slide-down' : 'slide-next' : this.parent.vertical ? 'slide-up' : 'slide-prev';
        },

        /**
         * Deactivate element, alter animation name based on the index.
         */
        deactivate(newIndex) {
          this.transitionName = newIndex < this.index ? this.parent.vertical ? 'slide-down' : 'slide-next' : this.parent.vertical ? 'slide-up' : 'slide-prev';
        }

      },

      render(h) {
        // if destroy apply v-if
        if (this.parent.destroyOnHide) {
          if (!this.isActive || !this.visible) return;
        }

        const vnode = h('div', {
          directives: [{
            name: 'show',
            value: this.isActive && this.visible
          }],
          attrs: {
            'class': this.elementClasses
          }
        }, this.$slots.default); // check animated prop

        if (this.parent.animated) {
          return h('transition', {
            props: {
              'name': this.transitionName
            },
            on: {
              'before-enter': () => {
                this.parent.isTransitioning = true;
              },
              'after-enter': () => {
                this.parent.isTransitioning = false;
              }
            }
          }, [vnode]);
        }

        return vnode;
      }

    }));

    /**
     * @displayName Step Item
     */

    var script$q = {
      name: 'OStepItem',
      mixins: [BaseComponentMixin, TabbedChildMixin('step')],
      configField: 'steps',
      props: {
        /** Step marker content (when there is no icon) */
        step: [String, Number],

        /** Default style for the step, optional This will override parent type. Could be used to set a completed step to "success" for example */
        variant: [String, Object],

        /** Item can be used directly to navigate. If undefined, previous steps are clickable while the others are not */
        clickable: {
          type: Boolean,
          default: undefined
        },
        itemClass: [String, Function, Array],
        itemHeaderClass: [String, Function, Array],
        itemHeaderActiveClass: [String, Function, Array],
        itemHeaderPreviousClass: [String, Function, Array]
      },
      computed: {
        elementClasses() {
          return [this.computedClass('itemClass', 'o-steps__item')];
        },

        itemClasses() {
          return [this.headerClass, this.computedClass('itemHeaderClass', 'o-steps__nav-item'), {
            [this.computedClass('itemHeaderActiveClass', 'o-steps__nav-item-active')]: this.isActive
          }, {
            [this.computedClass('itemHeaderPreviousClass', 'o-steps__nav-item-previous')]: this.parent.activeItem.index > this.index
          }];
        }

      }
    };

    /* script */
    const __vue_script__$q = script$q;

    /* template */

      /* style */
      const __vue_inject_styles__$q = undefined;
      /* scoped */
      const __vue_scope_id__$q = undefined;
      /* module identifier */
      const __vue_module_identifier__$q = undefined;
      /* functional template */
      const __vue_is_functional_template__$q = undefined;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$q = /*#__PURE__*/normalizeComponent(
        {},
        __vue_inject_styles__$q,
        __vue_script__$q,
        __vue_scope_id__$q,
        __vue_is_functional_template__$q,
        __vue_module_identifier__$q,
        false,
        undefined,
        undefined,
        undefined
      );

    const Plugin$i = {
      install(Vue) {
        registerComponent(Vue, __vue_component__$p);
        registerComponent(Vue, __vue_component__$q);
      }

    };
    use(Plugin$i);

    //
    /**
     * Switch between two opposing states
     * @displayName Switch
     * @example ./examples/Switch.md
     * @style _switch.scss
     */

    var script$r = {
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
    const __vue_script__$r = script$r;

    /* template */
    var __vue_render__$n = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{ref:"label",class:_vm.rootClasses,attrs:{"disabled":_vm.disabled},on:{"click":_vm.focus,"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.$refs.label.click()},"mousedown":function($event){_vm.isMouseDown = true;},"mouseup":function($event){_vm.isMouseDown = false;},"mouseout":function($event){_vm.isMouseDown = false;},"blur":function($event){_vm.isMouseDown = false;}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",attrs:{"type":"checkbox","disabled":_vm.disabled,"name":_vm.name,"required":_vm.required,"true-value":_vm.trueValue,"false-value":_vm.falseValue},domProps:{"value":_vm.nativeValue,"checked":Array.isArray(_vm.computedValue)?_vm._i(_vm.computedValue,_vm.nativeValue)>-1:_vm._q(_vm.computedValue,_vm.trueValue)},on:{"click":function($event){$event.stopPropagation();},"change":function($event){var $$a=_vm.computedValue,$$el=$event.target,$$c=$$el.checked?(_vm.trueValue):(_vm.falseValue);if(Array.isArray($$a)){var $$v=_vm.nativeValue,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.computedValue=$$a.concat([$$v]));}else {$$i>-1&&(_vm.computedValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else {_vm.computedValue=$$c;}}}}),_c('span',{class:_vm.elementsWrapperClasses},[_c('span',{class:_vm.checkClasses},[_c('span',{class:_vm.checkSwitchClasses})]),_c('span',{class:_vm.labelClasses},[_vm._t("default")],2)])])};
    var __vue_staticRenderFns__$n = [];

      /* style */
      const __vue_inject_styles__$r = undefined;
      /* scoped */
      const __vue_scope_id__$r = undefined;
      /* module identifier */
      const __vue_module_identifier__$r = undefined;
      /* functional template */
      const __vue_is_functional_template__$r = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$r = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$n, staticRenderFns: __vue_staticRenderFns__$n },
        __vue_inject_styles__$r,
        __vue_script__$r,
        __vue_scope_id__$r,
        __vue_is_functional_template__$r,
        __vue_module_identifier__$r,
        false,
        undefined,
        undefined,
        undefined
      );

    const Plugin$j = {
      install(Vue) {
        registerComponent(Vue, __vue_component__$r);
      }

    };
    use(Plugin$j);

    //
    var script$s = {
      name: 'OTableMobileSort',
      components: {
        [__vue_component__$3.name]: __vue_component__$3,
        [__vue_component__$a.name]: __vue_component__$a,
        [__vue_component__.name]: __vue_component__,
        [__vue_component__$9.name]: __vue_component__$9
      },
      inject: ['$table'],
      props: {
        currentSortColumn: Object,
        columns: Array,
        placeholder: String,
        iconPack: String,
        sortIcon: {
          type: String,
          default: 'arrow-up'
        },
        sortIconSize: {
          type: String,
          default: 'small'
        },
        isAsc: Boolean
      },

      data() {
        return {
          mobileSort: this.currentSortColumn,
          defaultEvent: {
            shiftKey: true,
            altKey: true,
            ctrlKey: true
          },
          ignoreSort: false
        };
      },

      computed: {
        showPlaceholder() {
          return !this.columns || !this.columns.some(column => column === this.mobileSort);
        },

        sortableColumns() {
          if (!this.columns) return [];
          return this.columns.filter(c => c.sortable);
        }

      },
      watch: {
        mobileSort(column) {
          if (this.currentSortColumn === column) return;
          this.$emit('sort', column, this.defaultEvent);
        },

        currentSortColumn(column) {
          this.mobileSort = column;
        }

      },
      methods: {
        sort() {
          this.$emit('sort', this.mobileSort, this.defaultEvent);
        }

      }
    };

    /* script */
    const __vue_script__$s = script$s;

    /* template */
    var __vue_render__$o = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.$table.mobileSortClasses},[_c('o-field',[_c('o-select',{attrs:{"expanded":""},model:{value:(_vm.mobileSort),callback:function ($$v) {_vm.mobileSort=$$v;},expression:"mobileSort"}},[(_vm.placeholder)?[_c('option',{directives:[{name:"show",rawName:"v-show",value:(_vm.showPlaceholder),expression:"showPlaceholder"}],attrs:{"selected":"","disabled":"","hidden":""},domProps:{"value":{}}},[_vm._v(" "+_vm._s(_vm.placeholder)+" ")])]:_vm._e(),_vm._l((_vm.sortableColumns),function(column,index){return _c('option',{key:index,domProps:{"value":column}},[_vm._v(" "+_vm._s(column.label)+" ")])})],2),_c('o-button',{on:{"click":_vm.sort}},[_c('o-icon',{directives:[{name:"show",rawName:"v-show",value:(_vm.currentSortColumn === _vm.mobileSort),expression:"currentSortColumn === mobileSort"}],attrs:{"icon":_vm.sortIcon,"pack":_vm.iconPack,"size":_vm.sortIconSize,"both":"","rotation":!_vm.isAsc ? 180 : 0}})],1)],1)],1)};
    var __vue_staticRenderFns__$o = [];

      /* style */
      const __vue_inject_styles__$s = undefined;
      /* scoped */
      const __vue_scope_id__$s = undefined;
      /* module identifier */
      const __vue_module_identifier__$s = undefined;
      /* functional template */
      const __vue_is_functional_template__$s = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$s = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$o, staticRenderFns: __vue_staticRenderFns__$o },
        __vue_inject_styles__$s,
        __vue_script__$s,
        __vue_scope_id__$s,
        __vue_is_functional_template__$s,
        __vue_module_identifier__$s,
        false,
        undefined,
        undefined,
        undefined
      );

    /**
     * @displayName Table Column
     */

    var script$t = {
      name: 'OTableColumn',
      inject: ['$table'],
      props: {
        label: String,
        customKey: [String, Number],
        field: String,
        meta: [String, Number, Boolean, Function, Object, Array],
        width: [Number, String],
        numeric: Boolean,

        /**
         * Optional, position of column content
         * @values centered, right
         */
        position: {
          type: String,

          validator(value) {
            return ['left', 'centered', 'right'].indexOf(value) > -1;
          }

        },
        searchable: Boolean,
        sortable: Boolean,
        visible: {
          type: Boolean,
          default: true
        },
        customSort: Function,
        customSearch: Function,
        sticky: Boolean,
        headerSelectable: Boolean,

        /** Adds native attributes to th :th-attrs="(column)" => ({})" */
        thAttrs: {
          type: Function,
          default: () => ({})
        },

        /** Adds native attributes to td :td-attrs="(row, column)" => ({})" */
        tdAttrs: {
          type: Function,
          default: () => ({})
        }
      },

      data() {
        return {
          newKey: this.$table._nextSequence()
        };
      },

      computed: {
        style() {
          return {
            width: toCssDimension(this.width)
          };
        },

        hasDefaultSlot() {
          return this.$scopedSlots.default;
        },

        hasSearchableSlot() {
          return this.$scopedSlots.searchable;
        },

        hasHeaderSlot() {
          return this.$scopedSlots.header;
        },

        isHeaderUnselectable() {
          return !this.headerSelectable && this.sortable;
        }

      },

      created() {
        if (!this.$table) {
          throw new Error('You should wrap oTableColumn on a oTable');
        }

        this.$table._addColumn(this);
      },

      beforeDestroy() {
        this.$table._removeColumn(this);
      },

      render() {
        // renderless
        return this.$createElement('span', {
          domProps: {
            'data-id': this.newKey
          }
        }, this.label);
      }

    };

    /* script */
    const __vue_script__$t = script$t;

    /* template */

      /* style */
      const __vue_inject_styles__$t = undefined;
      /* scoped */
      const __vue_scope_id__$t = undefined;
      /* module identifier */
      const __vue_module_identifier__$t = undefined;
      /* functional template */
      const __vue_is_functional_template__$t = undefined;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$t = /*#__PURE__*/normalizeComponent(
        {},
        __vue_inject_styles__$t,
        __vue_script__$t,
        __vue_scope_id__$t,
        __vue_is_functional_template__$t,
        __vue_module_identifier__$t,
        false,
        undefined,
        undefined,
        undefined
      );

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    var script$u = {
      name: 'OTablePagination',
      props: {
        paginated: Boolean,
        total: [Number, String],
        perPage: [Number, String],
        currentPage: [Number, String],
        paginationSimple: Boolean,
        paginationSize: String,
        rounded: Boolean,
        iconPack: String,
        rootClass: [String, Array, Object],
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String
      },

      data() {
        return {
          newCurrentPage: this.currentPage
        };
      },

      watch: {
        currentPage(newVal) {
          this.newCurrentPage = newVal;
        }

      },
      methods: {
        /**
        * Paginator change listener.
        */
        pageChanged(page) {
          this.newCurrentPage = page > 0 ? page : 1;
          this.$emit('update:currentPage', this.newCurrentPage);
          this.$emit('page-change', this.newCurrentPage);
        }

      }
    };

    /* script */
    const __vue_script__$u = script$u;

    /* template */
    var __vue_render__$p = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClass},[_c('div',[_vm._t("default")],2),_c('div',[(_vm.paginated)?_c('div',[_c('o-pagination',{attrs:{"icon-pack":_vm.iconPack,"total":_vm.total,"per-page":_vm.perPage,"simple":_vm.paginationSimple,"size":_vm.paginationSize,"current":_vm.newCurrentPage,"rounded":_vm.rounded,"aria-next-label":_vm.ariaNextLabel,"aria-previous-label":_vm.ariaPreviousLabel,"aria-page-label":_vm.ariaPageLabel,"aria-current-label":_vm.ariaCurrentLabel},on:{"change":_vm.pageChanged}})],1):_vm._e()])])};
    var __vue_staticRenderFns__$p = [];

      /* style */
      const __vue_inject_styles__$u = undefined;
      /* scoped */
      const __vue_scope_id__$u = undefined;
      /* module identifier */
      const __vue_module_identifier__$u = undefined;
      /* functional template */
      const __vue_is_functional_template__$u = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$u = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$p, staticRenderFns: __vue_staticRenderFns__$p },
        __vue_inject_styles__$u,
        __vue_script__$u,
        __vue_scope_id__$u,
        __vue_is_functional_template__$u,
        __vue_module_identifier__$u,
        false,
        undefined,
        undefined,
        undefined
      );

    //
    /**
     * Tabulated data are sometimes needed, it's even better when it's responsive
     * @displayName Table
     * @requires ./TableColumn.vue
     * @example ./examples/Table.md
     * @style _table.scss
     */

    var script$v = {
      name: 'OTable',
      components: {
        [__vue_component__$3.name]: __vue_component__$3,
        [__vue_component__$4.name]: __vue_component__$4,
        [__vue_component__.name]: __vue_component__,
        [__vue_component__$1.name]: __vue_component__$1,
        [__vue_component__$h.name]: __vue_component__$h,
        [__vue_component__$e.name]: __vue_component__$e,
        [SlotComponent.name]: SlotComponent,
        [__vue_component__$s.name]: __vue_component__$s,
        [__vue_component__$t.name]: __vue_component__$t,
        [__vue_component__$u.name]: __vue_component__$u
      },
      mixins: [BaseComponentMixin, MatchMediaMixin],
      configField: 'table',
      inheritAttrs: false,

      provide() {
        return {
          $table: this
        };
      },

      props: {
        /** Table data */
        data: {
          type: Array,
          default: () => []
        },

        /** Table columns */
        columns: {
          type: Array,
          default: () => []
        },

        /** Border to all cells */
        bordered: Boolean,

        /** Whether table is striped */
        striped: Boolean,

        /** Makes the cells narrower */
        narrowed: Boolean,

        /** Rows are highlighted when hovering */
        hoverable: Boolean,

        /** Loading state */
        loading: Boolean,

        /** Allow row details  */
        detailed: Boolean,

        /** Rows can be checked (multiple), checked rows will have a .is-checked class if you want to style */
        checkable: Boolean,

        /** Show check/uncheck all checkbox in table header when checkable */
        headerCheckable: {
          type: Boolean,
          default: true
        },

        /**
         * Position of the checkbox (if checkable is true)
         * @values left, right
         */
        checkboxPosition: {
          type: String,
          default: 'left',
          validator: value => {
            return ['left', 'right'].indexOf(value) >= 0;
          }
        },

        /** Set which row is selected, use the .sync modifier (Vue 2.x) or v-model:selected (Vue 3.x) to make it two-way binding */
        selected: Object,

        /** Custom method to verify if a row is selectable, works when is selected. */
        isRowSelectable: {
          type: Function,
          default: () => true
        },

        /** Table can be focused and user can navigate with keyboard arrows (require selected) and rows are highlighted when hovering */
        focusable: Boolean,

        /** Custom method to verify if row is checked, works when is checkable. Useful for backend pagination */
        customIsChecked: Function,

        /** Custom method to verify if a row is checkable, works when is checkable */
        isRowCheckable: {
          type: Function,
          default: () => true
        },

        /** Set which rows are checked, use the .sync modifier (Vue 2.x) or v-model:checkedRows (Vue 3.x) to make it two-way binding */
        checkedRows: {
          type: Array,
          default: () => []
        },

        /** Rows appears as cards on mobile (collapse rows) */
        mobileCards: {
          type: Boolean,
          default: () => {
            return getValueByPath(config, 'table.mobileCards', true);
          }
        },

        /** Sets the default sort column and order — e.g. ['first_name', 'desc']	 */
        defaultSort: [String, Array],

        /**
         * Sets the default sort column direction on the first click
         * @values asc, desc
         */
        defaultSortDirection: {
          type: String,
          default: 'asc'
        },

        /** Sets the header sorting icon */
        sortIcon: {
          type: String,
          default: () => {
            return getValueByPath(config, 'table.sortIcon', 'arrow-up');
          }
        },

        /**
         * Sets the size of the sorting icon
         * @values small, medium, large
         */
        sortIconSize: {
          type: String,
          default: () => {
            return getValueByPath(config, 'table.sortIconSize', 'small');
          }
        },

        /** Adds pagination to the table */
        paginated: Boolean,

        /** Current page of table data (if paginated), use the .sync modifier (Vue 2.x) or v-model:currentPage (Vue 3.x) to make it two-way binding */
        currentPage: {
          type: Number,
          default: 1
        },

        /** How many rows per page (if paginated) */
        perPage: {
          type: [Number, String],
          default: () => {
            return getValueByPath(config, 'table.perPage', 20);
          }
        },

        /** Allow chevron icon and column to be visible */
        showDetailIcon: {
          type: Boolean,
          default: true
        },

        /**
         * Pagination position (if paginated)
         * @values bottom, top, bot
         */
        paginationPosition: {
          type: String,
          default: () => {
            return getValueByPath(config, 'table.paginationPosition', 'bottom');
          },
          validator: value => {
            return ['bottom', 'top', 'both'].indexOf(value) >= 0;
          }
        },

        /** Columns won't be sorted with Javascript, use with sort event to sort in your backend */
        backendSorting: Boolean,

        /** Columns won't be filtered with Javascript, use with searchable prop to the columns to filter in your backend */
        backendFiltering: Boolean,

        /** Add a class to row based on the return */
        rowClass: {
          type: Function,
          default: () => ''
        },

        /** Allow pre-defined opened details. Ideal to open details via vue-router. (A unique key is required; check detail-key prop) */
        openedDetailed: {
          type: Array,
          default: () => []
        },

        /** Controls the visibility of the trigger that toggles the detailed rows. */
        hasDetailedVisible: {
          type: Function,
          default: () => true
        },

        /** Use a unique key of your data Object when use detailed or opened detailed. (id recommended) */
        detailKey: {
          type: String,
          default: ''
        },

        /** Custom style on details */
        customDetailRow: {
          type: Boolean,
          default: false
        },

        /** Rows won't be paginated with Javascript, use with page-change event to paginate in your backend */
        backendPagination: Boolean,

        /** Total number of table data if backend-pagination is enabled */
        total: {
          type: [Number, String],
          default: 0
        },

        /** Icon pack to use */
        iconPack: String,

        /** Text when nothing is selected */
        mobileSortPlaceholder: String,

        /** Use a unique key of your data Object for each row. Useful if your data prop has dynamic indices. (id recommended) */
        customRowKey: String,

        /** Allows rows to be draggable */
        draggable: {
          type: Boolean,
          default: false
        },

        /** Add a horizontal scrollbar when table is too wide */
        scrollable: Boolean,
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String,

        /** Show a sticky table header */
        stickyHeader: Boolean,

        /** Table fixed height */
        height: [Number, String],

        /** Add a native event to filter */
        filtersEvent: {
          type: String,
          default: ''
        },

        /** Filtering debounce time (in milliseconds) */
        debounceSearch: Number,

        /** Show header */
        showHeader: {
          type: Boolean,
          default: () => {
            return getValueByPath(config, 'table.showHeader', true);
          }
        },

        /** Make the checkbox column sticky when checkable */
        stickyCheckbox: {
          type: Boolean,
          default: false
        },

        /** Rounded pagination if paginated */
        paginationRounded: Boolean,
        tableClass: [String, Function, Array],
        wrapperClass: [String, Function, Array],
        footerClass: [String, Function, Array],
        emptyClass: [String, Function, Array],
        detailedClass: [String, Function, Array],
        borderedClass: [String, Function, Array],
        stripedClass: [String, Function, Array],
        narrowedClass: [String, Function, Array],
        hoverableClass: [String, Function, Array],
        thClass: [String, Function, Array],
        tdClass: [String, Function, Array],
        thPositionClass: [String, Function, Array],
        thStickyClass: [String, Function, Array],
        thCheckboxClass: [String, Function, Array],
        thCurrentSortClass: [String, Function, Array],
        thSortableClass: [String, Function, Array],
        thUnselectableClass: [String, Function, Array],
        thSortIconClass: [String, Function, Array],
        thDetailedClass: [String, Function, Array],
        tdPositionClass: [String, Function, Array],
        tdStickyClass: [String, Function, Array],
        tdCheckboxClass: [String, Function, Array],
        tdDetailedChevronClass: [String, Function, Array],
        trSelectedClass: [String, Function, Array],
        stickyHeaderClass: [String, Function, Array],
        scrollableClass: [String, Function, Array],
        mobileSortClass: [String, Function, Array],
        paginationWrapperClass: [String, Function, Array],
        mobileClass: [String, Function, Array]
      },

      data() {
        return {
          getValueByPath,
          visibleDetailRows: this.openedDetailed,
          newData: this.data,
          newDataTotal: this.backendPagination ? this.total : this.data.length,
          newCheckedRows: [...this.checkedRows],
          lastCheckedRowIndex: null,
          newCurrentPage: this.currentPage,
          currentSortColumn: {},
          isAsc: true,
          filters: {},
          defaultSlots: [],
          firstTimeSort: true,
          // Used by first time initSort
          sequence: 1
        };
      },

      computed: {
        tableClasses() {
          return [this.computedClass('tableClass', 'o-table'), {
            [this.computedClass('borderedClass', 'o-table--bordered')]: this.bordered
          }, {
            [this.computedClass('stripedClass', 'o-table--striped')]: this.striped
          }, {
            [this.computedClass('narrowedClass', 'o-table--narrowed')]: this.narrowed
          }, {
            [this.computedClass('hoverableClass', 'o-table--hoverable')]: (this.hoverable || this.focusable) && this.visibleData.length
          }, {
            [this.computedClass('emptyClass', 'o-table--table__empty')]: !this.visibleData.length
          }];
        },

        tableWrapperClasses() {
          return [this.computedClass('wrapperClass', 'o-table__wrapper'), {
            [this.computedClass('stickyHeaderClass', 'o-table__wrapper--sticky-header')]: this.stickyHeader
          }, {
            [this.computedClass('scrollableClass', 'o-table__wrapper--scrollable')]: this.isScrollable
          }, {
            [this.computedClass('mobileClass', 'o-table__wrapper--mobile')]: this.mobileCards && this.isMatchMedia
          }];
        },

        footerClasses() {
          return [this.computedClass('footerClass', 'o-table__footer')];
        },

        thBaseClasses() {
          return [this.computedClass('thClass', 'o-table__th')];
        },

        tdBaseClasses() {
          return [this.computedClass('tdClass', 'o-table__td')];
        },

        thCheckboxClasses() {
          return [...this.thBaseClasses, this.computedClass('thCheckboxClass', 'o-table__th-checkbox')];
        },

        thDetailedClasses() {
          return [...this.thBaseClasses, this.computedClass('thDetailedClass', 'o-table__th--detailed')];
        },

        tdCheckboxClasses() {
          return [...this.tdBaseClasses, this.computedClass('tdCheckboxClass', 'o-table__td-checkbox'), ...this.thStickyClasses({
            sticky: this.stickyCheckbox
          })];
        },

        detailedClasses() {
          return [this.computedClass('detailedClass', 'o-table__detail')];
        },

        tdDetailedChevronClasses() {
          return [...this.tdBaseClasses, this.computedClass('tdDetailedChevronClass', 'o-table__td-chevron')];
        },

        mobileSortClasses() {
          return [this.computedClass('mobileSortClass', 'o-table__mobile-sort')];
        },

        paginationWrapperClasses() {
          return [this.computedClass('paginationWrapperClass', 'o-table__pagination')];
        },

        tableWrapperStyle() {
          return {
            height: toCssDimension(this.height)
          };
        },

        /**
        * Splitted data based on the pagination.
        */
        visibleData() {
          if (!this.paginated) return this.newData;
          const currentPage = this.newCurrentPage;
          const perPage = this.perPage;

          if (this.newData.length <= perPage) {
            return this.newData;
          } else {
            const start = (currentPage - 1) * perPage;
            const end = parseInt(start, 10) + parseInt(perPage, 10);
            return this.newData.slice(start, end);
          }
        },

        visibleColumns() {
          if (!this.newColumns) return this.newColumns;
          return this.newColumns.filter(column => {
            return column.visible || column.visible === undefined;
          });
        },

        /**
        * Check if all rows in the page are checked.
        */
        isAllChecked() {
          const validVisibleData = this.visibleData.filter(row => this.isRowCheckable(row));
          if (validVisibleData.length === 0) return false;
          const isAllChecked = validVisibleData.some(currentVisibleRow => {
            return indexOf(this.newCheckedRows, currentVisibleRow, this.customIsChecked) < 0;
          });
          return !isAllChecked;
        },

        /**
        * Check if all rows in the page are checkable.
        */
        isAllUncheckable() {
          const validVisibleData = this.visibleData.filter(row => this.isRowCheckable(row));
          return validVisibleData.length === 0;
        },

        /**
        * Check if has any sortable column.
        */
        hasSortablenewColumns() {
          return this.newColumns.some(column => {
            return column.sortable;
          });
        },

        /**
        * Check if has any searchable column.
        */
        hasSearchablenewColumns() {
          return this.newColumns.some(column => {
            return column.searchable;
          });
        },

        /**
        * Return total column count based if it's checkable or expanded
        */
        columnCount() {
          let count = this.visibleColumns.length;
          count += this.checkable ? 1 : 0;
          count += this.detailed && this.showDetailIcon ? 1 : 0;
          return count;
        },

        /**
        * return if detailed row tabled
        * will be with chevron column & icon or not
        */
        showDetailRowIcon() {
          return this.detailed && this.showDetailIcon;
        },

        /**
        * return if scrollable table
        */
        isScrollable() {
          if (this.scrollable) return true;
          if (!this.newColumns) return false;
          return this.newColumns.some(column => {
            return column.sticky;
          });
        },

        newColumns() {
          if (this.columns && this.columns.length) {
            return this.columns.map(column => {
              const TableColumnComponent = VueInstance.extend(__vue_component__$t);
              const component = new TableColumnComponent({
                parent: this,
                propsData: column
              });
              component.$scopedSlots = {
                'default': props => {
                  const vnode = component.$createElement('span', {
                    domProps: {
                      innerHTML: getValueByPath(props.row, column.field)
                    }
                  });
                  return [vnode];
                }
              };
              return component;
            });
          }

          return this.defaultSlots;
        }

      },
      watch: {
        /**
        * When data prop change:
        *   1. Update internal value.
        *   2. Filter data if it's not backend-filtered.
        *   3. Sort again if it's not backend-sorted.
        *   4. Set new total if it's not backend-paginated.
        */
        data(value) {
          this.newData = value;

          if (!this.backendFiltering) {
            this.newData = value.filter(row => this.isRowFiltered(row));
          }

          if (!this.backendSorting) {
            this.sort(this.currentSortColumn, true);
          }

          if (!this.backendPagination) {
            this.newDataTotal = this.newData.length;
          }
        },

        /**
        * When Pagination total change, update internal total
        * only if it's backend-paginated.
        */
        total(newTotal) {
          if (!this.backendPagination) return;
          this.newDataTotal = newTotal;
        },

        currentPage(newValue) {
          this.newCurrentPage = newValue;
        },

        /**
        * When checkedRows prop change, update internal value without
        * mutating original data.
        */
        checkedRows(rows) {
          this.newCheckedRows = [...rows];
        },

        debounceSearch: {
          handler(value) {
            this.debouncedHandleFiltersChange = debounce(this.handleFiltersChange, value);
          },

          immediate: true
        },
        filters: {
          handler(value) {
            if (this.debounceSearch) {
              this.debouncedHandleFiltersChange(value);
            } else {
              this.handleFiltersChange(value);
            }
          },

          deep: true
        },

        /**
        * When the user wants to control the detailed rows via props.
        * Or wants to open the details of certain row with the router for example.
        */
        openedDetailed(expandedRows) {
          this.visibleDetailRows = expandedRows;
        },

        newCurrentPage(newVal) {
          this.$emit('update:currentPage', newVal);
        }

      },
      methods: {
        thClasses(column) {
          return [...this.thBaseClasses, ...this.thStickyClasses(column), getValueByPath(column.thAttrs(column), 'class'), {
            [this.computedClass('thCurrentSortClass', 'o-table__th-current-sort')]: this.currentSortColumn === column
          }, {
            [this.computedClass('thSortableClass', 'o-table__th--sortable')]: column.sortable
          }, {
            [this.computedClass('thUnselectableClass', 'o-table__th--unselectable')]: column.isHeaderUnselectable
          }, {
            [this.computedClass('thPositionClass', 'o-table__th--', column.position)]: column.position
          }];
        },

        thStickyClasses(column) {
          return [{
            [this.computedClass('thStickyClass', 'o-table__th--sticky')]: column.sticky || this.stickyHeader
          }];
        },

        rowClasses(row, index) {
          return [this.rowClass(row, index), {
            [this.computedClass('trSelectedClass', 'o-table__tr--selected')]: this.isRowSelected(row, this.selected)
          }];
        },

        thSortIconClasses() {
          return [this.computedClass('thSortIconClass', 'o-table__th__sort-icon')];
        },

        tdClasses(row, column) {
          return [...this.tdBaseClasses, getValueByPath(column.tdAttrs(row, column), 'class'), {
            [this.computedClass('tdPositionClass', 'o-table__td--', column.position)]: column.position
          }, {
            [this.computedClass('tdStickyClass', 'o-table__td--sticky')]: column.sticky
          }];
        },

        onFiltersEvent(event) {
          this.$emit(`filters-event-${this.filtersEvent}`, {
            event,
            filters: this.filters
          });
        },

        handleFiltersChange(value) {
          if (this.backendFiltering) {
            this.$emit('filters-change', value);
          } else {
            this.newData = this.data.filter(row => this.isRowFiltered(row));

            if (!this.backendPagination) {
              this.newDataTotal = this.newData.length;
            }

            if (!this.backendSorting) {
              if (Object.keys(this.currentSortColumn).length > 0) {
                this.doSortSingleColumn(this.currentSortColumn);
              }
            }
          }
        },

        /**
        * Sort an array by key without mutating original data.
        * Call the user sort function if it was passed.
        */
        sortBy(array, key, fn, isAsc) {
          let sorted = []; // Sorting without mutating original data

          if (fn && typeof fn === 'function') {
            sorted = [...array].sort((a, b) => fn(a, b, isAsc));
          } else {
            sorted = [...array].sort((a, b) => {
              // Get nested values from objects
              let newA = getValueByPath(a, key);
              let newB = getValueByPath(b, key); // sort boolean type

              if (typeof newA === 'boolean' && typeof newB === 'boolean') {
                return isAsc ? newA - newB : newB - newA;
              }

              if (!newA && newA !== 0) return 1;
              if (!newB && newB !== 0) return -1;
              if (newA === newB) return 0;
              newA = typeof newA === 'string' ? newA.toUpperCase() : newA;
              newB = typeof newB === 'string' ? newB.toUpperCase() : newB;
              return isAsc ? newA > newB ? 1 : -1 : newA > newB ? -1 : 1;
            });
          }

          return sorted;
        },

        /**
        * Sort the column.
        * Toggle current direction on column if it's sortable
        * and not just updating the prop.
        */
        sort(column, updatingData = false, event = null) {
          if (!column || !column.sortable) return;

          if (!updatingData) {
            this.isAsc = column === this.currentSortColumn ? !this.isAsc : this.defaultSortDirection.toLowerCase() !== 'desc';
          }

          if (!this.firstTimeSort) {
            /**
             * @property {string} field column field
             * @property {boolean} direction 'asc' or 'desc'
             * @property {Event} event native event
            */
            this.$emit('sort', column.field, this.isAsc ? 'asc' : 'desc', event);
          }

          if (!this.backendSorting) {
            this.doSortSingleColumn(column);
          }

          this.currentSortColumn = column;
        },

        doSortSingleColumn(column) {
          this.newData = this.sortBy(this.newData, column.field, column.customSort, this.isAsc);
        },

        isRowSelected(row, selected) {
          if (!selected) {
            return false;
          }

          if (this.customRowKey) {
            return row[this.customRowKey] === selected[this.customRowKey];
          }

          return row === selected;
        },

        /**
        * Check if the row is checked (is added to the array).
        */
        isRowChecked(row) {
          return indexOf(this.newCheckedRows, row, this.customIsChecked) >= 0;
        },

        /**
        * Remove a checked row from the array.
        */
        removeCheckedRow(row) {
          const index = indexOf(this.newCheckedRows, row, this.customIsChecked);

          if (index >= 0) {
            this.newCheckedRows.splice(index, 1);
          }
        },

        /**
        * Header checkbox click listener.
        * Add or remove all rows in current page.
        */
        checkAll() {
          const isAllChecked = this.isAllChecked;
          this.visibleData.forEach(currentRow => {
            if (this.isRowCheckable(currentRow)) {
              this.removeCheckedRow(currentRow);
            }

            if (!isAllChecked) {
              if (this.isRowCheckable(currentRow)) {
                this.newCheckedRows.push(currentRow);
              }
            }
          });
          /**
           * @property {Array<Object>} newCheckedRows checked rows
           */

          this.$emit('check', this.newCheckedRows);
          this.$emit('check-all', this.newCheckedRows); // Emit checked rows to update user variable

          this.$emit('update:checkedRows', this.newCheckedRows);
        },

        /**
        * Row checkbox click listener.
        */
        checkRow(row, index, event) {
          if (!this.isRowCheckable(row)) return;
          const lastIndex = this.lastCheckedRowIndex;
          this.lastCheckedRowIndex = index;

          if (event.shiftKey && lastIndex !== null && index !== lastIndex) {
            this.shiftCheckRow(row, index, lastIndex);
          } else if (!this.isRowChecked(row)) {
            this.newCheckedRows.push(row);
          } else {
            this.removeCheckedRow(row);
          }

          this.$emit('check', this.newCheckedRows, row); // Emit checked rows to update user variable

          this.$emit('update:checkedRows', this.newCheckedRows);
        },

        /**
         * Check row when shift is pressed.
         */
        shiftCheckRow(row, index, lastCheckedRowIndex) {
          // Get the subset of the list between the two indicies
          const subset = this.visibleData.slice(Math.min(index, lastCheckedRowIndex), Math.max(index, lastCheckedRowIndex) + 1); // Determine the operation based on the state of the clicked checkbox

          const shouldCheck = !this.isRowChecked(row);
          subset.forEach(item => {
            this.removeCheckedRow(item);

            if (shouldCheck && this.isRowCheckable(item)) {
              this.newCheckedRows.push(item);
            }
          });
        },

        /**
        * Row click listener.
        * Emit all necessary events.
        */
        selectRow(row, index) {
          /**
           * @property {Object} row clicked row
           * @property {number} index index of clicked row
           */
          this.$emit('click', row, index);
          if (this.selected === row) return;
          if (!this.isRowSelectable(row)) return; // Emit new and old row

          /**
           * @property {Object} row selected row
           * @property {Array<Object>} selected selected rows
           */

          this.$emit('select', row, this.selected); // Emit new row to update user variable

          this.$emit('update:selected', row);
        },

        /**
        * Toggle to show/hide details slot
        */
        toggleDetails(obj) {
          const found = this.isVisibleDetailRow(obj);

          if (found) {
            this.closeDetailRow(obj);
            this.$emit('details-close', obj);
          } else {
            this.openDetailRow(obj);
            this.$emit('details-open', obj);
          } // Syncs the detailed rows with the parent component


          this.$emit('update:openedDetailed', this.visibleDetailRows);
        },

        openDetailRow(obj) {
          const index = this.handleDetailKey(obj);
          this.visibleDetailRows.push(index);
        },

        closeDetailRow(obj) {
          const index = this.handleDetailKey(obj);
          const i = this.visibleDetailRows.indexOf(index);
          this.visibleDetailRows.splice(i, 1);
        },

        isVisibleDetailRow(obj) {
          const index = this.handleDetailKey(obj);
          const result = this.visibleDetailRows.indexOf(index) >= 0;
          return result;
        },

        isActiveDetailRow(row) {
          return this.detailed && !this.customDetailRow && this.isVisibleDetailRow(row);
        },

        isActiveCustomDetailRow(row) {
          return this.detailed && this.customDetailRow && this.isVisibleDetailRow(row);
        },

        isRowFiltered(row) {
          for (const key in this.filters) {
            // remove key if empty
            if (!this.filters[key]) {
              delete this.filters[key];
              return true;
            }

            const input = this.filters[key];
            const column = this.newColumns.filter(c => c.field === key)[0];

            if (column && column.customSearch && typeof column.customSearch === 'function') {
              return column.customSearch(row, input);
            } else {
              let value = this.getValueByPath(row, key);
              if (value == null) return false;

              if (Number.isInteger(value)) {
                if (value !== Number(input)) return false;
              } else {
                const re = new RegExp(escapeRegExpChars(input), 'i');
                if (!re.test(value)) return false;
              }
            }
          }

          return true;
        },

        /**
        * When the detailKey is defined we use the object[detailKey] as index.
        * If not, use the object reference by default.
        */
        handleDetailKey(index) {
          const key = this.detailKey;
          return !key.length || !index ? index : index[key];
        },

        /**
        * Call initSort only first time (For example async data).
        */
        checkSort() {
          if (this.newColumns.length && this.firstTimeSort) {
            this.initSort();
            this.firstTimeSort = false;
          } else if (this.newColumns.length) {
            if (Object.keys(this.currentSortColumn).length > 0) {
              for (let i = 0; i < this.newColumns.length; i++) {
                if (this.newColumns[i].field === this.currentSortColumn.field) {
                  this.currentSortColumn = this.newColumns[i];
                  break;
                }
              }
            }
          }
        },

        /**
        * Check if footer slot has custom content.
        */
        hasCustomFooterSlot() {
          const footer = this.$slots.footer;
          if (footer.length > 1) return true;
          const tag = footer[0].tag;
          if (tag !== 'th' && tag !== 'td') return false;
          return true;
        },

        /**
        * Table arrow keys listener, change selection.
        */
        pressedArrow(pos) {
          if (!this.visibleData.length) return;
          let index = this.visibleData.indexOf(this.selected) + pos; // Prevent from going up from first and down from last

          index = index < 0 ? 0 : index > this.visibleData.length - 1 ? this.visibleData.length - 1 : index;
          const row = this.visibleData[index];

          if (!this.isRowSelectable(row)) {
            let newIndex = null;

            if (pos > 0) {
              for (let i = index; i < this.visibleData.length && newIndex === null; i++) {
                if (this.isRowSelectable(this.visibleData[i])) newIndex = i;
              }
            } else {
              for (let i = index; i >= 0 && newIndex === null; i--) {
                if (this.isRowSelectable(this.visibleData[i])) newIndex = i;
              }
            }

            if (newIndex >= 0) {
              this.selectRow(this.visibleData[newIndex]);
            }
          } else {
            this.selectRow(row);
          }
        },

        /**
        * Focus table element if has selected prop.
        */
        focus() {
          if (!this.focusable) return;
          this.$el.querySelector('table').focus();
        },

        /**
        * Initial sorted column based on the default-sort prop.
        */
        initSort() {
          if (!this.defaultSort) return;
          let sortField = '';
          let sortDirection = this.defaultSortDirection;

          if (Array.isArray(this.defaultSort)) {
            sortField = this.defaultSort[0];

            if (this.defaultSort[1]) {
              sortDirection = this.defaultSort[1];
            }
          } else {
            sortField = this.defaultSort;
          }

          const sortColumn = this.newColumns.filter(column => column.field === sortField)[0];

          if (sortColumn) {
            this.isAsc = sortDirection.toLowerCase() !== 'desc';
            this.sort(sortColumn, true);
          }
        },

        /**
        * Emits drag start event
        */
        handleDragStart(event, row, index) {
          if (!this.draggable) return;
          this.$emit('dragstart', {
            event,
            row,
            index
          });
        },

        /**
        * Emits drag leave event
        */
        handleDragEnd(event, row, index) {
          if (!this.draggable) return;
          this.$emit('dragend', {
            event,
            row,
            index
          });
        },

        /**
        * Emits drop event
        */
        handleDrop(event, row, index) {
          if (!this.draggable) return;
          this.$emit('drop', {
            event,
            row,
            index
          });
        },

        /**
        * Emits drag over event
        */
        handleDragOver(event, row, index) {
          if (!this.draggable) return;
          this.$emit('dragover', {
            event,
            row,
            index
          });
        },

        /**
        * Emits drag leave event
        */
        handleDragLeave(event, row, index) {
          if (!this.draggable) return;
          this.$emit('dragleave', {
            event,
            row,
            index
          });
        },

        _addColumn(column) {
          this.$nextTick(() => {
            this.defaultSlots.push(column);
            window.requestAnimationFrame(() => {
              const div = this.$refs['slot'];

              if (div && div.children) {
                const position = [...div.children].map(c => parseInt(c.getAttribute('data-id'), 10)).indexOf(column.newKey);

                if (position !== this.defaultSlots.length) {
                  this.defaultSlots.splice(position, 0, column);
                  this.defaultSlots = this.defaultSlots.slice(0, this.defaultSlots.length - 1);
                }
              }
            });
          });
        },

        _removeColumn(column) {
          this.$nextTick(() => {
            this.defaultSlots = this.defaultSlots.filter(d => d.newKey !== column.newKey);
          });
        },

        _nextSequence() {
          return this.sequence++;
        }

      },

      mounted() {
        this.checkSort();
      }

    };

    /* script */
    const __vue_script__$v = script$v;

    /* template */
    var __vue_render__$q = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.tableWrapperClasses,style:(_vm.tableWrapperStyle)},[_c('div',{ref:"slot",staticStyle:{"display":"none"}},[_vm._t("default")],2),(_vm.mobileCards && _vm.hasSortablenewColumns)?_c('o-table-mobile-sort',{attrs:{"current-sort-column":_vm.currentSortColumn,"columns":_vm.newColumns,"placeholder":_vm.mobileSortPlaceholder,"icon-pack":_vm.iconPack,"sort-icon":_vm.sortIcon,"sort-icon-size":_vm.sortIconSize,"is-asc":_vm.isAsc},on:{"sort":function (column, event) { return _vm.sort(column, null, event); },"remove-priority":function (column) { return _vm.removeSortingPriority(column); }}}):_vm._e(),(_vm.paginated && (_vm.paginationPosition === 'top' || _vm.paginationPosition === 'both'))?[_vm._t("pagination",[_c('o-table-pagination',_vm._b({attrs:{"per-page":_vm.perPage,"paginated":_vm.paginated,"total":_vm.newDataTotal,"current-page":_vm.newCurrentPage,"root-class":_vm.paginationWrapperClasses,"icon-pack":_vm.iconPack,"rounded":_vm.paginationRounded,"aria-next-label":_vm.ariaNextLabel,"aria-previous-label":_vm.ariaPreviousLabel,"aria-page-label":_vm.ariaPageLabel,"aria-current-label":_vm.ariaCurrentLabel},on:{"update:currentPage":function($event){_vm.newCurrentPage = $event;},"page-change":function (event) { return _vm.$emit('page-change', event); }}},'o-table-pagination',_vm.$attrs,false),[_vm._t("top-left")],2)])]:_vm._e(),_c('table',{class:_vm.tableClasses,attrs:{"tabindex":!_vm.focusable ? false : 0},on:{"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }if($event.target !== $event.currentTarget){ return null; }$event.preventDefault();return _vm.pressedArrow(-1)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }if($event.target !== $event.currentTarget){ return null; }$event.preventDefault();return _vm.pressedArrow(1)}]}},[(_vm.newColumns.length && _vm.showHeader)?_c('thead',[_c('tr',[(_vm.showDetailRowIcon)?_c('th',{attrs:{"width":"40px"}}):_vm._e(),(_vm.checkable && _vm.checkboxPosition === 'left')?_c('th',{class:_vm.thCheckboxClasses},[(_vm.headerCheckable)?[_c('o-checkbox',{attrs:{"value":_vm.isAllChecked,"disabled":_vm.isAllUncheckable},nativeOn:{"change":function($event){return _vm.checkAll($event)}}})]:_vm._e()],2):_vm._e(),_vm._l((_vm.visibleColumns),function(column,index){return _c('th',_vm._b({key:column.newKey + ':' + index + 'header',class:_vm.thClasses(column),style:(column.style),on:{"click":function($event){$event.stopPropagation();return _vm.sort(column, null, $event)}}},'th',column.thAttrs(column),false),[(column.hasHeaderSlot)?[_c('o-slot-component',{attrs:{"component":column,"scoped":"","name":"header","tag":"span","props":{ column: column, index: index }}})]:[_c('span',[_vm._v(" "+_vm._s(column.label)+" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(column.sortable && _vm.currentSortColumn === column),expression:"column.sortable && currentSortColumn === column"}],class:_vm.thSortIconClasses(column)},[_c('o-icon',{attrs:{"icon":_vm.sortIcon,"pack":_vm.iconPack,"both":"","size":_vm.sortIconSize,"rotation":!_vm.isAsc ? 180 : 0}})],1)])]],2)}),(_vm.checkable && _vm.checkboxPosition === 'right')?_c('th',{class:_vm.thCheckboxClasses},[(_vm.headerCheckable)?[_c('o-checkbox',{attrs:{"value":_vm.isAllChecked,"disabled":_vm.isAllUncheckable},nativeOn:{"change":function($event){return _vm.checkAll($event)}}})]:_vm._e()],2):_vm._e()],2),(_vm.hasSearchablenewColumns)?_c('tr',[(_vm.showDetailRowIcon)?_c('th',{class:_vm.thDetailedClasses}):_vm._e(),(_vm.checkable && _vm.checkboxPosition === 'left')?_c('th'):_vm._e(),_vm._l((_vm.visibleColumns),function(column,index){return _c('th',_vm._b({key:column.newKey + ':' + index + 'searchable',class:_vm.thClasses(column),style:(column.style)},'th',column.thAttrs(column),false),[(column.searchable)?[(column.hasSearchableSlot)?[_c('o-slot-component',{attrs:{"component":column,"scoped":"","name":"searchable","tag":"span","props":{ column: column, filters: _vm.filters }}})]:_c('o-input',{attrs:{"type":column.numeric ? 'number' : 'text'},nativeOn:_vm._d({},[_vm.filtersEvent,function($event){return _vm.onFiltersEvent($event)}]),model:{value:(_vm.filters[column.field]),callback:function ($$v) {_vm.$set(_vm.filters, column.field, $$v);},expression:"filters[column.field]"}})]:_vm._e()],2)}),(_vm.checkable && _vm.checkboxPosition === 'right')?_c('th'):_vm._e()],2):_vm._e()]):_vm._e(),_c('tbody',[_vm._l((_vm.visibleData),function(row,index){return [_c('tr',{key:_vm.customRowKey ? row[_vm.customRowKey] : index,class:_vm.rowClasses(row, index),attrs:{"draggable":_vm.draggable},on:{"click":function($event){return _vm.selectRow(row)},"dblclick":function($event){return _vm.$emit('dblclick', row)},"mouseenter":function($event){_vm.$listeners.mouseenter ? _vm.$emit('mouseenter', row) : null;},"mouseleave":function($event){_vm.$listeners.mouseleave ? _vm.$emit('mouseleave', row) : null;},"contextmenu":function($event){return _vm.$emit('contextmenu', row, $event)},"dragstart":function($event){return _vm.handleDragStart($event, row, index)},"dragend":function($event){return _vm.handleDragEnd($event, row, index)},"drop":function($event){return _vm.handleDrop($event, row, index)},"dragover":function($event){return _vm.handleDragOver($event, row, index)},"dragleave":function($event){return _vm.handleDragLeave($event, row, index)}}},[(_vm.showDetailRowIcon)?_c('td',{class:_vm.tdDetailedChevronClasses},[(_vm.hasDetailedVisible(row))?_c('o-icon',{attrs:{"icon":"chevron-right","pack":_vm.iconPack,"rotation":_vm.isVisibleDetailRow(row) ? 90 : 0,"role":"button","clickable":"","both":""},nativeOn:{"click":function($event){$event.stopPropagation();return _vm.toggleDetails(row)}}}):_vm._e()],1):_vm._e(),(_vm.checkable && _vm.checkboxPosition === 'left')?_c('td',{class:_vm.tdCheckboxClasses},[_c('o-checkbox',{attrs:{"disabled":!_vm.isRowCheckable(row),"value":_vm.isRowChecked(row)},nativeOn:{"click":function($event){$event.preventDefault();$event.stopPropagation();return _vm.checkRow(row, index, $event)}}})],1):_vm._e(),_vm._l((_vm.visibleColumns),function(column,colindex){return [(column.hasDefaultSlot)?[_c('o-slot-component',_vm._b({key:column.newKey + index + ':' + colindex,class:_vm.tdClasses(row, column),attrs:{"component":column,"scoped":"","name":"default","tag":"td","data-label":column.label,"props":{ row: row, column: column, index: index, colindex: colindex, toggleDetails: _vm.toggleDetails }},nativeOn:{"click":function($event){return _vm.$emit('cell-click', row, column, index, colindex, $event)}}},'o-slot-component',column.tdAttrs(row, column),false))]:_vm._e()]}),(_vm.checkable && _vm.checkboxPosition === 'right')?_c('td',{class:_vm.tdCheckboxClasses},[_c('o-checkbox',{attrs:{"disabled":!_vm.isRowCheckable(row),"value":_vm.isRowChecked(row)},nativeOn:{"click":function($event){$event.preventDefault();$event.stopPropagation();return _vm.checkRow(row, index, $event)}}})],1):_vm._e()],2),(_vm.isActiveDetailRow(row))?_c('tr',{key:(_vm.customRowKey ? row[_vm.customRowKey] : index) + 'detail',class:_vm.detailedClasses},[_c('td',{attrs:{"colspan":_vm.columnCount}},[_vm._t("detail",null,{"row":row,"index":index})],2)]):_vm._e(),(_vm.isActiveCustomDetailRow(row))?_vm._t("detail",null,{"row":row,"index":index}):_vm._e()]}),(!_vm.visibleData.length)?_c('tr',[_c('td',{attrs:{"colspan":_vm.columnCount}},[_vm._t("empty")],2)]):_vm._e()],2),(_vm.$slots.footer)?_c('tfoot',[_c('tr',{class:_vm.footerClasses},[(_vm.hasCustomFooterSlot())?_vm._t("footer"):_c('th',{attrs:{"colspan":_vm.columnCount}},[_vm._t("footer")],2)],2)]):_vm._e()]),(_vm.loading)?[_vm._t("loading",[_c('o-loading',{attrs:{"full-page":false,"active":_vm.loading}})])]:_vm._e(),((_vm.checkable && this.$slots['bottom-left']) ||
            (_vm.paginated && (_vm.paginationPosition === 'bottom' || _vm.paginationPosition === 'both')))?[_vm._t("pagination",[_c('o-table-pagination',_vm._b({attrs:{"per-page":_vm.perPage,"paginated":_vm.paginated,"total":_vm.newDataTotal,"current-page":_vm.newCurrentPage,"root-class":_vm.paginationWrapperClasses,"icon-pack":_vm.iconPack,"rounded":_vm.paginationRounded,"aria-next-label":_vm.ariaNextLabel,"aria-previous-label":_vm.ariaPreviousLabel,"aria-page-label":_vm.ariaPageLabel,"aria-current-label":_vm.ariaCurrentLabel},on:{"update:currentPage":function($event){_vm.newCurrentPage = $event;},"page-change":function (event) { return _vm.$emit('page-change', event); }}},'o-table-pagination',_vm.$attrs,false),[_vm._t("bottom-left")],2)])]:_vm._e()],2)};
    var __vue_staticRenderFns__$q = [];

      /* style */
      const __vue_inject_styles__$v = undefined;
      /* scoped */
      const __vue_scope_id__$v = undefined;
      /* module identifier */
      const __vue_module_identifier__$v = undefined;
      /* functional template */
      const __vue_is_functional_template__$v = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$v = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$q, staticRenderFns: __vue_staticRenderFns__$q },
        __vue_inject_styles__$v,
        __vue_script__$v,
        __vue_scope_id__$v,
        __vue_is_functional_template__$v,
        __vue_module_identifier__$v,
        false,
        undefined,
        undefined,
        undefined
      );

    const Plugin$k = {
      install(Vue) {
        // individual import + extend method into Table.vue
        if (typeof VueInstance === 'undefined') {
          setVueInstance(Vue);
        }

        registerComponent(Vue, __vue_component__$v);
        registerComponent(Vue, __vue_component__$t);
      }

    };
    use(Plugin$k);

    //
    /**
     * Responsive horizontal navigation tabs, switch between contents with ease
     * @displayName Tabs
     * @requires ./TabItem.vue
     * @example ./examples/Tabs.md
     * @style _tabs.scss
     */

    var script$w = {
      name: 'OTabs',
      mixins: [BaseComponentMixin, TabbedMixin('tab')],
      configField: 'tabs',
      props: {
        /**
         * Tab type
         * @values boxed, toggle
         */
        type: {
          type: String,
          default: 'default'
        },

        /**
        * Tabs will be expanded (full-width)
        */
        expanded: Boolean,

        /** Tab will have an animation */
        animated: {
          type: Boolean,
          default: () => {
            return getValueByPath(config, 'tabs.animated', true);
          }
        },

        /** Show tab items multiline when there is no space */
        multiline: Boolean,
        rootClass: [String, Function, Array],
        positionClass: [String, Function, Array],
        expandedClass: [String, Function, Array],
        verticalClass: [String, Function, Array],
        multilineClass: [String, Function, Array],
        navTabsClass: [String, Function, Array],
        navSizeClass: [String, Function, Array],
        navPositionClass: [String, Function, Array],
        contentClass: [String, Function, Array],
        transitioningClass: [String, Function, Array],
        tabItemWrapperClass: [String, Function, Array]
      },
      computed: {
        rootClasses() {
          return [this.computedClass('rootClass', 'o-tabs'), {
            [this.computedClass('positionClass', 'o-tabs--', this.position)]: this.position && this.vertical
          }, {
            [this.computedClass('expandedClass', 'o-tabs--fullwidth')]: this.expanded
          }, {
            [this.computedClass('verticalClass', 'o-tabs--vertical')]: this.vertical
          }, {
            [this.computedClass('multilineClass', 'o-tabs--multiline')]: this.multiline
          }];
        },

        itemWrapperClasses() {
          return [this.computedClass('tabItemWrapperClass', 'o-tabs__nav-item-wrapper')];
        },

        navClasses() {
          return [this.computedClass('navTabsClass', 'o-tabs__nav'), {
            [this.computedClass('navSizeClass', 'o-tabs__nav--', this.size)]: this.size
          }, {
            [this.computedClass('navPositionClass', 'o-tabs__nav--', this.position)]: this.position && !this.vertical
          }];
        },

        contentClasses() {
          return [this.computedClass('contentClass', 'o-tabs__content'), {
            [this.computedClass('transitioningClass', 'o-tabs__content--transitioning')]: this.isTransitioning
          }];
        }

      }
    };

    /* script */
    const __vue_script__$w = script$w;

    /* template */
    var __vue_render__$r = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClasses},[_c('nav',{class:_vm.navClasses},_vm._l((_vm.items),function(childItem){return _c('div',{directives:[{name:"show",rawName:"v-show",value:(childItem.visible),expression:"childItem.visible"}],key:childItem.newValue,class:_vm.itemWrapperClasses},[(childItem.$scopedSlots.header)?_c('o-slot-component',{class:childItem.headerClasses,attrs:{"component":childItem,"name":"header","tag":"button"},nativeOn:{"click":function($event){return _vm.childClick(childItem)}}}):_c('button',{class:childItem.headerClasses,on:{"click":function($event){return _vm.childClick(childItem)}}},[(childItem.icon)?_c('o-icon',{attrs:{"rootClass":childItem.headerIconClasses,"icon":childItem.icon,"pack":childItem.iconPack,"size":_vm.size}}):_vm._e(),_c('span',{class:childItem.headerTextClasses},[_vm._v(_vm._s(childItem.label))])],1)],1)}),0),_c('section',{class:_vm.contentClasses},[_vm._t("default")],2)])};
    var __vue_staticRenderFns__$r = [];

      /* style */
      const __vue_inject_styles__$w = undefined;
      /* scoped */
      const __vue_scope_id__$w = undefined;
      /* module identifier */
      const __vue_module_identifier__$w = undefined;
      /* functional template */
      const __vue_is_functional_template__$w = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$w = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$r, staticRenderFns: __vue_staticRenderFns__$r },
        __vue_inject_styles__$w,
        __vue_script__$w,
        __vue_scope_id__$w,
        __vue_is_functional_template__$w,
        __vue_module_identifier__$w,
        false,
        undefined,
        undefined,
        undefined
      );

    /**
     * @displayName Tab Item
     */

    var script$x = {
      name: 'OTabItem',
      mixins: [BaseComponentMixin, TabbedChildMixin('tab')],
      configField: 'tabs',
      props: {
        /** Item will be disabled */
        disabled: Boolean,
        itemClass: [String, Function, Array],
        itemHeaderClass: [String, Function, Array],
        itemHeaderActiveClass: [String, Function, Array],
        itemHeaderDisabledClass: [String, Function, Array],
        itemHeaderTypeClass: [String, Function, Array],
        itemHeaderIconClass: [String, Function, Array],
        itemHeaderTextClass: [String, Function, Array]
      },
      computed: {
        elementClasses() {
          return [this.computedClass('itemClass', 'o-tab-item__content')];
        },

        headerClasses() {
          return [{
            [this.computedClass('itemHeaderClass', 'o-tabs__nav-item-{*}', this.$parent.type)]: this.$parent.type
          }, {
            [this.computedClass('itemHeaderActiveClass', 'o-tabs__nav-item-{*}--active', this.$parent.type)]: this.isActive
          }, {
            [this.computedClass('itemHeaderDisabledClass', 'o-tabs__nav-item-{*}--disabled', this.$parent.type)]: this.disabled
          }, {
            [this.computedClass('itemHeaderTypeClass', 'o-tabs__nav-item-', this.$parent.type)]: this.$parent.type
          }];
        },

        headerIconClasses() {
          return [this.computedClass('itemHeaderIconClass', 'o-tabs__nav-item-icon')];
        },

        headerTextClasses() {
          return [this.computedClass('itemHeaderTextClass', 'o-tabs__nav-item-text')];
        }

      }
    };

    /* script */
    const __vue_script__$x = script$x;

    /* template */

      /* style */
      const __vue_inject_styles__$x = undefined;
      /* scoped */
      const __vue_scope_id__$x = undefined;
      /* module identifier */
      const __vue_module_identifier__$x = undefined;
      /* functional template */
      const __vue_is_functional_template__$x = undefined;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$x = /*#__PURE__*/normalizeComponent(
        {},
        __vue_inject_styles__$x,
        __vue_script__$x,
        __vue_scope_id__$x,
        __vue_is_functional_template__$x,
        __vue_module_identifier__$x,
        false,
        undefined,
        undefined,
        undefined
      );

    const Plugin$l = {
      install(Vue) {
        registerComponent(Vue, __vue_component__$w);
        registerComponent(Vue, __vue_component__$x);
      }

    };
    use(Plugin$l);

    const Plugin$m = {
      install(Vue) {
        registerComponent(Vue, __vue_component__$l);
      }

    };
    use(Plugin$m);

    //
    /**
     * Upload one or more files
     * @displayName Upload
     * @example ./examples/Upload.md
     * @style _upload.scss
     */

    var script$y = {
      name: 'OUpload',
      mixins: [BaseComponentMixin, FormElementMixin],
      configField: 'upload',
      inheritAttrs: false,

      provide() {
        return {
          $elementRef: 'input'
        };
      },

      props: {
        /** @model */
        value: [Object, File, Array],

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
        rootClass: [String, Function, Array],
        draggableClass: [String, Function, Array],
        variantClass: [String, Function, Array],
        expandedClass: [String, Function, Array],
        disabledClass: [String, Function, Array],
        hoveredClass: [String, Function, Array]
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
          }, {
            [this.computedClass('disabledClass', 'o-upl--disabled')]: this.disabled
          }];
        },

        draggableClasses() {
          return [this.computedClass('draggableClass', 'o-upl__draggable'), {
            [this.computedClass('hoveredClass', 'o-upl__draggable--hovered')]: !this.variant && this.dragDropFocus
          }, {
            [this.computedClass('variantClass', 'o-upl__draggable--hovered-', this.variant)]: this.variant && this.dragDropFocus
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
    const __vue_script__$y = script$y;

    /* template */
    var __vue_render__$s = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{class:_vm.rootClasses},[(!_vm.dragDrop)?[_vm._t("default")]:_c('div',{class:_vm.draggableClasses,on:{"mouseenter":function($event){return _vm.updateDragDropFocus(true)},"mouseleave":function($event){return _vm.updateDragDropFocus(false)},"dragover":function($event){$event.preventDefault();return _vm.updateDragDropFocus(true)},"dragleave":function($event){$event.preventDefault();return _vm.updateDragDropFocus(false)},"dragenter":function($event){$event.preventDefault();return _vm.updateDragDropFocus(true)},"drop":function($event){$event.preventDefault();return _vm.onFileChange($event)}}},[_vm._t("default")],2),_c('input',_vm._b({ref:"input",attrs:{"type":"file","multiple":_vm.multiple,"accept":_vm.accept,"disabled":_vm.disabled},on:{"change":_vm.onFileChange}},'input',_vm.$attrs,false))],2)};
    var __vue_staticRenderFns__$s = [];

      /* style */
      const __vue_inject_styles__$y = undefined;
      /* scoped */
      const __vue_scope_id__$y = undefined;
      /* module identifier */
      const __vue_module_identifier__$y = undefined;
      /* functional template */
      const __vue_is_functional_template__$y = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$y = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$s, staticRenderFns: __vue_staticRenderFns__$s },
        __vue_inject_styles__$y,
        __vue_script__$y,
        __vue_scope_id__$y,
        __vue_is_functional_template__$y,
        __vue_module_identifier__$y,
        false,
        undefined,
        undefined,
        undefined
      );

    const Plugin$n = {
      install(Vue) {
        registerComponent(Vue, __vue_component__$y);
      }

    };
    use(Plugin$n);

    var components = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Autocomplete: Plugin$1,
        Button: Plugin$2,
        Checkbox: Plugin$3,
        Collapse: Plugin$4,
        Datepicker: Plugin$5,
        Dropdown: Plugin$6,
        Field: Plugin$7,
        Icon: Plugin$8,
        Input: Plugin$9,
        Loading: Plugin$a,
        Modal: Plugin$b,
        Pagination: Plugin$c,
        Radio: Plugin$d,
        Select: Plugin$e,
        Skeleton: Plugin$f,
        Sidebar: Plugin$g,
        Slider: Plugin$h,
        Steps: Plugin$i,
        Switch: Plugin$j,
        Table: Plugin$k,
        Tabs: Plugin$l,
        Tooltip: Plugin$m,
        Upload: Plugin$n
    });

    const Oruga = {
      install(Vue, options = {}) {
        setVueInstance(Vue); // Options

        setOptions(merge(config, options, true)); // Components

        for (const componentKey in components) {
          registerPlugin(Vue, components[componentKey]);
        } // Config component


        registerComponentProgrammatic(Vue, 'config', Programmatic);
      }

    };
    use(Oruga);

    exports.Autocomplete = Plugin$1;
    exports.Button = Plugin$2;
    exports.Checkbox = Plugin$3;
    exports.Collapse = Plugin$4;
    exports.Config = Plugin;
    exports.Datepicker = Plugin$5;
    exports.Dropdown = Plugin$6;
    exports.Field = Plugin$7;
    exports.Icon = Plugin$8;
    exports.Input = Plugin$9;
    exports.Loading = Plugin$a;
    exports.LoadingProgrammatic = LoadingProgrammatic;
    exports.Modal = Plugin$b;
    exports.ModalProgrammatic = ModalProgrammatic;
    exports.Pagination = Plugin$c;
    exports.Radio = Plugin$d;
    exports.Select = Plugin$e;
    exports.Sidebar = Plugin$g;
    exports.Skeleton = Plugin$f;
    exports.Slider = Plugin$h;
    exports.Steps = Plugin$i;
    exports.Switch = Plugin$j;
    exports.Table = Plugin$k;
    exports.Tabs = Plugin$l;
    exports.Tooltip = Plugin$m;
    exports.Upload = Plugin$n;
    exports.default = Oruga;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
