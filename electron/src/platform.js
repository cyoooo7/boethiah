"use strict";

const electron = require('remote');
const $ = require('jquery');
var electronWindow = electron.getCurrentWindow();
var isDarwin = process.platform === 'darwin';
var isWindows = process.platform === 'win32';

function addDebugFeatures() {
  $('html').keydown(event => {
    // Alt+R
    if (event.keyCode === 82 && event.altKey) {
      location.reload();
    }
    // Alt+D
    if (event.keyCode === 68 && event.altKey) {
      var win = electron.getCurrentWindow();
      win.webContents.openDevTools();
    }
  });
}

function changeUI() {
  $('#system-buttons').show();
  if (isDarwin) {
    $('body').addClass('darwin');
  }
  if (isWindows) {
    $('body').addClass('windows');
    $('#main .header').append($(`
        <p id="system-buttons">
          <img src="res/img/system-min.svg" id="system-min" class="button" />
          <img src="res/img/system-max.svg" id="system-max" class="button" />
          <img src="res/img/system-restore.svg" id="system-restore" class="button" />
          <img src="res/img/system-close.svg" id="system-close" class="button" />
        </p>`));
    initSystemButtons();
  }
}

function initSystemButtons() {
  $('#system-close').click(() => {
    electronWindow.close();
  });

  $('#system-min').click(() => {
    electronWindow.minimize();
  });

  $('#system-max').click(() => {
    electronWindow.maximize();
  });

  $('#system-restore').click(() => {
    electronWindow.restore();
  });

  electronWindow.on('maximize', () => {
    $('#system-max').hide();
    $('#system-restore').show();
  });

  electronWindow.on('unmaximize', () => {
    $('#system-max').show();
    $('#system-restore').hide();
  });
}

function addDesktopFeatures() {
  $(document).ready(function() {
    addDebugFeatures();
    changeUI();
  });
}

function init() {
  addDebugFeatures();
  addDesktopFeatures();
}

exports.init = init;
exports.info = {
  name: isWindows ? 'windows' : 'darwin'
};