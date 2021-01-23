'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var helpers = require('./helpers.js');
var plugins = require('./plugins-d1c9ea2a.js');
var Icon = require('./Icon-d8c779b9.js');
require('./FormElementMixin-f42a30ee.js');
var Input = require('./Input-beb368bf.js');
var Button = require('./Button-4908c70f.js');
require('./CheckRadioMixin-df88dd8e.js');
var Checkbox = require('./Checkbox-1db20027.js');
var MatchMediaMixin = require('./MatchMediaMixin-fc00267e.js');
var Field = require('./Field-91ccc16b.js');
var Select = require('./Select-fde028f3.js');
require('./ssr-39c7e185.js');
var Loading = require('./Loading-fc982f40.js');
var Pagination = require('./Pagination-18c92745.js');
var SlotComponent = require('./SlotComponent-0a757062.js');

//
var script = {
  name: 'OTableMobileSort',
  components: {
    [Button.__vue_component__.name]: Button.__vue_component__,
    [Select.__vue_component__.name]: Select.__vue_component__,
    [Icon.__vue_component__.name]: Icon.__vue_component__,
    [Field.__vue_component__.name]: Field.__vue_component__
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
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.$table.mobileSortClasses},[_c('o-field',[_c('o-select',{attrs:{"expanded":""},model:{value:(_vm.mobileSort),callback:function ($$v) {_vm.mobileSort=$$v;},expression:"mobileSort"}},[(_vm.placeholder)?[_c('option',{directives:[{name:"show",rawName:"v-show",value:(_vm.showPlaceholder),expression:"showPlaceholder"}],attrs:{"selected":"","disabled":"","hidden":""},domProps:{"value":{}}},[_vm._v(" "+_vm._s(_vm.placeholder)+" ")])]:_vm._e(),_vm._l((_vm.sortableColumns),function(column,index){return _c('option',{key:index,domProps:{"value":column}},[_vm._v(" "+_vm._s(column.label)+" ")])})],2),_c('o-button',{on:{"click":_vm.sort}},[_c('o-icon',{directives:[{name:"show",rawName:"v-show",value:(_vm.currentSortColumn === _vm.mobileSort),expression:"currentSortColumn === mobileSort"}],attrs:{"icon":_vm.sortIcon,"pack":_vm.iconPack,"size":_vm.sortIconSize,"both":"","rotation":!_vm.isAsc ? 180 : 0}})],1)],1)],1)};
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
 * @displayName Table Column
 */

var script$1 = {
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
        width: helpers.toCssDimension(this.width)
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
var script$2 = {
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
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClass},[_c('div',[_vm._t("default")],2),_c('div',[(_vm.paginated)?_c('div',[_c('o-pagination',{attrs:{"icon-pack":_vm.iconPack,"total":_vm.total,"per-page":_vm.perPage,"simple":_vm.paginationSimple,"size":_vm.paginationSize,"current":_vm.newCurrentPage,"rounded":_vm.rounded,"aria-next-label":_vm.ariaNextLabel,"aria-previous-label":_vm.ariaPreviousLabel,"aria-page-label":_vm.ariaPageLabel,"aria-current-label":_vm.ariaCurrentLabel},on:{"change":_vm.pageChanged}})],1):_vm._e()])])};
var __vue_staticRenderFns__$1 = [];

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
  

  
  const __vue_component__$2 = /*#__PURE__*/plugins.normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
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

//
/**
 * Tabulated data are sometimes needed, it's even better when it's responsive
 * @displayName Table
 * @requires ./TableColumn.vue
 * @example ./examples/Table.md
 * @style _table.scss
 */

