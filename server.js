var express = require("express");
var bodyParser = require('body-parser');
var logger = require('morgan');
var websockets = require('./websockets');

var app = express();
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(require('./auth'));
app.use("/api/posts", require("./controllers/api/posts"));
app.use('/api/sessions', require('./controllers/api/sessions'));
app.use('/api/users', require('./controllers/api/users'));
app.use(require("./controllers/static"));

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('Server', process.pid, 'listening on', port);
});

websockets.connect(server);
