import { merge } from './helpers.js';
import { s as setVueInstance, a as setOptions, r as registerPlugin, b as registerComponentProgrammatic, u as use, c as config, P as Programmatic } from './plugins-948abce9.js';
export { d as Config } from './plugins-948abce9.js';
import './Icon-98338a0a.js';
import './FormElementMixin-fc713fb1.js';
import './Input-37c8e91d.js';
import Plugin from './autocomplete.js';
export { default as Autocomplete } from './autocomplete.js';
import './Button-3823a2f3.js';
import Plugin$1 from './button.js';
export { default as Button } from './button.js';
import './CheckRadioMixin-7f4f93a9.js';
import './Checkbox-71205772.js';
import Plugin$2 from './checkbox.js';
export { default as Checkbox } from './checkbox.js';
import Plugin$3 from './collapse.js';
export { default as Collapse } from './collapse.js';
import './MatchMediaMixin-bec150b5.js';
import './trapFocus-25a621e6.js';
import './DropdownItem-e3268f8f.js';
import './Field-9e9a4065.js';
import './Select-f13cdc5d.js';
import './Datepicker-912506a6.js';
import Plugin$4 from './datepicker.js';
export { default as Datepicker } from './datepicker.js';
import './Timepicker-80f5266c.js';
import Plugin$5 from './datetimepicker.js';
export { default as Datetimepicker } from './datetimepicker.js';
import Plugin$6 from './dropdown.js';
export { default as Dropdown } from './dropdown.js';
import Plugin$7 from './field.js';
export { default as Field } from './field.js';
import Plugin$8 from './icon.js';
export { default as Icon } from './icon.js';
import Plugin$9 from './input.js';
export { default as Input } from './input.js';
import './ssr-1ee179b4.js';
import './Loading-833bf370.js';
import Plugin$a from './loading.js';
export { default as Loading, LoadingProgrammatic } from './loading.js';
import Plugin$b from './modal.js';
export { default as Modal, ModalProgrammatic } from './modal.js';
import './Pagination-a6bcedf8.js';
import Plugin$c from './pagination.js';
export { default as Pagination } from './pagination.js';
import Plugin$d from './radio.js';
export { default as Radio } from './radio.js';
import Plugin$e from './select.js';
export { default as Select } from './select.js';
import Plugin$f from './skeleton.js';
export { default as Skeleton } from './skeleton.js';
import Plugin$g from './sidebar.js';
export { default as Sidebar } from './sidebar.js';
import './Tooltip-51aa42ae.js';
import Plugin$h from './slider.js';
export { default as Slider } from './slider.js';
import './SlotComponent-c00a1886.js';
import './TabbedChildMixin-2985a02e.js';
import Plugin$i from './steps.js';
export { default as Steps } from './steps.js';
import Plugin$j from './switch.js';
export { default as Switch } from './switch.js';
import Plugin$k from './table.js';
export { default as Table } from './table.js';
import Plugin$l from './tabs.js';
export { default as Tabs } from './tabs.js';
import Plugin$m from './timepicker.js';
export { default as Timepicker } from './timepicker.js';
import Plugin$n from './tooltip.js';
export { default as Tooltip } from './tooltip.js';
import Plugin$o from './upload.js';
export { default as Upload } from './upload.js';

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Autocomplete: Plugin,
    Button: Plugin$1,
    Checkbox: Plugin$2,
    Collapse: Plugin$3,
    Datepicker: Plugin$4,
    Datetimepicker: Plugin$5,
    Dropdown: Plugin$6,
    Field: Plugin$7,
    Icon: Plugin$8,
    Input: Plugin$9,
    Loading: Plugin$a,
    Modal: Plugin$b,
    Pagination: Plugin$c,
    Radio: Plugin$d,
    Select: Plugin$e,
    Skeleton: Plugin$f,
    Sidebar: Plugin$g,
    Slider: Plugin$h,
    Steps: Plugin$i,
    Switch: Plugin$j,
    Table: Plugin$k,
    Tabs: Plugin$l,
    Timepicker: Plugin$m,
    Tooltip: Plugin$n,
    Upload: Plugin$o
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
