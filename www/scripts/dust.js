function Dust() {
  // Option
  this.General = {
    canvas: document.getElementById('dust'),
    qty: 50,
    obj: [],
    speed: 1,
    color: 'hsl(0, 0%, 0%)',
    background   : 'hsl(0, 0%, 0%)',
    windowWidth  : window.innerWidth,
    windowHeight : window.innerHeight
  }

  // Canavas Setting
  var $canvas = General.canvas;
  var windowWidth  = General.windowWidth,
      windowHeight = General.windowHeight;

  $canvas.setAttribute('width', windowWidth);
  $canvas.setAttribute('height', windowHeight);

  this.run = function() {
    for (var i = 0; i < General.qty; i++) {
      General.obj[i] = new dot()
      General.obj[i].draw()
    }
  }
  this.dot = function() {
    var ctx = General.canvas.getContext('2d')

    // Dot Attribute
    this.x = General.windowWidth  * Math.random();
    this.y = General.windowHeight * Math.random();
    this.size   = Math.floor(Math.random() * 3);

    // Move
    this.movex  = Math.random() < 0.5 ? -1 : 1;
    this.movey  = Math.random() < 0.5 ? -1 : 1;
    this.speedx = Math.floor(Math.random() * 10) / 10;
    this.speedy = Math.floor(Math.random() * 10) / 10;

    // Draw
    this.draw = function() {
      ctx.fillStyle = General.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);

      ctx.fill();
    }
    this.update = function() {
      this.x += this.movex * this.speedx;
      this.y += this.movey * this.speedy;

      // Bounce
      if (this.x < 0 || (this.x + this.size) > General.windowWidth) {
        this.movex = this.movex * -1
      }
      else if (this.y < 0 || (this.y + this.size) > General.windowHeight) {
        this.movey = this.movey * -1
      }
    }
  }
  this.move = function() {
    // update()
    var ctx = General.canvas.getContext('2d')
    ctx.clearRect(0, 0, General.windowWidth, General.windowHeight)
    for (var i = 0; i < General.qty; i++) {
      General.obj[i].update()
      General.obj[i].draw()
    }
    window.requestAnimationFrame(move)
  }
  this.init = function () {
    this.run();
    this.move();
  }

  this.init()
}
window.init = Dust()