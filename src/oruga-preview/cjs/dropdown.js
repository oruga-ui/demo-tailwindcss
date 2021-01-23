'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
var plugins = require('./plugins-d1c9ea2a.js');
require('./MatchMediaMixin-fc00267e.js');
require('./trapFocus-8381ef46.js');
var DropdownItem = require('./DropdownItem-afd3b9b2.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, DropdownItem.__vue_component__);
    plugins.registerComponent(Vue, DropdownItem.__vue_component__$1);
  }

};
plugins.use(Plugin);

exports.ODropdown = DropdownItem.__vue_component__;
exports.ODropdownItem = DropdownItem.__vue_component__$1;
exports.default = Plugin;
