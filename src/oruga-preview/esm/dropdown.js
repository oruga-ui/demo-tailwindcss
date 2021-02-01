import './helpers.js';
import { e as registerComponent, u as use } from './plugins-948abce9.js';
import './MatchMediaMixin-bec150b5.js';
import './trapFocus-25a621e6.js';
import { _ as __vue_component__, a as __vue_component__$1 } from './DropdownItem-e3268f8f.js';
export { _ as ODropdown, a as ODropdownItem } from './DropdownItem-e3268f8f.js';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, __vue_component__);
    registerComponent(Vue, __vue_component__$1);
  }

};
use(Plugin);

export default Plugin;
