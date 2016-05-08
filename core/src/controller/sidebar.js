'use strict';
const $ = require('jquery');
const service = require('./../service');

function toggleSidebar() {
  var $app = $('#app');
  $app.toggleClass('no-sidebar');
  if (!$app.hasClass('no-sidebar')) {
    update();
  }
}

function update() {
  service.getDocList().then(docs => {
    let $items = docs.map(d => {
      return $(`<li data-doc-id='${d.id}' class='doc-item'>
        <p class='doc-name'>${d.name}</p>
        <p class="doc-info"><span>更新时间：</span><span class="doc-info-date">${d.lastUpdated}</span></p>
      </li>`);
    });
    $('#doc-list li').remove();
    $('#doc-list').append($items);
  });
}

function init() {
  $(document).ready(() => {
    var $app = $('#app');
    if (!$app.hasClass('no-sidebar')) {
      update();
    }
    $('#menu-button').click(() => {
      toggleSidebar();
    });
    $('#content').click(() => {
      $('#file-list-panel').fadeOut("fast");
    });
    $('#doc-list').on('click', 'li', event => {
      let anchor = $.uriAnchor.makeAnchorMap();
      anchor.did = event.currentTarget.attributes['data-doc-id'].value;
      $.uriAnchor.setAnchor(anchor);
    });
  });
}

exports.init = init;