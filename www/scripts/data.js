// Get Data
function getData(siteName) {
  $.ajax({
    url: "http://opendata2.epa.gov.tw/AQI.json",
    // url: "https://opendata.epa.gov.tw/webapi/api/rest/datastore/355000000I-000259/?format=json&token=H7vuj5zggE2Fw76iGDaEug",
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
              'PM2.5',
              'Status'
              ]);

  this.style('PM2.5');

  window.init = Dust(that.AQI)
}

Data.prototype.findSite = function() {
  for (var i = 0, j = this.data.length; i < j; i++) {
    if (this.mySite == this.data[i].SiteName) {
      return i
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

  // Style
  var easy = {
        class: 'lv-1',
        value: 0,
      },
      normal = {
        class: 'lv-2',
        value: 35,
      },
      warning = {
        class: 'lv-3',
        value: 53,
      },
      danger = {
        class: 'lv-4',
        value: 70
      };
  var scale = [easy, normal, warning, danger];
  for (var i = 0, j = scale.length; i < j; i++) {
    if (index > scale[i].value) {
      // $body.setAttribute('class', scale[i].class)
      $body.className = scale[i].class;
      console.log(scale[i].class)
    }
  };

  // Clock
  var deg    = index * 360/200,
      rotate = 'transform: rotate(' + deg + 'deg)';
  $cursor.setAttribute('style', rotate);
};
