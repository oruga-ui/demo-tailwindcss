'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var helpers = require('./helpers.js');
var plugins = require('./plugins-d1c9ea2a.js');
var Tooltip = require('./Tooltip-421c706f.js');

//
var script = {
  name: 'OSliderThumb',
  components: {
    [Tooltip.__vue_component__.name]: Tooltip.__vue_component__
  },
  configField: 'slider',
  inheritAttrs: false,
  inject: {
    $slider: {
      name: '$slider'
    }
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    variant: {
      variant: String,
      default: ''
    },
    tooltip: {
      type: Boolean,
      default: true
    },
    indicator: {
      type: Boolean,
      default: false
    },
    customFormatter: Function,
    format: {
      type: String,
      default: 'raw',
      validator: value => {
        return ['raw', 'percent'].indexOf(value) >= 0;
      }
    },
    locale: {
      type: [String, Array],
      default: () => {
        return helpers.getValueByPath(plugins.config, 'locale');
      }
    },
    tooltipAlways: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isFocused: false,
      dragging: false,
      startX: 0,
      startPosition: 0,
      newPosition: null,
      oldValue: this.value
    };
  },

  computed: {
    disabled() {
      return this.$parent.disabled;
    },

    max() {
      return this.$parent.max;
    },

    min() {
      return this.$parent.min;
    },

    step() {
      return this.$parent.step;
    },

    precision() {
      return this.$parent.precision;
    },

    currentPosition() {
      return `${(this.value - this.min) / (this.max - this.min) * 100}%`;
    },

    wrapperStyle() {
      return {
        left: this.currentPosition
      };
    },

    formattedValue() {
      if (typeof this.customFormatter !== 'undefined') {
        return this.customFormatter(this.value);
      }

      if (this.format === 'percent') {
        return new Intl.NumberFormat(this.locale, {
          style: 'percent'
        }).format((this.value - this.min) / (this.max - this.min));
      }

      return new Intl.NumberFormat(this.locale).format(this.value);
    }

  },
  methods: {
    onFocus() {
      this.isFocused = true;
    },

    onBlur() {
      this.isFocused = false;
    },

    onButtonDown(event) {
      if (this.disabled) return;
      event.preventDefault();
      this.onDragStart(event);

      if (typeof window !== 'undefined') {
        document.addEventListener('mousemove', this.onDragging);
        document.addEventListener('touchmove', this.onDragging);
        document.addEventListener('mouseup', this.onDragEnd);
        document.addEventListener('touchend', this.onDragEnd);
        document.addEventListener('contextmenu', this.onDragEnd);
      }
    },

    onLeftKeyDown() {
      if (this.disabled || this.value === this.min) return;
      this.newPosition = parseFloat(this.currentPosition) - this.step / (this.max - this.min) * 100;
      this.setPosition(this.newPosition);
      this.$parent.emitValue('change');
    },

    onRightKeyDown() {
      if (this.disabled || this.value === this.max) return;
      this.newPosition = parseFloat(this.currentPosition) + this.step / (this.max - this.min) * 100;
      this.setPosition(this.newPosition);
      this.$parent.emitValue('change');
    },

    onHomeKeyDown() {
      if (this.disabled || this.value === this.min) return;
      this.newPosition = 0;
      this.setPosition(this.newPosition);
      this.$parent.emitValue('change');
    },

    onEndKeyDown() {
      if (this.disabled || this.value === this.max) return;
      this.newPosition = 100;
      this.setPosition(this.newPosition);
      this.$parent.emitValue('change');
    },

    onDragStart(event) {
      this.dragging = true;
      this.$emit('dragstart');

      if (event.type === 'touchstart') {
        event.clientX = event.touches[0].clientX;
      }

      this.startX = event.clientX;
      this.startPosition = parseFloat(this.currentPosition);
      this.newPosition = this.startPosition;
    },

    onDragging(event) {
      if (this.dragging) {
        if (event.type === 'touchmove') {
          event.clientX = event.touches[0].clientX;
        }

        const diff = (event.clientX - this.startX) / this.$parent.sliderSize() * 100;
        this.newPosition = this.startPosition + diff;
        this.setPosition(this.newPosition);
      }
    },

    onDragEnd() {
      this.dragging = false;
      this.$emit('dragend');

      if (this.value !== this.oldValue) {
        this.$parent.emitValue('change');
      }

      this.setPosition(this.newPosition);

      if (typeof window !== 'undefined') {
        document.removeEventListener('mousemove', this.onDragging);
        document.removeEventListener('touchmove', this.onDragging);
        document.removeEventListener('mouseup', this.onDragEnd);
        document.removeEventListener('touchend', this.onDragEnd);
        document.removeEventListener('contextmenu', this.onDragEnd);
      }
    },

    setPosition(percent) {
      if (percent === null || isNaN(percent)) return;

      if (percent < 0) {
        percent = 0;
      } else if (percent > 100) {
        percent = 100;
      }

      const stepLength = 100 / ((this.max - this.min) / this.step);
      const steps = Math.round(percent / stepLength);
      let value = steps * stepLength / 100 * (this.max - this.min) + this.min;
      value = parseFloat(value.toFixed(this.precision));
      this.$emit('input', value);

      if (!this.dragging && value !== this.oldValue) {
        this.oldValue = value;
      }
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.$slider.thumbWrapperClasses,style:(_vm.wrapperStyle)},[_c('o-tooltip',{attrs:{"label":_vm.formattedValue,"variant":_vm.variant,"always":_vm.dragging || _vm.isFocused || _vm.tooltipAlways,"active":!_vm.disabled && _vm.tooltip}},[_c('div',_vm._b({class:_vm.$slider.thumbClasses,attrs:{"tabindex":_vm.disabled ? false : 0},on:{"mousedown":_vm.onButtonDown,"touchstart":_vm.onButtonDown,"focus":_vm.onFocus,"blur":_vm.onBlur,"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"left",37,$event.key,["Left","ArrowLeft"])){ return null; }if('button' in $event && $event.button !== 0){ return null; }$event.preventDefault();return _vm.onLeftKeyDown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"right",39,$event.key,["Right","ArrowRight"])){ return null; }if('button' in $event && $event.button !== 2){ return null; }$event.preventDefault();return _vm.onRightKeyDown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }$event.preventDefault();return _vm.onLeftKeyDown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }$event.preventDefault();return _vm.onRightKeyDown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"home",undefined,$event.key,undefined)){ return null; }$event.preventDefault();return _vm.onHomeKeyDown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"end",undefined,$event.key,undefined)){ return null; }$event.preventDefault();return _vm.onEndKeyDown($event)}]}},'div',_vm.$attrs,false),[(_vm.indicator)?_c('span',[_vm._v(_vm._s(_vm.formattedValue))]):_vm._e()])])],1)};
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
/**
 * @displayName Slider Tick
 */

var script$1 = {
  name: 'OSliderTick',
  mixins: [plugins.BaseComponentMixin],
  configField: 'slider',
  inject: {
    $slider: {
      name: '$slider'
    }
  },
  props: {
    /** Value of single tick */
    value: {
      variant: Number,
      default: 0
    },
    tickClass: [String, Function, Array],
    tickHiddenClass: [String, Function, Array],
    tickLabelClass: [String, Function, Array]
  },
  computed: {
    rootClasses() {
      return [this.computedClass('tickClass', 'o-slide__tick'), {
        [this.computedClass('tickHiddenClass', 'o-slide__tick--hidden')]: this.hidden
      }];
    },

    tickLabelClasses() {
      return [this.computedClass('tickLabelClass', 'o-slide__tick-label')];
    },

    position() {
      const pos = (this.value - this.$parent.min) / (this.$parent.max - this.$parent.min) * 100;
      return pos >= 0 && pos <= 100 ? pos : 0;
    },

    hidden() {
      return this.value === this.$parent.min || this.value === this.$parent.max;
    },

    tickStyle() {
      return {
        'left': this.position + '%'
      };
    }

  },

  created() {
    if (!this.$slider) {
      throw new Error('You should wrap oSliderTick on a oSlider');
    }
  }

};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClasses,style:(_vm.tickStyle)},[(_vm.$slots.default)?_c('span',{class:_vm.tickLabelClasses},[_vm._t("default")],2):_vm._e()])};
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
/**
 * A slider to select a value or range from a given range
 * @displayName Slider
 * @requires ./SliderTick.vue
 * @example ./examples/Slider.md
 * @style _slider.scss
 */

var script$2 = {
  name: 'OSlider',
  components: {
    [__vue_component__.name]: __vue_component__,
    [__vue_component__$1.name]: __vue_component__$1
  },
  configField: 'slider',
  mixins: [plugins.BaseComponentMixin],

  provide() {
    return {
      $slider: this
    };
  },

  props: {
    /** @model */
    value: {
      type: [Number, Array],
      default: 0
    },

    /** Minimum value */
    min: {
      type: Number,
      default: 0
    },

    /** Maximum  value */
    max: {
      type: Number,
      default: 100
    },

    /** Step interval of ticks */
    step: {
      type: Number,
      default: 1
    },

    /**
     * Color of the slider
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
      type: String,
      default: () => {
        return helpers.getValueByPath(plugins.config, 'slider.variant', 'primary');
      }
    },

    /**
     * Vertical size of slider, optional
     * @values small, medium, large
     */
    size: String,

    /** Show tick marks */
    ticks: {
      type: Boolean,
      default: false
    },

    /** Show tooltip when thumb is being dragged */
    tooltip: {
      type: Boolean,
      default: true
    },

    /**
     * Color of the tooltip
     * @values primary, info, success, warning, danger, and any other custom color
     */
    tooltipVariant: String,

    /** Rounded thumb */
    rounded: {
      type: Boolean,
      default: () => {
        return helpers.getValueByPath(plugins.config, 'slider.rounded', false);
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },

    /** Update v-model only when dragging is finished */
    lazy: {
      type: Boolean,
      default: false
    },

    /** Function to format the tooltip label for display */
    customFormatter: Function,
    ariaLabel: [String, Array],

    /** Increases slider size on focus */
    biggerSliderFocus: {
      type: Boolean,
      default: false
    },
    indicator: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: 'raw',
      validator: value => {
        return ['raw', 'percent'].indexOf(value) >= 0;
      }
    },
    locale: {
      type: [String, Array],
      default: () => {
        return helpers.getValueByPath(plugins.config, 'locale');
      }
    },

    /** Tooltip displays always */
    tooltipAlways: {
      type: Boolean,
      default: false
    },
    rootClass: [String, Function, Array],
    trackClass: [String, Function, Array],
    fillClass: [String, Function, Array],
    thumbRoundedClass: [String, Function, Array],
    thumbDraggingClass: [String, Function, Array],
    disabledClass: [String, Function, Array],
    thumbWrapperClass: [String, Function, Array],
    thumbClass: [String, Function, Array],
    variantClass: [String, Function, Array]
  },

  data() {
    return {
      value1: null,
      value2: null,
      dragging: false,
      isRange: false
    };
  },

  computed: {
    rootClasses() {
      return [this.computedClass('rootClass', 'o-slide'), {
        [this.computedClass('sizeClass', 'o-slide--', this.size)]: this.size
      }, {
        [this.computedClass('disabledClass', 'o-slide--disabled')]: this.disabled
      }];
    },

    trackClasses() {
      return [this.computedClass('trackClass', 'o-slide__track')];
    },

    fillClasses() {
      return [this.computedClass('fillClass', 'o-slide__fill'), {
        [this.computedClass('variantClass', 'o-slide__fill--', this.variant)]: this.variant
      }];
    },

    thumbClasses() {
      return [this.computedClass('thumbClass', 'o-slide__thumb'), {
        [this.computedClass('thumbDraggingClass', 'o-slide__thumb--dragging')]: this.dragging
      }, {
        [this.computedClass('thumbRoundedClass', 'o-slide__thumb--rounded')]: this.rounded
      }];
    },

    thumbWrapperClasses() {
      return [this.computedClass('thumbWrapperClass', 'o-slide__thumb-wrapper')];
    },

    newTooltipVariant() {
      return this.tooltipVariant ? this.tooltipVariant : this.variant;
    },

    tickValues() {
      if (!this.ticks || this.min > this.max || this.step === 0) return [];
      const result = [];

      for (let i = this.min + this.step; i < this.max; i = i + this.step) {
        result.push(i);
      }

      return result;
    },

    minValue() {
      return Math.min(this.value1, this.value2);
    },

    maxValue() {
      return Math.max(this.value1, this.value2);
    },

    barSize() {
      return this.isRange ? `${100 * (this.maxValue - this.minValue) / (this.max - this.min)}%` : `${100 * (this.value1 - this.min) / (this.max - this.min)}%`;
    },

    barStart() {
      return this.isRange ? `${100 * (this.minValue - this.min) / (this.max - this.min)}%` : '0%';
    },

    precision() {
      const precisions = [this.min, this.max, this.step].map(item => {
        const decimal = ('' + item).split('.')[1];
        return decimal ? decimal.length : 0;
      });
      return Math.max(...precisions);
    },

    barStyle() {
      return {
        width: this.barSize,
        left: this.barStart
      };
    }

  },
  watch: {
    value1() {
      this.onInternalValueUpdate();
    },

    value2() {
      this.onInternalValueUpdate();
    },

    min() {
      this.setValues(this.value);
    },

    max() {
      this.setValues(this.value);
    },

    /**
    * When v-model is changed set the new active step.
    */
    value(value) {
      this.setValues(value);
    }

  },
  methods: {
    setValues(newValue) {
      if (this.min > this.max) {
        return;
      }

      if (Array.isArray(newValue)) {
        this.isRange = true;
        const smallValue = typeof newValue[0] !== 'number' || isNaN(newValue[0]) ? this.min : Math.min(Math.max(this.min, newValue[0]), this.max);
        const largeValue = typeof newValue[1] !== 'number' || isNaN(newValue[1]) ? this.max : Math.max(Math.min(this.max, newValue[1]), this.min);
        this.value1 = this.isThumbReversed ? largeValue : smallValue;
        this.value2 = this.isThumbReversed ? smallValue : largeValue;
      } else {
        this.isRange = false;
        this.value1 = isNaN(newValue) ? this.min : Math.min(this.max, Math.max(this.min, newValue));
        this.value2 = null;
      }
    },

    onInternalValueUpdate() {
      if (this.isRange) {
        this.isThumbReversed = this.value1 > this.value2;
      }

      if (!this.lazy || !this.dragging) {
        this.emitValue('input');
      }

      if (this.dragging) {
        this.emitValue('dragging');
      }
    },

    sliderSize() {
      return this.$refs.slider.getBoundingClientRect().width;
    },

    onSliderClick(event) {
      if (this.disabled || this.isTrackClickDisabled) return;
      const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left;
      const percent = (event.clientX - sliderOffsetLeft) / this.sliderSize() * 100;
      const targetValue = this.min + percent * (this.max - this.min) / 100;
      const diffFirst = Math.abs(targetValue - this.value1);

      if (!this.isRange) {
        if (diffFirst < this.step / 2) return;
        this.$refs.button1.setPosition(percent);
      } else {
        const diffSecond = Math.abs(targetValue - this.value2);

        if (diffFirst <= diffSecond) {
          if (diffFirst < this.step / 2) return;
          this.$refs['button1'].setPosition(percent);
        } else {
          if (diffSecond < this.step / 2) return;
          this.$refs['button2'].setPosition(percent);
        }
      }

      this.emitValue('change');
    },

    onDragStart() {
      this.dragging = true;
      this.$emit('dragstart');
    },

    onDragEnd() {
      this.isTrackClickDisabled = true;
      setTimeout(() => {
        // avoid triggering onSliderClick after dragend
        this.isTrackClickDisabled = false;
      }, 0);
      this.dragging = false;
      this.$emit('dragend');

      if (this.lazy) {
        this.emitValue('input');
      }
    },

    emitValue(event) {
      const val = this.isRange ? [this.minValue, this.maxValue] : this.value1;
      this.$emit(event, val);
    }

  },

  created() {
    this.isThumbReversed = false;
    this.isTrackClickDisabled = false;
    this.setValues(this.value);
  }

};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClasses,on:{"click":_vm.onSliderClick}},[_c('div',{ref:"slider",class:_vm.trackClasses},[_c('div',{class:_vm.fillClasses,style:(_vm.barStyle)}),(_vm.ticks)?_vm._l((_vm.tickValues),function(val,key){return _c('o-slider-tick',{key:key,attrs:{"value":val}})}):_vm._e(),_vm._t("default"),_c('o-slider-thumb',{ref:"button1",attrs:{"variant":_vm.newTooltipVariant,"tooltip":_vm.tooltip,"custom-formatter":_vm.customFormatter,"indicator":_vm.indicator,"role":"slider","format":_vm.format,"locale":_vm.locale,"tooltip-always":_vm.tooltipAlways,"aria-valuenow":_vm.value1,"aria-valuemin":_vm.min,"aria-valuemax":_vm.max,"aria-orientation":"horizontal","aria-label":Array.isArray(_vm.ariaLabel) ? _vm.ariaLabel[0] : _vm.ariaLabel,"aria-disabled":_vm.disabled},on:{"dragstart":_vm.onDragStart,"dragend":_vm.onDragEnd},model:{value:(_vm.value1),callback:function ($$v) {_vm.value1=$$v;},expression:"value1"}}),(_vm.isRange)?_c('o-slider-thumb',{ref:"button2",attrs:{"variant":_vm.newTooltipVariant,"tooltip":_vm.tooltip,"custom-formatter":_vm.customFormatter,"indicator":_vm.indicator,"role":"slider","format":_vm.format,"locale":_vm.locale,"tooltip-always":_vm.tooltipAlways,"aria-valuenow":_vm.value2,"aria-valuemin":_vm.min,"aria-valuemax":_vm.max,"aria-orientation":"horizontal","aria-label":Array.isArray(_vm.ariaLabel) ? _vm.ariaLabel[1] : '',"aria-disabled":_vm.disabled},on:{"dragstart":_vm.onDragStart,"dragend":_vm.onDragEnd},model:{value:(_vm.value2),callback:function ($$v) {_vm.value2=$$v;},expression:"value2"}}):_vm._e()],2)])};
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

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, __vue_component__$2);
    plugins.registerComponent(Vue, __vue_component__$1);
  }

};
plugins.use(Plugin);

exports.OSlider = __vue_component__$2;
exports.OSliderTick = __vue_component__$1;
exports.default = Plugin;
