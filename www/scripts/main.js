function ModalBox(group) {
  this.box   = group + 'Modal';
  this.open  = group + 'Open';
  this.close = group + 'Close';

  var $modal = document.getElementById(this.box);
  var $open  = document.getElementById(this.open);
  var $close = document.getElementById(this.close);

  var originClass = $modal.getAttribute('class');

  console.log(originClass)

  $open.onclick = function() {
    $modal.className = originClass + ' is-open';
  }

  $close.onclick = function() {
    $modal.className = originClass + ' is-close';
  }

  $(window).on('click', function(e) {
    if(e.target == $modal) {
      $modal.className = originClass + ' is-close';
    }
  })

}

new ModalBox('airbox')