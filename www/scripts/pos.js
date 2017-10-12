function Location(lat, lon) {
  this.myLat = lat;
  this.myLon = lon;
  this.getSite()
}
Location.prototype.getSite = function() {
  var that = this;
  var data = siteInfo;
  var siteName = that.compare(data)

  // To AQI.json
  getData(siteName)
}

Location.prototype.compare = function(data) {
  var allSite = data;
  var arr = [];
  for (var i = 0, j = allSite.length; i < j; i++) {

    var diffLat = Math.abs(Number(allSite[i].TWD97Lat)) -
                  Math.abs(Number(this.myLat));
    var diffLon = Math.abs(Number(allSite[i].TWD97Lon)) -
                  Math.abs(Number(this.myLon));
                  
    var count = Math.abs(diffLat) + Math.abs(diffLon);
    arr.push(count);
  }

  // Get min
  var min   = Math.min.apply(null, arr),
      index = arr.indexOf(min);

  return allSite[index].SiteName
}


// Get Position
navigator.geolocation.watchPosition(function(position) {
  var myLat = position.coords.latitude;
  var myLon = position.coords.longitude;

  new Location(myLat, myLon)

});