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
};

function Data(data, siteName) {
  this.data = data;

  this.selectSetting();
  this.bindEvents()

  // Apply
  var num = this.findSite(siteName);
  var newSite = this.data[num];
  this.applyData(newSite);
};

Data.prototype.applyData = function(newSite) {
  console.log('work')
  this.print(newSite, ['SiteName', 'County', 'PM2.5', 'Status']);
  this.style(newSite, 'PM2.5');

  // Dust
  window.init = Dust(newSite['PM2.5'])
}

Data.prototype.findSite = function(siteName) {
  for (var i = 0, j = this.data.length; i < j; i++) {
    if (siteName == this.data[i].SiteName) {
      return i
    }
  }
};

Data.prototype.print = function(newSite, prop) {
  for(var i = 0, j = prop.length; i < j; i++) {
      document.getElementById(prop[i]).textContent = newSite[prop[i]];
  }
};

Data.prototype.style = function(newSite, prop) {
  var index   = newSite[prop],
  // var index   = ,
      $body   = document.body,
      $cursor = document.getElementById('cursor'),
      $bubble = document.getElementById('bubble'),
      $sayContent = document.getElementById('sayContent');

  // Style
  var easy = {
        class: 'lv-1',
        value: 0,
        say:   'PM2.5 濃度很低！',
        degConst: 90/35,
        basic: 0
      },
      normal = {
        class: 'lv-2',
        value: 35,
        say:   'PM2.5 濃度有點高，出門記得戴口罩！',
        degConst: 90/18,
        basic: 90
      },
      warning = {
        class: 'lv-3',
        value: 53,
        say:   'PM2.5 濃度極高，最好別出門！',
        degConst: 90/17,
        basic: 180
      },
      danger = {
        class: 'lv-4',
        value: 70,
        say:   'PM2.5 紫爆，打開空氣清淨機！',
        degConst: 90/50,
        basic: 270
      };
  var scale = [easy, normal, warning, danger];
  for (var i = 0, j = scale.length; i < j; i++) {
    if (index > scale[i].value && index != "") {
      $body.setAttribute('class', scale[i].class);
      $sayContent.textContent = scale[i].say;

      // Clock
      var deg    = scale[i].basic + 
                  (index - scale[i].value) * 
                  scale[i].degConst,
          rotate = 'transform: rotate(' + deg + 'deg)';

      console.log(deg)
      $cursor.setAttribute('style', rotate);
    }
  };

  // Bubble
  var originClass = $bubble.getAttribute('class');
  $bubble.setAttribute('class', originClass + ' is-active')
};

Data.prototype.selectSetting = function() {
  var that = this;
  var arrCounty = ['基隆市', '臺北市', '新北市', '桃園市', '新竹縣',
                '新竹市', '苗栗縣', '臺中市', '彰化市', '南投縣',
                '雲林縣', '嘉義縣', '臺南市', '高雄市', '屏東縣',
                '臺東縣', '花蓮縣', '宜蘭縣', '金門縣', '澎湖縣',
                '連江縣'];
  var $county = document.getElementById('optionCounty')

  for (var i = 0, j = arrCounty.length; i < j; i++) {
    var $option = document.createElement('option');
    $option.setAttribute('value', arrCounty[i]);
    $option.textContent = arrCounty[i];
    $county.appendChild($option);
  }
  $county.onchange = function() {
    var selected = this.value;
    var arrSiteName = [];
    for (var i = 0, j = that.data.length; i < j; i++) {
      if (selected == that.data[i].County) {
        arrSiteName.push(that.data[i].SiteName);
        that.selectSite(arrSiteName);
      }
    }
  }
}

Data.prototype.selectSite = function(arrSiteName) {  
  var $siteName = document.getElementById('optionSiteName');
  $siteName.innerHTML = "";
  for (var i = 0, j = arrSiteName.length; i < j; i++) {
    var $option = document.createElement('option');
    $option.setAttribute('value', arrSiteName[i]);
    $option.textContent = arrSiteName[i];
    $siteName.appendChild($option);
  }
}

Data.prototype.bindEvents = function() {
  var $btn = document.getElementById('newSite');
  var that = this;

  $btn.onclick = function() {

    var newSiteName = document.getElementById('optionSiteName').value;
    var num = that.findSite(newSiteName);

    var newSite = that.data[num];
    that.applyData(newSite)

    // Modal Control

    var $modal = document.getElementById('locateModal');
    var originClass = $modal.getAttribute('class');
    $modal.className = originClass + ' is-close';
  }
}




