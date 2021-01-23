'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
var plugins = require('./plugins-d1c9ea2a.js');
require('./CheckRadioMixin-df88dd8e.js');
var Checkbox = require('./Checkbox-1db20027.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Checkbox.__vue_component__);
  }

};
plugins.use(Plugin);

exports.OCheckbox = Checkbox.__vue_component__;
exports.default = Plugin;
