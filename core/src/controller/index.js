'use strict';

const $ = require('jquery');
const service = require('./../service');
const SlideRenderer = require('./../paint').SlideRenderer;
let sidebar = require('./sidebar');
let slidePanel = require('./slidePanel');
let currentDoc;
let currentSlideIndex;
let renderSettings = {};
if (window.platform.name !== 'web') {
  renderSettings.resolveRes = res => service.baseUrl + res;
}
let renderer = new SlideRenderer('#board', renderSettings);
let isDisplayMode = false;

function init() {
  $(window).bind('hashchange', onHashChange);
  sidebar.init();

  $(document).ready(onPageReady);
}

function onPageReady() {
  $('body').on('click', '#showbox svg', (event) => {
    if (!isDisplayMode) {
      return;
    }
    var w = $('#showbox').width();
    var x = event.offsetX;
    if (x > w / 2) {
      setSlideIndex(currentSlideIndex + 1);
    } else {
      setSlideIndex(currentSlideIndex - 1);
    }
  });
  $('#display-button').click(() => {
    startDisplayMode();
  });
  $('#exit-display-button').click(() => {
    endDisplayMode();
  });
  $('html').keydown(function(event) {
    // F5
    if (event.keyCode === 116) {
      startDisplayMode();
    }
    // Esc
    if (event.keyCode === 27) {
      endDisplayMode();
    }
    // LeftArrow, UpArrow, PgUp
    if (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 33) {
      setSlideIndex(currentSlideIndex - 1);
    }
    // RightArrow, DownArrow, PgDn
    if (event.keyCode === 39 || event.keyCode === 40 || event.keyCode === 34) {
      setSlideIndex(currentSlideIndex + 1);
    }
  });
  onHashChange();
}

function startDisplayMode() {
  isDisplayMode = true;
  $('#showbox').fadeIn();
  var index = 0;
  if (currentDoc && currentDoc.slides.length > index && index >= 0) {
    setSlideIndex(0);
  }
}

function endDisplayMode() {
  isDisplayMode = false;
  $('#showbox').fadeOut();
}


function onHashChange() {
  let anchor = $.uriAnchor.makeAnchorMap();
  console.log("~" + JSON.stringify(anchor))
  if (anchor.did && (!currentDoc || currentDoc.id !== anchor.did)) {
    service.getDoc(anchor.did).then(doc => {
      setDoc(doc);
    });
  }
  if (currentDoc && anchor.slide && anchor.slide !== currentSlideIndex) {
    setSlideIndex(anchor.slide - 1);
  }
  if (typeof anchor.sidebar !== 'undefined') {
    var $app = $('#app');
    if (anchor.sidebar === 'show' && $app.hasClass('no-sidebar') ||
      anchor.sidebar !== 'show' && !$app.hasClass('no-sidebar')) {
      sidebar.toggle();
    }
  }
  if (typeof anchor.d !== 'undefined') {
    if (anchor.d === 1) {
      startDisplayMode();
    } else {
      endDisplayMode();
    }
  }
}

function setDoc(doc) {
  currentDoc = doc;
  $('#doc-header-title').text(doc.name);
  document.title = doc.name;
  $('#doc-header').fadeIn();
  slidePanel.render(doc.slides, renderer);
}

function setSlideIndex(index) {
  if (currentDoc && isDisplayMode && currentDoc.slides.length > index && index >= 0) {
    currentSlideIndex = index;
    renderer.render(currentDoc.slides[index], '#showbox-board');
  }
}


exports.init = init;