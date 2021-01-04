import { merge } from './helpers.js';
import { s as setVueInstance, a as setOptions, r as registerPlugin, b as registerComponentProgrammatic, u as use, c as config, P as Programmatic } from './plugins-3fa0f67b.js';
export { d as Config } from './plugins-3fa0f67b.js';
import './Icon-60401233.js';
import './FormElementMixin-4e63eba5.js';
import './Input-eac33c4f.js';
import Plugin from './autocomplete.js';
export { default as Autocomplete } from './autocomplete.js';
import './Button-9d6ec996.js';
import Plugin$1 from './button.js';
export { default as Button } from './button.js';
import './CheckRadioMixin-e43b9266.js';
import './Checkbox-e9942ab1.js';
import Plugin$2 from './checkbox.js';
export { default as Checkbox } from './checkbox.js';
import Plugin$3 from './collapse.js';
export { default as Collapse } from './collapse.js';
import './trapFocus-25a621e6.js';
import Plugin$4 from './dropdown.js';
export { default as Dropdown } from './dropdown.js';
import './Field-5738e8fa.js';
import Plugin$5 from './field.js';
export { default as Field } from './field.js';
import Plugin$6 from './icon.js';
export { default as Icon } from './icon.js';
import Plugin$7 from './input.js';
export { default as Input } from './input.js';
import './ssr-1ee179b4.js';
import './Loading-5f6db072.js';
import Plugin$8 from './loading.js';
export { default as Loading, LoadingProgrammatic } from './loading.js';
import Plugin$9 from './modal.js';
export { default as Modal, ModalProgrammatic } from './modal.js';
import './Pagination-8c6a9782.js';
import Plugin$a from './pagination.js';
export { default as Pagination } from './pagination.js';
import Plugin$b from './radio.js';
export { default as Radio } from './radio.js';
import './Select-d38aa883.js';
import Plugin$c from './select.js';
export { default as Select } from './select.js';
import Plugin$d from './skeleton.js';
export { default as Skeleton } from './skeleton.js';
import Plugin$e from './sidebar.js';
export { default as Sidebar } from './sidebar.js';
import './Tooltip-fe36641d.js';
import Plugin$f from './slider.js';
export { default as Slider } from './slider.js';
import './SlotComponent-c00a1886.js';
import './TabbedChildMixin-7b377ffb.js';
import Plugin$g from './steps.js';
export { default as Steps } from './steps.js';
import Plugin$h from './switch.js';
export { default as Switch } from './switch.js';
import Plugin$i from './table.js';
export { default as Table } from './table.js';
import Plugin$j from './tabs.js';
export { default as Tabs } from './tabs.js';
import Plugin$k from './tooltip.js';
export { default as Tooltip } from './tooltip.js';
import Plugin$l from './upload.js';
export { default as Upload } from './upload.js';

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Autocomplete: Plugin,
    Button: Plugin$1,
    Checkbox: Plugin$2,
    Collapse: Plugin$3,
    Dropdown: Plugin$4,
    Field: Plugin$5,
    Icon: Plugin$6,
    Input: Plugin$7,
    Loading: Plugin$8,
    Modal: Plugin$9,
    Pagination: Plugin$a,
    Radio: Plugin$b,
    Select: Plugin$c,
    Skeleton: Plugin$d,
    Sidebar: Plugin$e,
    Slider: Plugin$f,
    Steps: Plugin$g,
    Switch: Plugin$h,
    Table: Plugin$i,
    Tabs: Plugin$j,
    Tooltip: Plugin$k,
    Upload: Plugin$l
});

const Oruga = {
  install(Vue, options = {}) {
    setVueInstance(Vue); // Options

    setOptions(merge(config, options, true)); // Components

    for (const componentKey in components) {
      registerPlugin(Vue, components[componentKey]);
    } // Config component


    registerComponentProgrammatic(Vue, 'config', Programmatic);
  }

};
use(Oruga);

export default Oruga;
