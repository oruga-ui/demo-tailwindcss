'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
var plugins = require('./plugins-2885446e.js');
require('./Icon-31dd3104.js');
var Button = require('./Button-9d58b1dd.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Button.__vue_component__);
  }

};
plugins.use(Plugin);

exports.OButton = Button.__vue_component__;
exports.default = Plugin;
