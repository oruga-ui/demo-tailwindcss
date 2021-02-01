import { getValueByPath, toCssDimension, createAbsoluteElement, removeElement } from './helpers.js';
import { B as BaseComponentMixin, c as config, n as normalizeComponent } from './plugins-948abce9.js';
import { M as MatchMediaMixin } from './MatchMediaMixin-bec150b5.js';
import { d as directive } from './trapFocus-25a621e6.js';

//
/**
 * Dropdowns are very versatile, can used as a quick menu or even like a select for discoverable content
 * @displayName Dropdown
 * @requires ./DropdownItem.vue
 * @example ./examples/Dropdown.md
 * @style _dropdown.scss
 */

var script = {
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
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"dropdown",class:_vm.rootClasses},[(!_vm.inline)?_c('div',{ref:"trigger",class:_vm.triggerClasses,attrs:{"role":"button","aria-haspopup":"true"},on:{"click":_vm.onClick,"contextmenu":function($event){$event.preventDefault();return _vm.onContextMenu($event)},"mouseenter":_vm.onHover,"mouseleave":function($event){_vm.isHoverable = false;},"!focus":function($event){return _vm.onFocus($event)}}},[_vm._t("trigger",null,{"active":_vm.isActive})],2):_vm._e(),_c('transition',{attrs:{"name":_vm.animation}},[(_vm.isMobileModal)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"}],class:_vm.menuMobileOverlayClasses,attrs:{"aria-hidden":!_vm.isActive}}):_vm._e()]),_c('transition',{attrs:{"name":_vm.animation}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:((!_vm.disabled && (_vm.isActive || _vm.isHoverable)) || _vm.inline),expression:"(!disabled && (isActive || isHoverable)) || inline"},{name:"trap-focus",rawName:"v-trap-focus",value:(_vm.trapFocus),expression:"trapFocus"}],ref:"dropdownMenu",class:_vm.menuClasses,style:(_vm.menuStyle),attrs:{"aria-hidden":!_vm.isActive,"role":_vm.ariaRole},on:{"mouseenter":_vm.onHover,"mouseleave":function($event){_vm.isHoverable = false;}}},[_vm._t("default")],2)])],1)};
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

//
/**
 * @displayName Dropdown Item
 */

var script$1 = {
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
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{tag:"component",class:_vm.rootClasses,attrs:{"role":_vm.ariaRoleItem,"tabindex":_vm.tabindex},on:{"click":_vm.selectItem}},[_vm._t("default")],2)};
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

export { __vue_component__ as _, __vue_component__$1 as a };
