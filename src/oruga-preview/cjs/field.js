'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
var plugins = require('./plugins-3f7829d9.js');
var Field = require('./Field-e913afc7.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Field.__vue_component__);
  }

};
plugins.use(Plugin);

exports.OField = Field.__vue_component__;
exports.default = Plugin;
