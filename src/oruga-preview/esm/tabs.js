import { getValueByPath } from './helpers.js';
import { B as BaseComponentMixin, c as config, n as normalizeComponent, e as registerComponent, u as use } from './plugins-948abce9.js';
import './Icon-98338a0a.js';
import './SlotComponent-c00a1886.js';
import { T as TabbedMixin, a as TabbedChildMixin } from './TabbedChildMixin-2985a02e.js';

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
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClasses},[_c('nav',{class:_vm.navClasses},_vm._l((_vm.items),function(childItem){return _c('div',{directives:[{name:"show",rawName:"v-show",value:(childItem.visible),expression:"childItem.visible"}],key:childItem.newValue,class:_vm.itemWrapperClasses},[(childItem.$scopedSlots.header)?_c('o-slot-component',{class:childItem.headerClasses,attrs:{"component":childItem,"name":"header","tag":"button"},nativeOn:{"click":function($event){return _vm.childClick(childItem)}}}):_c('button',{class:childItem.headerClasses,on:{"click":function($event){return _vm.childClick(childItem)}}},[(childItem.icon)?_c('o-icon',{attrs:{"rootClass":childItem.headerIconClasses,"icon":childItem.icon,"pack":childItem.iconPack,"size":_vm.size}}):_vm._e(),_c('span',{class:childItem.headerTextClasses},[_vm._v(_vm._s(childItem.label))])],1)],1)}),0),_c('section',{class:_vm.contentClasses},[_vm._t("default")],2)])};
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

/**
 * @displayName Tab Item
 */

var script$1 = {
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
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
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
    registerComponent(Vue, __vue_component__);
    registerComponent(Vue, __vue_component__$1);
  }

};
use(Plugin);

export default Plugin;
export { __vue_component__$1 as OTabItem, __vue_component__ as OTabs };
