'use strict';
const $ = require('jquery');
const service = require('./../core/service');

function init() {
  $(document).ready(() => {
    $('#file-list-button').click(() => {
      $('#file-list-panel').fadeIn("fast");
      service.getDocList().then(docs => {
        let $items = docs.map(d => {
          return $(`<li data-doc-id='${d.id}'>${d.name}</li>`);
        });
        $('#file-list li').remove();
        $('#file-list').append($items);
      });
    });
    $('#content').click(() => {
      $('#file-list-panel').fadeOut("fast");
    });

    $('#file-list').on('click', 'li', event => {
      let anchor = $.uriAnchor.makeAnchorMap();
      anchor.did = event.target.attributes['data-doc-id'].value;
      $.uriAnchor.setAnchor(anchor);
      $('#file-list-panel').fadeOut("fast");
    });
  });
}

exports.init = init;