const repoDirectory = '.temp/repo';
const path = require('path');
const fs = require('fs-plus');
const enbx = require('./../core/enbx');

function createRefConverter() {
  return res => {
    var url = 'res/' + encodeURIComponent(res.substr(repoDirectory.length + 1));
    return url;
  };
}

function save(enbxFile, name) {
  var promise = new Promise((resolve, reject) => {
    var unzipDir = path.join(repoDirectory, name);
    enbx.load(enbxFile, {
      unzip: unzipDir,
      convertRef: createRefConverter()
    }).then(doc => {
      fs.writeFile(path.join(unzipDir, 'doc.json'), JSON.stringify(doc), function(err) {
        if (err) {
          reject(err);
        }
        resolve(doc);
      });
    }).catch(err => {
      throw err;
    });
  });
  return promise;
}

function get(id) {
  var name = decodeURIComponent(id);
  var file = path.join(repoDirectory, name, 'doc.json');
  var promise = new Promise((resolve, reject) => {
    fs.readFile(file, (err, content) => {
      if (err) {
        reject(err);
      } else {
        resolve(content);
      }
    });
  });
  return promise;
}

function list() {
  var promise = new Promise((resolve, reject) => {
    fs.readdir(repoDirectory, function(err, files) {
      if (err) {
        reject(err);
      }
      files = files.map(f => {
        return {
          name: f,
          id: encodeURIComponent(f)
        };
      });
      resolve(files);
    });
  });
  return promise;
}

exports.save = save;
exports.list = list;
exports.get = get;