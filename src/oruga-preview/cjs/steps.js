'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var helpers = require('./helpers.js');
var plugins = require('./plugins-d1c9ea2a.js');
var Icon = require('./Icon-d8c779b9.js');
var Button = require('./Button-4908c70f.js');
var MatchMediaMixin = require('./MatchMediaMixin-fc00267e.js');
require('./SlotComponent-0a757062.js');
var TabbedChildMixin = require('./TabbedChildMixin-d3a88988.js');

//
/**
 * Responsive horizontal process steps
 * @displayName Steps
 * @requires ./StepItem.vue
 * @example ./examples/Steps.md
 * @style _steps.scss
 */

var script = {
  name: 'OSteps',
  components: {
    [Button.__vue_component__.name]: Button.__vue_component__,
    [Icon.__vue_component__.name]: Icon.__vue_component__
  },
  configField: 'steps',
  mixins: [plugins.BaseComponentMixin, MatchMediaMixin.MatchMediaMixin, TabbedChildMixin.TabbedMixin('step')],
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
        return helpers.getValueByPath(plugins.config, 'steps.iconPrev', 'chevron-left');
      }
    },

    /** Icon to use for navigation button */
    iconNext: {
      type: String,
      default: () => {
        return helpers.getValueByPath(plugins.config, 'steps.iconNext', 'chevron-right');
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
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.wrapperClasses},[_c('nav',{class:_vm.mainClasses},_vm._l((_vm.items),function(childItem,index){return _c('div',{directives:[{name:"show",rawName:"v-show",value:(childItem.visible),expression:"childItem.visible"}],key:childItem.newValue,class:childItem.itemClasses},[(index > 0)?_c('span',{class:_vm.stepDividerClasses}):_vm._e(),_c('a',{class:_vm.stepLinkClasses(childItem),on:{"click":function($event){_vm.isItemClickable(childItem) && _vm.childClick(childItem);}}},[_c('div',{class:_vm.stepMarkerClasses},[(childItem.icon)?_c('o-icon',{attrs:{"icon":childItem.icon,"pack":childItem.iconPack,"size":_vm.size}}):(childItem.step)?_c('span',[_vm._v(_vm._s(childItem.step))]):_vm._e()],1),_c('div',{class:_vm.stepLinkLabelClasses},[_vm._v(_vm._s(childItem.label))])])])}),0),_c('section',{class:_vm.stepContentClasses},[_vm._t("default")],2),_vm._t("navigation",[(_vm.hasNavigation)?_c('nav',{class:_vm.stepNavigationClasses},[_c('o-button',{attrs:{"role":"button","icon-left":_vm.iconPrev,"icon-pack":_vm.iconPack,"icon-both":"","disabled":_vm.navigationProps.previous.disabled,"aria-label":_vm.ariaPreviousLabel},on:{"click":function($event){$event.preventDefault();return _vm.navigationProps.previous.action($event)}}}),_c('o-button',{attrs:{"role":"button","icon-left":_vm.iconNext,"icon-pack":_vm.iconPack,"icon-both":"","disabled":_vm.navigationProps.next.disabled,"aria-label":_vm.ariaNextLabel},on:{"click":function($event){$event.preventDefault();return _vm.navigationProps.next.action($event)}}})],1):_vm._e()],{"previous":_vm.navigationProps.previous,"next":_vm.navigationProps.next})],2)};
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
 * @displayName Step Item
 */

var script$1 = {
  name: 'OStepItem',
  mixins: [plugins.BaseComponentMixin, TabbedChildMixin.TabbedChildMixin('step')],
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

exports.OStepItem = __vue_component__$1;
exports.OSteps = __vue_component__;
exports.default = Plugin;
