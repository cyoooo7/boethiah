const fetch = require('node-fetch');

const baseUrl = 'http://172.18.41.188:3000/';
const baseApiUrl = baseUrl + 'api/';
const docsUrl = baseApiUrl + 'docs/';

function getDocList() {
  return getJson(docsUrl);
}

function getDoc(id) {
  return getJson(docsUrl + id);
}

function getJson(url) {
  var promise = new Promise((resolve, reject) => {
    fetch(docsUrl)
      .then(function(res) {
        return res.json();
      }).then(function(data) {
        resolve(data);
      });
  });
  return promise;
}

exports.getDocList = getDocList;
exports.getDoc = getDoc;