'use strict';
const $ = require('jquery');
const service = require('./../core/service');
let list = [];

function init() {
  $(document).ready(() => {
    $('#file-list-button').click(() => {
      $('#file-list-panel').fadeIn("fast");
      service.getDocList().then(docs => {
        list = docs;
      });
    });
    $('#content').click(() => {
      $('#file-list-panel').fadeOut("fast");
    });

    updateLayout();
    window.onresize = function() {
      updateLayout();
    };
  });
}

function updateLayout() {
  var workspace = $('#workspace');
  $('#board-container').stop().animate({
    width: workspace.width(),
    height: workspace.height()
  }, 120);

  var $thumbnails = $('#thumbnails');
  $('#thumbnails').height($thumbnails.parent().height());
}

exports.init = init;