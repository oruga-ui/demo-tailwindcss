'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
var plugins = require('./plugins-d1c9ea2a.js');
require('./Icon-d8c779b9.js');
require('./MatchMediaMixin-fc00267e.js');
var Pagination = require('./Pagination-18c92745.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Pagination.__vue_component__);
    plugins.registerComponent(Vue, Pagination.__vue_component__$1);
  }

};
plugins.use(Plugin);

exports.OPagination = Pagination.__vue_component__;
exports.OPaginationButton = Pagination.__vue_component__$1;
exports.default = Plugin;
