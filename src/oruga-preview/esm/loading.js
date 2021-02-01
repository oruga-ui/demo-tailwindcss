import { merge } from './helpers.js';
import { e as registerComponent, b as registerComponentProgrammatic, u as use, V as VueInstance } from './plugins-948abce9.js';
import './Icon-98338a0a.js';
import './ssr-1ee179b4.js';
import { _ as __vue_component__ } from './Loading-833bf370.js';
export { _ as OLoading } from './Loading-833bf370.js';

let localVueInstance;
const LoadingProgrammatic = {
  open(params) {
    const defaultParam = {
      programmatic: true
    };
    const propsData = merge(defaultParam, params);
    const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || VueInstance;
    const LoadingComponent = vm.extend(__vue_component__);
    return new LoadingComponent({
      el: document.createElement('div'),
      propsData
    });
  }

};
const Plugin = {
  install(Vue) {
    localVueInstance = Vue;
    registerComponent(Vue, __vue_component__);
    registerComponentProgrammatic(Vue, 'loading', LoadingProgrammatic);
  }

};
use(Plugin);

export default Plugin;
export { LoadingProgrammatic };
