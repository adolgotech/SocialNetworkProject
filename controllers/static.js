var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
  res.sendFile("layouts/app.html", {"root": __dirname + '/../'});
});

router.use(express.static(__dirname + '/../assets'));
router.use(express.static(__dirname + '/../templates'));

module.exports = router;
