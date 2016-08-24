var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
  res.sendfile("../layouts/post.html", {"root" : __dirname});
});

router.use(express.static(__dirname + "/../assets"));

module.exports = router;
