import { getValueByPath, isMobile, matchWithGroups } from './helpers.js';
import { B as BaseComponentMixin, c as config, n as normalizeComponent, e as registerComponent, u as use } from './plugins-948abce9.js';
import './Icon-98338a0a.js';
import { F as FormElementMixin } from './FormElementMixin-fc713fb1.js';
import './Input-37c8e91d.js';
import './MatchMediaMixin-bec150b5.js';
import './trapFocus-25a621e6.js';
import './DropdownItem-e3268f8f.js';
import './Field-9e9a4065.js';
import './Select-f13cdc5d.js';
import { _ as __vue_component__$1 } from './Datepicker-912506a6.js';
import { _ as __vue_component__$2 } from './Timepicker-80f5266c.js';

//
const AM = 'AM';
const PM = 'PM';
/**
 * An input with a simple dropdown/modal for selecting a date and time, uses native datetimepicker for mobile
 * @displayName Datetimepicker
 * @example ./examples/Datetimepicker.md
 */

var script = {
  name: 'ODatetimepicker',
  components: {
    [__vue_component__$1.name]: __vue_component__$1,
    [__vue_component__$2.name]: __vue_component__$2
  },
  configField: 'datetimepicker',
  mixins: [FormElementMixin, BaseComponentMixin],
  inheritAttrs: false,
  props: {
    value: {
      type: Date
    },
    editable: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    disabled: Boolean,
    icon: String,
    iconPack: String,
    inline: Boolean,
    openOnFocus: Boolean,
    position: String,
    mobileNative: {
      type: Boolean,
      default: true
    },
    minDatetime: Date,
    maxDatetime: Date,
    datetimeFormatter: {
      type: Function
    },
    datetimeParser: {
      type: Function
    },
    datetimeCreator: {
      type: Function,
      default: date => {
        const datetimeCreator = getValueByPath(config, 'datetimepicker.datetimeCreator', undefined);

        if (typeof datetimeCreator === 'function') {
          return datetimeCreator(date);
        } else {
          return date;
        }
      }
    },
    datepicker: Object,
    timepicker: Object,
    locale: {
      type: [String, Array],
      default: () => {
        return getValueByPath(config, 'locale');
      }
    },
    appendToBody: Boolean,
    datepickerWrapperClass: [String, Function, Array],
    timepickerWrapperClass: [String, Function, Array]
  },

  data() {
    return {
      newValue: this.value
    };
  },

  computed: {
    datepickerWrapperClasses() {
      return [this.computedClass('datepickerWrapperClass', 'o-dtpck__date')];
    },

    timepickerWrapperClasses() {
      return [this.computedClass('timepickerWrapperClass', 'o-dtpck__time')];
    },

    computedValue: {
      get() {
        return this.newValue;
      },

      set(value) {
        if (value) {
          let val = new Date(value.getTime());

          if (this.newValue) {
            // restore time part
            if ((value.getDate() !== this.newValue.getDate() || value.getMonth() !== this.newValue.getMonth() || value.getFullYear() !== this.newValue.getFullYear()) && value.getHours() === 0 && value.getMinutes() === 0 && value.getSeconds() === 0) {
              val.setHours(this.newValue.getHours(), this.newValue.getMinutes(), this.newValue.getSeconds(), 0);
            }
          } else {
            val = this.datetimeCreator(value);
          } // check min and max range


          if (this.minDatetime && val < this.minDatetime) {
            val = this.minDatetime;
          } else if (this.maxDatetime && val > this.maxDatetime) {
            val = this.maxDatetime;
          }

          this.newValue = new Date(val.getTime());
        } else {
          this.newValue = this.value;
        }

        this.$emit('input', this.newValue);
      }

    },

    localeOptions() {
      return new Intl.DateTimeFormat(this.locale, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: this.enableSeconds() ? 'numeric' : undefined
      }).resolvedOptions();
    },

    dtf() {
      return new Intl.DateTimeFormat(this.locale, {
        year: this.localeOptions.year || 'numeric',
        month: this.localeOptions.month || 'numeric',
        day: this.localeOptions.day || 'numeric',
        hour: this.localeOptions.hour || 'numeric',
        minute: this.localeOptions.minute || 'numeric',
        second: this.enableSeconds() ? this.localeOptions.second || 'numeric' : undefined,
        hour12: !this.isHourFormat24() // timeZone: 'UTC'

      });
    },

    isMobileNative() {
      return this.mobileNative;
    },

    isMobile() {
      return this.isMobileNative && isMobile.any();
    },

    minDate() {
      if (!this.minDatetime) {
        return this.datepicker ? this.datepicker.minDate : null;
      }

      return new Date(this.minDatetime.getFullYear(), this.minDatetime.getMonth(), this.minDatetime.getDate(), 0, 0, 0, 0);
    },

    maxDate() {
      if (!this.maxDatetime) {
        return this.datepicker ? this.datepicker.maxDate : null;
      }

      return new Date(this.maxDatetime.getFullYear(), this.maxDatetime.getMonth(), this.maxDatetime.getDate(), 0, 0, 0, 0);
    },

    minTime() {
      if (!this.minDatetime || this.newValue === null || typeof this.newValue === 'undefined') {
        return this.timepicker ? this.timepicker.minTime : null;
      }

      return this.minDatetime;
    },

    maxTime() {
      if (!this.maxDatetime || this.newValue === null || typeof this.newValue === 'undefined') {
        return this.timepicker ? this.timepicker.maxTime : null;
      }

      return this.maxDatetime;
    },

    datepickerSize() {
      return this.datepicker && this.datepicker.size ? this.datepicker.size : this.size;
    },

    timepickerSize() {
      return this.timepicker && this.timepicker.size ? this.timepicker.size : this.size;
    },

    timepickerDisabled() {
      return this.timepicker && this.timepicker.disabled ? this.timepicker.disabled : this.disabled;
    }

  },
  watch: {
    value() {
      this.newValue = this.value;
    }

  },
  methods: {
    enableSeconds() {
      if (this.$refs.timepicker) {
        return this.$refs.timepicker.enableSeconds;
      }

      return false;
    },

    isHourFormat24() {
      if (this.$refs.timepicker) {
        return this.$refs.timepicker.isHourFormat24;
      }

      return !this.localeOptions.hour12;
    },

    defaultDatetimeParser(date) {
      const datetimeParser = getValueByPath(config, 'datetimepicker.datetimeParser', undefined);

      if (typeof this.datetimeParser === 'function') {
        return this.datetimeParser(date);
      } else if (typeof datetimeParser === 'function') {
        return datetimeParser(date);
      } else {
        if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
          let dayPeriods = [AM, PM, AM.toLowerCase(), PM.toLowerCase()];

          if (this.$refs.timepicker) {
            dayPeriods.push(this.$refs.timepicker.amString);
            dayPeriods.push(this.$refs.timepicker.pmString);
          }

          const parts = this.dtf.formatToParts(new Date());
          const formatRegex = parts.map((part, idx) => {
            if (part.type === 'literal') {
              if (idx + 1 < parts.length && parts[idx + 1].type === 'hour') {
                return `[^\\d]+`;
              }

              return part.value.replace(/ /g, '\\s?');
            } else if (part.type === 'dayPeriod') {
              return `((?!=<${part.type}>)(${dayPeriods.join('|')})?)`;
            }

            return `((?!=<${part.type}>)\\d+)`;
          }).join('');
          const datetimeGroups = matchWithGroups(formatRegex, date); // We do a simple validation for the group.
          // If it is not valid, it will fallback to Date.parse below

          if (datetimeGroups.year && datetimeGroups.year.length === 4 && datetimeGroups.month && datetimeGroups.month <= 12 && datetimeGroups.day && datetimeGroups.day <= 31 && datetimeGroups.hour && datetimeGroups.hour >= 0 && datetimeGroups.hour < 24 && datetimeGroups.minute && datetimeGroups.minute >= 0 && datetimeGroups.minute < 59) {
            const d = new Date(datetimeGroups.year, datetimeGroups.month - 1, datetimeGroups.day, datetimeGroups.hour, datetimeGroups.minute, datetimeGroups.second || 0);
            return d;
          }
        }

        return new Date(Date.parse(date));
      }
    },

    defaultDatetimeFormatter(date) {
      const datetimeFormatter = getValueByPath(config, 'datetimepicker.datetimeFormatter', undefined);

      if (typeof this.datetimeFormatter === 'function') {
        return this.datetimeFormatter(date);
      } else if (typeof datetimeFormatter === 'function') {
        return datetimeFormatter(date);
      } else {
        return this.dtf.format(date);
      }
    },

    /*
    * Parse date from string
    */
    onChangeNativePicker(event) {
      const date = event.target.value;
      const s = date ? date.split(/\D/) : [];

      if (s.length >= 5) {
        const year = parseInt(s[0], 10);
        const month = parseInt(s[1], 10) - 1;
        const day = parseInt(s[2], 10);
        const hours = parseInt(s[3], 10);
        const minutes = parseInt(s[4], 10); // Seconds are omitted intentionally; they are unsupported by input
        // type=datetime-local and cause the control to fail native validation

        this.computedValue = new Date(year, month, day, hours, minutes);
      } else {
        this.computedValue = null;
      }
    },

    formatNative(value) {
      const date = new Date(value);

      if (value && !isNaN(date)) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return year + '-' + ((month < 10 ? '0' : '') + month) + '-' + ((day < 10 ? '0' : '') + day) + 'T' + ((hours < 10 ? '0' : '') + hours) + ':' + ((minutes < 10 ? '0' : '') + minutes) + ':' + ((seconds < 10 ? '0' : '') + seconds);
      }

      return '';
    },

    toggle() {
      this.$refs.datepicker.toggle();
    }

  },

  mounted() {
    if (!this.isMobile || this.inline) {
      // $refs attached, it's time to refresh datepicker (input)
      if (this.newValue) {
        this.$refs.datepicker.$forceUpdate();
      }
    }
  }

};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (!_vm.isMobile || _vm.inline)?_c('o-datepicker',_vm._b({ref:"datepicker",class:_vm.datepickerWrapperClasses,attrs:{"rounded":_vm.rounded,"open-on-focus":_vm.openOnFocus,"position":_vm.position,"inline":_vm.inline,"editable":_vm.editable,"expanded":_vm.expanded,"close-on-click":false,"date-formatter":_vm.defaultDatetimeFormatter,"date-parser":_vm.defaultDatetimeParser,"min-date":_vm.minDate,"max-date":_vm.maxDate,"icon":_vm.icon,"icon-pack":_vm.iconPack,"size":_vm.datepickerSize,"placeholder":_vm.placeholder,"range":false,"disabled":_vm.disabled,"mobile-native":_vm.isMobileNative,"locale":_vm.locale,"append-to-body":_vm.appendToBody},on:{"focus":_vm.onFocus,"blur":_vm.onBlur,"change-month":function($event){return _vm.$emit('change-month', $event)},"change-year":function($event){return _vm.$emit('change-year', $event)}},model:{value:(_vm.computedValue),callback:function ($$v) {_vm.computedValue=$$v;},expression:"computedValue"}},'o-datepicker',_vm.datepicker,false),[_c('div',{class:_vm.timepickerWrapperClasses},[_c('o-timepicker',_vm._b({ref:"timepicker",attrs:{"inline":"","editable":_vm.editable,"min-time":_vm.minTime,"max-time":_vm.maxTime,"size":_vm.timepickerSize,"disabled":_vm.timepickerDisabled,"mobile-native":_vm.isMobileNative,"locale":_vm.locale},model:{value:(_vm.computedValue),callback:function ($$v) {_vm.computedValue=$$v;},expression:"computedValue"}},'o-timepicker',_vm.timepicker,false))],1),(_vm.$slots.default !== undefined && _vm.$slots.default.length)?[_vm._t("default")]:_vm._e()],2):_c('o-input',_vm._b({ref:"input",attrs:{"type":"datetime-local","autocomplete":"off","value":_vm.formatNative(_vm.computedValue),"placeholder":_vm.placeholder,"size":_vm.size,"icon":_vm.icon,"icon-pack":_vm.iconPack,"rounded":_vm.rounded,"max":_vm.formatNative(_vm.maxDate),"min":_vm.formatNative(_vm.minDate),"disabled":_vm.disabled,"readonly":false,"use-html5-validation":_vm.useHtml5Validation},on:{"focus":_vm.onFocus,"blur":_vm.onBlur},nativeOn:{"change":function($event){return _vm.onChangeNativePicker($event)}}},'o-input',_vm.$attrs,false))};
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
export { __vue_component__ as BDatetimepicker };
