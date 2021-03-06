var router = require('express').Router();
var User = require('../../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var config = require('../../config');
var bodyParser = require("body-parser");

router.use(bodyParser.json());
// to create user
router.post('/', function(req, res, next){
  User.count({username: req.body.username}, function(err, cnt) {
    if(cnt > 0){
      res.send(422);
    } else {
      var user = new User( { username: req.body.username } );
      bcrypt.hash(req.body.password, 10, function(err, hash){
        if(err) { return next(err) }
        user.password = hash;
        user.save(function(err){
          if(err) {
            return next(err);
          }
          res.send(201);
        });
      });
    }
  });
});

router.get('/', function(req, res, next){
  if(!req.headers['x-auth']){ return res.send(401) }
  var auth = jwt.decode(req.headers['x-auth'], config.secret);
  User.findOne({username: auth.username}, function(err, user){
    if(err) { return next(err) }
    res.json(user);
  });
});

module.exports = router;
