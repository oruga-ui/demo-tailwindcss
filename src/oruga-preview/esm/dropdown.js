import './helpers.js';
import { e as registerComponent, u as use } from './plugins-b98d7e7d.js';
import './MatchMediaMixin-4e5c9540.js';
import './trapFocus-25a621e6.js';
import { _ as __vue_component__, a as __vue_component__$1 } from './DropdownItem-d24e44ae.js';
export { _ as ODropdown, a as ODropdownItem } from './DropdownItem-d24e44ae.js';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, __vue_component__);
    registerComponent(Vue, __vue_component__$1);
  }

};
use(Plugin);

export default Plugin;
