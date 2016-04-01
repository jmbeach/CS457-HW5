function AlarmEventController($scope) {
	var self = this;
	AlarmEvent.getAll(function(events) {
		$scope.$apply(function() {
			$scope.allEvents = events;
		});
	});
}
function AlarmEvent(opts) {
	var self = this;
	self.eventId = opts.eventId;
	self.description = opts.description;
	self.eventDate = opts.eventDate;
	self.isSent = opts.isSent;
	self.tagId = opts.tagId;
}
AlarmEvent.getAll = function(callback) {
	$.getJSON("/events",function(data,err) {
		if (err != "success") {
			toastr.error("Something went wrong getting alarm events.");
			console.log(err);
			console.log(typeof(err));
			return;
		}
		var all = [];
		for (var i = 0; i < data.length; i++) {
			var rawEvent = data[i];
			all.push(new AlarmEvent({
				eventId:rawEvent[0],
				description: rawEvent[1],
				eventDate: rawEvent[2],
				isSent: rawEvent[3],
				tagId: rawEvent[4]
			}));
		}
		callback(all);
	});
}
