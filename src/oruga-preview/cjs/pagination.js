'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
var plugins = require('./plugins-3f7829d9.js');
require('./Icon-5b4af0b7.js');
var Pagination = require('./Pagination-08a25ba4.js');

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
