// Get Data
function getData(siteName) {
  $.ajax({
    url: "//opendata2.epa.gov.tw/AQI.json",
    type: "GET",
    dataType: "json",
    success: function(data) {
      new Data(data, siteName)
    },
    
    error: function() {
      alert("ERROR!!!");
    }
  });
}

function Data(data, siteName) {
  this.data = data;
  this.mySite = siteName;
  this.locate = this.findSite();
  that = this.data[this.locate];

  this.print([
              'SiteName', 
              'County',
              'AQI',
              'Status'
              ]);

  this.style('AQI');

  window.init = Dust(that.AQI)
}

Data.prototype.findSite = function() {
  for (var i = 0, j = this.data.length; i < j; i++) {
    if (this.mySite == this.data[i].SiteName) {
      return i

      console.log(i)
    }
  }
}

Data.prototype.print = function(prop) {
  for(var i = 0, j = prop.length; i < j; i++) {
    document.getElementById(prop[i]).textContent = that[prop[i]];
  }
}

Data.prototype.style = function(prop) {
  var index   = that[prop],
  // var index   = 166,
      $body   = document.body,
      $cursor = document.getElementById('cursor');

  var deg    = index * 360/200,
      rotate = 'transform: rotate(' + deg + 'deg)';

  $cursor.setAttribute('style', rotate);

  if (index < 50) {
    $body.setAttribute('class', 'lv-1');
  }
  else if (index < 100) {
    $body.setAttribute('class', 'lv-2');
  }
  else if (index < 150) {
    $body.setAttribute('class', 'lv-3');
  }
  else if (index > 151) {
    $body.setAttribute('class', 'lv-4');
  }
}