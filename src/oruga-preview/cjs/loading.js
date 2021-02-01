'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var helpers = require('./helpers.js');
var plugins = require('./plugins-2885446e.js');
require('./Icon-31dd3104.js');
require('./ssr-39c7e185.js');
var Loading = require('./Loading-76a56d40.js');

let localVueInstance;
const LoadingProgrammatic = {
  open(params) {
    const defaultParam = {
      programmatic: true
    };
    const propsData = helpers.merge(defaultParam, params);
    const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || plugins.VueInstance;
    const LoadingComponent = vm.extend(Loading.__vue_component__);
    return new LoadingComponent({
      el: document.createElement('div'),
      propsData
    });
  }

};
const Plugin = {
  install(Vue) {
    localVueInstance = Vue;
    plugins.registerComponent(Vue, Loading.__vue_component__);
    plugins.registerComponentProgrammatic(Vue, 'loading', LoadingProgrammatic);
  }

};
plugins.use(Plugin);

exports.OLoading = Loading.__vue_component__;
exports.LoadingProgrammatic = LoadingProgrammatic;
exports.default = Plugin;
