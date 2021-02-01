'use strict';

var helpers = require('./helpers.js');
var plugins = require('./plugins-2885446e.js');
var Icon = require('./Icon-31dd3104.js');
var FormElementMixin = require('./FormElementMixin-d665a3fc.js');
var Input = require('./Input-41c7e8e2.js');
var MatchMediaMixin = require('./MatchMediaMixin-fe914401.js');
var DropdownItem = require('./DropdownItem-09c80f60.js');
var Field = require('./Field-298d2545.js');
var Select = require('./Select-a1427580.js');

//
var script = {
  name: 'ODatepickerTableRow',
  mixins: [plugins.BaseComponentMixin],
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
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.tableRowClasses},[(_vm.showWeekNumber)?_c('a',{class:_vm.tableCellClasses,style:({'cursor: pointer': _vm.weekNumberClickable }),on:{"click":function($event){$event.preventDefault();_vm.clickWeekNumber(_vm.getWeekNumber(_vm.week[6]));}}},[_c('span',[_vm._v(_vm._s(_vm.getWeekNumber(_vm.week[6])))])]):_vm._e(),_vm._l((_vm.week),function(weekDay,index){return [(_vm.selectableDate(weekDay) && !_vm.disabled)?_c('a',{key:index,ref:("day-" + (weekDay.getMonth()) + "-" + (weekDay.getDate())),refInFor:true,class:_vm.cellClasses(weekDay),attrs:{"role":"button","href":"#","disabled":_vm.disabled,"tabindex":_vm.day === weekDay.getDate() ? null : -1},on:{"click":function($event){$event.preventDefault();return _vm.emitChosenDate(weekDay)},"mouseenter":function($event){return _vm.setRangeHoverEndDate(weekDay)},"keydown":function($event){$event.preventDefault();return _vm.manageKeydown($event, weekDay)}}},[_c('span',[_vm._v(_vm._s(weekDay.getDate()))]),(_vm.eventsDateMatch(weekDay))?_c('div',{class:_vm.tableEventsClasses},_vm._l((_vm.eventsDateMatch(weekDay)),function(event,index){return _c('div',{key:index,class:_vm.eventClasses(event)})}),0):_vm._e()]):_c('div',{key:index,class:_vm.cellClasses(weekDay)},[_c('span',[_vm._v(_vm._s(weekDay.getDate()))])])]})],2)};
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

//
var script$1 = {
  name: 'ODatepickerTable',
  mixins: [plugins.BaseComponentMixin],
  configField: 'datepicker',
  components: {
    [__vue_component__.name]: __vue_component__
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
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{class:_vm.tableClasses},[_c('header',{class:_vm.tableHeadClasses},_vm._l((_vm.visibleDayNames),function(day,index){return _c('div',{key:index,class:_vm.tableHeadCellClasses},[_c('span',[_vm._v(_vm._s(day))])])}),0),_c('div',{class:_vm.tableBodyClasses},_vm._l((_vm.weeksInThisMonth),function(week,index){return _c('o-datepicker-table-row',{key:index,attrs:{"selected-date":_vm.value,"day":_vm.focused.day,"week":week,"month":_vm.focused.month,"min-date":_vm.minDate,"max-date":_vm.maxDate,"disabled":_vm.disabled,"unselectable-dates":_vm.unselectableDates,"unselectable-days-of-week":_vm.unselectableDaysOfWeek,"selectable-dates":_vm.selectableDates,"events":_vm.eventsInThisWeek(week),"indicators":_vm.indicators,"date-creator":_vm.dateCreator,"nearby-month-days":_vm.nearbyMonthDays,"nearby-selectable-month-days":_vm.nearbySelectableMonthDays,"show-week-number":_vm.showWeekNumber,"week-number-clickable":_vm.weekNumberClickable,"first-day-of-week":_vm.firstDayOfWeek,"rules-for-first-week":_vm.rulesForFirstWeek,"range":_vm.range,"hovered-date-range":_vm.hoveredDateRange,"multiple":_vm.multiple,"table-row-class":_vm.tableRowClass,"table-cell-class":_vm.tableCellClass,"table-cell-selected-class":_vm.tableCellSelectedClass,"table-cell-first-selected-class":_vm.tableCellFirstSelectedClass,"table-cell-invisible-class":_vm.tableCellInvisibleClass,"table-cell-within-selected-class":_vm.tableCellWithinSelectedClass,"table-cell-last-selected-class":_vm.tableCellLastSelectedClass,"table-cell-first-hovered-class":_vm.tableCellFirstHoveredClass,"table-cell-within-hovered-class":_vm.tableCellWithinHoveredClass,"table-cell-last-hovered-class":_vm.tableCellLastHoveredClass,"table-cell-today-class":_vm.tableCellTodayClass,"table-cell-selectable-class":_vm.tableCellSelectableClass,"table-cell-unselectable-class":_vm.tableCellUnselectableClass,"table-cell-nearby-class":_vm.tableCellNearbyClass,"table-cell-events-class":_vm.tableCellEventsClass,"table-events-class":_vm.tableEventsClass,"table-event-variant-class":_vm.tableEventVariantClass,"table-event-class":_vm.tableEventClass,"table-event-indicators-class":_vm.tableEventIndicatorsClass},on:{"select":_vm.updateSelectedDate,"rangeHoverEndDate":_vm.setRangeHoverEndDate,"change-focus":_vm.changeFocus}})}),1)])};
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
  

  
  const __vue_component__$1 = /*#__PURE__*/plugins.normalizeComponent(
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
    const dateGroups = helpers.matchWithGroups(formatRegex, date); // We do a simple validation for the group.
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
      return new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1, 0, 0, 0, 0);
    }
  }

  return null;
};
/**
 * An input with a simple dropdown/modal for selecting a date, uses native datepicker for mobile
 * @displayName Datepicker
 * @example ./examples/Datepicker.md
 * @style _datepicker.scss
 */


