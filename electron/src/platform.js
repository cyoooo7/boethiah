"use strict";

const electron = require('remote');
const $ = require('jquery');
var electronWindow = electron.getCurrentWindow();
var isDarwin = process.platform === 'darwin';
var isWindows = process.platform === 'windows';

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
  if(isDarwin){
    $('body').addClass('darwin');
  }
  if(isWindows){
    $('body').addClass('windows');
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
    initSystemButtons();
    changeUI();
  });
}

function init(){
  addDebugFeatures();
  addDesktopFeatures();
}

exports.init = init;