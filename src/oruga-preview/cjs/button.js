'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
var plugins = require('./plugins-d1c9ea2a.js');
require('./Icon-d8c779b9.js');
var Button = require('./Button-4908c70f.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Button.__vue_component__);
  }

};
plugins.use(Plugin);

exports.OButton = Button.__vue_component__;
exports.default = Plugin;
