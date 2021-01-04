'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var helpers = require('./helpers.js');
var plugins = require('./plugins-3f7829d9.js');
require('./Icon-5b4af0b7.js');
require('./SlotComponent-0a757062.js');
var TabbedChildMixin = require('./TabbedChildMixin-bf2e7e68.js');

//
/**
 * Responsive horizontal navigation tabs, switch between contents with ease
 * @displayName Tabs
 * @requires ./TabItem.vue
 * @example ./examples/Tabs.md
 * @style _tabs.scss
 */

var script = {
  name: 'OTabs',
  mixins: [plugins.BaseComponentMixin, TabbedChildMixin.TabbedMixin('tab')],
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
        return helpers.getValueByPath(plugins.config, 'tabs.animated', true);
      }
    },

    /** Show tab items multiline when there is no space */
    multiline: Boolean,
    rootClass: String,
    positionWrapperClass: String,
    expandedWrapperClass: String,
    verticalWrapperClass: String,
    multilineWrapperClass: String,
    tabsClass: String,
    sizeClass: String,
    positionClass: String,
    contentClass: String,
    transitioningClass: String,
    tabItemHeaderClass: String,
    tabItemHeaderTypeClass: String,
    tabItemHeaderIconClass: String,
    tabItemHeaderTextClass: String,
    tabItemHeaderActiveClass: String,
    tabItemHeaderDisabledClass: String,
    tabItemWrapperClass: String
  },
  methods: {
    itemHeaderClasses(childItem) {
      return [{
        [this.computedClass('tabItemHeaderActiveClass', 'o-tabs__nav-item-{*}--active', this.type)]: childItem.isActive
      }, {
        [this.computedClass('tabItemHeaderDisabledClass', 'o-tabs__nav-item-{*}--disabled', this.type)]: childItem.disabled
      }, {
        [this.computedClass('tabItemHeaderTypeClass', 'o-tabs__nav-item-', this.type)]: this.type
      }];
    }

  },
  computed: {
    rootClasses() {
      return [this.computedClass('rootClass', 'o-tabs'), {
        [this.computedClass('positionWrapperClass', 'o-tabs--', this.position)]: this.position && this.vertical
      }, {
        [this.computedClass('expandedWrapperClass', 'o-tabs--fullwidth')]: this.expanded
      }, {
        [this.computedClass('verticalWrapperClass', 'o-tabs--vertical')]: this.vertical
      }, {
        [this.computedClass('multilineWrapperClass', 'o-tabs--multiline')]: this.multiline
      }];
    },

    itemWrapperClasses() {
      return [this.computedClass('tabItemWrapperClass', 'o-tabs__nav-item-wrapper')];
    },

    navClasses() {
      return [this.computedClass('tabsClass', 'o-tabs__nav'), {
        [this.computedClass('sizeClass', 'o-tabs__nav--', this.size)]: this.size
      }, {
        [this.computedClass('positionClass', 'o-tabs__nav--', this.position)]: this.position && !this.vertical
      }];
    },

    contentClasses() {
      return [this.computedClass('contentClass', 'o-tabs__content'), {
        [this.computedClass('transitioningClass', 'o-tabs__content--transitioning')]: this.isTransitioning
      }];
    },

    itemHeaderIconClasses() {
      return [this.computedClass('tabItemHeaderIconClass', 'o-tabs__nav-item-icon')];
    },

    itemHeaderTextClasses() {
      return [this.computedClass('tabItemHeaderTextClass', 'o-tabs__nav-item-text')];
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClasses},[_c('nav',{class:_vm.navClasses},_vm._l((_vm.items),function(childItem){return _c('div',{directives:[{name:"show",rawName:"v-show",value:(childItem.visible),expression:"childItem.visible"}],key:childItem.newValue,class:_vm.itemWrapperClasses},[(childItem.$scopedSlots.header)?_c('o-slot-component',{class:childItem.headerClasses,attrs:{"component":childItem,"name":"header","tag":"button"},nativeOn:{"click":function($event){return _vm.childClick(childItem)}}}):_c('button',{class:_vm.itemHeaderClasses(childItem),on:{"click":function($event){return _vm.childClick(childItem)}}},[(childItem.icon)?_c('o-icon',{attrs:{"rootClass":_vm.itemHeaderIconClasses.join(' '),"icon":childItem.icon,"pack":childItem.iconPack,"size":_vm.size}}):_vm._e(),_c('span',{class:_vm.itemHeaderTextClasses},[_vm._v(_vm._s(childItem.label))])],1)],1)}),0),_c('section',{class:_vm.contentClasses},[_vm._t("default")],2)])};
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

/**
 * @displayName Tab Item
 */

var script$1 = {
  name: 'OTabItem',
  mixins: [plugins.BaseComponentMixin, TabbedChildMixin.TabbedChildMixin('tab')],
  configField: 'tabs',
  props: {
    /** Item will be disabled */
    disabled: Boolean,
    itemClass: String,
    itemHeaderClass: String,
    itemHeaderActiveClass: String,
    itemHeaderDisabledClass: String,
    itemHeaderTypeClass: String
  },
  computed: {
    elementClasses() {
      return [this.computedClass('itemClass', 'o-tab-item__content')];
    },

    headerClasses() {
      return [{
        [this.computedClass('itemHeaderActiveClass', 'o-tabs__nav-item-{*}--active', this.$parent.type)]: this.isActive
      }, {
        [this.computedClass('itemHeaderDisabledClass', 'o-tabs__nav-item-{*}--disabled', this.$parent.type)]: this.disabled
      }, {
        [this.computedClass('itemHeaderTypeClass', 'o-tabs__nav-item-', this.$parent.type)]: this.$parent.type
      } // this.headerClass || this.computedClass('itemHeaderClass', 'o-tabs__nav-item'),
      // { [this.computedClass('itemHeaderTypeClass', 'o-tabs__nav-item--', this.$parent.type)]: this.$parent.type },
      // { [this.computedClass('itemHeaderActiveClass', 'o-tabs__nav-item--active')]: this.isActive },
      // { [this.computedClass('itemHeaderDisabledClass', 'o-tabs__nav-item--disabled')]: this.disabled }
      ];
    }

  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/plugins.normalizeComponent(
    {},
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

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, __vue_component__);
    plugins.registerComponent(Vue, __vue_component__$1);
  }

};
plugins.use(Plugin);

exports.OTabItem = __vue_component__$1;
exports.OTabs = __vue_component__;
exports.default = Plugin;
