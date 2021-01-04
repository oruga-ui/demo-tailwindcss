'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
var plugins = require('./plugins-3f7829d9.js');
require('./Icon-5b4af0b7.js');
var Button = require('./Button-86bbc694.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Button.__vue_component__);
  }

};
plugins.use(Plugin);

exports.OButton = Button.__vue_component__;
exports.default = Plugin;
