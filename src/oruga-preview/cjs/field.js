'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
var plugins = require('./plugins-d1c9ea2a.js');
require('./MatchMediaMixin-fc00267e.js');
var Field = require('./Field-91ccc16b.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Field.__vue_component__);
  }

};
plugins.use(Plugin);

exports.OField = Field.__vue_component__;
exports.default = Plugin;
