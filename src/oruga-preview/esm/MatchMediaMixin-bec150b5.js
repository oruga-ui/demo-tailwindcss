import { getValueByPath } from './helpers.js';
import { c as config } from './plugins-948abce9.js';

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
        const defaultWidth = getValueByPath(config, `mobileBreakpoint`, '1023px');
        width = getValueByPath(config, `${this.$options.configField}.mobileBreakpoint`, defaultWidth);
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

export { MatchMediaMixin as M };
