var express = require('express');
var router = express.Router();
const settings = require('../settings/settings');
const rp = require('request-promise');
var bcService = require('../services/bcService');
var apexService = require('../services/apexService');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.post('/bc/query', function (req, res, next) {
  console.log(req.url);
  bcService.bcQuery(req.body).then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.log(err);
      res.end(JSON.stringify(err));
    });
});


router.post('/bc/invocation', function (req, res, next) {
  console.log(req.url);
  bcService.bcInvocation(req.body).then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.log(err);
      res.end(JSON.stringify(err));
    });
});

router.post('/authUser', function (req, res, next) {
  console.log(req.url);
  apexService.authUser(req.body).then(function (data) {
    res.json(data);
  })
  .catch(function (err) {
    console.log(err);
    res.end(JSON.stringify(err));
  });
});

router.get('/getPartnerList/:id', function (req, res, next) {
  console.log(req.url);
  apexService.getPartnerList(req.params.id).then(function (data) {
    res.json(data);
  })
  .catch(function (err) {
    console.log(err);
    res.end(JSON.stringify(err));
  });
});


router.put('/changePassword', function (req, res, next) {
  console.log(req.url);
  apexService.changePassword(req.body).then(function (data) {
    res.json(data);
  })
  .catch(function (err) {
    console.log(err);
    res.end(JSON.stringify(err));
  });
});

router.put('/changeProfile', function (req, res, next) {
  console.log(req.url);
  apexService.changeProfile(req.body).then(function (data) {
    res.json(data);
  })
  .catch(function (err) {
    console.log(err);
    res.end(JSON.stringify(err));
  });
});


router.get('/userInfo', function (req, res, next) {
  console.log(req.url);
  var username = req.query.username;
  apexService.userInfo(username).then(function (data) {
    res.json(data);
  })
  .catch(function (err) {
    console.log(err);
    res.end(JSON.stringify(err));
  });
});

router.get('/certLOV', function (req, res, next) {
  console.log(req.url);
  var type = req.query.type;
  apexService.certLOV(type).then(function (data) {
    res.json(data);
  })
  .catch(function (err) {
    console.log(err);
    res.end(JSON.stringify(err));
  });
});


module.exports = router;