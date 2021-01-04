'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
var plugins = require('./plugins-3f7829d9.js');
require('./Icon-5b4af0b7.js');
require('./FormElementMixin-2354d5ae.js');
var Select = require('./Select-6a5b35fa.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Select.__vue_component__);
  }

};
plugins.use(Plugin);

exports.OSelect = Select.__vue_component__;
exports.default = Plugin;