var script$2 = {
  name: 'ODatepicker',
  components: {
    [__vue_component__$1.name]: __vue_component__$1,
    [Field.__vue_component__.name]: Field.__vue_component__,
    [Input.__vue_component__.name]: Input.__vue_component__,
    [Select.__vue_component__.name]: Select.__vue_component__,
    [Icon.__vue_component__.name]: Icon.__vue_component__,
    [DropdownItem.__vue_component__.name]: DropdownItem.__vue_component__,
    [DropdownItem.__vue_component__$1.name]: DropdownItem.__vue_component__$1
  },
  configField: 'datepicker',
  mixins: [plugins.BaseComponentMixin, FormElementMixin.FormElementMixin, MatchMediaMixin.MatchMediaMixin],
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
        return helpers.getValueByPath(plugins.config, 'datepicker.dayNames', undefined);
      }
    },
    monthNames: {
      type: Array,
      default: () => {
        return helpers.getValueByPath(plugins.config, 'datepicker.monthNames', undefined);
      }
    },
    firstDayOfWeek: {
      type: Number,
      default: () => {
        return helpers.getValueByPath(plugins.config, 'datepicker.firstDayOfWeek', 0);
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
    unselectableDates: Array,
    unselectableDaysOfWeek: {
      type: Array,
      default: () => {
        return helpers.getValueByPath(plugins.config, 'datepicker.unselectableDaysOfWeek', undefined);
      }
    },
    selectableDates: Array,
    dateFormatter: {
      type: Function,
      default: (date, vm) => {
        const dateFormatter = helpers.getValueByPath(plugins.config, 'datepicker.dateFormatter', undefined);

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
        const dateParser = helpers.getValueByPath(plugins.config, 'datepicker.dateParser', undefined);

        if (typeof dateParser === 'function') {
          return dateParser(date);
        } else {
          return defaultDateParser(date, vm);
        }
      }
    },
    dateCreator: {
      type: Function,
      default: () => {
        const dateCreator = helpers.getValueByPath(plugins.config, 'datepicker.dateCreator', undefined);

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
        return helpers.getValueByPath(plugins.config, 'datepicker.mobileNative', true);
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
        return helpers.getValueByPath(plugins.config, 'datepicker.iconPrev', 'chevron-left');
      }
    },
    iconNext: {
      type: String,
      default: () => {
        return helpers.getValueByPath(plugins.config, 'datepicker.iconNext', 'chevron-right');
      }
    },
    yearsRange: {
      type: Array,
      default: () => {
        return helpers.getValueByPath(plugins.config, 'datepicker.yearsRange', [-100, 10]);
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
        return helpers.getValueByPath(plugins.config, 'datepicker.nearbyMonthDays', true);
      }
    },
    nearbySelectableMonthDays: {
      type: Boolean,
      default: () => {
        return helpers.getValueByPath(plugins.config, 'datepicker.nearbySelectableMonthDays', false);
      }
    },
    showWeekNumber: {
      type: Boolean,
      default: () => {
        return helpers.getValueByPath(plugins.config, 'datepicker.showWeekNumber', false);
      }
    },
    weekNumberClickable: {
      type: Boolean,
      default: () => {
        return helpers.getValueByPath(plugins.config, 'datepicker.weekNumberClickable', false);
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
        return helpers.getValueByPath(plugins.config, 'datepicker.mobileModal', true);
      }
    },
    trapFocus: {
      type: Boolean,
      default: () => {
        return helpers.getValueByPath(plugins.config, 'datepicker.trapFocus', true);
      }
    },
    locale: {
      type: [String, Array],
      default: () => {
        return helpers.getValueByPath(plugins.config, 'locale');
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
      return new Intl.DateTimeFormat(this.locale
      /*, { timeZone: 'UTC' } */
      );
    },

    dtfMonth() {
      return new Intl.DateTimeFormat(this.locale, {
        year: this.localeOptions.year || 'numeric',
        month: this.localeOptions.month || '2-digit' // timeZone: 'UTC'

      });
    },

    newMonthNames() {
      if (Array.isArray(this.monthNames)) {
        return this.monthNames;
      }

      return helpers.getMonthNames(this.locale);
    },

    newDayNames() {
      if (Array.isArray(this.dayNames)) {
        return this.dayNames;
      }

      return helpers.getWeekdayNames(this.locale);
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
      return this.mobileNative && helpers.isMobile.any();
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

      if (value && !isNaN(date.getTime())) {
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

      if (value && !isNaN(date.getTime())) {
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
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClasses},[(!_vm.isMobile || _vm.inline)?_c('o-dropdown',_vm._b({ref:"dropdown",attrs:{"position":_vm.position,"disabled":_vm.disabled,"inline":_vm.inline,"mobile-modal":_vm.mobileModal,"trap-focus":_vm.trapFocus,"aria-role":_vm.ariaRole,"aria-modal":!_vm.inline,"append-to-body":_vm.appendToBody,"append-to-body-copy-parent":""},on:{"active-change":_vm.onActiveChange},scopedSlots:_vm._u([(!_vm.inline)?{key:"trigger",fn:function(){return [_vm._t("trigger",[_c('o-input',_vm._b({ref:"input",attrs:{"autocomplete":"off","value":_vm.formattedValue,"placeholder":_vm.placeholder,"size":_vm.size,"icon":_vm.icon,"icon-right":_vm.iconRight,"icon-pack":_vm.iconPack,"rounded":_vm.rounded,"disabled":_vm.disabled,"readonly":!_vm.editable,"use-html5-validation":false},on:{"focus":_vm.handleOnFocus},nativeOn:{"click":function($event){return _vm.onInputClick($event)},"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.togglePicker(true)},"change":function($event){return _vm.onChange($event.target.value)}}},'o-input',_vm.inputBind,false))])]},proxy:true}:null],null,true)},'o-dropdown',_vm.dropdownBind,false),[_c('o-dropdown-item',{attrs:{"override":"","disabled":_vm.disabled,"clickable":false}},[_c('div',{class:_vm.boxClasses},[_c('header',{class:_vm.headerClasses},[(_vm.$slots.header !== undefined && _vm.$slots.header.length)?[_vm._t("header")]:_c('div',{class:_vm.headerButtonsClasses},[_c('a',{directives:[{name:"show",rawName:"v-show",value:(!_vm.showPrev && !_vm.disabled),expression:"!showPrev && !disabled"}],class:_vm.prevBtnClasses,attrs:{"role":"button","href":"#","disabled":_vm.disabled,"aria-label":_vm.ariaPreviousLabel},on:{"click":function($event){$event.preventDefault();return _vm.prev($event)},"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.prev($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"space",32,$event.key,[" ","Spacebar"])){ return null; }$event.preventDefault();return _vm.prev($event)}]}},[_c('o-icon',{attrs:{"icon":_vm.iconPrev,"pack":_vm.iconPack,"both":"","clickable":""}})],1),_c('a',{directives:[{name:"show",rawName:"v-show",value:(!_vm.showNext && !_vm.disabled),expression:"!showNext && !disabled"}],class:_vm.nextBtnClasses,attrs:{"role":"button","href":"#","disabled":_vm.disabled,"aria-label":_vm.ariaNextLabel},on:{"click":function($event){$event.preventDefault();return _vm.next($event)},"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.next($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"space",32,$event.key,[" ","Spacebar"])){ return null; }$event.preventDefault();return _vm.next($event)}]}},[_c('o-icon',{attrs:{"icon":_vm.iconNext,"pack":_vm.iconPack,"both":"","clickable":""}})],1),_c('div',{class:_vm.listsClasses},[_c('o-field',[(!_vm.isTypeMonth)?_c('o-select',{attrs:{"disabled":_vm.disabled,"size":_vm.size},model:{value:(_vm.focusedDateData.month),callback:function ($$v) {_vm.$set(_vm.focusedDateData, "month", $$v);},expression:"focusedDateData.month"}},_vm._l((_vm.listOfMonths),function(month){return _c('option',{key:month.name,attrs:{"disabled":month.disabled},domProps:{"value":month.index}},[_vm._v(" "+_vm._s(month.name)+" ")])}),0):_vm._e(),_c('o-select',{attrs:{"disabled":_vm.disabled,"size":_vm.size},model:{value:(_vm.focusedDateData.year),callback:function ($$v) {_vm.$set(_vm.focusedDateData, "year", $$v);},expression:"focusedDateData.year"}},_vm._l((_vm.listOfYears),function(year){return _c('option',{key:year,domProps:{"value":year}},[_vm._v(" "+_vm._s(year)+" ")])}),0)],1)],1)])],2),_c('o-datepicker-table',{attrs:{"day-names":_vm.newDayNames,"month-names":_vm.newMonthNames,"first-day-of-week":_vm.firstDayOfWeek,"rules-for-first-week":_vm.rulesForFirstWeek,"min-date":_vm.minDate,"max-date":_vm.maxDate,"focused":_vm.focusedDateData,"disabled":_vm.disabled,"unselectable-dates":_vm.unselectableDates,"unselectable-days-of-week":_vm.unselectableDaysOfWeek,"selectable-dates":_vm.selectableDates,"events":_vm.events,"indicators":_vm.indicators,"date-creator":_vm.dateCreator,"type-month":_vm.isTypeMonth,"nearby-month-days":_vm.nearbyMonthDays,"nearby-selectable-month-days":_vm.nearbySelectableMonthDays,"show-week-number":_vm.showWeekNumber,"week-number-clickable":_vm.weekNumberClickable,"range":_vm.range,"multiple":_vm.multiple,"table-class":_vm.tableClass,"table-head-class":_vm.tableHeadClass,"table-head-cell-class":_vm.tableHeadCellClass,"table-body-class":_vm.tableBodyClass,"table-row-class":_vm.tableRowClass,"table-cell-class":_vm.tableCellClass,"table-cell-selected-class":_vm.tableCellSelectedClass,"table-cell-first-selected-class":_vm.tableCellFirstSelectedClass,"table-cell-invisible-class":_vm.tableCellInvisibleClass,"table-cell-within-selected-class":_vm.tableCellWithinSelectedClass,"table-cell-last-selected-class":_vm.tableCellLastSelectedClass,"table-cell-first-hovered-class":_vm.tableCellFirstHoveredClass,"table-cell-within-hovered-class":_vm.tableCellWithinHoveredClass,"table-cell-last-hovered-class":_vm.tableCellLastHoveredClass,"table-cell-today-class":_vm.tableCellTodayClass,"table-cell-selectable-class":_vm.tableCellSelectableClass,"table-cell-unselectable-class":_vm.tableCellUnselectableClass,"table-cell-nearby-class":_vm.tableCellNearbyClass,"table-cell-events-class":_vm.tableCellEventsClass,"table-events-class":_vm.tableEventsClass,"table-event-variant-class":_vm.tableEventVariantClass,"table-event-class":_vm.tableEventClass,"table-event-indicators-class":_vm.tableEventIndicatorsClass},on:{"range-start":function (date) { return _vm.$emit('range-start', date); },"range-end":function (date) { return _vm.$emit('range-end', date); },"close":function($event){return _vm.togglePicker(false)},"update:focused":function($event){_vm.focusedDateData = $event;}},model:{value:(_vm.computedValue),callback:function ($$v) {_vm.computedValue=$$v;},expression:"computedValue"}})],1),(_vm.$slots.default !== undefined && _vm.$slots.default.length)?_c('footer',{class:_vm.footerClasses},[_vm._t("default")],2):_vm._e()])],1):_c('o-input',_vm._b({ref:"input",attrs:{"type":!_vm.isTypeMonth ? 'date' : 'month',"autocomplete":"off","value":_vm.formatNative(_vm.computedValue),"placeholder":_vm.placeholder,"size":_vm.size,"icon":_vm.icon,"icon-pack":_vm.iconPack,"rounded":_vm.rounded,"max":_vm.formatNative(_vm.maxDate),"min":_vm.formatNative(_vm.minDate),"disabled":_vm.disabled,"readonly":false,"use-html5-validation":false},on:{"focus":_vm.onFocus,"blur":_vm.onBlur},nativeOn:{"change":function($event){return _vm.onChangeNativePicker($event)}}},'o-input',_vm.inputBind,false))],1)};
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
  

  
  const __vue_component__$2 = /*#__PURE__*/plugins.normalizeComponent(
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

exports.__vue_component__ = __vue_component__$2;
