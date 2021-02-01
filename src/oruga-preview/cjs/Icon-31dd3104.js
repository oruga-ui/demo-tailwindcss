'use strict';

var helpers = require('./helpers.js');
var plugins = require('./plugins-2885446e.js');

const mdiIcons = {
  sizes: {
    'default': 'mdi-24px',
    'small': null,
    'medium': 'mdi-36px',
    'large': 'mdi-48px'
  },
  iconPrefix: 'mdi-'
};

const faIcons = () => {
  const iconComponent = helpers.getValueByPath(plugins.config, 'iconComponent');
  const faIconPrefix = iconComponent ? '' : 'fa-';
  return {
    sizes: {
      'default': null,
      'small': null,
      'medium': faIconPrefix + 'lg',
      'large': faIconPrefix + '2x'
    },
    iconPrefix: faIconPrefix,
    internalIcons: {
      'information': 'info-circle',
      'alert': 'exclamation-triangle',
      'alert-circle': 'exclamation-circle',
      'chevron-right': 'angle-right',
      'chevron-left': 'angle-left',
      'chevron-down': 'angle-down',
      'chevron-up': 'angle-up',
      'eye-off': 'eye-slash',
      'caret-down': 'caret-down',
      'caret-up': 'caret-up',
      'close-circle': 'times-circle',
      'spin': 'circle-notch'
    }
  };
};

const getIcons = () => {
  let icons = {
    mdi: mdiIcons,
    fa: faIcons(),
    fas: faIcons(),
    far: faIcons(),
    fad: faIcons(),
    fab: faIcons(),
    fal: faIcons()
  };
  const customIconPacks = helpers.getValueByPath(plugins.config, 'customIconPacks');

  if (customIconPacks) {
    icons = helpers.merge(icons, customIconPacks, true);
  }

  return icons;
};

//
/**
 * Icons take an important role of any application
 * @displayName Icon
 * @example ./examples/Icon.md
 * @style _icon.scss
 */

var script = {
  name: 'OIcon',
  mixins: [plugins.BaseComponentMixin],
  configField: 'icon',
  props: {
    /**
     * 	Color of the icon, optional
     *  @values primary, info, success, warning, danger, and any other custom color
     */
    variant: [String, Object],

    /**
     * Icon component name
     */
    component: String,

    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    pack: String,

    /**
     * Icon name
     */
    icon: String,

    /**
     * Icon size, optional
     * @values small, medium, large
     */
    size: String,

    /**
     * Overrides icon font size, optional
     * @values Depends on library: null (smallest), fa-lg, fa-2x, fa-3x, fa-4x, fa-5x, mdi-18px, mdi-24px, mdi-36px, mdi-48px
     */
    customSize: String,

    /**
     * Add class to icon font, optional. See here for MDI, here for FontAwesome 4 and here for FontAwesome 5 custom classes
     */
    customClass: String,

    /**
     * When true makes icon clickable
     */
    clickable: Boolean,

    /** Enable spin effect on icon */
    spin: Boolean,

    /** Rotation 0-360 */
    rotation: [Number, String],

    /** @ignore */
    both: Boolean,
    // This is used internally
    rootClass: [String, Function, Array],
    clickableClass: [String, Function, Array],
    spinClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    variantClass: [String, Function, Array]
  },
  computed: {
    rootClasses() {
      return [this.computedClass('rootClass', 'o-icon'), {
        [this.computedClass('clickableClass', 'o-icon--clickable')]: this.clickable
      }, {
        [this.computedClass('spinClass', 'o-icon--spin')]: this.spin
      }, {
        [this.computedClass('sizeClass', 'o-icon--', this.size)]: this.size
      }, {
        [this.computedClass('variantClass', 'o-icon--', this.newVariant)]: this.newVariant
      }];
    },

    rootStyle() {
      return {
        transform: `rotate(${helpers.defaultIfUndefined(this.rotation, 0)}deg)`
      };
    },

    iconConfig() {
      return getIcons()[this.newPack];
    },

    iconPrefix() {
      if (this.iconConfig && this.iconConfig.iconPrefix) {
        return this.iconConfig.iconPrefix;
      }

      return '';
    },

    /**
    * Internal icon name based on the pack.
    * If pack is 'fa', gets the equivalent FA icon name of the MDI,
    * internal icons are always MDI.
    */
    newIcon() {
      return `${this.iconPrefix}${this.getEquivalentIconOf(this.icon)}`;
    },

    newPack() {
      return this.pack || helpers.getValueByPath(plugins.config, 'iconPack', 'mdi');
    },

    newVariant() {
      if (!this.variant) return;
      let newVariant = '';

      if (typeof this.variant === 'string') {
        newVariant = this.variant;
      } else {
        newVariant = Object.keys(this.variant).filter(key => this.variant[key])[0];
      }

      return newVariant;
    },

    newCustomSize() {
      return this.customSize || this.customSizeByPack;
    },

    customSizeByPack() {
      if (this.iconConfig && this.iconConfig.sizes) {
        if (this.size && this.iconConfig.sizes[this.size] !== undefined) {
          return this.iconConfig.sizes[this.size];
        } else if (this.iconConfig.sizes.default) {
          return this.iconConfig.sizes.default;
        }
      }

      return null;
    },

    useIconComponent() {
      if (this.component) return this.component;
      const component = helpers.getValueByPath(plugins.config, 'iconComponent');
      if (component) return component;
      return null;
    }

  },
  methods: {
    /**
    * Equivalent icon name of the MDI.
    */
    getEquivalentIconOf(value) {
      // Only transform the class if the both prop is set to true
      if (!this.both) {
        return value;
      }

      if (this.iconConfig && this.iconConfig.internalIcons && this.iconConfig.internalIcons[value]) {
        return this.iconConfig.internalIcons[value];
      }

      return value;
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{class:_vm.rootClasses,style:(_vm.rootStyle)},[(!_vm.useIconComponent)?_c('i',{class:[_vm.newPack, _vm.newIcon, _vm.newCustomSize, _vm.customClass]}):_c(_vm.useIconComponent,{tag:"component",class:[_vm.customClass],attrs:{"icon":[_vm.newPack, _vm.newIcon],"size":_vm.newCustomSize}})],1)};
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

exports.__vue_component__ = __vue_component__;
