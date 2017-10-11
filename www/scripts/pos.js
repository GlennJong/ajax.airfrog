function Location(lat, lon) {
  this.myLat = lat;
  this.myLon = lon;
  this.getSite()
}
Location.prototype.getSite = function() {
  var that = this;
  var data = siteInfo;
  var siteName = that.compare(data)
  getData(siteName)
  // $.ajax({
  //   url: "scripts/AQXSite.json",
  //   type: "GET",
  //   dataType: "json",
  //   success: function(data) {
  //     var siteName = that.compare(data)

  //     getData(siteName)
  //   },
    
  //   error: function() {
  //     alert("ERROR!!!");
  //   }
  // });
}

Location.prototype.compare = function(data) {
  var allSite = data;
  var arr = [];
  for (var i = 0, j = allSite.length; i < j; i++) {

    var diffLat = Math.abs(Number(allSite[i].TWD97Lat)) -
                  Math.abs(Number(this.myLat));
    var diffLon = Math.abs(Number(allSite[i].TWD97Lon)) -
                  Math.abs(Number(this.myLon));
                  
    var count = Math.abs(diffLat) + Math.abs(diffLon)

    // var siteCount = Math.abs(Number(allSite[i].TWD97Lat)) +
    //                 Math.abs(Number(allSite[i].TWD97Lon));
    // var myCount   = Math.abs(Number(this.myLat)) + 
    //                 Math.abs(Number(this.myLon));
    // var count = Math.abs(siteCount - myCount);

    arr.push(count)
    console.log(count + ',' + allSite[i].SiteName)
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