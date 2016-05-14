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
  updateLayout();
  window.onresize = function() {
    updateLayout();
  };
  $('body').on('click', '#board', (event) => {
    if (!isDisplayMode) {
      return;
    }
    var w = $('#board').width();
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
  $('#exit-dispaly-button').click(() => {
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
  $('#board').addClass('fullscreen');
  $('#exit-dispaly-button').show('fast');
}

function endDisplayMode() {
  isDisplayMode = false;
  $('#board').removeClass('fullscreen');
  $('#exit-dispaly-button').hide('fast');
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

function onHashChange() {
  let anchor = $.uriAnchor.makeAnchorMap();
  if (anchor.did && (!currentDoc || currentDoc.id !== anchor.did)) {
    service.getDoc(anchor.did).then(doc => {
      setDoc(doc);
    });
  }
  if (currentDoc && anchor.slide && anchor.slide !== currentSlideIndex) {
    setSlideIndex(anchor.slide - 1);
  }
}

function setDoc(doc) {
  currentDoc = doc;
  $('#doc-header-title').text(doc.name);
  document.title = doc.name;
  slidePanel.render(doc.slides, renderer);
  setSlideIndex(0);
}

function setSlideIndex(index) {
  if (currentDoc && currentDoc.slides.length > index && index >= 0) {
    currentSlideIndex = index;
    // renderer.render(currentDoc.slides[index], '#board');
    $('#thumbnails li').removeClass('active');
    $(`#thumbnails li:nth-child(${index + 1})`).addClass('active');
  }
}


exports.init = init;