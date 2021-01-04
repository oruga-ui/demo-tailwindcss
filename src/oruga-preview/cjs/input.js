'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
var plugins = require('./plugins-3f7829d9.js');
require('./Icon-5b4af0b7.js');
require('./FormElementMixin-2354d5ae.js');
var Input = require('./Input-a0188fd0.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Input.__vue_component__);
  }

};
plugins.use(Plugin);

exports.OInput = Input.__vue_component__;
exports.default = Plugin;
