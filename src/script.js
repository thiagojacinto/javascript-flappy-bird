console.log(" - - [@thiagojacinto] Flappy Bird - - ");  // Just a title inside console

// Handle sprites.png image source file:
const imageSrc = new Image();
imageSrc.src = './public/sprites.png';

// Get elements from HTML
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

const bird = {
  srcX: 0,
  srcY: 0,
  width: 34,
  height: 24,
  x: 10,
  y: 50,

  gravity: 0.25,
  velocity: 0,
  // function to control movement
  moviment() {
    this.velocity = this.velocity + this.gravity; // updates velocity
    this.y = this.y + this.velocity // updates position with velocity
  },

  draw() {
    // Drawing inside canvas:
    context.drawImage(
      imageSrc,
      bird.srcX, bird.srcY,     // OriginX, OriginY
      bird.width, bird.height,  // Width, Height
      bird.x, bird.y,
      bird.width, bird.height,
    );
  },
}

const floor = {
  srcX: 0,
  srcY: 610,
  width: 224,
  height: 112,
  x: 0,
  y: canvas.height - 112,

  draw() {
    context.drawImage(
      imageSrc,
      floor.srcX, floor.srcY,     // OriginX, OriginY
      floor.width, floor.height,  // Width, Height
      floor.x, floor.y,
      floor.width, floor.height,
    );
    // draw a second time to `extend` it 
    context.drawImage(
      imageSrc,
      floor.srcX, floor.srcY,     // OriginX, OriginY
      floor.width, floor.height,  // Width, Height
      (floor.x + floor.width), floor.y,
      floor.width, floor.height,
    );
  },
}

const background = {
  srcX: 390,
  srcY: 0,
  width: 275,
  height: 204,
  x: 0,
  y: canvas.height - 204,

  draw() {
    // paint background of `background`
    context.fillStyle = '#70c5ce';
    context.fillRect(
      0, 0,
      canvas.width, canvas.height
    );

    context.drawImage(
      imageSrc,
      background.srcX, background.srcY,     // OriginX, OriginY
      background.width, background.height,  // Width, Height
      background.x, background.y,
      background.width, background.height,
    );
    // draw a second time to `extend` it 
    context.drawImage(
      imageSrc,
      background.srcX, background.srcY,     // OriginX, OriginY
      background.width, background.height,  // Width, Height
      (background.x + background.width), background.y,
      background.width, background.height,
    );
  },
}

// Recursive function to draw
function loop() {
  bird.moviment();

  background.draw();
  floor.draw();
  bird.draw();

  // Continous loading the image
  requestAnimationFrame(loop)
}

loop(); // Runs loop function