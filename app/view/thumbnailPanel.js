'use strict';
const $ = require('jquery');

function render(slides, renderer) {
  var $panel = $('#thumbnails ul');
  $('#thumbnails ul li').remove();
  for (let i = 0; i < slides.length; i++) {
    var $svg = $('<svg viewBox="0 0 1280 720"></svg>');
    let $li = $('<li class="slide-thumbnail"></li>').hide();
    $panel.append($li);
    $li.append($(`<p>${i+1}</p>`));
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