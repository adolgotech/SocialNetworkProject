angular.module('app')
.service('WebSocketSvc', function ($rootScope, $window, $timeout) {
  var connection;
  function websocketHost() {
    if($window.location.protocol === "https:") {
      return "wss://" + $window.location.host;
    } else {
      return "ws://" + $window.location.host;
    }
  }

  this.connect = function () {
    connection = new WebSocket(websocketHost());
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
  }

  this.send = function (topic, data) {
    var json = JSON.stringify({topic: topic, data: data});
    connection.send(json);
  }
}).run(function (WebSocketSvc) {
    WebSocketSvc.connect();
})
