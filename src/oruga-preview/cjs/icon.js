'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
var plugins = require('./plugins-3f7829d9.js');
var Icon = require('./Icon-5b4af0b7.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Icon.__vue_component__);
  }

};
plugins.use(Plugin);

exports.OIcon = Icon.__vue_component__;
exports.default = Plugin;
