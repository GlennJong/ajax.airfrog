// Get Data
function getData(siteName) {
  $.ajax({
    url: "http://opendata2.epa.gov.tw/AQI.json",
    // url: "https://opendata.epa.gov.tw/webapi/api/rest/datastore/355000000I-000259/?format=json&token=H7vuj5zggE2Fw76iGDaEug",
    type: "GET",
    dataType: "json",
    success: function(data) {
      new Data(data, siteName)
      console.log(this)
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

  // Dust
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
      $cursor = document.getElementById('cursor'),
      $bubble = document.getElementById('bubble'),
      $sayContent = document.getElementById('sayContent');

  // Style
  var easy = {
        class: 'lv-1',
        value: 0,
        say:   '還不錯，適合出遊大口呼吸，別宅在家了！'
      },
      normal = {
        class: 'lv-2',
        value: 35,
        say:   '有點糟呢，出門記得戴口罩！'
      },
      warning = {
        class: 'lv-3',
        value: 53,
        say:   '很糟糕，為了你可愛的肺，最好別出門！'
      },
      danger = {
        class: 'lv-4',
        value: 70,
        say:   '糟透了，快把門窗緊閉，打開空氣清淨機！'
      };
  var scale = [easy, normal, warning, danger];
  for (var i = 0, j = scale.length; i < j; i++) {
    if (index > scale[i].value && index != "") {
      $body.className = scale[i].class;
      $sayContent.textContent = scale[i].say;
    } else if (index == "") {
      return
    }
  };

  // Clock
  var deg    = index * 360/200,
      rotate = 'transform: rotate(' + deg + 'deg)';
  $cursor.setAttribute('style', rotate);

  // Bubble
  var originClass = $bubble.getAttribute('class');
  $bubble.setAttribute('class', originClass + ' is-active')
};
