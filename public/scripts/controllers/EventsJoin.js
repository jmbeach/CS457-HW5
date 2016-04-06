function EventsJoinController($scope,$window) {
  var self = this;
  $scope.type = null;
  $window.setType = function(type) {
    $scope.type = type;
    $scope.$apply(function() {
      EventsJoin.getAll($scope.type,function(notifications) {
        $scope.$apply(function() {
          $scope.all = notifications;
        });
      })
    });
  }
  EventsJoin.getAll($scope.type,function(notifications) {
    $scope.$apply(function() {
      $scope.all = notifications;
    });
  })
}

function EventsJoin() {
  var self = this;
}
EventsJoin.getAll = function(type,callback) {
  var url = "/notificationjoin";
  if (type && type != "ALL") {
    url += "?type="+type;
  }
  $.getJSON(url, function(data, err) {
    if (err != "success") {
      toastr.error("Something went wrong getting alarm notifications.");
      console.log(err);
      console.log(typeof(err));
      return;
    }
    var all = [];
    for (var i = 0; i < data.length; i++) {
      var rawEvent = data[i];
      all.push({
        notification: new AlarmNotification({
          notificationId: rawEvent[5],
          distributionSequence: rawEvent[6],
          messageType: rawEvent[7],
          sendTo: rawEvent[8],
        }),
        event: new AlarmEvent({
          eventId: rawEvent[0],
          description: rawEvent[1],
          eventDate: rawEvent[2],
          isSent: rawEvent[3],
          tagId: rawEvent[4]
        })
      });
    }
    callback(all);
  });
}
