import { getValueByPath } from './helpers.js';
import { c as config, n as normalizeComponent, B as BaseComponentMixin } from './plugins-b98d7e7d.js';
import { _ as __vue_component__$2 } from './Icon-a954439c.js';
import { M as MatchMediaMixin } from './MatchMediaMixin-4e5c9540.js';

//
var script = {
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
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,_vm._b({tag:"component",class:_vm.linkClasses,attrs:{"role":"button","href":_vm.href,"disabled":_vm.isDisabled,"aria-label":_vm.page['aria-label'],"aria-current":_vm.page.isCurrent},on:{"click":function($event){$event.preventDefault();return _vm.page.click($event)}}},'component',_vm.$attrs,false),[_vm._t("default",[_vm._v(_vm._s(_vm.page.number))])],2)};
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
 * A responsive and flexible pagination
 * @displayName Pagination
 * @example ./examples/Pagination.md
 * @style _pagination.scss
 */

var script$1 = {
  name: 'OPagination',
  components: {
    [__vue_component__$2.name]: __vue_component__$2,
    [__vue_component__.name]: __vue_component__
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
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{class:_vm.rootClasses},[(_vm.hasPreviousSlot)?_vm._t("previous",[_c('o-icon',{attrs:{"icon":_vm.iconPrev,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],{"linkClass":_vm.linkClasses,"linkCurrentClass":_vm.linkCurrentClasses,"page":_vm.getPage(_vm.current - 1, {
            class: _vm.prevBtnClasses,
            'aria-label': _vm.ariaPreviousLabel
    })}):_c('o-pagination-button',{class:_vm.prevBtnClasses,attrs:{"linkClass":_vm.linkClasses,"linkCurrentClass":_vm.linkCurrentClasses,"page":_vm.getPage(_vm.current - 1)}},[_c('o-icon',{attrs:{"icon":_vm.iconPrev,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],1),(_vm.hasNextSlot)?_vm._t("next",[_c('o-icon',{attrs:{"icon":_vm.iconNext,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],{"linkClass":_vm.linkClasses,"linkCurrentClass":_vm.linkCurrentClasses,"page":_vm.getPage(_vm.current + 1, {
            class: _vm.nextBtnClasses,
            'aria-label': _vm.ariaNextLabel,
    })}):_c('o-pagination-button',{class:_vm.nextBtnClasses,attrs:{"linkClass":_vm.linkClasses,"linkCurrentClass":_vm.linkCurrentClasses,"page":_vm.getPage(_vm.current + 1)}},[_c('o-icon',{attrs:{"icon":_vm.iconNext,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],1),(_vm.simple)?_c('small',{class:_vm.infoClasses},[(_vm.perPage == 1)?[_vm._v(" "+_vm._s(_vm.firstItem)+" / "+_vm._s(_vm.total)+" ")]:[_vm._v(" "+_vm._s(_vm.firstItem)+"-"+_vm._s(Math.min(_vm.current * _vm.perPage, _vm.total))+" / "+_vm._s(_vm.total)+" ")]],2):_c('ul',{class:_vm.listClasses},[(_vm.hasFirst)?_c('li',[(_vm.hasDefaultSlot)?_vm._t("default",null,{"page":_vm.getPage(1),"linkClass":_vm.linkClasses,"linkCurrentClass":_vm.linkCurrentClasses}):_c('o-pagination-button',{attrs:{"linkClass":_vm.linkClasses,"linkCurrentClass":_vm.linkCurrentClasses,"page":_vm.getPage(1)}})],2):_vm._e(),(_vm.hasFirstEllipsis)?_c('li',[_c('span',{class:_vm.ellipsisClasses},[_vm._v("…")])]):_vm._e(),_vm._l((_vm.pagesInRange),function(page){return _c('li',{key:page.number},[(_vm.hasDefaultSlot)?_vm._t("default",null,{"page":page,"linkClass":_vm.linkClasses,"linkCurrentClass":_vm.linkCurrentClasses}):_c('o-pagination-button',{attrs:{"linkClass":_vm.linkClasses,"linkCurrentClass":_vm.linkCurrentClasses,"page":page}})],2)}),(_vm.hasLastEllipsis)?_c('li',[_c('span',{class:_vm.ellipsisClasses},[_vm._v("…")])]):_vm._e(),(_vm.hasLast)?_c('li',[(_vm.hasDefaultSlot)?_vm._t("default",null,{"page":_vm.getPage(_vm.pageCount),"linkClass":_vm.linkClasses,"linkCurrentClass":_vm.linkCurrentClasses}):_c('o-pagination-button',{attrs:{"linkClass":_vm.linkClasses,"linkCurrentClass":_vm.linkCurrentClasses,"page":_vm.getPage(_vm.pageCount)}})],2):_vm._e()],2)],2)};
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

export { __vue_component__$1 as _, __vue_component__ as a };
