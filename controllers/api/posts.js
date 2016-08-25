var Post = require("../../models/post");
var router = require("express").Router();
var bodyParser = require("body-parser");

router.use(bodyParser.json());

router.get ("/", function (req, res, next) {
  Post.find()
  .sort("-date")
  .exec(function(err, posts) {
    if(err) {
      return next(err);
    }
    res.json(posts);
  });
});

router.post ("/", function (req, res, next) {
  var post = new Post ({
    username: req.body.username,
    body: req.body.body
  })

  post.save (function (err, post) {
    if(err) {
      return next(err);
    }
    res.json(201, post);
  });
  console.log("post received!");
  console.log(req.body.username);
  console.log(req.body.body);
});

module.exports = router;
