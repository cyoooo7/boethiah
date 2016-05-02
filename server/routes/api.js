var express = require('express');
var router = express.Router();
var multer = require('multer');
var database = require('./../lib/database');

var upload = multer({
  dest: 'data/temp/'
});

router.get('/', function (req, res, next) {
  res.send({
    version: '0.1.0'
  });
});

router.post('/docs', upload.single('enbx'), function (req, res, next) {
  var name = req.file.originalname.replace(/\.[^\.]*$/i, '');
  database.save(req.file.path, name).then(doc => {
    res.send(doc);
  }).catch(err => {
    throw err;
  });
});

router.get('/docs/:id', function (req, res, next) {
  database.get(req.params.id).then(doc => {
    res.send(doc);
  });
});

router.get('/docs', function (req, res, next) {
  database.list().then(files => {
    res.send(files);
  });
});

router.get('/res/:did/:rid', function (req, res, next) {
  var filePath = database.getResourcePath(req.params.did, req.params.rid);
  res.sendFile(filePath);
});


module.exports = router;