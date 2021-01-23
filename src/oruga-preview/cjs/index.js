'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var helpers = require('./helpers.js');
var plugins = require('./plugins-d1c9ea2a.js');
require('./Icon-d8c779b9.js');
require('./FormElementMixin-f42a30ee.js');
require('./Input-beb368bf.js');
var autocomplete = require('./autocomplete.js');
require('./Button-4908c70f.js');
var button = require('./button.js');
require('./CheckRadioMixin-df88dd8e.js');
require('./Checkbox-1db20027.js');
var checkbox = require('./checkbox.js');
var collapse = require('./collapse.js');
require('./MatchMediaMixin-fc00267e.js');
require('./trapFocus-8381ef46.js');
require('./DropdownItem-afd3b9b2.js');
require('./Field-91ccc16b.js');
require('./Select-fde028f3.js');
var datepicker = require('./datepicker.js');
var dropdown = require('./dropdown.js');
var field = require('./field.js');
var icon = require('./icon.js');
var input = require('./input.js');
require('./ssr-39c7e185.js');
require('./Loading-fc982f40.js');
var loading = require('./loading.js');
var modal = require('./modal.js');
require('./Pagination-18c92745.js');
var pagination = require('./pagination.js');
var radio = require('./radio.js');
var select = require('./select.js');
var skeleton = require('./skeleton.js');
var sidebar = require('./sidebar.js');
require('./Tooltip-421c706f.js');
var slider = require('./slider.js');
require('./SlotComponent-0a757062.js');
require('./TabbedChildMixin-d3a88988.js');
var steps = require('./steps.js');
var _switch = require('./switch.js');
var table = require('./table.js');
var tabs = require('./tabs.js');
var tooltip = require('./tooltip.js');
var upload = require('./upload.js');

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Autocomplete: autocomplete.default,
    Button: button.default,
    Checkbox: checkbox.default,
    Collapse: collapse.default,
    Datepicker: datepicker.default,
    Dropdown: dropdown.default,
    Field: field.default,
    Icon: icon.default,
    Input: input.default,
    Loading: loading.default,
    Modal: modal.default,
    Pagination: pagination.default,
    Radio: radio.default,
    Select: select.default,
    Skeleton: skeleton.default,
    Sidebar: sidebar.default,
    Slider: slider.default,
    Steps: steps.default,
    Switch: _switch.default,
    Table: table.default,
    Tabs: tabs.default,
    Tooltip: tooltip.default,
    Upload: upload.default
});

const Oruga = {
  install(Vue, options = {}) {
    plugins.setVueInstance(Vue); // Options

    plugins.setOptions(helpers.merge(plugins.config, options, true)); // Components

    for (const componentKey in components) {
      plugins.registerPlugin(Vue, components[componentKey]);
    } // Config component


    plugins.registerComponentProgrammatic(Vue, 'config', plugins.Programmatic);
  }

};
plugins.use(Oruga);

exports.Config = plugins.Plugin;
exports.Autocomplete = autocomplete.default;
exports.Button = button.default;
exports.Checkbox = checkbox.default;
exports.Collapse = collapse.default;
exports.Datepicker = datepicker.default;
exports.Dropdown = dropdown.default;
exports.Field = field.default;
exports.Icon = icon.default;
exports.Input = input.default;
exports.Loading = loading.default;
exports.LoadingProgrammatic = loading.LoadingProgrammatic;
exports.Modal = modal.default;
exports.ModalProgrammatic = modal.ModalProgrammatic;
exports.Pagination = pagination.default;
exports.Radio = radio.default;
exports.Select = select.default;
exports.Skeleton = skeleton.default;
exports.Sidebar = sidebar.default;
exports.Slider = slider.default;
exports.Steps = steps.default;
exports.Switch = _switch.default;
exports.Table = table.default;
exports.Tabs = tabs.default;
exports.Tooltip = tooltip.default;
exports.Upload = upload.default;
exports.default = Oruga;
