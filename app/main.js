"use strict";

const electronApi = require('remote');
const env = typeof electronApi.app === 'undefined' ? 'browser' : 'desktop';
window.jQuery = require('jquery');
require('jquery.urianchor').uriAnchor;
const service = require('./core/service');

(() => {
  window.jQuery('head').append(`<base href='${service.baseUrl}'></base>`);
  
  if (env === 'desktop') {
    let desktop = require('./desktop');
    desktop.addDesktopFeatures();
  }

  let view = require('./view');
  view.init();
})();