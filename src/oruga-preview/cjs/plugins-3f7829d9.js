'use strict';

var helpers = require('./helpers.js');

exports.config = {
  iconPack: 'mdi',
  useHtml5Validation: true,
  statusIcon: true
};
const setOptions = options => {
  exports.config = options;
};
const setVueInstance = Vue => {
  exports.VueInstance = Vue;
};
const Programmatic = {
  getOptions() {
    return exports.config;
  },

  setOptions(options) {
    setOptions(helpers.merge(exports.config, options, true));
  }

};
const Plugin = {
  install(Vue, options = {}) {
    setVueInstance(Vue); // Options

    setOptions(helpers.merge(exports.config, options, true));
  }

};

const _defaultSuffixProcessor = (input, suffix) => {
  return helpers.blankIfUndefined(input).split(' ').filter(cls => cls.length > 0).map(cls => cls + suffix).join(' ');
};

var BaseComponentMixin = {
  methods: {
    computedClass(field, defaultValue, suffix = '') {
      let override = helpers.getValueByPath(exports.config, `${this.$options.configField}.override`, false);
      let overrideClass = helpers.getValueByPath(exports.config, `${this.$options.configField}.${field}.override`, override);
      let globalClass = helpers.getValueByPath(exports.config, `${this.$options.configField}.${field}.class`, '') || helpers.getValueByPath(exports.config, `${this.$options.configField}.${field}`, '');
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

      return (`${override && !overrideClass || !override && !overrideClass ? defaultValue : ''} ` + `${helpers.blankIfUndefined(globalClass)} ` + `${helpers.blankIfUndefined(currentClass)}`).trim().replace(/\s\s+/g, ' ');
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

exports.BaseComponentMixin = BaseComponentMixin;
exports.Plugin = Plugin;
exports.Programmatic = Programmatic;
exports.normalizeComponent = normalizeComponent;
exports.registerComponent = registerComponent;
exports.registerComponentProgrammatic = registerComponentProgrammatic;
exports.registerPlugin = registerPlugin;
exports.setOptions = setOptions;
exports.setVueInstance = setVueInstance;
exports.use = use;
