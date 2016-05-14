'use strict';
const $ = require('jquery');

function render(slides, renderer) {
  var $panel = $('#doc-slide-list');
  $('#doc-slide-list li').remove();
  for (let i = 0; i < slides.length; i++) {
    var $svg = $('<svg viewBox="0 0 1280 720"></svg>');
    let $li = $('<li class="doc-slide-item"></li>').hide();
    $panel.append($li);
    $li.append($(`<div class="doc-slide-bg"></div>`));
    $li.append($(`<h3 class="doc-slide-index">${i+1}</h3>`));
    $li.append($svg);
    renderer.render(slides[i], $svg[0]);
    $li.fadeIn(650);
    $li.click(()=>{
      let anchor = $.uriAnchor.makeAnchorMap();
      anchor.slide = i+1;
      $.uriAnchor.setAnchor(anchor);
    });
  }
}

exports.render = render;