var script$3 = {
  name: 'OTable',
  components: {
    [Button.__vue_component__.name]: Button.__vue_component__,
    [Checkbox.__vue_component__.name]: Checkbox.__vue_component__,
    [Icon.__vue_component__.name]: Icon.__vue_component__,
    [Input.__vue_component__.name]: Input.__vue_component__,
    [Pagination.__vue_component__.name]: Pagination.__vue_component__,
    [Loading.__vue_component__.name]: Loading.__vue_component__,
    [SlotComponent.SlotComponent.name]: SlotComponent.SlotComponent,
    [__vue_component__.name]: __vue_component__,
    [__vue_component__$1.name]: __vue_component__$1,
    [__vue_component__$2.name]: __vue_component__$2
  },
  mixins: [plugins.BaseComponentMixin, MatchMediaMixin.MatchMediaMixin],
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
        return helpers.getValueByPath(plugins.config, 'table.mobileCards', true);
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
        return helpers.getValueByPath(plugins.config, 'table.sortIcon', 'arrow-up');
      }
    },

    /**
     * Sets the size of the sorting icon
     * @values small, medium, large
     */
    sortIconSize: {
      type: String,
      default: () => {
        return helpers.getValueByPath(plugins.config, 'table.sortIconSize', 'small');
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
        return helpers.getValueByPath(plugins.config, 'table.perPage', 20);
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
        return helpers.getValueByPath(plugins.config, 'table.paginationPosition', 'bottom');
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
        return helpers.getValueByPath(plugins.config, 'table.showHeader', true);
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
      getValueByPath: helpers.getValueByPath,
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
        height: helpers.toCssDimension(this.height)
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
        return helpers.indexOf(this.newCheckedRows, currentVisibleRow, this.customIsChecked) < 0;
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
          const TableColumnComponent = plugins.VueInstance.extend(__vue_component__$1);
          const component = new TableColumnComponent({
            parent: this,
            propsData: column
          });
          component.$scopedSlots = {
            'default': props => {
              const vnode = component.$createElement('span', {
                domProps: {
                  innerHTML: helpers.getValueByPath(props.row, column.field)
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
        this.debouncedHandleFiltersChange = helpers.debounce(this.handleFiltersChange, value);
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
      return [...this.thBaseClasses, ...this.thStickyClasses(column), helpers.getValueByPath(column.thAttrs(column), 'class'), {
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
      return [...this.tdBaseClasses, helpers.getValueByPath(column.tdAttrs(row, column), 'class'), {
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
          let newA = helpers.getValueByPath(a, key);
          let newB = helpers.getValueByPath(b, key); // sort boolean type

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
      return helpers.indexOf(this.newCheckedRows, row, this.customIsChecked) >= 0;
    },

    /**
    * Remove a checked row from the array.
    */
    removeCheckedRow(row) {
      const index = helpers.indexOf(this.newCheckedRows, row, this.customIsChecked);

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
            const re = new RegExp(helpers.escapeRegExpChars(input), 'i');
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
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.tableWrapperClasses,style:(_vm.tableWrapperStyle)},[_c('div',{ref:"slot",staticStyle:{"display":"none"}},[_vm._t("default")],2),(_vm.mobileCards && _vm.hasSortablenewColumns)?_c('o-table-mobile-sort',{attrs:{"current-sort-column":_vm.currentSortColumn,"columns":_vm.newColumns,"placeholder":_vm.mobileSortPlaceholder,"icon-pack":_vm.iconPack,"sort-icon":_vm.sortIcon,"sort-icon-size":_vm.sortIconSize,"is-asc":_vm.isAsc},on:{"sort":function (column, event) { return _vm.sort(column, null, event); },"remove-priority":function (column) { return _vm.removeSortingPriority(column); }}}):_vm._e(),(_vm.paginated && (_vm.paginationPosition === 'top' || _vm.paginationPosition === 'both'))?[_vm._t("pagination",[_c('o-table-pagination',_vm._b({attrs:{"per-page":_vm.perPage,"paginated":_vm.paginated,"total":_vm.newDataTotal,"current-page":_vm.newCurrentPage,"root-class":_vm.paginationWrapperClasses,"icon-pack":_vm.iconPack,"rounded":_vm.paginationRounded,"aria-next-label":_vm.ariaNextLabel,"aria-previous-label":_vm.ariaPreviousLabel,"aria-page-label":_vm.ariaPageLabel,"aria-current-label":_vm.ariaCurrentLabel},on:{"update:currentPage":function($event){_vm.newCurrentPage = $event;},"page-change":function (event) { return _vm.$emit('page-change', event); }}},'o-table-pagination',_vm.$attrs,false),[_vm._t("top-left")],2)])]:_vm._e(),_c('table',{class:_vm.tableClasses,attrs:{"tabindex":!_vm.focusable ? false : 0},on:{"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }if($event.target !== $event.currentTarget){ return null; }$event.preventDefault();return _vm.pressedArrow(-1)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }if($event.target !== $event.currentTarget){ return null; }$event.preventDefault();return _vm.pressedArrow(1)}]}},[(_vm.newColumns.length && _vm.showHeader)?_c('thead',[_c('tr',[(_vm.showDetailRowIcon)?_c('th',{attrs:{"width":"40px"}}):_vm._e(),(_vm.checkable && _vm.checkboxPosition === 'left')?_c('th',{class:_vm.thCheckboxClasses},[(_vm.headerCheckable)?[_c('o-checkbox',{attrs:{"value":_vm.isAllChecked,"disabled":_vm.isAllUncheckable},nativeOn:{"change":function($event){return _vm.checkAll($event)}}})]:_vm._e()],2):_vm._e(),_vm._l((_vm.visibleColumns),function(column,index){return _c('th',_vm._b({key:column.newKey + ':' + index + 'header',class:_vm.thClasses(column),style:(column.style),on:{"click":function($event){$event.stopPropagation();return _vm.sort(column, null, $event)}}},'th',column.thAttrs(column),false),[(column.hasHeaderSlot)?[_c('o-slot-component',{attrs:{"component":column,"scoped":"","name":"header","tag":"span","props":{ column: column, index: index }}})]:[_c('span',[_vm._v(" "+_vm._s(column.label)+" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(column.sortable && _vm.currentSortColumn === column),expression:"column.sortable && currentSortColumn === column"}],class:_vm.thSortIconClasses(column)},[_c('o-icon',{attrs:{"icon":_vm.sortIcon,"pack":_vm.iconPack,"both":"","size":_vm.sortIconSize,"rotation":!_vm.isAsc ? 180 : 0}})],1)])]],2)}),(_vm.checkable && _vm.checkboxPosition === 'right')?_c('th',{class:_vm.thCheckboxClasses},[(_vm.headerCheckable)?[_c('o-checkbox',{attrs:{"value":_vm.isAllChecked,"disabled":_vm.isAllUncheckable},nativeOn:{"change":function($event){return _vm.checkAll($event)}}})]:_vm._e()],2):_vm._e()],2),(_vm.hasSearchablenewColumns)?_c('tr',[(_vm.showDetailRowIcon)?_c('th',{class:_vm.thDetailedClasses}):_vm._e(),(_vm.checkable && _vm.checkboxPosition === 'left')?_c('th'):_vm._e(),_vm._l((_vm.visibleColumns),function(column,index){return _c('th',_vm._b({key:column.newKey + ':' + index + 'searchable',class:_vm.thClasses(column),style:(column.style)},'th',column.thAttrs(column),false),[(column.searchable)?[(column.hasSearchableSlot)?[_c('o-slot-component',{attrs:{"component":column,"scoped":"","name":"searchable","tag":"span","props":{ column: column, filters: _vm.filters }}})]:_c('o-input',{attrs:{"type":column.numeric ? 'number' : 'text'},nativeOn:_vm._d({},[_vm.filtersEvent,function($event){return _vm.onFiltersEvent($event)}]),model:{value:(_vm.filters[column.field]),callback:function ($$v) {_vm.$set(_vm.filters, column.field, $$v);},expression:"filters[column.field]"}})]:_vm._e()],2)}),(_vm.checkable && _vm.checkboxPosition === 'right')?_c('th'):_vm._e()],2):_vm._e()]):_vm._e(),_c('tbody',[_vm._l((_vm.visibleData),function(row,index){return [_c('tr',{key:_vm.customRowKey ? row[_vm.customRowKey] : index,class:_vm.rowClasses(row, index),attrs:{"draggable":_vm.draggable},on:{"click":function($event){return _vm.selectRow(row)},"dblclick":function($event){return _vm.$emit('dblclick', row)},"mouseenter":function($event){_vm.$listeners.mouseenter ? _vm.$emit('mouseenter', row) : null;},"mouseleave":function($event){_vm.$listeners.mouseleave ? _vm.$emit('mouseleave', row) : null;},"contextmenu":function($event){return _vm.$emit('contextmenu', row, $event)},"dragstart":function($event){return _vm.handleDragStart($event, row, index)},"dragend":function($event){return _vm.handleDragEnd($event, row, index)},"drop":function($event){return _vm.handleDrop($event, row, index)},"dragover":function($event){return _vm.handleDragOver($event, row, index)},"dragleave":function($event){return _vm.handleDragLeave($event, row, index)}}},[(_vm.showDetailRowIcon)?_c('td',{class:_vm.tdDetailedChevronClasses},[(_vm.hasDetailedVisible(row))?_c('o-icon',{attrs:{"icon":"chevron-right","pack":_vm.iconPack,"rotation":_vm.isVisibleDetailRow(row) ? 90 : 0,"role":"button","clickable":"","both":""},nativeOn:{"click":function($event){$event.stopPropagation();return _vm.toggleDetails(row)}}}):_vm._e()],1):_vm._e(),(_vm.checkable && _vm.checkboxPosition === 'left')?_c('td',{class:_vm.tdCheckboxClasses},[_c('o-checkbox',{attrs:{"disabled":!_vm.isRowCheckable(row),"value":_vm.isRowChecked(row)},nativeOn:{"click":function($event){$event.preventDefault();$event.stopPropagation();return _vm.checkRow(row, index, $event)}}})],1):_vm._e(),_vm._l((_vm.visibleColumns),function(column,colindex){return [(column.hasDefaultSlot)?[_c('o-slot-component',_vm._b({key:column.newKey + index + ':' + colindex,class:_vm.tdClasses(row, column),attrs:{"component":column,"scoped":"","name":"default","tag":"td","data-label":column.label,"props":{ row: row, column: column, index: index, colindex: colindex, toggleDetails: _vm.toggleDetails }},nativeOn:{"click":function($event){return _vm.$emit('cell-click', row, column, index, colindex, $event)}}},'o-slot-component',column.tdAttrs(row, column),false))]:_vm._e()]}),(_vm.checkable && _vm.checkboxPosition === 'right')?_c('td',{class:_vm.tdCheckboxClasses},[_c('o-checkbox',{attrs:{"disabled":!_vm.isRowCheckable(row),"value":_vm.isRowChecked(row)},nativeOn:{"click":function($event){$event.preventDefault();$event.stopPropagation();return _vm.checkRow(row, index, $event)}}})],1):_vm._e()],2),(_vm.isActiveDetailRow(row))?_c('tr',{key:(_vm.customRowKey ? row[_vm.customRowKey] : index) + 'detail',class:_vm.detailedClasses},[_c('td',{attrs:{"colspan":_vm.columnCount}},[_vm._t("detail",null,{"row":row,"index":index})],2)]):_vm._e(),(_vm.isActiveCustomDetailRow(row))?_vm._t("detail",null,{"row":row,"index":index}):_vm._e()]}),(!_vm.visibleData.length)?_c('tr',[_c('td',{attrs:{"colspan":_vm.columnCount}},[_vm._t("empty")],2)]):_vm._e()],2),(_vm.$slots.footer)?_c('tfoot',[_c('tr',{class:_vm.footerClasses},[(_vm.hasCustomFooterSlot())?_vm._t("footer"):_c('th',{attrs:{"colspan":_vm.columnCount}},[_vm._t("footer")],2)],2)]):_vm._e()]),(_vm.loading)?[_vm._t("loading",[_c('o-loading',{attrs:{"full-page":false,"active":_vm.loading}})])]:_vm._e(),((_vm.checkable && this.$slots['bottom-left']) ||
        (_vm.paginated && (_vm.paginationPosition === 'bottom' || _vm.paginationPosition === 'both')))?[_vm._t("pagination",[_c('o-table-pagination',_vm._b({attrs:{"per-page":_vm.perPage,"paginated":_vm.paginated,"total":_vm.newDataTotal,"current-page":_vm.newCurrentPage,"root-class":_vm.paginationWrapperClasses,"icon-pack":_vm.iconPack,"rounded":_vm.paginationRounded,"aria-next-label":_vm.ariaNextLabel,"aria-previous-label":_vm.ariaPreviousLabel,"aria-page-label":_vm.ariaPageLabel,"aria-current-label":_vm.ariaCurrentLabel},on:{"update:currentPage":function($event){_vm.newCurrentPage = $event;},"page-change":function (event) { return _vm.$emit('page-change', event); }}},'o-table-pagination',_vm.$attrs,false),[_vm._t("bottom-left")],2)])]:_vm._e()],2)};
var __vue_staticRenderFns__$2 = [];

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
  

  
  const __vue_component__$3 = /*#__PURE__*/plugins.normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
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

const Plugin = {
  install(Vue) {
    // individual import + extend method into Table.vue
    if (typeof plugins.VueInstance === 'undefined') {
      plugins.setVueInstance(Vue);
    }

    plugins.registerComponent(Vue, __vue_component__$3);
    plugins.registerComponent(Vue, __vue_component__$1);
  }

};
plugins.use(Plugin);

exports.OTable = __vue_component__$3;
exports.OTableColumn = __vue_component__$1;
exports.default = Plugin;
