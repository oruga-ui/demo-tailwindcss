import { getValueByPath, isMobile, matchWithGroups } from './helpers.js';
import { c as config, B as BaseComponentMixin, n as normalizeComponent } from './plugins-948abce9.js';
import { _ as __vue_component__$3 } from './Icon-98338a0a.js';
import { F as FormElementMixin } from './FormElementMixin-fc713fb1.js';
import { _ as __vue_component__$1 } from './Input-37c8e91d.js';
import { M as MatchMediaMixin } from './MatchMediaMixin-bec150b5.js';
import { _ as __vue_component__$4, a as __vue_component__$5 } from './DropdownItem-e3268f8f.js';
import { _ as __vue_component__$2 } from './Select-f13cdc5d.js';

const AM = 'AM';
const PM = 'PM';
const HOUR_FORMAT_24 = '24';
const HOUR_FORMAT_12 = '12';

const defaultTimeFormatter = (date, vm) => {
  return vm.dtf.format(date);
};

const defaultTimeParser = (timeString, vm) => {
  if (timeString) {
    let d = null;

    if (vm.computedValue && !isNaN(vm.computedValue)) {
      d = new Date(vm.computedValue);
    } else {
      d = vm.timeCreator();
      d.setMilliseconds(0);
    }

    if (vm.dtf.formatToParts && typeof vm.dtf.formatToParts === 'function') {
      const formatRegex = vm.dtf.formatToParts(d).map(part => {
        if (part.type === 'literal') {
          return part.value.replace(/ /g, '\\s?');
        } else if (part.type === 'dayPeriod') {
          return `((?!=<${part.type}>)(${vm.amString}|${vm.pmString}|${AM}|${PM}|${AM.toLowerCase()}|${PM.toLowerCase()})?)`;
        }

        return `((?!=<${part.type}>)\\d+)`;
      }).join('');
      const timeGroups = matchWithGroups(formatRegex, timeString); // We do a simple validation for the group.
      // If it is not valid, it will fallback to Date.parse below

      timeGroups.hour = timeGroups.hour ? parseInt(timeGroups.hour, 10) : null;
      timeGroups.minute = timeGroups.minute ? parseInt(timeGroups.minute, 10) : null;
      timeGroups.second = timeGroups.second ? parseInt(timeGroups.second, 10) : null;

      if (timeGroups.hour && timeGroups.hour >= 0 && timeGroups.hour < 24 && timeGroups.minute && timeGroups.minute >= 0 && timeGroups.minute < 59) {
        if (timeGroups.dayPeriod && (timeGroups.dayPeriod.toLowerCase() === vm.pmString.toLowerCase() || timeGroups.dayPeriod.toLowerCase() === PM.toLowerCase()) && timeGroups.hour < 12) {
          timeGroups.hour += 12;
        }

        d.setHours(timeGroups.hour);
        d.setMinutes(timeGroups.minute);
        d.setSeconds(timeGroups.second || 0);
        return d;
      }
    } // Fallback if formatToParts is not supported or if we were not able to parse a valid date


    let am = false;

    if (vm.hourFormat === HOUR_FORMAT_12) {
      const dateString12 = timeString.split(' ');
      timeString = dateString12[0];
      am = dateString12[1] === vm.amString || dateString12[1] === AM;
    }

    const time = timeString.split(':');
    let hours = parseInt(time[0], 10);
    const minutes = parseInt(time[1], 10);
    const seconds = vm.enableSeconds ? parseInt(time[2], 10) : 0;

    if (isNaN(hours) || hours < 0 || hours > 23 || vm.hourFormat === HOUR_FORMAT_12 && (hours < 1 || hours > 12) || isNaN(minutes) || minutes < 0 || minutes > 59) {
      return null;
    }

    d.setSeconds(seconds);
    d.setMinutes(minutes);

    if (vm.hourFormat === HOUR_FORMAT_12) {
      if (am && hours === 12) {
        hours = 0;
      } else if (!am && hours !== 12) {
        hours += 12;
      }
    }

    d.setHours(hours);
    return new Date(d.getTime());
  }

  return null;
};

