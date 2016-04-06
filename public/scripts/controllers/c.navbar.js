function Navbar() {
    this.brand = "Alarms System";
    this.pages =
        [
            new Page("Alarm Events", "/", "")
            ,new Page("Alarm Notification", "/notification","/notification")
            ,new Page("Events Join Notifications", "/eventsjoin","/eventsjoin")
        ];
}

function Page(_name, _url, _sref) {
    this.name = _name;
    this.url = _url;
    this.sref = _sref;
}
Page.prototype.isActive = function () {
    return window.location.pathname == this.url;
}
