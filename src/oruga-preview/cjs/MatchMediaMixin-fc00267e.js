'use strict';

var helpers = require('./helpers.js');
var plugins = require('./plugins-d1c9ea2a.js');

var MatchMediaMixin = {
  props: {
    /**
     * Mobile breakpoint as max-width value
     */
    mobileBreakpoint: String
  },

  data() {
    return {
      $matchMediaRef: undefined,
      isMatchMedia: undefined
    };
  },

  methods: {
    onMatchMedia(event) {
      this.isMatchMedia = event.matches;
    }

  },

  created() {
    if (typeof window !== 'undefined') {
      let width = this.mobileBreakpoint;

      if (!width) {
        const defaultWidth = helpers.getValueByPath(plugins.config, `mobileBreakpoint`, '1023px');
        width = helpers.getValueByPath(plugins.config, `${this.$options.configField}.mobileBreakpoint`, defaultWidth);
      }

      this.$matchMediaRef = window.matchMedia(`(max-width: ${width})`);
      this.isMatchMedia = this.$matchMediaRef.matches;
      this.$matchMediaRef.addListener(this.onMatchMedia, false);
    }
  },

  beforeDestroy() {
    if (typeof window !== 'undefined') {
      this.$matchMediaRef.removeListener(this.checkMatchMedia);
    }
  }

};

exports.MatchMediaMixin = MatchMediaMixin;
