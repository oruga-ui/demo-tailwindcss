'use strict';

var helpers = require('./helpers.js');
var Icon = require('./Icon-d8c779b9.js');
var SlotComponent = require('./SlotComponent-0a757062.js');

const items = 1;
const sorted = 3;
const Sorted = sorted;
var ProviderParentMixin = ((itemName, flags = 0) => {
  const mixin = {
    provide() {
      return {
        ['o' + itemName]: this
      };
    }

  };

  if (helpers.hasFlag(flags, items)) {
    mixin.data = function () {
      return {
        childItems: [],
        sequence: 1
      };
    };

    mixin.methods = {
      _registerItem(item) {
        this.$nextTick(() => {
          item.index = this.childItems.length;
          this.childItems.push(item);
        });
      },

      _unregisterItem(item) {
        this.$nextTick(() => {
          this.childItems = this.childItems.filter(i => i !== item);
          let index = 0;
          this.childItems.forEach(it => {
            it.index = index++;
          });
        });
      },

      _nextSequence() {
        return this.sequence++;
      }

    };

    if (helpers.hasFlag(flags, sorted)) {
      mixin.computed = {
        /**
         * When items are added/removed sort them according to their position
         */
        sortedItems() {
          return this.childItems.slice().sort((i1, i2) => {
            return i1.index - i2.index;
          });
        }

      };
    }
  }

  return mixin;
});

var TabbedMixin = (cmp => ({
  mixins: [ProviderParentMixin(cmp, Sorted)],
  components: {
    [Icon.__vue_component__.name]: Icon.__vue_component__,
    [SlotComponent.SlotComponent.name]: SlotComponent.SlotComponent
  },
  props: {
    /** @model */
    value: [String, Number],

    /**
    * Color of the control, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: [String, Object],

    /**
     * Tab size, optional
     * @values small, medium, large
     */
    size: String,
    animated: {
      type: Boolean,
      default: true
    },

    /** Show tab in vertical layout */
    vertical: {
      type: Boolean,
      default: false
    },

    /**
     * Position of the tab, optional
     * @values centered, right
     */
    position: String,

    /** Destroy tab on hide */
    destroyOnHide: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      activeId: this.value,
      contentHeight: 0,
      isTransitioning: false
    };
  },

  computed: {
    activeItem() {
      return this.activeId !== undefined && this.activeId !== null ? this.childItems.filter(i => i.newValue === this.activeId)[0] : this.items[0];
    },

    items() {
      return this.sortedItems;
    }

  },
  watch: {
    /**
     * When v-model is changed set the new active tab.
     */
    value(value) {
      this.performAction();
      this.activeId = value;
    }

  },
  methods: {
    /**
    * Child click listener, emit input event and change active child.
    */
    childClick(child) {
      if (this.activeId !== child.newValue) {
        this.performAction();
        this.activeId = child.newValue;
        this.$emit('input', this.activeId);
      }
    },

    /**
    * Activate next child and deactivate prev child
    */
    performAction() {
      const oldValue = this.activeId;
      const oldTab = oldValue !== undefined && oldValue !== null ? this.childItems.filter(i => i.newValue === oldValue)[0] : this.items[0];

      if (oldTab && this.activeItem) {
        oldTab.deactivate(this.activeItem.index);
        this.activeItem.activate(oldTab.index);
      }
    }

  }
}));

const sorted$1 = 1;
const optional = 2;
const Sorted$1 = sorted$1;
var InjectedChildMixin = ((parentItemName, flags = 0) => {
  const mixin = {
    inject: {
      parent: {
        from: 'o' + parentItemName
      }
    },

    created() {
      this.newValue = typeof this.value === 'undefined' ? this.parent._nextSequence() : this.value;

      if (!this.parent) {
        if (!helpers.hasFlag(flags, optional)) {
          throw new Error('You should wrap ' + this.$options.name + ' in a ' + parentItemName);
        }
      } else if (this.parent._registerItem) {
        this.parent._registerItem(this);
      }
    },

    beforeDestroy() {
      if (this.parent && this.parent._unregisterItem) {
        this.parent._unregisterItem(this);
      }
    }

  };

  if (helpers.hasFlag(flags, sorted$1)) {
    mixin.data = () => {
      return {
        index: null
      };
    };
  }

  return mixin;
});

var TabbedChildMixin = (parentCmp => ({
  mixins: [InjectedChildMixin(parentCmp, Sorted$1)],
  props: {
    /**
     * Item label
     */
    label: String,

    /**
     * Icon on the left
     */
    icon: String,

    /**
     * Icon pack
     */
    iconPack: String,

    /**
     * Show/hide item
     */
    visible: {
      type: Boolean,
      default: true
    },

    /**
     * Item value (it will be used as v-model of wrapper component)
     */
    value: [String, Number],

    /**
     * Header class of the item
     */
    headerClass: {
      type: [String, Array, Object]
    }
  },

  data() {
    return {
      transitionName: undefined,
      newValue: this.value
    };
  },

  computed: {
    isActive() {
      return this.parent.activeItem === this;
    },

    elementClasses() {
      return [];
    }

  },
  methods: {
    /**
     * Activate element, alter animation name based on the index.
     */
    activate(oldIndex) {
      this.transitionName = this.index < oldIndex ? this.parent.vertical ? 'slide-down' : 'slide-next' : this.parent.vertical ? 'slide-up' : 'slide-prev';
    },

    /**
     * Deactivate element, alter animation name based on the index.
     */
    deactivate(newIndex) {
      this.transitionName = newIndex < this.index ? this.parent.vertical ? 'slide-down' : 'slide-next' : this.parent.vertical ? 'slide-up' : 'slide-prev';
    }

  },

  render(h) {
    // if destroy apply v-if
    if (this.parent.destroyOnHide) {
      if (!this.isActive || !this.visible) return;
    }

    const vnode = h('div', {
      directives: [{
        name: 'show',
        value: this.isActive && this.visible
      }],
      attrs: {
        'class': this.elementClasses
      }
    }, this.$slots.default); // check animated prop

    if (this.parent.animated) {
      return h('transition', {
        props: {
          'name': this.transitionName
        },
        on: {
          'before-enter': () => {
            this.parent.isTransitioning = true;
          },
          'after-enter': () => {
            this.parent.isTransitioning = false;
          }
        }
      }, [vnode]);
    }

    return vnode;
  }

}));

exports.TabbedChildMixin = TabbedChildMixin;
exports.TabbedMixin = TabbedMixin;
