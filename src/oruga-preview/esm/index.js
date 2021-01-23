import { merge } from './helpers.js';
import { s as setVueInstance, a as setOptions, r as registerPlugin, b as registerComponentProgrammatic, u as use, c as config, P as Programmatic } from './plugins-b98d7e7d.js';
export { d as Config } from './plugins-b98d7e7d.js';
import './Icon-a954439c.js';
import './FormElementMixin-03848984.js';
import './Input-6a0245ab.js';
import Plugin from './autocomplete.js';
export { default as Autocomplete } from './autocomplete.js';
import './Button-a4b81b0c.js';
import Plugin$1 from './button.js';
export { default as Button } from './button.js';
import './CheckRadioMixin-7f4f93a9.js';
import './Checkbox-87e9a522.js';
import Plugin$2 from './checkbox.js';
export { default as Checkbox } from './checkbox.js';
import Plugin$3 from './collapse.js';
export { default as Collapse } from './collapse.js';
import './MatchMediaMixin-4e5c9540.js';
import './trapFocus-25a621e6.js';
import './DropdownItem-d24e44ae.js';
import './Field-8eb6a87d.js';
import './Select-7f86c08a.js';
import Plugin$4 from './datepicker.js';
export { default as Datepicker } from './datepicker.js';
import Plugin$5 from './dropdown.js';
export { default as Dropdown } from './dropdown.js';
import Plugin$6 from './field.js';
export { default as Field } from './field.js';
import Plugin$7 from './icon.js';
export { default as Icon } from './icon.js';
import Plugin$8 from './input.js';
export { default as Input } from './input.js';
import './ssr-1ee179b4.js';
import './Loading-48700cd3.js';
import Plugin$9 from './loading.js';
export { default as Loading, LoadingProgrammatic } from './loading.js';
import Plugin$a from './modal.js';
export { default as Modal, ModalProgrammatic } from './modal.js';
import './Pagination-a7ab5cc4.js';
import Plugin$b from './pagination.js';
export { default as Pagination } from './pagination.js';
import Plugin$c from './radio.js';
export { default as Radio } from './radio.js';
import Plugin$d from './select.js';
export { default as Select } from './select.js';
import Plugin$e from './skeleton.js';
export { default as Skeleton } from './skeleton.js';
import Plugin$f from './sidebar.js';
export { default as Sidebar } from './sidebar.js';
import './Tooltip-a48a672d.js';
import Plugin$g from './slider.js';
export { default as Slider } from './slider.js';
import './SlotComponent-c00a1886.js';
import './TabbedChildMixin-7a218f90.js';
import Plugin$h from './steps.js';
export { default as Steps } from './steps.js';
import Plugin$i from './switch.js';
export { default as Switch } from './switch.js';
import Plugin$j from './table.js';
export { default as Table } from './table.js';
import Plugin$k from './tabs.js';
export { default as Tabs } from './tabs.js';
import Plugin$l from './tooltip.js';
export { default as Tooltip } from './tooltip.js';
import Plugin$m from './upload.js';
export { default as Upload } from './upload.js';

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Autocomplete: Plugin,
    Button: Plugin$1,
    Checkbox: Plugin$2,
    Collapse: Plugin$3,
    Datepicker: Plugin$4,
    Dropdown: Plugin$5,
    Field: Plugin$6,
    Icon: Plugin$7,
    Input: Plugin$8,
    Loading: Plugin$9,
    Modal: Plugin$a,
    Pagination: Plugin$b,
    Radio: Plugin$c,
    Select: Plugin$d,
    Skeleton: Plugin$e,
    Sidebar: Plugin$f,
    Slider: Plugin$g,
    Steps: Plugin$h,
    Switch: Plugin$i,
    Table: Plugin$j,
    Tabs: Plugin$k,
    Tooltip: Plugin$l,
    Upload: Plugin$m
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
