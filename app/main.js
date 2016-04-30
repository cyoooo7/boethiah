"use strict";

const electronApi = require('remote');
const env = typeof electronApi.app === 'undefined' ? 'browser' : 'desktop';

(() => {
  if (env === 'desktop') {
    let desktop = require('./desktop');
    desktop.addDesktopFeatures();
  }

  let view = require('./view');
  view.init();
})();