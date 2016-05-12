"use strict";

window.jQuery = require('jquery');
require('jquery.urianchor').uriAnchor;

(() => {
  var platform = require('./src/platform');
  platform.init();
  window.platform = platform.info;
  let controller = require('./src/controller');
  controller.init();
})();