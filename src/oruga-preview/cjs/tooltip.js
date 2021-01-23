'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
var plugins = require('./plugins-d1c9ea2a.js');
var Tooltip = require('./Tooltip-421c706f.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Tooltip.__vue_component__);
  }

};
plugins.use(Plugin);

exports.OTooltip = Tooltip.__vue_component__;
exports.default = Plugin;
