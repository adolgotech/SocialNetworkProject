var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var Post = require("./models/post");

app.use(require("./controllers/api/posts"));

app.get ("/", function (req, res) {
  res.sendFile("layouts/post.html", {"root": __dirname});
});

app.listen(3000, function() {
  console.log('Server listening on ', 3000)
});
