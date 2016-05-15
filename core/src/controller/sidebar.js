'use strict';
const $ = require('jquery');
const service = require('./../service');

function toggleSidebar() {
  var $app = $('#app');
  $app.toggleClass('no-sidebar');
  if ($app.hasClass('no-sidebar')) {
    update();
    setAnchor({
      sidebar: "no"
    });
  } else {
    setAnchor({
      sidebar: "show"
    });
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
      $('#doc-list li').removeClass('current-doc');
      $(event.currentTarget).addClass('current-doc');
      setAnchor({
        did: event.currentTarget.attributes['data-doc-id'].value
      });
    });
  });
}

function setAnchor(state) {
  let anchor = $.uriAnchor.makeAnchorMap();
  Object.assign(anchor, state);
  $.uriAnchor.setAnchor(anchor);
}

exports.init = init;
exports.toggle = toggleSidebar;