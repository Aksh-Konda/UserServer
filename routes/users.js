var express = require('express');
var router = express.Router();

const Users = require('../models/users');

router.post('/addUser', function (req, res, next) {
  const user = {
    phoneNumber: req.body.phoneNumber,
    username: req.body.username,
  }

  Users.create(user)
    .then(resp => {
      if (!!resp) {
        res.json({
          success: true,
          user: resp
        });
      }
      else {
        res.json({
          success: false,
          user: false
        });
      }
    })
    .catch(err => next(err));
});

/* GET users byPhoneNumber. */
router.post('/byPhoneNumber', function (req, res, next) {
  const phoneNumber = req.body.phoneNumber;
  if (!!phoneNumber) {
    Users.findOne({ phoneNumber: phoneNumber })
      .then(user => {
        if (!!user) {
          res.json({
            success: true,
            user: user
          });
        }
        else {
          res.json({
            success: false,
            user: null
          });
        }
      })
      .catch(err => next(err));
  }
});

module.exports = router;
