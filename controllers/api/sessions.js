var router = require('express').Router();
var User = require('../../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var config = require('../../config');
var bodyParser = require("body-parser");

router.use(bodyParser.json());
router.post('/', function(req, res, next){
  User.findOne({username: req.body.username})
  .select('password')
  .select('username')
  .exec(function(err, user){
    if(err){ return next(err) }
    if(!user){ res.send(401) }
    bcrypt.compare(req.body.password, user.password, function(err, valid){
      if(err){ return next(err) }
      if(!valid){ res.send(401) }
      var token = jwt.encode({ username: user.username }, config.secret);
      res.json(token);
    });
  });
});

module.exports = router
