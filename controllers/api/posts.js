var Post = require("../../models/post");
var router = require("express").Router();
var bodyParser = require("body-parser");
var websockets = require('../../websockets');

router.use(bodyParser.json());

router.get ("/", function (req, res, next) {
  Post.find()
  .sort("-date")
  .exec(function(err, posts) {
    if(err) { return next(err) }
    res.json(posts);
  });
});

router.post ("/", function (req, res, next) {
  var post = new Post ({ body: req.body.body });
  post.username = req.auth.username;
  post.save (function (err, post) {
    if(err) { return next(err) }
    websockets.broadcast('new_post', post);
    res.json(201, post);
  });
  console.log("post received!");
});

module.exports = router;
