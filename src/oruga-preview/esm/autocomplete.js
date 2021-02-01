import { getValueByPath, toCssDimension, debounce, createAbsoluteElement, removeElement } from './helpers.js';
import { B as BaseComponentMixin, c as config, n as normalizeComponent, e as registerComponent, u as use } from './plugins-948abce9.js';
import './Icon-98338a0a.js';
import { F as FormElementMixin } from './FormElementMixin-fc713fb1.js';
import { _ as __vue_component__$1 } from './Input-37c8e91d.js';

//
/**
 * Extended input that provide suggestions while the user types
 * @displayName Autocomplete
 * @example ./examples/Autocomplete.md
 * @style _autocomplete.scss
 */

var script = {
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
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClasses},[_c('o-input',_vm._b({ref:"input",attrs:{"type":"text","size":_vm.size,"rounded":_vm.rounded,"icon":_vm.icon,"icon-right":_vm.newIconRight,"icon-right-clickable":_vm.newIconRightClickable,"icon-pack":_vm.iconPack,"maxlength":_vm.maxlength,"autocomplete":_vm.newAutocomplete,"use-html5-validation":false},on:{"input":_vm.onInput,"focus":_vm.focused,"blur":_vm.onBlur,"icon-right-click":_vm.rightIconClick,"icon-click":function (event) { return _vm.$emit('icon-click', event); }},nativeOn:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }$event.preventDefault();_vm.isActive = false;},"keydown":[function($event){return _vm.keydown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }$event.preventDefault();return _vm.keyArrows('up')},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }$event.preventDefault();return _vm.keyArrows('down')}]},model:{value:(_vm.newValue),callback:function ($$v) {_vm.newValue=$$v;},expression:"newValue"}},'o-input',_vm.inputBind,false)),_c('transition',{attrs:{"name":_vm.animation}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive && (!_vm.isEmpty || _vm.$slots.empty || _vm.$slots.header)),expression:"isActive && (!isEmpty || $slots.empty || $slots.header)"}],ref:"dropdown",class:_vm.menuClasses,style:(_vm.menuStyle)},[(_vm.$slots.header)?_c('div',{class:_vm.itemClasses},[_vm._t("header")],2):_vm._e(),_vm._l((_vm.computedData),function(element,groupindex){return [(element.group)?_c('div',{key:groupindex + 'group',class:_vm.itemEmptyClasses},[(_vm.$scopedSlots.group)?_vm._t("group",null,{"group":element.group,"index":groupindex}):_c('span',[_vm._v(" "+_vm._s(element.group)+" ")])],2):_vm._e(),_vm._l((element.items),function(option,index){return _c('div',{key:groupindex + ':' + index,class:_vm.itemOptionClasses(option),on:{"click":function($event){return _vm.setSelected(option, undefined, $event)}}},[(_vm.$scopedSlots.default)?_vm._t("default",null,{"option":option,"index":index}):_c('span',[_vm._v(" "+_vm._s(_vm.getValue(option, true))+" ")])],2)})]}),(_vm.isEmpty && _vm.$slots.empty)?_c('div',{class:_vm.itemEmptyClasses},[_vm._t("empty")],2):_vm._e(),(_vm.$slots.footer)?_c('div',{class:_vm.itemClasses},[_vm._t("footer")],2):_vm._e()],2)])],1)};
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
export { __vue_component__ as OAutocomplete };
