'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
var plugins = require('./plugins-3f7829d9.js');
var Tooltip = require('./Tooltip-70eb1ba3.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Tooltip.__vue_component__);
  }

};
plugins.use(Plugin);

exports.OTooltip = Tooltip.__vue_component__;
exports.default = Plugin;
