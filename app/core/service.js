"use strict";
const fetch = require('node-fetch');

let baseUrl = 'http://localhost:3000/';
if(window.env==='browser'){
  baseUrl = location.href;
}
const baseApiUrl = baseUrl + 'api/';
const docsUrl = baseApiUrl + 'docs/';

function getDocList() {
  return getJson(docsUrl);
}

function getDoc(id) {
  return getJson(getDocUrl(id));
}

function getDocUrl(id){
  return docsUrl + id;
}

function getJson(url) {
  var promise = new Promise((resolve, reject) => {
    fetch(url)
      .then(function (res) {
        return res.json();
      }).then(function (data) {
        resolve(data);
      });
  });
  return promise;
}

exports.getDocList = getDocList;
exports.getDoc = getDoc;
exports.getDocUrl = getDocUrl;
exports.baseUrl = baseUrl;