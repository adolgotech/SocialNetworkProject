aws = require('aws_config');
angular.module('app')
.run(function ($rootScope, $timeout) {
  (function connect() {
    var url = '';
    if(aws) {
      url = aws.ws_url;
    }
    else {
      url = 'ws://localhost:3000';
    }
    var connection = new WebSocket(url);
    connection.onclose = function (e) {
      console.log('WebSocket closed. Reconnecting...');
      $timeout(connect, 10000);
    }

    connection.onopen = function (){
      console.log('WebSocket connected');
    }

    connection.onmessage = function (e) {
      console.log(e);
      var payload = JSON.parse(e.data);
      $rootScope.$broadcast('ws:' + payload.topic, payload.data);
    }
  })()
})