var TimepickerMixin = {
  mixins: [FormElementMixin],
  inheritAttrs: false,
  props: {
    value: Date,
    inline: Boolean,
    minTime: Date,
    maxTime: Date,
    placeholder: String,
    editable: Boolean,
    disabled: Boolean,

    /**
     * Size of button, optional
     * @values small, medium, large
     */
    size: String,
    hourFormat: {
      type: String,
      validator: value => {
        return value === HOUR_FORMAT_24 || value === HOUR_FORMAT_12;
      }
    },
    incrementHours: {
      type: Number,
      default: 1
    },
    incrementMinutes: {
      type: Number,
      default: 1
    },
    incrementSeconds: {
      type: Number,
      default: 1
    },
    timeFormatter: {
      type: Function,
      default: (date, vm) => {
        const timeFormatter = getValueByPath(config, 'timepicker.timeFormatter', undefined);

        if (typeof timeFormatter === 'function') {
          return timeFormatter(date);
        } else {
          return defaultTimeFormatter(date, vm);
        }
      }
    },
    timeParser: {
      type: Function,
      default: (date, vm) => {
        const timeParser = getValueByPath(config, 'timepicker.timeParser', undefined);

        if (typeof timeParser === 'function') {
          return timeParser(date);
        } else {
          return defaultTimeParser(date, vm);
        }
      }
    },
    mobileNative: {
      type: Boolean,
      default: () => {
        return getValueByPath(config, 'timepicker.mobileNative', true);
      }
    },
    timeCreator: {
      type: Function,
      default: () => {
        const timeCreator = getValueByPath(config, 'timepicker.timeCreator', undefined);

        if (typeof timeCreator === 'function') {
          return timeCreator();
        } else {
          return new Date();
        }
      }
    },
    position: String,
    unselectableTimes: Array,
    openOnFocus: Boolean,
    enableSeconds: Boolean,
    defaultMinutes: Number,
    defaultSeconds: Number,
    focusable: {
      type: Boolean,
      default: true
    },
    appendToBody: Boolean,
    resetOnMeridianChange: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      dateSelected: this.value,
      hoursSelected: null,
      minutesSelected: null,
      secondsSelected: null,
      meridienSelected: null,
      _elementRef: 'input',
      AM,
      PM,
      HOUR_FORMAT_24,
      HOUR_FORMAT_12
    };
  },

  computed: {
    computedValue: {
      get() {
        return this.dateSelected;
      },

      set(value) {
        this.dateSelected = value;
        this.$emit('input', this.dateSelected);
      }

    },

    localeOptions() {
      return new Intl.DateTimeFormat(this.locale, {
        hour: 'numeric',
        minute: 'numeric',
        second: this.enableSeconds ? 'numeric' : undefined
      }).resolvedOptions();
    },

    dtf() {
      return new Intl.DateTimeFormat(this.locale, {
        hour: this.localeOptions.hour || 'numeric',
        minute: this.localeOptions.minute || 'numeric',
        second: this.enableSeconds ? this.localeOptions.second || 'numeric' : undefined,
        hour12: !this.isHourFormat24 // timeZone: 'UTC'

      });
    },

    newHourFormat() {
      return this.hourFormat || (this.localeOptions.hour12 ? HOUR_FORMAT_12 : HOUR_FORMAT_24);
    },

    sampleTime() {
      let d = this.timeCreator();
      d.setHours(10);
      d.setSeconds(0);
      d.setMinutes(0);
      d.setMilliseconds(0);
      return d;
    },

    hourLiteral() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
        let d = this.sampleTime;
        const parts = this.dtf.formatToParts(d);
        const literal = parts.find((part, idx) => idx > 0 && parts[idx - 1].type === 'hour');

        if (literal) {
          return literal.value;
        }
      }

      return ':';
    },

    minuteLiteral() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
        let d = this.sampleTime;
        const parts = this.dtf.formatToParts(d);
        const literal = parts.find((part, idx) => idx > 0 && parts[idx - 1].type === 'minute');

        if (literal) {
          return literal.value;
        }
      }

      return ':';
    },

    secondLiteral() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
        let d = this.sampleTime;
        const parts = this.dtf.formatToParts(d);
        const literal = parts.find((part, idx) => idx > 0 && parts[idx - 1].type === 'second');

        if (literal) {
          return literal.value;
        }
      }
    },

    amString() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
        let d = this.sampleTime;
        d.setHours(10);
        const dayPeriod = this.dtf.formatToParts(d).find(part => part.type === 'dayPeriod');

        if (dayPeriod) {
          return dayPeriod.value;
        }
      }

      return this.AM;
    },

    pmString() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
        let d = this.sampleTime;
        d.setHours(20);
        const dayPeriod = this.dtf.formatToParts(d).find(part => part.type === 'dayPeriod');

        if (dayPeriod) {
          return dayPeriod.value;
        }
      }

      return this.PM;
    },

    hours() {
      if (!this.incrementHours || this.incrementHours < 1) throw new Error('Hour increment cannot be null or less than 1.');
      const hours = [];
      const numberOfHours = this.isHourFormat24 ? 24 : 12;

      for (let i = 0; i < numberOfHours; i += this.incrementHours) {
        let value = i;
        let label = value;

        if (!this.isHourFormat24) {
          value = i + 1;
          label = value;

          if (this.meridienSelected === this.amString || this.meridienSelected === this.AM) {
            if (value === 12) {
              value = 0;
            }
          } else if (this.meridienSelected === this.pmString || this.meridienSelected === this.PM) {
            if (value !== 12) {
              value += 12;
            }
          }
        }

        hours.push({
          label: this.formatNumber(label),
          value: value
        });
      }

      return hours;
    },

    minutes() {
      if (!this.incrementMinutes || this.incrementMinutes < 1) throw new Error('Minute increment cannot be null or less than 1.');
      const minutes = [];

      for (let i = 0; i < 60; i += this.incrementMinutes) {
        minutes.push({
          label: this.formatNumber(i, true),
          value: i
        });
      }

      return minutes;
    },

    seconds() {
      if (!this.incrementSeconds || this.incrementSeconds < 1) throw new Error('Second increment cannot be null or less than 1.');
      const seconds = [];

      for (let i = 0; i < 60; i += this.incrementSeconds) {
        seconds.push({
          label: this.formatNumber(i, true),
          value: i
        });
      }

      return seconds;
    },

    meridiens() {
      return [this.amString, this.pmString];
    },

    isMobile() {
      return this.mobileNative && isMobile.any();
    },

    isHourFormat24() {
      return this.newHourFormat === HOUR_FORMAT_24;
    }

  },
  watch: {
    hourFormat() {
      if (this.hoursSelected !== null) {
        this.meridienSelected = this.hoursSelected >= 12 ? this.pmString : this.amString;
      }
    },

    /**
     * When v-model is changed:
     *   1. Update internal value.
     *   2. If it's invalid, validate again.
     */
    value: {
      handler(value) {
        this.updateInternalState(value);
        !this.isValid && this.$refs.input.checkHtml5Validity();
      },

      immediate: true
    }
  },
  methods: {
    onMeridienChange(value) {
      if (this.hoursSelected !== null && this.resetOnMeridianChange) {
        this.hoursSelected = null;
        this.minutesSelected = null;
        this.secondsSelected = null;
        this.computedValue = null;
      } else if (this.hoursSelected !== null) {
        if (value === this.pmString || value === PM) {
          this.hoursSelected += 12;
        } else if (value === this.amString || value === AM) {
          this.hoursSelected -= 12;
        }
      }

      this.updateDateSelected(this.hoursSelected, this.minutesSelected, this.enableSeconds ? this.secondsSelected : 0, value);
    },

    onHoursChange(value) {
      if (!this.minutesSelected && typeof this.defaultMinutes !== 'undefined') {
        this.minutesSelected = this.defaultMinutes;
      }

      if (!this.secondsSelected && typeof this.defaultSeconds !== 'undefined') {
        this.secondsSelected = this.defaultSeconds;
      }

      this.updateDateSelected(parseInt(value, 10), this.minutesSelected, this.enableSeconds ? this.secondsSelected : 0, this.meridienSelected);
    },

    onMinutesChange(value) {
      if (!this.secondsSelected && this.defaultSeconds) {
        this.secondsSelected = this.defaultSeconds;
      }

      this.updateDateSelected(this.hoursSelected, parseInt(value, 10), this.enableSeconds ? this.secondsSelected : 0, this.meridienSelected);
    },

    onSecondsChange(value) {
      this.updateDateSelected(this.hoursSelected, this.minutesSelected, parseInt(value, 10), this.meridienSelected);
    },

    updateDateSelected(hours, minutes, seconds, meridiens) {
      if (hours != null && minutes != null && (!this.isHourFormat24 && meridiens !== null || this.isHourFormat24)) {
        let time = null;

        if (this.computedValue && !isNaN(this.computedValue)) {
          time = new Date(this.computedValue);
        } else {
          time = this.timeCreator();
          time.setMilliseconds(0);
        }

        time.setHours(hours);
        time.setMinutes(minutes);
        time.setSeconds(seconds);
        this.computedValue = new Date(time.getTime());
      }
    },

    updateInternalState(value) {
      if (value) {
        this.hoursSelected = value.getHours();
        this.minutesSelected = value.getMinutes();
        this.secondsSelected = value.getSeconds();
        this.meridienSelected = value.getHours() >= 12 ? this.pmString : this.amString;
      } else {
        this.hoursSelected = null;
        this.minutesSelected = null;
        this.secondsSelected = null;
        this.meridienSelected = this.amString;
      }

      this.dateSelected = value;
    },

    isHourDisabled(hour) {
      let disabled = false;

      if (this.minTime) {
        const minHours = this.minTime.getHours();
        const noMinutesAvailable = this.minutes.every(minute => {
          return this.isMinuteDisabledForHour(hour, minute.value);
        });
        disabled = hour < minHours || noMinutesAvailable;
      }

      if (this.maxTime) {
        if (!disabled) {
          const maxHours = this.maxTime.getHours();
          disabled = hour > maxHours;
        }
      }

      if (this.unselectableTimes) {
        if (!disabled) {
          const unselectable = this.unselectableTimes.filter(time => {
            if (this.enableSeconds && this.secondsSelected !== null) {
              return time.getHours() === hour && time.getMinutes() === this.minutesSelected && time.getSeconds() === this.secondsSelected;
            } else if (this.minutesSelected !== null) {
              return time.getHours() === hour && time.getMinutes() === this.minutesSelected;
            }

            return false;
          });

          if (unselectable.length > 0) {
            disabled = true;
          } else {
            disabled = this.minutes.every(minute => {
              return this.unselectableTimes.filter(time => {
                return time.getHours() === hour && time.getMinutes() === minute.value;
              }).length > 0;
            });
          }
        }
      }

      return disabled;
    },

    isMinuteDisabledForHour(hour, minute) {
      let disabled = false;

      if (this.minTime) {
        const minHours = this.minTime.getHours();
        const minMinutes = this.minTime.getMinutes();
        disabled = hour === minHours && minute < minMinutes;
      }

      if (this.maxTime) {
        if (!disabled) {
          const maxHours = this.maxTime.getHours();
          const maxMinutes = this.maxTime.getMinutes();
          disabled = hour === maxHours && minute > maxMinutes;
        }
      }

      return disabled;
    },

    isMinuteDisabled(minute) {
      let disabled = false;

      if (this.hoursSelected !== null) {
        if (this.isHourDisabled(this.hoursSelected)) {
          disabled = true;
        } else {
          disabled = this.isMinuteDisabledForHour(this.hoursSelected, minute);
        }

        if (this.unselectableTimes) {
          if (!disabled) {
            const unselectable = this.unselectableTimes.filter(time => {
              if (this.enableSeconds && this.secondsSelected !== null) {
                return time.getHours() === this.hoursSelected && time.getMinutes() === minute && time.getSeconds() === this.secondsSelected;
              } else {
                return time.getHours() === this.hoursSelected && time.getMinutes() === minute;
              }
            });
            disabled = unselectable.length > 0;
          }
        }
      }

      return disabled;
    },

    isSecondDisabled(second) {
      let disabled = false;

      if (this.minutesSelected !== null) {
        if (this.isMinuteDisabled(this.minutesSelected)) {
          disabled = true;
        } else {
          if (this.minTime) {
            const minHours = this.minTime.getHours();
            const minMinutes = this.minTime.getMinutes();
            const minSeconds = this.minTime.getSeconds();
            disabled = this.hoursSelected === minHours && this.minutesSelected === minMinutes && second < minSeconds;
          }

          if (this.maxTime) {
            if (!disabled) {
              const maxHours = this.maxTime.getHours();
              const maxMinutes = this.maxTime.getMinutes();
              const maxSeconds = this.maxTime.getSeconds();
              disabled = this.hoursSelected === maxHours && this.minutesSelected === maxMinutes && second > maxSeconds;
            }
          }
        }

        if (this.unselectableTimes) {
          if (!disabled) {
            const unselectable = this.unselectableTimes.filter(time => {
              return time.getHours() === this.hoursSelected && time.getMinutes() === this.minutesSelected && time.getSeconds() === second;
            });
            disabled = unselectable.length > 0;
          }
        }
      }

      return disabled;
    },

    /*
     * Parse string into date
     */
    onChange(value) {
      const date = this.timeParser(value, this);
      this.updateInternalState(date);

      if (date && !isNaN(date)) {
        this.computedValue = date;
      } else {
        // Force refresh input value when not valid date
        this.computedValue = null;
        this.$refs.input.newValue = this.computedValue;
      }
    },

    /*
     * Toggle timepicker
     */
    toggle(active) {
      if (this.$refs.dropdown) {
        this.$refs.dropdown.isActive = typeof active === 'boolean' ? active : !this.$refs.dropdown.isActive;
      }
    },

    /*
     * Close timepicker
     */
    close() {
      this.toggle(false);
    },

    /*
     * Call default onFocus method and show timepicker
     */
    handleOnFocus() {
      this.onFocus();

      if (this.openOnFocus) {
        this.toggle(true);
      }
    },

    /*
     * Format date into string 'HH-MM-SS'
     */
    formatHHMMSS(value) {
      const date = new Date(value);

      if (value && !isNaN(date)) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return this.formatNumber(hours, true) + ':' + this.formatNumber(minutes, true) + ':' + this.formatNumber(seconds, true);
      }

      return '';
    },

    /*
     * Parse time from string
     */
    onChangeNativePicker(event) {
      const date = event.target.value;

      if (date) {
        let time = null;

        if (this.computedValue && !isNaN(this.computedValue)) {
          time = new Date(this.computedValue);
        } else {
          time = new Date();
          time.setMilliseconds(0);
        }

        const t = date.split(':');
        time.setHours(parseInt(t[0], 10));
        time.setMinutes(parseInt(t[1], 10));
        time.setSeconds(t[2] ? parseInt(t[2], 10) : 0);
        this.computedValue = new Date(time.getTime());
      } else {
        this.computedValue = null;
      }
    },

    formatNumber(value, prependZero) {
      return this.isHourFormat24 || prependZero ? this.pad(value) : value;
    },

    pad(value) {
      return (value < 10 ? '0' : '') + value;
    },

    /*
     * Format date into string
     */
    formatValue(date) {
      if (date && !isNaN(date)) {
        return this.timeFormatter(date, this);
      } else {
        return null;
      }
    },

    /**
     * Keypress event that is bound to the document.
     */
    keyPress({
      key
    }) {
      if (this.$refs.dropdown && this.$refs.dropdown.isActive && (key === 'Escape' || key === 'Esc')) {
        this.toggle(false);
      }
    },

    /**
     * Emit 'blur' event on dropdown is not active (closed)
     */
    onActiveChange(value) {
      if (!value) {
        this.onBlur();
      }
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

//
/**
 * An input with a simple dropdown/modal for selecting a time, uses native timepicker for mobile
 * @displayName Timepicker
 * @example ./examples/Timepicker.md
 * @style _timepicker.scss
 */

var script = {
  name: 'OTimepicker',
  components: {
    [__vue_component__$1.name]: __vue_component__$1,
    [__vue_component__$2.name]: __vue_component__$2,
    [__vue_component__$3.name]: __vue_component__$3,
    [__vue_component__$4.name]: __vue_component__$4,
    [__vue_component__$5.name]: __vue_component__$5
  },
  configField: 'timepicker',
  mixins: [BaseComponentMixin, TimepickerMixin, MatchMediaMixin],
  inheritAttrs: false,
  props: {
    rootClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    boxClass: [String, Function, Array],
    selectClass: [String, Function, Array],
    selectPlaceholderClass: [String, Function, Array],
    separatorClass: [String, Function, Array],
    footerClass: [String, Function, Array],
    mobileClass: [String, Function, Array],

    /** Classes to apply on internal input (@see o-input style docs) */
    inputClasses: Object,

    /** Classes to apply on internal dropdown (@see o-dropdown style docs) */
    dropdownClasses: Object
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
      return [this.computedClass('rootClass', 'o-tpck'), {
        [this.computedClass('sizeClass', 'o-tpck--', this.size)]: this.size
      }, {
        [this.computedClass('mobileClass', 'o-tpck--mobile')]: this.isMatchMedia
      }];
    },

    boxClasses() {
      return [this.computedClass('boxClass', 'o-tpck__box')];
    },

    selectClasses() {
      return [this.computedClass('selectClass', 'o-tpck__select')];
    },

    selectPlaceholderClasses() {
      return [this.computedClass('selectPlaceholderClass', 'o-tpck__select-placeholder')];
    },

    separatorClasses() {
      return [this.computedClass('separatorClass', 'o-tpck__separator')];
    },

    footerClasses() {
      return [this.computedClass('footerClass', 'o-tpck__footer')];
    },

    nativeStep() {
      if (this.enableSeconds) return '1';
      return null;
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClasses},[(!_vm.isMobile || _vm.inline)?_c('o-dropdown',_vm._b({ref:"dropdown",attrs:{"position":_vm.position,"disabled":_vm.disabled,"inline":_vm.inline,"append-to-body":_vm.appendToBody,"append-to-body-copy-parent":""},on:{"active-change":_vm.onActiveChange},scopedSlots:_vm._u([(!_vm.inline)?{key:"trigger",fn:function(){return [_vm._t("trigger",[_c('o-input',_vm._b({ref:"input",attrs:{"autocomplete":"off","value":_vm.formatValue(_vm.computedValue),"placeholder":_vm.placeholder,"size":_vm.size,"icon":_vm.icon,"icon-pack":_vm.iconPack,"disabled":_vm.disabled,"readonly":!_vm.editable,"rounded":_vm.rounded,"use-html5-validation":_vm.useHtml5Validation},on:{"focus":_vm.handleOnFocus},nativeOn:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.toggle(true)},"change":function($event){return _vm.onChange($event.target.value)}}},'o-input',_vm.inputBind,false))])]},proxy:true}:null],null,true)},'o-dropdown',_vm.dropdownBind,false),[_c('o-dropdown-item',{attrs:{"override":"","disabled":_vm.disabled,"clickable":false}},[_c('div',{class:_vm.boxClasses},[_c('o-select',{attrs:{"override":"","select-class":_vm.selectClasses,"placeholder-class":_vm.selectPlaceholderClasses,"disabled":_vm.disabled,"placeholder":"00"},nativeOn:{"change":function($event){return _vm.onHoursChange($event.target.value)}},model:{value:(_vm.hoursSelected),callback:function ($$v) {_vm.hoursSelected=$$v;},expression:"hoursSelected"}},_vm._l((_vm.hours),function(hour){return _c('option',{key:hour.value,attrs:{"disabled":_vm.isHourDisabled(hour.value)},domProps:{"value":hour.value}},[_vm._v(" "+_vm._s(hour.label)+" ")])}),0),_c('span',{class:_vm.separatorClasses},[_vm._v(_vm._s(_vm.hourLiteral))]),_c('o-select',{attrs:{"override":"","select-class":_vm.selectClasses,"placeholder-class":_vm.selectPlaceholderClasses,"disabled":_vm.disabled,"placeholder":"00"},nativeOn:{"change":function($event){return _vm.onMinutesChange($event.target.value)}},model:{value:(_vm.minutesSelected),callback:function ($$v) {_vm.minutesSelected=$$v;},expression:"minutesSelected"}},_vm._l((_vm.minutes),function(minute){return _c('option',{key:minute.value,attrs:{"disabled":_vm.isMinuteDisabled(minute.value)},domProps:{"value":minute.value}},[_vm._v(" "+_vm._s(minute.label)+" ")])}),0),(_vm.enableSeconds)?[_c('span',[_vm._v(_vm._s(_vm.minuteLiteral))]),_c('o-select',{attrs:{"override":"","select-class":_vm.selectClasses,"placeholder-class":_vm.selectPlaceholderClasses,"disabled":_vm.disabled,"placeholder":"00"},nativeOn:{"change":function($event){return _vm.onSecondsChange($event.target.value)}},model:{value:(_vm.secondsSelected),callback:function ($$v) {_vm.secondsSelected=$$v;},expression:"secondsSelected"}},_vm._l((_vm.seconds),function(second){return _c('option',{key:second.value,attrs:{"disabled":_vm.isSecondDisabled(second.value)},domProps:{"value":second.value}},[_vm._v(" "+_vm._s(second.label)+" ")])}),0),_c('span',{class:_vm.separatorClasses},[_vm._v(_vm._s(_vm.secondLiteral))])]:_vm._e(),(!_vm.isHourFormat24)?_c('o-select',{attrs:{"override":"","select-class":_vm.selectClasses,"placeholder-class":_vm.selectPlaceholderClasses,"disabled":_vm.disabled},nativeOn:{"change":function($event){return _vm.onMeridienChange($event.target.value)}},model:{value:(_vm.meridienSelected),callback:function ($$v) {_vm.meridienSelected=$$v;},expression:"meridienSelected"}},_vm._l((_vm.meridiens),function(meridien){return _c('option',{key:meridien,domProps:{"value":meridien}},[_vm._v(" "+_vm._s(meridien)+" ")])}),0):_vm._e()],2),(_vm.$slots.default !== undefined && _vm.$slots.default.length)?_c('footer',{class:_vm.footerClasses},[_vm._t("default")],2):_vm._e()])],1):_c('o-input',_vm._b({ref:"input",attrs:{"type":"time","step":_vm.nativeStep,"autocomplete":"off","value":_vm.formatHHMMSS(_vm.computedValue),"placeholder":_vm.placeholder,"size":_vm.size,"icon":_vm.icon,"icon-pack":_vm.iconPack,"rounded":_vm.rounded,"max":_vm.formatHHMMSS(_vm.maxTime),"min":_vm.formatHHMMSS(_vm.minTime),"disabled":_vm.disabled,"readonly":false,"use-html5-validation":_vm.useHtml5Validation},on:{"focus":_vm.handleOnFocus,"blur":function($event){_vm.onBlur() && _vm.checkHtml5Validity();}},nativeOn:{"change":function($event){return _vm.onChange($event.target.value)}}},'o-input',_vm.inputBind,false))],1)};
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

export { __vue_component__ as _ };
