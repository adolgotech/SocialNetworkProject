var express = require("express");
var app = express();

app.use("/api/posts", require("./controllers/api/posts"));
app.use(require("./controllers/static"));

app.listen(3000, function() {
  console.log('Server listening on ', 3000)
});
