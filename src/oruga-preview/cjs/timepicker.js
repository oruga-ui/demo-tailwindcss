'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
var plugins = require('./plugins-2885446e.js');
require('./Icon-31dd3104.js');
require('./FormElementMixin-d665a3fc.js');
require('./Input-41c7e8e2.js');
require('./MatchMediaMixin-fe914401.js');
require('./trapFocus-8381ef46.js');
require('./DropdownItem-09c80f60.js');
require('./Select-a1427580.js');
var Timepicker = require('./Timepicker-000e408b.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Timepicker.__vue_component__);
  }

};
plugins.use(Plugin);

exports.BTimepicker = Timepicker.__vue_component__;
exports.default = Plugin;
