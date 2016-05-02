"use strict";

const electronApi = require('remote');
window.env = typeof electronApi.app === 'undefined' ? 'browser' : 'desktop';
window.jQuery = require('jquery');
require('jquery.urianchor').uriAnchor;
const service = require('./core/service');

(() => {
  if (window.env === 'desktop') {
    let desktop = require('./desktop');
    desktop.addDesktopFeatures();
    window.jQuery('head').append(`<base href='${service.baseUrl}'></base>`);
  }

  let view = require('./view');
  view.init();
})(); 