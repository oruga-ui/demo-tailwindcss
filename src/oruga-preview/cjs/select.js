'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
var plugins = require('./plugins-d1c9ea2a.js');
require('./Icon-d8c779b9.js');
require('./FormElementMixin-f42a30ee.js');
var Select = require('./Select-fde028f3.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Select.__vue_component__);
  }

};
plugins.use(Plugin);

exports.OSelect = Select.__vue_component__;
exports.default = Plugin;
