'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
var plugins = require('./plugins-d1c9ea2a.js');
var Icon = require('./Icon-d8c779b9.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Icon.__vue_component__);
  }

};
plugins.use(Plugin);

exports.OIcon = Icon.__vue_component__;
exports.default = Plugin;
