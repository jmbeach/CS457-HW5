function AlarmNotificationController($scope) {
  var self = this;
  AlarmNotification.getAll(function(notifications) {
    $scope.$apply(function() {
      $scope.allNotifications = notifications;
    });
  });
}
function AlarmNotification(opts) {
  var self = this;
  self.notificationId = opts.notificationId;
  self.distributionSequence = opts.distributionSequence;
  self.messageType = opts.messageType;
  self.sendTo = opts.sendTo;
  self.eventId = opts.eventId;
}
AlarmNotification.getAll = function(callback) {
  $.getJSON("/notifications",function(data,err) {
		if (err != "success") {
			toastr.error("Something went wrong getting alarm notifications.");
			console.log(err);
			console.log(typeof(err));
			return;
		}
		var all = [];
		for (var i = 0; i < data.length; i++) {
			var rawEvent = data[i];
			all.push(new AlarmNotification({
				notificationId:rawEvent[0],
				distributionSequence: rawEvent[1],
				messageType: rawEvent[2],
				sendTo: rawEvent[3],
				eventId: rawEvent[4]
			}));
		}
		callback(all);
	})
}
