
    General = {
      canvas: document.getElementById('canvas'),
      qty: 500,
      obj: [],
      speed: 1,
      color: 'hsl(0, 0%, 0%)',
      background   : 'hsl(0, 0%, 0%)',
      windowWidth  : window.innerWidth,
      windowHeight : window.innerHeight
    }
    function Bubble() {
      var $canvas = General.canvas;
      var windowWidth  = General.windowWidth,
          windowHeight = General.windowHeight;

      $canvas.setAttribute('width', windowWidth);
      $canvas.setAttribute('height', windowHeight);

    }
    function run() {
      for (var i = 0; i < General.qty; i++) {
        General.obj[i] = new square()
        General.obj[i].draw()
      }
    }
    function square() {
      var ctx = General.canvas.getContext('2d')

      // Square Attribute
      this.x = General.windowWidth  * Math.random();
      this.y = General.windowHeight * Math.random();
      this.size   = Math.floor(Math.random() * 10);
      // this.size   = 200;

      // Move
      this.movex  = Math.random() < 0.5 ? -1 : 1;
      this.movey  = Math.random() < 0.5 ? -1 : 1;
      this.speedx = Math.floor(Math.random() * 10) / 10;
      this.speedy = Math.floor(Math.random() * 10) / 10;

      // Draw
      this.draw = function() {
        ctx.fillStyle = General.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
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
    function move() {
      // update()
      var ctx = General.canvas.getContext('2d')
      ctx.clearRect(0, 0, General.windowWidth, General.windowHeight)
      for (var i = 0; i < General.qty; i++) {
        General.obj[i].update()
        General.obj[i].draw()
      }
      window.requestAnimationFrame(move)
    }
    function init() {
      Bubble();
      run()
      move()
    }
    window.init = init()